import request from './request'

/**
 * @description 首页新品图片 -- 列表
 */
export function picDnListApi(data) {
  return request.get(`p2p/back/downPicLst`, data)
}
/**
 * @description 首页新品图片 -- 新增表单
 */
export function picDnCreateApi() {
  return request.get(`p2p/back/downPicCreate/form`)
}
/**
 * @description 首页新品图片 -- 修改
 */
export function picDnUpdateApi(id) {
  return request.get(`p2p/back/downPicUpdate/form/${id}`)
}
/**
 * @description 首页新品图片 -- 删除
 */
export function picDnDeleteApi(id) {
  return request.delete(`p2p/back/downPicDelete/${id}`)
}
/**
 * @description 首页新品图片 -- 修改状态
 */
export function picDnStatusApi(id, status) {
  return request.post(`p2p/back/downPicStatus/${id}`, {status})
}


