<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\p2p\StoreScoreProductOrder;
use app\common\model\store\order\StoreOrder;

class StoreScoreProductOrderDao  extends BaseDao
{
    protected function getModel(): string
    {
        return StoreScoreProductOrder::class;
    }

    public function search(){
        return StoreScoreProductOrder::getDB();
    }

    /**
     * 积分兑换明细
     * @param $uid
     * @param $page
     * @param $limit
     * @return \think\Collection
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 16:04
     */
    public function storeScoreOrder ($uid,$page, $limit) {
        $data = StoreScoreProductOrder::getDB()
            ->with(['merchant' => function($query) {
                $query->field('mer_id,mer_name');
            },'StoreCart' => function($query) {
                $query->with(['productAttr' => function($query){
                    $query->field('product_id,sku,unique');
                },'product' => function($query) {
                    $query->field('product_id,store_name,image');
                }])->field('cart_id,product_id,product_attr_unique');
            },'groupOrder' => function($query) use ($uid) {
                $query->where(['uid' => $uid,'use_score' => 1,'is_del' => 0])->field('group_order_id,group_order_sn');
            }])
            ->where(['uid' => $uid,'use_score' => 1,'is_del' => 0])
            ->where('score','>',0)
            ->field('order_id,group_order_id,mer_id,order_sn,uid,status,total_price,total_num,score,cart_id')
            ->order(['order_id' => 'desc'])
            ->page($page,$limit)
            ->select()->each(function ($item) {
                unset($item['StoreCart']['product_attr_unique'],$item['StoreCart']['productAttr']['unique']);
                $item['order_sn'] = $item['groupOrder']['group_order_sn'];
                unset($item['groupOrder']);
                $item['StoreCart']['productAttr']['sku'] = str_replace(',','|',$item['StoreCart']['productAttr']['sku']);
            });
        return $data;
    }

    /**
     * 兑换详情
     * @param $uid
     * @param $order_id
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 17:55
     */
    public function scoreOrderDetail($uid,$order_id) {
        $data = StoreScoreProductOrder::getDB()
            ->with(['merchant' => function($query) {
                $query->field('mer_id,mer_name');
            },'StoreCart' => function($query) {
                $query->with(['productAttr' => function($query){
                    $query->field('product_id,sku,unique');
                },'product' => function($query) {
                    $query->field('product_id,store_name,image');
                }])->field('cart_id,product_id,product_attr_unique');
            },'p2pMerchant' => function($query) {
                $query->field('id,name,logo');
            }])
            ->where(['uid' => $uid,'use_score' => 1,'order_id' => $order_id])
            ->where('score','>',0)
            ->field('order_id,mer_id,order_sn,uid,status,total_price,pay_postage,order_type,total_num,score,cart_id,real_name,user_phone,user_address,p2p_mer_id,pay_time')
            ->find();
        unset($data['StoreCart']['product_attr_unique'],$data['StoreCart']['productAttr']['unique']);

        return $data;
    }
}