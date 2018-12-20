<template>
  <transition name="toast-pop">
    <div v-show="visible" class="toast" :class="customClass" :style="{ 'padding': iconCustomClass === '' ? '0.24rem' : '0.48rem' }">
      <i v-if="iconCustomClass !== ''" class="iconfont toast-icon" :class="iconCustomClass"></i>
      <span class="toast-text" :style="{ 'padding-top': iconCustomClass === '' ? '0' : '0.24rem' }">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  max-width: 80%;
  min-width: 60%;
  border-radius: 0.2rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 9999;
  transition: opacity 0.3s linear;
  .toast-icon {
    display: block;
    text-align: center;
    font-size: 0.96rem;
    line-height: 1;
  }
  .toast-text {
    line-height: 0.4rem;
    font-size: 0.32rem;
    display: block;
    text-align: center;
  }
  &.placetop {
    top: 1.08rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &.placemiddle {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.placebottom {
    bottom: 1.08rem;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &.half-radius {
    min-width: auto;
    padding: 0.24rem 0.48rem !important;
    border-radius: 0.44rem;
    background: rgba(0, 0, 0, 0.4);
  }
}

.toast-pop-enter,
.toast-pop-leave-active {
  opacity: 0;
}
</style>

<script>
export default {
  props: {
    // 提示类型，success|warning|error
    type: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    customClass() {
      let classes = []
      switch (this.position) {
        case 'top':
          classes.push('placetop')
          break
        case 'bottom':
          classes.push('placebottom')
          break
        default:
          classes.push('placemiddle')
      }
      classes.push(this.className)
      return classes.join(' ')
    },
    iconCustomClass() {
      let iconClass = this.iconClass
      if (!iconClass) {
        switch (this.type) {
          case 'success':
            iconClass = 'icon-tishi_chenggong'
            break
          case 'warning':
            iconClass = 'icon-tishi_tixing'
            break
          case 'error':
            iconClass = 'icon-tishi_shibai'
            break
          default:
            iconClass = ''
            break
        }
      }
      return iconClass
    }
  }
}
</script>
