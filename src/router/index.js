import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
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

export default new Router({
  // mode: 'history',
  routes
})
