<?php

namespace app\common\repositories\p2p\back;
use app\common\dao\p2p\back\UserScoreRecordDao;
use app\common\repositories\BaseRepository;

/**
 * Class UserScoreRecordRepository
 * @package app\common\repositories\p2p\back
 */

class UserScoreRecordRepository extends BaseRepository
{
    /**
     * UserScoreRecordRepository constructor.
     * @param UserScoreRecordDao $dao
     */
    public function __construct(UserScoreRecordDao $dao)
    {
        $this->dao=$dao;
    }

    /**
     * @param array $where
     * @param $page
     * @param $limit
     * @return array
     */
    public function search(array $where,$page,$limit)
    {
        $query=$this->dao->search($where);
        $all = $this->dao->search($where)->count();
        $countPay = $this->dao->search($where)->field('sum(ur.score) as score')->find();
        $stat = [
            [
                'className' => 'el-icon-s-goods',
                'count' => $all,
                'field' => '件',
                'name' => '订单数量'
            ],
            [
                'className' => 'el-icon-s-order',
                'count' => $countPay['score'] ? $countPay['score'] : 0,
                'field' => '分',
                'name' => '实际支付积分'
            ],
        ];
        $count=$query->count();
        $list=$query->page($page,$limit)->select();
        return compact('count', 'list', 'stat');
    }

}