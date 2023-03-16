<?php


namespace app\common\model\store;


use app\common\model\BaseModel;

class HomeImage extends BaseModel
{

    /**
     * TODO
     * @return string
     * @author Qinii
     * @day 2020-07-30
     */
    public static function tablePk(): string
    {
        return 'id';
    }

    /**
     * TODO
     * @return string
     * @author Qinii
     * @day 2020-07-30
     */
    public static function tableName(): string
    {
        return 'home_image';
    }
}