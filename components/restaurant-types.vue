<template>
  <Cascader :data="data" :load-data="loadData" v-model="selected" trigger="click" transfer @on-change="handleChange" :disabled="disabled">
  </Cascader>
</template>
<script>
import http, {
  getRestaurantType,
  getRestaurantTypeByParent
} from 'api'

export default {
  data() {
    return {
      selected: this.value,
      data: []
    }
  },
  props: {
    value: {
      type: Array,
      default: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: String
  },
  methods: {
    loadData(item, callback) {
      item.loading = true
      getRestaurantTypeByParent(item.value).then(res => {
        if (typeof item.__value === 'number') {
          item.children = res.map(v => ({ value: v.id, label: v.name, children: [], loading: false }))
        } else {
          item.children = res.map(v => ({ value: v.id, label: v.name }))
        }

        item.loading = false
        callback()
      })
    },
    handleChange(value) {
      this.$emit('on-change', value)
    }
  },
  mounted() {
    if (this.value.length === 3) {
      http.all([getRestaurantType(), getRestaurantTypeByParent(this.value[0]), getRestaurantTypeByParent(this.value[1])])
        .then(http.spread((t1, t2, t3) => {
          let t1Index = t1.data.findIndex(item => item.id === this.value[0])
          let t2Index = t2.data.findIndex(item => item.id === this.value[1])
          let t3Data = t3.data.map(t3Item => ({
            value: t3Item.id,
            label: t3Item.name
          }))
          let t2Data = t2.data.map(t2Item => ({
            value: t2Item.id,
            label: t2Item.name,
            children: []
          }))
          t2Data[t2Index].children = t3Data
          let t1Data = t1.data.map(t1Item => ({
            value: t1Item.id,
            label: t1Item.name,
            children: [],
            loading: false
          }))
          t1Data[t1Index].children = t2Data
          this.data = t1Data
        }))
    } else {
      getRestaurantType().then(res => {
        this.data = res.map(item => ({
          value: item.id,
          label: item.name,
          children: [],
          loading: false
        }))
      })
    }
  },
  watch: {
    'value': function (val) {
      this.selected = val
    }
  }
}
</script>
