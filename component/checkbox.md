---
url: 'https://wot-design-uni.cn/component/checkbox.md'
---
# Checkbox 复选框

复选框用于在一组备选项中进行多选。

## 基本用法

通过 `v-model` 绑定复选框的勾选状态，单独使用时值为 `boolean` 类型。

```html
<wd-checkbox v-model="value" @change="handleChange">单选框1</wd-checkbox>
```

```typescript
const value = ref<boolean>(true)

function handleChange({ value }) {
  console.log(value)
}
```

## 修改图标形状

修改 `shape` 属性，可选值为 'circle'、'square'、'button'，默认为 'circle'。

```html
<wd-checkbox :modelValue="true" shape="square">沃特</wd-checkbox>
<wd-checkbox :modelValue="true" shape="button">沃特</wd-checkbox>
```

## 修改选中的颜色

设置 `checked-color` 属性。

```html
<wd-checkbox v-model="value" checked-color="#f00">沃特</wd-checkbox>
```

```typescript
const value = ref<boolean>(true)
```

## 修改选中和非选中的值

设置 `true-value` 和 `false-value` 修改选中值和非选中值。如果不设置，`change`事件的参数 默认为 `true` 和 `false` 切换。

```html
<wd-checkbox :modelValue="true" true-value="沃特" false-value="商家后台">复选框</wd-checkbox>
```

## 复选框组

通过 `v-model` 绑定复选框的勾选状态。

```html
<wd-checkbox-group v-model="value">
  <wd-checkbox modelValue="jingmai">沃特</wd-checkbox>
  <wd-checkbox modelValue="shop">商家后台</wd-checkbox>
</wd-checkbox-group>
```

```typescript
const value = ref<number[]>([])
```

设置 `cell` 属性，开启表单模式复选框组。

```html
<wd-checkbox-group v-model="value1" cell>
  <wd-checkbox modelValue="jingmai">沃特</wd-checkbox>
  <wd-checkbox modelValue="shop">商家后台</wd-checkbox>
</wd-checkbox-group>
```

开启表单模式时，如果同时设置 `shape` 为 `button` 自动开启表单复选按钮组模式。

```html
<wd-checkbox-group v-model="value2" cell shape="button">
  <wd-checkbox modelValue="1" disabled>选项一</wd-checkbox>
  <wd-checkbox modelValue="2">选项二</wd-checkbox>
  <wd-checkbox modelValue="3">选项三</wd-checkbox>
  <wd-checkbox modelValue="4">选项四</wd-checkbox>
  <wd-checkbox modelValue="5">选项五</wd-checkbox>
  <wd-checkbox modelValue="6">选项六</wd-checkbox>
  <wd-checkbox modelValue="7">选项七</wd-checkbox>
</wd-checkbox-group>
```

```typescript
const value = ref(['jingmai'])
const value1 = ref(['jingmai'])
const value2 = ref(['1'])
```

## 同行展示

设置 `inline` 属性，使复选框在同一行展示。

```html
<wd-checkbox-group v-model="value" inline>
  <wd-checkbox modelValue="jingmai">沃特</wd-checkbox>
  <wd-checkbox modelValue="shop">商家后台</wd-checkbox>
</wd-checkbox-group>
```

```typescript
const value = ref(['jingmai'])
```

## 禁用

可以在 `checkbox-group` 上面设置 `disabled`，禁用所有复选框，也可以在单个复选框上面设置 `disabled` 属性，禁用某个复选框。

```html
<wd-checkbox-group v-model="value" disabled>
  <wd-checkbox modelValue="jingmai">沃特</wd-checkbox>
  <wd-checkbox modelValue="shop">商家后台</wd-checkbox>
</wd-checkbox-group>
```

```typescript
const value = ref(['jingmai'])
```

## 设置选中数量的上限和下限

`min` 属性设置最小选中的数量，`max` 属性设置最大选中的数量。如果要默认设置某个选项固定被选中，则给该复选框设置 disabled，且 `value` 中有该选项的值。

```html
<wd-checkbox-group v-model="value" :min="1" :max="3">
  <wd-checkbox modelValue="jd">京东</wd-checkbox>
  <wd-checkbox modelValue="jingmai">沃特</wd-checkbox>
  <wd-checkbox modelValue="shop">商家后台</wd-checkbox>
  <wd-checkbox modelValue="market">营销中心</wd-checkbox>
</wd-checkbox-group>
```

```typescript
const value = ref(['jd'])
```

## 尺寸

设置 `size` 属性，可选 `large`。

```html
<wd-checkbox-group v-model="value" size="large">
  <wd-checkbox modelValue="1">沃特</wd-checkbox>
  <wd-checkbox modelValue="2">商家后台</wd-checkbox>
</wd-checkbox-group>
```

