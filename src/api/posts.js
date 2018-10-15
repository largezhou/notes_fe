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
    methods: 'get',
  })
}
