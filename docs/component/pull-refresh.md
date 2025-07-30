# PullRefresh 下拉刷新

用于提供下拉刷新的交互操作。

## 基础用法

下拉刷新时会触发 `refresh` 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 `v-model` 设置为 `false`，表示加载完成。

```html
<wd-pull-refresh v-model="loading" @refresh="onRefresh">
  <view class="content">
    <wd-cell v-for="item in list" :key="item" :title="`列表项 ${item}`" />
  </view>
</wd-pull-refresh>
```

```typescript
import { ref } from 'vue'

const loading = ref(false)
const list = ref([1, 2, 3, 4, 5])

function onRefresh() {
  setTimeout(() => {
    list.value = [1, 2, 3, 4, 5, 6]
    loading.value = false
  }, 2000)
}
```

## 自定义文案

通过 `pulling-text`、`loosing-text`、`loading-text`、`success-text` 属性可以自定义不同状态下的文案。

```html
<wd-pull-refresh 
  v-model="loading" 
  pulling-text="用力拉..." 
  loosing-text="快松手..." 
  loading-text="拼命加载中..." 
  success-text="加载成功！"
  @refresh="onRefresh"
>
  <view class="content">
    <!-- 内容 -->
  </view>
</wd-pull-refresh>
```

## 成功提示

通过 `success-text` 可以设置刷新成功后的提示文案，通过 `success-duration` 可以设置提示展示时长。

```html
<wd-pull-refresh 
  v-model="loading" 
  success-text="刷新成功" 
  :success-duration="1500"
  @refresh="onRefresh"
>
  <view class="content">
    <!-- 内容 -->
  </view>
</wd-pull-refresh>
```

## 自定义插槽

通过插槽可以自定义下拉刷新过程中的提示内容。

```html
<wd-pull-refresh v-model="loading" @refresh="onRefresh">
  <template #pulling="{ distance }">
    <view class="custom-slot">
      <wd-icon name="arrow-down" size="20" />
      <text>下拉距离: {{ Math.round(distance) }}px</text>
    </view>
  </template>
  
  <template #loosing="{ distance }">
    <view class="custom-slot">
      <wd-icon name="arrow-up" size="20" />
      <text>释放距离: {{ Math.round(distance) }}px</text>
    </view>
  </template>
  
  <template #loading>
    <view class="custom-slot">
      <wd-loading size="20" />
      <text>正在刷新数据...</text>
    </view>
  </template>
  
  <template #success>
    <view class="custom-slot">
      <wd-icon name="check" size="20" color="#34d19d" />
      <text>刷新完成</text>
    </view>
  </template>
  
  <view class="content">
    <!-- 内容 -->
  </view>
</wd-pull-refresh>
```

## 禁用状态

通过 `disabled` 属性可以禁用下拉刷新。

```html
<wd-pull-refresh v-model="loading" disabled @refresh="onRefresh">
  <view class="content">
    <!-- 内容 -->
  </view>
</wd-pull-refresh>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|------|------|------|-------|--------|---------|
| v-model | 是否处于加载中状态 | `boolean` | - | `false` | - |
| disabled | 是否禁用下拉刷新 | `boolean` | - | `false` | - |
| pulling-text | 下拉过程提示文案 | `string` | - | `'下拉即可刷新...'` | - |
| loosing-text | 释放过程提示文案 | `string` | - | `'释放即可刷新...'` | - |
| loading-text | 加载过程提示文案 | `string` | - | `'加载中...'` | - |
| success-text | 刷新成功提示文案 | `string` | - | `''` | - |
| success-duration | 刷新成功提示展示时长(ms) | `number \| string` | - | `500` | - |
| animation-duration | 动画时长(ms) | `number \| string` | - | `300` | - |
| head-height | 顶部内容高度 | `number \| string` | - | `50` | - |
| pull-distance | 触发下拉刷新的距离 | `number \| string` | - | 与 `head-height` 相同 | - |

### Events

| 事件名 | 说明 | 参数 | 最低版本 |
|--------|------|------|---------|
| refresh | 下拉刷新时触发 | - | - |
| change | 拖拽时或状态改变时触发 | `{ status: PullRefreshStatus, distance: number }` | - |

### Slots

| 名称 | 说明 | 参数 | 最低版本 |
|------|------|------|---------|
| default | 内容区 | - | - |
| normal | 非下拉状态时顶部内容 | - | - |
| pulling | 下拉过程中顶部内容 | `{ distance: number }` | - |
| loosing | 释放过程中顶部内容 | `{ distance: number }` | - |
| loading | 加载过程中顶部内容 | `{ distance: number }` | - |
| success | 刷新成功时顶部内容 | - | - |

### Methods

通过 ref 可以获取到 PullRefresh 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|--------|------|------|--------|---------|
| finish | 结束刷新状态 | - | - | - |

### 类型定义

组件导出以下类型定义：

```typescript
import type { PullRefreshProps, PullRefreshStatus } from '@/uni_modules/wot-design-uni'

type PullRefreshStatus = 'normal' | 'pulling' | 'loosing' | 'loading' | 'success'
```

## 常见问题

### 在某些情况下拖拽不生效？

请检查是否在页面滚动容器上设置了 `overflow: hidden` 或其他影响滚动的样式。

### 如何实现上拉加载更多？

可以结合 `wd-loadmore` 组件实现上拉加载更多功能。

```html
<wd-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <view class="content">
    <wd-cell v-for="item in list" :key="item" :title="item" />
  </view>
  <wd-loadmore v-model="loading" @loadmore="onLoadmore" />
</wd-pull-refresh>
```