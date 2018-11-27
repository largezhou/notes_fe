import mock from '../mock'
import detail from '../data/post_detail'
import utils from '@/libs/utils'

const Mock = require('mockjs')
const Random = Mock.Random

const postTmpl = {
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
}

// 博客列表
mock(/\/posts(\?.*)?$/, 'get', {
  data: {
    'data|15': [
      postTmpl,
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
  const postInfoTmpl = tmpl.data['data|15'][0]
  const q = utils.queryFromUrl(options.url)

  if (q.edit_mode) {
    postInfoTmpl.deleted_at = () => {
      return Math.random() > 0.5 ? Random.datetime() : null
    }
    postInfoTmpl.hidden = () => {
      return Math.random() > 0.5
    }
  } else {
    postInfoTmpl.deleted_at = null
    postInfoTmpl.hidden = false
  }
})

// 博客详情
mock(/\/posts\/\d+/, 'get', {
  data: {
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

// 添加
mock('/posts', 'post', {
  data: {
    'id|1-999': 1,
  },
})

// 删除
mock(/\/posts\/\d+/, 'delete')
mock(/\/deleted-posts\/\d+/, 'delete')

// 更新
mock(/\/posts\/\d+/, 'put', { data: {} }, (tmpl, options) => {
  const data = typeof options.body == 'string'
    ? utils.safeJsonParse(options.body, {})
    : options.body

  if (data.hidden !== undefined) {
    tmpl.data.hidden = data.hidden
  } else if (data.deleted_at === null) {
    tmpl.data.deleted_at = null
  } else {
    // 编辑保存
    // 获取id
    // bookInfoTmpl.id = Number(options.url.match(/\/posts\/(\d+)/)[1])
    // tmpl.book = bookInfoTmpl
  }
})

export default postTmpl
