<?php

namespace app\controller\p2p\back;
use crmeb\basic\BaseController;
use app\common\repositories\p2p\back\UserScoreRecordRepository;
use think\App;

/**
 * Class UserScoreRecord
 * @package app\controller\p2p\back
 */
class UserScoreRecord extends BaseController
{
    protected $repository;

    /**
     * UserScoreRecord constructor.
     * @param App $app
     * @param UserScoreRecordRepository $repository
     */
    public function __construct(App $app,UserScoreRecordRepository $repository)
    {
        parent::__construct($app);
        $this->repository=$repository;
    }

    public function list()
    {
        [$page,$limit]=$this->getPage();
        $where=$this->request->params(['type','remark','nickname','date']);
        return app('json')->success($this->repository->search($where,$page,$limit));
    }


}