<?php


namespace app\controller\p2p\api\job;


use app\common\repositories\p2p\UserScoreRepository;
use app\common\repositories\user\UserRepository;
use crmeb\interfaces\JobInterface;
use think\facade\Db;

class MerchantDoJob implements JobInterface
{
    public function fire($job, $data)
    {
        foreach ($data as $item){
            if ($this->doJob($item)) {
                $job->delete();
            }else {
                if ($job->attempts() > 6) {
                    return $job->delete();
                }
            }
        }
        $job->delete();
    }

    public function failed($data)
    {
        //$this->doJob($data);
        print_r($data);
        // TODO: Implement failed() method.
    }

    public function doJob($data)
    {
        //echo '执行业务逻辑:' . $data['phone'] . '\n';
        //查询用户是否存在;不存在则新增
        $userRe = app()->make(UserRepository::class);
        $user = $userRe->checkUser(['phone' => $data['phone'], 'status' => 1], 'uid');
        if (!$user) {
            Db::startTrans();
            try {
                //新增用户
                $this->saveUser($data);
                // 提交事务
                Db::commit();
                return true;
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                return false;
            }
        } else {
            $data['user_id'] = $user->uid;
            $data['mer_id'] = $data['id'];
            Db::startTrans();
            try {
                //修改用户积分
                $this->editUserScore($data);
                Db::commit();
                return true;
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                return false;
            }
        }
    }

    public function saveUser($data)
    {
        $user = app()->make(UserRepository::class);
        $from_id = $data['id'];
        //新增用户
        $user_id = $user->saveUser([
            'account' => $data['phone'],
            'pwd' => $user->encodePassword($data['phone']),   //默认密码
            'phone' => $data['phone'],
            'create_time' => date('Y-m-d H:i:s'),
            'from_id' => $from_id,
            'nickname' => $data['nickname'],
            //'avatar' => $data['avatar'],
        ]);
        $data['user_id'] = $user_id;
        $data['mer_id'] = $from_id;
        //新增用户积分
        $this->addUserScore($data);
    }

    public function addUserScore($data)
    {
        $userScore = app()->make(UserScoreRepository::class);
        $mer_id = $data['id'];
        $userScore->saveUserScore([
            'mer_id' => $mer_id,
            'user_id' => $data['user_id'],
            'mer_user_id' => $data['mer_user_id'],
            'score' => $data['score'],
            'create_time' => date('Y-m-d H:i:s'),
            'update_time' => date('Y-m-d H:i:s'),
        ]);
    }

    public function editUserScore($data)
    {
        $userScoreRe = app()->make(UserScoreRepository::class);
        $mer_id = $data['id'];
        $uid = $data['user_id'];
        $where = ['mer_id' => $mer_id, 'user_id' => $uid, 'is_del' => 0];
        $userScore = $userScoreRe->check($where, 'id,score');
        if ($userScore) {
            $userScore->score = $data['score'];
            $userScore->save();
        } else {
            $this->addUserScore($data);
        }
    }
}