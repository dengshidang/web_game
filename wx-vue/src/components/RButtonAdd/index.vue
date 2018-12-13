<template>
  <div :class="{del: type === 'del', line: type === 'line'}" class="button-item">
    <button :class="{disabled: disabled}" @click="addPatient">
      <slot/>
    </button>
  </div>
</template>

<script>
/**
 * @module components/button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型
 * @param {string} [icon] - 图标
 * @param {slot} - 显示文本
 */
export default {
  name: 'RButton',

  props: {
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(evt) {
      if (!this.disabled) {
        this.$emit('click', evt)
      }
    },
    addPatient() {
      this.$router.push({
        path: 'seveUserChildInfo',
        query: {
          fromType: 'button'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-item {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    button {
      margin-top: 10px;
      background: #00ADB8;
      width: 100%;
      height: 40px;
      color: #ffffff;
      font-size: 1.6rem;
      border-radius: 4px;
      border: 0px;
      &.disabled {
        background: #D0D3D5;
      }
    }
  }
  .button-item.del {
    button {
      background: rgba(194,20,20,0.1);
      color: #C21414;
      border: #C21414 solid 1px;
      box-sizing: border-box;
    }
  }
  .button-item.line {
    .button {
      background: #ffffff;
      color: #00ADB8;
      border: 1px solid #00ADB8;
      border-radius: 20px;
    }
  }
</style>
