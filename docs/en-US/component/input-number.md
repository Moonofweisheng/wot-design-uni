 # InputNumber

Composed of increase button, decrease button and input box, used for inputting and adjusting numbers within a certain range.

## Basic Usage

Bind the input value through `v-model`, and you can listen to the change of input value through the `change` event.

```html
<wd-input-number v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## Set Step

Set `step` as the step size, which is the absolute value of each value change.

```html
<wd-input-number v-model="value" @change="handleChange" :step="2" />
```

## Set Minimum and Maximum Values

Set `min` as the minimum value and `max` as the maximum value. The default value of `min` is 1.

```html
<wd-input-number v-model="value" @change="handleChange" :min="3" :max="10" />
```

## Disabled

Set the `disabled` property.

```html
<wd-input-number v-model="value" @change="handleChange" disabled />
```

## Disable Input Box

Set the `disable-input` property.

```html
<wd-input-number v-model="value" @change="handleChange" disable-input />
```

## Without Input Box

Set `without-input` to hide the input box.

```html
<wd-input-number v-model="value" @change="handleChange" without-input />
```

## Set Decimal Precision

Set the `precision` property, default is 0.

```html
<wd-input-number v-model="value" @change="handleChange" :precision="2" :step="0.1" />
```

## Strict Step Multiple

Set the `step-strictly` property to force the input box content to be a multiple of `step` (when the user completes the input and triggers change, the input box content will be corrected).

```html
<wd-input-number v-model="value" @change="handleChange" step-strictly :step="2" />
```

## Modify Input Box Width

Set `input-width` to set the width. This value accepts a string and can be any unit that represents size.

```html
<wd-input-number v-model="value" @change="handleChange" input-width="70px" />
```

## Allow Empty Value, Set Placeholder

Set the `allow-null` property to allow empty values, set `placeholder` to prompt filling.

```html
<wd-input-number v-model="value" allow-null placeholder="No limit" @change="handleChange" />
```

```typescript
const value = ref<number|string>('')
function handleChange({ value }) {
  console.log(value)
}
```

## Asynchronous Change

Through `before-change`, you can validate and intercept before the input value changes.

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
  loading({ msg: `Updating to ${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
```

## Long Press for Increment/Decrement

Set the `long-press` property to allow long press for increment/decrement.

```html
<wd-input-number v-model="value" long-press @change="handleChange" />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Binding value | number / string | - | - | - |
| min | Minimum value | number | - | 1 | - |
| max | Maximum value | number | - | Infinity | - |
| step | Step size | number | - | 1 | - |
| step-strictly | Strictly value as multiple of step | boolean | - | false | - |
| precision | Decimal precision | number | - | 0 | - |
| disabled | Disabled | boolean | - | false | - |
| without-input | Hide input box | boolean | - | false | - |
| input-width | Input box width | string | - | 36px | - |
| allow-null | Whether to allow empty value, when set to `true`, allows passing empty string | boolean | - | false | - |
| placeholder | Placeholder text | string | - | - | - |
| disable-input | Disable input box | boolean | - | false | 0.2.14 |
| disable-plus | Disable increase button | boolean | - | false | 0.2.14 |
| disable-minus | Disable decrease button | boolean | - | false | 0.2.14 |
| adjustPosition | Native property, whether to automatically push up the page when keyboard pops up | boolean | - | true | 1.3.11 |
| before-change | Triggered before input box value changes, returning false will prevent input box value from changing, supports returning `Promise` | `(value: number \| string) => boolean \| Promise<boolean>` | - | - | 1.6.0 |
| long-press | Whether to allow long press for increment/decrement | boolean | - | false | 1.8.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Value modification event | `{ value }` | - |
| focus | Input box focus event | `{ value, height }` | - |
| blur | Input box blur event | `{ value }` | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |