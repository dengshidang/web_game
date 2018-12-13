<template>
  <div>
    <r-field-view :title="title" v-model="currentValue" @click="handleClick"/>
    <mt-popup v-model="visible" :close-on-click-modal="closeOnClickModal" position="bottom" class="main mint-datetime">
      <mt-picker
        ref="picker"
        :slots="slots"
        :visible-item-count="visibleItemCount"
        :item-height="itemHeight"
        v-model="currentValue"
        class="mint-datetime-picker"
        show-toolbar
        @change="onChange">
        <span class="mint-datetime-action mint-datetime-cancel" @click="visible = false;$emit('cancel')">{{ cancelText }}</span>
        <span><slot/></span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{ confirmText }}</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import RFieldView from '@/components/RFieldView'
import { Picker } from 'mint-ui'
import { Popup } from 'mint-ui'

export default {
  name: 'RPopupPicker',
  components: {
    RFieldView,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    slots: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemHeight: 50,
      visibleItemCount: 5,
      visible: false,
      cancelText: '取消',
      confirmText: '确认',
      currentValue: this.value
    }
  },
  mounted() {
    this.currentValue = this.value
    this.$refs.picker.setSlotValue(0, this.currentValue)
  },
  methods: {
    handleClick() {
      this.visible = true
    },
    closeOnClickModal() {

    },
    onChange(picker) {
      this.currentValue = picker.getSlotValue(0)
    },
    confirm() {
      this.visible = false
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main.mint-datetime {
    opacity: 1;
    bottom: 47px;
    background: #fff;
    /deep/ .picker {
      padding: 0 20px;
      .picker-toolbar {
        height: 60px;
        text-align: center;
        span {
          display: inline-block;
          line-height: 60px;
          color: #91989E;
          font-size: 1.4rem;
        }
        .mint-datetime-cancel {
          left: 0;
          color: #000000;
        }
        .mint-datetime-confirm {
          right: 0;
          color: #0873CC;
        }
        .mint-datetime-action {
          display: inline-block;
          width: initial;
          line-height: 60px;
          font-size: 1.4rem;
        }
      }
    }
    /deep/ .picker-items {
      .picker-item {
        color: #91989E;
        &.picker-selected {
          color: #00ADB8;
        }
      }
      .picker-center-highlight:before, .picker-center-highlight:after {
        background-color: #ECECEC;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        opacity: 0.5;
        background-image: radial-gradient(50% 50%, rgba(0,173,184,0.2) 50%, rgba(0,173,184,0.00) 99%);
        height: 5px;
        margin-top: -2px;
      }
    }
  }
</style>
