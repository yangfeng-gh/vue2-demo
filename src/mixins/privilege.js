function hasPrivilege(buttonId) {
  let user = this.$store.state.activeUser
  let buttons = user ? (user.buttons instanceof Array ? user.buttons : []) : []
  return user.id === 949 || buttons.includes(buttonId)
}

export default {
  methods: {
    hasPrivilege(buttonId) {
      return hasPrivilege.call(this, buttonId)
    }
  }
}
