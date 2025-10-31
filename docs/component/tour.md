# Guide 漫游组件

用于引导用户逐步了解应用功能的组件，可以高亮显示页面中的特定元素并提供说明。

## 基本使用

通过 `steps` 属性设置引导步骤，通过 `v-model` 控制显示隐藏。

```html
<template>
  <view>
    <view class="tour-item" id="step1">
      <text class="tour-title">第一步</text>
      <text class="tour-content">这是引导的第一步，介绍基本功能</text>
    </view>
    
    <view class="tour-item" id="step2">
      <text class="tour-title">第二步</text>
      <text class="tour-content">这是引导的第二步，展示更多功能</text>
    </view>
    
    <wd-tour 
      :model-value="showTour" 
      :steps="steps" 
      v-model:current="current"
      @finish="onFinish"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showTour = ref(true)
const current = ref(0)

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

### 自定义引导内容

通过 `content` 插槽可以自定义引导内容。

```html
<wd-tour :model-value="showTour" :steps="steps">
  <template #content>
    <view class="custom-content">
      <wd-icon name="help-circle-filled" size="22px"></wd-icon>
      <text class="custom-text">自定义引导内容区域</text>
    </view>
  </template>
</wd-tour>
```

### 自定义高亮区域

通过 `highlight` 插槽可以自定义高亮区域样式。

```html
<wd-tour :model-value="showTour" :steps="steps">
  <template #highlight="{ elementInfo }">
    <view class="custom-highlight" :style="getCustomHighlightStyle(elementInfo)"></view>
  </template>
</wd-tour>
```

### 自定义按钮

通过 `prev`、`next`、`skip`、`finish` 插槽可以自定义按钮。

```html
<wd-tour :model-value="showTour" :steps="steps" next-text="继续" finish-text="知道了">
  <template #next>
    <view class="custom-button custom-next">下一步</view>
  </template>
  <template #finish>
    <view class="custom-button custom-finish">完成</view>
  </template>
</wd-tour>
```

### 点击蒙版继续

通过 `click-mask-next` 属性可以设置点击蒙版是否可以下一步。

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  :click-mask-next="true"
/>
```

### 自定义蒙版样式

通过 `mask-color`、`offset`、`border-radius`、`padding` 属性可以自定义蒙版样式。

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  mask-color="rgba(255, 0, 0, 0.6)"
  :offset="40"
  :border-radius="15"
  :padding="20"
/>
```

### 关闭蒙版

通过 `mask` 属性可以控制是否显示蒙版。

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  :mask="false"
/>
```

### 控制当前步骤

通过 `v-model:current` 可以控制当前步骤。

```html
<view>
  <wd-button @click="current = 2">跳转到第三步</wd-button>
  <wd-tour 
    :model-value="showTour" 
    :steps="steps" 
    v-model:current="current"
  />
</view>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| v-model | 是否显示引导组件 | boolean | - | false |
| steps | 引导步骤列表 | array | - | [] |
| current | 当前步骤索引，支持 v-model:current 双向绑定 | number | - | 0 |
| mask | 蒙版是否显示 | boolean | - | true |
| mask-color | 蒙版颜色（支持 rgba 格式） | string | - | rgba(0, 0, 0, 0.5) |
| offset | 引导提示框与高亮框的间距 | number | - | 20 |
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
| z-index | 引导组件的层级 | number | - | 999998 |
| show-tour-buttons | 是否显示引导按钮 | boolean | - | true |

## Steps 数据结构

| 属性 | 说明 | 类型 |
|------|------|------|
| element | 需要高亮的元素选择器 | string |
| content | 引导文字内容（支持富文本） | string |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| change | 步骤改变时触发 | `{currentIndex: number }` |
| prev | 点击上一步按钮时触发 | `{ oldCurrent: number, current: number, total: number, isUp: number }` |
| next | 点击下一步按钮时触发 | `{ oldCurrent: number, current: number, total: number, isUp: number }` |
| finish | 点击完成按钮时触发 | `{ current: number, total: number }` |
| skip | 点击跳过按钮时触发 | `{ current: number, total: number }` |
| error | 查找引导元素出错时触发 | `{ message: string, element: string }` |

## Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| highlight | 自定义高亮区域 | elementInfo: 元素位置信息 |
| content | 自定义引导内容 | - |
| prev | 自定义上一步按钮 | - |
| next | 自定义下一步按钮 | - |
| skip | 自定义跳过按钮 | - |
| finish | 自定义完成按钮 | - |

## Methods

通过 ref 可以获取到组件实例，调用组件提供的方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| handlePrev | 切换到上一步 | - |
| handleNext | 切换到下一步 | - |
| handleSkip | 跳过引导 | - |
| handleFinish | 完成引导 | - |

## 注意事项

1. 确保要高亮的元素在页面中存在且可选择
2. 在自定义导航栏的情况下，需要设置 `custom-nav` 和适当的 `top-safety-offset` 值
3. 引导组件会自动处理滚动，确保高亮元素在可视区域内
4. 可以通过 `mask` 属性控制是否显示遮罩层
5. 使用自定义高亮区域时，注意避免遮挡引导操作按钮
6. 在不同平台（H5、微信小程序等）中，插槽的使用方式可能略有差异
7. 建议在使用时添加 `v-if` 或 `v-show` 条件渲染，以确保组件正确初始化

## 主题定制

组件支持通过 CSS 变量定制主题，可以修改以下变量：

```scss
// 蒙版颜色
--wd-tour-mask-color: rgba(0, 0, 0, 0.5);

// 引导框背景色
--wd-tour-popover-bg-color: #ffffff;

// 按钮背景色
--wd-tour-button-primary-bg-color: #007aff;

// 按钮文字颜色
--wd-tour-button-color: #ffffff;
```

## 常见问题

### 为什么在微信小程序中自定义插槽不显示？

在微信小程序中使用条件渲染与插槽结合时可能会出现问题，建议使用 `v-show` 替代 `v-if` 或将条件判断移到插槽内部。

### 为什么高亮区域会闪烁？

这通常是因为组件初始化时元素信息尚未获取完成导致的。组件已优化初始状态，避免闪烁问题。

### 如何解决点击问题？

如果自定义高亮区域遮挡了操作按钮，可以调整 `z-index` 或修改自定义高亮区域的样式，确保按钮可点击。