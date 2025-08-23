# Guide 引导组件

## 介绍

引导组件用于引导用户逐步了解应用功能的组件，可以高亮显示页面中的特定元素并提供说明。

## 引入

```typescript
import { WdGuide } from 'wot-design-uni/components/wd-guide'
```

## 基本用法

```vue
<template>
  <view>
    <button id="step1">第一步</button>
    <button id="step2">第二步</button>
    
    <wd-guide 
      v-model="showGuide" 
      :steps="steps" 
      @finish="onFinish"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showGuide = ref(true)

const steps = [
  {
    element: '#step1',
    content: '这是第一步的说明'
  },
  {
    element: '#step2',
    content: '这是第二步的说明'
  }
]

function onFinish() {
  console.log('引导完成')
}
</script>
```

## Props 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| v-model | 是否显示引导组件 | boolean | - | false |
| steps | 引导步骤列表 | GuideStep[] | - | [] |
| mask | 蒙版是否显示 | boolean | - | true |
| mask-color | 蒙版颜色（支持 rgba 格式） | string | - | rgba(0, 0, 0, 0.5) |
| offset | 引导框与高亮元素之间的间距 | string / number | - | 20 |
| duration | 动画持续时间（毫秒） | number | - | 300 |
| border-radius | 高亮区域的圆角大小 | number | - | 8 |
| padding | 高亮区域的内边距 | number | - | 10 |
| prev-text | 上一步按钮文字 | string | - | 上一步 |
| next-text | 下一步按钮文字 | string | - | 下一步 |
| skip-text | 跳过按钮文字 | string | - | 跳过 |
| finish-text | 完成按钮文字 | string | - | 完成 |
| bottom-safety-offset | 底部安全偏移量，用于滚动计算时确保元素周围有足够的空间 | number | - | 100 |
| top-safety-offset | 顶部安全偏移量，用于滚动计算时确保元素周围有足够的空间 | number | - | 0 |
| custom-nav | 是否自定义顶部导航栏 | boolean | - | false |
| click-mask-next | 点击蒙版是否可以下一步 | boolean | - | false |

## GuideStep 数据结构

| 属性 | 说明 | 类型 |
|------|------|------|
| element | 需要高亮的元素选择器 | string |
| content | 引导文字内容 | string |

## Events 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 引导显示状态改变时触发 | value: boolean |
| change | 步骤改变时触发 | currentIndex: number |
| prev | 点击上一步按钮时触发 | { current: number, total: number } |
| next | 点击下一步按钮时触发 | { current: number, total: number } |
| finish | 点击完成按钮时触发 | { current: number, total: number } |
| skip | 点击跳过按钮时触发 | { current: number, total: number } |
| error | 查找引导元素出错时触发 | { message: string, element: string } |

## Slots 插槽

| 插槽名 | 说明 |
|--------|------|
| content | 自定义引导内容 |
| prev | 自定义上一步按钮 |
| next | 自定义下一步按钮 |
| skip | 自定义跳过按钮 |
| finish | 自定义完成按钮 |

## 使用示例

### 自定义引导内容

```vue
<template>
  <wd-guide v-model="showGuide" :steps="steps">
    <template #content>
      <view class="custom-content">
        <text>自定义引导内容</text>
      </view>
    </template>
  </wd-guide>
</template>
```

### 自定义按钮

```vue
<template>
  <wd-guide v-model="showGuide" :steps="steps">
    <template #next>
      <view class="custom-next-button">继续</view>
    </template>
    <template #finish>
      <view class="custom-finish-button">知道了</view>
    </template>
  </wd-guide>
</template>
```

## 注意事项

1. 确保要高亮的元素在页面中存在且可选择
2. 在自定义导航栏的情况下，需要设置 `custom-nav` 和适当的 `top-safety-offset` 值
3. 引导组件会自动处理滚动，确保高亮元素在可视区域内
4. 可以通过 `mask` 属性控制是否显示遮罩层

## 主题定制

组件支持通过 CSS 变量定制主题，可以修改以下变量：

```scss
// 蒙版颜色
--wd-guide-mask-color: rgba(0, 0, 0, 0.5);

// 引导框背景色
--wd-guide-popover-bg-color: #ffffff;

// 按钮背景色
--wd-guide-button-primary-bg-color: #007aff;

// 按钮文字颜色
--wd-guide-button-color: #ffffff;
```