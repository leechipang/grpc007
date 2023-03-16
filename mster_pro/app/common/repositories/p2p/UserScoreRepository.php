<?php


namespace app\common\repositories\p2p;

use app\common\dao\p2p\UserScoreDao;
use app\common\repositories\BaseRepository;

class UserScoreRepository extends BaseRepository
{
    public function __construct(UserScoreDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 新增某商户的用户积分
     * @param $data
     * @return int|string
     * @author Lizjun
     * @date 2021-03-09 11:16
     */
    public function saveUserScore($data)
    {
        return $this->dao->saveUserScore($data);
    }

    public function insertAll($data){
        return $this->dao->insertAll($data);
    }

    public function check($where, $field)
    {
        return $this->dao->search()->where($where)->field($field)->find();
    }

    public function selectUserScore ($where, $field) {
        return $this->dao->search()->where($where)->column($field);
    }

    /**
     * 用户积分列表
     * @param $uid mixed 用户ID
     * @param null $id 积分ID
     * @param $type mixed 1:单挑查询信息；2：单挑查询信息和回调接口
     * @param int $page
     * @param int $limit
     * @return mixed
     * @author Lizjun
     * @date 2021-03-20 10:34
     */
    public function userScore($uid,$id = null,$type = "",$page = 1,$limit = 10)
    {
        //return $this->dao->userScore(21);
        //$uid = 21;
        $where = ['user_id' => $uid, 'UserScore.is_del' => 0];
        $order = ['create_time' => 'desc'];
        $field = 'UserScore.id,UserScore.mer_id,UserScore.score as mer_score';
        $merchantField = 'id,name,rate_to_us,logo';
        if ($id && $type == 2) {
            $merchantField = $merchantField . ',notify_url';
        }
        $data = $this->dao->withSearch()::hasWhere('merchant', ['status' => 1,'is_del' => 0])
            ->with(['merchant' => function ($query) use ($merchantField) {
                $query->field($merchantField)->where(['is_del' => 0, 'status' => 1]);
            }])
            ->where($where)
            ->order($order)
            ->field($field);
        if ($id) {
            $data = $data->find($id);
        }else{
            $data = $data->page($page,$limit)->select()
                ->each(function ($item) {
                    $item['score'] = ($item['mer_score'] / $item['merchant']['rate_to_us']);
                });
        }
        return $data;
    }
}