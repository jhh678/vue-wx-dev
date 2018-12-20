/*
 * @File: 布局演示
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-01 09:41:42
 */
<template>
  <div>
    <d-header title="布局演示"></d-header>
    <d-content>
      <h3>分割线</h3>
      <v-divider>我是有底线的</v-divider>
      <h3>flex布局</h3>
      <v-divider>水平</v-divider>
      <v-flexbox>
        <v-flexbox-item>
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
      </v-flexbox>
      <br>
      <v-flexbox>
        <v-flexbox-item>
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
      </v-flexbox>
      <br>
      <v-flexbox>
        <v-flexbox-item>
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">4</div>
        </v-flexbox-item>
      </v-flexbox>

      <v-divider>水平有间隙</v-divider>
      <v-flexbox :gutter="8">
        <v-flexbox-item>
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">4</div>
        </v-flexbox-item>
      </v-flexbox>

      <v-divider>垂直</v-divider>
      <v-flexbox :gutter="8" orient="vertical">
        <v-flexbox-item>
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">4</div>
        </v-flexbox-item>
      </v-flexbox>

      <v-divider>网格（12列）</v-divider>
      <v-flexbox>
        <v-flexbox-item :span="6">
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item :span="2">
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item>
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
      </v-flexbox>

      <v-flexbox>
        <v-flexbox-item :span="1/3" :order="4">
          <div class="flexbox-item-demo">1</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/6" :order="3">
          <div class="flexbox-item-demo">2</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/8" :order="2">
          <div class="flexbox-item-demo">3</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/8" :order="1">
          <div class="flexbox-item-demo">4</div>
        </v-flexbox-item>
        <v-flexbox-item :order="-99">
          <div class="flexbox-item-demo">5</div>
        </v-flexbox-item>
      </v-flexbox>

      <v-divider>flex-wrap</v-divider>
      <v-flexbox wrap="wrap">
        <v-flexbox-item :span="1/3">
          <div class="flexbox-item-demo">1/3</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/3">
          <div class="flexbox-item-demo">1/3</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/3">
          <div class="flexbox-item-demo">1/3</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/3">
          <div class="flexbox-item-demo">1/3</div>
        </v-flexbox-item>
        <v-flexbox-item :span="1/3">
          <div class="flexbox-item-demo">1/3</div>
        </v-flexbox-item>
      </v-flexbox>

      <h3>网格（grid）</h3>
      <v-divider>自定义列</v-divider>
      <v-grid :cols="2">
        <v-grid-item v-for="i in 5" :key="i" icon="icon-wode_zhongchoujilu">
          <span class="grid-center">{{i}}</span>
        </v-grid-item>
      </v-grid>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'LayoutDemo',
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
.flexbox-item-demo {
  border-radius: 0.08rem;
  text-align: center;
  background: #5fd25a;
}
</style>
