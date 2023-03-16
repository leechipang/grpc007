import request from './request'

/**
 * @description 商品分类 -- 列表
 */
export function storeCategoryListApi() {
  return request.get('store/category/lst')
}
/**
 * @description 商品分类 -- 新增表单
 */
export function storeCategoryCreateApi() {
  return request.get('store/category/create/form')
}
/**
 * @description 商品分类 -- 编辑表单
 */
export function storeCategoryUpdateApi(id) {
  return request.get(`store/category/update/form/${id}`)
}
/**
 * @description 商品分类 -- 删除
 */
export function storeCategoryDeleteApi(id) {
  return request.delete(`store/category/delete/${id}`)
}
/**
 * @description 商品分类 -- 修改状态
 */
export function storeCategoryStatusApi(id, status) {
  return request.post(`store/category/status/${id}`, { status })
}
/**
 * @description 属性规则 -- 列表
 */
export function templateListApi(data) {
  return request.get('store/attr/template/lst', data)
}
/**
 * @description 属性规则 -- 添加
 */
export function attrCreatApi(data) {
  return request.post('store/attr/template/create', data)
}
/**
 * @description 属性规则 -- 编辑
 */
export function attrEdittApi(id, data) {
  return request.post(`store/attr/template/${id}`, data)
}
/**
 * @description 属性规则 -- 删除
 */
export function attrDeleteApi(id) {
  return request.delete(`store/attr/template/${id}`)
}
/**
 * @description 商品添加 -- 属性规则
 */
export function templateLsitApi() {
  return request.get(`store/attr/template/list`)
}
/**
 * @description 商品列表 -- 列表
 */
export function productLstApi(data) {
  return request.get(`store/product/lst`, data)
}
/**
 * @description 商品列表 -- 删除
 */
export function productDeleteApi(id) {
  return request.delete(`store/product/delete/${id}`)
}
/**
 * @description 秒杀商品列表 -- 删除
 */
export function spikeProductDeleteApi(id) {
  return request.delete(`store/seckill_product/delete/${id}`)
}
/**
 * @description 商品列表 -- 添加
 */
export function productCreateApi(data) {
  return request.post(`store/product/create`, data)
}
/**
 * @description 商品列表 -- 复制
 */
export function productCopyApi(data) {
  return request.post(`store/productcopy/save`, data)
}
/**
 * @description 秒杀品列表 -- 添加
 */
export function seckillProductCreateApi(data) {
  return request.post(`store/seckill_product/create`, data)
}
/**
 * @description 商品列表 -- 编辑
 */
export function productUpdateApi(id, data) {
  return request.post(`store/product/update/${id}`, data)
}
/**
 * @description 商品列表 -- 详情
 */
export function productDetailApi(id) {
  return request.get(`store/product/detail/${id}`)
}
/**
 * @description 秒杀商品 -- 详情
 */
export function seckillProductDetailApi(id) {
  return request.get(`store/seckill_product/detail/${id}`)
}
/**
 * @description 商品列表 -- 商户分类
 */
export function categorySelectApi() {
  return request.get(`store/category/select`)
}

/**
 * @description 商品列表 -- 平台分类
 */
export function categoryListApi() {
  return request.get(`store/category/list`)
}
/**
 * @description 商品列表 -- 品牌分类
 */
export function categoryBrandListApi() {
  return request.get(`store/category/brandlist`)
}
/**
 * @description 商品列表 -- 运费模板筛选
 */
export function shippingListApi() {
  return request.get(`store/shipping/list`)
}
/**
 * @description 商品列表 -- 列表表头
 */
export function lstFilterApi() {
  return request.get(`store/product/lst_filter`)
}
/**
 * @description 秒杀商品列表 -- 列表表头
 */
export function spikelstFilterApi() {
  return request.get(`store/seckill_product/lst_filter`)
}
/**
 * @description 商品列表 -- 上下架
 */
export function statusApi(id, status) {
  return request.post(`store/product/status/${id}`, { status })
}
/**
 * @description 秒杀商品列表 -- 上下架
 */
export function spikeStatusApi(id, status) {
  return request.post(`store/seckill_product/status/${id}`, { status })
}
/**
 * @description 组件商品列表 -- 列表
 */
export function goodLstApi(data) {
  return request.get(`store/product/list`, data)
}
/**
 * @description 配置状态
 */
export function productConfigApi() {
  return request.get(`store/product/config`)
}
/**
 * @description 商品列表 -- 评价列表
 */
