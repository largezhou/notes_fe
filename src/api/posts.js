import axios from '@/plugins/axios'

export function getPosts(params) {
  return axios({
    url: 'posts',
    method: 'get',
    params,
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

export function deletePost(postId) {
  return axios({
    url: `posts/${postId}`,
    method: 'delete',
  })
}

export function updatePost(postId, data) {
  return axios({
    url: `posts/${postId}`,
    method: 'put',
    data,
  })
}

export function forceDeletePost(postId) {
  return axios({
    url: `deleted-posts/${postId}`,
    method: 'delete',
  })
}
