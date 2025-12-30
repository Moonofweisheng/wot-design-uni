---
version: $LOWEST_VERSION$
---

# Waterfall 瀑布流

用于展示图片等不规则高度内容的多列布局，支持动态加载、错误处理、已知高度优化等特性。

:::danger 平台差异
由于框架原因，微信小程序、支付宝小程序、钉钉小程序等平台不支持动态增删 item，仅 H5 和 APP 平台支持。详见 [uni-app issues#4847](https://github.com/dcloudio/uni-app/issues/4847)。
:::

## 基础用法

瀑布流由 `wd-waterfall` 容器组件和 `wd-waterfall-item` 子项组件组成。

通过插槽的 `loaded` 回调通知组件内容加载完成，组件会自动计算高度并进行布局。

```html
<wd-waterfall @load-end="loadEnd">
  <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
    <template #default="{ loaded }">
      <view class="waterfall-item">
        <image mode="widthFix" class="waterfall-image" :src="item.url" @load="loaded" @error="loaded" />
        <view class="item-title">{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

```ts
import { ref, onMounted } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'

interface ListItem {
  id: number
  title: string
  url: string
}

const list = ref<ListItem[]>([])

async function getData() {
  // 模拟获取数据
  return Array(10).fill(0).map((_, i) => ({
    id: i,
    title: `标题${i}`,
    url: `https://example.com/image${i}.jpg`
  }))
}

function loadEnd() {
  console.log('本批次加载完成')
}

onMounted(async () => {
  list.value = await getData()
})

// 触底加载更多
onReachBottom(async () => {
  const newData = await getData()
  list.value.push(...newData)
})
```

```scss
.waterfall-item {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.waterfall-image {
  width: 100%;
}

.item-title {
  padding: 8px;
}
```

## 自定义列数

通过 `columns` 属性设置列数，默认为 2 列。列数变化时组件会自动重新布局。

```html
<wd-waterfall :columns="3" :column-gap="4" :row-gap="4">
  <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
    <template #default="{ loaded }">
      <image mode="widthFix" :src="item.url" @load="loaded" @error="loaded" />
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

## 已知高度

当图片尺寸已知时，可以通过 `width` 和 `height` 属性告知组件，实现更快的布局计算，无需等待图片加载完成。

插槽会提供计算后的 `imageHeight`（根据列宽等比缩放后的高度），可用于设置图片容器高度。

```html
<wd-waterfall>
  <wd-waterfall-item 
    v-for="(item, index) in list" 
    :key="item.id" 
    :order="index"
    :width="item.img.width"
    :height="item.img.height"
  >
    <template #default="{ imageHeight }">
      <view class="waterfall-item">
        <image 
          mode="aspectFill" 
          :style="{ height: `${imageHeight}px` }" 
          :src="item.url" 
        />
        <view class="item-content">{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

```ts
interface ListItem {
  id: number
  title: string
  url: string
  img: {
    width: number
    height: number
  }
}

const list = ref<ListItem[]>([
  {
    id: 1,
    title: '标题',
    url: 'https://example.com/image.jpg',
    img: { width: 300, height: 400 }
  }
])
```

## 错误处理

通过 `error-strategy` 属性设置图片加载失败时的处理策略，插槽提供 `status` 状态用于条件渲染。

### 状态说明

| 状态 | 说明 |
|------|------|
| `success` | 加载成功，显示正常内容 |
| `fail` | 加载失败，可显示占位图 |
| `timeout` | 加载超时 |
| `over` | 最终失败状态（重试后仍失败） |

### 策略说明

| 策略 | 说明 |
|------|------|
| `default` | 默认模式，失败后直接进入 `over` 状态 |
| `placeholder` | 失败后显示占位图 |
| `retry` | 失败后自动重试指定次数 |
| `retryHard` | 完整模式：重试 + 占位图 + 兜底 |

```html
<wd-waterfall error-strategy="retryHard" :retry-count="2" :max-wait="1500">
  <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
    <template #default="{ loaded, status, onFallbackLoad, onFallbackError, message }">
      <view class="waterfall-item">
        <!-- 成功状态 -->
        <image 
          v-if="status === 'success'" 
          mode="widthFix" 
          :src="item.url" 
          @load="loaded" 
          @error="loaded" 
        />
        
        <!-- 失败状态：显示占位图 -->
        <view v-else-if="status === 'fail'" class="fallback-container">
          <image 
            :src="placeholderSrc" 
            mode="aspectFill" 
            @load="onFallbackLoad" 
            @error="onFallbackError" 
          />
        </view>
        
        <!-- 超时状态 -->
        <view v-else-if="status === 'timeout'" class="timeout-placeholder">
          加载超时
        </view>
        
        <!-- 最终兜底 -->
        <view v-else class="final-fallback">
          {{ message || '图片加载失败' }}
        </view>
        
        <view class="item-content">{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

## 下拉刷新

配合页面的下拉刷新功能，调用组件的 `reset` 方法清空并重置瀑布流。

```html
<wd-waterfall ref="waterfallRef">
  <!-- ... -->
</wd-waterfall>
```

```ts
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import type { WaterfallExpose } from '@/uni_modules/wot-design-uni/components/wd-waterfall/types'

const waterfallRef = ref<WaterfallExpose>()
const list = ref<ListItem[]>([])

onPullDownRefresh(async () => {
  try {
    // 获取新数据
    const newData = await fetchData()
    list.value = newData
    
    // 重置瀑布流
    waterfallRef.value?.reset()
  } finally {
    uni.stopPullDownRefresh()
  }
})
```

## reflow 与 reset 的区别

组件提供了两个方法用于不同场景的布局更新：

### reflow - 重新布局

保留现有数据，仅重新计算所有项目的位置。适用于布局参数变化但数据不变的场景。

```ts
// 场景：动态切换列数
function changeColumns(num: number) {
  columns.value = num
  // 列数变化时组件会自动调用 reflow，通常无需手动调用
}

// 场景：手动触发重新布局
waterfallRef.value?.reflow()
```

**使用场景：**
- 列数 `columns` 变化（组件会自动调用）
- 列间距 `column-gap` 变化（组件会自动调用）
- 行间距 `row-gap` 变化（组件会自动调用）
- 容器宽度变化后需要重新计算

### reset - 清空重置

清空所有数据和队列，完全重置为初始状态。适用于数据源完全更换的场景。

```ts
// 场景：下拉刷新
onPullDownRefresh(async () => {
  const newData = await fetchData()
  list.value = newData
  waterfallRef.value?.reset()
})

// 场景：切换分类/Tab
function switchCategory(category: string) {
  list.value = []
  waterfallRef.value?.reset()
  loadData(category)
}
```

**使用场景：**
- 下拉刷新
- 切换数据源/分类
- 清空列表重新加载

### 对比总结

| 方法 | 数据处理 | 触发时机 | 典型场景 |
|------|----------|----------|----------|
| `reflow` | 保留数据，重新排版 | 布局参数变化时自动调用 | 切换列数、调整间距 |
| `reset` | 清空所有数据 | 需手动调用 | 下拉刷新、切换数据源 |

## 自动加载更多

当内容高度不足以填满可视区域时，组件会自动触发 `auto-load-more` 事件，通知加载更多数据。

```html
<wd-waterfall ref="waterfallRef" @auto-load-more="handleLoadMore">
  <!-- ... -->
</wd-waterfall>
<wd-loadmore :state="loadMoreStatus" />
```

```ts
const loading = ref(false)
const loadMoreStatus = ref<'loading' | 'finished' | 'error'>('loading')

async function handleLoadMore() {
  if (loading.value || loadMoreStatus.value !== 'loading') return
  
  loading.value = true
  try {
    const res = await fetchData(currentPage.value + 1)
    
    if (res.list.length === 0) {
      loadMoreStatus.value = 'finished'
      return
    }
    
    list.value.push(...res.list)
    currentPage.value++
    
    // 等待排版完成后更新状态
    waterfallRef.value?.loadDone(() => {
      loadMoreStatus.value = res.hasMore ? 'loading' : 'finished'
    })
  } catch (error) {
    loadMoreStatus.value = 'error'
  } finally {
    loading.value = false
  }
}
```

## 动态增删

:::danger 平台限制
由于框架限制，小程序平台（微信、支付宝、钉钉等）仅支持在列表尾部进行添加和删除操作。在非尾部位置进行增删会导致布局异常。头部插入、中间插入、随机位置插入等操作仅在 H5 和 APP 平台支持。详见 [uni-app issues#4847](https://github.com/dcloudio/uni-app/issues/4847)。
:::

```html
<view class="button-row">
  <!-- 仅 H5 和 APP 支持 -->
  <!-- #ifdef WEB || APP-PLUS -->
  <wd-button @click="insertAtBeginning">头部插入</wd-button>
  <wd-button @click="insertAtMiddle">中间插入</wd-button>
  <wd-button @click="insertRandom">随机插入</wd-button>
  <!-- #endif -->
  
  <!-- 所有平台支持 -->
  <wd-button @click="insertAtEnd">尾部添加</wd-button>
</view>
```

```ts
// 尾部插入（所有平台支持）
function insertAtEnd() {
  const newItem = { id: uuid++, title: '新项目', url: '...' }
  list.value.push(newItem)
}

// 头部插入（仅 H5/APP 支持）
function insertAtBeginning() {
  const newItem = { id: uuid++, title: '新项目', url: '...' }
  list.value.unshift(newItem)
}

// 中间插入（仅 H5/APP 支持）
function insertAtMiddle() {
  const newItem = { id: uuid++, title: '新项目', url: '...' }
  const middleIndex = Math.floor(list.value.length / 2)
  list.value.splice(middleIndex, 0, newItem)
}

// 删除项目（小程序仅支持删除尾部项目）
function deleteItem(item: ListItem) {
  const index = list.value.indexOf(item)
  if (index !== -1) {
    list.value.splice(index, 1)
  }
}
```

## Waterfall Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|------|------|------|--------|--------|----------|
| columns | 列数 | `number` | - | 2 | $LOWEST_VERSION$ |
| column-gap | 列间距（px） | `number` | - | 8 | $LOWEST_VERSION$ |
| row-gap | 行间距（px） | `number` | - | 8 | $LOWEST_VERSION$ |
| show | 是否显示，用于控制页面切换时的排版行为 | `boolean` | - | - | $LOWEST_VERSION$ |
| error-strategy | 错误处理策略 | `ErrorStrategy` | `default` / `placeholder` / `retry` / `retryHard` | `default` | $LOWEST_VERSION$ |
| retry-count | 重试次数（仅 retry/retryHard 模式有效） | `number` | - | 1 | $LOWEST_VERSION$ |
| max-wait | 最大等待时间（毫秒） | `number` | - | 1500 | $LOWEST_VERSION$ |
| custom-class | 自定义类名 | `string` | - | - | $LOWEST_VERSION$ |
| custom-style | 自定义样式 | `string` | - | - | $LOWEST_VERSION$ |

### ErrorStrategy

错误处理策略类型：

| 值 | 说明 | 最低版本 |
|------|------|----------|
| `default` | 默认模式，加载失败后直接结束 | $LOWEST_VERSION$ |
| `placeholder` | 失败后显示占位图 | $LOWEST_VERSION$ |
| `retry` | 失败后自动重试 | $LOWEST_VERSION$ |
| `retryHard` | 完整模式：重试 + 占位图 + 兜底 | $LOWEST_VERSION$ |

## Waterfall Events

| 事件名 | 说明 | 参数 | 最低版本 |
|--------|------|------|----------|
| load-start | 开始加载时触发 | - | $LOWEST_VERSION$ |
| load-end | 本批次加载完成时触发 | - | $LOWEST_VERSION$ |
| auto-load-more | 内容不足时自动触发加载更多 | - | $LOWEST_VERSION$ |

## Waterfall Methods

通过 ref 获取组件实例后调用。

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|--------|------|------|--------|----------|
| reflow | 重新布局（保留数据，重新计算位置） | - | - | $LOWEST_VERSION$ |
| reset | 清空并重置（清除所有数据） | - | - | $LOWEST_VERSION$ |
| loadDone | 注册加载完成回调 | `handler: () => void` | - | $LOWEST_VERSION$ |
| checkAndLoadMore | 手动检查并触发加载更多 | - | - | $LOWEST_VERSION$ |
| loadStatus | 当前加载状态（只读属性） | - | `'idle' \| 'busy'` | $LOWEST_VERSION$ |

## Waterfall 外部样式类

| 类名 | 说明 | 最低版本 |
|------|------|----------|
| custom-class | 根节点样式类 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |

## WaterfallItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|------|------|------|--------|--------|----------|
| order | 项目索引，用于排序 | `number` | - | - | $LOWEST_VERSION$ |
| width | 已知宽度（px），与 height 配合使用可跳过加载等待 | `number` | - | - | $LOWEST_VERSION$ |
| height | 已知高度（px），与 width 配合使用可跳过加载等待 | `number` | - | - | $LOWEST_VERSION$ |
| custom-class | 自定义类名 | `string` | - | - | $LOWEST_VERSION$ |
| custom-style | 自定义样式 | `string` | - | - | $LOWEST_VERSION$ |

## WaterfallItem Slot

| 名称 | 说明 | 参数 | 最低版本 |
|------|------|------|----------|
| default | 默认插槽 | `{ key, loaded, columnWidth, imageHeight, status, message, onFallbackLoad, onFallbackError }` | $LOWEST_VERSION$ |

### 插槽参数说明

:::warning 关于 key 参数
`key` 参数由组件内部管理，用于在重试或刷新时强制更新插槽内容。请勿手动修改此值。
:::

| 参数 | 说明 | 类型 | 最低版本 |
|------|------|------|----------|
| key | 插槽唯一标识，用于内部强制刷新，请勿修改 | `string` | $LOWEST_VERSION$ |
| loaded | 加载完成回调，图片 load/error 时调用 | `(event?: any) => void` | $LOWEST_VERSION$ |
| columnWidth | 列宽度（px） | `number` | $LOWEST_VERSION$ |
| imageHeight | 图片高度（px），仅已知高度模式有效 | `number` | $LOWEST_VERSION$ |
| status | 当前状态 | `'success' \| 'fail' \| 'timeout' \| 'over'` | $LOWEST_VERSION$ |
| message | 错误信息 | `string` | $LOWEST_VERSION$ |
| onFallbackLoad | 占位图加载成功回调 | `() => void` | $LOWEST_VERSION$ |
| onFallbackError | 占位图加载失败回调 | `() => void` | $LOWEST_VERSION$ |

## WaterfallItem 外部样式类

| 类名 | 说明 | 最低版本 |
|------|------|----------|
| custom-class | 根节点样式类 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |
