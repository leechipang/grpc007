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

namespace crmeb\services;

use app\common\repositories\store\order\StoreOrderRepository;
use app\common\repositories\store\ExcelRepository;
use app\common\repositories\store\order\StoreRefundOrderRepository;
use app\common\repositories\system\merchant\FinancialRecordRepository;
use think\Exception;

class ExcelService
{

    public function getAll($data)
    {
        $this->{$data['type']}($data['where'],$data['excel_id']);
    }

    public function export($header, $title_arr, $export = [],$path, $filename = '', $id,$suffix = 'xlsx')
    {
        $title = isset($title_arr[0]) && !empty($title_arr[0]) ? $title_arr[0] : '导出数据';
        $name = isset($title_arr[1]) && !empty($title_arr[1]) ? $title_arr[1] : '导出数据';
        $info = isset($title_arr[2]) && !empty($title_arr[2]) ? $title_arr[2] : date('Y-m-d H:i:s', time());

        try{
            $_path = SpreadsheetExcelService::instance()
                ->createOrActive()
                ->setExcelHeader($header)
                ->setExcelTile($title, $name, $info)
                ->setExcelContent($export)
                ->excelSave($filename, $suffix, $path);

            app()->make(ExcelRepository::class)->update($id,[
                'name' => $filename.'.'.$suffix,
                'status' => 1,
                'path' => '/'.$_path
            ]);

        }catch (Exception $exception){
            app()->make(ExcelRepository::class)->update($id,[
                'name' => $filename.'.'.$suffix,
                'status' => 2,
                'message' => $exception->getMessage()
            ]);
        }
    }

    /**
     * TODO 导出订单
     * @param array $where
     * @param int $id
     * @author Qinii
     * @day 2020-08-10
     */
    public function order(array $where,int $id)
    {
        $make = app()->make(StoreOrderRepository::class);
        $status = $where['status'];
        $del = $where['mer_id'] > 0 ? 0 : null;
        unset($where['status']);
        $query = $make->search($where,$del)->where($make->getOrderType($status))->order('order_id ASC');
        $list = $query->with([
            'orderProduct',
            'merchant' => function ($query) {return $query->field('mer_id,mer_name');},
            'user.spread'
            ])->select()->each(function($item){
                $item['refund_price'] = app()->make(StoreRefundOrderRepository::class)->refundPirceByOrder([$item['order_id']]);
            return $item;
            });
        $export = $this->orderList($list->toArray());
        $header =    [
            '序号','订单编号','订单类型','推广人','用户信息','商户名称',
            '商品名称','商品编号','商品规格','单商品总数','商品价格(元)','商品售价(元)','商品成本价(元)','优惠','实付邮费(元)','订单总价(元)','实付金额(元)','实付积分','平台手续费','已退款金额(元)',
            '收货人','收货人电话','收货地址','物流公司','物流单号','发货类型','发货时间','下单时间','付款时间','支付方式','支付状态','商家备注'
        ];
        $title = ['订单列表','订单信息','生成时间:' . date('Y-m-d H:i:s',time())];
        $filename = '订单列表_'.date('YmdHis');

        return $this->export($header,$title,$export,'order',$filename,$id,'xlsx');
    }

    /**
     * TODO 整理订单信息
     * @param array $data
     * @return array
     * @author Qinii
     * @day 2020-08-10
     */
    public function orderList(array $data)
    {
        $result = [];
        if(empty($data)) return $result;
        $i = 1;
        foreach ($data as $item){
//            halt($item);
            foreach ($item['orderProduct'] as $key => $value){
                if($item['delivery_type']==1){
                    $item['delivery_type']='发货';
                }elseif ($item['delivery_type']==2){
                    $item['delivery_type']='送货';
                }elseif($item['delivery_type']==3){
                    $item['delivery_type']='无需物流';
                }else{
                    $item['delivery_type']='';
                }

                $result[] = [
                    $i,
                    $item['order_sn'],
                    $item['order_type'] ? '核销订单':'普通订单',
                    $item['user']['spread']['nickname'],
                    $item['user']['nickname'],
                    $item['merchant']['mer_name'],
                    $value['cart_info']['product']['store_name'],
                    $value['cart_info']['productAttr']['bar_code']??"",
                    $value['cart_info']['productAttr']['sku'],
                    $value['product_num'],
                    $value['cart_info']['product']['price'],
                    $value['cart_info']['productAttr']['ot_price']??0.00,
                    $value['cart_info']['productAttr']['cost']??0.00,
                    ($key == 0 ) ? $item['coupon_price'] : 0,
                    ($key == 0 ) ? $item['pay_postage'] : 0,
                    ($key == 0 ) ? $item['total_price'] : 0,
                    ($key == 0 ) ? $item['pay_price'] : 0,
                    ($key == 0 ) ? $item['score'] : 0,
                    ($key == 0 ) ? $item['commission_rate'] : 0,
                    ($key == 0 ) ? $item['refund_price'] : 0,
                    $item['real_name'],
                    $item['user_phone'],
                    $item['user_address'],
                    $item['delivery_name']??'',
                    $item['delivery_id']??'',
                    $item['delivery_type'],
                    $item['send_time'],
                    $item['create_time'],
                    $item['pay_time'],
                    $item['pay_type'] ? '微信': '余额',
                    $item['paid'] ? '已支付':'未支付',
                    $item['remark']
                ];
                $i++;
            }
        }
        return $result;
    }

    /**
     * TODO 流水记录导出
     * @param array $where
     * @param int $id
     * @author Qinii
     * @day 2020-08-10
     */
    public function financial(array $where,int $id)
    {
        $_key = [
            'mer_accoubts' => '财务对账',
            'sys_accoubts' => '财务对账',
            'refund_order' => '退款订单',
            'brokerage_one' => '一级分佣',
            'brokerage_two' => '二级分佣',
            'refund_brokerage_one' => '返还一级分佣',
            'refund_brokerage_two' => '返还二级分佣',
            'order' => '订单支付',
        ];
        $make = app()->make(FinancialRecordRepository::class);
        $query = $make->search($where)->with(['merchant']);
        $list = $query->select()->toArray();

        $header = [
            '序号','商户ID','商户名称','流水ID','交易流水单号','订单ID','订单号','用户名','用户ID','交易类型','收入/支出','金额','创建时间'
            ];

        $_export = [];
        foreach ($list as $k => $v){
            $_export[]=[
                $k,
                $v['merchant']['mer_id'],
                $v['merchant']['mer_name'],
                $v['financial_record_id'],
                $v['financial_record_sn'],
                $v['order_id'],
                $v['order_sn'],
                $v['user_info'],
                $v['user_id'],
                $_key[$v['financial_type']],
                $v['financial_pm'] ? '收入' : '支出',
                ($v['financial_pm'] ? '+ ' : '- ') . $v['number'],
                $v['create_time'],
            ];
        }

        $title = ['流水列表','流水信息','生成时间:' . date('Y-m-d H:i:s',time())];
        $filename = '流水列表_'.date('YmdHis');

        return $this->export($header,$title,$_export,'financial',$filename,$id,'xlsx');
    }
}
