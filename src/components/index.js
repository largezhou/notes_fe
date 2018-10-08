// 这里注册全局组件

import Vue from 'vue'

import PageLayout from './PageLayout'

// 要注册为全局组件的添加到这里
const components = [
  PageLayout,
]

components.forEach(c => Vue.component(c.name, c))
