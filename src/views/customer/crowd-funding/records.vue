/*
 * @File: 参会人员众筹活动
 * @Author: jhh678 
 * @Date: 2018-12-03 13:46:37 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-10 11:27:11
 */
<template>
  <v-scroller ref="scroller" container-class="page" :on-refresh="refresh" :on-infinite="infinite">
    <div class="records-wrap">
      <v-panel v-for="(item, index) in records" :key="index">
        <div slot="body" class="record-item">
          <div class="header">订单号 {{item.order_id}}</div>
          <div class="body">
            <div class="goods-name ui-nowrap-two">{{item.product_name}}</div>
            <div class="goods-num">×{{item.data_value}}</div>
          </div>
          <div class="footer">{{item.created_time | formatTime }}</div>
        </div>
      </v-panel>
    </div>
  </v-scroller>
</template>

<script>
import api from '@/service/rest-api'
import { setPageTitle } from '@/utils'
import formatTime from '@/utils/filters/format-time'
// import wxSDK from '@/service/wx-sdk'

export default {
  name: 'CrowdFundingRecords',
  filters: { formatTime },
  data() {
    return {
      crowdfundID: '',
      records: [],
      currentPage: 0,
      isAllLoadeded: false
    }
  },
  created() {
    /* 页面初始化说明 start */
    setPageTitle('我的众筹记录') // 设置页面标题
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
  },
  methods: {
    getMyCFRecords(page, done) {
      this.$api('getMyCFRecords')
        .post({ crowdfund_id: this.crowdfundID, page: page, limit: 10 })
        .then(res => {
          if (res.data.code === '200') {
            this.currentPage = page
            if (this.currentPage === 1) {
              this.records = res.data.data.items
            } else {
              this.records = this.records.concat(res.data.data.items)
            }
            if (this.currentPage < res.data.data.total_pages) {
              this.isAllLoadeded = false
            } else {
              this.isAllLoadeded = true
            }
            done(this.isAllLoadeded)
          }
        })
    },
    refresh(done) {
      this.getMyCFRecords(1, done)
    },
    infinite(done) {
      this.getMyCFRecords(this.currentPage + 1, done)
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
  padding: 0.2rem;
  box-sizing: border-box;

  .records-wrap {
    font-size: 0.32rem;
    color: 0.32rem;
    line-height: 0.4rem;

    .record-item {
      padding: 0.24rem 0.32rem 0.32rem;
      .header {
        font-size: 0.28rem;
        line-height: 0.36rem;
      }
      .body {
        display: flex;
        margin: 0.32rem auto 0.12rem;
        .goods-name {
          flex: 1;
          max-height: 0.8rem;
        }
        .goods-num {
          width: 1.38rem;
          color: #999;
          text-align: right;
        }
      }
      .footer {
        color: #999;
        font-size: 0.28rem;
        line-height: 0.36rem;
      }
    }
  }
}
</style>
