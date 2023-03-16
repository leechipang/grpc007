<?php

namespace app\common\model\p2p\back;
use app\common\model\BaseModel;


/**
 * Class MerchantState
 * @package app\common\model\p2p\back
 * @author lzp
 * @day 2021.03.10
 */
class UserScore extends BaseModel
{
    public static function tablePk(): string
    {
        return 'id';
    }

    public static function tableName(): string
    {
        return 'p2p_user_score';
    }

}
