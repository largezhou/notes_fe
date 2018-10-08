import axios from '@/plugins/axios'

export function postCreateImage(data) {
  return axios({
    url: 'images',
    method: 'post',
    data,
  })
}
