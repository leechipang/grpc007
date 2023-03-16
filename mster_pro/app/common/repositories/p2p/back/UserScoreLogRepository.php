<?php

namespace app\common\repositories\p2p\back;
use app\common\dao\p2p\back\UserScoreLogDao;
use app\common\repositories\BaseRepository;

/**
 * Class UserScoreLogRepository
 * @package app\common\repositories\p2p\back
 */
class UserScoreLogRepository extends BaseRepository
{
    /**
     * UserScoreLogRepository constructor.
     * @param UserScoreLogDao $dao
     */
    public function __construct(UserScoreLogDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * @param array $where
     * @param $page
     * @param $limit
     * @return array
     */
    public function search( array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count', 'list');
    }


}
