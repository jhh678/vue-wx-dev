import config from '@/config'
const NODE_ENV = (process.env.NODE_ENV || 'development').trim()
const BASE_URL = NODE_ENV === 'development' ? config.envConfig.apiOrigin : ''

const createFullApis = (baseUrl, apis) => {
  Object.keys(apis).map(key => {
    apis[key] = baseUrl + apis[key]
  })
}

const apis = {
  // 权限管理
  getJSSDKConfig: '/api/wx/getJSDK', // 获取JSSDK配置信息
  getUserInfo: '/api/front/user/info', // 获取用户信息
  getFocusWechat: '/api/wx/focus', // 是否跳转关注公众号
  getSignInInfo: '/api/front/actv/sign/conf', // 获取活动页面信息
  getVcode: '/api/front/actv/sign/sendCode', // 获取手机验证码
  submitUserInfo: '/api/front/user/edit', // 提交填写用户信息
  signIn: '/api/front/actv/sign', // 签到
  getCrowdFundInfo: '/api/front/actv/crowdfund/info', // 获取众筹信息
  submitCrowdFund: '/api/front/actv/crowdfund/apply', // 提交众筹数据
  getMyCFRecords: '/api/front/actv/crowdfund/getMyData' // 获取我的众筹记录
}

createFullApis(BASE_URL, apis)

export default apis
