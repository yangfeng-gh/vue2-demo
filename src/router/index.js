import Vue from 'vue'
import Router from 'vue-router'
import layout from './layout'
import demos from './demos'

Vue.use(Router)

const routes = [
  {
    path: '/demos',
    name: 'demos',
    component: resolve => require(['@/views/layout/layout9'], resolve),
    children: demos
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/common/login.vue'], resolve)
  },
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/common/home.vue'], resolve)
  }
  // { path: '*', redirect: '/' }
]

routes.push(...layout)

export default new Router({
  mode: 'history',
  routes
})
