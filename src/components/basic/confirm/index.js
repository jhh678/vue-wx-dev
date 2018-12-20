import Vue from 'vue'
import ConfirmVue from './confirm'

const ConfirmConstructor = Vue.extend(ConfirmVue)
let confirmPool = []

let getAnInstance = () => {
  if (confirmPool.length > 0) {
    let instance = confirmPool[0]
    confirmPool.splice(0, 1)
    return instance
  }
  return new ConfirmConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    confirmPool.push(instance)
  }
}

let removeDom = event => {
  debugger
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

ConfirmConstructor.prototype.close = function() {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Confirm = (options = {}) => {
  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.value = true
  instance.showValue = true
  instance.title = options.title || ''
  instance.content = options.content || ''
  instance.showInput = options.showInput || false
  instance.placeholder = options.placeholder || ''
  instance.showConfirmButton = options.showConfirmButton || true
  instance.showCancelButton = options.showCancelButton || true
  instance.buttonText = options.buttonText || '确定'
  instance.cancelText = options.cancelText || '取消'
  instance.onConfirm = options.onConfirm
  instance.onCancel = options.onCancel
  instance.maskZIndex = options.maskZIndex

  document.body.appendChild(instance.$el)

  Vue.nextTick(function() {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)

    instance.$on('input', val => {
      if (val === false) {
        if (instance.closed) return
        instance.close()
      }
    })

    instance.$on('on-confirm', msg => {
      instance.onConfirm && instance.onConfirm(msg)
    })

    instance.$on('on-cancel', () => {
      instance.onCancel && instance.onCancel()
    })
  })

  return instance
}

Vue.prototype.$confirm = Confirm

export default Confirm
