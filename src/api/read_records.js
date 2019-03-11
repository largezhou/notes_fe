import axios from '@/plugins/axios'

export function getReadRecords(page) {
  return axios({
    url: 'read-records',
    method: 'get',
    params: {
      page,
    },
  })
}
