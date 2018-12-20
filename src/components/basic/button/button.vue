/*
 * @File: 按钮组件
 * @Author: jhh678 
 * @Date: 2018-11-27 15:20:06 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-03 15:33:20
 */
<template>
  <button v-tap="onClick" :style="buttonStyle" class="ui-btn" :class="classes" :disabled="disabled" :type="actionType">
    <i v-if="showLoading" class="ui-loading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
import { router } from '@/utils'

export default {
  name: 'Button',
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    size: {
      type: String,
      default: '' // lg|sm|mi
    },
    halfRadius: Boolean,
    noBorder: {
      type: Boolean,
      default: true
    },
    text: String,
    actionType: String,
    showLoading: Boolean,
    click: Function,
    link: [String, Object],
    gradients: {
      type: Array,
      validator: function(val) {
        return val.length === 2
      }
    }
  },
  computed: {
    buttonStyle() {
      if (this.gradients) {
        return {
          background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
          color: '#FFFFFF'
        }
      }
    },
    classes() {
      return [
        {
          'ui-btn_disabled': this.disabled,
          'ui-btn_no-border': this.noBorder,
          'ui-btn_half_radius': this.halfRadius
        },
        `ui-btn_${this.type}`,
        this.size ? `ui-btn_${this.size}` : '',
        this.showLoading ? `ui-btn_loading` : ''
      ]
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        if (this.click) {
          this.click()
        } else {
          if (this.link) {
            router.go(this.link, this.$router)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/sass/mixin/mobile';

$btnHeight: 0.96rem;
$btnFontSize: 0.32rem;
$btnLineHeight: 0.4rem;
$btnFontColor: #fff;
$btnDisabledFontColor: #ccc;
$btnBorderRadius: 0;
$btnDefaultGap: 0.15rem;

$btnActiveFontColor: #fff;
$btnActiveMaskBg: rgba(0, 0, 0, 0.2);
$btnDisabledBg: #f5f5f5;

$btnLgFontSize: $btnFontSize;
$btnLgHeight: 0.98rem;
$btnLgLineHeight: $btnLineHeight;

$btnSmFontSize: $btnFontSize;
$btnSmHeight: 0.88rem;
$btnSmLineHeight: $btnLineHeight;

$btnMiFontSize: $btnFontSize;
$btnMiHeight: 0.88rem;
$btnMiLineHeight: $btnLineHeight;

$btnDefaultFontColor: $btnFontColor;
$btnDefaultBg: linear-gradient(90deg, rgba(5, 176, 237, 1), rgba(0, 132, 225, 1));

$btnPrimaryFontColor: $btnFontColor;
$btnPrimaryBg: linear-gradient(90deg, rgba(0, 105, 200, 1), rgba(0, 55, 150, 1));

$btnInfoFontColor: $btnFontColor;
$btnInfoBg: linear-gradient(270deg, rgba(75, 190, 70, 1), rgba(95, 210, 90, 1));

$btnWarnFontColor: $btnFontColor;
$btnWarnBg: linear-gradient(180deg, rgba(255, 195, 0, 1), rgba(255, 144, 0, 1));

$btnLinkFontColor: #1c69d3;
$btnLinkBg: #fff;

.ui-btn {
  position: relative;
  display: block;
  height: $btnHeight;
  line-height: $btnLineHeight;
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  font-size: $btnFontSize;
  text-align: center;
  text-decoration: none;
  color: $btnFontColor;
  border-radius: $btnBorderRadius;
  overflow: hidden;
  @include setTapColor();

  &.ui-btn_half_radius {
    border-radius: $btnHeight / 2;
  }

  &:not(.ui-btn_disabled):active::before {
    content: ' ';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.5);
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: $btnBorderRadius * 2;
    background-color: $btnActiveMaskBg;
  }

  &:after {
    content: ' ';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    transform: scale(0.5);
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: $btnBorderRadius * 2;
  }
}
.ui-btn_inline {
  display: inline-block;
}

.ui-btn_default {
  color: $btnDefaultFontColor;
  background: $btnDefaultBg;
}

.ui-btn_primary {
  color: $btnPrimaryFontColor;
  background: $btnPrimaryBg;
}

.ui-btn_info {
  color: $btnInfoFontColor;
  background: $btnInfoBg;
}

.ui-btn_warn {
  color: $btnWarnFontColor;
  background: $btnWarnBg;
}

.ui-btn_link {
  color: $btnLinkFontColor;
  background: $btnLinkBg;
}

.ui-btn_disabled {
  color: $btnDisabledFontColor;
  background-color: $btnDisabledBg;
}

.ui-btn_loading {
  .ui-loading {
    margin: -0.2em 0.34em 0 0;
  }
  &.ui-btn_primary,
  &.ui-btn_warn {
    color: $btnFontColor;
    .ui-loading {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPg==');
    }
  }
}

button,
input {
  &.ui-btn {
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
    &:focus {
      outline: 0;
    }
  }
  &.ui-btn_inline,
  &.ui-btn_mi {
    width: auto;
  }
}

.ui-btn_lg {
  height: $btnLgHeight;
  line-height: $btnLgLineHeight;
  font-size: $btnLgFontSize;
  &.ui-btn_half_radius {
    border-radius: $btnLgHeight / 2;
  }
}

.ui-btn_sm {
  height: $btnSmHeight;
  line-height: $btnSmLineHeight;
  font-size: $btnSmFontSize;
  &.ui-btn_half_radius {
    border-radius: $btnSmHeight / 2;
  }
}

.ui-btn_mi {
  display: inline-block;
  padding: 0 1.32em;
  height: $btnMiHeight;
  line-height: $btnMiLineHeight;
  font-size: $btnMiFontSize;
  &.ui-btn_half_radius {
    border-radius: $btnMiHeight / 2;
  }
}

/*gap between btn*/
.ui-btn + .ui-btn {
  margin-top: $btnDefaultGap;
}

.ui-btn.ui-btn_inline + .ui-btn.ui-btn_inline {
  margin-top: auto;
  margin-left: $btnDefaultGap;
}

.ui-btn-area {
  margin: 0.3rem $btnDefaultGap;
}
.ui-btn-area_inline {
  display: flex;
  .ui-btn {
    margin-top: auto;
    margin-right: $btnDefaultGap;
    width: 100%;
    flex: 1;
    &:last-child {
      margin-right: 0;
    }
  }
}

.ui-btn.ui-btn_no-border:after {
  display: none;
}
</style>
