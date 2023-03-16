<?php


namespace app\common\model\p2p;


use app\common\model\BaseModel;
use app\common\model\store\order\StoreCart;
use app\common\model\store\order\StoreGroupOrder;
use app\common\model\store\order\StoreOrder;
use app\common\model\store\product\ProductAttrValue;

class StoreScoreProductOrder extends BaseModel
{
    public static function tablePk(): string
    {
        return 'order_id';
    }

    public static function tableName(): string
    {
        return 'store_order';
    }

    public function merchant(){
        return $this->hasOne(\app\common\model\system\merchant\Merchant::class,'mer_id','mer_id');
    }

    public function p2pMerchant(){
        return $this->hasOne(Merchant::class,'id','p2p_mer_id');
    }

    public function StoreCart(){
        return $this->hasOne(StoreCart::class,'cart_id','cart_id');
    }

    public function groupOrder(){
        return $this->hasOne(StoreGroupOrder::class,'group_order_id','group_order_id');
    }

    //发货状态获取器
    public function getStatusAttr($value)
    {
        $status = [-1=>'已退款',0=>'待发货',1=>'待收货',2=>'待评价',3=>'已完成'];
        return $status[$value];
    }

    public function getOrderTypeAttr($value) {
        $status = [0=>'快递配送',1=>'自提'];
        return $status[$value];
    }

}