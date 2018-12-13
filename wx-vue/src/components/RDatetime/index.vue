<template>
  <div>
    <r-field-view :title="title" v-model="pickerVisibleFormat" @click="handleClick"/>
    <r-datetime-picker
      ref="picker"
      v-model="pickerVisible"
      :show-toolbar="false"
      :visible-item-count="5"
      :item-height="50"
      :end-date="new Date()"
      type="date"
      @confirm="handleConfirm">
      <slot/>
    </r-datetime-picker>
  </div>
</template>

<script>
import RFieldView from '@/components/RFieldView'
import RDatetimePicker from '@/components/RDatetimePicker'
import { dateFormat } from 'vux'

export default {
  name: 'RDatetime',
  components: {
    RFieldView,
    RDatetimePicker
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Date],
      default: new Date()
    }
  },
  data() {
    return {
      pickerVisible: this.value
    }
  },
  computed: {
    pickerVisibleFormat() {
      return dateFormat(this.pickerVisible, 'YYYY-MM-DD')
    }
  },
  watch: {
    pickerVisible(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    handleClick() {
      this.$refs.picker.open()
    },

    handleConfirm() {

    }
  }
}
</script>

