<frame/>

#  Slider 滑块

支持单向滑块和双向滑块。


## 基本用法

`v-model` 为绑定值。如果为 number 类型则显示一个滑块，如果为 array 类型则显示两个滑块。
```html
<wd-slider v-model="value"/>
```
```typescript
const value = ref<number>(30)
```
## 双滑块

双滑块模式下 `value` 为 `二元数组` 类型。

```html
<wd-slider v-model="value" />
```
```typescript
const value = ref<number[]>([10, 30])
```
## 最大值最小值

设置 `min` 最小值，`min` 最大值。

```html
<wd-slider v-model="value" :min="4" :max="1000" />
```

## 隐藏文案

设置 `hide-label` 隐藏滑块当前值。

```html
<wd-slider v-model="value" hide-label/>
```

设置 `hide-min-max` 隐藏最大最小值。

```html
<wd-slider v-model="value" hide-min-max />
```

## 禁用

设置 `disabled` 属性。

```html
<wd-slider v-model="value" disabled />
```

## Attributes
| 参数 | 说明                        | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|---------------------------|-----|-------|-------|-------|
| v-model | 	滑块值，如果为array，则为双向滑块      |	number / array | - | - | - |
| hide-min-max | 是否显示左右的最大最小值              |	boolean |	- |	false | - |
| hide-label | 是否显示当前滑块值                 | boolean | - | false | - |
| disabled | 是否禁用                      | boolean | - | false | - |
| max | 最大值                       | number | - | 100 | - |
| min | 最小值，允许负数`(1.2.19)` | number | - | 0 | - |
| step | 步进值                       | number | - | 1 | `1.2.19` |
| active-color | 进度条激活背景颜色                 | string | - | linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%) | - |
| inactive-color | 进度条未激活背景颜色                | string | - | #e5e5e5 | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| dragstart | 开始移动时触发 | `{ value }` | - |
| dragmove | 移动滑块时触发 | `{ value }` | - |
| dragend | 移动结束时触发 | `{ value }` | - |


## Methods

对外暴露函数

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| initSlider | 初始化slider宽度数据 | - | 1.2.25 |

## 外部样式类
| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
| custom-min-class | 最小值自定义样式 | - |
| custom-max-class | 最大值自定义样式 | - |
