import mock from '../mock'
import router from '@/router'
import Mock from 'mockjs'

const Random = Mock.Random

const noteTmpl = {
  'id|+1': 1,
  title() {
    if (Math.random() > 0.5) {
      return Random.ctitle(6, 20)
    } else {
      return null
    }
  },
  desc: '@cparagraph',
  content: '@cparagraph',
  html_content() {
    // 模拟html内容
    return '<h1>HTML CONTENT</h1>' + Random.cparagraph() + `<br><img src="${Random.image()}">`
  },
  page: {
    'id|+1': 1,
    'page|1-1000': 1,
  },
  created_at: '@datetime',
  updated_at: '@datetime',
  'tags|5-20': [
    {
      'id|+1': 1,
      'name|3-5': '@cword',
    },
  ],
  book: {
    'id|+1': 1,
    title: '@ctitle',
    started_at: '@datetime',
    updated_at: '@datetime',
    cover: Random.image('245X344', Random.color(), Random.color(), Random.ctitle()),
    'read|1-900': 1,
    'total|100-900': 1,
    'notes|5': [
      {
        'id|+1': 1,
        title: '@ctitle',
        desc: '@cparagraph',
        page: {
          'id|+1': 1,
          'page|1-1000': 1,
        },
        created_at: '@datetime',
        'tags|5-10': [
          {
            'id|+1': 1,
            'name|3-5': '@cword',
          },
        ],
      },
    ],
  },
}

// 获取所有笔记
mock('/notes', 'get', {
  'notes|20': [
    noteTmpl,
  ],
})

// 在某本书下添加笔记
mock(/\/books\/\d+\/notes/, 'post', { note: noteTmpl })

// 获取笔记详情
mock(/\/notes\/\d+/, 'get', { note: noteTmpl }, (tmpl, options) => {
  tmpl.note.id = router.currentRoute.params.noteId
})
