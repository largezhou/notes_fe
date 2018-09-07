import axios from '@/plugins/axios'

export function getBooks() {
  return axios({
    url: 'books',
    method: 'get',
  })
}
