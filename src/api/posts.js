import axios from '@/plugins/axios'

export function getPosts() {
  return axios({
    url: 'posts',
    method: 'get',
  })
}
