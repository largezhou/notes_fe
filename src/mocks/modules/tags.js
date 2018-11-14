import mock from '../mock'
import utils from '@/libs/utils'
import _ from 'lodash'

const tagTmpl = {
  'id|+1': 1,
  'name|2-5': '@cword',
  'count|2-20': 1,
}

mock(/\/tags\/\d+/, 'get', {
  data: tagTmpl,
})

// 获取所有标签，可搜索
{
  let key = 'data|20'
  // 保持模板为同一个对象,这样id才会持续增加
  const template = {}
  template[key] = [tagTmpl]

  mock(/\/tags(\?.*)?/, 'get', template, (tmpl, options) => {
    const q = utils.queryFromUrl(options.url)

    // 模拟搜索，只能搜到1-3个，并且有几率搜不到
    if (typeof q.q == 'string') {
      // 如果搜到了，先去掉默认的20个的模板，之后如果不是搜索，则恢复
      if (Math.random() > 0.6) {
        delete tmpl[key]
        key = 'data|1-3'

        tagTmpl.name = _.trimStart(q.q) + '@cword'

        tmpl[key] = [
          tagTmpl,
        ]
      } else {
        tmpl[key] = []
      }
      // 热门的10个
    } else if (q.scope == 'hot') {
      delete tmpl[key]
      delete tagTmpl.name

      key = 'data|10'
      tagTmpl['name|2-5'] = '@cword'
      tmpl[key] = [tagTmpl]
      // 默认的所有key，50到100个
    } else {
      delete tmpl[key]
      delete tagTmpl.name

      key = 'data|50-100'
      tagTmpl['name|2-5'] = '@cword'
      tmpl[key] = [tagTmpl]
    }
  })
}

mock(/\/tags\/\d+/, 'put', {})

mock(/\/tags\/\d+/, 'delete', {})
