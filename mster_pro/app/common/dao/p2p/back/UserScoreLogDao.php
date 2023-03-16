<?php

namespace app\common\dao\p2p\back;

use app\common\dao\BaseDao;
use app\common\model\p2p\back\UserScoreLog;


/**
 * Class UserScoreLogDao
 * @package app\common\dao\p2p\back
 */
class UserScoreLogDao extends BaseDao
{
    /**
     * @return string
     */
    protected function getModel(): string
    {
        return UserScoreLog::class;
    }

    public function search(array $where = [])
    {
        return  UserScoreLog::getInstance()->alias('USL')
            ->join('merchant M ','USL.mer_id=M.mer_id')
            ->join('user U ','USL.user_id=U.uid')
            ->when(isset($where['remark']) && $where['remark'] !== '', function ($query) use ($where) {
                $query->whereLike('USL.remark', "%{$where['remark']}%");
            })
            ->when(isset($where['keyword']) && $where['keyword'] !== '', function ($query) use ($where) {
                $query->where(function ($query) use ($where) {
                    $query->where('M.mer_name', 'like', "%{$where['keyword']}%")
                        ->where('U.nickname', 'like', "%{$where['keyword']}%");
                });
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'USL.create_time');
            })->order('id DESC')->field('USL.*,U.nickname,M.mer_name');
    }
}
