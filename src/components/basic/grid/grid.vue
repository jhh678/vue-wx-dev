<template>
  <div class="ui-grids" :class="{'ui-grid-no-lr-borders': !showLrBorders}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    cols: {
      type: Number
    },
    showLrBorders: {
      type: Boolean,
      default: false
    },
    showVerticalDividers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      childrenSize: 3
    }
  },
  computed: {
    column() {
      return this.cols || this.childrenSize
    }
  },
  methods: {
    countColumn() {
      this.childrenSize = this.$children.length
      this.$children.forEach((c, index) => (c.index = index))
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/sass/mixin/mobile';
.ui-grids {
  position: relative;
  overflow: hidden;

  &::before {
    @include setTopLine();
  }
  &::after {
    @include setLeftLine();
  }
}

.ui-grid {
  position: relative;
  float: left;
  padding: 0.1rem;
  width: percentage(1/3);
  min-height: 2.24rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #666;
  &:active,
  &:visited {
    color: #666;
  }

  &::before {
    @include setRightLine();
  }
  &::after {
    @include setBottomLine();
  }
}

.ui-grid__icon {
  width: 0.72rem;
  height: 0.72rem;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .iconfont {
    line-height: 1;
    font-size: 0.72rem;
  }

  & + .ui-grid__label {
    margin-top: 0.06rem;
  }
}

.ui-grid__label {
  display: block;
  text-align: center;
  color: #666;
  font-size: 0.3rem;
  line-height: 0.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ui-grids.ui-grid-no-lr-borders {
  &::before,
  &::after {
    display: none;
  }
}
</style>
