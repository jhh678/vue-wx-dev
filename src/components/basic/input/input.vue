<template>
  <div class="ui-v-input ui-cell" :class="{
      'ui-border': borderType,
      'ui-border-round': borderType === 'round',
			'ui-cell_warn': showWarn,
			'disabled': disabled,
      'ui-required': required,
			'ui-v-input-has-right-full': hasRightFullHeightSlot
		}">
    <div class="ui-cell__hd">
      <div v-if="hasRestrictedLabel" :style="labelStyles">
        <slot name="restricted-label"></slot>
      </div>
      <slot name="label">
        <label v-if="title" class="ui-label" :class="labelClass" :style="{width: labelWidth || $parent.labelWidth || labelWidthComputed, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" :for="`ui-v-input-${uuid}`" v-html="title"></label>
        <span v-if="inlineDesc" class="ui-label-desc">{{ inlineDesc }}</span>
      </slot>
    </div>
    <div class="ui-cell__bd ui-cell__primary" :class="placeholderAlign ? `ui-v-input-placeholder-${placeholderAlign}` : ''">
      <input v-if="!type || type === 'text'" :id="`ui-v-input-${uuid}`" ref="input" v-model="currentValue" class="ui-input" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :style="inputStyle" type="text" :name="name" :pattern="pattern" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" @focus="focusHandler" @blur="onBlur" @keyup="onKeyUp" />
      <input v-if="type === 'number'" :id="`ui-v-input-${uuid}`" ref="input" v-model="currentValue" class="ui-input" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :style="inputStyle" type="number" :name="name" :pattern="pattern" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" @focus="focusHandler" @blur="onBlur" @keyup="onKeyUp" />
      <input v-if="type === 'email'" :id="`ui-v-input-${uuid}`" ref="input" v-model="currentValue" class="ui-input" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :style="inputStyle" type="email" :name="name" :pattern="pattern" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" @focus="focusHandler" @blur="onBlur" @keyup="onKeyUp" />
      <input v-if="type === 'password'" :id="`ui-v-input-${uuid}`" ref="input" v-model="currentValue" class="ui-input" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :style="inputStyle" type="password" :name="name" :pattern="pattern" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" @focus="focusHandler" @blur="onBlur" @keyup="onKeyUp" />
      <input v-if="type === 'tel'" :id="`ui-v-input-${uuid}`" ref="input" v-model="currentValue" class="ui-input" :maxlength="max" :autocomplete="autocomplete" :autocapitalize="autocapitalize" :autocorrect="autocorrect" :spellcheck="spellcheck" :style="inputStyle" type="tel" :name="name" :pattern="pattern" :placeholder="placeholder" :readonly="readonly" :disabled="disabled" @focus="focusHandler" @blur="onBlur" @keyup="onKeyUp" />
    </div>
    <div class="ui-cell__ft">
      <i v-show="!hasRightFullHeightSlot && !equalWith && showClear && currentValue !== '' && !readonly && !disabled && isFocus" v-tap="clear" class="iconfont icon-bar_qingchu"></i>
      <!-- <icon type="clear" v-show="!hasRightFullHeightSlot && !equalWith && showClear && currentValue !== '' && !readonly && !disabled && isFocus" @click.native="clear"></icon>

      <icon @click.native="onClickErrorIcon" class="ui-input-icon" type="warn" :title="!valid ? firstError : ''" v-show="showWarn"></icon>
      <icon @click.native="onClickErrorIcon" class="ui-input-icon" type="warn" v-if="!novalidate && hasLengthEqual && dirty && equalWith && !valid"></icon>

      <icon type="success" v-show="!novalidate && equalWith && equalWith === currentValue && valid"></icon>

      <icon type="success" class="ui-input-icon" v-show="novalidate && iconType === 'success'"></icon>
      <icon type="warn" class="ui-input-icon" v-show="novalidate && iconType === 'error'"></icon> -->

      <slot name="right"></slot>
      <div v-if="hasRightFullHeightSlot" class="ui-v-input-right-full">
        <slot name="right-full-height"></slot>
      </div>
    </div>

    <!-- <v-toast
    v-model="showErrorToast"
    type="text"
    width="auto"
    :time="600">{{ firstError }}</v-toast> -->
  </div>
