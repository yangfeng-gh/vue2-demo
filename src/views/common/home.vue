<template>
  <div class="layout-wrapper">
    <router-link to="/demos">demos</router-link>
    <router-link to="/layout1">layout1</router-link>
    <router-link to="/layout2">layout2</router-link>
    <router-link to="/layout3">layout3</router-link>
    <router-link to="/layout4">layout4</router-link>
    <router-link to="/layout5">layout5</router-link>
    <router-link to="/layout6">layout6</router-link>
    <router-link to="/layout7">layout7</router-link>
    <router-link to="/layout8">layout8</router-link>
    <router-link to="/layout9">layout9</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  background: #ddd;
  padding: 24px;
  a {
    margin: 6px;
    text-decoration: underline;
  }
}
</style>
