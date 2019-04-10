<template>
  <div @click.self="onClickDiv"
       class="self">
    <button @click.once="onClickBtn">button1</button>
    <span @click="onClickSpan">span1</span>
    <a href="javascript:void(0)"
       @click="onClickA">a1</a>
  </div>
</template>

<script>
export default {
  name: 'EventOnce',
  methods: {
    onClickDiv(e) {
      console.log(e)
    },
    onClickBtn(e) {
      console.log(e)
    },
    onClickSpan(e) {
      console.log(e)
    },
    onClickA(e) {
      console.log(e)
    }
  }
}
</script>

<style>
.self {
  background: #eee;
}
</style>
