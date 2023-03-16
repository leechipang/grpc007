<?php


namespace app\common\repositories\store;


use app\common\dao\store\HomeImageDao;
use app\common\repositories\BaseRepository;

class HomeImageRepository extends BaseRepository
{
    protected $dao;

    public function __construct(HomeImageDao $dao)
    {
        $this->dao = $dao;
    }

    public function search(){
        return $this->dao->search()->where(['status' => 1,'is_del' => 0])->field('id,pic,type')->select();
    }
}