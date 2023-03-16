<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\p2p\MerchantState;

class MerchantStateDao extends BaseDao
{
    protected function getModel(): string
    {
        return MerchantState::class;
    }

    public function search () {
        return MerchantState::getDB();
    }
}