import axios from '@/plugins/axios'

export function getBooks() {
  return axios({
    url: 'books',
    method: 'get',
  })
}

export function getBook(id, query) {
  return axios({
    url: `books/${id}`,
    method: 'get',
    params: query,
  })
}

export function postCreateBook(data) {
  return axios({
    url: 'books',
    method: 'post',
    data,
  })
}
