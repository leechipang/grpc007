<?php
namespace app\controller\p2p\back;

use app\common\repositories\p2p\back\PicDnRepository;
use app\validate\p2p\back\PicMdValidate;
use crmeb\basic\BaseController;
use think\App;

/**
 * 首页新品图
 * Class PicDn
 * @package app\controller\p2p\back
 */
class PicDn extends BaseController
{
    /**
     * @var PicDnRepository
     */
    protected $repository;

    /**
     * PicDn constructor.
     * @param App $app
     * @param PicDnRepository $repository
     */
    public function __construct(App $app, PicDnRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * @return mixed
     */
    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['status', 'date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }

    /**
     * @return mixed
     */
    public function createForm()
    {
        return app('json')->success(formToData($this->repository->form()));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function updateForm($id)
    {
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');
        return app('json')->success(formToData($this->repository->updateForm($id)));
    }

    /**
     * @param PicMdValidate $validate
     * @return mixed
     */
    public function create(PicMdValidate $validate)
    {
        $data = $this->checkParam($validate);
        $data['create_time']=date("Y-m-d H:i:s");
        $data['type']=2;
        $this->repository->create($data);
        return app('json')->success('添加成功');
    }

    /**
     * @param $id
     * @param PicMdValidate $validate
     * @return mixed
     */
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
