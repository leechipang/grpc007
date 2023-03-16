<?php


namespace app\common\repositories\p2p;


use app\common\repositories\BaseRepository;
use app\common\dao\p2p\ArticleDao;

class ArticleRepository extends BaseRepository
{
    public function __construct(ArticleDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 平台积分规则AND用户积分列表
     * @param $uid
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 19:19
     */
    public function scoreArticle($uid) {
        $userSoreRe = app()->make(UserScoreRepository::class);
        $userScore = $userSoreRe->userScore($uid);
        $scoreArticle =  $this->dao->scoreArticle();
        return compact('userScore','scoreArticle');
    }
}