/*
 * @File: 确认框组件演示
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-11-28 14:33:23
 */
<template>
  <div>
    <d-header title="确认框组件"></d-header>
    <d-content>
      <v-button :click="showConfirmClick">显示确认框</v-button>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'ConfirmDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {}
  },
  created() {
    setPageTitle('确认框组件') // 设置标题
  },
  mounted() {},
  methods: {
    showConfirmClick() {
      this.$confirm({
        title: '确定要删除活动吗？',
        content: '删除后活动相关数据将不可恢复',
        onConfirm: msg => {
          this.$toast('点击了确认按钮')
        },
        onCancel: () => {
          this.$toast('点击了取消按钮')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
