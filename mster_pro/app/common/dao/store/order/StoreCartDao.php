<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------


namespace app\common\dao\store\order;


use app\common\dao\BaseDao;
use app\common\model\BaseModel;
use app\common\model\store\order\StoreCart;
use think\Collection;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\model\Relation;

class StoreCartDao extends BaseDao
{

    protected function getModel(): string
    {
        return StoreCart::class;
    }

    public function test()
    {
        return StoreCart::getDB()->with(['product' => function (Relation $query) {
            $query->where('store_name', '儿童节礼物');
        }])->select();
    }

    /**
     * @param array $ids
     * @param $uid
     * @param int|null $merId
     * @return array
     * @author xaboy
     * @day 2020/6/5
     */
    public function validIntersection(array $ids, $uid, int $merId = null): array
    {
        return StoreCart::getDB()->whereIn('cart_id', $ids)
            ->when($merId, function ($query, $merId) {
                $query->where('mer_id', $merId);
            })
            ->where('is_del', 0)->where('is_fail', 0)->where('is_pay', 0)->where('uid', $uid)->column('cart_id');
    }

    /**
     * @Author:Qinii
     * @Date: 2020/6/1
     * @param int $uid
     * @return mixed
     */
    public function getAll(int $uid)
    {
        $query = ($this->getModel())::where(['uid' => $uid, 'is_del' => 0, 'is_new' => 0, 'is_pay' => 0])
            ->with([
                'product' => function ($query) {
                    $query->field('product_id,image,store_name,is_show,status,is_del,unit_name,price,mer_status,is_used,product_type,score');
                },
                'productAttr' => function ($query) {
                    $query->field('product_id,stock,price,score,unique,sku,image');
                },
                'merchant' => function ($query) {
                    $query->field('mer_id,mer_name,mer_state,mer_avatar');
                }
            ])->select();

        return $query;
    }

    public function cartIbByData(array $ids, int $uid, ?int $cityId, bool $confirm = true)
    {
        return StoreCart::getDb()->where('uid', $uid)->with(['product' => function (Relation $query) use ($cityId) {
            $query->field('product_id,image,store_name,is_show,status,is_del,unit_name,price,mer_status,temp_id,give_coupon_ids,is_gift_bag,is_used,product_type,old_product_id');
            if ($cityId) {
                $query->with(['temp' => ['region' => function (Relation $query) use ($cityId) {
                    $query->where(function ($query) use ($cityId) {
                        $query->whereLike('city_id', "%/{$cityId}/%")->whereOr('city_id', '0');
                    })->order('shipping_template_region_id DESC')->withLimit(1);
                }, 'undelives' => function ($query) use ($cityId) {
                    $query->whereLike('city_id', "%/{$cityId}/%");
                }, 'free' => function (Relation $query) use ($cityId) {
                    $query->whereLike('city_id', "%/{$cityId}/%")->order('shipping_template_free_id DESC')->withLimit(1);
                }]]);
            }
        }, 'productAttr' => function (Relation $query) use ($confirm) {
            $query->field('image,extension_one,extension_two,score,product_id,stock,price,unique,sku,volume,weight,ot_price ' . ($confirm ? '' : ',cost'))
                ->append(['bc_extension_one', 'bc_extension_two']);
        }, 'merchant' => function (Relation $query) use ($uid) {
            $query->field('mer_id,mer_name,mer_state,mer_avatar')->with(['coupon' => function ($query) use ($uid) {
                $query->where('uid', $uid);
            }]);
        }])->whereIn('cart_id', $ids)->order('product_type DESC,cart_id DESC')->select();
    }

    /**
     * @param array $cartIds
     * @param int $uid
     * @author Qinii
     */
    public function batchDelete(array $cartIds, int $uid)
    {
        return ($this->getModel()::getDB())->where('uid', $uid)->whereIn('cart_id', $cartIds)->delete();
    }

    /**
     * @param int $uid
     * @return mixed
     * @author Qinii
     */
    public function getCartCount(int $uid)
    {
        $data = ($this->getModel()::getDB())->where(['uid' => $uid, 'is_del' => 0, 'is_new' => 0, 'is_pay' => 0])->field('SUM(cart_num) as count')->select();
        $data[0]['count'] = $data[0]['count'] ? $data[0]['count'] : 0;
        return $data;
    }

    /**
     * @param $source
     * @param array|null $ids
     * @author xaboy
     * @day 2020/8/31
     */
    public function getSourcePayInfo($source, ?array $ids = null)
    {
        return StoreCart::getDB()->alias('A')->where('A.source', $source)->where('A.is_pay', 1)->when($ids, function ($query, $ids) {
            $query->whereIn('A.source_id', $ids);
        })->leftJoin('StoreOrderProduct B', 'A.cart_id = B.cart_id')
            ->field('sum(B.product_num) as pay_num,sum(B.product_price) as pay_price,A.source_id')->group('A.source_id')->select();
    }
}
