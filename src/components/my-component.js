import Vue from 'vue'

Vue.component('my-component', {
  template: `<div>
  <input type="text" :value="currentValue" @input="handleInput"/>
  </div>`,
  data: function () {
    return {
      currentValue: this.value
    }
  },
  props: ['value'], // 接收一个 value prop
  methods: {
    handleInput (event) {
      var value = event.target.value
      this.$emit('input', value) // 触发 input 事件，并传入新值
    }
  }
})
