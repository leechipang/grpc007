<?php


namespace app\common\dao\p2p;


use app\common\dao\BaseDao;
use app\common\model\article\ArticleCategory;
use app\common\model\p2p\Article;

class ArticleDao extends BaseDao
{
    protected function getModel(): string
    {
        return Article::class;
    }

    public function search () {
        return Article::getDB();
    }

    /**
     * 平台积分规则
     * @return array|\think\Model|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author Lizjun
     * @date 2021-03-12 19:18
     */
    public function scoreArticle() {
        return Article::hasWhere('articleCategory',['status' => 1],'article_id,cid,title')
            ->with(['content'])
            ->where(['Article.status' => 1])
            ->where('Article.title','like','平台积分使用规则')
            ->find();
    }

}