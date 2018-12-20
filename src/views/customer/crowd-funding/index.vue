/*
 * @File: 参会人员众筹活动
 * @Author: jhh678 
 * @Date: 2018-12-03 13:46:37 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-13 14:31:53
 */
<template>
  <div class="page">
    <template v-if="!cfSuccess">
      <v-scroller ref="scroller" container-class="content" :bouncing="false">
        <div class="cf-info-wrap">
          <div class="cf-info-basic">
            <h3 class="ui-nowrap">{{cfInfo.title}}</h3>
            <div class="tips">
              <span>总众筹</span>
              <span class="unit">（{{cfInfo.unit}}）</span>
            </div>
            <ul class="num-list">
              <li v-for="(item, index) of totalNumArr" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="cf-info-detail">
            <v-divider>众筹政策</v-divider>
            <div class="detail-content" v-html="cfInfo.detail"></div>
          </div>
        </div>

        <v-group>
          <v-popup-radio v-model="formData.spec" title="规格" :options="options" :option-props-text="optionPropsText" header-title="选择规格" :required="true">
            <i slot="header-right-text" class="iconfont icon-close"></i>
          </v-popup-radio>
          <v-input v-model="formData.num" type="number" title="数量" placeholder="请输入数量" :required="true">
            <slot slot="right"><span style="color: #333;">件</span></slot>
          </v-input>
        </v-group>
      </v-scroller>

      <v-button text="提交" size="lg" :click="submitClick" class="btn-submit"></v-button>

      <v-collect-info-dialog ref="collectInfoDialog" v-model="showCFDialog" :form-items="signFormItems" @confirm="doSubmitInfo" @cancel="doCloseDialog"></v-collect-info-dialog>
    </template>
    <template v-else>
      <div class="success-wrap">
        <i class="iconfont icon-tishi_chenggong"></i>
        <span class="success-tips">提交成功</span>
        <v-button text="查看我的众筹记录" size="sm" :half-radius="true" :click="viewRecordsClick" class="btn-view-records"></v-button>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/service/rest-api'
import { setPageTitle, localStore } from '@/utils'
import { authDelay } from '@/utils/mixins/focus-auth'
// import wxSDK from '@/service/wx-sdk'
import VCollectInfoDialog from '@/components/collect-info-dialog'

export default {
  name: 'CrowdFundingIndex',
  components: {
    VCollectInfoDialog
  },
  mixins: [authDelay],
  data() {
    return {
      crowdfundID: '',
      cfInfo: {
        title: '',
        total: 0,
        unit: '',
        detail: '',
        has_mobile: true
      },
      totalNumArr: ['0', '0', '0', '0', '0'],
      options: [],
      optionPropsText: {
        key: 'id',
        value: 'name'
      },
      formData: {
        spec: '',
        num: ''
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
        }
      ],
      cfSuccess: false,
      showCFDialog: false
    }
  },
  created() {
    /* 页面初始化说明 start */
    setPageTitle('众筹活动') // 设置页面标题
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

    this.crowdfundID = this.$route.query.crowdfund_id
    this.init()
  },
  methods: {
    init() {
      // if (this.isNeedAuth()) {
      //   this.goAuth()
      // } else {
      this.getCrowdFundInfo()
      // }
    },
    getCrowdFundInfo() {
      let userInfo = localStore.get('userInfo') || {}
      this.$api('getCrowdFundInfo')
        .post({ crowdfund_id: this.crowdfundID })
        .then(res => {
          if (res.data.code === '200') {
            let data = res.data.data
            this.cfInfo.title = data.crowdfund_title
            this.cfInfo.total = data.totality
            this.cfInfo.unit = data.data_unit
            this.cfInfo.detail = data.theme_policy_content

            this.options = data.croedfund_spec_data

            if (data.phone_status && !userInfo.mobile) {
              this.showCFDialog = true
            }

            this.transformNumberToArray(this.cfInfo.total)
            this.signFormItems.map(item => {
              switch (item.key) {
                case 'name':
                  item.show = !!data.name_status
                  break
                case 'mobile':
                  item.show = !!data.phone_status
                  break
                case 'code':
                  item.show = !!data.check_phone
                  break
                default:
                  break
              }
            })
          }
        })
    },
    doSubmitInfo() {
      let formData = this.$refs.collectInfoDialog.getFormData()
      let params = Object.assign({}, { activity_id: this.crowdfundID }, formData)
      this.$api('submitUserInfo')
        .post(params)
        .then(res => {
          if (res.data.code === '200') {
            this.showCFDialog = false
          }
        })
    },
    doCloseDialog() {
      this.showCFDialog = false
    },
    submitClick() {
      let params = {
        crowdfund_id: this.crowdfundID,
        spec_id: this.formData.spec,
        data_value: this.formData.num
      }
      this.$api('submitCrowdFund')
        .post(params)
        .then(res => {
          if (res.data.code === '200') {
            this.cfSuccess = true
          }
        })
    },
    transformNumberToArray(num) {
      let str = num.toString()
      this.totalNumArr = str.padStart(5, '0').split('')
    },
    viewRecordsClick() {
      this.$router.push(`/customer/crowd-funding/records?crowdfund_id=${this.crowdfundID}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.98rem;
    z-index: 2;

    .cf-info-wrap {
      background: #fff;
      .cf-info-basic {
        margin-bottom: 0.32rem;
        background: url('../../../assets/images/zhongchou.png') no-repeat;
        background-size: contain;

        h3 {
          padding: 0.5rem 0.5rem 0.4rem;
          color: #fff;
          font-size: 0.48rem;
          line-height: 0.56rem;
          text-align: center;
        }

        .tips {
          text-align: center;
          color: #fff;
          font-size: 0.36rem;
          line-height: 0.4rem;

          .unit {
            font-size: 0.24rem;
            line-height: 0.4rem;
          }
        }

        ul.num-list {
          display: flex;
          list-style: none;
          justify-content: center;
          margin: 0;
          padding: 0.24rem 0 0.5rem;

          li {
            width: 0.9rem;
            height: 1rem;
            line-height: 1rem;
            margin: auto 0.12rem;
            text-align: center;
            background: #ffee8f;
            font-size: 0.9rem;
            color: #ff6000;
            border-radius: 0.12rem;
          }
        }
      }

      .cf-info-detail {
        color: #333;
        font-size: 0.3rem;
        line-height: 0.48rem;
        .detail-content {
          padding: 0.28rem 0.24rem 0.32rem;
        }
      }
    }
  }

  .btn-submit {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
  }

  .success-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding-top: 1.6rem;
    background: #fff;
    text-align: center;

    .iconfont {
      display: block;
      font-size: 1.2rem;
      color: #ff9000;
    }

    .success-tips {
      display: block;
      text-align: center;
    }

    .btn-view-records {
      width: 6.24rem;
      margin-top: 0.72rem;
    }
  }
}
</style>
