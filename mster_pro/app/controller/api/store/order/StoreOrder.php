<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------


namespace app\controller\api\store\order;


use app\validate\api\UserReceiptValidate;
use crmeb\basic\BaseController;
use app\common\repositories\store\order\StoreCartRepository;
use app\common\repositories\store\order\StoreGroupOrderRepository;
use app\common\repositories\store\order\StoreOrderRepository;
use crmeb\services\ExpressService;
use think\App;
use think\exception\ValidateException;
use think\model\relation\OneToOne;

/**
 * Class StoreOrder
 * @package app\controller\api\store\order
 * @author xaboy
 * @day 2020/6/10
 */
class StoreOrder extends BaseController
{
    /**
     * @var StoreOrderRepository
     */
    protected $repository;

    /**
     * StoreOrder constructor.
     * @param App $app
     * @param StoreOrderRepository $repository
     */
    public function __construct(App $app, StoreOrderRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * @param StoreCartRepository $cartRepository
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author xaboy
     * @day 2020/6/10
     */
    public function checkOrder(StoreCartRepository $cartRepository)
    {
        $cartId = (array)$this->request->param('cart_id', []);
        $addressId = (int)$this->request->param('address_id');
        $uid = $this->request->uid();
        if (!($count = count($cartId)) || $count != count($cartRepository->validIntersection($cartId, $uid)))
            return app('json')->fail('数据无效');
        $orderInfo = $this->repository->cartIdByOrderInfo($uid, [], $cartId, $addressId);
        $user = $this->request->userInfo();
        $orderInfo['userScore'] = $user->score;
        return app('json')->success($orderInfo);
    }

    /**
     * @param StoreCartRepository $cartRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function createOrder(StoreCartRepository $cartRepository)
    {
        $cartId = (array)$this->request->param('cart_id', []);
        $addressId = (int)$this->request->param('address_id');
        $order_type = (int)$this->request->param('order_type', 0);
        $receipt_data = (array)$this->request->param('receipt_data', []);
        $coupon = (array)$this->request->param('coupon', []);
        $take = (array)$this->request->param('take', []);
        $mark = (array)$this->request->param('mark', []);
        $payType = $this->request->param('pay_type');
        //$user_score_id = $this->request->param('user_score_id');    //lizjun
        if (!in_array($payType, StoreOrderRepository::PAY_TYPE))
            return app('json')->fail('请选择正确的支付方式');
        if (!in_array($order_type, [0, 1, 2, 3, 4]))
            return app('json')->fail('订单类型错误');
        $validate = app()->make(UserReceiptValidate::class);

        foreach ($receipt_data as $receipt) {
            if (!is_array($receipt)) throw new ValidateException('发票信息有误');
            $validate->check($receipt);
        }
        $uid = $this->request->uid();
        $phone = $this->request->userInfo()->phone;
        //校验用户积分
        $productScore = $this->repository->checkScore($this->request->userInfo(),$cartId[0]);
        //检查积分
        $p2p_mer_id  = 0;
        $rate_to_us = 0;
        //$user_score_id = 10;
//        if ($user_score_id) {
//            [$productScore,$p2p_mer_id,$rate_to_us] = $this->repository->checkUserScore($uid, $cartId[0], $user_score_id,$phone);
//        }
        if (!($count = count($cartId)) || $count != count($cartRepository->validIntersection($cartId, $uid)))
            return app('json')->fail('数据无效');
        if (!$addressId)
            return app('json')->fail('请选择地址');
        makeLock()->lock();
        try {
            if ($order_type == 2) {
                $groupOrder = $this->repository->createPresellOrder($this->request->userInfo(), array_search($payType, StoreOrderRepository::PAY_TYPE), $cartId, $addressId, $coupon, $take, $mark, $receipt_data);
            } else {
                $groupOrder = $this->repository->createOrder($this->request->userInfo(), array_search($payType, StoreOrderRepository::PAY_TYPE), $cartId, $addressId, $coupon, $take, $mark, $receipt_data,$productScore);
            }
        } catch (\Throwable $e) {
            makeLock()->unlock();
            throw $e;
        }
        makeLock()->unlock();

        if ($groupOrder['pay_price'] == 0) {
            $this->repository->paySuccess($groupOrder);
            return app('json')->status('success', '支付成功', ['order_id' => $groupOrder['group_order_id']]);
        }
        try {
            return $this->repository->pay($payType, $this->request->userInfo(), $groupOrder, $this->request->param('return_url'));
        } catch (\Exception $e) {
            return app('json')->status('error', $e->getMessage(), ['order_id' => $groupOrder->group_order_id]);
        }
    }

    /**
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author xaboy
     * @day 2020/6/10
     */
    public function lst()
    {
        [$page, $limit] = $this->getPage();
        return app('json')->success($this->repository->getList([
            'uid' => $this->request->uid(),
            'paid' => 1,
            'status' => (int)$this->request->get('status', 0)
        ], $page, $limit));
    }

    /**
     * @param $id
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function detail($id)
    {
        $order = $this->repository->getDetail((int)$id, $this->request->uid());
        if (!$order)
            return app('json')->fail('订单不存在');
        if ($order->order_type == 1) {
            $order->append(['take']);
        }
        return app('json')->success($order->toArray());
    }

    /**
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function number()
    {
        return app('json')->success(['orderPrice' => $this->request->userInfo()->pay_price] + $this->repository->userOrderNumber($this->request->uid()));
    }

    /**
     * @param StoreGroupOrderRepository $groupOrderRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function groupOrderList(StoreGroupOrderRepository $groupOrderRepository)
    {
        [$page, $limit] = $this->getPage();
        $list = $groupOrderRepository->getList(['uid' => $this->request->uid(), 'paid' => 0], $page, $limit);
        return app('json')->success($list);
    }

    /**
     * @param $id
     * @param StoreGroupOrderRepository $groupOrderRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function groupOrderDetail($id, StoreGroupOrderRepository $groupOrderRepository)
    {
        $groupOrder = $groupOrderRepository->detail($this->request->uid(), (int)$id);
        if (!$groupOrder)
            return app('json')->fail('订单不存在');
        else
            return app('json')->success($groupOrder->append(['cancel_time'])->toArray());
    }

    public function groupOrderStatus($id, StoreGroupOrderRepository $groupOrderRepository)
    {
        $groupOrder = $groupOrderRepository->status($this->request->uid(), intval($id));
        if (!$groupOrder)
            return app('json')->fail('订单不存在');
        if ($groupOrder->paid) $groupOrder->append(['give_coupon']);
        $activity_type = 0;
        $activity_id = 0;
        foreach ($groupOrder->orderList as $order) {
            $activity_type = max($order->activity_type, $activity_type);
            if ($order->activity_type == 4 && $groupOrder->paid) {
                $order->append(['orderProduct']);
                $activity_id = $order->orderProduct[0]['activity_id'];
            }
        }
        $groupOrder->activity_type = $activity_type;
        $groupOrder->activity_id = $activity_id;
        return app('json')->success($groupOrder->toArray());
    }

    /**
     * @param $id
     * @param StoreGroupOrderRepository $groupOrderRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/10
     */
    public function cancelGroupOrder($id, StoreGroupOrderRepository $groupOrderRepository)
    {
        $groupOrderRepository->cancel((int)$id, $this->request->uid());
        return app('json')->success('取消成功');
    }

    public function groupOrderPay($id, StoreGroupOrderRepository $groupOrderRepository)
    {
        //TODO 佣金结算,佣金退回,物流查询
        $type = $this->request->param('type');
        if (!in_array($type, StoreOrderRepository::PAY_TYPE))
            return app('json')->fail('请选择正确的支付方式');
        $groupOrder = $groupOrderRepository->detail($this->request->uid(), (int)$id, false);
        if (!$groupOrder)
            return app('json')->fail('订单不存在或已支付');
        $this->repository->changePayType($groupOrder, array_search($type, StoreOrderRepository::PAY_TYPE));
        if ($groupOrder['pay_price'] == 0) {
            $this->repository->paySuccess($groupOrder);
            return app('json')->status('success', '支付成功', ['order_id' => $groupOrder['group_order_id']]);
        }

        try {
            return $this->repository->pay($type, $this->request->userInfo(), $groupOrder, $this->request->param('return_url'));
        } catch (\Exception $e) {
            return app('json')->status('error', $e->getMessage(), ['order_id' => $groupOrder->group_order_id]);
        }
    }

    public function take($id)
    {
        $this->repository->takeOrder($id, $this->request->userInfo());
        return app('json')->success('确认收货成功');
    }

    public function express($id)
    {
        $order = $this->repository->getWhere(['order_id' => $id, 'uid' => $this->request->uid(), 'is_del' => 0]);
        if (!$order)
            return app('json')->fail('订单不存在');
        if (!$order->delivery_type || !$order->delivery_id)
            return app('json')->fail('订单未发货');
        $express = ExpressService::express($order->delivery_id);
        $order->append(['orderProduct']);
        return app('json')->success(compact('express', 'order'));
    }

    public function verifyCode($id)
    {
        $order = $this->repository->getWhere(['order_id' => $id, 'uid' => $this->request->uid(), 'is_del' => 0, 'order_type' => 1]);
        if (!$order)
            return app('json')->fail('订单状态有误');
//        $type = $this->request->param('type');
        return app('json')->success(['qrcode' => $this->repository->wxQrcode($id, $order->verify_code)]);
//        return app('json')->success(['qrcode' => $type == 'routine' ? $this->repository->routineQrcode($id, $order->verify_code) : $this->repository->wxQrcode($id, $order->verify_code)]);
    }

    public function del($id)
    {
        $this->repository->userDel($id, $this->request->uid());
        return app('json')->success('删除成功');
    }

}
