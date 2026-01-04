---
version: 1.14.0
---

# Avatar 头像

用来代表用户或事物，支持图片、文本或图标展示。

## 基础用法

头像支持三种类型：图片、文本、图标。

```typescript
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
```

```html
<wd-avatar :src="avatarURL" />
<wd-avatar text="U" />
<wd-avatar icon="user" />
```

## 头像形状

使用 `shape` 属性设置头像形状，支持 `round`（圆形）和 `square`（方形），默认为 `round`。

```html
<wd-avatar :src="avatarURL" shape="square" />
<wd-avatar :src="avatarURL" shape="round" />
```

## 头像尺寸

支持预设尺寸：`large`、`medium`、`normal`、`small`，默认为 `normal`。也可以传入数字或带单位的字符串（如 `40px`、`100rpx`）自定义尺寸。

```html
<!-- 预设尺寸 -->
<wd-avatar :src="avatarURL" size="large" />
<wd-avatar :src="avatarURL" size="medium" />
<wd-avatar :src="avatarURL" size="normal" />
<wd-avatar :src="avatarURL" size="small" />

<!-- 自定义尺寸 -->
<wd-avatar :src="avatarURL" :size="80" />
<wd-avatar :src="avatarURL" size="60px" />
<wd-avatar :src="avatarURL" size="100rpx" />
```

## 自定义颜色

使用 `bg-color` 和 `color` 属性自定义背景色和文字颜色。

```html
<wd-avatar bg-color="#DC143C" color="#fff" text="W" />
<wd-avatar bg-color="#228B22" color="#fff" text="O" />
<wd-avatar bg-color="#1E90FF" color="#fff" text="T" />
<wd-avatar bg-color="#EEEEEE" color="#7B8198" icon="user" />
```

## 带徽记的头像

结合 Badge 组件展示徽记。

```html
<wd-badge modelValue="10" type="primary">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge modelValue="20" type="danger">
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar :src="avatarURL" shape="square" />
</wd-badge>
<wd-badge is-dot>
  <wd-avatar text="A" shape="square" bg-color="#1E90FF" />
</wd-badge>
```

## 自定义内容

使用默认插槽自定义头像内容。

```html
<wd-avatar>
  <view class="custom-content">VIP</view>
</wd-avatar>
<wd-avatar>
  <wd-icon name="star-on" size="24px" color="#f0883a" />
</wd-avatar>
```

## 可点击

通过监听 `click` 事件实现点击功能。

```html
<wd-avatar :src="avatarURL" @click="handleClick" />
<wd-avatar text="点我" bg-color="#1E90FF" @click="handleClick" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const handleClick = () => {
  toast.show('点击头像')
}
```

## 头像组

使用 `wd-avatar-group` 组件可以展示一组头像。

### 基础用法

```html
<wd-avatar-group>
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

### 最大数量

使用 `max-count` 属性限制显示的头像数量，超出部分会以 `+N` 形式展示。

```html
<wd-avatar-group :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### 叠层方向

使用 `cascading` 属性设置叠层方向，支持 `left-up`（左侧叠在上层）和 `right-up`（右侧叠在上层）。

```html
<wd-avatar-group cascading="left-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>

<wd-avatar-group cascading="right-up" :max-count="4">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
  <wd-avatar text="C" bg-color="#DC143C" />
</wd-avatar-group>
```

### 统一尺寸和形状

使用 `size` 和 `shape` 属性统一设置头像组中所有头像的尺寸和形状。使用 `max-count` 限制显示数量，超出部分会显示折叠头像。通过 `collapse-avatar` 可自定义折叠头像的文本内容。

```html
<!-- 统一尺寸 -->
<wd-avatar-group size="large" :max-count="3">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>

<!-- 统一形状，自定义折叠文本 -->
<wd-avatar-group shape="square" :max-count="3" :collapse-avatar="'+N'">
  <wd-avatar :src="avatarURL" />
  <wd-avatar icon="star-on" />
  <wd-avatar text="A" bg-color="#1E90FF" />
  <wd-avatar text="B" bg-color="#228B22" />
</wd-avatar-group>
```

## Avatar Attributes

| 参数     | 说明                                       | 类型             | 可选值                          | 默认值     | 最低版本         |
| -------- | ------------------------------------------ | ---------------- | ------------------------------- | ---------- | ---------------- |
| src      | 图片地址                                   | string           | -                               | -          | 1.14.0 |
| text     | 文本内容                                   | string           | -                               | -          | 1.14.0 |
| icon     | 图标名称，使用 wd-icon 组件                | string           | -                               | -          | 1.14.0 |
| size     | 头像尺寸，支持预设尺寸或带单位的字符串     | string \| number | large / medium / normal / small | normal     | 1.14.0 |
| shape    | 头像形状                                   | string           | round / square                  | round      | 1.14.0 |
| bg-color | 背景颜色                                   | string           | -                               | -          | 1.14.0 |
| color    | 文字颜色                                   | string           | -                               | -          | 1.14.0 |
| alt      | 图片加载失败时的占位文本                   | string           | -                               | -          | 1.14.0 |
| mode     | 图片填充模式，同 uni-app image 组件的 mode | string           | -                               | aspectFill | 1.14.0 |

## Avatar Events

| 事件名称 | 说明               | 参数  | 最低版本         |
| -------- | ------------------ | ----- | ---------------- |
| click    | 点击头像时触发     | -     | 1.14.0 |
| error    | 图片加载失败时触发 | event | 1.14.0 |

## Avatar Slots

| 名称    | 说明           | 最低版本         |
| ------- | -------------- | ---------------- |
| default | 自定义头像内容 | 1.14.0 |

## Avatar 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | 1.14.0 |
| custom-style | 根节点样式 | 1.14.0 |

## AvatarGroup Attributes

| 参数            | 说明                             | 类型             | 可选值                          | 默认值 | 最低版本         |
| --------------- | -------------------------------- | ---------------- | ------------------------------- | ------ | ---------------- |
| max-count       | 最大显示数量                     | number           | -                               | -      | 1.14.0 |
| cascading       | 叠层方向                         | string           | left-up / right-up              | -      | 1.14.0 |
| shape           | 统一设置头像形状                 | string           | round / square                  | round  | 1.14.0 |
| size            | 统一设置头像尺寸                 | string \| number | large / medium / normal / small | normal | 1.14.0 |
| collapse-avatar | 超出最大数量时折叠头像显示的内容 | string           | -                               | -      | 1.14.0 |

## AvatarGroup Slots

| 名称    | 说明                          | 最低版本         |
| ------- | ----------------------------- | ---------------- |
| default | 头像列表，放置 wd-avatar 组件 | 1.14.0 |

## AvatarGroup 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | 1.14.0 |
| custom-style | 根节点样式 | 1.14.0 |
