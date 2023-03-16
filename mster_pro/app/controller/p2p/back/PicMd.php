<?php

namespace app\controller\p2p\back;

use app\common\repositories\p2p\back\PicMdRepository;
use app\validate\p2p\back\MerchantValidates;
use app\validate\p2p\back\PicMdValidate;
use crmeb\basic\BaseController;
use think\App;

/**
 * 首页热卖图
 * Class PicMd
 * @package app\controller\p2p\back
 */
class PicMd extends BaseController
{
    /**
     * @var PicMdRepository
     */
    protected $repository;

    /**
     * PicMd constructor.
     * @param App $app
     * @param PicMdRepository $repository
     */
    public function __construct(App $app, PicMdRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['status', 'date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }

    public function createForm()
    {
        return app('json')->success(formToData($this->repository->form()));
    }

    public function updateForm($id)
    {
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');
        return app('json')->success(formToData($this->repository->updateForm($id)));
    }

    public function create(PicMdValidate $validate)
    {
        $data = $this->checkParam($validate);
        $data['create_time']=date("Y-m-d H:i:s");
        $data['type']=1;
        $this->repository->create($data);
        return app('json')->success('添加成功');
    }

    public function update($id, PicMdValidate $validate)
    {
        $data = $this->checkParam($validate);
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');
        $this->repository->update($id, $data);
        return app('json')->success('编辑成功');
    }

    /**
     * @param PicMdValidate $validate
     * @return mixed
     */
    private function checkParam(PicMdValidate $validate)
    {
        $data = $this->request->params(['pic','status']);
        $validate->check($data);
        return $data;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function switchStatus($id)
    {
        $status = $this->request->param('status');
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');
        $this->repository->update($id, ['status' => $status == 1 ? 1 : 0]);
        return app('json')->success('更新成功');
    }

    /**
     * @param $id
     * @return mixed
     */
    public function del($id)
    {
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');
        $this->repository->update($id, ['is_del' => 1]);
        return app('json')->success('删除成功');
    }

}
