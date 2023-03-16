<?php

namespace app\common\dao\p2p\back;

use app\common\dao\BaseDao;
use app\common\model\p2p\back\UserScore;


/**
 * Class UserScoreDao
 * @package app\common\dao\p2p\back
 */
class UserScoreDao extends BaseDao
{
    /**
     * @return string
     */
    protected function getModel(): string
    {
        return UserScore::class;
    }

    public function search(array $where = [])
    {
        return  UserScore::getInstance()->alias("US")
            ->Join("merchant M","M.mer_id = US.mer_id")
            ->Join("user U","U.uid = US.user_id")
            ->when(isset($where['mer_name']) && $where['mer_name'] !== '', function ($query) use ($where) {
                $query->whereLike('M.mer_name', "%{$where['mer_name']}%");
            })
            ->when(isset($where['nickname']) && $where['nickname'] !== '', function ($query) use ($where) {
                $query->whereLike('U.nickname', "%{$where['nickname']}%");
            })
            ->when(isset($where['keyword']) && $where['keyword'] !== '', function ($query) use ($where) {
                $query->where(function ($query) use ($where) {
                    $query->where('M.mer_name', 'like', "%{$where['keyword']}%")
                        ->whereOr('U.nickname', $where['keyword']);
                });
            })
            ->when(isset($where['date']) && $where['date'] !== '', function ($roleModel) use ($where) {
                getModelTime($roleModel, $where['date'], 'US.create_time');
            })->order('id DESC')->where('US.is_del',0)->field('US.*,U.nickname,M.mer_name');
    }

}
