// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import 'api/mock-data'
import '@/styles/index.less'
import('../config').then(c => console.log(c.dev.env))

Vue.use(iView)
Vue.config.productionTip = false
Vue.config.errorHandler = err => {
  console.log(err)
}
Raven.config('https://9d2cc9dc027d4a6994e78d8214569737@sentry.io/240008')
  .addPlugin(RavenVue, Vue)
  .install()

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
  components: {
    App
  }
})
