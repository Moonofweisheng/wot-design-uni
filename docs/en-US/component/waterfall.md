---
version: $LOWEST_VERSION$
---

# Waterfall

A multi-column layout component for displaying images and other content with irregular heights. Supports dynamic loading, error handling, and known-height optimization.

:::danger Platform Differences
Due to framework limitations, dynamic add/remove of items is not supported on WeChat Mini Program, Alipay Mini Program, DingTalk Mini Program, etc. Only H5 and APP platforms are supported. See [uni-app issues#4847](https://github.com/dcloudio/uni-app/issues/4847).
:::

## Basic Usage

Waterfall consists of `wd-waterfall` container component and `wd-waterfall-item` child components.

Use the `loaded` callback from the slot to notify the component when content is loaded. The component will automatically calculate height and perform layout.

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
  // Simulate fetching data
  return Array(10).fill(0).map((_, i) => ({
    id: i,
    title: `Title ${i}`,
    url: `https://example.com/image${i}.jpg`
  }))
}

function loadEnd() {
  console.log('Batch loading completed')
}

onMounted(async () => {
  list.value = await getData()
})

// Load more on reach bottom
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

## Custom Columns

Set the number of columns via `columns` property with a default of 2. The component will automatically re-layout when columns change.

```html
<wd-waterfall :columns="3" :column-gap="4" :row-gap="4">
  <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
    <template #default="{ loaded }">
      <image mode="widthFix" :src="item.url" @load="loaded" @error="loaded" />
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

## Known Height

When image dimensions are known, you can provide `width` and `height` properties to enable faster layout calculation without waiting for image loading.

The slot provides `imageHeight` (height scaled proportionally based on column width) for setting the image container height.

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
    title: 'Title',
    url: 'https://example.com/image.jpg',
    img: { width: 300, height: 400 }
  }
])
```

## Error Handling

Set the `error-strategy` property to define how to handle image loading failures. The slot provides `status` for conditional rendering.

### Status Description

| Status | Description |
|--------|-------------|
| `success` | Loading successful, display normal content |
| `fail` | Loading failed, can display placeholder |
| `timeout` | Loading timeout |
| `over` | Final failure state (still failed after retries) |

### Strategy Description

| Strategy | Description |
|----------|-------------|
| `default` | Default mode, enters `over` state directly on failure |
| `placeholder` | Shows placeholder image on failure |
| `retry` | Auto-retry specified times on failure |
| `retryHard` | Full mode: retry + placeholder + fallback |

```html
<wd-waterfall error-strategy="retryHard" :retry-count="2" :max-wait="1500">
  <wd-waterfall-item v-for="(item, index) in list" :key="item.id" :order="index">
    <template #default="{ loaded, status, onFallbackLoad, onFallbackError, message }">
      <view class="waterfall-item">
        <!-- Success state -->
        <image 
          v-if="status === 'success'" 
          mode="widthFix" 
          :src="item.url" 
          @load="loaded" 
          @error="loaded" 
        />
        
        <!-- Fail state: show placeholder -->
        <view v-else-if="status === 'fail'" class="fallback-container">
          <image 
            :src="placeholderSrc" 
            mode="aspectFill" 
            @load="onFallbackLoad" 
            @error="onFallbackError" 
          />
        </view>
        
        <!-- Timeout state -->
        <view v-else-if="status === 'timeout'" class="timeout-placeholder">
          Loading timeout
        </view>
        
        <!-- Final fallback -->
        <view v-else class="final-fallback">
          {{ message || 'Image loading failed' }}
        </view>
        
        <view class="item-content">{{ item.title }}</view>
      </view>
    </template>
  </wd-waterfall-item>
</wd-waterfall>
```

## Pull-down Refresh

Combine with page pull-down refresh and call the component's `reset` method to clear and reset the waterfall.

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
    // Fetch new data
    const newData = await fetchData()
    list.value = newData
    
    // Reset waterfall
    waterfallRef.value?.reset()
  } finally {
    uni.stopPullDownRefresh()
  }
})
```

## Difference Between reflow and reset

The component provides two methods for different layout update scenarios:

### reflow - Re-layout

Keeps existing data and only recalculates positions for all items. Suitable for scenarios where layout parameters change but data remains the same.

```ts
// Scenario: Dynamically change columns
function changeColumns(num: number) {
  columns.value = num
  // Component automatically calls reflow when columns change, usually no manual call needed
}

// Scenario: Manually trigger re-layout
waterfallRef.value?.reflow()
```

**Use Cases:**
- `columns` change (component calls automatically)
- `column-gap` change (component calls automatically)
- `row-gap` change (component calls automatically)
- Container width change requiring recalculation

### reset - Clear and Reset

Clears all data and queues, completely resets to initial state. Suitable for scenarios where the data source is completely replaced.

```ts
// Scenario: Pull-down refresh
onPullDownRefresh(async () => {
  const newData = await fetchData()
  list.value = newData
  waterfallRef.value?.reset()
})

// Scenario: Switch category/Tab
function switchCategory(category: string) {
  list.value = []
  waterfallRef.value?.reset()
  loadData(category)
}
```

**Use Cases:**
- Pull-down refresh
- Switch data source/category
- Clear list and reload

### Comparison Summary

| Method | Data Handling | Trigger | Typical Scenarios |
|--------|---------------|---------|-------------------|
| `reflow` | Keep data, re-layout | Auto-called on layout param change | Change columns, adjust gaps |
| `reset` | Clear all data | Manual call required | Pull-down refresh, switch data source |

## Auto Load More

When content height is insufficient to fill the viewport, the component will automatically trigger the `need-load-more` event to request more data.

```html
<wd-waterfall ref="waterfallRef" @need-load-more="handleLoadMore">
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
    
    // Update status after layout completes
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

## Dynamic Add/Remove

:::danger Platform Limitation
Due to framework limitations, Mini Program platforms (WeChat, Alipay, DingTalk, etc.) only support adding and removing items at the end of the list. Adding or removing items at non-tail positions will cause layout issues. Operations like inserting at the beginning, middle, or random positions are only supported on H5 and APP platforms. See [uni-app issues#4847](https://github.com/dcloudio/uni-app/issues/4847).
:::

```html
<view class="button-row">
  <!-- H5 and APP only -->
  <!-- #ifdef WEB || APP-PLUS -->
  <wd-button @click="insertAtBeginning">Insert at Beginning</wd-button>
  <wd-button @click="insertAtMiddle">Insert at Middle</wd-button>
  <wd-button @click="insertRandom">Insert Random</wd-button>
  <!-- #endif -->
  
  <!-- All platforms supported -->
  <wd-button @click="insertAtEnd">Add to End</wd-button>
</view>
```

```ts
// Insert at end (all platforms supported)
function insertAtEnd() {
  const newItem = { id: uuid++, title: 'New Item', url: '...' }
  list.value.push(newItem)
}

// Insert at beginning (H5/APP only)
function insertAtBeginning() {
  const newItem = { id: uuid++, title: 'New Item', url: '...' }
  list.value.unshift(newItem)
}

// Insert at middle (H5/APP only)
function insertAtMiddle() {
  const newItem = { id: uuid++, title: 'New Item', url: '...' }
  const middleIndex = Math.floor(list.value.length / 2)
  list.value.splice(middleIndex, 0, newItem)
}

// Delete item (Mini Program only supports deleting tail items)
function deleteItem(item: ListItem) {
  const index = list.value.indexOf(item)
  if (index !== -1) {
    list.value.splice(index, 1)
  }
}
```

## Waterfall Attributes

| Attribute | Description | Type | Options | Default | Minimum Version |
|-----------|-------------|------|---------|---------|---------|
| columns | Number of columns | `number` | - | 2 | $LOWEST_VERSION$ |
| column-gap | Column gap (px) | `number` | - | 8 | $LOWEST_VERSION$ |
| row-gap | Row gap (px) | `number` | - | 8 | $LOWEST_VERSION$ |
| show | Whether to show, controls layout behavior during page switching | `boolean` | - | - | $LOWEST_VERSION$ |
| error-strategy | Error handling strategy | `ErrorStrategy` | `default` / `placeholder` / `retry` / `retryHard` | `default` | $LOWEST_VERSION$ |
| retry-count | Retry count (only for retry/retryHard mode) | `number` | - | 1 | $LOWEST_VERSION$ |
| max-wait | Maximum wait time (ms) | `number` | - | 1500 | $LOWEST_VERSION$ |
| custom-class | Custom class name | `string` | - | - | $LOWEST_VERSION$ |
| custom-style | Custom style | `string` | - | - | $LOWEST_VERSION$ |

### ErrorStrategy

Error handling strategy types:

| Value | Description | Minimum Version |
|-------|-------------|---------|
| `default` | Default mode, ends directly on failure | $LOWEST_VERSION$ |
| `placeholder` | Shows placeholder image on failure | $LOWEST_VERSION$ |
| `retry` | Auto-retry on failure | $LOWEST_VERSION$ |
| `retryHard` | Full mode: retry + placeholder + fallback | $LOWEST_VERSION$ |

## Waterfall Events

| Event | Description | Parameters | Minimum Version |
|-------|-------------|------------|---------|
| load-start | Triggered when loading starts | - | $LOWEST_VERSION$ |
| load-end | Triggered when batch loading completes | - | $LOWEST_VERSION$ |
| need-load-more | Triggered when more content is needed | - | $LOWEST_VERSION$ |

## Waterfall Methods

Call via component instance obtained through ref.

| Method | Description | Parameters | Return | Minimum Version |
|--------|-------------|------------|--------|---------|
| reflow | Re-layout (keep data, recalculate positions) | - | - | $LOWEST_VERSION$ |
| reset | Clear and reset (clear all data) | - | - | $LOWEST_VERSION$ |
| loadDone | Register load completion callback | `handler: () => void` | - | $LOWEST_VERSION$ |
| checkAndLoadMore | Manually check and trigger load more | - | - | $LOWEST_VERSION$ |
| loadStatus | Current loading status (readonly property) | - | `'idle' \| 'busy'` | $LOWEST_VERSION$ |

## Waterfall External Classes

| Class | Description | Minimum Version |
|-------|-------------|---------|
| custom-class | Root node class | $LOWEST_VERSION$ |
| custom-style | Root node style | $LOWEST_VERSION$ |

## WaterfallItem Attributes

| Attribute | Description | Type | Options | Default | Minimum Version |
|-----------|-------------|------|---------|---------|---------|
| order | Item index for sorting | `number` | - | - | $LOWEST_VERSION$ |
| width | Known width (px), use with height to skip loading wait | `number` | - | - | $LOWEST_VERSION$ |
| height | Known height (px), use with width to skip loading wait | `number` | - | - | $LOWEST_VERSION$ |
| custom-class | Custom class name | `string` | - | - | $LOWEST_VERSION$ |
| custom-style | Custom style | `string` | - | - | $LOWEST_VERSION$ |

## WaterfallItem Slot

| Name | Description | Parameters | Minimum Version |
|------|-------------|------------|---------|
| default | Default slot | `{ key, loaded, columnWidth, imageHeight, status, message, onFallbackLoad, onFallbackError }` | $LOWEST_VERSION$ |

### Slot Parameters

:::warning About the key parameter
The `key` parameter is managed internally by the component and is used to force update slot content during retry or refresh. Do not modify this value manually.
:::

| Parameter | Description | Type | Minimum Version |
|-----------|-------------|------|---------|
| key | Slot unique identifier for internal force refresh, do not modify | `string` | $LOWEST_VERSION$ |
| loaded | Load completion callback, call on image load/error | `(event?: any) => void` | $LOWEST_VERSION$ |
| columnWidth | Column width (px) | `number` | $LOWEST_VERSION$ |
| imageHeight | Image height (px), only valid in known-height mode | `number` | $LOWEST_VERSION$ |
| status | Current status | `'success' \| 'fail' \| 'timeout' \| 'over'` | $LOWEST_VERSION$ |
| message | Error message | `string` | $LOWEST_VERSION$ |
| onFallbackLoad | Placeholder image load success callback | `() => void` | $LOWEST_VERSION$ |
| onFallbackError | Placeholder image load error callback | `() => void` | $LOWEST_VERSION$ |

## WaterfallItem External Classes

| Class | Description | Minimum Version |
|-------|-------------|---------|
| custom-class | Root node class | $LOWEST_VERSION$ |
| custom-style | Root node style | $LOWEST_VERSION$ |
