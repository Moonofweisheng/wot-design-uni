<frame/>

# InputNumber 计数器

## 基本用法

通过 `v-model` 绑定输入值，可以通过 `change` 事件监听到输入值的变化。

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange1({ value }) {
  console.log(value)
}
```

## 设置步长

设置 `step` 步长，即每次value变化的绝对值。

```html
<wd-input-number v-model="value" @change="handleChange" :step="2" />
```

## 设置最小最大值

设置 `min` 最小值，`max` 最大值。`min` 默认为1。

```html
<wd-input-number v-model="value" @change="handleChange" :min="3" :max="10" />
```

## 禁用

设置 `disabled` 属性。

```html
<wd-input-number v-model="value" @change="handleChange" disabled />
```

## 禁用输入框

设置 `disable-input` 属性。

```html
<wd-input-number v-model="value" @change="handleChange" disable-input />
```

## 无输入框

设置 `without-input` ，不展示输入框。

```html
<wd-input-number v-model="value" @change="handleChange" without-input />
```

## 设置小数精度

设置 `precision` 属性，默认为0。

```html
<wd-input-number v-model="value" @change="handleChange" :precision="2" :step="0.1" />
```

## 严格步数倍数

设置 `step-strictly` 属性，强制输入框输入内容为 `step` 的倍数（当用户输入完成后触发change时，会更正输入框内容）。

```html
<wd-input-number v-model="value" @change="handleChange" step-strictly :step="2" />
```

## 修改输入框宽度

设置 `input-width` 设置宽度，该值接受1个字符串，可以是表示尺寸的任何单位。

```html
<wd-input-number v-model="value" @change="handleChange" input-width="70px" />
```

## 允许空值，设置 placeholder

设置 `allow-null` 属性允许空值，设置 `placeholder` 提示填写。

```html
<wd-input-number v-model="value" allow-null placeholder="不限" @change="handleChange" />
```

```typescript
const value = ref<number|string>('')
function handleChange1({ value }) {
  console.log(value)
}
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| v-model | 绑定值 | number / string | - | - | - |
| min | 最小值 | number | - | 1 | - |
| max | 最大值 | number | - | Infinity | - |
| step | 步数 | number | - | 1 | - |
| step-strictly | 严格值为步数的倍数 | boolean | - | false | - |
| precision | 小数精度 | number | - | 0 | - |
| disabled | 禁用 | boolean | - | false | - |
| without-input | 不显示输入框 | boolean | - | false | - |
| input-width | 输入框宽度 | string | - | 36px | - |
| allow-null | 允许空值 | boolean | - | false | - |
| placeholder | 占位文本 | string | - | - | - |
| disable-input | 禁用输入框 | boolean | - | false | 0.2.14 |
| disable-plus | 禁用增加按钮 | boolean | - | false | 0.2.14 |
| disable-minus | 禁用减少按钮 | boolean | - | false | 0.2.14 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| change | 值修改事件 | `{ value }` | - |
| focus | 输入框获取焦点事件 | `{ value, height }` | - |
| blur | 输入框失去焦点事件 | `{ value }` | - |

## Slots

| name   | 说明                 | 参数                    | 最低版本 |
| ------ | -------------------- | ----------------------- | -------- |
| left-icon  | 左侧图标         | `{ value }` | $LOWEST_VERSION$   |
| right-icon  | 右侧图标         | `{ value }` | $LOWEST_VERSION$   |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
