<template>
  <FormItem :label="label">
    <Select :size="size"
            placeholder="请选择"
            v-model="cityId"
            @on-change="cityIdChange"
            clearable>
      <Option v-for="city in cities"
              :value="city.id"
              :key="city.name">{{ city.name }}</Option>
    </Select>
  </FormItem>
</template>
<script>
export default {
  data() {
    return {
      cityId: ''
    }
  },
  computed: {
    cities() {
      return this.$store.state.cities
    }
  },
  props: {
    label: {
      type: String,
      default: '城市：'
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    cityIdChange() {
      this.$emit('cityIdChange', this.cityId)
    },
    resetCityId() {
      this.cityId = ''
    }
  }
}
</script>
