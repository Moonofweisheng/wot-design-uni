---
version: $LOWEST_VERSION$
---

# WeekDate

Display a week horizontally, supporting left and right week switching and date selection.

## Basic Usage

Set `v-model` to bind the value, supporting date string (YYYY-MM-DD), timestamp or Date object.

```html
<wd-week-date v-model="value1" />
```

```typescript
const value1 = ref('')
```

## Start of Week (Sunday)

Set the first day of the week through the `week-start` attribute, `0` for Sunday, `1` for Monday, default is `1`.

```html
<wd-week-date v-model="value2" :week-start="0" />
```

```typescript
const value2 = ref('')
```

## Shape

Set the shape of the selected date through the `shape` attribute, options are `square` and `circle`, default is `square`.

```html
<wd-week-date v-model="value3" shape="circle" />
```

```typescript
const value3 = ref(1767600387123)
```

## Disable Dates Before Today

Use the `disabled-date` attribute to disable specific dates. The parameter is a date object, returns a boolean value, returning `true` means the date is disabled.

```html
<wd-week-date v-model="value4" :disabled-date="disableBeforeToday" />
```

```typescript
const value4 = ref(Date.now())

const disableBeforeToday = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}
```

## Disable Dates After Today

```html
<wd-week-date v-model="value4" :disabled-date="disableAfterToday" />
```

```typescript
const value4 = ref(Date.now())

const disableAfterToday = (date: Date) => {
  return dayjs(date).isAfter(dayjs(), 'day')
}
```

## Disable Wednesday and Friday

```html
<wd-week-date v-model="value4" :disabled-date="disableWedFri" />
```

```typescript
const value4 = ref(Date.now())

const disableWedFri = (date: Date) => {
  const day = dayjs(date).day()
  return day === 3 || day === 5
}
```

## Select Callback

Listen to the `@select` event, triggered when the user selects a date, returns the selected date information.

```html
<wd-week-date v-model="value5" :disabled-date="disableBeforeToday" @select="handleSelect5" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekDateItem } from '@/uni_modules/wot-design-uni'

const { success } = useToast()
const value5 = ref(new Date())

const handleSelect5 = (date: WeekDateItem) => {
  success(`Selected date: ${date.fullDate}`)
}
```

## Week Change Event

Listen to the `@change` event, triggered when the user clicks the left or right switch button, returns the date after switching and the switch type.

```html
<wd-week-date v-model="value6" @change="handleChange6" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekChangeEvent } from '@/uni_modules/wot-design-uni'

const { success } = useToast()
const value6 = ref(new Date('2023-01-01'))

const handleChange6 = (date: WeekChangeEvent) => {
  success(`Date: ${date.date}, Type: ${date.type}`)
}
```

## Week Change Date Follow

Update the value of `v-model` in the `@change` event to achieve automatic date following to the new week when switching weeks. It is not recommended to use follow-up with `disabled-date`, as it may result in switching to a disabled date.

```html
<wd-week-date v-model="value7" @change="handleChange7" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekChangeEvent } from '@/uni_modules/wot-design-uni'

const { success } = useToast()
const value7 = ref('')

const handleChange7 = (date: WeekChangeEvent) => {
  success(`Date: ${date.date}, Type: ${date.type}`)
  value7.value = date.date as string
}
```

## Custom Icons (Slots)

Customize the icons of the left and right switch buttons through the `prev` and `next` slots.

```html
<wd-week-date v-model="value8" shape="circle">
  <template #prev>
    <wd-icon name="caret-left" size="22px" color="#ff5722" />
  </template>
  <template #next>
    <wd-icon name="caret-right" size="22px" color="#ff5722" />
  </template>
</wd-week-date>
```

```typescript
const value8 = ref('')
```

## Attributes

| Attribute     | Description                                                                  | Type                    | Options         | Default | Version          |
| ------------- | ---------------------------------------------------------------------------- | ----------------------- | --------------- | ------- | ---------------- |
| v-model       | Selected date, supporting date string (YYYY-MM-DD), timestamp or Date object | string / number / Date  | -               | -       | $LOWEST_VERSION$ |
| week-start    | First day of week, 0 for Sunday, 1 for Monday                                | number                  | 0 / 1           | 1       | $LOWEST_VERSION$ |
| shape         | Shape of selected date                                                       | string                  | square / circle | square  | $LOWEST_VERSION$ |
| disabled-date | Function to disable dates, parameter is date object, returns boolean         | (date: Date) => boolean | -               | -       | $LOWEST_VERSION$ |

## Events

| Event  | Description                     | Parameter Type  | Version          |
| ------ | ------------------------------- | --------------- | ---------------- |
| select | Triggered when selecting a date | WeekDateItem    | $LOWEST_VERSION$ |
| change | Triggered when switching weeks  | WeekChangeEvent | $LOWEST_VERSION$ |

### WeekDateItem

| Property   | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| fullDate   | string  | Full date string, format YYYY-MM-DD |
| date       | string  | Date, format DD                     |
| week       | string  | Week label, e.g. 'Mon', 'Tue'       |
| isActive   | boolean | Whether it is the selected date     |
| isDisabled | boolean | Whether it is a disabled date       |

### WeekChangeEvent

| Property | Type            | Description                                            |
| -------- | --------------- | ------------------------------------------------------ |
| date     | string          | Date string of current week, format YYYY-MM-DD         |
| type     | 'prev' / 'next' | Switch type, 'prev' (previous week) 'next' (next week) |

## Slots

| Name | Description                 | Version          |
| ---- | --------------------------- | ---------------- |
| prev | Custom previous week button | $LOWEST_VERSION$ |
| next | Custom next week button     | $LOWEST_VERSION$ |

## External Classes

| Class Name   | Description | Version          |
| ------------ | ----------- | ---------------- |
| custom-class | Root style  | $LOWEST_VERSION$ |
| custom-style | Root style  | $LOWEST_VERSION$ |
