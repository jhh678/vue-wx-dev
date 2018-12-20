/*
 * @File: 加载组件
 * @Author: jhh678 
 * @Date: 2018-11-27 15:20:49 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-10 11:30:23
 */
<template>
  <transition name="toast-pop">
    <div v-show="visible" class="toast">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
      <span v-show="message" class="toast-text">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  padding: 30px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 9999;
  transition: opacity 0.3s linear;
  .toast-icon {
    display: block;
    text-align: center;
    font-size: 56px;
  }
  .spinner {
    margin: auto;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 10px;
    div {
      background-color: #1c69d3;
      height: 100%;
      width: 5px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
      animation: stretchdelay 1.2s infinite ease-in-out;
    }
    .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
  }
  .toast-text {
    font-size: 14px;
    display: block;
    text-align: center;
    margin-top: 20px;
  }
}

.toast-pop-enter,
.toast-pop-leave-active {
  opacity: 0;
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>

<script>
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>
