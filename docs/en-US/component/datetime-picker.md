# DatetimePicker Date Time Picker

An encapsulation of the DatetimePickerView component with date and time options built internally.

## Basic Usage

`v-model` sets the binding value. The default type is `datetime`, which displays year, month, day, hour, and minute. The binding value is of type `timestamp`. For `time` type, the binding value is a string. The label is optional. You can set the title width through `label-width`, which defaults to `33%`.

```html
<wd-datetime-picker v-model="value" label="Date Selection" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## Set Default Value

`default-value` sets the default date. When opening the panel, it automatically selects the default date.

```html
<wd-datetime-picker v-model="value" :default-value="defaultValue" label="Date Selection" @confirm="handleConfirm" />
```

```typescript
const value = ref<string>('')
const defaultValue = ref<number>(Date.now())

function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## Date Type

`date` type only displays year, month, and day.

```html
<wd-datetime-picker type="date" v-model="value" label="Year Month Day" />
```
```typescript
const value = ref<number>(Date.now())
```

## Year-Month Type

`year-month` type only displays year and month.

```html
<wd-datetime-picker type="year-month" v-model="value" label="Year Month" />
```
```typescript
const value = ref<number>(Date.now())
```

## Year Type

`year` type only displays year.

```html
<wd-datetime-picker type="year" v-model="value" label="Year" />
```
```typescript
const value = ref<number>(Date.now())
```

## Time Type

`time` type only displays hour and minute, the binding value is in `HH:mm` format.

```html
<wd-datetime-picker type="time" v-model="value" label="Hour Minute" />
```
```typescript
const value4 = ref<string>('09:20')
```

## Time Type (with Seconds)

`time` type with `use-second` property displays hour, minute and second, the binding value is in `HH:mm:ss` format.

```html
<wd-datetime-picker type="time" v-model="value" label="Hour Minute Second" use-second />
```
```typescript
const value = ref<string>('09:20:30')
```

## Datetime Type (with Seconds)

`datetime` type with `use-second` property displays year, month, day, hour, minute and second, the binding value is timestamp.

```html
<wd-datetime-picker type="datetime" v-model="value" label="Year Month Day Hour Minute Second" use-second />
```
```typescript
const value = ref<number>(Date.now())
```

## Modify Display Format

Pass a function to the `display-format` property, which receives an array of all selected items and returns the display text content.

```html
<wd-datetime-picker v-model="value" label="Display Format" :displayFormat="displayFormat" />
```
```typescript
const value = ref<number>(Date.now())
const displayFormat = (items) => {
  return `${items[0].label}Year${items[1].label}Month${items[2].label}Day ${items[3].label}:${items[4].label}`
}
```

## Modify Internal Format

Pass a function to the `formatter` property, which receives `type` and `value` values and returns the display text content. `type` can be `year`, `month`, `date`, `hour`, `minute`, and `value` is of type `number`.
Using a custom `formatter` will disable the built-in default `display-format` function.

```html
<wd-datetime-picker v-model="value" label="Internal Format" :formatter="formatter" />
```
```typescript
const value = ref<number>(Date.now())

const formatter = (type, value) => {
  switch (type) {
    case 'year':
      return value + ' Year'
    case 'month':
      return value + ' Month'
    case 'date':
      return value + ' Day'
    case 'hour':
      return value + ' Hour'
    case 'minute':
      return value + ' Minute'
    default:
      return value
  }
}
```

## Filter Options

Pass a function to the `filter` property, which receives `type` and `values` values and returns the column's option list. `type` can be `year`, `month`, `date`, `hour`, `minute`, and `values` is a number array.

```html
<wd-datetime-picker v-model="value" label="Filter Options" :filter="filter" />
```
```typescript
const value = ref<number>(Date.now())

const filter = (type, values) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
```

## Picker Size

Modify the picker size by setting `size`. When `size` is set to 'large', the font size is 16px.

```html
<wd-datetime-picker label="Date Selection" size="large" v-model="value" />
```

## Required Attribute

Set the `required` property to enable form required.

```html
<wd-datetime-picker label="Required Attribute" error v-model="value" required/>
```

## Error State

Set the `error` property to display the picker's value in red.

```html
<wd-datetime-picker label="Date Selection" error v-model="value" />
```

## Right-aligned Display

Set the `align-right` property to display the picker's value aligned to the right.

```html
<wd-datetime-picker label="Date Selection" align-right v-model="value" />
```

## Validation Before Confirmation

Set the `before-confirm` function, which will be executed when the user clicks the 'confirm' button. It receives `value` (string for time type, timestamp for others, array when picker is in range selection mode), `resolve`, and `picker` parameters. You can validate the `value` and use the `resolve` function to tell the component whether to confirm. `resolve` accepts a boolean value, `resolve(true)` means the option is approved, `resolve(false)` means the option is not approved, and the picker popup won't close when not approved. You can directly set properties like `loading` through the `picker` parameter.

:::tip Note
Before calling `resolve`, ensure that the `picker` parameter's `loading` state is set to `false`, otherwise the component's `@confirm` event cannot be triggered correctly.
:::

```html
<wd-toast></wd-toast>
<wd-datetime-picker label="before-confirm" v-model="value" :before-confirm="beforeConfirm" @confirm="handleConfirm" />
```

```typescript
const value = ref<string>('')

const toast = useToast()
const beforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if (value > Date.now()) {
      resolve(false)
      toast.error('Cannot select a date later than today')
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## Trigger Slot

Set the default slot to modify how to trigger the picker component.

```html
<wd-datetime-picker v-model="value">
  <wd-button>Trigger with Slot</wd-button>
</wd-datetime-picker>
```

## Time Range Selection

When `v-model` is of type `Array`, time range selection is enabled.

```html
<wd-datetime-picker label="Date Selection" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<any[]>(['', Date.now()])

function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## Range Selection Tab Label Display Format

Pass a function to the `display-format-tab-label` property, which receives an array of all selected items and returns the display text content.

```html
<wd-datetime-picker v-model="value" label="Range Tab Display Format" :display-format-tab-label="displayFormatTabLabel" @confirm="handleConfirm"></wd-datetime-picker>
```

```typescript
const value = ref<any[]>(['', Date.now()])

function handleConfirm({ value }) {
  console.log(new Date(value))
}

const displayFormatTabLabel = (items) => {
  return `${items[0].label}Year${items[1].label}Month${items[2].label}Day ${items[3].label}:${items[4].label}`
}
```

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value, when type is time, type is string; when type is Array, it's range selection; otherwise timestamp | `string` / `timestamp` / `array` | - | - | - |
| default-value | Default date, type consistent with value, automatically selects default date when panel opens | `string` / `timestamp` / `array` | - | - | - |
| type | Picker type | string | date / year-month / time / year | datetime | - |
| loading | Loading state | boolean | - | false | - |
| loading-color | Loading color, can only use hexadecimal color values and cannot use abbreviated format | string | - | #4D80F0 | - |
| columns-height | Height of picker's internal roller | number | - | 231 | - |
| title | Popup layer title | string | - | - | - |
| cancel-button-text | Cancel button text | string | - | Cancel | - |
| confirm-button-text | Confirm button text | string | - | Done | - |
| label | Left text of picker, label is optional | string | - | - | - |
| placeholder | Picker placeholder | string | - | Please select | - |
| disabled | Disabled state | boolean | - | false | - |
| readonly | Read-only state | boolean | - | false | - |
| display-format | Custom display text formatting function, returns a string | function | - | - | - |
| formatter | Custom popup layer option text formatting function, returns a string | function | - | - | - |
| filter | Custom function for filtering options, returns column's option array | function | - | - | - |
| display-format-tab-label | In range selection mode, custom function for formatting tab label text, returns a string | function | - | - | - |
| minDate | Minimum date, 13-digit timestamp | `timestamp` | - | Current date - 10 years | - |
| maxDate | Maximum date, 13-digit timestamp | `timestamp` | - | Current date + 10 years | - |
| minHour | Minimum hour, effective for time type | number | - | 0 | - |
| maxHour | Maximum hour, effective for time type | number | - | 23 | - |
| minMinute | Minimum minute, effective for time type | number | - | 0 | - |
| maxMinute | Maximum minute, effective for time type | number | - | 59 | - |
| required | Form attribute, required | boolean | - | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | - | 'before' | $LOWEST_VERSION$ |
| size | Set picker size | string | large | - | - |
| label-width | Set left title width | string | - | 33% | - |
| error | Whether in error state, right content is red in error state | boolean | - | false | - |
| align-right | Display picker value aligned to the right | boolean | - | false | - |
| <s>use-label-slot</s> | <s>Use label slot</s>, deprecated, use label slot directly | boolean | - | false | - |
| <s>use-default-slot</s> | <s>Use default slot</s>, deprecated, use default slot directly | boolean | - | false | - |
| before-confirm | Validation function before confirmation, receives (value, resolve, picker) parameters, continue picker through resolve, resolve accepts a boolean parameter | function | - | - | - |
| close-on-click-modal | Whether to close when clicking mask | boolean | - | true | - |
| z-index | Popup layer z-index | number | - | 15 | - |
| safe-area-inset-bottom | Whether to set bottom safe area for popup panel (iPhone X type devices) | boolean | - | true | - |
| ellipsis | Whether to hide overflow | boolean | - | false | - |
| prop | Form field `model` field name, required when using form validation | string | - | - | - |
| rules | Form validation rules, used with `wd-form` component | `FormItemRule []` | - | `[]` | - |
| immediate-change | Whether to trigger the picker-view's change event immediately when the finger is released. If not enabled, the change event will be triggered after the scrolling animation ends. Available from version 1.2.25, only supported on WeChat Mini Program and Alipay Mini Program. | boolean | - | false | 1.2.25 |
| use-second | Whether to display the second selection, only effective for time and datetime types | boolean | - | false | 1.10.0 |
| clearable | Show clear button | boolean | - | false | 1.11.0 |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | false | 1.11.0 |

### FormItemRule Data Structure

| Key | Description | Type |
|-----|-------------|------|
| required | Whether required field | `boolean` |
| message | Error message | `string` |
| validator | Validate through function, can return a `Promise` for async validation | `(value, rule) => boolean \| Promise` |
| pattern | Validate through regular expression, validation fails if regex doesn't match | `RegExp` |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| confirm | Triggered when clicking right button | `{ value }`, value is the timestamp of currently selected date, or string for 'time' type | - |
| cancel | Triggered when clicking left button | - | - |
| toggle | In range selection mode, triggered when switching tab labels | Currently selected value of the switched picker | - |
| clear | Triggered when clicking clear button | - | 1.11.0 |

## Methods

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| open | Open picker popup | - | - |
| close | Close picker popup | - | - |

## Slot

| Name | Description | Version |
|------|-------------|----------|
| default | Use default slot | - |
| label | Left title slot | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-view-class | pickerView external custom style | - |
| custom-cell-class | pickerView cell external custom style | 1.3.8 |
| custom-label-class | label external custom style | - |
| custom-value-class | value external custom style | - |