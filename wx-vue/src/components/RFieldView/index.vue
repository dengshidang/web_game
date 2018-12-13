<template>
  <div class="box border-bottom" @click="handleClick">
    <div class="title"><p>{{ title }}</p></div>
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RFieldView',
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
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
    &::after {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #c8c8cd;
      border-style: solid;
      -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
      transform: matrix(.71,.71,-.71,.71,0,0);
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      margin-top: -4px;
      right: 22px;
    }
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
    .value {
      text-align: left;
      // color: #91989E;
      font-size: 1.4rem;
      flex: 1;
    }
  }
</style>

