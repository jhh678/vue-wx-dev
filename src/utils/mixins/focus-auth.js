// 微信授权处理
import wxAuth from '@/service/wx-auth'
import api from '@/service/rest-api'

const authImmediately = {
  created() {
    if (wxAuth.isNeedAuth) {
      wxAuth.goAuth('snsapi_userinfo')
    }
  }
}

const authDelay = {
  methods: {
    async goFocus() {
      let data = await api('getFocusWechat')
        .post({
          openid: this.$route.query.openid,
          client_id: this.$route.query.client_id
        })
        .then(res => {
          return res.data.data
        })

      if (data.needFocus) {
        location.href = data.url
      }
    },
    isNeedAuth() {
      return wxAuth.isNeedAuth()
    },
    goAuth() {
      wxAuth.goAuth('snsapi_userinfo')
    }
  }
}

export { authImmediately, authDelay }
