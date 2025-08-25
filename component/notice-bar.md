---
url: 'https://wot-design-uni.cn/component/notice-bar.md'
---
# NoticeBar 通知栏

通知栏组件，用于在页面顶部展示通知提醒。

## 基本用法

设置 `text` 文本内容和 `prefix` 左侧图标。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" />
```

## 类型修改

设置 `type` 可修改通知类型，通知类型共有三种 `info`|`warning`|`danger`，默认值为`warning`。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="warn-bold" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="check-outline" type="info" custom-class="space" />
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" prefix="wifi-error" type="danger" />
```

```scss
:deep(.space) {
  margin-bottom: 10px;
}
```

## 插槽演示

```html
<wd-notice-bar>
  <template #prefix>
    <wd-icon class="prefix" name="warn-bold">占位符</wd-icon>
  </template>
  通知被禁或时段内消息屏蔽可能造成消…
  <template #suffix>
    <div style="color: #4d80f0">查看</div>
  </template>
</wd-notice-bar>
```

```scss
:deep(.prefix) {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}
```

## 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable` 即可开启多行展示。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" wrapable :scrollable="false" />
```

## 可关闭的

设置 `closable` 属性，使通知栏可以关闭。

```html
<wd-notice-bar text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息" closable />
```

## 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  closable
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

## 多文本轮播

将一个`string[]`传递给`text`属性，即可开启多文本轮播，并且会在展示下一条文本时触发`next`事件，该事件接收一个`number`参数，代表的是当前展示的文本数组索引

```html
<wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
```

```javascript
import { ref } from 'vue'

const textArray = ref([
  '欢迎使用wot design uni',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/Moonofweisheng/wot-design-uni',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

const onNext = (index: number) => {
  console.log('展示下一条，index: ', index)
  console.log('文本是：' + textArray.value[index])
}
```

## 垂直滚动

1. `direction`传递`vertical`即可开启垂直滚动，目前仅支持一个方向的垂直滚动
2. `text`为数组时才会进行滚动

```html
<wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
<wd-notice-bar prefix="warn-bold" direction="vertical" text="只有一条消息不会滚动" :delay="3" custom-class="space" />
```

## 重置播放动画 1.3.13

通过`ref`获取组件实例，调用`reset`方法即可重置播放动画。当你遇到`NoticeBar`的播放动画异常的情况时，可以调用`reset`方法重置动画。

例如：在`APP-VUE`端，`Tabbar`页面使用`NoticeBar`时，从其它界面返回到`NoticeBar`页面，会偶发`NoticeBar`动画异常，此时可以调用`reset`方法重置动画。

参考issues：[#358](https://github.com/Moonofweisheng/wot-design-uni/issues/358)、[#650](https://github.com/Moonofweisheng/wot-design-uni/issues/650)

```html
<wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
<wd-button @click="handleReset">重置播放动画</wd-button>
```

```ts
// uni_modules
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
// npm
// import { type NoticeBarInstance } from 'wot-design-uni/components/wd-notice-bar/types'

const notice = ref<NoticeBarInstance>()

const textArray = ref([
  '欢迎使用wot design uni',
  '该组件库基于uniapp ->Vue3, ts构建',
  '项目地址：https://github.com/Moonofweisheng/wot-design-uni',
  '我们的目标是打造最强uniapp组件库',
  '诚挚邀请大家共同建设',
  '这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息'
])

function handleReset() {
  notice.value?.reset()
}
```

## Attributes

| 参数             | 说明                                   | 类型                       | 可选值                  | 默认值       | 最低版本 |
| ---------------- | -------------------------------------- | -------------------------- | ----------------------- | ------------ | -------- |
| text             | 设置通知栏文案                         | `string` `string[]`        | -                       | -            | -        |
| type             | 设置通知栏类型                         | `string`                   | info / warning / danger | warning      | -        |
| prefix           | 设置左侧图标，使用 icon 章节中的图标名 | `string`                   | -                       | -            | -        |
| scrollable       | 是否可以滚动                           | `boolean`                  | -                       | true         | -        |
| delay            | 滚动动画初始延时，单位 秒(s)           | `number`                   | -                       | 1            | -        |
| speed            | 滚动速度，单位 px/s                    | `number`                   | -                       | 50           | -        |
| closable         | 是否可以关闭                           | `boolean`                  | -                       | false        | -        |
| wrapable         | 是否换行展示                           | `boolean`                  | -                       | false        | -        |
| color            | 文字、图标颜色                         | `string`                   | -                       | -            | -        |
| background-color | 背景颜色                               | `string`                   | -                       | -            | -        |
| direction        | 滚动方向                               | `NoticeBarScrollDirection` | `horizontal` `vertical` | `horizontal` | -        |

## Events

| 事件名称 | 说明             | 参数                                                                           | 最低版本 |
| -------- | ---------------- | ------------------------------------------------------------------------------ | -------- |
| close    | 关闭按钮点击时   | -                                                                              | -        |
| next     | 下一次滚动前触发 | index: `number`                                                                | -        |
| click    | 点击时触发       | `{ text: string, index: number }`，其中`text`为当前文本，`index`为当前文本索引 | 1.2.16   |

## Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| reset | 用于重置播放动画| - | 1.3.13 |

## Slot

| name    | 说明         | 类型 | 最低版本 |
| ------- | ------------ | ---- | -------- |
| prefix  | 前置图标     | -    | -        |
| suffix  | 后置插槽     | -    | -        |
| default | 通知文本内容 | -    | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
