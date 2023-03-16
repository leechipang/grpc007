<?php
namespace app\validate\p2p\back;
use think\Validate;

class MerchantValidate extends Validate
{
    protected $failException = true;

    protected $rule = [
        'name|接入者名称' => 'require|max:20',
        'rate_to_us|积分比例' => 'require|integer|max:5',
        'logo|用户头像' => 'require'
    ];

}