<template>
  <footer class="footer ui-border-t">
    <slot>
      <ul>
        <router-link
          v-for="(item, index) of links"
          :key="index"
          :to="item.path"
          tag="li"
        >{{item.name}}</router-link>
      </ul>
    </slot>
  </footer>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default() {
        return [
          {
            path: '/demo/index',
            name: '演示首页'
          },
          {
            path: '/demo/scroller',
            name: '滚动组件'
          },
          {
            path: '/demo/toast',
            name: '提示组件'
          }
        ]
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
  z-index: 10;
  background: #fff;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;

    li {
      flex: 1;
    }
  }
}
</style>
