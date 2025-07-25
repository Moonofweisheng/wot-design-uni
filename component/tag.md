---
url: 'https://wot-design-uni.cn/component/tag.md'
---
# Tag 标签

用于标记状态或者概括主要内容。

## 基本用法

设置 `type` 修改标签类型。

```html
<wd-tag custom-class="space">标签</wd-tag>
<wd-tag custom-class="space" type="primary">标签</wd-tag>
<wd-tag custom-class="space" type="danger">标签</wd-tag>
<wd-tag custom-class="space" type="warning">标签</wd-tag>
<wd-tag custom-class="space" type="success">标签</wd-tag>
```

```scss
:deep(.space) {
  margin: 0 10px 10px;
}
```

## 幽灵标签

设置 `plain` 属性。

```html
<wd-tag plain>标签</wd-tag>
<wd-tag type="primary" plain>标签</wd-tag>
<wd-tag type="danger" plain>标签</wd-tag>
<wd-tag type="warning" plain>标签</wd-tag>
<wd-tag type="success" plain>标签</wd-tag>
```

## 标记标签

设置 `mark` 属性。

```html
<wd-tag mark>标签</wd-tag>
<wd-tag type="primary" mark>标签</wd-tag>
<wd-tag type="danger" mark>标签</wd-tag>
<wd-tag type="warning" mark>标签</wd-tag>
<wd-tag type="success" mark>标签</wd-tag>
```

## 幽灵标记标签

同时设置 `mark` 和 `plain` 属性。

```html
<wd-tag mark plain>标签</wd-tag>
<wd-tag type="primary" mark plain>标签</wd-tag>
<wd-tag type="danger" mark plain>标签</wd-tag>
<wd-tag type="warning" mark plain>标签</wd-tag>
<wd-tag type="success" mark plain>标签</wd-tag>
```

## 圆角标签

设置 `round` 属性。

```html
<wd-tag round>标签</wd-tag>
<wd-tag type="primary" round>标签</wd-tag>
<wd-tag type="danger" round>标签</wd-tag>
<wd-tag type="warning" round>标签</wd-tag>
<wd-tag type="success" round>标签</wd-tag>
```

## 设置图标

设置 `icon` 左侧图标，也可以使用 'icon' 的 slot 插槽,此时要开启`use-icon-slot`。

```html
<wd-tag custom-class="space" icon="clock" mark>标签</wd-tag>
<wd-tag custom-class="space" mark use-icon-slot>
  <text>插槽</text>
  <template #icon>
    <wd-icon name="clock" />
  </template>
</wd-tag>
```

## 自定义颜色

设置 `color` 修改文字颜色，设置 `bg-color` 修改背景色和边框颜色。

```html
<wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
<wd-tag color="#FAA21E" bg-color="#FAA21E" plain>标签</wd-tag>
```

## 可关闭

设置 `closable` 属性，允许标签关闭，关闭时会触发 `close` 事件。

```html
<wd-tag closable round type="primary">标签</wd-tag>
```

## 新增标签

设置 `dynamic` 属性，该标签为新增样式，输入内容确定后触发 `confirm` 事件。

```html
<wd-tag v-for="(tag, index) in tags" :key="index" custom-class="space" round closable @close="handleClose(index)">{{item}}</wd-tag>
<wd-tag custom-class="space" round dynamic @confirm="handleConfirm"></wd-tag>
```

如果想自定义新增样式的话，可以使用`add`插槽实现。

```html
<wd-tag custom-class="space" round dynamic @confirm="handleConfirm">
  <template #add>
    <wd-icon name="pin" size="12px"></wd-icon>
    <text style="margin-left: 4px">自定义</text>
  </template>
</wd-tag>
```

```typescript
const tags = ref(['标签一', '标签二'])

function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}

function handleConfirm({ value }) {
  if (!value) return
  tags.value = [...tags.value, value]
}
```

## 事件

```html
<wd-tag v-for="(tag, index) in tags" :key="index" round closable @click="handleClick(index)" @close="handleClose(index)">{{tag.value}}</wd-tag>
```

```typescript
const tags = ref([
  {
    plain: true,
    closable: true,
    type: 'primary',
    value: '标签一'
  }
])

function handleClick(index) {
  console.log('click:index' + index)
}
function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}
```

## Attributes

| 参数          | 说明                     | 类型    | 可选值                                       | 默认值 | 最低版本 |
| ------------- | ------------------------ | ------- | -------------------------------------------- | ------ | -------- |
| type          | 标签类型                 | string  | `default` / `primary` / `danger` / `warning` / `success` | default      | -        |
| plain         | 幽灵类型                 | boolean | -                                            | false  | -        |
| mark          | 标记类型                 | boolean | -                                            | false  | -        |
| round         | 圆角类型                 | boolean | -                                            | false  | -        |
| icon          | 左侧图标                 | string  | -                                            | -      | -        |
| color         | 文字颜色                 | string  | -                                            | -      | -        |
| bg-color      | 背景色和边框色           | string  | -                                            | -      | -        |
| closable      | 可关闭(只对圆角类型支持) | boolean | -                                            | false  | -        |
| use-icon-slot | 开启图标插槽             | boolean | -                                            | false  | -        |
| dynamic       | 是否为新增标签           | boolean | -                                            | false  | -        |

## Events

| 事件名称 | 说明                       | 参数        | 最低版本 |
| -------- | -------------------------- | ----------- | -------- |
| click    | 标签点击时触发             | event       | -        |
| close    | 点击关闭按钮时触发         | event       | -        |
| confirm  | 新增标签输入内容确定后触发 | `{ value }` | -        |

## Slots

| name | 说明                                        | 最低版本 |
| ---- | ------------------------------------------- | -------- |
| icon | 图标                                        | -        |
| add  | 自定义新增标签插槽，`dynamic`为`true`时生效 | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
