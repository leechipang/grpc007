<?php

namespace app\common\repositories\p2p\back;

use app\common\dao\p2p\back\MerchantStateDao;
use app\common\repositories\BaseRepository;
use FormBuilder\Factory\Elm;
use think\facade\Route;

/**
 * Class MerchantStateRepository
 * @package app\common\repositories\p2p\back
 */
class MerchantStateRepository extends BaseRepository
{
    /**
     * MerchantStateRepository constructor.
     * @param MerchantStateDao $dao
     */
    public function __construct(MerchantStateDao $dao)
    {
        $this->dao = $dao;
    }

    public function search( array $where, $page, $limit)
    {
        $query = $this->dao->search($where);
        $count = $query->count();
        $list = $query->page($page, $limit)->select();
        return compact('count', 'list');
    }

}
