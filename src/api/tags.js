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

export function updateTag(tagId, data) {
  return axios({
    url: `tags/${tagId}`,
    method: 'put',
    data,
  })
}

export function delTag(tagId) {
  return axios({
    url: `tags/${tagId}`,
    method: 'delete',
  })
}

export function getTag(tagId) {
  return axios({
    url: `tags/${tagId}`,
    method: 'get',
  })
}
