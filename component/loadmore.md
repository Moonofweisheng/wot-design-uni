---
url: 'https://wot-design-uni.cn/component/loadmore.md'
---
# loadmore 加载更多

用于在列表底部展示加载状态。

## 基本用法

在需要进行加载的列表的底部引入该组件即可。当滑动到列表底部时，通过设置`state`展示不同的文案。

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

## 自定义文案

通过设置`loading-text`、`finished-text`、`error-text`配合`state`展示不同状态时的文案

```html
<wd-loadmore custom-class="loadmore" state="loading" loading-text="自定义加载文案" />

<wd-loadmore custom-class="loadmore" state="finished" finished-text="自定义完成文案" />

<wd-loadmore custom-class="loadmore" state="error" error-text="自定义错误文案" />
```

## 点击继续加载

当 state 为 error 时，点击文案，组件会触发`loadmore`事件

```html
<wd-loadmore custom-class="loadmore" state="error" @reload="loadmore" />
```

## 应用实现

配合`onReachBottom`事件实现滚动到底部加载更多

```html
<view class="container">
  <view v-for="index in num" :key="index" class="list-item">
    <image src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/70325/36/14954/36690/5dcd3e3bEee5006e0/aed1ccf6d5ffc764.png" />
    <view class="right">这是一条测试{{ index + 1 }}</view>
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

| 参数          | 说明                 | 类型   | 可选值                 | 默认值             | 最低版本 |
| ------------- | -------------------- | ------ | ---------------------- | ------------------ | -------- |
| state         | 加载状态             | string | loading/finished/error | -                  | -        |
| loading-text  | 加载提示文案         | string | -                      | 加载中...          | -        |
| finished-text | 全部加载完的提示文案 | string | -                      | 没有更多了         | -        |
| error-text    | 加载失败的提示文案   | string | -                      | 加载失败，点击重试 | -        |
| loading-props  | loading加载组件属性| `Partial<LoadingProps>` | -         | -       | 1.3.14        |

#### LoadingProps

参见[LoadingProps](/component/loading.html#attributes)

## Events

| 事件名称 | 说明                                                | 参数 | 最低版本 |
| -------- | --------------------------------------------------- | ---- | -------- |
| reload   | state 为 error 加载错误时，点击文案触发 reload 事件 | -    | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
