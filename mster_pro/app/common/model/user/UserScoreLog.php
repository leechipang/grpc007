<?php


namespace app\common\model\user;


use app\common\model\BaseModel;

class UserScoreLog extends BaseModel
{
    public static function tablePk(): ?string
    {
        return 'id';
    }

    /**
     * @return string
     * @author xaboy
     * @day 2020/6/2
     */
    public static function tableName(): string
    {
        return 'user_score_log';
    }

}