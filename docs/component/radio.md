<frame/>

#  Radio 单选框


## 基本用法

`v-model` 为绑定值，即选中的 `wd-radio` 的 `value` 值。

```html
<demo-block title="基本用法">
  <wd-radio-group v-model="value">
    <wd-radio :value="1">单选框1</wd-radio>
    <wd-radio :value="2">单选框2</wd-radio>
  </wd-radio-group>
  <view>当前选中的值为:{{value}}</view>
</demo-block>
```
```typescript
const value = ref<number>(1)
```

## 修改图标形状

修改 `shape` 属性，可选值为 'dot'、'button'、'check'，默认为 'check'。

```html
<!-- button 按钮式单选 -->
<wd-radio-group v-model="value" shape="button" @change="change">
  <wd-radio :value="1">沃特</wd-radio>
  <wd-radio :value="2">商家后台</wd-radio>
</wd-radio-group>
```

```typescript
const value = ref<number>(1)

function change(e) {
  console.log(e)
}
```

> <div style="color: #FA4350;font-weight: 500;">注意：</div>
> <div>内容项在3项以内，且有比较重要的信息备选（如付款类型选择等）可考虑采用圆形组件。因为会跟圆形复选框容易混淆，且会造成当前表单页页面结构不统一，<span style="color: #FA4350;font-weight: 500;">一般情况不建议使用点状单选。</span></div>

```html
<!-- dot 点状单选 -->
<wd-radio-group v-model="value" shape="dot" @change="change">
  <wd-radio :value="1">沃特</wd-radio>
  <wd-radio :value="2">商家后台</wd-radio>
</wd-radio-group>
```


```typescript
const value = ref<number>(1)

function change(e) {
  console.log(e)
}
```

## 表单模式

设置 `cell` 属性，开启表单模式单选框组。

开启表单模式时，如果同时设置 `shape` 为 `button` 开启表单模式单选按钮组模式。

```html
<wd-radio-group v-model="value" cell>
  <wd-radio value="1">选项一</wd-radio>
  <wd-radio value="2">选项二</wd-radio>
  <wd-radio value="3">选项三</wd-radio>
  <wd-radio value="4">选项四</wd-radio>
  <wd-radio value="5">选项五</wd-radio>
  <wd-radio value="6">选项六</wd-radio>
  <wd-radio value="7">选项七</wd-radio>
</wd-radio-group>
```

``` ts
const value = ref<number>(1)
```

## 同行展示

设置 `inline` 属性，使单选框在同一行展示。

```html
<wd-radio-group v-model="value" inline>
  <wd-radio value="1">单选框1</wd-radio>
  <wd-radio value="2">单选框2</wd-radio>
</wd-radio-group>
```
``` ts
const value = ref<number>(1)
```

## 修改选中的颜色

设置 `checked-color` 属性。

```html
<wd-radio-group v-model="value" checked-color="#fa4350">
  <wd-radio value="1">沃特</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```
``` ts
const value = ref<number>(1)
```

## 禁用

可以在 `radio-group` 上面设置 `disabled`，禁用所有单选框，也可以在单个单选框上面设置 `disabled` 属性，禁用某个单选框。

```html
<wd-radio-group v-model="value" disabled>
  <wd-radio value="1">沃特</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```
``` ts
const value = ref<number>(1)
```

## 尺寸

设置 `size` 属性，可选 `large`。

```html
<wd-radio-group v-model="value" size="large">
  <wd-radio value="1">沃特</wd-radio>
  <wd-radio value="2">商家后台</wd-radio>
</wd-radio-group>
```

## Props优先级

radio设置的props优先级比radioGroup上设置的props优先级更高

```html
  <wd-radio-group v-model="value" shape="button" disabled checked-color="#f00">
    <wd-radio value="1" :disabled="false" checked-color="#000">商家后台</wd-radio>
    <wd-radio value="2" :disabled="false">沃特</wd-radio>
    <wd-radio value="3">商家智能</wd-radio>
  </wd-radio-group>
```

## RadioGroup Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| v-model | 会自动选中value对应的单选框 | string / number / boolean | - | - | - |
| shape | 单选框形状 | string | dot / button / check | check | - |
| size | 设置大小 | string | large | - | - |
| checked-color | 选中的颜色 | string | - | #4D80F0 | - |
| disabled | 禁用 | boolean | - | false | - |
| max-width | 文字位置最大宽度 | string | - | - | - |
| inline | 同行展示 | boolean | - | false | - |
| cell | 表单模式 | boolean | - | false | - |

## RadioGroup Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| change | 绑定值变化时触发 | `{ value }`  | - |

## Radio Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value | 单选框选中时的值。会自动匹配radioGroup的value | string / number / boolean | - | - | - |
| shape | 单选框形状 | string | dot / button / check | check | - |
| checked-color | 选中的颜色 | string | - | #4D80F0 | - |
| disabled | 禁用 | boolean | - | false | - |
