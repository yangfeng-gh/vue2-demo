<template>
  <div>
    <h3>slot-scope</h3>
    <todo-list v-bind:todos="todos"
               @click="onClick">
      <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
      <template slot-scope="slotProps">
        <!-- 为待办项自定义一个模板，-->
        <!-- 通过 `slotProps` 定制每个待办项。-->
        <span v-if="slotProps.todo.isComplete">✓</span>
        {{ slotProps.todo.text }}
      </template>
    </todo-list>
    <br>
    <h3>在 2.5.0+，slot-scope 不再限制在template元素上使用，而可以用在插槽内的任何元素或组件上。</h3>
    <todo-list v-bind:todos="todos">
      <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
      <span slot-scope="slotProps">
        <!-- 为待办项自定义一个模板，-->
        <!-- 通过 `slotProps` 定制每个待办项。-->
        <span v-if="slotProps.todo.isComplete">✓</span>
        {{ slotProps.todo.text }}
      </span>
    </todo-list>
    <br>
    <h3>解构 slot-scope</h3>
    <todo-list v-bind:todos="todos">
      <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
      <template slot-scope="{ todo }">
        <!-- 为待办项自定义一个模板，-->
        <!-- 通过 `slotProps` 定制每个待办项。-->
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>
    </todo-list>
    <br>
    <h3>具名slot</h3>
    <todo-list :todos="todos"
               title="具名slot">
      <template slot="title"
                slot-scope="slotProps">
        <h3>this is {{ slotProps.title }}</h3>
      </template>
    </todo-list>
  </div>
</template>

<script>
import TodoList from './todo-list'

export default {
  name: 'SlotScope',
  components: { TodoList },
  data () {
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
  },
  methods: {
    onClick (e) {
      console.log(e)
    }
  }
}
</script>
