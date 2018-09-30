import axios from '@/plugins/axios'

/**
 * @param scope 比如为hot时，后台会返回最热的标签
 */
export function getTags(params) {
  return axios({
    url: 'tags',
    method: 'get',
    params,
  })
}
