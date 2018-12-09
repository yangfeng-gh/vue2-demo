<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { APPNAME } from '@/lib/consts'
import { debounce } from '@/lib/event'

export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem(APPNAME)) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem(APPNAME))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(APPNAME, JSON.stringify(this.$store.state))
    })
  },
  mounted () {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.$store.commit('app/setMainMenuShrink', document.documentElement.clientWidth < 1230)
        this.$store.commit('app/setLeftMenuShrink', document.documentElement.clientWidth < 1230)
      }, 300)
    )
  }
}
</script>

<style>
</style>
