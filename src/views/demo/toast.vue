/*
 * @File: toast提示演示 
 * @Author: jhh678 
 * @Date: 2018-11-26 19:59:41 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-03 19:31:25
 */
<template>
  <div>
    <d-header title="toast提示"></d-header>
    <d-content>
      <v-button type="default" text="普通提示" :half-radius="true" :click="showNormal"></v-button>
      <v-button type="primary" text="带Icon提示" size="lg" :click="showWithIcon"></v-button>
      <v-button type="info" text="顶部特殊提示" size="sm" :click="showTopToast"></v-button>
      <v-button type="link" text="底部特殊提示" size="sm" :click="showBottomToast"></v-button>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
// import api from '@/service/rest_api'
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'TosatDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {}
  },
  created() {
    setPageTitle('提示') // 设置标题
  },
  mounted() {},
  methods: {
    showNormal() {
      this.$toast({ message: '普通提示' })
    },
    showWithIcon() {
      this.$toast({ message: '登录成功', type: 'success', duration: 3000 })
    },
    showTopToast() {
      this.$toast({
        message: '开发中，敬请期待',
        position: 'top',
        className: 'half-radius',
        duration: 3000
      })
    },
    showBottomToast() {
      this.$toast({
        message: '开发中，敬请期待',
        position: 'bottom',
        className: 'half-radius',
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
