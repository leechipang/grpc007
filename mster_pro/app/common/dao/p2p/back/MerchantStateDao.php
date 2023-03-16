<?php

namespace app\common\dao\p2p\back;

use app\common\dao\BaseDao;
use app\common\model\p2p\back\MerchantState;

/**
 * Class MerchantStateDao
 * @package app\common\dao\p2p\back
 */
class MerchantStateDao extends BaseDao
{
    protected function getModel(): string
    {
        return MerchantState::class;
    }

    public function search(array $where = [])
    {
        return  MerchantState::getInstance()->alias("MS")
            ->Join("merchant M","M.mer_id = MS.mer_id")
            ->when(isset($where['mer_id']) && $where['mer_id'] !== '', function ($query) use ($where) {
                $query->where('MC.mer_id', $where['mer_id']);
            })
            ->when(isset($where['mer_name']) && $where['mer_name'] !== '', function ($query) use ($where) {
                $query->whereLike('M.mer_name', "%{$where['mer_name']}%");
            })
            ->when(isset($where['keyword']) && $where['keyword'] !== '', function ($query) use ($where) {
                $query->where(function ($query) use ($where) {
                    $query->where('M.mer_name', 'like', "%{$where['keyword']}%")
                        ->whereOr('M.merId', $where['keyword']);
                });
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'MS.create_time');
            })->order('id DESC')->field('MS.*,M.mer_id as merId,M.mer_name');
    }
}
