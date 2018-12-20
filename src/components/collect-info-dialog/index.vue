/*
 * @File: 用户填写信息弹窗
 * @Author: jhh678 
 * @Date: 2018-12-03 17:52:37 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-11 11:39:18
 */
<template>
  <v-dialog v-model="value">
    <div class="ui-dialog__hd">
      <h3 class="ui-dialog__title">填写信息</h3>
    </div>
    <div class="ui-dialog__bd">
      <v-input v-for="(item, index) of formItems" v-if="item.show" :key="index" v-model="formData[item.key]" border-type="round" :placeholder="'请输入' + item.name">
        <v-button v-if="item.key ==='code'" slot="right" type="link" style="{margin:0;background:#fff;height:0.4rem;margin-left:0.24rem;padding:0;}" :text="vcodeBtnText" :disabled="vcodeBtnDisabled" :click="getVcodeClick"></v-button>
      </v-input>
    </div>
    <div class="ui-dialog__ft">
      <!-- <button v-tap="cancelClick" class="ui-dialog__btn ui-dialog__btn_default">取消</button> -->
      <button v-tap="confirmClick" class="ui-dialog__btn">确定</button>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'CollectInfoDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      formData: {},
      vcodeBtnText: '获取验证码',
      vcodeBtnDisabled: false,
      count: 60,
      curCount: 0
    }
  },
  created() {
    for (let i = 0, len = this.formItems.length; i < len; i++) {
      const item = this.formItems[i]
      this.$set(this.formData, item.key, '')
    }
  },
  methods: {
    getVcodeClick() {
      if (this.formData.mobile) {
        if (!this.curCount) {
          this.getVcode()
          this.updateVcodeBtn()
        }
      } else {
        this.$toast({ message: '请先输入手机号码', type: 'warning' })
      }
    },
    getVcode() {
      this.$api('getVcode')
        .post({ mobile: this.formData.mobile })
        .then(res => {})
    },
    updateVcodeBtn() {
      this.curCount = this.count
      this.vcodeBtnDisabled = true
      this.vcodeBtnText = `获取中${this.curCount}s`
      let interValObj = setInterval(() => {
        this.curCount = this.curCount - 1
        this.vcodeBtnText = `获取中${this.curCount}s`
        if (!this.curCount) {
          this.vcodeBtnText = '获取验证码'
          this.vcodeBtnDisabled = false
          clearInterval(interValObj)
        }
      }, 1000)
    },
    getFormData() {
      return this.formData
    },
    cancelClick() {
      // this.value = false
      this.$emit('cancel')
    },
    confirmClick() {
      // this.value = false
      for (let i = 0, len = this.formItems.length; i < len; i++) {
        if (this.formItems[i].show) {
          if (this.formItems[i].require && !this.formData[this.formItems[i].key]) {
            this.$toast({ message: `请输入${this.formItems[i].name}`, type: 'warning' })
            return
          }
          if (
            this.formItems[i].regexp &&
            !this.formItems[i].regexp.test(this.formData[this.formItems[i].key])
          ) {
            this.$toast({ message: `请输入正确的${this.formItems[i].name}`, type: 'warning' })
            return
          }
        }
      }

      this.$emit('confirm')
    }
  }
}
</script>
