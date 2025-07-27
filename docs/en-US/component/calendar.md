# Calendar

Provides calendar single selection, multiple selection, range selection, week dimension, month dimension and other functions.

## Basic Usage

The default `type` is `date`, set `v-model` binding value (13-digit timestamp format), and listen to the `@confirm` event to get the selected value. The `min-date` minimum date defaults to 6 months before the current date, and the `max-date` maximum date defaults to 6 months after the current date. The calendar only displays dates between the minimum and maximum dates. The label is optional. You can set the title width through `label-width`, which defaults to '33%'.

> Try not to set `min-date` and `max-date` too large to avoid poor page performance due to calculation and transmission of large amounts of data.

```html
<wd-calendar v-model="value" label="Date Selection" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## Multiple Date Selection

Set `type` to `dates` type, at this time `value` is an array.

```html
<wd-calendar type="dates" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number[]>([])
function handleConfirm({ value }) {
  console.log(value)
}
```

## Week Selection

Set `type` to `week` type. If `value` has an initial value, it is recommended to set the week start day `first-day-of-week` to 1 (Monday) to avoid mismatch between selected style and display.

```html
<wd-calendar type="week" v-model="value" :first-day-of-week="1" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## Month Selection

Set `type` to `month` type. When `value` has a value, its value is the first day of the month.

```html
<wd-calendar type="month" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## Range Selection

`type` supports `daterange` (date range selection), `weekrange` (week range selection), `monthrange` (month range selection) types. At this time, `value` is in array format.

```html
<wd-calendar type="daterange" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number[]>([])
function handleConfirm({ value }) {
  console.log(value)
}
```

## Date Time Type

Set `type` to `datetime` type to select down to hours, minutes, and seconds. Set `type` to `datetimerange` for range selection.

```html
<wd-calendar type="datetime" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<string>("")
function handleConfirm({ value }) {
  console.log(value)
}
```

You can set `hide-second` to display time only to the minute level; set the `time-filter` property to customize the filtering of hour, minute, second options. This property accepts { type: string, values: array } parameters and returns a new array. The type value is 'hour', 'minute' or 'second', and values is the picker data list.

```html
<wd-calendar type="datetime" v-model="value" @confirm="handleConfirm" hide-second :time-filter="timeFilter" />
```

```typescript
const value = ref<string>("")

