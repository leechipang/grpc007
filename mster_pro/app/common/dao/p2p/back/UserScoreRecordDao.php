<?php

namespace app\common\dao\p2p\back;
use app\common\dao\BaseDao;
use app\common\model\p2p\back\UserScoreRecord;

/**
 * Class UserScoreRecordDao
 * @package app\common\dao\p2p\back
 */
class UserScoreRecordDao extends BaseDao
{
    /**
     * @return string
     */
    protected function getModel(): string
    {
        // TODO: Implement getModel() method.
        return UserScoreRecord::class;
    }

    public function search(array $where=[])
    {
        return UserScoreRecord::getDB()->alias('ur')
            ->join('user u','u.uid=ur.uid')
            ->when(isset($where['nickname']) && $where['nickname'] !== '', function ($query) use ($where) {
                $query->whereLike('u.nickname', "%{$where['nickname']}%");
            })
            ->when(isset($where['remark']) && $where['remark'] !== '', function ($query) use ($where) {
                $query->whereLike('ur.remark', "%{$where['remark']}%");
            })
            ->when(isset($where['type']) && $where['type'] !== '', function ($query) use ($where) {
                $query->where('ur.type', "{$where['type']}");
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'ur.create_time');
            })
            ->order('id DESC')->field('ur.id,ur.uid,ur.cart_id,ur.score,ur.type,ur.remark,ur.create_time,u.nickname');
    }

}