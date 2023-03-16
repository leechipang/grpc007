<?php


namespace app\controller\p2p\api;

use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\p2p\UserScoreRepository as repository;
use think\Db;
use think\initializer\Error;
use think\Request;
use crmeb\services\HttpService as Http;

class UserScore extends BaseController
{
    protected $repository;
    protected $uid;

    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
        if ($this->request->isLogin()) $this->uid = $this->request->uid();
    }

    public function userScore(Request $request)
    {
        [$page, $limit] = $this->getPage();
        $result = $this->repository->userScore($this->uid,null,null,$page,$limit);
        if (!$result) {
            \error('暂无数据',[],400);
        }
        return app('json')->success($result);
    }
}