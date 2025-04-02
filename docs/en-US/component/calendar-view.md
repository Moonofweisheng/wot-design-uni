# CalendarView Calendar Panel Component

Provides calendar single selection, multiple selection, range selection, week dimension, month dimension and other functions. Based on this component, you can encapsulate highly customized components according to actual business scenarios.

## Basic Usage

The default `type` is `date`, set `v-model` binding value (13-digit timestamp format), you can also listen to the `@change` event to get the selected value. `min-date` minimum date defaults to 6 months before the current date, `max-date` maximum date defaults to 6 months after the current date, and the calendar panel only displays dates between the minimum and maximum dates.

> It is recommended not to set `min-date` and `max-date` too large to avoid poor page performance due to calculation and transmission of large amounts of data.

```html
<wd-calendar-view v-model="value" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## Multiple Date Selection

Set `type` to `dates` type, at this time `value` is an array.

```html
<wd-calendar-view type="dates" v-model="value" @change="handleChange" />
```

```typescript
const value = ref([])

function handleChange({ value }) {
  console.log(value)
}
```

## Week Type Selection

Set `type` to `week` type. If `value` has an initial value, it is recommended to set the week start day `first-day-of-week` to 1 (Monday) to avoid mismatch between selected style and echo.

```html
<wd-calendar-view type="week" v-model="value" :first-day-of-week="1" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## Month Type Selection

Set `type` to `month` type. When `value` has a value, its value is the first day of the month.

```html
<wd-calendar-view type="month" v-model="value" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## Range Selection

`type` supports `daterange` (date range selection), `weekrange` (week range selection), `monthrange` (month range selection) types. At this time, `value` is in array format.

```html
<wd-calendar-view type="daterange" v-model="value" @change="handleChange" />
```

```typescript
const value = ref([])

function handleChange({ value }) {
  console.log(value)
}
```

## Date Time Type

Set `type` to `datetime` type to select down to hours, minutes and seconds. Set `type` to `datetimerange` for range selection.

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" />
```

```typescript
const value = ref('')

function handleChange({ value }) {
  console.log(value)
}
```

You can set `hide-second` to display time only to minutes; set the `time-filter` property to customize filtering of hour, minute, second options. This property accepts { type: string, values: array } parameters and returns a new array. The type value is 'hour', 'minute' or 'second', and values is the picker data list.

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" hide-second :time-filter="timeFilter" />
```

```typescript
const value = ref('')

const timeFilter = ({ type, values }) => {
  if (type === 'minute') {
    // Only show 0,10,20,30,40,50 minute options
    return values.filter((item) => {
      return item % 10 === 0
    })
  }

  return values
}

function handleChange({ value }) {
  console.log(value)
}
```

## Allow Same Day Selection in Range

Set the `allow-same-day` property to allow users to select the same day, same week, or same month in range selection.

```html
<wd-calendar-view type="daterange" v-model="value" allow-same-day @change="handleChange" />
```

## Format Date

Set the `formatter` parameter, its value is a function type that receives an `object` parameter and returns an object whose properties remain consistent with the input parameters. Its properties are as follows:

| Property | Type | Description | Minimum Version |
|----------|------|-------------|----------------|
| type | CalendarDayType | See [CalendarDayType](#calendardaytype) for optional values | - |
| date | timestamp | 13-digit timestamp | - |
| text | string | Date text content | - |
| topInfo | string | Top prompt information | - |
| bottomInfo | string | Bottom prompt information | - |
| disabled | boolean | Whether disabled | - |

### CalendarDayType

| Type | Description |
|------|-------------|
| selected | Single date selected |
| start | Range start date |
| end | Range end date |
| middle | Date between range start and end |
| same | Range start and end date are the same day |
| current | Current date |
| multiple-middle | Multiple date range selection, date between start and end |
| multiple-selected | Multiple date range selection, selected date |

```html
<wd-calendar-view type="daterange" v-model="value" allow-same-day :formatter="formatter" @change="handleChange"></wd-calendar-view>
```

```typescript
const value = ref([])

const formatter = (day) => {
  const date = new Date(day.date)
  const now = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()
  const da = date.getDate()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDa = now.getDate()

  if (year === nowYear && month === nowMonth && da === nowDa) {
    day.topInfo = 'Today'
  }

  if (month === 5 && da === 18) {
    day.topInfo = '618 Sale'
  }

  if (month === 10 && da === 11) {
    day.topInfo = 'JD 11.11'
  }

  if (day.type === 'start') {
    day.bottomInfo = 'Start'
  }

  if (day.type === 'end') {
    day.bottomInfo = 'End'
  }

  if (day.type === 'same') {
    day.bottomInfo = 'Selected'
  }

  return day
}
```