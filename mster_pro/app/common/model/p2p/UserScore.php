<?php


namespace app\common\model\p2p;


use app\common\model\BaseModel;

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

    public function merchant(){
        return $this->belongsTo(Merchant::class,'mer_id','id');
    }
}