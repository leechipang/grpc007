import request from './request'

/**
 * @description 商家积分消耗 -- 列表
 */
export function merchantStateListApi(data) {
  return request.get(`p2p/back/merchantStateList`, data)
}

