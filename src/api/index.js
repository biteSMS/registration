import axios from 'axios'
import Qs from 'qs'

const baseURL = `http://957427771.natapp1.cc`

export const enroll = data =>
  axios({
    method: 'post',
    url: '/enroll',
    baseURL,
    data: Qs.stringify(data)
  })