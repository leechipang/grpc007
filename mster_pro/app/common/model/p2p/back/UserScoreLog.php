<?php

namespace app\common\model\p2p\back;
use app\common\model\BaseModel;


/**
 * Class UserScoreLog
 * @package app\common\model\p2p\back
 */
class UserScoreLog extends BaseModel
{
    public static function tablePk(): string
    {
        return 'id';
    }
    public static function tableName(): string
    {
        return 'p2p_user_score_log';
    }
}
