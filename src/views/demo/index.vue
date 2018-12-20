/*
 * @File: demo首页
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-11 17:36:54
 */
<template>
  <div>
    <d-header title="demo首页"></d-header>
    <d-content ref="content">
      <h3 class="title">欢迎来到demo页面</h3>
      <v-qrcode v-model="QRCodeValue" :size="360" class="qrcode"></v-qrcode>
      <v-grid :cols="3">
        <v-grid-item icon="icon-gengduo" icon-color="#00CBFF" label="对话框组件" link="/demo/dialog"></v-grid-item>
        <v-grid-item icon="icon-gengduo" icon-color="#FFCD00" label="警告框组件" link="/demo/alert"></v-grid-item>
        <v-grid-item icon="icon-gengduo" icon-color="#FF6100" label="确认框组件" link="/demo/confirm"></v-grid-item>
        <v-grid-item icon="icon-gengduo" icon-color="#FFAE00" label="表单演示" link="/demo/form"></v-grid-item>
        <v-grid-item icon="icon-gengduo" icon-color="#00CBFF" label="布局演示" link="/demo/layout"></v-grid-item>
      </v-grid>
    </d-content>
    <d-footer></d-footer>
    <v-screen-capture ref="sc" :html="screenCapture"></v-screen-capture>
  </div>
</template>

<script>
// import api from '@/service/rest_api'
import { localStore, setPageTitle } from '@/utils'
import wxSDK from '@/service/wx-sdk'
import Vue from 'vue'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'IndexDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {
      QRCodeValue: location.href,
      liveList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      allLoaded: false,
      userInfo: {},
      screenCapture: null
    }
  },
  created() {
    /* 页面初始化说明 start
     * 下面两个方法需要在页面打开是调用一次，只要url变化了，就需要调用
     * */
    setPageTitle('这是一个demo页面') // 设置标题
    // wxSDK.init({
    //   showMenuItems: true,
    //   title: 'demo页面',
    //   desc: '描述',
    //   link: location.href,
    //   imgUrl: 'http://xxx.png',
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

    this.userInfo = localStore.get('userInfo')
    //    this.getLiveList()
    //    Loading({
    //      message: '拼命加载中...'
    //    })

    // loadingInstance.close()

    //    Toast('Toast Test')
  },
  mounted() {
    this.screenCapture = this.$refs.content.$el
    Vue.nextTick(() => {
      this.$refs.sc.capture(() => {
        // this.$refs.sc.saveImage()
      })
    })
  },
  methods: {
    async getLiveList() {
      //      let resBody = await api.getLiveList.post({token: 'sss'}).then(res => res.body)
      //      if(resBody.code === '0000') {
      //        this.liveList = resBody.data
      //      }
    },
    loadTop() {
      location.reload()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom() {
      let length = this.liveList.length
      if (length < 50) {
        let _this = this
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            _this.liveList.push(length + i + 1)
          }
          _this.$refs.loadmore.onBottomLoaded()
        }, 2000)
      } else {
        this.allLoaded = true // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 0.24rem auto;
}

.qrcode {
  text-align: center;
}
</style>
