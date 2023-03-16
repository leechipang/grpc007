<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\p2p\UserScoreLog;

class UserScoreLogDao extends BaseDao
{
    protected function getModel(): string
    {
        return UserScoreLog::class;
    }

    public function saveUserScoreLog($data) {
        UserScoreLog::getDB()->save($data);
    }

}