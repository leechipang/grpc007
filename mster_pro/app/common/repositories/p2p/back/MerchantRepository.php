<?php

namespace app\common\repositories\p2p\back;

use app\common\dao\p2p\back\MerchantDao;
use app\common\repositories\BaseRepository;
use FormBuilder\Factory\Elm;
use FormBuilder\Form;
use think\facade\Route;


class MerchantRepository extends BaseRepository
{

    public function __construct(MerchantDao $dao)
    {
        $this->dao = $dao;
    }

    public function search( array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count', 'list');
    }

    public function form(?int $id = null, array $formData = []): Form
    {
        $form = Elm::createForm(is_null($id) ? Route::buildUrl('systemMerchantsCreate')->build() : Route::buildUrl('systemMerchantsUpdate', ['id' => $id])->build());
        $form->setRule([
            Elm::input('name', '积分商家名称')->required(),
            Elm::number('rate_to_us', '积分比例(%)')->col(12),
            Elm::frameImage('logo', '积分商家logo', '/' . config('admin.admin_prefix') . '/setting/uploadPicture?field=logo&type=2')->width('896px')->height('480px')->props(['footer' => false])->modal(['modal' => false, 'custom-class' => 'suibian-modal']),
            Elm::input('notify_url', '通知地址url')->required(),
            Elm::input('ip_list', '可访ip(,隔开)')->required(),
            Elm::switches('status', '是否开启', 1)->inactiveValue(0)->activeValue(1)->inactiveText('关闭')->activeText('开启'),
        ]);
        return $form->setTitle(is_null($id) ? '添加积分商家' : '编辑积分商家')->formData($formData);
    }

    public function updateForm(int $id)
    {
        return $this->form( $id, $this->dao->get($id)->toArray());
    }


    public function selects(array $where)
    {
        return $this->dao->selectWhere($where)->toArray();
    }

    public function exists(int $id)
    {
        return $this->dao->exists($id);
    }

}
