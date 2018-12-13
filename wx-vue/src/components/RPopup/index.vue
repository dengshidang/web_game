<template>
  <mt-popup
    v-model="popupVisible"
    :position="position"
    :modal="modal"
  >
    <div class="error-tis">
      <slot/>
    </div>
  </mt-popup>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers'
export default {
  name: 'RPopup',
  props: {
    position: {
      type: String,
      default: 'top'
    },
    modal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popupVisible: false,
      timeoutObj: null
    }
  },
  watch: {
    popupVisible(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.popupVisible = val
      if (val) {
        if (this.timeoutObj) {
          clearTimeout(this.timeoutObj)
        }
        this.timeoutObj = setTimeout(() => {
          this.popupVisible = false
        }, 2000)
      }
    }
  },
  mounted() {
    if (this.value) {
      this.popupVisible = true
    }
  }
}
</script>

<style lang="scss">
  .error-tis {
    width: 100%;
    height: 40px;
    background-color: #C21414;
    line-height: 40px;
    color: #ffffff;
    font-size:1.4rem;
  }

  .main /deep/ .mint-popup {
    width: 100%;
    text-align: center;
    opacity: 0.8;
    position: absolute;
  }
</style>
