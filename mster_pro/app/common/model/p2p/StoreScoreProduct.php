<?php


namespace app\common\model\p2p;


use app\common\model\BaseModel;

class StoreScoreProduct extends BaseModel
{
    public static function tablePk(): ?string
    {
        return 'product_id';
    }

    public static function tableName(): string
    {
        return 'store_product';
    }

}