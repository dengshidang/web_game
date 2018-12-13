<template>
  <div class="box border-bottom">
    <div class="title"><p>{{ title }}</p></div>
    <div class="value-box">
      <div class="week">
        <input v-model="currentValue.week" placeholder="(25-45)" pattern="\d*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        <span>周</span>
      </div>
      <div class="day">
        <input v-model="currentValue.dey" placeholder="(0-6)" pattern="\d*" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        <span>天</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RFieldView',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {
        return {
          week: null,
          dey: null
        }
      }
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
    this.currentValue.week = this.currentValue.week ? parseInt(this.currentValue.week) : null
    this.currentValue.dey = this.currentValue.dey ? parseInt(this.currentValue.dey) : null
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .box {
    position: relative;
    background-color: #fff;
    height: 49px;
    display: flex;
    line-height: 49px;
    .title {
      color: #000000;
      font-size: 1.4rem;
      width: 66px;
      margin-right: 20px;
      p {
        width: 100%;
        display: inline-block;
        text-align: justify;
        &::after {
          content: '';
          width: 100%;
          display: inline-block;
          overflow: hidden;
          height: 0;
        }
      }
    }
    .value-box {
      text-align: left;
      font-size: 1.4rem;
      display: flex;
      width: 180px;
      .week, .day {
        display: flex;
        flex: 1;
      }
      .week {
        margin-right: 20px;
      }
      input {
        flex: 1;
        width: 100%;
        border: none;
        // color: #91989E;
        &::-webkit-input-placeholder {
          color: #91989E;
        }
      }
    }
  }
</style>

