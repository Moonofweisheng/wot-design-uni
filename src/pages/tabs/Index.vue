<template>
  <page-wraper>
    <wd-toast />
    <demo-block title="基本用法" transparent>
      <wd-tabs v-model="tab1" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="粘性布局" transparent>
      <wd-tabs v-model="tab2" sticky>
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="禁用tab" transparent>
      <wd-tabs v-model="tab3">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :disabled="item === 1" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="点击事件" transparent>
      <wd-tabs v-model="tab4" @click="handleClick">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="手势滑动" transparent>
      <wd-tabs v-model="tab5" swipeable>
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="数量大于6时可滚动" transparent>
      <wd-tabs v-model="tab6" lazy-render>
        <block v-for="item in 7" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="content">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="数量大于10时出现导航地图" transparent>
      <wd-tabs v-model="tab7">
        <block v-for="item in 11" :key="item">
          <wd-tab :title="`标签${item}`" :name="item">
            <view class="large">内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

const tab1 = ref<number>(0)
const tab2 = ref<number>(0)
const tab3 = ref<number>(1)
const tab4 = ref<number>(0)
const tab5 = ref<number>(0)
const tab6 = ref<number>(0)
const tab7 = ref<number>(0)
const toast = useToast()
function handleClick({ index, name }) {
  console.log('event', { index, name })
  toast.show(`点击了标签${name}`)
}
function handleChange(event) {
  console.log('change', event)
}
</script>
<style lang="scss" scoped>
.content {
  line-height: 120px;
  text-align: center;
}
.large {
  line-height: 320px;
  text-align: center;
}
</style>
