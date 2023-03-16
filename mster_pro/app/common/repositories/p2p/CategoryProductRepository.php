<?php


namespace app\common\repositories\p2p;


use app\common\repositories\BaseRepository;
use app\common\dao\p2p\CategoryProductDao;
use app\common\repositories\store\product\SpuRepository;
use app\common\repositories\store\StoreCategoryRepository;

class CategoryProductRepository extends BaseRepository
{
    public function __construct(CategoryProductDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 首页一级分类商品
     * @return array
     * @author Lizjun
     * @date 2021-03-11 17:43
     */
    public function getApiSearch(){
        $cates = $this->dao->search()->where(['in_home' => 1,'is_show' => 1])
            ->order('sort','desc')
            ->field('store_category_id,level')
            ->group('store_category_id')
            ->select()->toArray();
        $spu = app()->make(SpuRepository::class);
        $data = [];
        foreach ($cates as $item) {
            $where['is_gift_bag'] = 0;
            switch ($item['level']) {
                case 0:
                    $where['ppid'] = $item['store_category_id'];
                    break;
                case 1:
                    $where['pid'] = $item['store_category_id'];
                    break;
                case 2:
                    $where['cate_id'] = $item['store_category_id'];
                    break;
            }
            $data[] = $spu->getApiSearch($where, 1, 18, null);
            $where = [];
        }
        $newData = [];
        foreach ($data as $item) {
            if (count($item['list']) > 0) {
                $newData[] = $item;
            }
        }
        return $newData;
    }

    /**
     * 分类信息
     * @param $store_category_id
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-11 17:43
     */
    public function cateInfo($store_category_id){
        return $this->dao->search()
            ->where(['store_category_id' => $store_category_id])
            ->field('store_category_id,cate_name,backImg')
            ->find();

    }

}