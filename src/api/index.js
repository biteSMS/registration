import axios from 'axios'
import Qs from 'qs'

const baseURL = `http://111.230.169.17:8080/match`

export const enroll = data =>
  axios({
    method: 'post',
    url: '/enroll',
    baseURL,
    data: Qs.stringify(data)
  })