---
url: 'https://wot-design-uni.cn/component/input-number.md'
---
# InputNumber 计数器

由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

## 基本用法

通过 `v-model` 绑定输入值，可以通过 `change` 事件监听到输入值的变化。

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
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

## 禁用按钮

可以单独禁用增加或减少按钮。

```html
<!-- 禁用减号按钮 -->
<wd-input-number v-model="value" @change="handleChange" disable-minus />

<!-- 禁用加号按钮 -->
<wd-input-number v-model="value" @change="handleChange" disable-plus />
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
function handleChange({ value }) {
  console.log(value)
}
```

## 非立即更新模式

设置 `immediate-change` 为 `false`，输入框内容变化时不会立即触发 `change` 事件，仅在失焦或点击按钮时触发。

```html
<!-- 立即更新模式（默认） -->
<wd-input-number v-model="value1" @change="handleChange" :immediate-change="true" />

<!-- 非立即更新模式 -->
<wd-input-number v-model="value2" @change="handleChange" :immediate-change="false" />
```

```typescript
const value1 = ref<number>(1)
const value2 = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## 初始化时自动更新

设置 `update-on-init` 属性控制是否在初始化时更新 `v-model` 为修正后的值。

* 当 `update-on-init="true"`（默认）时，会将初始值修正到符合 `min`、`max`、`step`、`precision` 等规则的有效值，并同步更新 `v-model`
* 当 `update-on-init="false"` 时，保持初始值不修正（不改变 `v-model`），但仍会进行显示格式化（如精度处理）

```html
<!-- 自动更新初始值（默认） -->
<wd-input-number v-model="value1" @change="handleChange" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly />

<!-- 不更新初始值，保持原始值 -->
<wd-input-number v-model="value2" @change="handleChange" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly />
```

```typescript
const value1 = ref<number>(1) // 会自动修正为4（≥3的最小2的倍数）
const value2 = ref<number>(1) // 保持为1，不会修正但会格式化显示
function handleChange({ value }) {
  console.log(value)
}
```

## 异步变更

通过 `before-change` 可以在输入值变化前进行校验和拦截。

```html
<wd-input-number v-model="value" :before-change="beforeChange" />
```

```typescript
import { ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-input-number/types'
const { loading, close } = useToast()

const value = ref<number>(1)
 
const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: `正在更新到${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
```

## 长按加减

设置 `long-press` 属性，允许长按加减。

```html
<wd-input-number v-model="value" long-press @change="handleChange" />
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
| allow-null | 是否允许输入的值为空，设置为 `true` 后允许传入空字符串 | boolean | - | false | - |
| placeholder | 占位文本 | string | - | - | - |
| disable-input | 禁用输入框 | boolean | - | false | 0.2.14 |
| disable-plus | 禁用增加按钮 | boolean | - | false | 0.2.14 |
| disable-minus | 禁用减少按钮 | boolean | - | false | 0.2.14 |
| adjustPosition | 原生属性，键盘弹起时，是否自动上推页面 | boolean | - | true | 1.3.11 |
| before-change | 输入框值改变前触发，返回 false 会阻止输入框值改变，支持返回 `Promise` | `(value: number \| string) => boolean \| Promise<boolean>` | - | - | 1.6.0 |
| long-press | 是否允许长按进行加减 | boolean | - | false | 1.8.0 |
| immediate-change | 是否立即响应输入变化，false 时仅在失焦和按钮点击时更新 | boolean | - | true | 1.10.0 |
| update-on-init | 是否在初始化时更新 v-model 为修正后的值 | boolean | - | true | 1.10.0 |
| input-type | 输入框类型 | string | number / digit | digit | 1.10.0 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| change | 值修改事件 | ` { value }` | - |
| focus | 输入框获取焦点事件 | ` { value, height }` | - |
| blur | 输入框失去焦点事件 | ` { value }` | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
