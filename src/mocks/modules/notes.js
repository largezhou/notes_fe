import mock from '../mock'

mock('/notes', 'get', {
  'notes|20': [
    {
      'id|+1': 1,
      title: '@ctitle',
      desc: '@cparagraph',
      book: {
        'id|+1': 1,
        title: '@ctitle',
      },
      page: {
        'id|+1': 1,
        'page|1-1000': 1,
      },
      created_at: '@datetime',
      'tags|5-20': [
        {
          'id|+1': 1,
          'name|3-5': '@cword',
        },
      ],
    },
  ],
})
