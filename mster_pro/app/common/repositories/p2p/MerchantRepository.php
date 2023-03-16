<?php


namespace app\common\repositories\p2p;

use app\common\dao\p2p\MerchantDao;
use app\common\model\p2p\MerchantState;
use app\common\repositories\store\order\StoreCartRepository;
use app\common\repositories\user\UserRepository;
use app\common\dao\user\UserDao;
use app\common\model\user\User;
use app\controller\p2p\api\job\MerchantDoJob;
use app\controller\p2p\api\job\MerchantJob;
use crmeb\services\HttpService as Http;
use PhpOffice\PhpSpreadsheet\Reader\Xls\MD5;
use think\facade\Db;
use app\common\repositories\BaseRepository;
use app\validate\p2p\MerchantValidate as MCValidate;
use think\facade\Queue;

class MerchantRepository extends BaseRepository
{
    /**
     * MerchantRepository constructor.
     * @param MerchantDao $dao
     */
    public function __construct(MerchantDao $dao)
    {
        $this->dao = $dao;
    }

    //弃用
    public function getMerchant($data)
    {
        $valData = $data;
        $this->checkParams($valData, 'appInfo');
        $where = ['appid' => $data['appid'], 'status' => 1, 'is_del' => 0];
        $field = 'id,secret';
        $result = $this->dao->getMerchant($where, $field);
        if (!$result) return ['status' => 400, 'message' => 'appid无效或不存在'];
        if ($result && $result->secret != $data['secret']) return ['status' => 400, 'message' => 'secret错误'];
        return ['status' => 200, 'result' => $result];
    }

    /**
     * 弃用
     * appid 和 secret 获取access_token
     * @param array $data
     * @param string $type
     * @return array|string
     * @author Lizjun
     * @date 2021-03-06 14:44
     */
    public function accessToken($data, string $type)
    {
        $jsonData = json_encode($data);
        $md5Data = md5($jsonData);
        $result = cache('P2P_GET_ACCESS_TOKEN_CACHE_' . $md5Data);
        if ($result) return $result;
        //生成access_token
        $access_token = str_shuffle(strtoupper(base64_encode($md5Data) . uniqid()));
        if ($type == "check") {
            return $access_token;
        } elseif ($type == "get") {
            //access_token有效期
            $expires = 7200;
            cache('P2P_ACCESS_TOKEN_' . $access_token, $jsonData, $expires);
            $result = [
                'access_token' => $access_token,
                'expires_in' => $expires,
            ];
            cache('P2P_GET_ACCESS_TOKEN_CACHE_' . $md5Data, $result, $expires);
            return $result;
        }


    }

    /**
     * 弃用
     * 积分同步
     * @param $data
     * @return bool
     * @author Lizjun
     * @date 2021-03-16 15:42
     */
    public function integralSynchronous($data)
    {
        $validate = $data;
        //验证器校验参数
        $this->checkParams($validate, 'receiveCheck');
        //校验appid
        $merchant = $this->checkMerchant($data);
        if (!$merchant) error('appid错误', "", 400);
        $merchant = $merchant->toArray();
        //校验签名
        $signData = [
            'appid' => $data['appid'],
            'noncestr' => $data['noncestr'],
            'timestamp' => $data['timestamp'],
        ];
        $this->checkSign($signData, $merchant, $data);
        //截取前100条数据
        $data['data'] = array_slice($data['data'], 0, 100);
        //$merJob = app()->make(MerchantJob::class);
        $queueData = [];
        foreach ($data['data'] as $item) {
            $queueData[] = $item + $merchant;
//            $merJob->doJob($queueData);
//            Queue::later(1,MerchantJob::class,json_encode($queueData));
            //queue(MerchantJob::class,$queueData,2);
            //$this->startSynchronize($item,$merchant);
        }
        Queue::push(MerchantDoJob::class, $queueData);
        return true;
    }

