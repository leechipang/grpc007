<?php


namespace app\common\repositories\p2p;


use app\common\dao\p2p\StoreScoreProductDao;
use app\common\repositories\BaseRepository;

class StoreScoreProductRepository extends BaseRepository
{
    public function __construct(StoreScoreProductDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 积分商城
     * @param $page
     * @param $limit
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-11 14:01
     */
    public function scoreProduct($page, $limit)
    {
        $top = $this->scoreProductMore(1, 2,null)['list'];
        $productIds = array_column($top->toArray(), 'product_id');
        $data = $this->scoreProductMore($page, $limit, $productIds);
        return compact('top', 'data');
    }

    /**
     * 积分商品
     * @param $page
     * @param $limit
     * @param $productIds
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-11 10:31
     */
    public function scoreProductMore($page, $limit, $productIds)
    {
        $search = $this->dao->search()
            ->when($productIds, function ($query) use ($productIds) {
                $query->whereNotIn('product_id',$productIds);
            })
            ->where('score', '>', 0)
            ->where(['is_show&mer_status&status&is_used' => 1, 'is_del' => 0]);
        $list = $search->page($page, $limit)
            ->field('product_id,store_name,mer_id,image,price,score,sales')
            ->order('score', 'desc')
            ->select();
        $count = $search->count();
        return compact('list', 'count');
    }
}