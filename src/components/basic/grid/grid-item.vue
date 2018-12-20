<template>
  <a v-tap="onClick" href="javascript:;" class="ui-grid ui-tap-active" :class="{'ui-grid-item-no-border': (isLast && !$parent.showLrBorders) || (!isLast && !$parent.showVerticalDividers)}" :style="style">
    <div v-if="hasIconSlot || icon" class="ui-grid__icon">
      <slot name="icon">
        <i class="iconfont" :class="icon" :style="{'color': iconColor}"></i>
      </slot>
    </div>
    <p v-if="hasLabelSlot || label" class="ui-grid__label">
      <slot name="label">
        <span v-html="label"></span>
      </slot>
    </p>
    <slot></slot>
  </a>
</template>

<script>
import { router } from '@/utils'

export default {
  name: 'GridItem',
  props: {
    icon: String,
    iconColor: String,
    label: String,
    link: String
  },
  data() {
    return {
      index: 0,
      hasIconSlot: false,
      hasLabelSlot: false
    }
  },
  computed: {
    isLast() {
      return !((this.index + 1) % this.$parent.column)
    },
    style() {
      const column = this.$parent.column
      if (!column || column === 3) {
        return
      }
      const styles = {}
      styles.width = `${100 / column}%`
      return styles
    }
  },
  created() {
    this.$parent.countColumn()
  },
  mounted() {
    this.$slots.icon && (this.hasIconSlot = true)
    this.$slots.label && (this.hasLabelSlot = true)
  },
  destroyed() {
    this.$parent.countColumn()
  },
  methods: {
    onClick() {
      this.$emit('on-item-click')
      router.go(this.link, this.$router)
    }
  }
}
</script>

<style lang="scss">
.ui-grid.ui-grid-item-no-border {
  &::before,
  &::after {
    display: none;
  }
}
</style>
