<?php


namespace app\controller\p2p\api;

use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\p2p\CategoryProductRepository as repository;

class CategoryProduct extends BaseController
{
    protected $repository;

    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * 首页一级分类商品
     * @return mixed
     * @author Lizjun
     * @date 2021-03-11 17:43
     */
    public function lst () {
        return app('json')->success($this->repository->getApiSearch());
    }
}