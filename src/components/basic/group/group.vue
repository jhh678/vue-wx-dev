<template>
  <div>
    <div v-if="title" class="ui-cells__title" :style="cleanStyle({
      color: titleColor
    })" v-html="title"></div>
    <slot name="title"></slot>
    <div class="ui-cells" :class="{
      'ui-no-group_title': !title
    }" :style="cleanStyle({
      marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter
    })">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
    <div v-if="footerTitle" class="ui-cells__title ui-group_footer_title" :style="cleanStyle({
      color: footerTitleColor
    })" v-html="footerTitle"></div>
  </div>
</template>

<script>
import { cleanStyle } from '@/utils'
export default {
  name: 'Group',
  props: {
    title: String,
    titleColor: String,
    labelWidth: String,
    labelAlign: String,
    labelMarginRight: String,
    gutter: [String, Number],
    footerTitle: String,
    footerTitleColor: String
  },
  methods: {
    cleanStyle
  }
}
</script>

<style lang="scss">
@import '@/assets/css/sass/mixin/mobile';

.ui-cells {
  margin-top: 0.2rem;
  background-color: #fff;
  line-height: 0.4rem;
  font-size: 0.32rem;
  color: #333;

  overflow: hidden; //因为每个cell的border使用before元素left搞的，ie下伪元素的containing block估计跟标准不同，在cell上用oh不生效

  // onepx
  position: relative;
  &:before {
    @include setTopLine();
  }
  &:after {
    @include setBottomLine();
  }
}

.ui-cells__title {
  padding-left: 0.24rem;
  padding-right: 0.32rem;
  color: #333;
  font-size: 0.32rem;
  line-height: 0.4rem;

  & + .ui-cells {
    margin-top: 0;
  }
}

.ui-no-group_title {
  margin-top: 0.2rem;
}

.ui-group_footer_title.ui-cells__title {
  padding-top: 0;
  font-size: 0.32rem;
}
</style>
