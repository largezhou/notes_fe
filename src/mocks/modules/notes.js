import mock from '../mock'
import moment from 'moment'

moment.locale('zh-cn')

const Mock = require('mockjs')

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
      created_at: () => {
        return moment(Mock.Random.datetime()).fromNow()
      },
      'tags|5-20': [
        {
          'id|+1': 1,
          'name|3-5': '@cword',
        },
      ],
    },
  ],
})
