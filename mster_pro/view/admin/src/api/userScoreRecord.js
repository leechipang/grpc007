import request from './request'

/**
 * @description 用户积分消耗 -- 列表
 */
export function userScoreRecordListApi(data) {
  return request.get(`p2p/back/userScoreRecordLst`, data)
}

