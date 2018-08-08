import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import Page1 from '@/views/page1'
import Page2 from '@/views/page2'
import Page3 from '@/views/page3'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: Page1
      }, {
        path: 'page2',
        name: 'Page2',
        component: Page2
      }, {
        path: 'page3',
        name: 'Page3',
        component: Page3
      }
    ]
  }]
})