</template>

<script>
import Base from '@/utils/mixins/base'
// import isEmail from 'validator/lib/isEmail'
// import isMobilePhone from 'validator/lib/isMobilePhone'
import { debounce } from '@/utils/tools/throttle-debounce'
// import mask from 'vanilla-masker'
// const validators = {
//   'email': {
//     fn: isEmail,
//     msg: '邮箱格式'
//   },
//   'china-mobile': {
//     fn(str) {
//       return isMobilePhone(str, 'zh-CN')
//     },
//     msg: '手机号码'
//   },
//   'china-name': {
//     fn(str) {
//       return str.length >= 2 && str.length <= 6
//     },
//     msg: '中文姓名'
//   }
// }
export default {
  name: 'Input',
  mixins: [Base],
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    borderType: String, // 'right'(直角)|'round'(圆角)
    placeholder: String,
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    keyboard: String,
    required: Boolean,
    inlineDesc: String,
    isType: [String, Function],
    min: Number,
    max: Number,
    showClear: {
      type: Boolean,
      default: true
    },
    equalWith: String,
    textAlign: String,
    // https://github.com/yisibl/blog/issues/3
    autocomplete: {
      type: String,
      default: 'off'
    },
    autocapitalize: {
      type: String,
      default: 'off'
    },
    autocorrect: {
      type: String,
      default: 'off'
    },
    spellcheck: {
      type: String,
      default: 'false'
    },
    novalidate: {
      type: Boolean,
      default: false
    },
    iconType: String,
    debounce: Number,
    placeholderAlign: String,
    labelWidth: {
      type: String,
      default: '1.6rem'
    },
    mask: String,
    shouldToastError: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hasRightFullHeightSlot: false,
      hasRestrictedLabel: false,
      firstError: '',
      forceShowError: false,
      hasLengthEqual: false,
      valid: true,
      currentValue: '',
      showErrorToast: false,
      isFocus: false
    }
  },
  computed: {
    labelStyles() {
      return {
        width: this.labelWidthComputed || this.$parent.labelWidth || this.labelWidthComputed,
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    labelClass() {
      return {
        'ui-cell-justify':
          this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      }
    },
    pattern() {
      if (this.keyboard === 'number' || this.isType === 'china-mobile') {
        return '[0-9]*'
      }
    },
    labelWidthComputed() {
      const width = this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
      if (width < 10) {
        return width + 'em'
      }
    },
    hasErrors() {
      return Object.keys(this.errors).length > 0
    },
    inputStyle() {
      if (this.textAlign) {
        return {
          textAlign: this.textAlign
        }
      }
    },
    showWarn() {
      return (
        !this.novalidate &&
        !this.equalWith &&
        !this.valid &&
        this.firstError &&
        (this.touched || this.forceShowError)
      )
    }
  },
  watch: {
    mask(val) {
      if (val && this.currentValue) {
        this.currentValue = this.maskValue(this.currentValue)
      }
    },
    valid() {
      this.getError()
    },
    value(val) {
      this.currentValue = val
    },
    equalWith(newVal) {
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
    },
    currentValue(newVal, oldVal) {
      if (!this.equalWith && newVal) {
        this.validateEqual()
      }
      if (newVal && this.equalWith) {
        if (newVal.length === this.equalWith.length) {
          this.hasLengthEqual = true
        }
        this.validateEqual()
      } else {
        this.validate()
      }
      // let selection = this.$refs.input.selectionStart
      let direction = newVal.length - oldVal.length
      // selection = this._getInputMaskSelection(selection, direction, this.maskValue(newVal))
      this.lastDirection = direction
      this.$emit('input', this.maskValue(newVal))
      // #2810
      // this.$nextTick(() => {
      //   if (this.$refs.input.selectionStart !== selection) {
      //     this.$refs.input.selectionStart = selection
      //     this.$refs.input.selectionEnd = selection
      //   }
      //   if (this.currentValue !== this.maskValue(newVal)) {
      //     this.currentValue = this.maskValue(newVal)
      //   }
      // })
      if (this._debounce) {
        this._debounce()
      } else {
        this.$emit('on-change', newVal)
      }
    }
  },
  created() {
    this.currentValue =
      this.value === undefined || this.value === null
        ? ''
        : this.mask
          ? this.maskValue(this.value)
          : this.value
    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'development') {
      if (!this.title && !this.placeholder && !this.currentValue) {
        console.warn('no title and no placeholder?')
      }
    }
    if (this.required && (typeof this.currentValue === 'undefined' || this.currentValue === '')) {
      this.valid = false
    }
    this.handleChangeEvent = true
    if (this.debounce) {
      this._debounce = debounce(() => {
        this.$emit('on-change', this.currentValue)
      }, this.debounce)
    }
  },
  beforeMount() {
    if (this.$slots && this.$slots['restricted-label']) {
      this.hasRestrictedLabel = true
    }
    if (this.$slots && this.$slots['right-full-height']) {
      this.hasRightFullHeightSlot = true
    }
  },
  beforeDestroy() {
    if (this._debounce) {
      this._debounce.cancel()
    }
    window.removeEventListener('resize', this.scrollIntoView)
  },
  mounted() {
    window.addEventListener('resize', this.scrollIntoView)
  },
  methods: {
    scrollIntoView(time = 0) {
      // alert('scroll into view')
      if (/iphone/i.test(navigator.userAgent)) {
        // return
      }
      if (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      ) {
        // alert('will scroll')
        setTimeout(() => {
          // alert(this.$refs.input.length)
          this.$refs.input.scrollIntoViewIfNeeded(true)
        }, time)
      }
    },
    onClickErrorIcon() {
      if (this.shouldToastError && this.firstError) {
        this.showErrorToast = true
      }
      this.$emit('on-click-error-icon', this.firstError)
    },
    maskValue(val) {
      const val1 = this.mask ? this.mask.toPattern(val, this.mask) : val
      return val1
    },
    reset(value = '') {
      this.dirty = false
      this.currentValue = value
      this.firstError = ''
      this.valid = true
    },
    clear() {
      this.currentValue = ''
      this.focus()
      this.$emit('on-click-clear-icon')
    },
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    focusHandler($event) {
      this.$emit('on-focus', this.currentValue, $event)
      this.isFocus = true
      // this.scrollIntoView(500)
      // this.scrollIntoView(5000)
      setTimeout(() => {
        this.$refs.input.scrollIntoViewIfNeeded(false)
        // this.$refs.input.scrollIntoViewIfNeeded()
      }, 1000)
      // $event.target.
    },
    onBlur($event) {
      this.setTouched()
      this.validate()
      this.isFocus = false
      this.$emit('on-blur', this.currentValue, $event)
    },
    onKeyUp(e) {
      if (e.key === 'Enter') {
        e.target.blur()
        this.$emit('on-enter', this.currentValue, e)
      }
    },
    getError() {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
    },
    validate() {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual()
        return
      }
      this.errors = {}
      if (!this.currentValue && !this.required) {
        this.valid = true
        return
      }
      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        this.getError()
        return
      }
      // if (typeof this.isType === 'string') {
      //   const validator = validators[this.isType]
      //   if (validator) {
      //     let value = this.currentValue
      //     if (this.isType === 'china-mobile' && this.mask === '999 9999 9999') {
      //       value = this.currentValue.replace(/\s+/g, '')
      //     }
      //     this.valid = validator['fn'](value)
      //     if (!this.valid) {
      //       this.forceShowError = true
      //       this.errors.format = validator['msg'] + '格式不对哦~'
      //       this.getError()
      //       return
      //     } else {
      //       delete this.errors.format
      //     }
      //   }
      // }
      if (typeof this.isType === 'function') {
        const validStatus = this.isType(this.currentValue)
        this.valid = validStatus.valid
        if (!this.valid) {
          this.errors.format = validStatus.msg
          this.forceShowError = true
          this.getError()
          return
        } else {
          delete this.errors.format
        }
      }
      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = `最少应该输入${this.min}个字符哦`
          this.valid = false
          this.getError()
          return
        } else {
          delete this.errors.min
        }
      }
      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = `最多可以输入${this.max}个字符哦`
          this.valid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }
      this.valid = true
    },
    validateEqual() {
      if (!this.equalWith && this.currentValue) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      }
      let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false
        this.errors.equal = '输入不一致'
        return
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false
        } else {
          this.valid = true
          delete this.errors.equal
        }
      }
    },
    // #2810
    _getInputMaskSelection(selection, direction, maskVal, loop) {
      if (!this.mask || (loop && direction === 0)) {
        return selection
      }
      if (direction === 0) {
        direction = this.lastDirection
      }
      if (direction > 0) {
        const maskChar = this.mask.substr(selection - direction, 1)
        if (!maskChar.match(/[9SA]/)) {
          return this._getInputMaskSelection(selection + 1, direction, maskVal, true)
        }
      }
      return selection
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-v-input {
  padding: 0.28rem 0.24rem;
  & + & {
    margin-top: 0.24rem;
  }

  &.ui-cell {
    &.ui-border {
      box-shadow: inset 0 0 1px 0 #aaa;
      &::before,
      &::after {
        display: none;
      }
      &.ui-border-round {
        padding: 0.28rem 0.4rem;
        border-radius: 0.48rem;
      }
    }
  }

  .ui-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: 0.32rem;
    color: #333;
    line-height: 0.4rem;

    &::-webkit-input-placeholder {
      color: #ccc;
    }

    // hides the spin-button
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.ui-v-input .ui-v-input-placeholder-right input::-webkit-input-placeholder {
  text-align: right;
}
.ui-v-input .ui-v-input-placeholder-center input::-webkit-input-placeholder {
  text-align: center;
}
.ui-v-input .ui-input-icon {
  color: #999;
  font-size: 0.48rem;
}
// .ui-input-icon.ui-icon-warn:before,
// .ui-input-icon.ui-icon-success:before {
//   font-size: 0.48rem;
// }
.ui-v-input .ui-icon {
  padding-left: 5px;
}
.ui-v-input.ui-cell_vcode {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.ui-v-input.disabled {
  .ui-input {
    text-fill-color: #ccc;
    -webkit-text-fill-color: #ccc; /* Override iOS / Android font color change */
    opacity: 1; /* Override iOS opacity change affecting text & background color */
  }
}
.ui-v-input-right-full {
  margin-left: 5px;
  height: 1.04rem;
  vertical-align: middle;
  & img {
    height: 1.04rem;
  }
}
.ui-v-input-has-right-full {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.ui-label-desc {
  font-size: 0.32rem;
  color: #666;
}

.ui-cell_vcode {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.ui-vcode-img {
  margin-left: 5px;
  height: 1.04rem;
  vertical-align: middle;
}

.ui-vcode-btn {
  display: inline-block;
  margin-left: 5px;
  padding: 0 0.6em 0 0.7em;
  border-left: 1px solid #ddd;
  line-height: 0.4rem;
  vertical-align: middle;
  font-size: 0.32rem;
  color: #1c69d3;
  &button {
    background-color: transparent;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    outline: 0;
  }
  &:active {
    color: #cccccc;
  }
}

.ui-cell__ft {
  display: flex;
  .iconfont {
    font-size: 0.32rem;

    &.icon-bar_qingchu {
      color: #666;
      font-size: 0.4rem;
      padding: 0 0.08rem;
    }
  }
}
</style>
