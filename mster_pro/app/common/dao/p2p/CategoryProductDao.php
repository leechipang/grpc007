<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\p2p\CategoryProduct;
class CategoryProductDao extends BaseDao
{
    protected function getModel(): string
    {
        return CategoryProduct::class;
    }

    public function search(){
        return CategoryProduct::getDB();
    }

}