import axios from '@/plugins/axios'

export function getNotes() {
  return axios({
    url: 'notes',
    method: 'get',
  })
}

export function postCreateNote(bookId, data) {
  return axios({
    url: `books/${bookId}/notes`,
    method: 'post',
    data,
  })
}

export function getNote(noteId, params) {
  return axios({
    url: `notes/${noteId}`,
    method: 'get',
    params,
  })
}

export function deleteNote(noteId) {
  return axios({
    url: `notes/${noteId}`,
    method: 'delete',
  })
}

export function updateNote(noteId, data) {
  return axios({
    url: `notes/${noteId}`,
    method: 'put',
    data,
  })
}

export function forceDeleteNote(noteId) {
  return axios({
    url: `deleted-notes/${noteId}`,
    method: 'delete',
  })
}
