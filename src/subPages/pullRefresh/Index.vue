<template>
  <view class="page">
    <wd-tabs v-model="activeTab" @change="handleTabChange" animated sticky swipeable>
      <wd-tab title="基础用法">
        <wd-pull-refresh v-model="loading1" @refresh="onRefresh1">
          <wd-cell v-for="item in list1" :key="item" :title="`列表项 ${item}`" />
        </wd-pull-refresh>
      </wd-tab>

      <wd-tab title="局部滚动">
        <wd-pull-refresh v-model="loading7" scroll-mode="scroll-view" :height="300" @refresh="onRefresh7">
          <wd-cell title="scroll-view 滚动模式" label="固定高度 300px，支持局部滚动" />
          <wd-cell v-for="item in list7" :key="item" :title="`scroll-view 滚动 ${item}`" />
          <wd-cell v-for="item in 15" :key="`extra-${item}`" :title="`额外内容 ${item}`" label="用于测试滚动效果" />
        </wd-pull-refresh>
      </wd-tab>

      <wd-tab title="成功提示">
        <wd-pull-refresh v-model="loading3" success-text="刷新成功" :success-duration="1500" @refresh="onRefresh3">
          <wd-cell v-for="item in list3" :key="item" :title="`成功提示 ${item}`" />
        </wd-pull-refresh>
      </wd-tab>

      <wd-tab title="自定义提示">
        <wd-pull-refresh
          v-model="loading2"
          pulling-text="用力拉..."
          loosing-text="快松手..."
          loading-text="拼命加载中..."
          success-text="加载成功！"
          @refresh="onRefresh2"
        >
          <wd-cell v-for="item in list2" :key="item" :title="`自定义文案 ${item}`" />
        </wd-pull-refresh>
      </wd-tab>
    </wd-tabs>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Tab 相关
const activeTab = ref(0)
const refreshCount = ref(1)

// Loading 状态
const loading1 = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)
const loading7 = ref(false)
const loading8 = ref(false)

// 列表数据
const list1 = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const list2 = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const list3 = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const list7 = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const list8 = ref(Array.from({ length: 20 }, (_, i) => i + 1))

// Tab 切换事件
function handleTabChange(index: number) {
  console.log('切换到tab:', index)
}

// 刷新事件处理
function onRefresh1() {
  setTimeout(() => {
    list1.value = Array.from({ length: 20 }, (_, i) => i + 1)
    loading1.value = false
    refreshCount.value++
  }, 2000)
}

function onRefresh2() {
  setTimeout(() => {
    list2.value = Array.from({ length: 20 }, (_, i) => i + 1)
    loading2.value = false
    refreshCount.value++
  }, 2000)
}

function onRefresh3() {
  setTimeout(() => {
    list3.value = Array.from({ length: 20 }, (_, i) => i + 1)
    loading3.value = false
    refreshCount.value++
  }, 2000)
}

function onRefresh7() {
  setTimeout(() => {
    list7.value = [1, 2, 3, 4, 5, 6]
    loading7.value = false
    refreshCount.value++
  }, 2000)
}
</script>

<style lang="scss" scoped></style>
