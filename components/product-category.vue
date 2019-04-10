<template>
  <Cascader ref="cascader"
            class="product-category"
            :style="{'width': width + 'px'}"
            :data="data"
            :load-data="loadData"
            :size="size"
            :disabled="disabled"
            :clearable="clearable"
            :filtrable="filtrable"
            :render-format="format"
            @on-change="onCascaderChange"></Cascader>
</template>

<script>
import { getCategoriesByLevel } from 'api'

export default {
  name: 'ProductCategory',
  data() {
    return {
      data: [],
      cascaderValue: [],
      inputValue: this.value,
      showCascader: false
    }
  },
  props: {
    size: String,
    value: String,
    width: Number | String,
    disabled: Boolean,
    clearable: Boolean,
    filtrable: Boolean
  },
  methods: {
    format(labels, selectedData) {
      if (labels.length > 0) {
        return labels.join('-')
      } else {
        return this.value
      }
    },
    async loadData(item, callback) {
      if (item.hasOwnProperty('loading')) {
        item.loading = true
      }
      const data = await getCategoriesByLevel({ parentCategoryId: item.value })
      const children = []
      data.forEach(_item => {
        let child = {
          value: _item.id,
          label: _item.name,
          level: _item.level
        }
        // children 和 loading 作用：点击一级分类的子项（二级分类）异步请求数据并显示loading状态
        if (item.value > -1 && item.level === 1) {
          child.loading = false
          child.children = []
        }
        children.push(child)
      })
      item.children = children
      item.loading = false
      callback()
    },
    onCascaderChange(value, selectedData) {
      this.cascaderValue = value
      this.inputValue = value.join('-')
      this.$emit('on-change', value, selectedData)
    },
    clear() {
      this.$refs.cascader.clearSelect()
    }
  },
  created() {
    getCategoriesByLevel({ level: 1 }).then(res => {
      this.data = res.map(item => ({
        value: item.id,
        label: item.name,
        level: item.level,
        children: [],
        loading: false
      }))
      // children 和 loading 作用：点击一级分类异步请求数据并显示loading状态
    })
  },
  watch: {
    value: function (val) {
      this.cascaderValue = val.split('-')
    }
  }
}
</script>

<style scoped>
.product-category {
  display: inline-block;
}
</style>

