<style lang="less" scoped>
.task-badge {
  margin-bottom: 12px;
}
.tb-title {
  font-weight: 600;
}
.tb-count {
  border-radius: 3px;
  padding: 0 6px;
}
</style>

<template>
  <div class="task-badge">
    <Row type="flex" justify="start">
      <Col v-for="(item, index) in data" :key="index" offset="1">
      <span class="tb-title">{{item.title}}：</span>
      <a class="tb-count" :style="{background: item.color}">{{item.count > max ? max + '+' : item.count}}</a>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      defaut: Array
    },
    max: {
      type: Number | String,
      defaut: 999
    }
  },
  methods: {
    refresh(routerName) {
      this.$router.push({ name: routerName })
    }
  }
}
</script>
