import axios from '@/plugins/axios'

/**
 * @param params
 */
export function getTags(params) {
  return axios({
    url: 'tags',
    method: 'get',
    params,
  })
}
