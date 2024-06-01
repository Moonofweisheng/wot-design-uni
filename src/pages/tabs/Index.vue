<template>
  <page-wraper>
    <wd-toast />
    <demo-block title="基本用法" transparent>
      <wd-tabs v-model="tab1" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">
              内容{{ tab1 + 1 }}
              <view><wd-button @click="tab1 < 3 ? tab1++ : (tab1 = 0)">下一个</wd-button></view>
            </view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>
    <demo-block title="name匹配" transparent>
      <wd-tabs v-model="tab" @change="handleChange">
        <block v-for="item in tabs" :key="item">
          <wd-tab :title="`${item}`" :name="item">
            <view class="content">内容{{ tab }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="粘性布局" transparent>
      <wd-tabs v-model="tab2" sticky @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab2 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="禁用tab" transparent>
      <wd-tabs v-model="tab3" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`" :disabled="item === 1">
            <view class="content">内容{{ tab3 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="点击事件" transparent>
      <wd-tabs v-model="tab4" @click="handleClick" @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab4 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="切换动画" transparent>
      <wd-tabs v-model="tab8" animated @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab8 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="手势滑动" transparent>
      <wd-tabs v-model="tab5" swipeable animated @change="handleChange">
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab5 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="数量大于6时可滚动" transparent>
      <wd-tabs v-model="tab6" lazy-render @change="handleChange">
        <block v-for="item in 7" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab6 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="数量大于10时出现导航地图" transparent>
      <wd-tabs v-model="tab7" @change="handleChange">
        <block v-for="item in 11" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="large">内容{{ tab7 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
const tabs = ref(['这', '是', '一', '个', '例子'])
const tab = ref('一')

const tab1 = ref<number>(0)
const tab2 = ref<number>(0)
const tab3 = ref<number>(1)
const tab4 = ref<number>(2)
const tab5 = ref<number>(0)
const tab6 = ref<number>(0)
const tab7 = ref<number>(0)
const tab8 = ref<number>(0)
const toast = useToast()
function handleClick({ index, name }: any) {
  console.log('event', { index, name })
  toast.show(`点击了标签${name}`)
}
function handleChange(event: any) {
  console.log('change', event)
}
</script>
<style lang="scss" scoped>
.content {
  height: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.large {
  line-height: 320px;
  text-align: center;
}
</style>
