import mock from '../mock'
import router from '@/router'
import Mock from 'mockjs'
import detail from '../data/post_detail'
import utils from '@/libs/utils'

const Random = Mock.Random

export const fullBook = {
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

export const noteTmpl = {
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
mock(/\/notes\/?(\?.*)?$/, 'get', {
  data: {
    'data|20': [
      noteTmpl,
    ],
    meta: {
      'current_page': 1,
      'from': 1,
      'last_page': 7,
      'per_page': 15,
      'to': 15,
      'total': 100,
    },
  },
}, (tmpl, options) => {
  const t = tmpl.data['data|20'][0]
  delete t.id
  delete t.html_content
  t.book = briefBook
})

// 在某本书下添加笔记
mock(/\/books\/\d+\/notes/, 'post', { data: noteTmpl }, (tmpl, options) => {
  delete tmpl.data.id
  delete tmpl.data.book
})

// 获取笔记详情
mock(/\/notes\/\d+/, 'get', {
  data: {
    note: noteTmpl,
  },
}, (tmpl, options) => {
  let { only } = utils.queryFromUrl(options.url)
  if (only) {
    tmpl.data.html_content = '<h1>HTML_CONTENT</h1><p>嘿嘿嘿~~</p>'
  } else {
    tmpl.data.note.id = router.currentRoute.params.noteId
    tmpl.data.note.html_content = detail
    tmpl.data.book = fullBook
  }
})

// 删除
mock(/\/notes\/\d+/, 'delete')

// 彻底删除
mock(/\/deleted-notes\/\d+/, 'delete')

// 更新
mock(/\/notes\/\d+/, 'put', { data: {} }, (tmpl, options) => {
  const data = typeof options.body == 'string'
    ? utils.safeJsonParse(options.body, {})
    : options.body

  if (data.hidden !== undefined) {
    tmpl.data.hidden = data.hidden
  } else if (data.deleted_at === null) {
    tmpl.data.deleted_at = null
  } else {
    //
  }
})
