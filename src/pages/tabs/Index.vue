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

    <demo-block title="使用徽标" transparent>
      <wd-tabs v-model="tabWithBadge" @change="handleChange">
        <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="`${item.title}`" :badge-props="item.badgeProps">
          <view class="content">{{ item.title }}徽标</view>
        </wd-tab>
      </wd-tabs>
    </demo-block>

    <demo-block title="自动调整底部条宽度" transparent>
      <wd-tabs v-model="autoLineWidthTab" @change="handleChange" auto-line-width>
        <block v-for="item in autoLineWidthTabs" :key="item">
          <wd-tab :title="`${item}`" :name="item">
            <view class="content">内容{{ autoLineWidthTab }}</view>
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
      <wd-tabs v-model="tab6" @change="handleChange">
        <block v-for="item in 7" :key="item">
          <wd-tab :title="`标签${item}`">
            <view class="content">内容{{ tab6 + 1 }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
    </demo-block>

    <demo-block title="左对齐超出即可滚动" transparent>
      <wd-tabs v-model="tab9" slidable="always" @change="handleChange">
        <block v-for="item in 5" :key="item">
          <wd-tab :title="`超大标签${item}`">
            <view class="content">内容{{ tab9 + 1 }}</view>
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

    <demo-block title="在弹出框中使用" transparent>
      <view class="section">
        <wd-button @click="handleOpenClick">打开弹窗</wd-button>
      </view>
    </demo-block>

    <wd-popup v-model="showPopup" position="bottom" safe-area-inset-bottom @after-enter="handlePopupShow" closable custom-style="padding: 0 24rpx;">
      <view class="title">在弹出框中使用</view>
      <wd-tabs v-model="tab10" ref="tabsRef">
        <wd-tab v-for="item in tabs" :key="item" :title="`${item}`" :name="item">
          <view class="content">内容{{ tab10 }}</view>
        </wd-tab>
      </wd-tabs>
    </wd-popup>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { TabsInstance } from '@/uni_modules/wot-design-uni/components/wd-tabs/types'
import { ref } from 'vue'
const tabs = ref(['这', '是', '一', '个', '例子'])
const tab = ref('一')

const tabWithBadge = ref(0)

const tabsWithBadge = ref([
  {
    title: '普通数值',
    badgeProps: {
      modelValue: 10,
      right: '-8px'
    }
  },
  {
    title: '最大值',
    badgeProps: {
      modelValue: 100,
      max: 99,
      right: '-8px'
    }
  },
  {
    title: '点状',
    badgeProps: {
      isDot: true,
      right: '-8px',
      showZero: true
    }
  }
])

const autoLineWidthTabs = ref(['Wot', 'Design', 'Uni'])
const autoLineWidthTab = ref('Design')

const tab1 = ref<number>(0)
const tab2 = ref<number>(0)
const tab3 = ref<number>(1)
const tab4 = ref<number>(2)
const tab5 = ref<number>(0)
const tab6 = ref<number>(0)
const tab7 = ref<number>(0)
const tab8 = ref<number>(0)
const tab9 = ref<number>(0)
const tab10 = ref<number>(3)

const toast = useToast()
function handleClick({ index, name }: any) {
  console.log('event', { index, name })
  toast.show(`点击了标签${name}`)
}
function handleChange(event: any) {
  console.log('change', event)
}

const showPopup = ref(false) // 控制popup显示
const tabsRef = ref<TabsInstance>() // 获取分段器实例

/**
 * 点击按钮打开popup
 */
function handleOpenClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
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
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
</style>
