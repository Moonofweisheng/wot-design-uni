---
url: 'https://wot-design-uni.cn/component/curtain.md'
---
# Curtain 幕帘

一般用于公告类的图片弹窗。

## 基本用法

通过 `v-model` 属性设置显示隐藏，必填项。

`src` 为幕帘图片地址（只支持在线地址），值为 `string` 类型，必填项。

`to` 为幕帘点击访问链接，值为 `string` 类型，非必填项。

```html
<wd-button @click="handleClick">展示幕帘</wd-button>
<wd-curtain v-model="value" :src="img" :to="link"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## 设置幕帘图片宽高

设置 `width`，默认高度为图片原始比例与传入`width`计算所得, 必填项。

```html
<wd-button @click="handleClick">展示幕帘</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" width="280"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## 修改关闭按钮位置

设置 `close-position`，默认为 'inset'，可选值 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'。

```html
<wd-button @click="handleClick">展示幕帘</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" close-position="top" width="280"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## 设置遮罩点击可关闭幕帘

设置 `close-on-click-modal` 属性，值为`boolean` 类型，非必填项。

```html
<wd-button @click="handleClick">展示幕帘</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" close-position="bottom-right" width="280" close-on-click-modal></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## Attributes

| 参数                 | 说明                                               | 类型    | 可选值                                                                   | 默认值 | 最低版本 |
|----------------------|----------------------------------------------------|---------|--------------------------------------------------------------------------|--------|----------|
| value                | 绑定值，展示/关闭幕帘（已废弃，请使用 modelValue） | boolean | -                                                                        | -      | -        |
| modelValue           | 绑定值，展示/关闭幕帘                              | boolean | -                                                                        | -      | 1.7.0   |
| src                  | 幕帘图片地址，必须使用网络地址                     | string  | -                                                                        | -      | -        |
| width                | 幕帘图片宽度，默认单位 px                          | number  | -                                                                        | -      | -        |
| to                   | 幕帘图片点击链接                                   | string  | -                                                                        | -      | -        |
| close-position       | 关闭按钮位置                                       | string  | inset / top / bottom / top-left / top-right / bottom-left / bottom-right | inset  | -        |
| close-on-click-modal | 点击遮罩是否关闭                                   | boolean | -                                                                        | false  | -        |
| hide-when-close      | 是否当关闭时将弹出层隐藏（display: none）          | boolean | -                                                                        | true   | -        |
| z-index              | 设置层级                                           | number  | -                                                                        | 10     | 1.4.0    |

## Events

| 事件名称    | 说明                                                                           | 参数 | 最低版本 |
| ----------- | ------------------------------------------------------------------------------ | ---- | -------- |
| click       | 点击幕帘时触发                                                                 | -    | -        |
| close       | 弹出层关闭时触发                                                               | -    | -        |
| click-modal | 点击遮罩时触发                                                                 | -    | -        |
| beforeenter | 进入前触发                                                                     | -    | -        |
| enter       | 进入时触发                                                                     | -    | -        |
| afterenter  | 进入后触发                                                                     | -    | -        |
| beforeleave | 离开前触发                                                                     | -    | -        |
| leave       | 离开时触发                                                                     | -    | -        |
| afterleave  | 离开后触发                                                                     | -    | -        |
| load        | 图片加载完成事件                                                               | -    | -        |
| error       | 图片加载失败事件，若图片加载失败，则不会展示幕帘组件，即使设置 `value` 为 true | -    | -        |

## Slots

| name  | 说明         | 最低版本         |
| ----- | ------------ | ---------------- |
| close | 关闭按钮插槽 | 1.5.0 |

## 外部样式类

| 类名               | 说明           | 最低版本         |
| ------------------ | -------------- | ---------------- |
| custom-class       | 根节点样式     | -                |
| custom-close-class | 关闭按钮样式类 | 1.5.0 |
| custom-close-style | 关闭按钮样式   | 1.5.0 |
