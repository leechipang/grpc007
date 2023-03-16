<?php

namespace app\controller\p2p\back;

use crmeb\basic\BaseController;
use app\common\repositories\p2p\back\MerchantStateRepository;
use think\App;


/**
 * Class MerchantState
 * @package app\controller\p2p\back
 */
class MerchantState extends BaseController
{
    /**
     * @var MerchantStateRepository
     */
    protected $repository;

    /**
     * MerchantState constructor.
     * @param App $app
     * @param MerchantStateRepository $repository
     */
    public function __construct(App $app, MerchantStateRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['mer_id','mer_name','date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }

}
