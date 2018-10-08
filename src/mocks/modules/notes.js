import mock from '../mock'

const Mock = require('mockjs')
const Random = Mock.Random

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

{
  const noteTmpl = {
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
  }

  const tmpl = {
    note: noteTmpl,
  }

  mock('/notes', 'post', tmpl, (tmpl, options) => {
    const body = options.body

    // 如果是上传图片时，自动生成笔记草稿，则要返回一个图片链接
    if (body.get('scope') === 'uploadImage') {
      tmpl.image = Random.image()
    } else {
      delete tmpl.image
    }
  })
}
