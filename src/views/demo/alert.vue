/*
 * @File: file describe 
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-11-28 11:31:08
 */
<template>
  <div>
    <d-header title="警告框组件"></d-header>
    <d-content>
      <v-button :click="showAlertClick">显示警告框</v-button>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'AlertDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {}
  },
  created() {
    setPageTitle('对话框组件') // 设置标题
  },
  mounted() {},
  methods: {
    showAlertClick() {
      this.$alert({ title: '警告', content: '人间不值得' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
