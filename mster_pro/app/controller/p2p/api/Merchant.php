<?php


namespace app\controller\p2p\api;

use app\common\repositories\user\UserRepository;
use crmeb\basic\BaseController;
use think\App;
use app\common\repositories\p2p\MerchantRepository as repository;
use think\Db;
use think\Request;

class Merchant extends BaseController
{
    protected $repository;

    /**
     * Integral constructor.
     * @param App $app
     * @param repository $repository
     */
    public function __construct(App $app, repository $repository)
    {
        parent::__construct($app);
        $this->repository = $repository;
    }

    /**
     * appid 和 secret 获取access_token
     * @param Request $request
     * @return \think\response\Json
     * @author Lizjun
     * @date 2021-03-06 10:44
     */
    public function getAccessToken(Request $request)
    {
        if ($request->isGet()) {
            $data = [
                'appid' => $request->get('appid'),
                'secret' => $request->get('secret'),
            ];
            $dbRes = $this->repository->getMerchant($data);
            if ($dbRes['status'] != 200) {
                return json($dbRes);
            }
            $data['id'] = $dbRes['result']->id;
            return app('json')->success($this->repository->accessToken($data, 'get'));
        } else {
            return app('json')->fail('The request method is wrong');
        }
    }

    /**
     * 积分同步
     * @param Request $request
     * @return \think\response\Json
     * @author Lizjun
     * @date 2021-03-09 11:42
     */
    public function integralSynchronous(Request $request)
    {
        if ($request->isPost()) {
            $postData = $request->only(["appid", "sign", "timestamp", "noncestr", "data"]);
            $postData['data'] = json_decode($postData['data'], true);
            $res = $this->repository->integralSynchronous($postData);
            if (!$res) error('同步失败', "", 400);
            return app('json')->success('同步成功');
        }
    }

    //测试添加积分记录
    public function testAddScoreLog()
    {
        $this->repository->addUserScoreLog(
            [
                'mer_id' => 3,
                'user_id' => 20,
                'score' => 50
            ], null
        );
    }

    public function exchangeScore()
    {
        $data = $this->request->params(['mer_id','cart_id']);
        if (!$data['mer_id'] || !$data['cart_id']) error('兑换失败', "");
        if (!$this->repository->exchangeScore($data,$this->request->userInfo())) {
            return app('json')->fail('兑换失败');
        }
        return app('json')->success('兑换成功');

    }


}