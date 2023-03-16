<?php

namespace app\common\model\p2p\back;

use app\common\model\BaseModel;

class MerchantState extends BaseModel
{

    public static function tablePk(): string
    {
        return 'id';
    }

    public static function tableName(): string
    {
        return 'p2p_merchant_state';
    }

}
