<?php


namespace app\validate\p2p;


use think\Validate;

class MerchantValidate extends Validate
{
    protected $failException = true;

    protected $rule = [
        'appid|appid' => 'require|min:18|max:18',
        'sign|签名' => 'require|min:32|max:32',
        'timestamp|时间戳' => 'require',
        'noncestr|随机字符串' => 'require',
        'data|用户信息' => 'require',
        'secret|secret' => 'require',
        'mer_user_id|用户ID' => 'require',
        'phone|用户手机号码' => 'require|mobile',
        'nickname|用户昵称' => 'require',
        'avatar|用户头像' => 'require',
        'score|积分' => 'require',
    ];

    protected $message = [
        'type.in' => '积分类型错误',

//        'appid.require' => ['code' => 400, 'msg' => 'appid错误','data' => 'fail'],
//        'appid.min' => ['code' => 400, 'msg' => 'appid错误','data' => 'fail'],
//        'appid.max' => ['code' => 400, 'msg' => 'appid错误','data' => 'fail'],
//        'sign.require' => ['code' => 400, 'msg' => '签名错误','data' => 'fail'],
//        'sign.min' => ['code' => 400, 'msg' => '签名错误','data' => 'fail'],
//        'sign.max' => ['code' => 400, 'msg' => '签名错误','data' => 'fail'],
//        'noncestr.max' => ['code' => 400, 'msg' => '随机字符串超出长度','data' => 'fail'],

    ];


    protected $scene = [
        'receiveCheck' => ['appid','sign','timestamp','noncestr','data'],
        'appInfo' => ['appid','secret'],
    ];
}