<?php


namespace app\common\dao\user;


use app\common\dao\BaseDao;
use app\common\model\user\UserScoreLog;

class UserScoreLogDao extends BaseDao
{
    protected function getModel(): string
    {
        return UserScoreLog::class;
    }

    public function add($data){
        return UserScoreLog::getDB()->save($data);
    }

    public function search() {
        return UserScoreLog::getDB();
    }

}