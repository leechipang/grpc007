<?php

namespace app\controller\p2p\back;

use crmeb\basic\BaseController;
use app\common\repositories\p2p\back\UserScoreRepository;

use app\validate\admin\StoreProductReplyValidate;
use FormBuilder\Exception\FormBuilderException;

use think\App;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * Class UserScore
 * @package app\controller\p2p\back
 * @author lzp
 * @day 2021.03.10
 */
class UserScore extends BaseController
{
    /**
     * @var UserScore
     */
    protected $repository;

    /**
     * UserScore constructor.
     * @param App $app
     * @param UserScoreRepository $repository
     */
    public function __construct(App $app, UserScoreRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['keyword', 'date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }

    public function del($id)
    {
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在【删除】');
        $this->repository->update($id, ['is_del' => 1]);
        return app('json')->success('删除成功');
    }
}
