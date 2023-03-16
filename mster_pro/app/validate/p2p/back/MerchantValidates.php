<?php
namespace app\validate\p2p\back;
use think\Validate;

class MerchantValidates extends Validate
{
    protected $failException = true;

    protected $rule = [
        'name|积分商家名称' => 'require|max:32',
        'rate_to_us|积分比例' => 'require|integer',
        'logo|商家头像' => 'max:128',
        'notify_url|通知地址' => 'require|max:128',
        'ip_list|ip地址白名单' => 'require|max:128',
        'status|是否显示' => 'require|integer',
    ];

}