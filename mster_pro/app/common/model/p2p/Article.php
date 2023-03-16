<?php


namespace app\common\model\p2p;


use app\common\model\article\ArticleCategory;
use app\common\model\article\ArticleContent;
use app\common\model\BaseModel;

class Article extends BaseModel
{
    /**
     * @return string
     * @author xaboy
     * @day 2020-03-30
     */
    public static function tablePk(): string
    {
        return 'article_id';
    }

    /**
     * @return string
     * @author xaboy
     * @day 2020-03-30
     */
    public static function tableName(): string
    {
        return 'article';
    }

    /**
     * @return \think\model\relation\HasOne
     * @author Qinii
     */
    public function content()
    {
        return $this->hasOne(ArticleContent::class,'article_content_id','article_id');
    }

    /**
     * @return \think\model\relation\HasOne
     * @author Qinii
     */
    public function articleCategory()
    {
        return $this->hasOne(ArticleCategory::class ,'article_category_id','cid');
//            ->field('article_category_id,title');
    }
}