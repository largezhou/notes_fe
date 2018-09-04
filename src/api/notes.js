import axios from '@/plugins/axios'

export function getNotes() {
  return axios({
    url: 'notes',
    method: 'get',
  })
}
