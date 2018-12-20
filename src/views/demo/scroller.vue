/*
 * @File: 滚动组件演示
 * @Author: jhh678 
 * @Date: 2018-11-26 10:57:32 
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-12-01 09:41:42
 */
<template>
  <div>
    <d-header title="滚动组件"></d-header>
    <d-content>
      <v-scroller ref="scroller" :on-refresh="refresh" :on-infinite="infinite">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="row"
          :class="{'grey-bg': index % 2 !== 0}"
        >{{ item }}</div>
      </v-scroller>
    </d-content>
    <d-footer></d-footer>
  </div>
</template>

<script>
import { DHeader, DContent, DFooter } from './tpls'

export default {
  name: 'ScrollerDemo',
  components: {
    DHeader,
    DContent,
    DFooter
  },
  data() {
    return {
      items: [],
      isAllLoadeded: false
    }
  },

  mounted() {
    for (var i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.')
    }
    this.top = 1
    this.bottom = 20
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        this.bottom = 20
        this.items = this.items.splice(0, 20)
        done()
      }, 1500)
    },
    infinite(done) {
      setTimeout(() => {
        var start = this.bottom + 1
        for (var i = start; i < start + 10; i++) {
          this.items.push(i + ' - keep walking, be 2 with you.')
        }
        this.bottom = this.bottom + 10
        this.isAllLoadeded = this.items.length >= 40
        done(this.isAllLoadeded)
      }, 1500)
      console.log(this.$refs.scroller.getPosition())
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  padding: 0.12rem 0.24rem;
}
</style>
