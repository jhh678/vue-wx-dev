<template>
  <div class="ui-cells_radio" :class="disabled ? 'ui-radio-disabled' : ''">
    <label v-for="(one, index) in newOptions" :key="index" class="ui-cell ui-cell_radio ui-check__label ui-tap-active" :for="`radio_${uuid}_${index}`">
      <div class="ui-cell__bd">
        <slot name="each-item" :icon="one.icon" :label="getValue(one)" :index="index" :selected="currentValue === getKey(one)">
          <p>
            <img v-show="one && one.icon" class="ui-radio-icon" :src="one.icon">
            <span class="ui-radio-label" :style="currentValue === getKey(one) ? (selectedLabelStyle || '') : ''">{{ one | getValue }}</span>
          </p>
        </slot>
      </div>
      <div class="ui-cell__ft">
        <input :id="disabled ? '' : `radio_${uuid}_${index}`" v-model="currentValue" type="radio" class="ui-check" :value="getKey(one)">
        <span class="iconfont" :class="{'icon-list_sel': currentValue === getKey(one)}"></span>
      </div>
    </label>
    <div v-show="fillMode" class="ui-cell">
      <div class="ui-cell__hd"><label for="" class="ui-label">{{ fillLabel }}</label></div>
      <div class="ui-cell__bd">
        <input v-model="fillValue" class="ui-input needsclick" type="text" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()">
      </div>
      <div v-show="value==='' && !isFocus" class="ui-cell__ft">
        <i class="iconfont icon-tishi_tixing"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '@/utils/mixins/base'
import { getValue, getKey, getLabel } from '@/utils/tools/object-filter'
import props from './props'

export default {
  name: 'Radio',
  filters: {
    getValue,
    getKey
  },
  mixins: [Base],
  props: props(),
  data() {
    return {
      newOptions: [],
      fillValue: '',
      isFocus: false,
      currentValue: this.value
    }
  },
  watch: {
    options: {
      handler(curVal, oldVal) {
        this.newOptions = tranformOptions(curVal, this.optionPropsText)
      },
      deep: true
    },
    value(val) {
      this.currentValue = val
    },
    currentValue(newVal) {
      var isOption = contains(this.newOptions, newVal)
      if (newVal !== '' && isOption) {
        this.fillValue = ''
      }
      this.$emit('on-change', newVal, getLabel(this.newOptions, newVal))
      this.$emit('input', newVal)
    },
    fillValue(newVal) {
      if (this.fillMode && this.isFocus) {
        this.currentValue = newVal
      }
    }
  },
  created() {
    this.handleChangeEvent = true
    this.newOptions = tranformOptions(this.options, this.optionPropsText)
  },
  methods: {
    getValue,
    getKey,
    onFocus() {
      this.currentValue = this.fillValue || ''
      this.isFocus = true
    }
  }
}

function tranformOptions(options, optionPropsText) {
  if (options && options.length && typeof options[0] === 'object' && optionPropsText) {
    let newOptions = []
    for (let i = 0, len = options.length; i < len; i++) {
      let obj = {
        key: options[i][optionPropsText.key],
        value: options[i][optionPropsText.value]
      }
      newOptions.push(obj)
    }
    return newOptions
  } else {
    return options
  }
}

function contains(a, obj) {
  var i = a.length
  while (i--) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
}
</script>

<style lang="scss">
@import '@/assets/css/sass/mixin/mobile';

.ui-label {
  display: block;
  width: 1.6rem;
  word-wrap: break-word;
  word-break: break-all;
}

.ui-check__label {
  @include setTapColor();
}

.ui-check {
  position: absolute;
  left: -9999em;
}

.ui-cells_checkbox {
  .ui-cell__hd {
    padding-right: 0.32rem;
  }
  .icon-list_sel {
    color: #c9c9c9;
  }
}
// method2 accessbility
.ui-check {
  // checkbox
  .ui-cells_checkbox & {
    &:checked {
      & + .icon-list_sel {
        color: #09bb07;
      }
    }
  }
}
.ui-cells_radio {
  .ui-cell_radio {
    padding: 0.28rem 0.4rem;
    font-size: 0.32rem;
    line-height: 0.4rem;

    &::after {
      left: 0;
    }
  }
  .ui-cell__ft {
    padding-left: 0.32rem;
  }
}
.ui-check {
  // radio
  .ui-cells_radio & {
    &:checked {
      & + .icon-list_sel {
        font-size: 0.32rem;
        line-height: 0.4rem;
        color: #ff9000;
      }
    }
  }
}

.ui-cell_radio > * {
  pointer-events: none;
}
.ui-radio-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.ui-radio-label {
  vertical-align: middle;
}
.ui-cells_radio.ui-radio-disabled .ui-check:checked + .icon-list_sel:before {
  opacity: 0.5;
}
</style>
