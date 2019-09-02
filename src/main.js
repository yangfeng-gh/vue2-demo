// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'api/mock-data'
import iView from 'iview'
import './styles/index.less'

// import('../config').then(c => console.log(c.dev.env))

Vue.use(iView)
Vue.config.productionTip = false
Vue.config.errorHandler = err => {
  console.log(err)
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
