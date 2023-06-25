<!--
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2023-06-25 13:32:05
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\App.vue
 * 记得注释
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch((ctx) => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import './uni_modules/wot-design-uni/components/wd-modal/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-input/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-search/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-progress/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-input-number/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-loadmore/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-pagination/custom.scss';
@import './uni_modules/wot-design-uni/components/wd-sort-button/custom.scss';


page {
  margin: 0;
  padding: 0;
  font-family: San Francisco, Rotobo, arial, PingFang SC, Noto SansCJK, Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  background: #f8f9fa;
}
</style>
