import config from '@/config'
import { localStore, urlUtils } from '@/utils'
import router from '@/router'
import api from './rest-api'

export default {
  isNeedAuth() {
    let authParams = localStore.get('authParams')
    return !authParams
  },
  goAuth(type = 'snsapi_base') {
    const NODE_ENV = (process.env.NODE_ENV || 'development').trim()
    const BASE_URL = NODE_ENV === 'development' ? config.envConfig.apiOrigin : location.origin
    const clientID = router.app.$route.query.client_id
    if (type === 'snsapi_base') {
      location.href = `${BASE_URL}/api/front/wechatmass/profile?type=snsapi_base&client_id=${clientID}&front_url=${encodeURIComponent(
        location.href
      )}`
    } else {
      localStore.remove('authParams')
      let urlWithoutAuthParams = urlUtils.deleteURLParams(['token'])

      location.href = `${BASE_URL}/api/front/wechatmass/profile?type=snsapi_userinfo&client_id=${clientID}&front_url=${encodeURIComponent(
        urlWithoutAuthParams
      )}`
    }
  },
  saveAuthPatams(token) {
    localStore.set(
      'authParams',
      {
        token: token
      },
      60 * 60 * 24 * 30
    )
    this.getUserInfo()
  },
  getUserInfo() {
    let userInfo = localStore.get('userInfo')
    if (!userInfo) {
      api('getUserInfo')
        .post()
        .then(res => {
          if (res.data.code === '200') {
            localStore.set('userInfo', res.data.data, 60 * 60 * 24 * 30)
            return res.data.data
          }
        })
    } else {
      return userInfo
    }
  }
}
