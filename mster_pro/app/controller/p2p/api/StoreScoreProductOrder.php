<?php


namespace app\controller\p2p\api;

use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\p2p\StoreScoreProductOrderRepository as repository;
class StoreScoreProductOrder extends BaseController
{
    protected $repository;
    protected $uid;
    protected $userInfo;

    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        if ($this->request->isLogin()) $this->uid = $this->request->uid();
        $this->userInfo = $this->request->isLogin() ? $this->request->userInfo() : null;
    }

    /**
     * 兑换明细
     * return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 16:04
     */
    public function order () {
        [$page, $limit] = $this->getPage();
        $result = $this->repository->storeScoreOrder($this->uid,$page, $limit);
        if (!$result) {
            \error('暂无数据',[],400);
        }
        return app('json')->success($result);
    }

    /**
     * 兑换详情
     * @param $order_id
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 17:55
     */
    public function scoreOrderDetail($order_id){
        $result = $this->repository->scoreOrderDetail($this->uid,$order_id);
        if (!$result) {
            \error('暂无数据',[],400);
        }
        return app('json')->success($result);
    }
}