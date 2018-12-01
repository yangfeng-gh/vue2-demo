<template>
  <div @click="onClick"
       class="native">
    <button>button1</button>
    <span>span1</span>
    <a href="javascript:void(0)">a1</a>
  </div>
</template>

<script>
export default {
  name: 'Native-Child',
  methods: {
    onClick (e) {
      console.log(e)
    }
  }
}
</script>

<style>
.native {
  background: #ccc;
}
</style>
