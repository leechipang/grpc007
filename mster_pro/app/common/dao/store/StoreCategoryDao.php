<?php

// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

namespace app\common\dao\store;

use app\common\dao\BaseDao;
use app\common\model\store\StoreCategory as model;
use crmeb\traits\CategoresDao;

class StoreCategoryDao extends BaseDao
{

    use CategoresDao;

    protected function getModel(): string
    {
        return model::class;
    }


    public function fieldExistsList(?int $merId, $field, $value, $except = null)
    {
        return ($this->getModel()::getDB())->when($except, function ($query) use ($field, $except) {
            $query->where($field, '<>', $except);
        })->when(($merId !== null), function ($query) use ($merId) {
            $query->where('mer_id', $merId);
        })->where($field, $value);

    }

    public function getOneLevel($merId = 0)
    {
        return model::getDB()->where('pid', 0)->where(['mer_id' => $merId, 'is_show' => 1])->order('sort DESC')->column('store_category_id,cate_name,pid as ppid');
    }

    public function getTwoLevel($merId = 0)
    {
        $pid = model::getDB()->where('pid', 0)->where('mer_id', $merId)->column('store_category_id');
        return model::getDB()->whereIn('pid', $pid)->where('is_show', 1)->where('mer_id', $merId)->order('sort DESC')->column('store_category_id,cate_name,pid');
    }

    public function children($pid, $merId = 0)
    {
        return model::getDB()->where('pid', $pid)->where('mer_id', $merId)->where('is_show', 1)->order('sort DESC')->column('store_category_id,cate_name,pic');
    }

    public function allChildren($id)
    {
        $path = model::getDB()->where('store_category_id', $id)->where('mer_id', 0)->value('path');
        return model::getDB()->whereLike('path', "$path%")->where('mer_id', 0)->order('sort DESC')->column('store_category_id');
    }

    public function checkAllChildren($id, $level = null)
    {
        //有下级返回下级，没下级返回上级
        $columnIds = model::getDB();
        if (gettype($id) == "array") {
            $columnIds = $columnIds->whereIn('pid', $id);
        } else {
            $columnIds = $columnIds->where('pid', $id);
        }
        $columnIds = $columnIds->column('store_category_id');
        if ($level == 2) {
            return $columnIds;
        }
        if (!$columnIds) {
            return [$id];
        } else {
            $allChildren = model::getDB()->whereIn('pid', $columnIds)->column('store_category_id');
            if (!$allChildren) {
                return $columnIds;
            } else {
                return $allChildren;
            }
        }

    }

    public function getMaxLevel($merId = null)
    {
        if ($merId) return 2;
        return 3;
    }
}
