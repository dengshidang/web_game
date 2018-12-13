<template>
  <div class="vux-check-icon" @click="updateValue">
    <icon v-show="type === 'default' && value" type="success"/>
    <icon v-show="type === 'plain' && value" type="success_circle"/>
    <icon v-show="!value" type="circle"/>
    <span><slot/></span>
  </div>
</template>

<script>
import { Icon } from 'vux'

export default {
  name: 'RCheckIcon',
  components: {
    Icon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    updateValue() {
      const value = !this.value
      this.$emit('click', value)
      this.$emit('update:value', value)
    }
  }
}
</script>

<style lang="less">
.vux-check-icon {
  width: 100%;
  display: inline-block;
}
.vux-check-icon > span {
  line-height: 23px;
  color: #6F7479;
  vertical-align: middle;
}
</style>
