<template>
  <header class="header ui-border-b">
    <slot>
      <h3>{{title}}</h3>
    </slot>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
  z-index: 10;
  background: #fff;

  h3 {
    display: block;
    text-align: center;
    margin: auto;
  }
}
</style>
