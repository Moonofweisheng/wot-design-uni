<template>
  <div>
    <header-layout></header-layout>
    <div class="body-content" :class="isWindows ? 'body-scrollbar' : ''">
      <router-view></router-view>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import HeaderLayout from './header'
import ScrollTop from './scrollTop'
import { isWindows } from '../utils/index'

export default {
  components: {
    HeaderLayout,
    ScrollTop
  },
  data () {
    return {
      isWindows
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";

.body-content{
  padding-top: $layout-header-height;
  height: calc(100vh - #{$layout-header-height});
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
