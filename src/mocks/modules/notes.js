import mock from '../mock'
import router from '@/router'
import Mock from 'mockjs'
import detail from '../data/post_detail'
import utils from '@/libs/utils'

const Random = Mock.Random

const fullBook = {
  'id|+1': 1,
  title: '@ctitle',
  started_at: '@datetime',
  updated_at: '@datetime',
  cover: Random.image('245X344', Random.color(), Random.color(), Random.ctitle()),
  'read|1-900': 1,
  'total|100-900': 1,
  'notes_count|5-20': 1,
  'notes|5': [
    {
      'id|+1': 1,
      title: '@ctitle',
      desc: '@cparagraph',
      'page|1-1000': 1,
      created_at: '@datetime',
      'tags|5-10': [
        {
          'id|+1': 1,
          'name|3-5': '@cword',
        },
      ],
    },
  ],
}

const briefBook = {
  'id|+1': 1,
  title: '@ctitle',
}

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
  'page|1-1000': 1,
  created_at: '@datetime',
  updated_at: '@datetime',
  'tags|20': [
    {
      'id|+1': 1,
      'name|3-5': '@cword',
    },
  ],
}

// 获取所有笔记
mock('/notes', 'get', {
  'notes|20': [
    noteTmpl,
  ],
}, (tmpl, options) => {
  const t = tmpl['notes|20'][0]
  delete t.id
  delete t.html_content
  t.book = briefBook
})

// 在某本书下添加笔记
mock(/\/books\/\d+\/notes/, 'post', { note: noteTmpl }, (tmpl, options) => {
  delete tmpl.note.id
  delete tmpl.note.book
})

// 获取笔记详情
mock(/\/notes\/\d+/, 'get', { note: noteTmpl }, (tmpl, options) => {
  tmpl.note.id = router.currentRoute.params.noteId
  tmpl.note.html_content = detail
  tmpl.note.book = fullBook
})

mock(/\/notes\/\d+/, 'delete', {
  deleted_at: '@datetime',
})

// 更新
mock(/\/notes\/\d+/, 'put', {}, (tmpl, options) => {
  const data = typeof options.body == 'string'
    ? utils.safeJsonParse(options.body, {})
    : options.body

  if (data.hidden !== undefined) {
    tmpl.hidden = data.hidden
  } else if (data.deleted_at === null) {
    tmpl.deleted_at = null
  } else {
    //
  }
})
