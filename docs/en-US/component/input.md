# Input

Input component for text entry.

## Basic Usage

The `v-model` attribute binds the input value.

```html
<wd-input v-model="value" placeholder="Please enter content"></wd-input>
```

```typescript
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      value: ''
    })

    return {
      ...toRefs(state)
    }
  }
}
```

## Label

Set the `label` attribute to display the label on the left side of the input.

```html
<wd-input v-model="value" label="Label"></wd-input>
```

## Label Width

Set the `label-width` attribute to customize the width of the label.

```html
<wd-input v-model="value" label="Label" label-width="100px"></wd-input>
```

## Input Type

Set the `type` attribute to define the input type, supporting all native input types.

```html
<wd-input v-model="value" label="Text" type="text"></wd-input>
<wd-input v-model="value" label="Password" type="password"></wd-input>
<wd-input v-model="value" label="Number" type="number"></wd-input>
<wd-input v-model="value" label="Phone" type="tel"></wd-input>
```

## Disabled

Set the `disabled` attribute to disable the input.

```html
<wd-input v-model="value" label="Disabled" disabled></wd-input>
```

## Read Only

Set the `readonly` attribute to make the input read-only.

```html
<wd-input v-model="value" label="Read Only" readonly></wd-input>
```

## Show Clear Button

Set the `clearable` attribute to show a clear button when the input has content.

```html
<wd-input v-model="value" label="Clear Button" clearable></wd-input>
```

## Show Password

Set the `show-password` attribute to show a button to toggle password visibility when the input type is password.

```html
<wd-input v-model="value" label="Password" type="password" show-password></wd-input>
```

## Prefix Icon

Set the `prefix-icon` attribute to display an icon at the beginning of the input.

```html
<wd-input v-model="value" label="Prefix Icon" prefix-icon="search"></wd-input>
```

## Suffix Icon

Set the `suffix-icon` attribute to display an icon at the end of the input.

```html
<wd-input v-model="value" label="Suffix Icon" suffix-icon="search"></wd-input>
```

## Custom Icon Click Event

Set the `on-click-prefix-icon` and `on-click-suffix-icon` attributes to handle icon click events.

```html
<wd-input
  v-model="value"
  label="Click Icon"
  prefix-icon="search"
  suffix-icon="search"
  @click-prefix-icon="handleClickIcon"
  @click-suffix-icon="handleClickIcon"
></wd-input>
```

```typescript
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      value: ''
    })

    const handleClickIcon = () => {
      console.log('click icon')
    }

    return {
      ...toRefs(state),
      handleClickIcon
    }
  }
}
```

## Input Size

Set the `size` attribute to customize the size of the input, supporting 'large' and 'small'.

```html
<wd-input v-model="value" label="Large" size="large"></wd-input>
<wd-input v-model="value" label="Default"></wd-input>
<wd-input v-model="value" label="Small" size="small"></wd-input>
```

## Input Length Limit

Set the `maxlength` attribute to limit the maximum input length.

```html
<wd-input v-model="value" label="Length Limit" maxlength="10"></wd-input>
```

## Input Alignment

Set the `input-align` attribute to customize the alignment of the input text, supporting 'left', 'center', and 'right'.

```html
<wd-input v-model="value" label="Left" input-align="left"></wd-input>
<wd-input v-model="value" label="Center" input-align="center"></wd-input>
<wd-input v-model="value" label="Right" input-align="right"></wd-input>
```

## Cell Style

Set the `cell` attribute to display the input in cell style.

```html
<wd-input v-model="value" label="Cell Style" cell></wd-input>
```

## Custom Label

Use the `label` slot to customize the label content.

```html
<wd-input v-model="value">
  <template #label>
    <view style="display: inline-flex; align-items: center;">
      <view>Custom Label</view>
      <wd-icon name="question-fill" style="margin-left: 4px; color: #4D80F0;"></wd-icon>
    </view>
  </template>
</wd-input>
```

## Custom Input

Use the `prefix` and `suffix` slots to customize the content before and after the input.

```html
<wd-input v-model="value" label="Custom Input">
  <template #prefix>
    <view style="padding: 0 10px;">Prefix</view>
  </template>
  <template #suffix>
    <view style="padding: 0 10px;">Suffix</view>
  </template>
</wd-input>
```

## Error Status

Set the `error` attribute to display the input in error status.

```html
<wd-input v-model="value" label="Error" error></wd-input>
```

## Error Message

Set the `error-message` attribute to display an error message below the input.

```html
<wd-input v-model="value" label="Error Message" error-message="Error message"></wd-input>
```

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| v-model | Input value | string / number | - | - |
| label | Input label | string | - | - |
| placeholder | Input placeholder | string | - | - |
| type | Input type | string | text | - |
| disabled | Whether to disable the input | boolean | false | - |
| readonly | Whether the input is read-only | boolean | false | - |
| clearable | Whether to show the clear button | boolean | false | - |
| show-password | Whether to show the password toggle button | boolean | false | - |
| prefix-icon | Prefix icon name | string | - | - |
| suffix-icon | Suffix icon name | string | - | - |
| size | Input size, can be 'large' or 'small' | string | - | - |
| error | Whether to show error status | boolean | false | - |
| error-message | Error message | string | - | - |
| name | Native name attribute | string | - | - |
| maxlength | Maximum input length | string / number | - | - |
| input-align | Input text alignment, can be 'left', 'center', or 'right' | string | left | - |
| label-width | Label width | string | 33% | - |
| cell | Whether to display in cell style | boolean | false | - |
| required | Whether to display the required asterisk | boolean | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | 'before' | $LOWEST_VERSION$ |
| center | Whether to vertically center the content | boolean | false | - |
| active-color | Active color when focused | string | - | - |
| adjust-position | Whether to adjust the position when the keyboard is displayed | boolean | true | - |
| cursor-spacing | The distance from the cursor to the keyboard when focused | number | 0 | - |
| auto-focus | Whether to auto focus | boolean | false | - |
| always-embed | Whether to always embed the input in a native input element | boolean | false | - |
| confirm-type | The text of the confirm button on the keyboard, can be 'send', 'search', 'next', 'go', 'done' | string | done | - |
| confirm-hold | Whether to keep the keyboard displayed after the confirm button is pressed | boolean | false | - |
| cursor | The initial position of the cursor | number | - | - |
| selection-start | The start position of the selection | number | -1 | - |
| selection-end | The end position of the selection | number | -1 | - |
| hold-keyboard | Whether to keep the keyboard displayed | boolean | false | - |
| safe-padding-bottom | Whether to enable bottom safe area padding | boolean | false | - |

## Events

| Event Name | Description | Parameters | Version |
|---------|---------|---------|------|
| change | Triggered when the input value changes | value: input value | - |
| focus | Triggered when the input is focused | event: Event | - |
| blur | Triggered when the input loses focus | event: Event | - |
| clear | Triggered when the clear button is clicked | - | - |
| click-prefix-icon | Triggered when the prefix icon is clicked | event: Event | - |
| click-suffix-icon | Triggered when the suffix icon is clicked | event: Event | - |
| confirm | Triggered when the confirm button on the keyboard is pressed | event: Event | - |

## Slots

| Name | Description | Version |
|---------|---------|------|
| label | Custom label | - |
| prefix | Content before the input | - |
| suffix | Content after the input | - |

## External Style Classes

| Class Name | Description | Version |
|---------|---------|------|
| custom-class | Root node custom class | - |
| custom-label-class | Label custom class | - |
| custom-input-class | Input custom class | - |