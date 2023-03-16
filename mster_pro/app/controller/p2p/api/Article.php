<?php


namespace app\controller\p2p\api;

use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\p2p\ArticleRepository as repository;

class Article extends BaseController
{
    protected $repository;
    protected $uid;

    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        if ($this->request->isLogin()) $this->uid = $this->request->uid();

    }

    public function scoreArticle(){
        $result = $this->repository->scoreArticle($this->uid);
        if (!$result) {
            \error('暂无数据',[],400);
        }
        return app('json')->success($result);
    }
}