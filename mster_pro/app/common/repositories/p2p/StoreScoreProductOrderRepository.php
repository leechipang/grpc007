<?php


namespace app\common\repositories\p2p;

use app\common\dao\p2p\StoreScoreProductOrderDao;
use app\common\repositories\BaseRepository;

class StoreScoreProductOrderRepository extends BaseRepository
{
    public function __construct(StoreScoreProductOrderDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 兑换明细
     * @param $uid
     * @param $page
     * @param $limit
     * @return \think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 16:04
     */
    public function storeScoreOrder ($uid,$page, $limit) {
        return $this->dao->storeScoreOrder($uid,$page, $limit);
    }

    /**
     * 兑换详情
     * @param $uid
     * @param $order_id
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 17:55
     */
    public function scoreOrderDetail($uid,$order_id) {
        return $this->dao->scoreOrderDetail($uid,$order_id);
    }

}