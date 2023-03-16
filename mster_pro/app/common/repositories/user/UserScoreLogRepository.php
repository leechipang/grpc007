<?php


namespace app\common\repositories\user;


use app\common\dao\user\UserScoreLogDao;
use app\common\repositories\BaseRepository;

class UserScoreLogRepository extends BaseRepository
{
    protected $dao;

    public function __construct(UserScoreLogDao $dao)
    {
        $this->dao = $dao;
    }

    public function add($data){
        return $this->dao->add($data);
    }

    public function search($where,$field){
        return $this->dao->search()->where($where)->field($field)->find();
    }
}