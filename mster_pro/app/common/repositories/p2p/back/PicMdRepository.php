<?php


namespace app\common\repositories\p2p\back;

use app\common\dao\p2p\back\PicMdDao;
use app\common\repositories\BaseRepository;
use FormBuilder\Factory\Elm;
use FormBuilder\Form;
use think\facade\Route;

class PicMdRepository extends BaseRepository
{
    /**
     * PicMdRepository constructor.
     * @param PicMdDao $dao
     */
    public function __construct(PicMdDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * @param array $where
     * @param $page
     * @param $limit
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function search( array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count', 'list');
    }

    /**
     * @param int|null $id
     * @param array $formData
     * @return Form
     * @throws \FormBuilder\Exception\FormBuilderException
     */
    public function forms(?int $id = null, array $formData = []): Form
    {
        $form = Elm::createForm(is_null($id) ? Route::buildUrl('systemPicMdCreate')->build() : Route::buildUrl('systemPicMdUpdate', ['id' => $id])->build());
        $form->setRule([
            Elm::frameImage('pic', '热卖图片（660*180px）', '/' . config('admin.admin_prefix') . '/setting/uploadPic?field=pic&type=2')->width('660px')->height('180px')->props(['footer' => false])->modal(['modal' => false, 'custom-class' => 'suibian-modal']),
            Elm::switches('status', '是否开启', 1)->inactiveValue(0)->activeValue(1)->inactiveText('关闭')->activeText('开启'),
        ]);
        return $form->setTitle(is_null($id) ? '添加图片' : '编辑图片')->formData($formData);
    }


    public function form(int $id = null, array $formData = [])
    {
        $form = Elm::createForm(is_null($id) ? Route::buildUrl('systemPicMdCreate')->build() : Route::buildUrl('systemPicMdUpdate', ['id' => $id])->build());
        $form->setRule([
//            Elm::input('title', '分类名称')->required(),
//            Elm::input('info', '分类简介'),
            Elm::frameImage('pic', '热卖图片（660*180px）', '/' . config('admin.admin_prefix') . '/setting/uploadPicture?field=pic&type=1')->width('896px')->height('480px')->props(['footer' => false])->modal(['modal' => false, 'custom-class' => 'suibian-modal']),
            Elm::switches('status', '状态', 1)->activeValue(1)->inactiveValue(0)->inactiveText('禁用')->activeText('启用'),
//            Elm::number('sort', '排序', 0),
        ]);

        return $form->setTitle(is_null($id) ? '添加图片' : '编辑图片')->formData($formData);
    }



    /**
     * @param int $id
     * @return bool
     */
    public function exists(int $id)
    {
        return $this->dao->exists($id);
    }

    /**
     * @param int $id
     * @return Form
     * @throws \FormBuilder\Exception\FormBuilderException
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function updateForm(int $id)
    {
        return $this->form( $id, $this->dao->get($id)->toArray());
    }

}