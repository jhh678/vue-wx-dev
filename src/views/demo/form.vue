/*
 * @File: 表单演示
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-03 20:02:42
 */
<template>
  <div>
    <d-header title="表单演示"></d-header>
    <d-content>
      <v-group>
        <v-input v-model="inputNormal" border-type="right" placeholder="请输入手机号码"></v-input>
        <v-input v-model="inputNormal" border-type="round" placeholder="请输入手机号码"></v-input>
      </v-group>

      <v-group>
        <v-popup-radio
          v-model="formData1.spec"
          title="规格"
          :options="options"
          :option-props-text="optionPropsText"
          header-title="选择规格"
          :required="true"
        >
          <i slot="header-right-text" class="iconfont icon-close"></i>
        </v-popup-radio>
        <v-input
          v-model="formData1.num"
          type="number"
          title="数量"
          placeholder="请输入数量"
          :required="true"
        >
          <slot slot="right">
            <span style="color: #333;">件</span>
          </slot>
        </v-input>
        <v-input v-model="formData1.name" title="姓名" placeholder="请输入姓名" :required="true"></v-input>
        <v-input v-model="formData1.mobile" title="手机号" placeholder="请输入手机号"></v-input>
      </v-group>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'FormDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {
      inputNormal: '',
      options: [
        {
          id: '001',
          name: '200克*40瓶'
        },
        {
          id: '002',
          name: '500克*40瓶'
        },
        {
          id: '003',
          name: '800克*40瓶'
        },
        {
          id: '004',
          name: '1000克*40瓶'
        }
      ],
      optionPropsText: {
        key: 'id',
        value: 'name'
      },
      formData1: {
        spec: '',
        num: '',
        name: '',
        mobile: ''
      }
    }
  },
  created() {
    setPageTitle('表单演示') // 设置标题
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
