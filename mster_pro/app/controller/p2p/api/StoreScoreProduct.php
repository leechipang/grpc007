<?php


namespace app\controller\p2p\api;


use app\common\model\BaseModel;
use app\common\repositories\p2p\StoreScoreProductRepository as repository;
use app\common\repositories\user\UserVisitRepository;
use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\store\product\SpuRepository;

class StoreScoreProduct extends BaseController
{
    protected $repository;
    protected $SpuRepository;

    public function __construct(App $app, repository $repository,SpuRepository $SpuRepository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        $this->SpuRepository = $SpuRepository;
    }

    /**
     * 积分商城
     * @return mixed
     * @author Lizjun
     * @date 2021-03-11 14:01
     */
    public function scoreProduct()
    {
        [$page, $limit] = $this->getPage();
        $result = $this->repository->scoreProduct($page, $limit);
        if (!$result) {
            \error('暂无数据', [], 400);
        }
        return app('json')->success($result);
    }

    /**
     * 首页积分商品
     * @return mixed
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-11 14:06
     */
    public function homeScoreProduct () {
        $result = $this->repository->scoreProductMore(1, 3,null);
        if (!$result) {
            \error('暂无数据', [], 400);
        }
        return app('json')->success($result['list']);
    }


}