<template>
  <view class="conditional-test">
    <!-- #ifdef H5 -->
    <view class="h5-component">H5专属组件</view>
    <!-- #endif -->

    <!-- #ifndef MP-WEIXIN -->
    <view class="common-component">非微信小程序组件</view>
    <!-- #endif -->

    <!-- 始终显示的内容 -->
    <view class="always-show">始终显示的内容</view>

    <!-- #ifdef MP-WEIXIN || H5 -->
    <view class="weixin-or-h5">微信小程序或H5平台显示</view>
    <!-- #endif -->

    <!-- #ifndef APP-PLUS -->
    <view class="not-app">非APP平台显示</view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  name: 'ConditionalTest',
  data() {
    return {
      // #ifdef H5
      platform: 'H5平台',
      // #endif

      // #ifdef MP-WEIXIN
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      platform: '微信小程序平台',
      // #endif

      // #ifdef APP-PLUS
      // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
      platform: 'APP平台',
      // #endif

      // 通用数据
      commonData: '通用数据'
    }
  },
  methods: {
    // #ifdef H5
    h5Method() {
      console.log('H5平台特有方法')
      return 'H5平台特有方法'
    },
    // #endif

    // #ifdef MP-WEIXIN
    wxMethod() {
      console.log('微信小程序平台特有方法')
      return '微信小程序平台特有方法'
    },
    // #endif

    // 通用方法
    commonMethod() {
      console.log('通用方法')
      return '通用方法'
    }
  },
  mounted() {
    // #ifdef H5
    console.log('H5平台特有生命周期')
    // #endif

    // #ifdef MP-WEIXIN
    console.log('微信小程序平台特有生命周期')
    // #endif

    console.log('通用生命周期')
  }
}
</script>

<style>
/* 通用样式 */
.conditional-test {
  padding: 20px;
}

.always-show {
  color: blue;
  font-size: 16px;
}

/* #ifdef H5 */
.h5-component {
  color: green;
  font-size: 18px;
}
/* #endif */

/* #ifdef MP-WEIXIN */
.mp-style {
  color: red;
  font-size: 18px;
}
/* #endif */

/* #ifndef APP-PLUS */
.not-app {
  color: purple;
  font-size: 16px;
}
/* #endif */
</style>
