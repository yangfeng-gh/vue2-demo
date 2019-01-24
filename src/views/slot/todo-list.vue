<template>
  <div>
    <slot name="title"
          v-bind:title="title">
      {{ title }}
    </slot>
    <ul>
      <li v-for="todo in todos"
          v-bind:key="todo.id">
        list
        <!-- 我们为每个 todo 准备了一个插槽，-->
        <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
        <slot v-bind:todo="todo">
          <!-- 回退的内容 -->
          {{ todo.text }}
        </slot>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: Array,
    title: String
  },
  methods: {
    onClick() {
      this.$emit('click', 'hello')
    }
  }
}
</script>
