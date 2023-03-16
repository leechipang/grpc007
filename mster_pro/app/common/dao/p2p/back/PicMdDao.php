<?php

namespace app\common\dao\p2p\back;

use app\common\dao\BaseDao;
use app\common\model\p2p\back\Merchant;
use app\common\model\p2p\back\PicMd;

/**
 * Class PicMdDao
 * @package app\common\dao\p2p\back
 */
class PicMdDao extends BaseDao
{
    /**
     * @return string
     */
    protected function getModel(): string
    {
        return PicMd::class;
    }

    /**
     * @param array $where
     * @return PicMd
     */
    public function search(array $where = [])
    {
        return  PicMd::getInstance()
            ->when(isset($where['status']) && $where['status'] !== '', function ($query) use ($where) {
                $query->where('status', $where['status']);
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'create_time');
            })->order('id DESC')->where('is_del', 0)->where('type',1)->field('*');
    }

    /**
     * @param int $id
     * @return bool
     */
    public function exists(int $id)
    {
        return $this->fieldExists($this->getPk(), $id);
    }

    /**
     * @param $field
     * @param $value
     * @param int|null $except
     * @return bool
     */
    public function fieldExists($field, $value, ?int $except = null): bool
    {
        $query = PicMd::getDB()->where($field, $value);
        if (!is_null($except)) $query->where($this->getPk(), '<>', $except);
        return $query->count() > 0;
    }
}