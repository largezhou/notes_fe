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
      'page|1-1000': 1,
    },
  ],
})
