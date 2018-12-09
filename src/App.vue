<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { APPNAME } from '@/lib/consts'
export default {
  name: 'app',
  created () {
    // 在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem(APPNAME)) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem(APPNAME))))
    }

    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(APPNAME, JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
</style>
