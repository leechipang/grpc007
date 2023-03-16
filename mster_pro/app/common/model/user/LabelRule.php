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


namespace app\common\model\user;


use app\common\model\BaseModel;

class LabelRule extends BaseModel
{

    public static function tablePk(): ?string
    {
        return 'label_rule_id';
    }

    public static function tableName(): string
    {
        return 'label_rule';
    }

    public function label()
    {
        return $this->hasOne(UserLabel::class, 'label_id', 'label_id');
    }
}