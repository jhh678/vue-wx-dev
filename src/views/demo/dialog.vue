/*
 * @File: 对话框组件演示
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-07 11:08:28
 */
<template>
  <div>
    <d-header title="对话框组件"></d-header>
    <d-content>
      <v-button :click="showDialogClick">显示对话框</v-button>
      <v-dialog v-model="showDialog">
        <div class="ui-dialog__hd">
          <h3 class="ui-dialog__title">绑定手机</h3>
        </div>
        <div class="ui-dialog__bd">
          <input type="text" class="ui-input">
        </div>
        <div class="ui-dialog__ft">
          <button v-tap="cancleClick" class="ui-dialog__btn ui-dialog__btn_default">取消</button>
          <button class="ui-dialog__btn">确定绑定</button>
        </div>
      </v-dialog>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'DialogDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {
      showDialog: false
    }
  },
  created() {
    setPageTitle('对话框组件') // 设置标题
  },
  mounted() {},
  methods: {
    showDialogClick() {
      this.showDialog = true
    },
    cancleClick() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
