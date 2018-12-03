import axios from '@/plugins/axios'

export function search(q) {
  return axios({
    url: 'search',
    method: 'get',
    params: {
      q,
    },
  })
}
