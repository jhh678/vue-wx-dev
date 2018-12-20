<template>
  <div class="auth-fail-warp">
    <i class="iconfont icon-tishi_shibai"></i>
    <h3 class="auth-fail-title">授权失败</h3>
    <div class="auth-fail-tips">别紧张，请重新试试看~</div>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'

export default {
  name: 'ErrorAuth',
  created() {
    setPageTitle('授权失败，请稍后重试~')
  }
}
</script>

<style scoped lang="scss">
.auth-fail-warp {
  padding-top: 3.2rem;
  font-size: 0.32rem;
  line-height: 0.4rem;
  text-align: center;
  .iconfont {
    display: block;
    margin: auto;
    font-size: 1.2rem;
    color: #ff3200;
    line-height: 1;
  }
  .auth-fail-title {
    margin: 0.24rem auto 0.16rem;
    font-weight: 500;
    color: #333;
  }

  .auth-fail-tips {
    font-size: 0.28rem;
    color: #999;
  }
}
</style>
