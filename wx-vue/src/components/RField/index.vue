<template>
  <x-cell
    v-clickoutside="doCloseActive"
    :title="label"
    :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]"
    class="mint-field">
    <textarea
      v-if="type === 'textarea'"
      ref="textarea"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      v-model="currentValue"
      class="mint-field-core"
      @change="$emit('change', currentValue)"/>
    <input
      v-else
      ref="input"
      :placeholder="placeholder"
      :number="type === 'number'"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      class="mint-field-core"
      @change="$emit('change', currentValue)"
      @focus="active = true"
      @click="test"
      @input="handleInput">
    <div
      v-if="!disableClear"
      v-show="currentValue && type !== 'textarea' && active"
      class="mint-field-clear"
      @click="handleClear">
      <i class="mintui mintui-field-error"/>
    </div>
    <span v-if="state" :class="['is-' + state]" class="mint-field-state">
      <i :class="['mintui-field-' + state]" class="mintui"/>
    </span>
    <div class="mint-field-other">
      <slot/>
    </div>
  </x-cell>
</template>

<script>
import XCell from 'mint-ui/packages/cell/index.js'
import Clickoutside from 'mint-ui'

/**
 * @desc 编辑器，依赖 cell
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 */
export default {
  name: 'RField',

  directives: {
    Clickoutside
  },

  components: { XCell },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disableClear: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'default'
    },
    value: {
      type: String,
      default: ''
    },
    attr: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      active: false,
      currentValue: this.value
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    },

    currentValue(val) {
      this.$emit('input', val)
    },

    attr: {
      immediate: true,
      handler(attrs) {
        this.$nextTick(() => {
          const target = [this.$refs.input, this.$refs.textarea]
          target.forEach(el => {
            if (!el || !attrs) return
            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]))
          })
        })
      }
    }
  },

  methods: {
    doCloseActive() {
      this.active = false
    },

    handleInput(evt) {
      this.currentValue = evt.target.value
    },

    handleClear() {
      if (this.disabled || this.readonly) return
      this.currentValue = ''
    },

    test() {
      console.log('111')
    }
  }
}
</script>

<style lang="css">
  @component-namespace mint {
    @component field {
      display: flex;

      @when textarea {
        align-items: inherit;

        .mint-cell-title {
          padding: 10px 0;
        }

        .mint-cell-value {
          padding: 5px 0;
        }
      }

      .mint-cell-title {
        width: 105px;
        flex: none;
      }

      .mint-cell-value {
        flex: 1;
        color: inherit;
        display: flex;
      }

      @descendent core {
        appearance: none;
        border-radius: 0;
        border: 0;
        flex: 1;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
      }

      @descendent clear {
        opacity: .2;
      }

      @descendent state {
        color: inherit;
        margin-left: 20px;

        .mintui {
          font-size: 20px;
        }

        @when error {
          color: $error-color;
        }

        @when warning {
          color: $warning-color;
        }

        @when success {
          color: $success-color;
        }

        @when default {
          margin-left: 0;
        }
      }

      @descendent other {
        position: relative 0 0 * *;
      }

      @when nolabel {
        .mint-cell-title {
          display: none;
        }
      }
    }
  }
</style>
