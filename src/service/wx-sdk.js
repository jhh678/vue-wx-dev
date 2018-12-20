/*
 * @File: 微信JSSDK配置与API封装
 * @Author: jhh678 
 * @Date: 2018-11-27 15:12:10 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-07 11:04:34
 */
import api from '@/service/rest-api'

export default {
  /**
   * 微信JSSDK配置初始化
   * @param {Object} shareParams - 值，必传
   * @desc shareParams 属性说明
   **{
   *    showMenuItems, // 是否显示分享等菜单，默认关闭， {Boolean}
   *    title,   // 分享标题，选填，{String}
   *    link,    // 分享链接，选填，{String}
   *    desc,    // 分享描述，选填，{String}
   *    imgUrl,  // 分享图标，选填，{String}
   *    success, // 分享成功回掉函数，选填， {Function}
   *    fail,    // 分享失败回掉函数，选填， {Function}
   *    cancel   // 用户取消分享操作，选填， {Function}
   * }
   */
  init(shareParams) {
    this.config()

    // 分享参数初始化
    this.shareConfig(shareParams)
  },
  /**
   * jssdk 调用微信支付
   * @param {String} timestamp - 支付签名时间戳'
   * @param {String} nonceStr  - 支付签名随机串'
   * @param {String} package   - 统一支付接口返回的prepay_id参数值'
   * @param {String} signType  - 签名方式'
   * @param {String} paySign   - 支付签名'
   * @param {Function} success - 支付成功后的回调
   * @param {Function} fail    - 支付失败后的回调
   * @param {Function} cancel  - 支付取消后的回调
   * }
   */
  wxPay(payParams) {
    this.chooseWXPay(payParams)
  },
  async config() {
    let configParams = await api('getJSSDKConfig')
      .post({
        url: location.href
      })
      .then(res => {
        return res.data.data
      })

    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: configParams.appId, // 必填，公众号的唯一标识
      timestamp: configParams.timestamp, // 必填，生成签名的时间戳
      nonceStr: configParams.noncestr, // 必填，生成签名的随机串
      signature: configParams.signature, // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        'hideMenuItems', // 批量隐藏功能按钮接口
        'showMenuItems', // 批量显示功能按钮接口
        'hideAllNonBaseMenuItem', // 隐藏所有非基础按钮接口
        'showAllNonBaseMenuItem', // 显示所有功能按钮接口
        'chooseImage', // 拍照或从手机相册中选图接口
        'previewImage', // 预览图片接口
        'uploadImage', // 上传图片接口
        'downloadImage', // 下载图片接口
        'getNetworkType', // 获取网络状态接口
        'openLocation', // 使用微信内置地图查看位置接口
        'getLocation', // 获取地理位置接口
        'hideOptionMenu', // 隐藏操作菜单
        'showOptionMenu', // 显示操作菜单
        'closeWindow', // 关闭当前网页窗口接口
        'scanQRCode', // 调起微信扫一扫接口
        'chooseWXPay' // 调起微信支付
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  },
  shareConfig(shareParams) {
    if (shareParams && shareParams.showMenuItems) {
      window.wx.showOptionMenu()
      // 默认隐藏多余的按钮
      window.wx.hideMenuItems({
        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        menuList: [
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:facebook',
          'menuItem:share:QZone',
          'menuItem:share:email',
          'menuItem:favorite',
          'menuItem:copyUrl'
        ]
      })

      // 分享给朋友
      window.wx.onMenuShareAppMessage({
        title: shareParams.title,
        desc: shareParams.desc,
        link: shareParams.link,
        imgUrl: shareParams.imgUrl,
        success: res => {
          if (typeof shareParams.success === 'function') {
            shareParams.success(res)
          }
        },
        fail: res => {
          if (typeof shareParams.fail === 'function') {
            shareParams.fail(res)
          }
        },
        cancel: res => {
          if (typeof shareParams.cancel === 'function') {
            shareParams.cancel(res)
          }
        }
      })

      // 分享到朋友圈
      window.wx.onMenuShareTimeline({
        title: shareParams.title,
        link: shareParams.link,
        imgUrl: shareParams.imgUrl,
        success: res => {
          if (typeof shareParams.success === 'function') {
            shareParams.success(res)
          }
        },
        fail: res => {
          if (typeof shareParams.fail === 'function') {
            shareParams.fail(res)
          }
        },
        cancel: res => {
          if (typeof shareParams.cancel === 'function') {
            shareParams.cancel(res)
          }
        }
      })
    } else {
      window.wx.hideOptionMenu()
    }
  },
  /**
   * 微信扫一扫功能
   * @param {Number} needResult - 默认0扫描结果由微信处理，1则直接返回扫描结果
   * @param {Function} callback - needResult为1时的回掉函数
   * }
   */
  scanQRCode(needResult = 0, callback) {
    window.wx.scanQRCode({
      needResult: needResult,
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: res => {
        let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        if (typeof callback === 'function') {
          callback(result)
        }
      }
    })
  },
  /**
   * 微信预览图片功能
   * @param {String} current - 当前显示图片的http链接
   * @param {String} urls - 需要预览的图片http链接列表
   * }
   */
  previewImage(current, urls) {
    window.wx.previewImage({
      current: current,
      urls: urls
    })
  },
  /**
   * 微信获取地理位置功能
   * @param {String} type - 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
   * @param {Function} callback - 获取经纬度后的回掉函数
   * }
   */
  getLocation(type = 'wgs84', callback) {
    window.wx.getLocation({
      type: type,
      success: res => {
        if (typeof callback === 'function') {
          callback(res)
        }
      }
    })
  },
  chooseWXPay(payParams) {
    window.wx.chooseWXPay({
      timestamp: payParams.timestamp,
      nonceStr: payParams.nonceStr,
      package: payParams.package,
      signType: payParams.signType,
      paySign: payParams.paySign,
      success: res => {
        if (typeof payParams.success === 'function') {
          payParams.success(res)
        }
      },
      fail: res => {
        if (typeof payParams.fail === 'function') {
          payParams.fail(res)
        }
      },
      cancel: res => {
        if (typeof payParams.cancel === 'function') {
          payParams.cancel(res)
        }
      }
    })
  }
}
