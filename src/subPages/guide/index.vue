<template>
  <page-wraper>
    <view class="guide-container">
      <view class="guide-step" id="step1">
        <view class="guide-item">
          <text class="guide-title">第一步</text>
          <text class="guide-content">这是引导的第一步，介绍基本功能</text>
        </view>
      </view>

      <view class="guide-step" id="step2">
        <view class="guide-item">
          <text class="guide-title">第二步</text>
          <text class="guide-content">这是引导的第二步，展示更多功能</text>
        </view>
      </view>

      <view class="guide-step" id="step3">
        <view class="guide-item">
          <text class="guide-title">第三步</text>
          <text class="guide-content">这是引导的第三步，深入功能介绍</text>
        </view>
      </view>

      <view class="guide-step" id="step4">
        <view class="guide-item">
          <text class="guide-title">第四步</text>
          <text class="guide-content">这是引导的最后一步，总结功能</text>
        </view>
      </view>
    </view>

    <!-- 基本用法 -->
    <demo-block title="基本用法">
      <view class="button-group">
        <wd-button type="primary" @click="startBasicGuide">开始引导</wd-button>
      </view>
    </demo-block>

    <!-- 点击蒙版继续 -->
    <demo-block title="点击蒙版继续">
      <view class="button-group">
        <wd-button type="primary" @click="startMaskNextGuide">点击蒙版继续</wd-button>
      </view>
    </demo-block>

    <!-- 自定义蒙版 -->
    <demo-block title="自定义蒙版">
      <view class="button-group">
        <wd-button type="primary" @click="startCustomMaskGuide">自定义蒙版</wd-button>
      </view>
    </demo-block>

    <!-- 关闭蒙版 -->
    <demo-block title="关闭蒙版">
      <view class="button-group">
        <wd-button type="primary" @click="startNoMaskGuide">关闭蒙版</wd-button>
      </view>
    </demo-block>

    <!-- 自定义高亮区域 -->
    <demo-block title="自定义高亮区域">
      <view class="button-group">
        <wd-button type="primary" @click="startCustomHighlightGuide">自定义高亮</wd-button>
      </view>
    </demo-block>

    <!-- 自定义内容和按钮 -->
    <demo-block title="自定义内容和按钮">
      <view class="button-group">
        <wd-button type="primary" @click="startCustomContentGuide">自定义内容</wd-button>
      </view>
    </demo-block>

    <!-- 控制当前步骤 -->
    <demo-block title="控制当前步骤">
      <view class="button-group">
        <wd-button-group>
          <wd-button type="primary" @click="startControlGuide">跳转到第三步开始引导</wd-button>
        </wd-button-group>
      </view>
    </demo-block>

    <!-- 基本用法组件 -->
    <wd-guide
      v-model="showBasicGuide"
      :steps="basicSteps"
      v-model:current="current"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-guide>

    <!-- 点击蒙版继续组件 -->
    <wd-guide
      v-model="showClickMaskGuide"
      :steps="basicSteps"
      :click-mask-next="true"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-guide>

    <!-- 自定义蒙版组件 -->
    <wd-guide
      v-model="showCustomMaskGuide"
      :steps="customMaskSteps"
      :mask="true"
      mask-color="#7eb2f87d"
      :offset="40"
      :border-radius="15"
      :padding="10"
      :next-text="'下一步'"
      :prev-text="'上一步'"
      :skip-text="'跳过'"
      :finish-text="'完成'"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-guide>

    <!-- 关闭蒙版组件 -->
    <wd-guide
      v-model="showNoMaskGuide"
      :steps="noMaskSteps"
      :mask="false"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-guide>

    <!-- 自定义高亮区域组件 -->
    <wd-guide
      v-model="showCustomHighlightGuide"
      :steps="customHighlightSteps"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    >
      <template #highlight="{ elementInfo }">
        <view class="custom-highlight" :style="{ ...elementInfo, ...customHighlightStyle }"></view>
      </template>
    </wd-guide>

    <!-- 自定义内容和按钮组件 -->
    <wd-guide
      v-model="showCustomContentGuide"
      :steps="customContentSteps"
      :next-text="nextText"
      :prev-text="prevText"
      :skip-text="skipText"
      :finish-text="finishText"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    >
      <template #content>
        <view class="custom-content">
          <wd-icon name="help-circle-filled" size="22px"></wd-icon>
          <text class="custom-text">自定义引导内容区域</text>
        </view>
      </template>

      <template #next>
        <view class="custom-button custom-next">下一步</view>
      </template>

      <template #finish>
        <view class="custom-button custom-finish">完成</view>
      </template>
    </wd-guide>

    <!-- 控制当前步骤组件 -->
    <wd-guide
      v-model="showControlGuide"
      :steps="basicSteps"
      v-model:current="controlCurrent"
      :padding="10"
      @finish="handleFinish"
      @skip="handleSkip"
      @change="handleChange"
    ></wd-guide>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const showBasicGuide = ref(false)
