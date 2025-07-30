# PullRefresh

Provides pull-to-refresh interaction.

## Basic Usage

The `refresh` event will be triggered when pull-to-refresh, you can perform synchronous or asynchronous operations in the event callback function. After the operation is completed, set `v-model` to `false` to indicate that the loading is complete.

```html
<wd-pull-refresh v-model="loading" @refresh="onRefresh">
  <view class="content">
    <wd-cell v-for="item in list" :key="item" :title="`List item ${item}`" />
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

## Custom Text

You can customize the text in different states through `pulling-text`, `loosing-text`, `loading-text`, and `success-text` properties.

```html
<wd-pull-refresh 
  v-model="loading" 
  pulling-text="Pull hard..." 
  loosing-text="Release quickly..." 
  loading-text="Loading desperately..." 
  success-text="Load successfully!"
  @refresh="onRefresh"
>
  <view class="content">
    <!-- Content -->
  </view>
</wd-pull-refresh>
```

## Success Tip

You can set the prompt text after successful refresh through `success-text`, and set the prompt display duration through `success-duration`.

```html
<wd-pull-refresh 
  v-model="loading" 
  success-text="Refresh successful" 
  :success-duration="1500"
  @refresh="onRefresh"
>
  <view class="content">
    <!-- Content -->
  </view>
</wd-pull-refresh>
```

## Custom Slots

You can customize the prompt content during the pull-to-refresh process through slots.

```html
<wd-pull-refresh v-model="loading" @refresh="onRefresh">
  <template #pulling="{ distance }">
    <view class="custom-slot">
      <wd-icon name="arrow-down" size="20" />
      <text>Pull distance: {{ Math.round(distance) }}px</text>
    </view>
  </template>
  
  <template #loosing="{ distance }">
    <view class="custom-slot">
      <wd-icon name="arrow-up" size="20" />
      <text>Release distance: {{ Math.round(distance) }}px</text>
    </view>
  </template>
  
  <template #loading>
    <view class="custom-slot">
      <wd-loading size="20" />
      <text>Refreshing data...</text>
    </view>
  </template>
  
  <template #success>
    <view class="custom-slot">
      <wd-icon name="check" size="20" color="#34d19d" />
      <text>Refresh completed</text>
    </view>
  </template>
  
  <view class="content">
    <!-- Content -->
  </view>
</wd-pull-refresh>
```

## Disabled State

You can disable pull-to-refresh through the `disabled` property.

```html
<wd-pull-refresh v-model="loading" disabled @refresh="onRefresh">
  <view class="content">
    <!-- Content -->
  </view>
</wd-pull-refresh>
```

## API

### Props

| Parameter | Description | Type | Optional Values | Default Value | Minimum Version |
|-----------|-------------|------|----------------|---------------|----------------|
| v-model | Whether it is in loading state | `boolean` | - | `false` | - |
| disabled | Whether to disable pull-to-refresh | `boolean` | - | `false` | - |
| pulling-text | Text during pulling process | `string` | - | `'Pull to refresh...'` | - |
| loosing-text | Text during releasing process | `string` | - | `'Release to refresh...'` | - |
| loading-text | Text during loading process | `string` | - | `'Loading...'` | - |
| success-text | Text for successful refresh | `string` | - | `''` | - |
| success-duration | Display duration of success tip (ms) | `number \| string` | - | `500` | - |
| animation-duration | Animation duration (ms) | `number \| string` | - | `300` | - |
| head-height | Height of top content | `number \| string` | - | `50` | - |
| pull-distance | Distance to trigger pull-to-refresh | `number \| string` | - | Same as `head-height` | - |

### Events

| Event Name | Description | Parameters | Minimum Version |
|------------|-------------|------------|----------------|
| refresh | Triggered when pull-to-refresh | - | - |
| change | Triggered when dragging or status changes | `{ status: PullRefreshStatus, distance: number }` | - |

### Slots

| Name | Description | Parameters | Minimum Version |
|------|-------------|------------|----------------|
| default | Content area | - | - |
| normal | Top content when not pulling | - | - |
| pulling | Top content during pulling | `{ distance: number }` | - |
| loosing | Top content during releasing | `{ distance: number }` | - |
| loading | Top content during loading | `{ distance: number }` | - |
| success | Top content when refresh succeeds | - | - |

### Methods

You can get the PullRefresh instance through ref and call instance methods.

| Method Name | Description | Parameters | Return Value | Minimum Version |
|-------------|-------------|------------|--------------|----------------|
| finish | End refresh state | - | - | - |

### Type Definitions

The component exports the following type definitions:

```typescript
import type { PullRefreshProps, PullRefreshStatus } from '@/uni_modules/wot-design-uni'

type PullRefreshStatus = 'normal' | 'pulling' | 'loosing' | 'loading' | 'success'
```

## FAQ

### Dragging doesn't work in some cases?

Please check if `overflow: hidden` or other styles that affect scrolling are set on the page scroll container.

### How to implement pull-up to load more?

You can combine with the `wd-loadmore` component to implement pull-up to load more functionality.

```html
<wd-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <view class="content">
    <wd-cell v-for="item in list" :key="item" :title="item" />
  </view>
  <wd-loadmore v-model="loading" @loadmore="onLoadmore" />
</wd-pull-refresh>
```