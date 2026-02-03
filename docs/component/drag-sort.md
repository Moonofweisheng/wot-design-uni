# DragSort 拖拽排序

拖拽排序组件，用于列表项的拖拽排序。
该组件有两种排序模式：
- **移动排序 (move)**：默认模式，元素在排序过程中会移动到新的位置，即元素会按数组顺序进行重新排序。
- **交换排序 (swap)**：元素在排序过程中会交换位置，不改变其他元素位置，即元素和元素之间直接交换。

请根据需求选择合适的排序模式。

## 代码演示

### 基础用法

通过 `v-model` 绑定列表数据。

```html
<wd-drag-sort v-model="list" @change="handleChange">
  <wd-drag-sort-item v-for="(item, index) in list" :key="item.id" :index="index" class="drag-item">
    <view class="item">
      <wd-icon name="picture" size="24px" />
      <text class="text">{{ item.text }}</text>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>

<style>
.drag-item {
  width: 33.33%;
}
</style>
```

```javascript
const list = ref([
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
  { id: '5', text: 'Item 5' },
  { id: '6', text: 'Item 6' }
])

function handleChange(val) {
  console.log('list changed', val)
}
```

### 长按触发时间

通过 `long-press-duration` 属性设置长按触发拖拽的时间，单位 ms，默认为 100ms。

```html
<wd-drag-sort v-model="list" :long-press-duration="500">
  <!-- ... -->
</wd-drag-sort>
```

### 禁用拖拽与固定元素

- **禁用拖拽 (disabled)**：设置 `disabled` 属性后，元素**不能被抓取**，但仍然**参与排序布局**（即可以被其他拖拽的元素“挤开”）。
- **固定元素 (sortable)**：设置 `sortable` 属性为 `false` 后，元素既**不能被抓取**，也**不参与排序**（即固定在原位，不会被“挤开”）。

```html
<!-- 禁用特定项 (Disabled) -->
<wd-drag-sort v-model="list">
  <wd-drag-sort-item v-for="(item, index) in list" :key="item.id" :index="index" :disabled="item.disabled">
    <view class="item">
      <text>{{ item.text }}</text>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>

<!-- 固定特定项 (Sortable) -->
<wd-drag-sort v-model="list">
  <wd-drag-sort-item v-for="(item, index) in list" :key="item.id" :index="index" :sortable="item.sortable">
    <view class="item">
      <text>{{ item.text }}</text>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>
```

### 自定义拖拽手柄

设置 `use-drag-handle` 属性，并在 `wd-drag-sort-item` 内部使用 `wd-drag-handle` 组件。

`wd-drag-handle` 可以放置在 `wd-drag-sort-item` 内部任意位置，无需手动绑定事件。

```html
<wd-drag-sort v-model="list" use-drag-handle>
  <wd-drag-sort-item v-for="(item, index) in list" :key="item.id" :index="index">
    <view class="item">
      <text>{{ item.text }}</text>
      <!-- 使用 wd-drag-handle 组件 -->
      <wd-drag-handle custom-class="my-handle">
        <wd-icon name="list" />
      </wd-drag-handle>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>
```

### 页面滚动

为了防止拖拽时触发页面级别的滚动（“橡皮筋”效果），建议结合 `<page-meta>` 将页面滚动锁定，并完全托管滚动逻辑。

1. 使用 `<page-meta :page-style="'overflow:' + (isScrollViewDragging ? 'hidden' : 'overflow')">` 锁定页面滚动。
2. 监听 `wd-drag-sort` 的 `scroll` 事件，手动更新 `uni.pageScrollTo` 实现自动滚动。

```html
<template>
  <page-meta page-style="overflow: hidden"></page-meta>
  <view class="page-wraper">
      <wd-drag-sort
        v-model="list"
        :scroll-top="scrollTop"
        @scroll="onAutoScroll"
        @drag-start="handleDragStart"
        @drag-end="handleDragEnd"
      >
        <!-- ... items ... -->
      </wd-drag-sort>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const scrollTop = ref(0)
const currentScrollTop = ref(0)

onPageScroll((e) => {
	currentScrollTop.value = e.scrollTop
})
// 自动滚动回调
const onAutoScroll = ({
	dx,
	dy
}) => {
	if (dy !== 0) {
		uni.pageScrollTo({
			scrollTop: currentScrollTop.value + dy,
			duration: 0
		})
	}
}
const handleDragStart = (index) => {
	isScrollViewDragging.value = true
}
const handleDragEnd = (index) => {
	isScrollViewDragging.value = false
}

</script>
```
### 局部滚动

如果页面本身较长，或者需要在一个固定高度的区域内滚动，可以使用 `scroll-view` 组件。

为了防止拖拽时触发 `scroll-view` 的滚动，建议结合 css 样式 `pointer-events: none` 将滚动锁定，并完全托管滚动逻辑。

1. 使用 `pointer-events: none` 锁定scroll-view滚动。
2. 监听 `wd-drag-sort` 的 `scroll` 事件，手动更新 `scrollTop` 实现自动滚动。

```html
<scroll-view
  scroll-y
  style="height: calc(100vh - env(safe-area-inset-bottom))"
  :style="{ pointerEvents: canScrollY ? 'auto' : 'none' }"
  :scroll-top="currentScrollTop"
  @scroll="onScroll">
  <wd-drag-sort
    v-model="list"
    :scroll-top="scrollTop"
    @scroll="onAutoScroll"
    @drag-start="handleDragStart"
    @drag-end="handleDragEnd"
  >
    <!-- ... items ... -->
  </wd-drag-sort>
</scroll-view>
<script setup>
const scrollTop = ref(0)
const currentScrollTop = ref(0)
const canScrollY = ref(true)

function onScroll(e: any) {
  scrollTop.value = e.detail.scrollTop
}
function handleScroll({ dy }: { dx: number; dy: number }) {
  currentScrollTop.value += dy
}
const handleDragStart = (index) => {
	canScrollY.value = true
}
const handleDragEnd = (index) => {
	canScrollY.value = false
}
```

