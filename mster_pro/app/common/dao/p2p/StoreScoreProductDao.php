<?php


namespace app\common\dao\p2p;

use app\common\dao\BaseDao;
use app\common\model\p2p\StoreScoreProduct;

class StoreScoreProductDao extends BaseDao
{
    protected function getModel(): string
    {
        return StoreScoreProduct::class;
    }

    public function search(){
        return StoreScoreProduct::getDB();
    }

}