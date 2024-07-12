<frame/>

# Tabbar 标签栏

底部导航栏，用于在不同页面之间进行切换。

## 基础用法

`v-model` 为绑定值，表示选中标签的索引值或者名称。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## 通过名称匹配

通过设置 `name` 属性，可以通过名称匹配选中标签。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item name="home" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item name="cart" title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item name="setting" title="设置" icon="setting"></wd-tabbar-item>
  <wd-tabbar-item name="user" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref('home')
```


## 徽标提示

通过设置 `value` 属性，可以显示徽标提示，而设置 is-dot 属性后，会在图标右上角展示一个小红点。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## 悬浮标签栏

通过设置 `shape` 属性为 `round`，可以将标签栏设置为悬浮样式。

```html
<wd-tabbar shape="round" v-model="tabbar">
  <wd-tabbar-item title="首页" is-dot :value="2" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" :value="2" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="相册" :value="30" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="我的" :value="200" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## 自定义图标

通过使用 `<template #icon>` 可以自定义标签页的图标。

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item :value="2" title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类">
    <template #icon>
      <wd-img round height="40rpx" width="40rpx" src="https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg"></wd-img>
    </template>
  </wd-tabbar-item>
  <wd-tabbar-item :value="3" title="我的" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## 自定义颜色

通过设置 `active-color` 和 `inactive-color` 属性，可以自定义激活和未激活标签的颜色。

```html
<wd-tabbar v-model="tabbar" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item is-dot :value="2" title="点状" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="分类"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="最大值" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## 监听切换事件

通过监听 `change` 事件，可以获取选中标签的值。

```html
<wd-tabbar v-model="tabbar" @change="handleChange1" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```typescript
import { ref } from 'vue'

const tabbar = ref(1)

function handleChange1({ value }: { value: string }) {
  show(`选中标签:${value}`)
}
```

## 固定底部

通过设置 `fixed` 属性，可以将标签栏固定在底部；通过设置 `placeholder` 属性，可以在固定在底部时在标签位置生成一个等高的占位元素。

```html
<wd-tabbar fixed v-model="tabbar" bordered safeAreaInsetBottom placeholder>
  <wd-tabbar-item :value="2" is-dot title="首页" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="分类" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="相册" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="客服" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```



## Tabbar Attributes
| 参数                  | 说明                                       | 类型                        | 可选值                               | 默认值            | 最低版本   |
|-----------------------|--------------------------------------------|-----------------------------|--------------------------------------|-------------------|------------|
| v-model/modelValue    | 选中标签的索引值或者名称                   | number / string             | -                                    | 0                 | 0.1.27     |
| fixed                | 是否固定在底部                             | boolean                     | -                                    | false             | 0.1.27     |
| safeAreaInsetBottom   | 是否设置底部安全距离（iPhone X 类型的机型） | boolean                     | -                                    | false                 | 0.1.27     |
| bordered              | 是否显示顶部边框                           | boolean                     | -                                    | true              | 0.1.27     |
| shape                | 标签栏的形状                               | TabbarShape                 | 'default' / 'round'                  | 'default'         | 0.1.27     |
| activeColor           | 激活标签的颜色                             | string                      | -                                    | -                | 0.1.27     |
| inactiveColor         | 未激活标签的颜色                         | string                      | -                                    | -                | 0.1.27     |
| placeholder           | 固定在底部时，是否在标签位置生成一个等高的占位元素 | boolean              | -                                    | false             | 0.1.27     |
| zIndex                | tabbar组件的层级                          | number                      | -                                    | 500               | 0.1.27     |

## Tabbar Events

| 事件名称 | 说明                       | 参数        | 最低版本 |
| -------- | -------------------------- | ----------- | -------- |
| change   | tabbar标签切换时触发             | `{ value }` | 0.1.27   |




## Tabbar 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根节点样式类 | 0.1.27 |
| custom-style | 根节点样式 | 0.1.27 |




## TabbarItem Attributes
| 参数          | 说明           | 类型                    | 可选值           | 默认值   | 最低版本   |
|--------------|----------------|-------------------------|----------------|----------|------------|
| title        | 标签页的标题   | string                  | -              | -        | 0.1.27     |
| name         | 唯一标识符     | string / number         | -              | -        | 0.1.27     |
| icon         | 图标           | string                  | -              | -        | 0.1.27     |
| value        | 徽标显示值     | number / string         | -              | -        | 0.1.27     |
| isDot        | 是否点状徽标   | boolean                 | -              | false    | 0.1.27     |
| max          | 徽标最大值     | number                  | -              | 99       | 0.1.27     |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/component/badge#attributes)	| BadgeProps    | -      | -  | 0.1.50   |
## TabbarItem Slots
| name   | 说明                 | 参数                    | 最低版本 |
| ------ | -------------------- | ----------------------- | -------- |
| icon  | 	自定义图标         | `active: boolean` | 0.1.27   |


## TabbarItem 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根节点样式类 | 0.1.27 |
| custom-style | 根节点样式 | 0.1.27 |
