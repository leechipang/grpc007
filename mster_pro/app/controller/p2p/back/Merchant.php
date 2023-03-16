<?php

namespace app\controller\p2p\back;

use app\common\repositories\p2p\back\MerchantRepository;
use app\validate\p2p\back\MerchantValidates;
use crmeb\basic\BaseController;
use think\App;

class Merchant extends BaseController
{

    protected $repository;

    public function __construct(App $app, MerchantRepository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    public function list()
    {
        [$page, $limit] = $this->getPage();
        $where = $this->request->params(['id','keyword', 'name','status', 'date']);
        return app('json')->success($this->repository->search($where, $page, $limit));
    }


    public function createForm()
    {
        return app('json')->success(formToData($this->repository->form()));
    }


    public function updateForm($id)
    {
        if (!$id)
            return app('json')->fail('数据不存在【更新1】');
        return app('json')->success(formToData($this->repository->updateForm( $id)));
    }

    public function create(MerchantValidates $validate)
    {
        $data = $this->checkParam($validate);
        $data['create_time']=date("Y-m-d H:i:s");
        $data['appid']='tth'.substr(md5(time().mt_rand(1000000,9999999)),0,15);
        $data['secret']=md5(time().mt_rand(1000000,9999999));
        $appid=$this->repository->selects(['appid'=>$data['appid']]);
        $secret=$this->repository->selects(['secret'=>$data['secret']]);
        if($appid){
            $data['appid']='tth'.substr(md5(time().mt_rand(1000000,9999999)),0,15);
        }
        if($secret){
            $data['secret']=md5(time().mt_rand(1000000,9999999));
        }
        $this->repository->create($data);
        return app('json')->success('添加成功');
    }


    public function update($id, MerchantValidates $validate)
    {
        $data = $this->checkParam($validate);
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在【更新2】');
        $data['update_time']=date("Y-m-d H:i:s");
        $this->repository->update($id, $data);
        return app('json')->success('编辑成功');
    }


    public function switchStatus($id)
    {
        $status = $this->request->param('status');
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在【状态】');
        $this->repository->update($id, ['status' => $status == 1 ? 1 : 0]);
        return app('json')->success('编辑成功');
    }

    public function del($id)
    {
        if (!$this->repository->exists($id))
            return app('json')->fail('数据不存在');

        $this->repository->update($id, ['is_del' => 1]);
        return app('json')->success('删除成功');
    }


    private function checkParam(MerchantValidates $validate)
    {
        $data = $this->request->params(['name', 'logo','rate_to_us','status','ip_list','notify_url']);
        $validate->check($data);
        return $data;
    }

}
