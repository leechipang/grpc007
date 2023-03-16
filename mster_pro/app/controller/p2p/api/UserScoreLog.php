<?php


namespace app\controller\p2p\api;

use think\App;
use crmeb\basic\BaseController;
use app\common\repositories\p2p\UserScoreLogRepository as repository;

class UserScoreLog extends BaseController
{
    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }
}