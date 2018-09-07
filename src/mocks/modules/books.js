import mock from '../mock'
import moment from 'moment'

moment.locale('zh-cn')

const Mock = require('mockjs')
const Random = Mock.Random

mock('/books', 'get', {
  'books|5': [
    {
      'id|+1': 1,
      title: '@ctitle',
      updated_at: () => {
        return moment(Mock.Random.datetime()).fromNow()
      },
      cover: () => {
        return Random.image('245X344', Random.color(), Random.color(), Random.ctitle())
      },
      'read|1-900': 1,
      'total|100-900': 1,
    },
  ],
})
