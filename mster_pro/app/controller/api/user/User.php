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


namespace app\controller\api\user;


use app\Request;
use app\validate\api\UserBindValidate;
use crmeb\basic\BaseController;
use app\common\repositories\store\order\StoreOrderRepository;
use app\common\repositories\user\UserBillRepository;
use app\common\repositories\user\UserRepository;
use app\common\repositories\user\UserVisitRepository;
use crmeb\services\YunxinSmsService;
use think\App;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Cache;

class User extends BaseController
{
    public $repository;

    public function __construct(App $app, UserRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * @return mixed
     * @author xaboy
     * @day 2020/6/22
     */
    public function spread_image()
    {
        $type = $this->request->param('type');
        $res = $type == 'routine'
            ? $this->repository->routineSpreadImage($this->request->userInfo())
            : $this->repository->wxSpreadImage($this->request->userInfo());
        return app('json')->success($res);
    }

    public function spread_image_v2()
    {
        $type = $this->request->param('type');
        $user = $this->request->userInfo();
        $siteName = systemConfig('site_name');
        $qrcode = $type == 'routine'
            ? $this->repository->mpQrcode($user)
            : $this->repository->wxQrcode($user);
        $poster = systemGroupData('spread_banner');
        $nickname = $user['nickname'];
        $mark = '邀请您加入' . $siteName;
        return app('json')->success(compact('qrcode', 'poster', 'nickname', 'mark'));
    }

    public function spread_info()
    {
        $user = $this->request->userInfo();
        $user->append(['one_level_count', 'lock_brokerage', 'two_level_count', 'spread_total', 'yesterday_brokerage', 'total_extract', 'total_brokerage', 'total_brokerage_price']);
        $data = [
            'total_brokerage_price' => $user->total_brokerage_price,
            'lock_brokerage' => $user->lock_brokerage,
            'one_level_count' => $user->one_level_count,
            'two_level_count' => $user->two_level_count,
            'spread_total' => $user->spread_total,
            'yesterday_brokerage' => $user->yesterday_brokerage,
            'total_extract' => $user->total_extract,
            'total_brokerage' => $user->total_brokerage,
            'brokerage_price' => $user->brokerage_price,
            'now_money' => $user->now_money,
            'broken_day' => (int)systemConfig('lock_brokerage_timer'),
            'user_extract_min' => (int)systemConfig('user_extract_min'),
        ];
        return app('json')->success($data);
    }

    /**
     * @param UserBillRepository $billRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/22
     */
    public function bill(UserBillRepository $billRepository)
    {
        [$page, $limit] = $this->getPage();
        return app('json')->success($billRepository->userList([
            'now_money' => $this->request->param('type', 0),
            'score' => $this->request->param('type', 0),
            'status' => 1,
        ], $this->request->uid(), $page, $limit));
    }

    /**
     * @param UserBillRepository $billRepository
     * @return mixed
     * @author xaboy
     * @day 2020/6/22
     */
    public function brokerage_list(UserBillRepository $billRepository)
    {
        [$page, $limit] = $this->getPage();
        return app('json')->success($billRepository->userList([
            'category' => 'brokerage',
        ], $this->request->uid(), $page, $limit));
    }

    /**
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author xaboy
     * @day 2020/6/22
     */
    public function spread_order()
    {
        [$page, $limit] = $this->getPage();
        return app('json')->success($this->repository->subOrder($this->request->uid(), $page, $limit));
    }


    /**
     * 用户是否需要去绑定
     * @return mixed
     * @author Lizjun
     * @date 2021-03-18 10:15
     */
    public function bind(){
        $data = $this->bindInfo(1);
        $bind = ['bind' => 0];
        if (!$data->phone || !$data->card_id || !$data->real_name) {
            $bind = ['bind' => 1];
        }
        return app('json')->success('success',$bind);
    }

    public function bindInfo($type = null){
        $data = $this->repository->checkUser(['uid' => $this->request->uid()],'phone,card_id,real_name');
        if ($type == 1) {
            return $data;
        }
        return app('json')->success('success',$data);

    }


    /**
     * 绑定用户身份证、手机号、姓名
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-18 15:34
     */
    public function binding()
    {
        $data = $this->request->params(['card_id','real_name','phone', 'sms_code']);
        $validate = new UserBindValidate();
        if (!$validate->check($data)) {
            return app('json')->fail($validate->getError());
        }

        if (!(YunxinSmsService::create())->checkSmsCode($data['phone'], $data['sms_code'],'binding')) return app('json')->fail('验证码不正确');
        $userBindInfo = $this->bindInfo(1);
        $userBindInfo = $userBindInfo->toArray();
        $user = $this->repository->accountByUser($data['phone']);
        if ($user) {
            $data = ['phone' => $data['phone'],'card_id' => $data['card_id'],'real_name' => $data['real_name']];
        } else {
            $data = ['account' => $data['phone'], 'phone' => $data['phone'],'card_id' => $data['card_id'],'real_name' => $data['real_name']];
        }

        if ($this->repository->binding($this->request->uid(),$data,$userBindInfo)) {
            return app('json')->success('绑定成功');
        }
        return app('json')->fail('绑定失败');
    }

    //测试回调接口
    public function testCheckUser () {
        return app('json')->success('success');

//        $data = $this->request->params(['type','appid','phone','cart_id','noncestr','timestamp','amount','sign']);
//        $secret = 'xxxxxxxxxxxxxx';
//        $signData = unset();
//        if ($data['sign'] !== $this->Sign($signData,$secret)) error('兑换失败，签名错误!',"",400);
//        if ($data['type'] == 'exchange') {
//            //校验用户债权是否足够兑换，足够则减少债权
//        }elseif($data['type'] == 'checkUser') {
//            //校验用户是否存在第三方平台
//        }
    }

    public function Sign($signData, $merchant)
    {
        ksort($signData);
        $key = $merchant['secret'];
        $new = [];
        foreach ($signData as $k => $v) {
            $new[] = "$k=$v";
        }
        $new[] = "key=$key";
        $str = implode('&', $new);
        $sign = strtoupper(MD5($str));
        return $sign;
    }

    /**
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     * @author xaboy
     * @day 2020/6/22
     */
    public function spread_list()
    {
        [$level, $sort, $nickname] = $this->request->params(['level', 'sort', 'keyword'], true);
        $uid = $this->request->uid();
        [$page, $limit] = $this->getPage();
        return app('json')->success($level == 2
            ? $this->repository->getTwoLevelList($uid, $nickname, $sort, $page, $limit)
            : $this->repository->getOneLevelList($uid, $nickname, $sort, $page, $limit));
    }

    /**
     * @return mixed
     * @author xaboy
     * @day 2020/6/22
     */
    public function spread_top()
    {
        [$page, $limit] = $this->getPage();
        $type = $this->request->param('type', 0);
        return app('json')->success($type == 1
            ? $this->repository->spreadMonthTop($page, $limit)
            : $this->repository->spreadWeekTop($page, $limit));
    }

    /**
     * @return mixed
     * @author xaboy
     * @day 2020/6/22
     */
    public function brokerage_top()
    {
        [$page, $limit] = $this->getPage();
        $type = $this->request->param('type', 'week');
        $uid = $this->request->uid();
        return app('json')->success($type == 'month'
            ? $this->repository->brokerageMonthTop($uid, $page, $limit)
            : $this->repository->brokerageWeekTop($uid, $page, $limit));
    }

    public function history(UserVisitRepository $repository)
    {
        $uid = $this->request->uid();
        [$page, $limit] = $this->getPage();
        return app('json')->success($repository->getHistory($uid, $page, $limit));
    }

    public function deleteHistory($id, UserVisitRepository $repository)
    {
        $uid = $this->request->uid();

        if (!$repository->getWhereCount(['user_visit_id' => $id, 'uid' => $uid]))
            return app('json')->fail('数据不存在');
        $repository->delete($id);
        return app('json')->success('删除成功');
    }

    public function deleteHistoryBatch(UserVisitRepository $repository)
    {
        $uid = $this->request->uid();
        $data = $this->request->param('ids');
        if(!empty($data) && is_array($data)){
            foreach ($data as $id){
                if (!$repository->getWhereCount(['user_visit_id' => $id, 'uid' => $uid]))
                    return app('json')->fail('数据不存在');
            }
            $repository->batchDelete($data,null);
        }
        if($data == 1)
            $repository->batchDelete(null,$uid);

        return app('json')->success('删除成功');
    }

    public function account()
    {
        $user = $this->request->userInfo();
        if (!$user->phone) return app('json')->fail('请绑定手机号');
        return app('json')->success($this->repository->selfUserList($user->phone));
    }

    public function switchUser()
    {
        $uid = (int)$this->request->param('uid');
        if (!$uid) return app('json')->fail('用户不存在');
        $userInfo = $this->request->userInfo();
        if (!$userInfo->phone) return app('json')->fail('请绑定手机号');
        $user = $this->repository->switchUser($userInfo, $uid);
        $tokenInfo = $this->repository->createToken($user);
        $this->repository->loginAfter($user);
        return app('json')->success($this->repository->returnToken($user, $tokenInfo));
    }


}
