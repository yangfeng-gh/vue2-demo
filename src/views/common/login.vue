<template>
<Form :label-width="80" class="$style['login']">
  <FormItem label="用户名：">
    <Input v-model="username"></Input>
  </FormItem>
  <FormItem label="密码：">
    <Input v-model="password"></Input>
  </FormItem>
  <FormItem>
    <Button @click="login">登录</Button>
  </FormItem>
</Form>
</template>

<script>
import {login} from 'api'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        username: this.username,
        password: this.password
      }
      login(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style module>
  .login {
    margin: 32px;
  }
</style>