    /**
     * 弃用
     * @param $data
     * @param $merchant
     * @return array
     * @author Lizjun
     * @date 2021-03-18 12:00
     */
    public function startSynchronize($data, $merchant)
    {
        //查询用户是否存在;不存在则新增
        $userRe = app()->make(UserRepository::class);
        $user = $userRe->checkUser(['phone' => $data['phone'], 'status' => 1], 'uid');
        if (!$user) {
            Db::startTrans();
            try {
                //新增用户
                $this->saveUser($data, $merchant);
                // 提交事务
                Db::commit();
                return ['status' => 200, 'message' => '同步成功'];
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                return ['status' => 400, 'message' => '同步失败'];
            }
        } else {
            $data['user_id'] = $user->uid;
            $data['mer_id'] = $merchant['id'];
            Db::startTrans();
            try {
                //修改用户积分
                $this->editUserScore($data, $merchant);
                Db::commit();
                return ['status' => 200, 'message' => '同步成功'];
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                return ['status' => 400, 'message' => '同步失败'];
            }
        }
    }

    /**
     * 查询第三方平台信息
     * @param $data
     * @return array|\think\Model|null
     * @author Lizjun
     * @date 2021-03-18 12:00】
     */
    public function checkMerchant($data)
    {
        $where = ['appid' => $data['appid'], 'status' => 1, 'is_del' => 0];
        $field = 'id,secret';
        $result = $this->dao->getMerchant($where, $field);
        return $result;
    }

    /**
     * 签名
     * @param $signData
     * @param $merchant
     * @return string
     * @author Lizjun
     * @date 2021-03-19 16:21
     */
    public function Sign($signData, $merchant)
    {
        ksort($signData);
        $key = $merchant['secret'];
        $new = [];
        foreach ($signData as $k => $v) {
            $new[] = "$k=$v";
        }
        $new[] = "key=$key";
        $str = implode('&', $new);
        $sign = strtoupper(MD5($str));
        return $sign;
    }

    /**
     * 弃用
     * 新用户添加
     * @param $data
     * @param $merchant
     * @author Lizjun
     * @date 2021-03-16 15:05
     */
    public function saveUser($data, $merchant)
    {
        $user = app()->make(UserRepository::class);
        $from_id = $merchant['id'];
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
        $this->addUserScore($data, $merchant);
    }

    /**
     * 弃用
     * 新增某商户的用户积分
     * @param $data
     * @param $merchant
     * @author Lizjun
     * @date 2021-03-16 15:05
     */
    public function addUserScore($data, $merchant)
    {
        $userScore = app()->make(UserScoreRepository::class);
        $mer_id = $merchant['id'];
        $userScore->saveUserScore([
            'mer_id' => $mer_id,
            'user_id' => $data['user_id'],
            'mer_user_id' => $data['mer_user_id'],
            'score' => $data['score'],
            'create_time' => date('Y-m-d H:i:s'),
            'update_time' => date('Y-m-d H:i:s'),
        ]);
    }

    /**
     * 弃用
     * 修改某商户的用户积分
     * @param $data
     * @param $merchant
     * @author Lizjun
     * @date 2021-03-16 15:06
     */
    public function editUserScore($data, $merchant)
    {
        $userScoreRe = app()->make(UserScoreRepository::class);
        $mer_id = $merchant['id'];
        $uid = $data['user_id'];
        $where = ['mer_id' => $mer_id, 'user_id' => $uid, 'is_del' => 0];
        $userScore = $userScoreRe->check($where, 'id,score');
        if ($userScore) {
            $userScore->score = $data['score'];
            $userScore->save();
        } else {
            $this->addUserScore($data, $merchant);
        }
    }

    /**
     * 新增用户积分记录
     * @param $data
     * @param $cacheTokenData
     * @author Lizjun
     * @date 2021-03-08 17:17
     */
    public function addUserScoreLog($data, $cacheTokenData)
    {
        $userScore = app()->make(UserScoreLogRepository::class);
        $merchant = $this->dao->getMerchant(['id' => $data['mer_id']], 'rate_to_us');
        $userScore->saveUserScoreLog([
            'mer_id' => $data['mer_id'],
            'user_id' => $data['user_id'],
            'use_score' => $data['score'],
            'rate_to_us' => $merchant->rate_to_us,
            'remark' => '积分消费' . $data['score'],
            'create_time' => date('Y-m-d H:i:s'),
            'update_time' => date('Y-m-d H:i:s'),
        ]);
    }

