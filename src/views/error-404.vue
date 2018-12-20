<template>
  <div class="body-404">
    <div class="error-header"></div>
    <div class="container">
      <section class="error-container">
        <h1>404</h1>
        <div class="error-divider">
          <h2>/(ㄒoㄒ)/~~页面丢了</h2>
          <p class="description">它可能被外星人带走了</p>
        </div>
        <router-link to="/demo/index" class="return-btn">主页</router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { setPageTitle } from '@/utils'

export default {
  name: 'Error404',
  created() {
    setPageTitle('/(ㄒoㄒ)/~~页面丢了')
  }
}
</script>

<style scoped lang="scss">
.body-404 {
  background-color: #00a53c;
  color: #fff;
  min-height: 100vh;
}

.error-header {
  background: #fff;
  height: 4rem;
}

.container {
  width: 70%;
  padding-right: 0.1rem;
  padding-left: 0.1rem;
  margin-right: auto;
  margin-left: auto;
}

.error-container {
  background: rgba(0, 0, 0, 0.05);
  text-align: center;

  h1 {
    font-size: 1rem;
    font-weight: 300;
    margin: -1.18rem 0 0 0;
    text-align: center;
    color: #00a53c;
  }

  .error-divider {
    margin-top: -0.15rem;
    padding: 0.15rem 0;

    h2 {
      line-height: 1;
      font-size: 0.36rem;
      font-weight: 300;
      margin: 0;
      text-transform: uppercase;
      color: #fff;
    }

    .description {
      color: #e5e5e5;
      font-size: 0.2rem;
      margin: 0;
    }
  }
}

.return-btn,
.return-btn:hover {
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.06rem 0.24rem;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  display: inline-block;
  border-radius: 0.02rem;
  background-clip: padding-box;
  color: #fff;
  font-size: 0.1rem;
  font-weight: 300;

  &:hover {
    background: #fff;
    color: #00a53c;
    text-decoration: none;
  }

  i {
    margin-right: 0.05rem;
  }
}
</style>
