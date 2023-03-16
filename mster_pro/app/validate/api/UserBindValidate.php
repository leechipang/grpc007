<?php


namespace app\validate\api;


use think\Validate;

class UserBindValidate extends Validate
{

    protected $rule = [
        'card_id|身份证号码' => 'require|idCard',
        'real_name|真实姓名' => 'require|max:12',
        'phone|手机号码' => 'require|mobile',
        'sms_code|验证码' => 'require|length:4',
    ];

//    protected $scene = [
//        'bind' => ['idCard','realName','phone','sms_code'],
//    ];
}