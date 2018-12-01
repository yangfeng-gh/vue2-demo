import Vue from 'vue'

Vue.component('my-counter', {
  template: `<div>
  <h1>{{value}}</h1>
  <button @click="plus">+</button>
  <button @click="minus">-</button>
  </div>`,
  props: {
    value: Number // 接收一个 value prop
  },
  data: function () {
    return {
      val: this.value
    }
  },
  methods: {
    plus () {
      this.val = this.val + 1
      this.$emit('input', this.val) // 触发 input 事件，并传入新值
    },
    minus () {
      if (this.val > 0) {
        this.val = this.val - 1
        this.$emit('input', this.val) // 触发 input 事件，并传入新值
      }
    }
  }
})