    /**
     * 修改商户日消费积分
     * @param $data
     * @author Lizjun
     * @date 2021-03-09 11:36
     */
    public function editMerchant($data)
    {
        $MSR = app()->make(MerchantStateRepository::class);
        $where = [
            'mer_id' => $data['id'],
            'year' => date('Y'),
            'month' => date('m'),
            'day' => date('d'),
        ];
        $hasM = $MSR->check($where, 'id,score');
        if ($hasM) {
            $hasM->score = $hasM->score + $data['score'];
            $hasM->save();
        } else {
            $where['score'] = $data['score'];
            $where['create_time'] = date('Y-m-d H:i:s');
            $where['update_time'] = date('Y-m-d H:i:s');
            $MSR->saveMS($where);
        }
    }

    public function merchantNotifyUserList()
    {
        return $this->dao->search()->where(['is_del' => 0, 'status' => 1])->field('id,appid,secret,notify_url')->select()->toArray();
    }

    /**
     * 验证校验
     * @param $data mixed 校验数据
     * @param $scene mixed 需校验的字段
     * @return array|string
     * @author Lizjun
     * @date 2021-03-06 15:44
     */
    public function checkParams($data, $scene)
    {
        $validate = new MCValidate();
        $result = $validate->scene($scene)->check($data);
        if (!$result) {
            return $validate->getError();
        }

    }

    public function exchangeScore($data, $userInfo)
    {
        $card_id = $userInfo->card_id;  //身份证
        $phone = $userInfo->phone;  //手机号
        $uid = $userInfo->uid;  //用户ID

        $merchant = $this->dao->getMerchant(['id' => $data['mer_id'], 'status' => 1, 'is_del' => 0], 'id,appid,secret,rate_to_us,notify_url');
        if (!$merchant) error('兑换失败，此平台信息错误');
        $rate_to_us = $merchant->rate_to_us;
        $notify_url = $merchant->notify_url;
        $storeCartRe = app()->make(StoreCartRepository::class);
        $cartObj = $storeCartRe->getOneCart($data['cart_id'], $uid);
        if (!$cartObj) error('购物车信息错误！');
        $productScore = $cartObj->productAttr->score;
        $amount = $productScore * $rate_to_us;
        $postData = [
            'type' => 'exchange',
            'appid' => $merchant->appid,
            'phone' => $phone,
            'cart_id' => $card_id,
            'noncestr' => uniqid(),
            'timestamp' => time(),
            'amount' => $amount,
        ];
        $postData['sign'] = $this->Sign($postData,$merchant->toArray());

        //请求第三方接口进行兑换
        $res = Http::postRequest($notify_url, $postData);
        $res = json_decode($res, true);
        $userRe = app()->make(UserRepository::class);
        $p2pUserScoreLogRe = app()->make(UserScoreLogRepository::class);
        $userScoreLog = app()->make(\app\common\repositories\user\UserScoreLogRepository::class);
        if ($res['status'] == 200) {
            Db::startTrans();
            try {
                //增加用户账户积分
                $checkUser = $userRe->checkUser(['uid' => $uid], 'score');
                $checkUser->score = $checkUser->score + $productScore;
                $checkUser->save();
                //新增用户积分记录
                $userScoreLog->add([
                    'uid' => $uid,
                    'cart_id' => $data['cart_id'],
                    'score' => $productScore,
                    'type' => 2,
                    'remark' => '债权兑换获得积分',
                    'group_order_id' => null,
                    'create_time' => date('Y-m-d H:i:s')
                ]);
                //新增p2p积分记录
                $p2pUserScoreLogRe->saveUserScoreLog([
                    'mer_id' => $data['mer_id'],
                    'user_id' => $uid,
                    'use_score' => $productScore,
                    'rate_to_us' => $rate_to_us,
                    'remark' => '积分兑换' . $productScore,
                    'create_time' => date('Y-m-d H:i:s'),
                    'update_time' => date('Y-m-d H:i:s'),
                ]);
                //修改p2p商户日消费积分
                $this->editMerchant(['id' => $data['mer_id'], 'score' => $productScore]);
                Db::commit();
                return true;
            } catch (\Exception $e) {
                Db::rollback();
                return false;
            }
        } elseif ($res['status'] == 400) {
            error($res['message']);
        }
    }
}