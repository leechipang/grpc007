<?php


namespace app\common\dao\p2p;

use app\common\model\p2p\Merchant;
use app\common\dao\BaseDao;

class MerchantDao extends BaseDao
{
    protected function getModel(): string
    {
        return Merchant::class;
    }

    public function search(){
        return Merchant::getDB();
    }

    public function getMerchant ($where,$field) {
        return Merchant::getDB()->where($where)->field($field)->find();
    }


}