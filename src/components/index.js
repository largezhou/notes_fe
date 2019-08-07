// 这里注册全局组件

import Vue from 'vue'

import PageLayout from './PageLayout'
import MdiIcon from './MdiIcon'
import ErrorsBag from './ErrorsBag'
import Empty from './Empty'
import LoadingAction from './LoadingAction'

Vue.component(PageLayout.name, PageLayout)
Vue.component(MdiIcon.name, MdiIcon)
Vue.component(ErrorsBag.name, ErrorsBag)
Vue.component(Empty.name, Empty)
Vue.component(LoadingAction.name, LoadingAction)
