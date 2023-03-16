<?php


namespace app\common\dao\store;


use app\common\dao\BaseDao;
use app\common\model\store\HomeImage;

class HomeImageDao extends BaseDao
{

    protected function getModel(): string
    {
        return HomeImage::class;
    }

    public function search () {
        return HomeImage::getDB();
    }
}