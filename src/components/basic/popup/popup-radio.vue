<template>
  <v-cell :title="title" :value="currentValue" :is-link="!readonly" :value-align="valueAlign" :border-intent="borderIntent" :required="required" @click.native="show">
    <span v-if="!displayValue && placeholder" class="ui-cell-placeholder">{{ placeholder }}</span>
    <span v-if="displayValue" slot="after-title" class="ui-cell-value">{{ displayValue }}</span>
    <span>
      <slot name="icon">
        <i class="iconfont icon-jinru"></i>
      </slot>
    </span>
    <div v-transfer-dom>
      <v-popup v-model="showPopup" :header-title="headerTitle" :show-header-right="true" style="background-color:#fff;" @on-click-right="emitShow(false)" @on-hide="emitShow(false)" @on-show="emitShow(true)">
        <slot name="popup-header" :options="options" :value="currentValue"></slot>
        <i slot="header-right-text" class="iconfont icon-guanbi"></i>
        <v-radio v-model="currentValue" :options="options" :option-props-text="optionPropsText" :fill-mode="false" @on-change="onValueChange">
          <template slot="each-item" slot-scope="props">
            <slot name="each-item" :icon="props.icon" :label="props.label" :index="props.index">
              <p>
                <img v-show="props.icon" class="ui-radio-icon" :src="props.icon">
                <span class="ui-radio-label">{{ props.label }}</span>
              </p>
            </slot>
          </template>
        </v-radio>
      </v-popup>
    </div>
  </v-cell>
</template>

<script>
import radioProps from '../radio/props'
import cellProps from '../cell/props'

const _cellProps = cellProps()
delete _cellProps.value

export default {
  name: 'PopupRadio',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    readonly: Boolean,
    ..._cellProps,
    ...radioProps(),
    headerTitle: {
      type: String,
      default: ''
    },
    required: Boolean
  },
  data() {
    return {
      showPopup: false,
      currentValue: this.value
    }
  },
  computed: {
    displayValue() {
      if (!this.options.length) {
        return ''
      }
      if (typeof this.options[0] === 'object') {
        let optionPropsTextDefault = {
          key: 'key',
          value: 'value'
        }
        if (this.optionPropsText) {
          optionPropsTextDefault = this.optionPropsText
        }
        const match = this.options.find(option => {
          return option[optionPropsTextDefault.key] === this.currentValue
        })
        if (match) {
          return match[optionPropsTextDefault.value]
        }
      }
      return this.currentValue
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  methods: {
    onValueChange(val) {
      this.hide()
    },
    show() {
      if (!this.readonly) {
        this.showPopup = true
      }
    },
    hide() {
      this.showPopup = false
    },
    emitShow(isShow) {
      if (isShow) {
        this.show()
        this.$emit('on-show')
      } else {
        this.hide()
        this.$emit('on-hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-popup-radio-popup {
  background-color: #fff;
}

.iconfont.icon-jinru {
  margin-left: 0.08rem;
  font-size: 0.32rem;
}

.ui-cell-placeholder {
  color: #ccc;
}

.ui-cell-value {
  color: #333;
}
</style>
