<template>
  <div v-transfer-dom class="ui-x-dialog" :class="{'ui-x-dialog-absolute': layout === 'VIEW_BOX'}">
    <transition :name="maskTransition">
      <div v-show="show" class="ui-mask" :style="maskStyle" @click="hide"></div>
    </transition>
    <transition :name="dialogTransition">
      <div v-show="show" :class="dialogClass" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import preventBodyScrollMixin from '@/utils/mixins/prevent-body-scroll'
export default {
  name: 'Dialog',
  mixins: [preventBodyScrollMixin],
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'ui-mask'
    },
    maskZIndex: [String, Number],
    dialogTransition: {
      type: String,
      default: 'ui-dialog'
    },
    dialogClass: {
      type: String,
      default: 'ui-dialog'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    dialogStyle: Object,
    scroll: {
      type: Boolean,
      default: true,
      validator(val) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development' && val === false) {
          console.warn(
            '[warn] x-dialog:scroll 已经废弃。如果你是 100% 布局，请参照文档配置 $layout 以实现阻止滚动'
          )
        }
        return true
      }
    }
  },
  data() {
    return {
      layout: ''
    }
  },
  computed: {
    maskStyle() {
      if (typeof this.maskZIndex !== 'undefined') {
        return {
          zIndex: this.maskZIndex
        }
      }
    }
  },
  watch: {
    show(val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
      if (val) {
        this.addModalClassName()
      } else {
        this.removeModalClassName()
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      if (window.UI_CONFIG && window.UI_CONFIG.$layout === 'VIEW_BOX') {
        this.layout = 'VIEW_BOX'
      }
    }
  },
  methods: {
    shouldPreventScroll() {
      // hard to get focus on iOS device with fixed position, so just ignore it
      const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
      const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea')
      if (iOS && hasInput) {
        return true
      }
    },
    hide(event) {
      if (this.hideOnBlur) {
        this.$emit('update:show', false)
        this.$emit('change', false)
        this.$emit('on-click-mask')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/sass/mixin/mobile';

.ui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.ui-mask_transparent {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.ui-dialog {
  position: fixed;
  display: table;
  z-index: 5000;
  width: 80%;
  max-width: 6.8rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  background-color: #fff;
  text-align: center;
  border-radius: 0.2rem;
  overflow: hidden;
}
.ui-dialog__hd {
  padding: 0.72rem 0.48rem 0.24rem;
  &.with-no-content {
    padding: 1.7em 1.6em;
  }
}
.ui-dialog__title {
  font-weight: normal;
  font-size: 0.32rem;
  line-height: 0.4rem;
  color: #333;
}
.ui-dialog__bd {
  padding: 0 0.48rem 0.72rem;
  word-wrap: break-word;
  word-break: break-all;
  color: #999999;
  font-size: 0.28rem;
  line-height: 0.36rem;
  // &:first-child {
  //   padding: 2.7em 20px 1.7em;
  //   color: #353535;
  // }
}
.ui-dialog__ft {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: flex;
  &:after {
    content: ' ';
    @include setTopLine();
  }
}

.ui-dialog__btn {
  position: relative;
  display: block;
  flex: 1;
  height: 0.96rem;
  color: #1c69d3;
  font-size: 0.32rem;
  line-height: 0.4rem;
  text-decoration: none;
  border: none;
  outline: none;
  background-color: #fff;
  @include setTapColor();
  &:active::before {
    content: ' ';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.5);
    transform-origin: 0 0;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:after {
    content: ' ';
    @include setLeftLine();
  }
  &:first-child {
    &:after {
      display: none;
    }
  }
}
.ui-dialog__btn_default {
  color: #333333;
}
.ui-dialog__btn_primary {
  color: #003796;
}
.ui-dialog__btn_warn {
  color: #f8e71c;
}

.ui-skin_android {
  .ui-dialog {
    text-align: left;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
  }
  .ui-dialog__title {
    font-size: 21px;
  }
  .ui-dialog__hd {
    text-align: left;
  }
  .ui-dialog__bd {
    color: #999999;
    padding: 0.25em 1.6em 2em;
    font-size: 17px;
    text-align: left;
    &:first-child {
      padding: 1.6em 1.6em 2em;
      color: #353535;
    }
  }
  .ui-dialog__ft {
    display: block;
    text-align: right;
    line-height: 42px;
    font-size: 16px;
    padding: 0 1.6em 0.7em;
    &:after {
      display: none;
    }
  }
  .ui-dialog__btn {
    display: inline-block;
    vertical-align: top;
    padding: 0 0.8em;
    &:after {
      display: none;
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:visited {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:last-child {
      margin-right: -0.8em;
    }
  }
  .ui-dialog__btn_default {
    color: #808080;
  }
}

.ui-dialog-enter-active {
  animation: ui-dialog-in 0.5s;
}
.ui-dialog-leave-active {
  animation: ui-dialog-out 0.3s;
}
@keyframes ui-dialog-in {
  0% {
    transform: scale(1.185);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes ui-dialog-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.85);
    opacity: 0;
  }
}
.ui-mask-enter,
.ui-mask-leave-active {
  opacity: 0;
}
.ui-mask-leave-active,
.ui-mask-enter-active {
  transition: opacity 300ms;
}

.ui-modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
.ui-modal-open-for-container {
  overflow: hidden !important;
}

.ui-x-dialog-absolute .ui-dialog {
  position: absolute;
}
</style>
