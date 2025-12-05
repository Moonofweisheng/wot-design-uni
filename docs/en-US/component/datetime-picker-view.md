# DatetimePickerView Date Time Picker View

An encapsulation of the Picker component with date and time options built internally.

## Basic Usage

`v-model` sets the binding value. The default type is `datetime`, which displays year, month, day, hour, and minute. The binding value is of type `timestamp`. For `time` type, the binding value is a string.

```html
<wd-toast />

<wd-datetime-picker-view v-model="value" label="Date Selection" @change="handleChange" />
```
```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const value = ref<number>(Date.now())

function onChange1({ value }) {
  toast.show('Selected ' + new Date(value))
}
```

## Date Type

`date` type only displays year, month, and day.

```html
<wd-datetime-picker-view type="date" v-model="value" label="Year Month Day" />
```
```typescript
const value = ref<number>(Date.now())
```

## Year-Month Type

`year-month` type only displays year and month.

```html
<wd-datetime-picker-view type="year-month" v-model="value" label="Year Month" />
```
```typescript
const value = ref<number>(Date.now())
```

## Year Type

`year` type only displays year.

```html
<wd-datetime-picker-view type="year" v-model="value" label="Year" />
```
```typescript
const value = ref<number>(Date.now())
```

## Time Type

`time` type only displays hour and minute, the binding value is in `HH:mm` format.

```html
<wd-datetime-picker-view type="time" v-model="value" label="Hour Minute" />
```
```typescript
const value4 = ref<string>('11:12')
```

## Time Type (with Seconds)

`time` type with `use-second` property displays hour, minute and second, the binding value is in `HH:mm:ss` format.

```html
<wd-datetime-picker-view type="time" v-model="value" label="Hour Minute Second" use-second />
```
```typescript
const value = ref<string>('11:12:30')
```

## Datetime Type (with Seconds)

`datetime` type with `use-second` property displays year, month, day, hour, minute and second, the binding value is timestamp.

```html
<wd-datetime-picker-view type="datetime" v-model="value" label="Year Month Day Hour Minute Second" use-second />
```
```typescript
const value = ref<number>(Date.now())
```

## Modify Internal Format

Pass a function to the `formatter` property, which receives `type` and `value` values and returns the display text content. `type` can be `year`, `month`, `date`, `hour`, `minute`, and `value` is of type `number`.
Using a custom `formatter` will disable the built-in default `display-format` function.

```html
<wd-datetime-picker-view v-model="value" label="Internal Format" :formatter="formatter" />
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
<wd-datetime-picker-view v-model="value" label="Filter Options" :filter="filter" />
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

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value, when type is time, type is string, otherwise timestamp | `string` / `timestamp` | - | - | - |
| type | Picker type | string | date / year-month / time / year | datetime | - |
| loading | Loading state | boolean | - | false | - |
| loading-color | Loading color, can only use hexadecimal color values and cannot use abbreviated format | string | - | #4D80F0 | - |
| columns-height | Height of picker's internal roller | number | - | 231 | - |
| item-height | Height of picker item | number | - | 35 | 1.13.0 |
| formatter | Custom formatting function for popup layer option text, returns a string | function | - | - | - |
| filter | Custom function for filtering options, returns column's option array | function | - | - | - |
| minDate | Minimum date, 13-digit timestamp | `timestamp` | - | Current date - 10 years | - |
| maxDate | Maximum date, 13-digit timestamp | `timestamp` | - | Current date + 10 years | - |
| minHour | Minimum hour, effective for time type | number | - | 0 | - |
| maxHour | Maximum hour, effective for time type | number | - | 23 | - |
| minMinute | Minimum minute, effective for time type | number | - | 0 | - |
| maxMinute | Maximum minute, effective for time type | number | - | 59 | - |
| immediate-change | Whether to trigger the picker-view's change event immediately when the finger is released. If not enabled, the change event will be triggered after the scrolling animation ends. Available from version 1.2.25, only supported on WeChat Mini Program and Alipay Mini Program. | boolean | - | false | 1.2.25 |
| use-second | Whether to display the second selection, only effective for time and datetime types | boolean | - | false | 1.10.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when switching options | Selected value `{ value }`, value is the timestamp of currently selected date, or string for 'time' type | - |
| pickstart | Triggered when scroll selection starts | - | - |
| pickend | Triggered when scroll selection ends | - | - |