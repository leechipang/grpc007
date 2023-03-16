<?php


namespace app\common\model\p2p;


use app\common\model\BaseModel;

class CategoryProduct extends BaseModel
{
    public static function tablePk(): string
    {
        return 'store_category_id';
    }

    public static function tableName(): string
    {
        return 'store_category';
    }
}