### 动态增删元素

组件支持动态增加或删除列表项，`v-model` 绑定的数据变化时，组件会自动更新布局。

```html
<wd-drag-sort v-model="list">
  <wd-drag-sort-item v-for="(item, index) in list" :key="item.id" :index="index">
    <!-- ... -->
  </wd-drag-sort-item>
</wd-drag-sort>

<view class="actions">
  <wd-button @click="addItem">添加一项</wd-button>
  <wd-button @click="removeItem">删除一项</wd-button>
</view>

<script setup>
// ...
function addItem() {
  list.value.push({ id: Date.now(), text: 'New Item' })
}
function removeItem() {
  list.value.pop()
}
</script>
```

### 伪 Grid 严格模式 (实时)

使用 Flex 模拟 Grid 布局，并开启 `strict` 和 `realtime` 模式。
在严格模式下，**只有尺寸相同的元素**才能进行交换。不同尺寸的元素即使被拖拽到重叠位置，也不会触发交换。

```html
<wd-drag-sort v-model="listPseudo" sort-type="swap" strict realtime style="display: flex; flex-wrap: wrap; gap: 10px">
  <wd-drag-sort-item
    v-for="(item, index) in listPseudo"
    :key="item.id"
    :index="index"
    :style="{ width: item.large ? 'calc(66.66% - 5px)' : 'calc(33.33% - 7px)' }"
  >
    <view
      class="item"
      :style="{ height: '100px', backgroundColor: item.large ? '#f0f9eb' : '#fff', color: item.large ? '#67c23a' : '#606266' }"
    >
      <text>{{ item.text }}</text>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>
```

### 混合尺寸 Grid 布局 (CSS Grid)

使用原生 CSS Grid (`display: grid`) 布局，可以轻松实现复杂的跨行跨列布局。
配合 `strict` 模式，确保交换逻辑的合理性。

```html
<wd-drag-sort
  v-model="listMix"
  strict
  sort-type="swap"
  :realtime="false"
  :scroll-top="scrollTop"
  custom-style="display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 80px; gap: 10px;"
  @change="handleChange"
  @scroll="handleScroll"
>
  <wd-drag-sort-item
    v-for="(item, index) in listMix"
    :key="item.id"
    :index="index"
    :class="[`span-col-${item.w}`, `span-row-${item.h}`]"
    custom-style="width: 100% !important; height: 100% !important"
  >
    <view class="item-mix" :style="{ backgroundColor: item.color, height: '100%' }">
      <text class="text-white">{{ item.text }}</text>
    </view>
  </wd-drag-sort-item>
</wd-drag-sort>

<style>
/* CSS Grid 跨列跨行样式 */
.span-col-1 { grid-column: span 1; }
.span-col-2 { grid-column: span 2; }
.span-row-1 { grid-row: span 1; }
.span-row-2 { grid-row: span 2; }

.item-mix {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
}
</style>
```

## API

### DragSort Props

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|-----|-------|
| v-model | 列表数据 | Array | - |
| long-press-duration | 长按触发拖拽的时间，单位 ms | number | 100 |
| disabled | 是否禁用整个组件的拖拽 | boolean | false |
| realtime | 是否在拖拽过程中实时交换位置。注意：`sort-type="move"` 时不支持开启此选项。 | boolean | false |
| scrollable | 是否在拖拽至边缘时自动滚动 | boolean | false |
| edge-threshold | 触发自动滚动的边缘距离 | number | 50 |
| scroll-speed | 自动滚动的速度 | number | 10 |
| scroll-top | 当前页面的滚动位置，用于计算自动滚动 | number | 0 |
| scroll-area | 自动滚动触发区域配置，对象包含 top, bottom, height 属性 | object | - |
| feedback | 是否启用震动反馈（仅 App/MP） | boolean | true |
| sort-type | 排序方式，可选值为 `move`（移动插队） 或 `swap`（交换位置） | string | 'move' |
| use-drag-handle | 是否使用自定义拖拽手柄 | boolean | false |
| placeholder-class | 占位符自定义样式类 | string | - |
| strict | 严格模式。开启后，只有尺寸相同的元素才能进行交换（仅在 `sort-type="swap"` 时生效）。 | boolean | false |

### DragSortItem Props

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|-----|-------|
| index | 当前项在列表中的索引 | number | - |
| sortable | 是否允许拖拽该项 | boolean | true |
| disabled | 是否禁用该项 | boolean | false |

### DragHandle Props

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|-----|-------|
| custom-class | 自定义样式类 | string | - |
| custom-style | 自定义样式 | string | - |

### DragSort Events

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| change | 排序发生变化时触发 | (value: any[], { oldIndex, newIndex }) |
| drag-start | 开始拖拽时触发 | (index: number) |
| drag-end | 结束拖拽时触发 | - |
| dragging | 拖拽过程中触发 | (event: { index, delta, touch }) |
| scroll | 自动滚动时触发 | (event: { dx, dy }) |

### DragSort Slots

| 插槽名 | 说明 |
|-------|------|
| default | 默认插槽，用于放置 `wd-drag-sort-item` |
| placeholder | 拖拽时显示的占位符插槽 |

### DragSortItem Slots

| 插槽名 | 说明 |
|-------|------|
| default | 默认插槽，自定义内容 |

### DragHandle Slots

| 插槽名 | 说明 |
|-------|------|
| default | 默认插槽，自定义手柄内容 |
