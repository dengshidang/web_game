<template>
  <div class="time-info-sbox">
    <div v-for="(item, index) in options" :key="item.id">
      <div :class="{'full': item.remainingVotes != undefined && item.remainingVotes <= 0, 'border-bottom': border }" class="time-list" @click="handleSelectClick(item.id, item.remainingVotes)">
        <div class="remaining-votes-box">
          <span class="each-item">
            <slot :item="item" name="each-item"/>
          </span>
          <span class="checkbox">
            <input
              v-model="options[index].currentValue"
              :value="item.id"
              class="checkbox-input"
              type="checkbox">
            <span class="checkbox-core"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RSelectRadio',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue(value) {
      this.$emit('input', value)
    }
  },
  created() {
    this.options.forEach((item, index) => {
      if (item.id === this.currentValue) {
        item.currentValue = true
      } else {
        item.currentValue = false
      }
      this.options.splice(index, 1, item)
    })
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
    handleSelectClick(id, remainingVotes) {
      if (remainingVotes === undefined || remainingVotes > 0) {
        this.currentValue = id
        this.options.forEach((item, index) => {
          if (item.id === this.currentValue) {
            if (item.currentValue) {
              item.currentValue = false
              this.currentValue = null
            } else {
              item.currentValue = true
            }
          } else {
            item.currentValue = false
          }
          this.options.splice(index, 1, item)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .time-info-sbox {
    background:#FFFFFF;
    .time-list {
      display: flex;
      .remaining-votes-box {
        display: inline-block;
        flex: 1;
        margin: 15px 0 ;
        margin-right: 25px;
        padding-left: 20px;
        display: flex;
        .each-item {
          display: inline-block;
          flex: 1;
        }
        .checkbox {
          float: right;
          .checkbox-core {
            display: inline-block;
            background-color: #fff;
            border-radius: 100%;
            border: 1px solid #ccc;
            position: relative;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-top: 1px;
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
              background-color: #00ADB8;
              border-color: #00ADB8;
              &::after {
                border-color: #fff;
                transform: rotate(45deg) scale(1);
              }
            }
          }
        }
      }
    }
    .time-list.full {
      .time {
        color: #91989E;
      }
      .remaining-votes-box {
        color: #91989E;
        .span {
          color: #91989E;
        }
        .remaining-votes {
          color: #91989E;
        }
        .checkbox {
          display: none;
        }
      }
    }
  }
</style>
