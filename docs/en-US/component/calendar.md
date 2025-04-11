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