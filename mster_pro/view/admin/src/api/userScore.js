import request from './request'

/**
 * @description 用户积分 -- 列表
 */
export function userScoreListApi(data) {
  return request.get(`p2p/back/userScoreList`, data)
}

/**
 * @description 用户积分 -- 删除
 */
export function userScoreDeleteApi(id) {
  return request.delete(`p2p/back/userScoreDelete/${id}`)
}
