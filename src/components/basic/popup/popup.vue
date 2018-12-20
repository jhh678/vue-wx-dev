<template>
  <transition :name="`ui-popup-animate-${position}`">
    <div v-show="show && !initialShow" :style="styles" class="ui-popup-dialog" :class="[`ui-popup-${position}`, show ? 'ui-popup-show' : '']">
      <div v-if="shouldRenderBody">
        <slot v-if="showPopupHeader" name="header">
          <div class="ui-popup-header" :class="showBottomBorder ? 'ui-border-b' : ''">
            <div v-if="showHeaderLeft" v-tap="onClickLeft" class="ui-popup-header-left ui-tap-active">
              <slot name="header-left-text">{{ headerLeftText }}</slot>
            </div>
            <div class="ui-popup-header-title">
              <slot name="header-title">{{ headerTitle }}</slot>
            </div>
            <div v-if="showHeaderRight" v-tap="onClickRight" class="ui-popup-header-right ui-tap-active">
              <slot name="header-right-text">{{ headerRightText }}</slot>
            </div>
          </div>
        </slot>
        <div class="ui-popup-body" :style="bodyStyles">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PopupDialog from './popup-dialog'
import dom from '@/utils/tools/dom'
export default {
  name: 'Popup',
  props: {
    value: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    showMask: {
      type: Boolean,
      default: true
    },
    showPopupHeader: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String,
      default: ''
    },
    showHeaderLeft: Boolean,
    headerLeftText: {
      type: String,
      default: '取消'
    },
    showHeaderRight: Boolean,
    headerRightText: {
      type: String,
      default: '确定'
    },
    showBottomBorder: {
      type: Boolean,
      default: true
    },
    isTransparent: Boolean,
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    maxHeight: {
      type: String,
      default: '60vh'
    },
    popupStyle: Object,
    hideOnDeactivated: {
      type: Boolean,
      default: true
    },
    shouldRerenderOnShow: {
      type: Boolean,
      default: false
    },
    shouldScrollTopOnShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      layout: '',
      initialShow: true,
      hasFirstShow: false,
      shouldRenderBody: true,
      show: this.value
    }
  },
  computed: {
    styles() {
      const styles = {}
      if (!this.position || this.position === 'bottom' || this.position === 'top') {
        styles.height = this.height
      } else {
        styles.width = this.width
      }

      this.isTransparent && (styles['background'] = 'transparent')
      if (this.popupStyle) {
        for (let i in this.popupStyle) {
          styles[i] = this.popupStyle[i]
        }
      }
      return styles
    },
    bodyStyles() {
      const styles = {}
      if (this.maxHeight) {
        styles['max-height'] = this.maxHeight
      }
      return styles
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
      if (val) {
        // rerender body
        if (this.shouldRerenderOnShow) {
          this.shouldRenderBody = false
          this.$nextTick(() => {
            this.scrollTop()
            this.shouldRenderBody = true
            this.doShow()
          })
        } else {
          if (this.shouldScrollTopOnShow) {
            this.scrollTop()
          }
          this.doShow()
        }
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
        setTimeout(() => {
          if (!document.querySelector('.ui-popup-dialog.ui-popup-show')) {
            this.fixSafariOverflowScrolling('touch')
          }
          this.removeModalClassName()
        }, 200)
      }
    }
  },
  created() {
    // get global layout config
    if (this.$ui && this.$ui.config && this.$ui.config.$layout === 'VIEW_BOX') {
      this.layout = 'VIEW_BOX'
    }
  },
  mounted() {
    this.$overflowScrollingList = document.querySelectorAll('.ui-fix-safari-overflow-scrolling')
    this.$nextTick(() => {
      const _this = this
      this.popup = new PopupDialog({
        showMask: _this.showMask,
        container: _this.$el,
        hideOnBlur: _this.hideOnBlur,
        onOpen() {
          _this.fixSafariOverflowScrolling('auto')
          _this.show = true
        },
        onClose() {
          _this.show = false
          if (window.__$vuxPopups && Object.keys(window.__$vuxPopups).length > 1) return
          if (document.querySelector('.ui-popup-dialog.ui-popup-mask-disabled')) return
          setTimeout(() => {
            _this.fixSafariOverflowScrolling('touch')
          }, 300)
        }
      })
      if (this.value) {
        this.popup.show()
      }
      this.initialShow = false
    })
  },
  deactivated() {
    if (this.hideOnDeactivated) {
      this.show = false
    }
    this.removeModalClassName()
  },
  beforeDestroy() {
    this.popup && this.popup.destroy()
    this.fixSafariOverflowScrolling('touch')
    this.removeModalClassName()
  },
  methods: {
    /**
     * https://github.com/airyland/ui/issues/311
     * https://benfrain.com/z-index-stacking-contexts-experimental-css-and-ios-safari/
     */
    fixSafariOverflowScrolling(type) {
      if (!this.$overflowScrollingList.length) return
      // if (!/iphone/i.test(navigator.userAgent)) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    },
    removeModalClassName() {
      this.layout === 'VIEW_BOX' && dom.removeClass(document.body, 'ui-modal-open')
    },
    doShow() {
      this.popup && this.popup.show()
      this.$emit('on-show')
      this.fixSafariOverflowScrolling('auto')
      this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'ui-modal-open')
      if (!this.hasFirstShow) {
        this.$emit('on-first-show')
        this.hasFirstShow = true
      }
    },
    onClickLeft() {
      this.$emit('on-click-left')
    },
    onClickRight() {
      this.$emit('on-click-right')
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$el.scrollTop = 0
        const box = this.$el.querySelectorAll('.ui-scrollable')
        if (box.length) {
          for (let i = 0; i < box.length; i++) {
            box[i].scrollTop = 0
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.ui-modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
.ui-modal-open-for-container {
  overflow: hidden !important;
}

.ui-popup-dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 501;
  transition-property: transform;
  transition-duration: 300ms;
  -webkit-overflow-scrolling: touch;
}
.ui-popup-dialog.ui-popup-left {
  width: auto;
  height: 100%;
  top: 0;
  right: auto;
  bottom: auto;
  left: 0;
}
.ui-popup-dialog.ui-popup-right {
  width: auto;
  height: 100%;
  top: 0;
  right: 0;
  bottom: auto;
  left: auto;
}
.ui-popup-dialog.ui-popup-top {
  width: 100%;
  top: 0;
  right: auto;
  bottom: auto;
  left: 0;
}
.ui-popup-mask {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  tap-highlight-color: rgba(0, 0, 0, 0);
  z-index: -1;
  transition: opacity 400ms;
}
.ui-popup-mask.ui-popup-show {
  opacity: 1;
}
.ui-popup-animate-bottom-enter,
.ui-popup-animate-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}
.ui-popup-animate-left-enter,
.ui-popup-animate-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}
.ui-popup-animate-right-enter,
.ui-popup-animate-right-leave-active {
  transform: translate3d(100%, 0, 0);
}
.ui-popup-animate-top-enter,
.ui-popup-animate-top-leave-active {
  transform: translate3d(0, -100%, 0);
}

.ui-popup-header {
  display: flex;
  height: 0.96rem;
  line-height: 0.96rem;
  font-size: 0.32rem;
  background-color: #fff;
}
.ui-popup-header-title {
  flex: 1;
  text-align: center;
  color: #333;
}
.ui-popup-header-left {
  padding: 0 0.32rem;
  color: #999999;
}
.ui-popup-header-right {
  padding: 0 0.32rem;
  color: #999999;
}

.ui-popup-body {
  position: relative;
  max-height: 100%;
  overflow-y: auto;
}
</style>
