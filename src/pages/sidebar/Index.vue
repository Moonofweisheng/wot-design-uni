<!--
 * @Author: weisheng
 * @Date: 2023-11-06 20:08:34
 * @LastEditTime: 2024-11-18 23:27:20
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/sidebar/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基础用法" transparent>
      <view style="display: flex; justify-content: space-around">
        <wd-sidebar v-model="active1">
          <wd-sidebar-item :value="0" label="标签名称" />
          <wd-sidebar-item :value="1" label="标签名称" />
          <wd-sidebar-item :value="2" label="标签名称" />
        </wd-sidebar>
        <wd-sidebar v-model="active2">
          <wd-sidebar-item :value="0" label="标签名称" is-dot />
          <wd-sidebar-item :value="1" label="标签名称" badge="5" />
          <wd-sidebar-item :value="2" label="标签名称" badge="2" :badge-props="{ type: 'warning', modelValue: 55, max: 99 }" />
        </wd-sidebar>
        <wd-sidebar v-model="active3" :before-change="beforeChange">
          <wd-sidebar-item :value="0" label="标签名称" />
          <wd-sidebar-item :value="1" label="标签名称" disabled />
          <wd-sidebar-item :value="2" label="标签名称" />
        </wd-sidebar>
      </view>
    </demo-block>

    <demo-block title="锚点用法示例" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick1" :round="false" block size="large">锚点用法</wd-button>
      </view>
    </demo-block>

    <demo-block title="切换页面用法示例" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick2" :round="false" block size="large">切换页面</wd-button>
      </view>
    </demo-block>

    <demo-block title="自定义图标示例" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick3" :round="false" block size="large">自定义图标</wd-button>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { SidebarBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-sidebar/types'
import { ref } from 'vue'
const { loading: showLoading, close: closeLoading } = useToast()

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)

const beforeChange: SidebarBeforeChange = ({ value, resolve }) => {
  showLoading('切换中')
  setTimeout(() => {
    closeLoading()
    resolve(true)
  }, 2000)
}

function handleClick1() {
  uni.navigateTo({ url: '/pages/sidebar/demo1' })
}
function handleClick2() {
  uni.navigateTo({ url: '/pages/sidebar/demo2' })
}

function handleClick3() {
  uni.navigateTo({ url: '/pages/sidebar/demo3' })
}
</script>
<style lang="scss" scoped>
.demo-button {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24rpx;
}
</style>
