<?php


namespace app\validate\p2p\back;

use think\Validate;

class MerchantStateValidate extends Validate
{
    protected $failException = true;

    protected $rule = [
//        'mer_id|选择分类' => 'require|integer',
//        'title|标题' => 'require|max:32',
//        'content|内容' => 'require',
//        'author|作者' => 'require|max:32',
//        'image_input|图片' => 'require|max:128',
//        'is_hot|是否热门' => 'require|integer',
//        'is_banner|是否为Banner' => 'require|integer'
    ];
}