/*
 * @File: 签到页面
 * @Author: jhh678 
 * @Date: 2018-12-01 13:46:37 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-12 14:27:07
 */
<template>
  <div class="page-content">
    <h3 class="activity-name">{{activityInfo.actv_title}}</h3>
    <div v-tap="signInClick" class="btn-sign-in">
      <div v-if="signedSuccess" class="sign-success-wrap">
        <i class="iconfont icon-list_sel"></i>
        <div class="sign-success-text">签到成功</div>
      </div>
      <div v-else class="sign-before-text">点击签到</div>
    </div>
    <div class="welcome-text">{{activityInfo.sign_slogan || '恭喜你，签到成功 请体验我们的后续活动'}}</div>

    <v-collect-info-dialog ref="collectInfoDialog" v-model="showSignDialog" :form-items="signFormItems" @confirm="doSubmitInfo" @cancel="doCloseDialog"></v-collect-info-dialog>
  </div>
</template>

<script>
import api from '@/service/rest-api'
import { setPageTitle, localStore } from '@/utils'
import { authDelay } from '@/utils/mixins/focus-auth'
// import wxSDK from '@/service/wx-sdk'
import VCollectInfoDialog from '@/components/collect-info-dialog'

export default {
  name: 'SignIn',
  components: {
    VCollectInfoDialog
  },
  mixins: [authDelay],
  data() {
    return {
      activityId: '',
      activityInfo: {
        actv_title: '',
        sign_slogan: ''
      },
      signFormItems: [
        {
          key: 'name',
          name: '姓名',
          show: true,
          require: true,
          regexp: /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}/
        },
        {
          key: 'mobile',
          name: '手机号码',
          show: true,
          require: true,
          regexp: /[0-9]{11}/
        },
        {
          key: 'code',
          name: '验证码',
          show: true,
          require: true
        },
        {
          key: 'plant',
          name: '种植作物',
          show: false,
          require: false
        }
      ],
      signedSuccess: false,
      showSignDialog: false
    }
  },
  created() {
    /* 页面初始化说明 start */
    setPageTitle('签到') // 设置页面标题
    // wxSDK.init({
    //   showMenuItems: true,
    //   title: '签到',
    //   desc: '参会人员签到',
    //   link: location.href,
    //   imgUrl: '',
    //   success: res => {
    //     console.log('分享成功')
    //   },
    //   fail: res => {
    //     console.log('分享失败')
    //   },
    //   cancel: res => {
    //     console.log('用户取消')
    //   }
    // }) // 初始化jssdk配置，包括是否显示菜单项和分享参数，不传任何值默认隐藏操作菜单
    /* 页面初始化说明 end */
    this.activityId = this.$route.query.activity_id
    this.init()
  },
  methods: {
    init() {
      if (this.isNeedAuth()) {
        this.goAuth()
      } else {
        this.getSignInInfo()
      }
    },
    getSignInInfo() {
      this.$api('getSignInInfo')
        .post({ activity_id: this.activityId })
        .then(res => {
          if (res.data.code === '200') {
            this.activityInfo = res.data.data
            if (this.activityInfo.sign_status) {
              this.signedSuccess = true
            }
            this.signFormItems.map(item => {
              switch (item.key) {
                case 'name':
                  item.show = !!this.activityInfo.has_name
                  break
                case 'mobile':
                  item.show = !!this.activityInfo.has_mobile
                  break
                case 'code':
                  item.show = !!this.activityInfo.check_phone
                  break
                case 'plant':
                  item.show = !!this.activityInfo.has_plant
                  break
                default:
                  break
              }
            })
          }
        })
    },
    doSignIn() {
      this.$api('signIn')
        .post({ activity_id: this.activityId })
        .then(res => {
          if (res.data.code === '200') {
            this.signedSuccess = true
          }
        })
    },
    signInClick() {
      if (this.activityInfo.activity_status === 'starting') {
        if (this.activityInfo.actv_title && !this.signedSuccess) {
          let userInfo = localStore.get('userInfo') || {}
          if (this.activityInfo.has_mobile && !userInfo.mobile) {
            this.showSignDialog = true
          } else {
            this.doSignIn()
          }
        }
      } else {
        let msg
        if (this.activityInfo.activity_status === 'no-start') {
          msg = '该活动还未开始，请稍候~'
        }
        if (this.activityInfo.activity_status === 'completed') {
          msg = '活动已结束，请关注我们的后续活动~'
        }
        this.$toast(msg)
      }
    },
    doSubmitInfo() {
      let formData = this.$refs.collectInfoDialog.getFormData()
      let params = Object.assign({}, { activity_id: this.activityId }, formData)
      this.$api('submitUserInfo')
        .post(params)
        .then(res => {
          if (res.data.code === '200') {
            this.showSignDialog = false
            this.doSignIn()
          }
        })
    },
    doCloseDialog() {
      this.showSignDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: url('../../../assets/images/qiandaobeijing.png') no-repeat,
    linear-gradient(0, rgba(255, 174, 0, 1), rgba(255, 118, 0, 1));
  background-size: 100% auto;

  .activity-name {
    width: 6rem;
    margin: 2.4rem auto 0.9rem;
    line-height: 0.64rem;
    font-size: 0.48rem;
    font-weight: 500;
    color: #fff;
    text-align: center;
  }

  .btn-sign-in {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.6rem;
    height: 3.6rem;
    margin: auto;
    border-radius: 50%;
    background: url('../../../assets/images/qiandaoanniu.png') no-repeat;
    background-size: cover;
    color: #ff6000;
    user-select: none;

    &:active {
      background-image: url('../../../assets/images/qiandaoanniu_dianji.png');
    }

    .sign-success-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .iconfont {
        display: block;
        margin-top: -0.24rem;
        font-size: 1.44rem;
        line-height: 1;
      }

      .sign-success-text {
        margin-top: 0.08rem;
        font-size: 0.48rem;
        line-height: 0.56rem;
      }
    }

    .sign-before-text {
      width: 2em;
      font-size: 0.72rem;
      line-height: 0.8rem;
    }
  }

  .welcome-text {
    width: 60%;
    margin: 1.2rem auto 0;
    line-height: 0.4rem;
    font-size: 0.32rem;
    color: #ffff;
    text-align: center;
  }
}
</style>
