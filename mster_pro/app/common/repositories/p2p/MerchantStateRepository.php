<?php


namespace app\common\repositories\p2p;


use app\common\dao\p2p\MerchantStateDao;
use app\common\repositories\BaseRepository;

class MerchantStateRepository extends BaseRepository
{
    public function __construct(MerchantStateDao $dao)
    {
        $this->dao = $dao;
    }

    public function check($where,$field){
        return $this->dao->search()->where($where)->field($field)->find();
    }

    public function saveMS($data){
        return $this->dao->search()->save($data);
    }

}