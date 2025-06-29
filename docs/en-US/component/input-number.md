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

## Disable Buttons

You can disable the increase or decrease buttons individually.

```html
<!-- Disable minus button -->
<wd-input-number v-model="value" @change="handleChange" disable-minus />

<!-- Disable plus button -->
<wd-input-number v-model="value" @change="handleChange" disable-plus />
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

## Non-Immediate Update Mode

Set `immediate-change` to `false`, the `change` event will not be triggered immediately when the input box content changes, only when it loses focus or buttons are clicked.

```html
<!-- Immediate update mode (default) -->
<wd-input-number v-model="value1" @change="handleChange" :immediate-change="true" />

<!-- Non-immediate update mode -->
<wd-input-number v-model="value2" @change="handleChange" :immediate-change="false" />
```

```typescript
const value1 = ref<number>(1)
const value2 = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## Auto-update on Initialization

Set the `update-on-init` property to control whether to update the `v-model` with the corrected value during initialization.

- When `update-on-init="true"` (default), the initial value will be corrected to comply with `min`, `max`, `step`, `precision` and other rules, and the `v-model` will be updated synchronously
- When `update-on-init="false"`, the initial value will not be corrected (v-model unchanged), but display formatting (such as precision) will still be applied

```html
<!-- Auto-update initial value (default) -->
<wd-input-number v-model="value1" @change="handleChange" :update-on-init="true" :min="3" :max="15" :step="2" step-strictly />

<!-- Don't update initial value, keep original value -->
<wd-input-number v-model="value2" @change="handleChange" :update-on-init="false" :min="3" :max="15" :step="2" step-strictly />
```

```typescript
const value1 = ref<number>(1) // Will be auto-corrected to 4 (minimum multiple of 2 that is ≥3)
const value2 = ref<number>(1) // Remains 1, will not be corrected but will be formatted for display
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
| immediate-change | Whether to respond to input changes immediately, false will only update on blur and button clicks | boolean | - | true | 1.10.0 |
| update-on-init | Whether to update v-model with corrected value during initialization | boolean | - | true | 1.10.0 |
| input-type | Input field type | string | number / digit | digit | 1.10.0 |

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