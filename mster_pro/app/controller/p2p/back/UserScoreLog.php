<?php

namespace app\controller\p2p\back;

use crmeb\basic\BaseController;
use app\common\repositories\p2p\back\UserScoreLogRepository;
use think\App;


/**
 * Class UserScoreLog
 * @package app\controller\p2p\back
 */
class UserScoreLog extends BaseController
{
    /**
     * @var UserScoreLog
     */
    protected $repository;

    /**
     * UserScoreLog constructor.
     * @param App $app
     * @param UserScoreLogRepository $repository
     */
    public function __construct(App $app, UserScoreLogRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['remark','keyword','date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }
}