export function reviewLstApi(data) {
  return request.get(`store/reply/lst`, data)
}
/**
 * @description 商品列表 -- 评价回复
 */
export function reviewReplyApi(id) {
  return request.get(`store/reply/form/${id}`)
}
/**
 * @description 商品列表 -- 评价回复
 */
export function destoryApi(id) {
  return request.delete(`store/product/destory/${id}`)
}
/**
 * @description 秒杀商品列表 -- 加入回收站
 */
export function spikeDestoryApi(id) {
  return request.delete(`store/seckill_product/destory/${id}`)
}
/**
 * @description 商品列表 -- 恢复
 */
export function restoreApi(id) {
  return request.post(`store/product/restore/${id}`)
}
/**
 * @description 秒杀商品列表 -- 恢复
 */
export function spikeRestoreApi(id) {
  return request.post(`store/seckill_product/restore/${id}`)
}
/**
 * @description 商品列表 -- 复制商品
 */
export function crawlFromApi(data) {
  return request.get(`store/productcopy/get`, data)
}
/**
 * @description 秒杀商品列表 -- 列表
 */
export function seckillProductLstApi(data) {
  return request.get(`store/seckill_product/lst`, data)
}
/**
 * @description 秒杀商品 -- 可选时间表
 */
export function seckillProTimeApi() {
  return request.get(`store/seckill_product/lst_time`)
}
/**
 * @description 秒杀商品列表 -- 编辑
 */
export function seckillProductUpdateApi(id, data) {
  return request.post(`store/seckill_product/update/${id}`, data)
}
/**
 * @description 复制商品 -- 剩余次数
 */
export function productCopyCountApi() {
  return request.get(`store/productcopy/count`)
}
/**
 * @description 复制商品 -- 复制记录
 */
export function productCopyRecordApi(data) {
  return request.get(`store/productcopy/lst`, data)
}
/**
 * @description 预售 -- 添加预售商品
 */
export function preSaleCreateProApi(data) {
  return request.post(`store/product/presell/create`, data)
}
/**
 * @description 预售 -- 编辑预售商品
 */
export function preSaleUpdateProApi(id, data) {
  return request.post(`store/product/presell/update/${id}`, data)
}
/**
 * @description 预售 -- 列表
 */
export function preSaleProListApi(data) {
  return request.get(`store/product/presell/lst`, data)
}
/**
 * @description 预售商品 -- 详情
 */
export function preSaleProDetailApi(id) {
  return request.get(`store/product/presell/detail/${id}`)
}
/**
 * @description 预售商品 -- 头部数量
 */
export function preSaleProUnmApi() {
  return request.get(`store/product/presell/number`)
}
/**
 * @description 预售商品列表 -- 显示状态（上下架）
 */
export function presellStatusApi(id, status) {
  return request.post(`store/product/presell/status/${id}`, { status })
}
/**
 * @description 预售商品列表 -- 删除
 */
export function preSellDeleteApi(id) {
  return request.delete(`store/product/presell/delete/${id}`)
}
/**
 * @description 助力 -- 添加助力商品
 */
export function assistCreateProApi(data) {
  return request.post(`store/product/assist/create`, data)
}
/**
 * @description 助力 -- 编辑助力商品
 */
export function assistUpdateProApi(id, data) {
  return request.post(`store/product/assist/update/${id}`, data)
}
/**
 * @description 助力 -- 列表
 */
export function assistProListApi(data) {
  return request.get(`store/product/assist/lst`, data)
}
/**
 * @description 助力商品 -- 详情
 */
export function assistProDetailApi(id) {
  return request.get(`store/product/assist/detail/${id}`)
}
/**
 * @description 助力商品列表 -- 删除
 */
export function assistDeleteApi(id) {
  return request.delete(`store/product/assist/delete/${id}`)
}
/**
 * @description 助力活动 -- 列表
 */
export function assistListApi(data) {
  return request.get(`store/product/assist_set/lst`, data)
}
/**
 * @description 助力商品列表 -- 显示状态（上下架）
 */
export function assistStatusApi(id, status) {
  return request.post(`store/product/assist/status/${id}`, { status })
}
/**
 * @description 助力活动列表 -- 查看详情
 */
export function assistDetailApi(id, data) {
  return request.get(`store/product/assist_set/detail/${id}`, data)
}
/**
 * @description 助力活动列表 -- 查看详情
 */
export function productGetTempKeysApi() {
  return request.get(`store/product/temp_key`)
}

