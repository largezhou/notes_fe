import mock from '../mock'
import utils from '@/libs/utils'
import _ from 'lodash'

// 获取所有标签，可搜索
{
  const key = 'tags|20'
  const searchKey = 'tags|1-3'
  // 保持模板为同一个对象,这样id才会持续增加
  const tagTmpl = {
    'id|+1': 1,
    'text': '@word',
  }
  const template = {}
  template[key] = [
    tagTmpl,
  ]

  mock(/\/tags(\?.*)?/, 'get', template, (tmpl, options) => {
    const q = utils.queryFromUrl(options.url)
    // 模拟搜索，只能搜到1-3个，并且有几率搜不到
    if (typeof q.q == 'string') {
      // 如果搜到了，先去掉默认的20个的模板，之后如果不是搜索，则恢复
      if (Math.random() > 0.7) {
        delete tmpl[key]

        tagTmpl.text = _.trimStart(q.q) + '@word'

        tmpl[searchKey] = [
          tagTmpl,
        ]
      } else {
        tmpl[key] = []
      }
    } else {
      tagTmpl.text = '@word'

      tmpl[key] = [
        tagTmpl,
      ]

      delete tmpl[searchKey]
    }
  })
}
