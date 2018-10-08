import axios from '@/plugins/axios'

export function getNotes() {
  return axios({
    url: 'notes',
    method: 'get',
  })
}

export function postCreateNote(data) {
  return axios({
    url: 'notes',
    method: 'post',
    data,
  })
}
