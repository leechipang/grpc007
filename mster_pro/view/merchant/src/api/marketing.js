import request from './request'

/**
 * @description 优惠券模板 -- 列表
 */
export function couponListApi(data) {
  return request.get('store/coupon/lst', data)
}
/**
 * @description 优惠券模板 -- 新增表单
 */
export function couponCreateApi() {
  return request.get('store/coupon/create/form')
}
/**
 * @description 优惠券模板 -- 编辑表单
 */
export function couponUpdateApi(id) {
  return request.get(`store/coupon/update/form/${id}`)
}
/**
 * @description 优惠券模板 -- 发布优惠券
 */
export function couponIssueApi(id) {
  return request.get(`store/coupon/issue/create/form/${id}`)
}

/**
 * @description 已发布优惠券 -- 列表
 */
export function couponIssueListApi(data) {
  return request.get('store/coupon/lst', data)
}
/**
 * @description 已发布优惠券 -- 修改状态
 */
export function couponIssueStatusApi(id, status) {
  return request.post(`store/coupon/status/${id}`, { status })
}
/**
 * @description 已发布优惠券 -- 添加优惠券
 */
export function couponIssuePushApi() {
  return request.get(`store/coupon/create/form`)
}
/**
 * @description 优惠券列表 -- 删除
 */
export function couponIssueDeleteApi(id) {
  return request.delete(`store/coupon/issue/${id}`)
}
/**
 * @description 优惠券列表 -- 复制
 */
export function couponCloneApi(id) {
  return request.get(`store/coupon/clone/form/${id}`)
}
/**
 * @description 优惠券列表 -- 领取记录
 */
export function issueApi(data) {
  return request.get(`store/coupon/issue`, data)
}
/**
 * @description 赠送优惠券组件列表 -- 列表
 */
export function couponSelectApi(data) {
  return request.get(`store/coupon/select`, data)
}
/**
 * @description 优惠券列表 -- 详情
 */
export function couponDetailApi(coupon_id) {
  return request.get(`store/coupon/detail/${coupon_id}`)
}
/**
 * @description 优惠劵 -- 删除
 */
export function couponDeleteApi(coupon_id) {
  return request.delete(`store/coupon/delete/${coupon_id}`)
}
/**
 * @description 优惠劵 -- 发送
 */
export function couponSendApi(data) {
    return request.post(`store/coupon/send`, data)
}
/**
 * @description 优惠券发送记录 -- 列表
 */
export function couponSendLstApi(data) {
    return request.get(`store/coupon_send/lst`, data)
}
/**
 * @description 直播间 -- 创建直播间
 */
export function createBroadcastApi() {
  return request.get(`broadcast/room/create/form`)
}

/**
 * @description 直播间 -- 直播间列表
 */
export function broadcastListApi(data) {
  return request.get(`broadcast/room/lst`, data)
}
/**
 * @description 直播间 -- 直播间详情
 */
export function broadcastDetailApi(id) {
  return request.get(`broadcast/room/detail/${id}`)
}
/**
 * @description 直播间 -- 备注
 */
export function broadcastRemarksApi(id, mark) {
  return request.post(`broadcast/room/mark/${id}`, { mark })
}
/**
 * @description 直播间商品 -- 创建直播间商品
 */
export function createBroadcastProApi() {
  return request.get(`broadcast/goods/create/form`)
}
/**
 * @description 直播间商品 -- 编辑
 */
export function updateBroadcastApi(id) {
  return request.get(`broadcast/goods/update/form/${id}`)
}
/**
 * @description 直播间商品 -- 直播间商品列表
 */
export function broadcastProListApi(data) {
  return request.get(`broadcast/goods/lst`, data)
}
/**
 * @description 直播间商品 -- 直播间商品详情
 */
export function broadcastProDetailApi(id) {
  return request.get(`broadcast/goods/detail/${id}`)
}
/**
 * @description 直播间商品 -- 修改显示状态（上下架）
 */
export function changeProDisplayApi(id, data) {
  return request.post(`broadcast/goods/status/${id}`, data)
}
/**
 * @description 直播间 -- 商品导入
 */
export function broadcastGoodsImportApi(data) {
  return request.post(`broadcast/room/export_goods`, data)
}
/**
 * @description 直播间 -- 备注
 */
export function broadcastProRemarksApi(id, mark) {
  return request.post(`broadcast/goods/mark/${id}`, { mark })
}

/**
 * @description 直播间-- 修改显示状态（上下架）
 */
export function changeStudioRoomDisplayApi(id, data) {
  return request.post(`broadcast/room/status/${id}`, data)
}
/**
 * @description 直播间 -- 直播间商品
 */
export function studioProList(id,data) {
  return request.get(`broadcast/room/goods/${id}`,data)
}
/**
 * @description 直播间商品 -- 删除
 */
export function broadcastProDeleteApi(broadcast_goods_id) {
  return request.delete(`broadcast/goods/delete/${broadcast_goods_id}`)
}
/**
 * @description 直播间 -- 删除
 */
export function broadcastDeleteApi(broadcast_room_id) {
  return request.delete(`broadcast/room/delete/${broadcast_room_id}`)
}
/**
 * @description 直播间商品 -- 批量添加
 */
export function batchAddBroadcastGoodsApi(data) {
  return request.post(`broadcast/goods/batch_create`, data)
}
/**
 * @description 直播间已导入商品 -- 删除
 */
export function broadcastGoodsDeleteApi(data) {
  return request.post(`broadcast/room/rm_goods`,data)
}
/**
 * @description 直播间 -- 编辑
 */
export function studioEdit(id) {
  return request.get(`broadcast/room/update/form/${id}`)
}
/**
 * @description 拼团 -- 获取数据
 */
export function combinationDataApi() {
    return request.get(`config/others/group_buying`)
}
/**
 * @description 拼团 -- 创建拼团商品
 */
export function combinationCreateProApi(data) {
    return request.post(`store/product/group/create`,data)
}
/**
 * @description 拼团 -- 编辑拼团商品
 */
export function combinationProUpdateApi(id,data) {
    return request.post(`store/product/group/update/${id}`,data)
}
/**
 * @description 拼团 -- 商品列表
 */
export function combinationProLst(data) {
    return request.get(`store/product/group/lst`,data)
}
/**
 * @description 拼团 -- 商品列表（查看详情）
 */
export function combinationProDetailApi(id) {
    return request.get(`store/product/group/detail/${id}`)
}
/**
 * @description 拼团 -- 商品列表（删除）
 */
export function combinationProDeleteApi(id) {
    return request.delete(`store/product/group/delete/${id}`)
}

/**
 * @description 拼团商品列表 -- 显示状态（上下架）
 */
export function combinationStatusApi(id, status) {
    return request.post(`store/product/group/status/${id}`, { status })
}
/**
 * @description 拼团活动 -- 活动列表
 */
export function combinationActivityLst(data) {
    return request.get(`store/product/group/buying/lst`,data)
}
/**
 * @description 拼团活动 -- 查看详情
 */
export function combinationDetailApi(id, data) {
    return request.get(`store/product/group/buying/detail/${id}`, data)
}
/**
 * @description 拼团商品 -- 列表排序
 */
export function combinationProSort(id,data) {
    return request.post(`/store/product/group/sort/${id}`,data)
}