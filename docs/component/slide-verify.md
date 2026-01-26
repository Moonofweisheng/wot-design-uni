---
version: 1.14.0
---

# SlideVerify 滑动验证

滑动验证组件，用于人机验证场景。

## 基本用法

```html
<wd-slide-verify @success="handleSuccess" @fail="handleFail" />
```

```typescript
const toast = useToast()

function handleSuccess() {
  toast.success('验证成功')
}

function handleFail() {
  toast.error('验证失败，请重试')
}
```

## 自定义文案

通过 `text` 和 `success-text` 属性自定义提示文字。

```html
<wd-slide-verify text="请拖动滑块" success-text="验证成功" />
```

## 自定义尺寸

通过 `width` 和 `height` 属性自定义滑动条的宽度和高度。
通过 `icon-size` 和 `success-icon-size` 属性设置对应图标大小。

```html
<wd-slide-verify :width="250" :height="50" icon-size="60rpx" success-icon-size="30rpx" />
```

## 自定义颜色

通过 `background-color` 和 `active-background-color` 属性自定义颜色。

```html
<wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
```

## 自定义图标

通过 `icon` 和 `success-icon` 属性自定义图标，`icon-size` 属性设置图标大小。

```html
<wd-slide-verify icon="arrow-right" success-icon="success" :icon-size="24" />
```

## 自定义容错范围

通过 `tolerance` 属性设置容错范围（单位：px），默认为 10px。

```html
<wd-slide-verify :tolerance="20" />
```

## 禁用状态

设置 `disabled` 属性禁用滑动验证。

```html
<wd-slide-verify disabled />
```

## 重置方法

通过 `ref` 获取组件实例，调用 `reset` 方法重置验证状态。

```html
<wd-slide-verify ref="slideVerifyRef" />
<wd-button @click="handleReset">重置</wd-button>
```

```typescript
import { ref } from 'vue'
import type { SlideVerifyInstance } from '@/uni_modules/wot-design-uni/components/wd-slide-verify/type'

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleReset() {
  slideVerifyRef.value?.reset()
}
```

## 插槽

支持通过插槽自定义内容。

```html
<wd-slide-verify>
  <template #text>
    <text>向右滑动完成验证</text>
  </template>
  <template #success-text>
    <text>验证通过</text>
  </template>
  <template #icon>
    <view>ICON</view>
  </template>
  <template #success-icon>
    <view style="color: red">OK</view>
  </template>
</wd-slide-verify>
```

## Attributes

| 参数                    | 说明                                              | 类型            | 可选值 | 默认值                | 最低版本         |
| ----------------------- | ------------------------------------------------- | --------------- | ------ | --------------------- | ---------------- |
| width                   | 滑动条宽度(单位:px)                               | number / string | -      | 300                   | 1.14.0 |
| height                  | 滑块高度(单位:px)                                 | number / string | -      | 40                    | 1.14.0 |
| tolerance               | 容错范围(单位:px)，距离终点多少距离内视为验证通过 | number / string | -      | 10                    | 1.14.0 |
| text                    | 提示文字                                          | string          | -      | 向右滑动验证          | 1.14.0 |
| success-text            | 验证成功提示文字                                  | string          | -      | 验证通过              | 1.14.0 |
| disabled                | 是否禁用                                          | boolean         | -      | false                 | 1.14.0 |
| background-color        | 背景颜色                                          | string          | -      | #F5F7FA               | 1.14.0 |
| active-background-color | 激活时的背景颜色                                  | string          | -      | #49C75F               | 1.14.0 |
| icon                    | 滑块图标名称                                      | string          | -      | a-chevron-rightdouble | 1.14.0 |
| success-icon            | 成功图标名称                                      | string          | -      | check                 | 1.14.0 |
| icon-size               | 图标大小(单位:px)                                 | number / string | -      | 20                    | 1.14.0 |
| success-icon-size       | 成功图标大小(单位:px)                             | number / string | -      | 12                    | 1.14.0 |

## Events

| 事件名称 | 说明           | 参数 | 最低版本         |
| -------- | -------------- | ---- | ---------------- |
| success  | 验证成功时触发 | -    | 1.14.0 |
| fail     | 验证失败时触发 | -    | 1.14.0 |

## Methods

通过 ref 可以获取到组件实例，调用组件提供的方法：

| 方法名 | 说明                   | 参数 | 最低版本         |
| ------ | ---------------------- | ---- | ---------------- |
| reset  | 重置验证组件到初始状态 | -    | 1.14.0 |

## Slots API

| 插槽名称     | 说明                       | 最低版本         |
| ------------ | -------------------------- | ---------------- |
| text         | 自定义提示文字内容         | 1.14.0 |
| success-text | 自定义验证成功提示文字内容 | 1.14.0 |
| icon         | 自定义滑块图标             | 1.14.0 |
| success-icon | 自定义成功图标             | 1.14.0 |

## 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | 1.14.0 |
| custom-style | 根节点样式 | 1.14.0 |
