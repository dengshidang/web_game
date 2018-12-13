<template>
  <div class="main">
    <r-field-view :title="title" v-model="visitPersonName" @click="handleClick"/>
    <mt-popup v-model="visible" :close-on-click-modal="closeOnClickModal" position="bottom" class="mint-datetime">
      <div class="toolbar">
        <span class="cancel" @click="visible = false;$emit('cancel')">{{ cancelText }}</span>
        <span><slot/></span>
        <span class="confirm" @click="confirm">{{ confirmText }}</span>
      </div>
      <div class="item-box">
        <div
          v-for="item in selectSlots"
          :key="item.patientUuid"
          :class="{'on': item.patientUuid === currentValue}"
          class="item"
          @click="handleSelectClick(item.patientUuid)">
          <span class="no">{{ item.patientUuid }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="checkbox">
            <input
              v-model="item.currentValue"
              :disabled="item.disabled"
              :value="item.patientUuid"
              class="checkbox-input"
              type="checkbox">
            <span class="checkbox-core"/>
          </span>
        </div>
      </div>
      <r-button-add class="bottom-19" type="line">+ 新增就诊人</r-button-add>
    </mt-popup>
  </div>
</template>

<script>
import RFieldView from '@/components/RFieldView'
import { Picker } from 'mint-ui'
import { Popup } from 'mint-ui'
import RButtonAdd from '@/components/RButtonAdd'

export default {
  name: 'RSelect',
  components: {
    RFieldView,
    RButtonAdd,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    selectSlots: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      itemHeight: 50,
      visibleItemCount: 5,
      visible: false,
      cancelText: '取消',
      confirmText: '确认',
      currentValue: this.value // 当前就诊人uuid
    }
  },
  computed: {
    visitPersonName() {
      let personName = ''
      this.selectSlots.forEach((item) => {
        if (item.patientUuid === this.currentValue) {
          personName = item.name
        }
      })
      return personName
    }
  },
  watch: {
    currentValue(value) {
      this.$emit('input', value)
    }
  },
  created() {
    if (this.value) {
      this.handleSelectClick(this.value)
    }
  },
  methods: {
    handleClick() {
      this.visible = true
    },
    closeOnClickModal() {
    },
    confirm() {
      this.visible = false
    },
    handleSelectClick(patientUuid) {
      this.currentValue = patientUuid
      this.selectSlots.forEach((item, index) => {
        if (item.patientUuid === patientUuid) {
          if (item.currentValue) {
            item.currentValue = false
            this.currentValue = null
          } else {
            item.currentValue = true
          }
        } else {
          item.currentValue = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottom-19 {
    margin-bottom: 19px;
  }

  .mint-datetime {
    position: fixed;
    padding: 0 20px;
    box-sizing: border-box;
    opacity: 1;
    bottom: 47px;
  }

  .toolbar {
    height: 60px;
    text-align: center;
    border-bottom: solid 1px #eaeaea;
    .cancel, .confirm {
      display: inline-block;
      line-height: 60px;
      font-size: 1.4rem;
    }
    .cancel {
      float: left;
      color: #000000;
    }
    .confirm {
      float: right;
      color: #0873CC;
    }
    span {
      display: inline-block;
      line-height: 60px;
      color: #91989E;
      font-size: 1.4rem;
    }
  }

  .item-box {
    margin: 10px 0;
    height: 150px;
    overflow: auto;
    .item {
      height: 50px;
      line-height: 50px;
      display: flex;
      font-size: 1.4rem;
      .no {
        color: #91989E;
        flex: 1;
      }
      .name {
        color: #91989E;
      }
      &.on {
        .no {
          color: #000000;
          flex: 1;
        }
        .name {
          color: #000000;
        }
      }
      .checkbox {
        flex: 1;
        .checkbox-core {
          float: right;
          display: inline-block;
          background-color: #fff;
          border-radius: 100%;
          border: 1px solid #ccc;
          position: relative;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-top: 17px;
          &::after {
            border: 2px solid transparent;
            border-left: 0;
            border-top: 0;
            content: " ";
            top: 2px;
            left: 5px;
            position: absolute;
            width: 4px;
            height: 8px;
          }
        }
      }
      .checkbox-input {
        display: none;
        &:checked {
          + .checkbox-core {
            background-color: #26a2ff;
            border-color: #26a2ff;
            &::after {
              border-color: #fff;
              transform: rotate(45deg) scale(1);
            }
          }
        }
      }
    }
  }
</style>
