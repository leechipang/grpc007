import request from './request'

/**
 * @description 首页热卖图片 -- 列表
 */
export function picMdListApi(data) {
  return request.get(`p2p/back/middlePicLst`, data)
}
/**
 * @description 首页热卖图片 -- 新增表单
 */
export function picMdCreateApi() {
  return request.get(`p2p/back/middlePicCreate/form`)
}
/**
 * @description 首页热卖图片 -- 修改
 */
export function picMdUpdateApi(id) {
  return request.get(`p2p/back/middlePicUpdate/form/${id}`)
}
/**
 * @description 首页热卖图片 -- 删除
 */
export function picMdDeleteApi(id) {
  return request.delete(`p2p/back/middlePicDelete/${id}`)
}
/**
 * @description 首页热卖图片 -- 修改状态
 */
export function picMdStatusApi(id, status) {
  return request.post(`p2p/back/middlePicStatus/${id}`, {status})
}