function timeFilter({ type, values }) {
  if (type === "minute") {
    // Only show 0,10,20,30,40,50 minute options
    return values.filter((item) => {
      return item % 10 === 0
    })
  }
  return values
}
function handleConfirm({ value }) {
  console.log(value)
}
```

## Day/Week/Month Switch

Set the `show-type-switch` property to display the day/week/month switch function. It supports switching between date, week, and month types (`date`, `week`, `month`). You can set the initial type through the `type` property. If `type` is a range type like `daterange`, then the calendar can switch between `daterange`, `weekrange`, and `monthrange`.

```html
<wd-calendar label="Day/Week/Month Switch" :first-day-of-week="1" show-type-switch v-model="value" @confirm="handleConfirm" />
```

## Quick Operation

Set the `show-confirm` property to `false` to not display the confirm button. This is only valid for `date`, `daterange`, `week`, `weekrange`, `month`, `monthrange` types.

```html
<wd-calendar label="Quick Operation" :show-confirm="false" v-model="value" @confirm="handleConfirm" />
```

## Allow Same Day Selection in Range

Set the `allow-same-day` property to allow users to select the same day, same week, or same month in range selection.

```html
<wd-calendar type="daterange" v-model="value" allow-same-day @confirm="handleConfirm" />
```

## Date Formatting

Set the `formatter` parameter, which is a function type that receives an `object` parameter and returns an object. The properties of the object remain consistent with the input parameters. Its properties are as follows:

| Property   | Type            | Description                                      | Version |
| ---------- | --------------- | ------------------------------------------------ | ------- |
| type       | CalendarDayType | See [CalendarDayType](#calendardaytype) for options | -       |
| date       | timestamp       | 13-digit timestamp                               | -       |
| text       | string          | Date text content                                | -       |
| topInfo    | string          | Top prompt information                           | -       |
| bottomInfo | string          | Bottom prompt information                        | -       |
| disabled   | boolean         | Whether disabled                                 | -       |

### CalendarDayType

| Type             | Description                                           | Version |
| ---------------- | ----------------------------------------------------- | ------- |
| selected         | Single date selected                                  | -       |
| start            | Range start date                                      | -       |
| end              | Range end date                                        | -       |
| middle           | Date between range start and end                      | -       |
| same             | Range start and end date are the same day            | -       |
| current          | Current date                                         | -       |
| multiple-middle  | Multiple date range selection, dates between start and end | 1.5.0   |
| multiple-selected| Multiple date range selection, selected dates         | 1.5.0   |

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value, 13-digit timestamp or timestamp array | null / number / array | - | - | - |
| type | Date type | string | date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange | date | - |
| min-date | Minimum date, 13-digit timestamp | number | - | 6 months before current date | - |
| max-date | Maximum date, 13-digit timestamp | number | - | 6 months after current date | - |
| first-day-of-week | Week start day | number | - | 0 | - |
| formatter | Date formatting function | function | - | - | - |
| max-range | Maximum date range for range selection types | number | - | - | - |
| range-prompt | Error message when selection exceeds maximum date range | string | - | Selection cannot exceed x days | - |
| allow-same-day | Whether to allow selecting the same day in range selection | boolean | - | false | - |
| default-time | Specific time of day for selected date | string / array | - | 00:00:00 | - |
| time-filter | Filter function for time picker data, effective for 'datetime' or 'datetimerange' types | function | - | - | - |
| hide-second | Whether to hide second modification for 'datetime' or 'datetimerange' types | boolean | - | false | - |
| show-confirm | Whether to show confirm button | boolean | - | true | - |
| show-type-switch | Whether to show type switch function | boolean | - | false | - |
| shortcuts | Quick options, array of objects with required 'text' property | array | - | - | - |
| title | Popup title | string | - | Select Date | - |
| label | Picker left text | string | - | - | - |
| placeholder | Picker placeholder | string | - | Please select | - |
| disabled | Disabled state | boolean | - | false | - |
| readonly | Read-only state | boolean | - | false | - |
| display-format | Custom display text formatting function, returns a string | function | - | - | - |
| inner-display-format | Custom panel internal display for range selection types, returns a string | function | - | - | - |
| size | Set picker size | string | large | - | - |
| label-width | Set left title width | string | - | 33% | - |
| error | Whether in error state, right content is red in error state | boolean | - | false | - |
| required | Required style | boolean | - | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | - | 'before' | $LOWEST_VERSION$ |
| center | Whether to vertically center | boolean | - | false | - |
| ellipsis | Whether to hide overflow | boolean | - | false | - |
| align-right | Display picker value aligned to the right | boolean | - | false | - |
| before-confirm | Validation function before confirmation, receives { value, resolve } parameters, continue through resolve, resolve accepts a boolean parameter | function | - | - | - |
| close-on-click-modal | Whether to close when clicking mask | boolean | - | true | - |
| z-index | Popup layer z-index | number | - | 15 | - |
| safe-area-inset-bottom | Whether to set bottom safe area for popup panel (iPhone X type devices) | boolean | - | true | - |
| prop | Form field `model` field name, required when using form validation | string | - | - | - |
| rules | Form validation rules, used with `wd-form` component | `FormItemRule []` | - | `[]` | - |
| immediate-change | Whether to trigger the picker-view's change event immediately when the finger is released. If not enabled, the change event will be triggered after the scrolling animation ends. Available from version 1.2.25, only supported on WeChat Mini Program and Alipay Mini Program. | boolean | - | false | 1.2.25 |
| with-cell | Whether to use built-in cell picker | boolean | - | true | 1.5.0 |
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
| confirm | Triggered when binding value changes | `{ value, type }` | - |
| change | Triggered when clicking panel date | `{ value }` | - |
| cancel | Triggered when clicking close button or mask | - | - |
| open | Triggered when calendar opens | - | - |
| clear | Triggered when clicking clear button | - | 1.11.0 |

## Methods

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| open | Open panel | - | - |
| close | Close panel | - | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| default | Custom display | - |
| label | Left slot | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-label-class | Label external custom style | - |
| custom-value-class | Value external custom style | - |