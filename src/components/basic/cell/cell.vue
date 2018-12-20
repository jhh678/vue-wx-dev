<template>
  <div v-tap="onClick" class="ui-cell" :class="{
      'ui-tap-active': isLink || !!link,
      'ui-cell_access': isLink || !!link,
      'ui-cell-no-border-intent': !borderIntent,
      'ui-cell-disabled': disabled,
      'ui-required': required
    }" :style="style">
    <div class="ui-cell__hd">
      <slot name="icon"></slot>
    </div>
    <div class="ui-cell-bd" :class="{'ui-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p class="ui-title-wrap">
        <label v-if="title || hasTitleSlot" class="ui-label" :style="labelStyles" :class="labelClass">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <span class="ui-label-desc">
        <slot name="inline-desc">{{ inlineDesc }}</slot>
      </span>
    </div>
    <div class="ui-cell__ft" :class="valueClass">
      <slot>{{ value }}</slot>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import { router, getParentProp, cleanStyle } from '@/utils'
import props from './props'

export default {
  name: 'Cell',
  props: props(),
  data() {
    return {
      hasTitleSlot: true,
      hasMounted: false
    }
  },
  computed: {
    labelStyles() {
      return cleanStyle({
        width: getParentProp(this, 'labelWidth'),
        textAlign: getParentProp(this, 'labelAlign'),
        marginRight: getParentProp(this, 'labelMarginRight')
      })
    },
    valueClass() {
      return {
        'ui-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
        'ui-cell-align-left': this.valueAlign === 'left',
        'ui-cell-arrow-transition': !!this.arrowDirection,
        'ui-cell-arrow-up': this.arrowDirection === 'up',
        'ui-cell-arrow-down': this.arrowDirection === 'down'
      }
    },
    labelClass() {
      return {
        'ui-cell-justify':
          this.$parent &&
          (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
      }
    },
    style() {
      if (this.alignItems) {
        return {
          alignItems: this.alignItems
        }
      }
    }
  },
  beforeMount() {
    this.hasTitleSlot = !!this.$slots.title
  },
  methods: {
    onClick() {
      /* istanbul ignore next */
      !this.disabled && router.go(this.link, this.$router)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/sass/mixin/mobile';

.ui-cells {
  margin-top: 0.2rem;
  background-color: #fff;
  line-height: 0.4rem;
  font-size: 0.32rem;

  overflow: hidden; //因为每个cell的border使用before元素left搞的，ie下伪元素的containing block估计跟标准不同，在cell上用oh不生效

  // onepx
  position: relative;
  &:before {
    @include setTopLine();
  }
  &:after {
    @include setBottomLine();
  }
}

.ui-cells__title {
  margin-top: 0.2rem; // 15px - 行高
  margin-bottom: 0.2rem; // 8px - 行高
  // padding-left: @weuiCellGapH;
  // padding-right: @weuiCellGapH;
  color: #333333;
  font-size: 0.32rem;

  & + .ui-cells {
    margin-top: 0;
  }
}

.ui-cells__tips {
  margin-top: 0.3em; // 8px - 行高
  color: #ccc;
  // padding-left: @weuiCellGapH;
  // padding-right: @weuiCellGapH;
  font-size: 0.32rem;
}

.ui-cell {
  padding: 0.32rem 0.24rem;
  position: relative; //这个是为了兼容cells容器onepx方案被before挡住而做的
  display: flex;
  align-items: center;
  &::after {
    @include setBottomLine();
    left: 0.24rem;
  }
  &:last-child {
    &::after {
      display: none;
    }
  }
}
.ui-cell_primary {
  align-items: flex-start;
}
.ui-cell__bd {
  flex: 1;
}
.ui-cell__ft {
  text-align: right;
  color: #ccc;
}
.ui-cell-justify {
  &:after {
    content: '.';
    display: inline-block;
    width: 100%;
    overflow: hidden;
    height: 0;
  }
}

.ui-cell-primary {
  flex: 1;
}

.ui-title-wrap {
  display: flex;
}

.ui-label {
  display: inline-block;
  word-wrap: break-word;
  word-break: break-all;
}
.ui-cell__ft.ui-cell-align-left {
  text-align: left;
}
.ui-cell.ui-cell-no-border-intent:before {
  left: 0;
}
.ui-cell_access .ui-cell__ft.ui-cell-arrow-down:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(90deg);
}
.ui-cell_access .ui-cell__ft.ui-cell-arrow-up:after {
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(-90deg);
}
.ui-cell-arrow-transition:after {
  transition: transform 300ms;
}
.ui-cell-disabled {
  .ui-label {
    color: #b2b2b2;
  }
  &.ui-cell_access .ui-cell__ft:after {
    border-color: #ccc;
  }
}

.ui-label-desc {
  font-size: 0.32rem;
  color: #666;
}
</style>
