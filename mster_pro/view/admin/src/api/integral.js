import request from './request'

/**
 * @description 商家积分 -- 列表
 */
export function merchantListApi(data) {
  return request.get(`p2p/back/merchantList`, data)
}

/**
 * @description 商家积分 -- 删除
 */
export function merchantsDeleteApi(id) {
  return request.delete(`p2p/back/merchantDelete/${id}`)
}

/**
 * @description 商家积分 -- 修改状态
 */
export function merchantsStatusApi(id, status) {
  return request.post(`p2p/back/merchantStatus/${id}`, {status})
}

/**
 * @description 商家积分 -- 新增表单
 */
export function merchantsCreateApi() {
  return request.get(`p2p/back/merchantCreate/form`)
}
/**
 * @description 商家积分 -- 修改
 */
export function merchantsUpdateApi(id) {
  return request.get(`p2p/back/merchantUpdate/form/${id}`)
}

// /**
//  * @description 商家积分 -- 编辑
//  */
// export function feedbackCategoryUpdateApi(id) {
//   return request.get(`p2p/back/update/form/${id}`)
// }
