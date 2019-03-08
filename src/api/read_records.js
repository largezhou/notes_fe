import axios from '@/plugins/axios'

export function getReadRecords(params) {
  return axios({
    url: 'read-records',
    method: 'get',
    params,
  })
}
