import mock from '../mock'

const Mock = require('mockjs')
const Random = Mock.Random

mock('/images', 'post', {
  src: Random.image(),
})
