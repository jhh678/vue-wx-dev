/*
 * @File: 公共工具方法
 * @Author: jhh678 
 * @Date: 2018-11-23 13:58:33 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-10 14:16:14
 */
import qs from 'qs'

/**
 * 封装操作localStorage的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const localStore = {
  /**
   * 设置localStorage的方法
   * @param {String} key - 键，必传
   * @param {Object | String | Number | Boolean} value - 值，必传
   * @param {Number} time - 过期时间（单位秒），选传，默认值0（不过期）
   */
  set(key, value, time = 0) {
    let expiringDate = time === 0 ? 0 : new Date().getTime() + time * 1000
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    value = JSON.stringify({
      data: value,
      time: expiringDate
    })
    window.localStorage.setItem(key, value)
  },
  /**
   * 获取localStorage的方法
   * @param {String} key - 键，必传
   * @return {Object | String}
   */
  get(key) {
    let ls = window.localStorage.getItem(key)
    if (!ls) {
      return
    } else {
      let store = JSON.parse(ls)
      let value = store.data
      let time = +store.time
      if (time !== 0 && new Date().getTime() - time > 0) {
        window.localStorage.removeItem(key)
        return undefined
      } else {
        if (value.indexOf('obj-') === 0) {
          value = value.slice(4)
          return JSON.parse(value)
        } else if (value.indexOf('str-') === 0) {
          return value.slice(4)
        }
      }
    }
  },
  /**
   * 删除localStorage的方法
   * @param {String} key - 键，必传
   */
  remove(key) {
    if (!key) {
      return
    }
    window.localStorage.removeItem(key)
  },
  /**
   * 清空localStorage的方法
   */
  clear() {
    window.localStorage.clear()
  }
}

/**
 * 封装操作sessionStorage的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const sessionStore = {
  /**
   * 设置sessionStorage的方法
   * @param {String} key - 键，必传
   * @param {Object | String | Number | Boolean} value - 值，必传
   */
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    window.sessionStorage.setItem(key, value)
  },
  /**
   * 获取sessionStorage的方法
   * @param {String} key - 键，必传
   * @return {Object | String}
   */
  get(key) {
    var value = window.sessionStorage.getItem(key)
    if (!value) {
      return
    }
    if (value.indexOf('obj-') === 0) {
      value = value.slice(4)
      return JSON.parse(value)
    } else if (value.indexOf('str-') === 0) {
      return value.slice(4)
    }
  },

  /**
   * 删除sessionStorage的方法
   * @param {String} key - 键，必传
   */
  remove(key) {
    if (!key) {
      return
    }
    window.sessionStorage.removeItem(key)
  },

  /**
   * 清空sessionStorage的方法
   */
  clear() {
    window.sessionStorage.clear()
  }
}

/**
 * 封装操作cookie的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const cookieStore = {
  /**
   * 设置cookie的方法
   */
  set(name, value, iDay) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    let oDate = new Date()
    let hostname = location.hostname
    let domain
    iDay = iDay || 30
    oDate.setDate(oDate.getDate() + iDay) // 设置Date对象内部时间，iDay表示几天后。
    domain = hostname.substring(hostname.indexOf('.'), hostname.length)
    document.cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      ';expires=' +
      oDate.toUTCString() +
      ';path=/;domain=' +
      domain
  },

  /**
   * 获取cookie的方法
   */
  get(name) {
    var arr = document.cookie.split('; ') // cookie是以键值对形式存在，用“分号空格” 隔开的，比如 a=1; b=2 ; c=3;
    for (var i = 0, len = arr.length; i < len; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === name) {
        let value = decodeURIComponent(arr2[1])
        if (value.indexOf('obj-') === 0) {
          value = value.slice(4)
          return JSON.parse(value)
        } else if (value.indexOf('str-') === 0) {
          return value.slice(4)
        }
      }
    }
    return '' // 遍历完都没找到cookie,返回空字符串
  },

  /**
   * 删除某个cookie的方法
   */
  remove(name) {
    this.set(name, '', -1) // 设置一个过去的时间即可
  },

  /**
   * 清空cookie的方法
   */
  clear() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--; ) {
        // document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        cookieStore.remove(keys[i])
      }
    }
  }
}

/**
 * 浮点数运算
 */
