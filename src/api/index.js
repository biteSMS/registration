import axios from 'axios'

const baseURL = ``

export const enroll = params =>
  axios({
    method: 'post',
    url: '/enroll',
    baseURL,
    params
  })