import mock from '../mock'
import router from '@/router'
import Mock from 'mockjs'

const noteTmpl = {
  'id|+1': 1,
  title() {
    if (Math.random() > 0.5) {
      return Mock.Random.ctitle(6, 20)
    } else {
      return null
    }
  },
  desc: '@cparagraph',
  content: '@cparagraph',
  html_content() {
    // 模拟html内容
    return '<h1>HTML CONTENT</h1>' + Mock.Random.cparagraph() + `<br><img src="${Mock.Random.image()}">`
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
}

// 获取所有笔记
mock('/notes', 'get', {
  'notes|20': [
    {
      ...noteTmpl,
      book: {
        'id|+1': 1,
        title: '@ctitle',
      },
    },
  ],
})

// 在某本书下添加笔记
mock(/\/books\/\d+\/notes/, 'post', { note: noteTmpl })

// 获取笔记详情
mock(/\/notes\/\d+/, 'get', { note: noteTmpl }, (tmpl, options) => {
  tmpl.note.id = router.currentRoute.params.noteId
})
