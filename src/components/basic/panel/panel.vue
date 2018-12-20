<template>
  <div class="ui-panel" :class="{'ui-panel__radius': isRadius}">
    <div v-if="header" class="ui-panel__hd" @click="onClickHeader" v-html="header">
      <slot name="header"></slot>
    </div>
    <div class="ui-panel__bd">
      <slot name="body">
        <!--type==='1'-->
        <template v-if="type === '1'">
          <a v-for="(item, index) in list" :key="index" :href="getUrl(item.url)" class="ui-media-box ui-media-box_appmsg" @click.prevent="onItemClick(item)">
            <div v-if="item.src" class="ui-media-box__hd">
              <img class="ui-media-box__thumb" :src="item.src" alt="" @error="onImgError(item, $event)">
            </div>
            <div class="ui-media-box__bd">
              <h4 class="ui-media-box__title ui-nowrap" v-html="item.title"></h4>
              <p class="ui-media-box__desc ui-nowrap-two" v-html="item.desc"></p>
            </div>
          </a>
        </template>
        <!--type==='2'-->
        <template v-if="type === '2'">
          <div v-for="(item, index) in list" :key="index" class="ui-media-box ui-media-box_text" @click.prevent="onItemClick(item)">
            <h4 class="ui-media-box__title ui-nowrap" v-html="item.title"></h4>
            <p class="ui-media-box__desc ui-nowrap-two" v-html="item.desc"></p>
          </div>
        </template>
        <!--type==='3'-->
        <template v-if="type === '3'">
          <div class="ui-media-box ui-media-box_small-appmsg">
            <div class="ui-cells">
              <a v-for="(item, index) in list" :key="index" class="ui-cell ui-cell_access" :href="getUrl(item.url)" @click.prevent="onItemClick(item)">
                <div class="ui-cell__hd">
                  <img :src="item.src" alt="" style="width:20px;margin-right:5px;display:block" @error="onImgError(item, $event)">
                </div>
                <div class="ui-cell__bd">
                  <p v-html="item.title"></p>
                </div>
                <span class="ui-cell__ft"></span>
              </a>
            </div>
          </div>
        </template>
        <!--type==='4'-->
        <template v-if="type === '4'">
          <div v-for="(item, index) in list" :key="index" class="ui-media-box ui-media-box_text" @click.prevent="onItemClick(item)">
            <h4 class="ui-media-box__title ui-nowrap" v-html="item.title"></h4>
            <p class="ui-media-box__desc ui-nowrap-two" v-html="item.desc"></p>
            <ul v-if="item.meta" class="ui-media-box__info">
              <li class="ui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="ui-media-box__info__meta" v-html="item.meta.date"></li>
              <li class="ui-media-box__info__meta ui-media-box__info__meta_extra" v-html="item.meta.other"></li>
            </ul>
          </div>
        </template>
        <!--type==='5'-->
        <template v-if="type === '5'">
          <div v-for="(item, index) in list" :key="index" class="ui-media-box ui-media-box_text" @click.prevent="onItemClick(item)">
            <div class="ui-media-box_appmsg">
              <div v-if="item.src" class="ui-media-box__hd">
                <img class="ui-media-box__thumb" :src="item.src" alt="" @error="onImgError(item, $event)">
              </div>
              <div class="ui-media-box__bd">
                <h4 class="ui-media-box__title ui-nowrap" v-html="item.title"></h4>
                <p class="ui-media-box__desc ui-nowrap-two" v-html="item.desc"></p>
              </div>
            </div>
            <ul v-if="item.meta" class="ui-media-box__info">
              <li class="ui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="ui-media-box__info__meta" v-html="item.meta.date"></li>
              <li class="ui-media-box__info__meta ui-media-box__info__meta_extra" v-html="item.meta.other"></li>
            </ul>
          </div>
        </template>
      </slot>
    </div>
    <div class="ui-panel__ft">
      <a v-if="footer && footer.title && type !== '3'" class="ui-cell ui-cell_access ui-cell_link" :href="getUrl(footer.url)" @click.prevent="onClickFooter">
        <div class="ui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { router } from '@/utils'
export default {
  name: 'Panel',
  props: {
    isRadius: {
      type: Boolean,
      default: true
    },
    header: String,
    footer: Object,
    list: Array,
    type: {
      type: String,
      default: '1'
    }
  },
  methods: {
    onImgError(item, $event) {
      this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event)
      if (item.fallbackSrc) {
        $event.target.src = item.fallbackSrc
      }
    },
    getUrl(url) {
      return router.getUrl(url, this.$router)
    },
    onClickFooter() {
      this.$emit('on-click-footer')
      router.go(this.footer.url, this.$router)
    },
    onClickHeader() {
      this.$emit('on-click-header')
    },
    onItemClick(item) {
      this.$emit('on-click-item', item)
      router.go(item.url, this.$router)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/sass/mixin/mobile';

.ui-panel {
  position: relative;
  overflow: hidden;
  margin-top: 0.32rem;
  background-color: #ffffff;

  &.ui-panel__radius {
    border-radius: 0.2rem;
    &::before,
    &::after {
      display: none;
    }
  }

  &:first-child {
    margin-top: 0;
  }

  &::before {
    @include setTopLine();
  }
  &::after {
    @include setBottomLine();
  }
}

.ui-panel__hd {
  padding: 14px 15px 10px;
  color: #333;
  font-size: 13px;
  position: relative;
  &::after {
    @include setBottomLine();
    left: 15px;
  }
}

.ui-media-box {
  padding: 15px;
  position: relative;
  &:before {
    @include setTopLine();
    left: 15px;
  }
  &:first-child {
    &:before {
      display: none;
    }
  }

  &a {
    color: #000000;
    @include setTapColor();
    &:active {
      background-color: #ececec;
    }
  }
}
.ui-media-box__title {
  font-weight: 400;
  font-size: 17px;
  word-wrap: break-word;
  word-break: break-all;
}
.ui-media-box__desc ui-nowrap-two {
  color: #999;
  font-size: 13px;
  line-height: 1.2;
}
.ui-media-box__info {
  margin-top: 15px;
  padding-bottom: 5px;
  font-size: 13px;
  color: #cecece;
  line-height: 1em;
  list-style: none;
  overflow: hidden;
}
.ui-media-box__info__meta {
  float: left;
  padding-right: 1em;
}
.ui-media-box__info__meta_extra {
  padding-left: 1em;
  border-left: 1px solid #cecece;
}
.ui-media-box_text {
  .ui-media-box__title {
    margin-bottom: 8px;
  }
}
.ui-media-box_appmsg {
  display: flex;
  align-items: center;
  .ui-media-box__hd {
    margin-right: 0.8em;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .ui-media-box__thumb {
    width: 100%;
    max-height: 100%;
    vertical-align: top;
  }
  .ui-media-box__bd {
    flex: 1;
    min-width: 0;
  }
}
.ui-media-box_small-appmsg {
  padding: 0;
  .ui-cells {
    margin-top: 0;
    &:before {
      display: none;
    }
  }
}
</style>
