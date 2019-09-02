<template>
  <Form :label-width="80" :class="$style.login">
    <FormItem label="用户名：">
      <Input v-model="username" style="width:300px"></Input>
    </FormItem>
    <FormItem label="密码：">
      <Input v-model="password" style="width:300px"></Input>
    </FormItem>
    <FormItem>
      <Button @click="login">登录</Button>
    </FormItem>
  </Form>
</template>

<script>
import { login } from 'api'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }
      login(data).then(res => {
        this.$Modal.confirm({
          title: '恭喜你',
          content: '登录成功',
          onOk: () => {
            this.$Message.success('ok')
          }
        })
      })
    }
  }
}
</script>

<style module>
.login {
  margin-top: 32px;
}
</style>