## 结合 Cell 使用

通过 `Checkbox` 实例上的 `toggle` 方法触发选中状态切换。

```html
<wd-cell-group border>
  <wd-checkbox-group v-model="value" size="large">
    <wd-cell title="点赞" center clickable @click="handleCheck1">
      <view @click.stop="noop">
        <wd-checkbox model-value="1" ref="checkBox1" custom-style="margin:0;"></wd-checkbox>
      </view>
    </wd-cell>
    <wd-cell title="投币" center clickable @click="handleCheck2">
      <view @click.stop="noop">
        <wd-checkbox model-value="2" ref="checkBox2" custom-style="margin:0;"></wd-checkbox>
      </view>
    </wd-cell>
    <wd-cell title="一键三连" center clickable @click="handleCheck3">
      <view @click.stop="noop">
        <wd-checkbox model-value="3" ref="checkBox3" custom-style="margin:0;"></wd-checkbox>
      </view>
    </wd-cell>
  </wd-checkbox-group>
</wd-cell-group>
```

```ts
import { ref } from 'vue'
const value = ref<string[]>([])
const checkBox1 = ref<CheckboxInstance>()
const checkBox2 = ref<CheckboxInstance>()
const checkBox3 = ref<CheckboxInstance>()

function handleCheck1() {
  checkBox1.value && checkBox1.value.toggle()
}

function handleCheck2() {
  checkBox2.value && checkBox2.value.toggle()
}
function handleCheck3() {
  checkBox3.value && checkBox3.value.toggle()
}

function noop() {}
```

## Checkbox Attributes

| 参数          | 说明                                                                 | 类型                      | 可选值                   | 默认值  | 最低版本 |
| ------------- | -------------------------------------------------------------------- | ------------------------- | ------------------------ | ------- | -------- |
| v-model       | 单选框选中时的值                                                     | string / number / boolean | -                        | -       | -        |
| shape         | 单选框形状                                                           | string                    | circle / square / button | circle  | -        |
| checked-color | 选中的颜色                                                           | string                    | -                        | #4D80F0 | -        |
| disabled      | 禁用                                                                 | boolean                   | -                        | false   | -        |
| max-width     | 文字位置最大宽度                                                     | string                    | -                        | -       | -        |
| true-value    | 选中值，在 checkbox-group 中使用无效，需同 false-value 一块使用      | string / number           | -                        | true    | -        |
| false-value   | 非选中时的值，在 checkbox-group 中使用无效，需同 true-value 一块使用 | string /number            | -                        | false   | -        |
| size          | 设置大小                                                             | string                    | large                    | -       | -        |

## CheckboxGroup Attributes

| 参数          | 说明                                   | 类型    | 可选值                   | 默认值  | 最低版本 |
| ------------- | -------------------------------------- | ------- | ------------------------ | ------- | -------- |
| v-model       | 绑定值                                 | Array   | -                        | -       | -        |
| shape         | 单选框形状                             | string  | circle / square / button | circle  | -        |
| cell          | 表单模式                               | boolean | -                        | false   | -        |
| checked-color | 选中的颜色                             | string  | -                        | #4D80F0 | -        |
| disabled      | 禁用                                   | boolean | -                        | false   | -        |
| min           | 最小选中的数量                         | number  | -                        | 0       | -        |
| max           | 最大选中的数量，0 为无限数量，默认为 0 | number  | -                        | 0       | -        |
| inline        | 同行展示                               | boolean | -                        | false   | -        |
| size          | 设置大小                               | string  | large                    | -       | -        |

## Checkbox Methods

| 方法名称 | 说明                                  | 参数 | 最低版本 |
| -------- | ------------------------------------- | ---- | -------- |
| toggle   | 切换当前选中状态,同时触发 change 事件 | -    | 1.2.16   |

## Checkbox Events

| 事件名称 | 说明                                                                 | 参数        | 最低版本 |
| -------- | -------------------------------------------------------------------- | ----------- | -------- |
| change   | 绑定值变化时触发，当为复选框组时参数为 boolean，表示该复选框是否选中 | `{ value }` | -        |

## CheckboxGroup Events

| 事件名称 | 说明             | 参数        | 最低版本 |
| -------- | ---------------- | ----------- | -------- |
| change   | 绑定值变化时触发 | `{ value }` | -        |

## Checkbox 外部样式类

| 类名               | 说明             | 最低版本 |
| ------------------ | ---------------- | -------- |
| custom-class       | 根节点样式       | -        |
| custom-label-class | 文字结点样式     | -        |
| custom-shape-class | 单选图标结点样式 | -        |

## CheckboxGroup 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
