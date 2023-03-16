<?php

namespace app\common\dao\p2p\back;

use app\common\dao\BaseDao;
use app\common\model\p2p\back\Merchant;


class MerchantDao extends BaseDao
{
    protected function getModel(): string
    {
        return Merchant::class;
    }

    public function search(array $where = [])
    {
        return  Merchant::getInstance()
            ->when(isset($where['status']) && $where['status'] !== '', function ($query) use ($where) {
                $query->where('status', $where['status']);
            })
            ->when(isset($where['name']) && $where['name'] !== '', function ($query) use ($where) {
                $query->whereLike('name', "%{$where['name']}%");
            })
            ->when(isset($where['keyword']) && $where['keyword'] !== '', function ($query) use ($where) {
                $query->where(function ($query) use ($where) {
                    $query->where('name', 'like', "%{$where['keyword']}%")
                        ->whereOr('id', $where['keyword']);
                });
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'create_time');
            })->order('id DESC')->where('is_del', 0)->field('*');
    }

    public function exists(int $id)
    {
        return $this->fieldExists($this->getPk(), $id);
    }

    public function fieldExists($field, $value, ?int $except = null): bool
    {
        $query = Merchant::getDB()->where($field, $value);
        if (!is_null($except)) $query->where($this->getPk(), '<>', $except);
        return $query->count() > 0;
    }

}
