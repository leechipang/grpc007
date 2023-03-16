<?php

namespace app\common\repositories\p2p\back;

use app\common\dao\p2p\back\UserScoreDao;
use app\common\repositories\BaseRepository;



/**
 * Class MerchantStateRepository
 * @package app\common\repositories\p2p\back
 * @author lzp
 * @day 2021.03.10
 * @mixin UserScoreDao
 */
class UserScoreRepository extends BaseRepository
{
    /**
     * MerchantStateRepository constructor.
     * @param UserScoreDao $dao
     */
    public function __construct(UserScoreDao $dao)
    {
        $this->dao = $dao;
    }

    public function search( array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count', 'list');
    }

}
