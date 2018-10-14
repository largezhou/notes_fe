import axios from '@/plugins/axios'

export function getAllNotes() {
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

export function getNote(noteId) {
  return axios({
    url: `notes/${noteId}`,
    method: 'get',
  })
}
