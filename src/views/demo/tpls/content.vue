<template>
  <section class="content">
    <slot></slot>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  top: 0.98rem;
  right: 0;
  bottom: 0.98rem;
  left: 0;
  overflow: auto;
  background: #fff;
}
</style>