export const floatOpration = {
  /**
   * 加法运输，避免数据相加小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  add(num1, num2) {
    let baseNum, baseNum1, baseNum2
    let precision // 精度
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2
    return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision)
  },
  /**
   * 减法运算，避免数据相减小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  sub(num1, num2) {
    let baseNum, baseNum1, baseNum2
    let precision // 精度
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
  },
  /**
   * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  multi(num1, num2) {
    let baseNum = 0
    try {
      baseNum += num1.toString().split('.')[1].length
    } catch (e) {
      console.error(e)
    }
    try {
      baseNum += num2.toString().split('.')[1].length
    } catch (e) {
      console.error(e)
    }
    return (
      (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) /
      Math.pow(10, baseNum)
    )
  },
  /**
   * 除法运算，避免数据相除小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  div(num1, num2) {
    let baseNum1 = 0,
      baseNum2 = 0
    let baseNum3, baseNum4
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }

    baseNum3 = Number(num1.toString().replace('.', ''))
    baseNum4 = Number(num2.toString().replace('.', ''))
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
  }
}

/**
 * URL参数操作对象
 */
export const urlUtils = {
  /**
   * 获取url参数,返回参数值
   * @param {String} name - 参数名
   * @param {String} url - 需要获取的url
   */
  getQueryString(name, url) {
    url = url || window.location.search
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = url.substr(1).match(reg)
    if (r !== null) {
      return unescape(r[2])
    }
    return null
  },
  /**
   * 对象转url参数
   * @param {Object} obj - 需要转的对象
   * @param {String} joinStr - 自定义的参数分隔符，默认'&'
   */
  toQueryString(obj, joinStr = '&') {
    let _toQueryPair = function(key, value) {
      if (typeof value === 'undefined') {
        return key
      }
      return key + '=' + encodeURIComponent(value === null ? '' : String(value))
    }

    let ret = []
    for (let key in obj) {
      key = encodeURIComponent(key)
      let values = obj[key]
      if (values && values.constructor === Array) {
        // 数组
        let queryValues = []
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i]
          queryValues.push(_toQueryPair(key, value))
        }
        ret = ret.concat(queryValues)
      } else {
        // 字符串
        ret.push(_toQueryPair(key, values))
      }
    }
    return ret.join(joinStr)
  },
  /**
   * 添加|更新URL参数
   * @param {String} name - 自定义的参数名
   * @param {String} value - 自定义的参数值
   * @param {String} url - 需要修改的url
   */
  updateURLParams(name, value, url) {
    let r = url || location.href
    if (r) {
      value = encodeURIComponent(value)
      let reg = new RegExp('(^|)' + name + '=([^&]*)(|$)')
      let tmp = name + '=' + value
      if (url.match(reg) !== null) {
        r = url.replace(reg, tmp)
      } else {
        if (url.match('[?]')) {
          r = url + '&' + tmp
        } else {
          r = url + '?' + tmp
        }
      }
    }
    return r
  },
  /**
   * 删除URL参数
   * @param {Array} names - 参数名数组
   * @param {String} url - 需要修改的url
   */
  deleteURLParams(names, url) {
    let r = url || location.href
    let queryArr = location.href.split('?')
    if (queryArr.length === 1) {
      r = queryArr[0]
    } else if (queryArr.length === 2) {
      let queryObj = qs.parse(queryArr[1])
      names.map(item => delete queryObj[item])
      r = queryArr[0] + '?' + qs.stringify(queryObj)
    }
    return r
  },
  /**
   * 给url添加timestamp参数，解决微信浏览器location.reload或location.href失效问题
   * @param {String} url - 需要修改的url
   * @param {String} name - 自定义的参数名, 默认'time'
   */
  addTimestamp(url, name = 'time') {
    this.updateURLParams(url, name, new Date().getTime())
  }
}

/**
 * 处理ios微信浏览器下js动态设置title失效问题
 * @param {String} title - 需要设置的title值
 **/
export const setPageTitle = title => {
  document.title = title
  var iframe = document.createElement('iframe')
  iframe.src = '/favicon.ico'
  iframe.style.display = 'none'
  iframe.onload = function() {
    setTimeout(function() {
      iframe.remove()
    }, 9)
  }
  document.body.appendChild(iframe)
}

/**
 * 浏览器类型判断
 * @return {Object} - 返回浏览器类型对象
 */
export const browser = (() => {
  var u = navigator.userAgent
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === 'qq' // 是否QQ
  }
})()

/**
 * 去除字符串两端空格
 * @param {String} str - 需要处理的字符串
 */
export const strTrim = str => {
  const reg = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g')
  return str.replace(reg, '')
}

/**
 * 去除多余样式
 * @param {Object} styles - 需要处理的样式
 */
export const cleanStyle = (styles = {}) => {
  for (let i in styles) {
    if (typeof styles[i] === 'undefined') {
      delete styles[i]
    }
  }
  return styles
}

/**
 * 路由公共方法
 */
export const router = {
  /**
   * 打开页面跳转
   * @param {String} url - 需要跳转url
   * @param {Object} $router - 路由对象
   */
  go(url, $router) {
    if (/^javas/.test(url) || !url) return
    const useRouter =
      typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
    if (useRouter) {
      if (typeof url === 'object' && url.replace === true) {
        $router.replace(url)
      } else {
        url === 'BACK' ? $router.go(-1) : $router.push(url)
      }
    } else {
      window.location.href = url
    }
  },
  /**
   * 获取转换页面URL
   * @param {String} url - 初始地址
   * @param {Object} $router - 路由对象
   */
  getUrl(url, $router) {
    // Make sure the href is right in hash mode
    if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
      return '#!' + url
    }
    return url && typeof url !== 'object' ? url : 'javascript:void(0);'
  }
}

/**
 * 获取父组件Prop属性
 * @param {String} self - 当前组件对象
 * @param {String} name - 属性名称
 */
export const getParentProp = (self, name) => {
  if (self.$parent && typeof self.$parent[name] !== 'undefined') {
    return self.$parent[name]
  }
  if (self.$parent && self.$parent.$parent && typeof self.$parent.$parent[name] !== 'undefined') {
    return self.$parent.$parent[name]
  }
}
