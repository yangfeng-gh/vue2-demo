<template>
  <div>111</div>
</template>

<script>
// import TodoList from './todo-list'

export default {
  name: 'slotScope',
  // components: [TodoList],
  data() {
    return {
      todos: [
        {
          text: '吃早餐',
          isComplete: true
        },
        {
          text: '买口罩',
          isComplete: true
        },
        {
          text: '写代码'
        }
      ]
    }
  }
}
</script>
