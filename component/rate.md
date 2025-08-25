---
url: 'https://wot-design-uni.cn/component/rate.md'
---
# Rate 评分

用于快速的评价操作，或对评价进行展示。

## 基本用法

设置`v-model`分数，设置`num`总分数，默认为5分。

```html
<wd-rate v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)

function changeValue({ value }) {
  console.log(value)
}
```

## 只读

设置 `readonly` 属性。

```html
<wd-rate v-model="value" readonly />
```

## 禁用

设置 `disabled` 属性和`disabled-color`

```html
<wd-rate :modelValue="2" disabled />
```

## 修改颜色

可以通过 `color` 属性修改未选中的颜色，`active-color` 修改选中的颜色。

```html
<wd-rate v-model="value" active-color="linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)" />
<wd-rate v-model="value" :active-color="['linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)', 'linear-gradient(315deg, rgba(245,34,34,1) 0%,rgba(255,117,102,1) 100%)']" />
```

## 修改icon

可以通过 `icon` 属性修改未选中的图标，`active-icon` 修改选中的图标。

```html
<wd-rate v-model="value" icon="wd-icon-dong" active-icon="wd-icon-dong" active-color="#4D80F0"/>
```

## 修改大小、间隔

可以通过 `size` 属性修改图标的大小，`space` 修改图标之间的间隔。

```html
<wd-rate v-model="value" size="30px" space="10px"/>
```

## 允许半选

设置 `allowHalf` 属性。

```html
<wd-rate v-model="value" allow-half />
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|--------|
| v-model |	当前分数 | number | - |	- | - |
| num	| 评分最大值 | number |	- |	5 | - |
| readonly | 是否只读 | boolean | - | false | - |
| size | 图标大小 | string | - | 16px | - |
| space | 图标间距 | string | - | 4px | - |
| color | 未选中的图标颜色 | string | - | #E8E8E8 | - |
| active-color | 选中的图标颜色(支持传颜色数组，共有 2 个元素，为 2 个分段所对应的颜色) | string/array | - | linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%) | - |
| icon | 未选中的图标类名 | string | - | wd-icon-star-on | - |
| active-icon | 选中的图标类名 | string | - | wd-icon-star-on | - |
| disabled | 是否禁用 | boolean | - | false | - |
| disabled-color | 禁用的图标颜色 | string | - | linear-gradient(315deg, rgba(177,177,177,1) 0%,rgba(199,199,199,1) 100%) | - |
| allow-half | 是否允许半选 | boolean | - | false | 1.7.0 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| change | 点击icon，修改分值事件 | `{ value }` | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
