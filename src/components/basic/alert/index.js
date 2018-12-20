import Vue from 'vue'
import AlertVue from './alert'

const AlertConstructor = Vue.extend(AlertVue)
let alertPool = []

let getAnInstance = () => {
  if (alertPool.length > 0) {
    let instance = alertPool[0]
    alertPool.splice(0, 1)
    return instance
  }
  return new AlertConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    alertPool.push(instance)
  }
}

let removeDom = event => {
  debugger
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

AlertConstructor.prototype.close = function() {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Alert = (options = {}) => {
  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.value = true
  instance.showValue = true
  instance.title = options.title || ''
  instance.content = options.content || ''
  instance.buttonText = options.buttonText || '确定'
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
  })

  return instance
}

Vue.prototype.$alert = Alert

export default Alert