const showClickMaskGuide = ref(false)
const showCustomMaskGuide = ref(false)
const showNoMaskGuide = ref(false)
const showCustomHighlightGuide = ref(false)
const showCustomContentGuide = ref(false)
const showControlGuide = ref(false)
const nextText = ref('继续')
const prevText = ref('返回')
const skipText = ref('跳过')
const finishText = ref('知道了')
const current = ref(0)
const controlCurrent = ref(0)
// 步骤数据
const basicSteps = [
  {
    element: '#step1',
    content: '欢迎使用引导组件，这是第一步的说明'
  },
  {
    element: '#step2',
    content: '这是第二步，展示了另一个功能点'
  },
  {
    element: '#step3',
    content: '这里可以是<H1>富文本</H1>'
  },
  {
    element: '#step4',
    content: '这是最后一步，完成引导流程'
  }
]

const customMaskSteps = [
  {
    element: '#step1',
    content: '这是<strong>自定义蒙版</strong>示例，使用了<strong>红色半透明</strong>蒙版'
  },
  {
    element: '#step2',
    content: '蒙版颜色设置为<code>rgba(255, 0, 0, 0.6)</code>'
  },
  {
    element: '#step3',
    content: '同时调整了<em>高亮区域的圆角</em>、<u>内边距</u>和<code>偏移量</code>'
  },
  {
    element: '#step4',
    content: '完成了自定义蒙版样式的展示'
  }
]

const noMaskSteps = [
  {
    element: '#step1',
    content: '这是<strong>无蒙版</strong>引导模式'
  },
  {
    element: '#step2',
    content: '只高亮目标元素，<em>不显示</em>半透明遮罩'
  },
  {
    element: '#step3',
    content: '适用于需要保持页面可见性的场景'
  },
  {
    element: '#step4',
    content: '引导完成，<u>不干扰</u>用户查看页面其他内容'
  }
]

const customHighlightSteps = [
  {
    element: '#step1',
    content: '这是<strong>自定义高亮区域</strong>示例'
  },
  {
    element: '#step2',
    content: '使用了<em>红色虚线边框</em>和<code>半透明背景</code>'
  },
  {
    element: '#step3',
    content: '通过插槽实现完全自定义的高亮样式'
  },
  {
    element: '#step4',
    content: '完成了自定义高亮区域的展示'
  }
]

const customContentSteps = [
  {
    element: '#step1',
    content: '这是<H1>自定义样式</H1>的引导，可以修改<em>蒙版颜色</em>、<u>圆角大小</u>等属性'
  },
  {
    element: '#step2',
    content: '可以自定义按钮文字，如"继续"、"返回"等'
  },
  {
    element: '#step3',
    content: '通过属性配置实现个性化引导体验'
  },
  {
    element: '#step4',
    content: '这是最后一步，完成引导流程'
  }
]
watch(
  () => current.value,
  (newVal) => {
    console.log('current.value11111', current.value)
  }
)
// 自定义高亮样式
const customHighlightStyle = {
  border: '2px dashed #ff0000',
  borderRadius: '8px',
  background: 'rgba(255, 0, 0, 0.1)',
  boxSizing: 'border-box'
}

// 滑动到最上面
function scrollToTop() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 0
  })
}
// 启动不同类型引导的方法
function startBasicGuide() {
  scrollToTop()
  showBasicGuide.value = true
}

function startMaskNextGuide() {
  scrollToTop()
  showClickMaskGuide.value = true
}

function startCustomMaskGuide() {
  scrollToTop()
  showCustomMaskGuide.value = true
}

function startNoMaskGuide() {
  scrollToTop()
  showNoMaskGuide.value = true
}

function startCustomHighlightGuide() {
  scrollToTop()
  showCustomHighlightGuide.value = true
}

function startCustomContentGuide() {
  scrollToTop()
  showCustomContentGuide.value = true
}

function startControlGuide() {
  scrollToTop()
  controlCurrent.value = 2
  showControlGuide.value = true
}

// 通用事件处理
function handleFinish() {
  console.log('引导完成')
  showBasicGuide.value = false
  showClickMaskGuide.value = false
  showCustomMaskGuide.value = false
  showNoMaskGuide.value = false
  showCustomHighlightGuide.value = false
  showCustomContentGuide.value = false
  showControlGuide.value = false
}

function handleSkip() {
  console.log('引导跳过')
  showBasicGuide.value = false
  showClickMaskGuide.value = false
  showCustomMaskGuide.value = false
  showNoMaskGuide.value = false
  showCustomHighlightGuide.value = false
  showCustomContentGuide.value = false
  showControlGuide.value = false
}

function handleChange(currentIndex) {
  console.log('当前步骤:', currentIndex)
}
</script>

<style lang="scss" scoped>
.guide-container {
  padding: 0;

  .guide-step {
    width: fit-content;
    margin: 20px auto;

    .guide-item {
      padding: 20px;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      background-color: #f8f8f8;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      min-width: 250px;

      .guide-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
        display: block;
      }

      .guide-content {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
        display: block;
      }
    }
  }
}

.button-group {
  padding: 10px 0;
  text-align: center;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  .custom-text {
    font-size: 14px;
    color: #333;
  }
}

.custom-button {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;

  &.custom-next {
    background-color: #34d19d;
    color: #fff;
  }

  &.custom-finish {
    background-color: #34d19d;
    color: #fff;
  }
}

.custom-highlight {
  position: fixed;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}
</style>
