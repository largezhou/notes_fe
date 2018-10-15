import axios from '@/plugins/axios'

export function getPosts() {
  return axios({
    url: 'posts',
    method: 'get',
  })
}

export function getPost(postId) {
  return axios({
    url: `posts/${postId}`,
    method: 'get',
  })
}

export function postCreatePost(data) {
  return axios({
    url: 'posts',
    method: 'post',
    data,
  })
}
