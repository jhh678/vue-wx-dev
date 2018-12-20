<template>
  <div class="ui-alert">
    <v-dialog v-model="showValue" :mask-transition="maskTransition" :dialog-transition="dialogTransition" :hide-on-blur="hideOnBlur" :mask-z-index="maskZIndex" @on-hide="$emit('on-hide')" @on-show="$emit('on-show')">
      <div class="ui-dialog__hd">
        <strong class="ui-dialog__title">{{ title }}</strong>
      </div>
      <div class="ui-dialog__bd">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="ui-dialog__ft">
        <button v-tap="_onHide" class="ui-dialog__btn">{{ buttonText }}</button>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    value: Boolean,
    title: String,
    content: String,
    buttonText: {
      type: String,
      default: '确定'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'ui-mask'
    },
    dialogTransition: {
      type: String,
      default: 'ui-dialog'
    },
    maskZIndex: [Number, String]
  },
  data() {
    return {
      showValue: false
    }
  },
  watch: {
    value(val) {
      this.showValue = val
    },
    showValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  methods: {
    _onHide() {
      this.showValue = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
