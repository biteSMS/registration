import axios from 'axios'
import Qs from 'qs'

const baseURL = `https://wx.idsbllp.cn/match/`

export const enroll = data =>
  axios({
    method: 'post',
    url: '/enroll',
    baseURL,
    data: Qs.stringify(data)
  })