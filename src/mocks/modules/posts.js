import mock from '../mock'

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
