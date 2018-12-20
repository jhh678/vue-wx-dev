var passiveSupported = false

try {
  var options = Object.defineProperty({}, 'passive', {
    get() {
      passiveSupported = true
      return passiveSupported
    }
  })
  window.addEventListener('test', null, options)
} catch (err) {
  console.error('不支持passive修饰符')
}

export default passiveSupported
