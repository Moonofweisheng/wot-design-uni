<template>
  <page-wraper>
    <view>
      <demo-block title="基本用法">
        <wd-cell title="步骤一" id="pop1001">
          <wd-button @click="show1 = true">点击试试</wd-button>
        </wd-cell>
      </demo-block>
      <wd-tour v-model="show1" :steps="steps1" type="card" />

      <demo-block title="自定义样式">
        <wd-cell title="步骤一" id="pop2001">
          <wd-button @click="show2 = true">点击试试</wd-button>
        </wd-cell>
      </demo-block>
      <wd-tour v-model="show2" :steps="steps2" type="card" bgColor="#f00">
        <template #content="{ item }">
          <view>{{ item }}</view>
        </template>
      </wd-tour>

      <demo-block title="步骤引导">
        <wd-cell title="步骤二">
          <view id="pop3001" style="display: inline-block">
            <wd-button @click="show3 = true">点击试试</wd-button>
          </view>
        </wd-cell>
        <view id="pop3002">
          <wd-cell title="步骤二">
            <wd-button @click="show3 = true">点击试试</wd-button>
          </wd-cell>
        </view>
      </demo-block>
      <wd-tour v-model="show3" :steps="steps3" type="step" />

      <view @click="show4 = true">
        <wd-tabbar fixed bordered safeAreaInsetBottom placeholder>
          <wd-tabbar-item id="pop4001" title="首页" icon="home"></wd-tabbar-item>
          <wd-tabbar-item id="pop4002" title="分类" icon="cart"></wd-tabbar-item>
          <wd-tabbar-item id="pop4003" title="我的" icon="user"></wd-tabbar-item>
        </wd-tabbar>
      </view>
      <wd-tour v-model="show4" :steps="steps4" type="step" />
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)

const steps1 = [
  {
    content: '这是引导提示',
    target: 'pop1001',
    popupStyle: {
      borderRadius: '18px'
    }
  }
]
const steps2 = [
  {
    content: '这是引导提示，自定义背景颜色',
    target: 'pop2001',
    contentStyle: {
      color: '#fff'
    }
  }
]
const steps3 = [
  {
    content: '引导步骤1',
    target: 'pop3001',
    popupStyle: {
      borderRadius: '18px'
    }
  },
  {
    content: '引导步骤2',
    target: 'pop3002'
  }
]
const steps4 = [
  {
    content: '首页',
    target: 'pop4001'
  },
  {
    content: '分类',
    target: 'pop4002'
  },
  {
    content: '我的',
    target: 'pop4003'
  }
]
</script>

<style lang="scss" scoped></style>
