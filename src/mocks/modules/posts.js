import mock from '../mock'
import detail from '../data/post_detail'

// 博客列表
mock('/posts', 'get', {
  'posts|15': [
    {
      'id|+1': 1,
      title: '@ctitle',
      desc: '@cparagraph',
      content: '@cparagraph',
      created_at: '@datetime',
      updated_at: '@datetime',
      'tags|5-15': [
        {
          'id|+1': 1,
          'name|3-5': '@cword',
        },
      ],
    },
  ],
})

// 博客详情
mock(/\/posts\/\d+/, 'get', {
  post: {
    'id|+1': 1,
    title: '@ctitle',
    desc: '@cparagraph',
    content: '@cparagraph',
    html_content: detail,
    created_at: '@datetime',
    updated_at: '@datetime',
    'tags|5-15': [
      {
        'id|+1': 1,
        'name|3-5': '@cword',
      },
    ],
  },
})

mock('/posts', 'post', {
  post: {
    'id|1-999': 1,
  },
})
