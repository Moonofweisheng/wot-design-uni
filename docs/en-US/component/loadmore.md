# Loadmore

Used to display loading status at the bottom of lists.

## Basic Usage

Introduce this component at the bottom of the list that needs to be loaded. When scrolling to the bottom of the list, display different text by setting `state`.

```html
<wd-loadmore custom-class="loadmore" state="loading" />

<wd-loadmore custom-class="loadmore" state="finished" />

<wd-loadmore custom-class="loadmore" state="error" />
```

```scss
:deep(.loadmore) {
  background-color: #f4f4f4;
  margin: 20px 0;
}
```

## Custom Text

Display different text for different states by setting `loading-text`, `finished-text`, `error-text` along with `state`

```html
<wd-loadmore custom-class="loadmore" state="loading" loading-text="Custom Loading Text" />

<wd-loadmore custom-class="loadmore" state="finished" finished-text="Custom Finished Text" />

<wd-loadmore custom-class="loadmore" state="error" error-text="Custom Error Text" />
```

## Click to Continue Loading

When state is error, clicking on the text will trigger the `loadmore` event

```html
<wd-loadmore custom-class="loadmore" state="error" @reload="loadmore" />
```

## Application Implementation

Implement loading more when scrolling to the bottom with the `onReachBottom` event

```html
<view class="container">
  <view v-for="index in num" :key="index" class="list-item">
    <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
    <view class="right">This is a test {{ index + 1 }}</view>
  </view>
  <wd-loadmore :state="state" @reload="loadmore" />
</view>
```

```typescript
import { onLoad, onReachBottom } from '@dcloudio/uni-app'


const state = ref<string>('loading')
const num = ref<number>(0)
const max = ref<number>(60)

onReachBottom(() => {
  if (num.value === 45) {
    state.value = 'error'
  } else if (num.value < max.value) {
    loadmore()
  } else if (num.value === max.value) {
    state.value = 'finished'
  }
})

onLoad(() => {
  loadmore()
})

function loadmore() {
  setTimeout(() => {
    num.value = num.value + 15
    state.value = 'loading'
  }, 200)
}
```

```scss
.list-item {
  position: relative;
  display: flex;
  padding: 10px 15px;
  background: #fff;
  color: #464646;
}

.list-item:after {
  position: absolute;
  display: block;
  content: '';
  height: 1px;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #eee;
  transform: scaleY(0.5);
}
image {
  display: block;
  width: 120px;
  height: 78px;
  margin-right: 15px;
}
.right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| state | Loading state | string | loading/finished/error | - | - |
| loading-text | Loading prompt text | string | - | Loading... | - |
| finished-text | Text prompt when all loading is complete | string | - | No more | - |
| error-text | Text prompt when loading fails | string | - | Loading failed, click to retry | - |
| loading-props | Loading component properties | `Partial<LoadingProps>` | - | - | 1.3.14 |

#### LoadingProps
See [LoadingProps](/component/loading.html#attributes)

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| reload | Triggered when clicking the text when state is error | - | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |