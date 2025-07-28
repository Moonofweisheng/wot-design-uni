# SelectPicker

Used for single or multiple selection from a set of options.

## Basic Usage

`label` sets the left text content;

`columns` sets the data source, a one-dimensional array where each option contains `value` (option value) and `label` (option name);

`v-model` sets the value of selected items, data type can be `Array` | `String` `Number` or `Boolean`;

```html
<wd-select-picker label="Basic Usage" v-model="value" :columns="columns" @change="handleChange"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([{
  value: '101',
  label: 'Men\'s Clothing'
}, {
  value: '102',
  label: 'Luxury Goods'
}, {
  value: '103',
  label: 'Women\'s Clothing'
}])
const value = ref<string[]>(['101'])

function handleChange({ value }) {
  toast.show('Selected ' + value)
}
```

## Type Switch

`type` defaults to `checkbox`, when it's the default value, the value type is `Array`

Set `type` to `radio` to enable single selection mode, where value type can be `String` `Number` or `Boolean`.

```html
<wd-select-picker label="Type Switch" v-model="value" :columns="columns" type="radio"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([{
  value: '101',
  label: 'Men\'s Clothing'
}, {
  value: '102',
  label: 'Luxury Goods'
}, {
  value: '103',
  label: 'Women\'s Clothing'
}])
const value = ref<string[]>(['101'])
```

## Disabled

Set the `disabled` property.

```html
<wd-select-picker label="Disabled" v-model="value" :columns="columns" disabled></wd-select-picker>
```

## Readonly

Set the `readonly` property.

```html
<wd-select-picker label="Readonly" v-model="value" :columns="columns" readonly></wd-select-picker>
```

## Clearable

Set the `clearable` property

```html
<wd-select-picker label="Clearable" v-model="value" :columns="columns" clearable></wd-select-picker>
```

## Disabled Options

Each option in `columns` supports the `disabled` property.

```html
<wd-select-picker label="Disabled Options" v-model="value" :columns="columns"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([{
  value: '101',
  label: 'Men\'s Clothing',
  disabled: true
}, {
  value: '102',
  label: 'Luxury Goods'
}, {
  value: '103',
  label: 'Women\'s Clothing'
}])
const value = ref<string[]>(['101'])
```

## Display Formatting

Set the `display-format` property, which is a `function` type that receives the current selected item (when type is `checkbox` the parameter is array type, when type is `radio` the parameter is `String` `Number` or `Boolean` type) and the current options array `columns`, returns the string to be displayed.

```html
<wd-select-picker label="Display Formatting" v-model="value" :columns="columns" :display-format="displayFormat"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([{
  value: '101',
  label: 'Men\'s Clothing',
  disabled: true
}, {
  value: '102',
  label: 'Luxury Goods'
}, {
  value: '103',
  label: 'Women\'s Clothing'
}])
const value = ref<string[]>(['101'])

const displayFormat = (items, columns) => {
  let showValue = ''
  columns.forEach((column) => {
    items.forEach((item, index) => {
      if (column.value === item) {
        showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
      }
    })
  })
  return showValue
}
```

## Validation Before Confirmation

Set the `before-confirm` function, which will be executed when the user clicks the `confirm` button. It receives `value` (selected items, which is the currently selected value) and `resolve` parameters. You can validate the `value` and use the `resolve` function to tell the component whether to confirm. `resolve` accepts 1 boolean value, `resolve(true)` means the option passes, `resolve(false)` means the option doesn't pass, and the popup won't close when it doesn't pass.

```html
<wd-select-picker label="Validation Before Confirmation" v-model="value" :columns="columns" :before-confirm="beforeConfirm"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([{
  value: '101',
  label: 'Men\'s Clothing'
}, {
  value: '102',
  label: 'Luxury Goods'
}, {
  value: '103',
  label: 'Women\'s Clothing'
}])
const value = ref<string[]>(['101'])

const beforeConfirm = (value, resolve) => {
  if (value.length > 0) {
    toast.error('Unable to select products at this time')
    resolve(false)
  } else {
    resolve(true)
  }
}
```

## Setting Title

Set the `title` property to modify the popup layer's title.

```html
<wd-select-picker label="Title" v-model="value" :columns="columns" title="Multiple Selection"></wd-select-picker>
```

## Error State

Set the `error` property or `error-message` property to display the error state.

```html
<wd-select-picker label="Error State" v-model="value" :columns="columns" error></wd-select-picker>
<wd-select-picker label="Error Message" v-model="value" :columns="columns" error-message="Error Message"></wd-select-picker>
```

## Custom Label Width

Set the `label-width` property to customize the label width. The default is '33%'.

```html
<wd-select-picker label="Label Width" v-model="value" :columns="columns" label-width="100px"></wd-select-picker>
```

## Size

Set the `size` property to customize the size. The default is ''.

```html
<wd-select-picker label="Large" v-model="value" :columns="columns" size="large"></wd-select-picker>
<wd-select-picker label="Small" v-model="value" :columns="columns" size="small"></wd-select-picker>
```

## Align

Set the `align` property to customize the alignment of the right content. The default is 'left'.

```html
<wd-select-picker label="Align" v-model="value" :columns="columns" align="right"></wd-select-picker>
```

## Custom Value Key

Set the `value-key` property to customize the key name of the option value.

```html
<wd-select-picker label="Custom Value Key" v-model="value" :columns="columns" value-key="value"></wd-select-picker>
```

## Custom Label Key

Set the `label-key` property to customize the key name of the option label.

```html
<wd-select-picker label="Custom Label Key" v-model="value" :columns="columns" label-key="label"></wd-select-picker>
```

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|-------------|------|---------|------|
| v-model | Selected value | string / number / boolean / array | - | - |
| columns | Options | array | - | - |
| type | Type, 'checkbox' or 'radio' | string | 'checkbox' | - |
| value-key | Customize the key name of option value | string | 'value' | - |
| label-key | Customize the key name of option label | string | 'label' | - |
| title | Title | string | - | - |
| label | Left text | string | - | - |
| placeholder | Placeholder | string | '请选择' | - |
| disabled | Disabled | boolean | false | - |
| readonly | Readonly | boolean | false | - |
| loading | Loading | boolean | false | - |
| loading-color | Loading color | string | '#4D80F0' | - |
| label-width | Label width | string | '33%' | - |
| size | Size | string | - | - |
| error | Whether to be in error state | boolean | false | - |
| error-message | Error message | string | - | - |
| required | Whether to display the required asterisk | boolean | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | 'before' | $LOWEST_VERSION$ |
| align | Alignment of right content | string | 'left' | - |
| before-confirm | Validation function before confirming | function | - | - |
| display-format | Display format function | function | - | - |
| close-on-click-modal | Whether to close when clicking modal | boolean | true | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | boolean | true | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | false | 1.11.0 |
| clearable | Show clear button | boolean | false | 1.11.0 |

## Events

| Event | Description | Parameters | Version |
|--------|-------------|------------|------|
| confirm | Triggered when clicking confirm button | value | - |
| cancel | Triggered when clicking cancel button | - | - |
| change | Triggered when value changes | value | - |
| focus | Triggered when focusing | - | - |
| blur | Triggered when blurring | - | - |
| clear | Triggered when clicking clear button | - | 1.11.0 |

## Methods

| Method | Description | Parameters | Version |
|--------|-------------|------------|------|
| open | Open popup | - | - |
| close | Close popup | - | - |

## Slots

| Name | Description | Version |
|------|-------------|------|
| label | Custom label | - |
| default | Content after value | - |