<template>
  <div class="ui-confirm">
    <v-dialog v-model="showValue" :dialog-class="theme === 'android' ? 'ui-dialog ui-skin_android' : 'ui-dialog'" :mask-transition="maskTransition" :dialog-transition="theme === 'android' ? 'ui-fade' : dialogTransition" :hide-on-blur="hideOnBlur" :mask-z-index="maskZIndex" @on-hide="$emit('on-hide')">
      <div v-if="!!title" class="ui-dialog__hd" :class="{'with-no-content': !showContent}">
        <strong class="ui-dialog__title">{{ title }}</strong>
      </div>
      <template v-if="showContent">
        <div v-if="!showInput" class="ui-dialog__bd">
          <slot>
            <div v-html="content"></div>
          </slot>
        </div>
        <div v-else class="ui-prompt">
          <input ref="input" v-model="msg" class="ui-prompt-msgbox" v-bind="getInputAttrs()" :placeholder="placeholder" @touchend="setInputFocus" />
        </div>
      </template>
      <div class="ui-dialog__ft">
        <button v-if="showCancelButton" v-tap="_onCancel" class="ui-dialog__btn ui-dialog__btn_default">{{cancelText}}</button>
        <button v-if="showConfirmButton" v-tap="_onConfirm" class="ui-dialog__btn" :class="`ui-dialog__btn_${confirmType}`">{{confirmText}}</button>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'ios'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    maskTransition: {
      type: String,
      default: 'ui-fade'
    },
    maskZIndex: [Number, String],
    dialogTransition: {
      type: String,
      default: 'ui-dialog'
    },
    content: String,
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    inputAttrs: Object,
    showContent: {
      type: Boolean,
      default: true
    },
    confirmType: {
      type: String,
      default: 'primary'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      msg: '',
      showValue: false
    }
  },
  watch: {
    value(val) {
      this.showValue = val
    },
    showValue(val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = ''
          setTimeout(() => {
            if (this.$refs.input) {
              this.setInputFocus()
            }
          }, 300)
        }
        this.$emit('on-show') // emit just after msg is cleared
      }
    }
  },
  created() {
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  methods: {
    getInputAttrs() {
      return (
        this.inputAttrs || {
          type: 'text'
        }
      )
    },
    setInputValue(val) {
      this.msg = val
    },
    setInputFocus(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$refs.input.focus()
    },
    _onConfirm() {
      if (!this.showValue) {
        return
      }
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      this.$emit('on-confirm', this.msg)
    },
    _onCancel() {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="scss">
.ui-prompt {
  padding-bottom: 1.6em;
}
.ui-prompt-msgbox {
  width: 80%;
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 4px 5px;
  appearance: none;
  outline: none;
  font-size: 16px;
}
</style>
