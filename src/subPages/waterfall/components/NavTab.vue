<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items?: NavItem[]
  defaultActive?: number
}>()

interface NavItem {
  label: string
  value: string
}

const navItems = ref<NavItem[]>(
  props.items || [
    { label: '例1', value: '/subPages/waterfall/Index' },
    { label: '例2', value: '/subPages/waterfall/demo2' },
    { label: '例3', value: '/subPages/waterfall/demo3' },
    { label: '例4', value: '/subPages/waterfall/demo4' },
    { label: '例5', value: '/subPages/waterfall/demo5' }
  ]
)

// 页面跳转方法
function navigateTo(url: string) {
  uni.navigateTo({
    url
  })
}
</script>

<template>
  <view class="nav-tab">
    <view v-for="(item, index) in navItems" :key="index" class="nav-item" @click="navigateTo(item.value)">
      <text class="nav-text">
        {{ item.label }}
      </text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.nav-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  padding: 4px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  margin: 0 2px;
  transition: all 0.2s;
  cursor: pointer;
  background-color: #386fdf;
  min-width: 0;
  color: white;
  border-radius: 4px;
  flex: 1 1 0%;
}

.nav-item.active {
  background-color: #cad6eb;
  color: white;
}
.nav-item.hover {
  background-color: #bcd1f5;
  color: white;
}

.nav-text {
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}

.nav-item.active .nav-text {
  color: white;
}
</style>
