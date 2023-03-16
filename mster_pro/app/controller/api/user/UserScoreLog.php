<?php


namespace app\controller\api\user;

use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\user\UserScoreLogRepository as repository;
class UserScoreLog extends BaseController
{
    protected $repository;

    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }
}