<?php

namespace app\common\model\p2p\back;
use app\common\model\BaseModel;

/**
 * Class UserScoreRecord
 * @package app\common\model\p2p\back
 */
class UserScoreRecord extends BaseModel
{
    /**
     * @return string|null
     */
    public static function tablePk(): ?string
    {
        // TODO: Implement tablePk() method.
        return 'id';
    }
    /**
     * @return string
     */
    public static function tableName(): string
    {
        // TODO: Implement tableName() method.
            return 'user_score_log';
    }
}