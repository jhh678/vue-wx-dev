import Vue from 'vue'
import LoadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(LoadingVue)
let toastPool = []

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new LoadingConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

LoadingConstructor.prototype.close = function() {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Loading = (options = {}) => {
  let duration = options.duration || 8000

  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message

  document.body.appendChild(instance.$el)
  Vue.nextTick(function() {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    ~duration &&
      (instance.timer = setTimeout(function() {
        if (instance.closed) return
        instance.close()
      }, duration))
  })
  return instance
}

export default Loading
