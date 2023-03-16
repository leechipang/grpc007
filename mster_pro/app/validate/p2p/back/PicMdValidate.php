<?php


namespace app\validate\p2p\back;

use think\Validate;

class PicMdValidate extends Validate
{
    protected $failException = true;

    protected $rule = [
        'pic|热卖图片' => 'max:128',
        'status|是否显示' => 'require|integer',
    ];
}