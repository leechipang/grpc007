<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\p2p\UserScore;

class UserScoreDao extends BaseDao
{

    protected function getModel(): string
    {
        return UserScore::class;
    }

    public function search(){
        return UserScore::getDB();
    }

    public function withSearch(){
        return $this->getModel();
    }

    public function saveUserScore($data){
        return UserScore::getDB()->save($data);
    }
    //暂时未用
    public function userScore($uid){
        $where = ['user_id' => $uid, 'UserScore.is_del' => 0];
        $order = ['create_time' => 'desc'];
        $field = 'UserScore.id,mer_id,score as mer_score';
        return UserScore::hasWhere('merchant', ['status' => 1,'is_del' => 0])
            ->with(['merchant' => function ($query) {
                $query->field('id,name,rate_to_us')->where(['is_del' => 0, 'status' => 1]);
            }])
            ->field('UserScore.id,score')
            ->where($where)
            ->order($order)
            ->select()
            ->each(function ($item) {
                $item['score'] = ($item['mer_score'] * $item['merchant']['rate_to_us']) / 100;
                return $item;
            });
    }
}