<?php

namespace app\common\model\p2p\back;
use app\common\model\BaseModel;

/**
 * Class PicMd
 * @package app\common\model\p2p\back
 */
class PicMd extends BaseModel
{
    /**
     * @return string
     */
    public static function tablePk(): string
    {
        return 'id';
    }

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return 'home_image';
    }

}