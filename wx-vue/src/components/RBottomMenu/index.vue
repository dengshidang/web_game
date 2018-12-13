<template>
  <div v-if="nemuView" class="menu">
    <span :class="{ active: isBackActive }" class="back" @click="goBack"/>
    <span :class="{ active: isNextActive }" class="next" @click="goNext"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RbottomMenu',
  computed: {
    ...mapState([
      'nemuView',
      'isBackActive',
      'isNextActive'
    ])
  },
  created() {
    window.addEventListener('popstate', (e) => {
      this.updateBackNumber({ number: -2 })
      // this.updateNextNumber({number: 1})
    }, false)
  },
  methods: {
    ...mapActions([
      'updateBackNumber',
      'updateNextNumber'
    ]),
    goBack() {
      this.$router.go(-1)
    },
    goNext() {
      // this.updateNextNumber({number: -1})
      // this.$router.go(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  width: 100%;
  height: 47px;
  bottom: 0;
  background: #FAFAFC;
  box-shadow: inset 0 1px 0 0 #E8E8EA;
  z-index: 30000;
  .back {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 0 0 2px 2px;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    left: 36%;
    &.active {
      border-color: #000000;
    }
  }
  .next {
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 36%;
    &.active {
      border-color: #000000;
    }
  }
}
</style>

