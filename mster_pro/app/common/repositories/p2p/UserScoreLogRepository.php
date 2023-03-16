<?php


namespace app\common\repositories\p2p;


use app\common\dao\p2p\UserScoreLogDao;
use app\common\repositories\BaseRepository;

class UserScoreLogRepository extends BaseRepository
{
    public function __construct(UserScoreLogDao $dao)
    {
        $this->dao = $dao;
    }

    public function saveUserScoreLog($data)
    {
        return $this->dao->saveUserScoreLog($data);
    }
}