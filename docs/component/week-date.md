---
version: $LOWEST_VERSION$
---

# WeekDate 周日期选择器

横向展示一周日期，支持左右切换周和选择日期。

## 基本使用

设置 `v-model` 绑定值，格式为日期字符串（YYYY-MM-DD）、时间戳或 Date 对象。

```html
<wd-week-date v-model="value1" />
```

```typescript
const value1 = ref('')
```

## 起始周期（周日）

通过 `week-start` 属性设置周起始日，`0` 表示周日，`1` 表示周一，默认为 `1`。

```html
<wd-week-date v-model="value2" :week-start="0" />
```

```typescript
const value2 = ref('')
```

## 形状

通过 `shape` 属性设置选中日期的形状，可选值为 `square`（方形）、`circle`（圆形），默认为 `square`。

```html
<wd-week-date v-model="value3" shape="circle" />
```

```typescript
const value3 = ref(1767600387123)
```

## 禁用之前的日期

通过 `disabled-date` 属性可以禁用指定日期，参数为日期对象，返回值为布尔值，返回 `true` 则表示该日期被禁用。

```html
<wd-week-date v-model="value4" :disabled-date="disableBeforeToday" />
```

```typescript
const value4 = ref(Date.now())

const disableBeforeToday = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}
```

## 禁用之后的日期

```html
<wd-week-date v-model="value4" :disabled-date="disableAfterToday" />
```

```typescript
const value4 = ref(Date.now())

const disableAfterToday = (date: Date) => {
  return dayjs(date).isAfter(dayjs(), 'day')
}
```

## 禁用星期三和星期五

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

## 选择回调

监听 `@select` 事件，在用户选择日期时触发，返回选中的日期信息。

```html
<wd-week-date v-model="value5" :disabled-date="disableBeforeToday" @select="handleSelect5" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekDateItem } from '@/uni_modules/wot-design-uni/components/wd-week-date'

const { success } = useToast()
const value5 = ref(new Date())

const handleSelect5 = (date: WeekDateItem) => {
  success(`切换日期：${date.fullDate}`)
}
```

## 切换周事件

监听 `@change` 事件，在用户点击左右切换按钮时触发，返回切换后的日期和切换类型。

```html
<wd-week-date v-model="value6" @change="handleChange6" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekChangeEvent } from '@/uni_modules/wot-design-uni/components/wd-week-date'

const { success } = useToast()
const value6 = ref(new Date('2023-01-01'))

const handleChange6 = (date: WeekChangeEvent) => {
  success(`日期：${date.date}，类型：${date.type}`)
}
```

## 切换周日期跟随

在 `@change` 事件中更新 `v-model` 的值，可以实现切换周时日期自动跟随到新的一周。跟随不建议搭配 `disabled-date` 一起使用，会出现切换到禁用日期的情况。

```html
<wd-week-date v-model="value7" @change="handleChange7" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { WeekChangeEvent } from '@/uni_modules/wot-design-uni/components/wd-week-date'

const { success } = useToast()
const value7 = ref('')

const handleChange7 = (date: WeekChangeEvent) => {
  success(`日期：${date.date}，类型：${date.type}`)
  value7.value = date.date as string
}
```

## 自定义图标（插槽）

通过 `prev` 和 `next` 插槽可以自定义左右切换按钮的图标。

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

## Attributes

| 参数          | 说明                                                         | 类型                    | 可选值          | 默认值 | 最低版本         |
| ------------- | ------------------------------------------------------------ | ----------------------- | --------------- | ------ | ---------------- |
| v-model       | 选中的日期，支持日期字符串（YYYY-MM-DD）、时间戳或 Date 对象 | string / number / Date  | -               | -      | $LOWEST_VERSION$ |
| week-start    | 周起始日，0 为周日，1 为周一                                 | number                  | 0 / 1           | 1      | $LOWEST_VERSION$ |
| shape         | 选中形状                                                     | string                  | square / circle | square | $LOWEST_VERSION$ |
| disabled-date | 禁用日期函数，参数为日期对象，返回值为布尔值                 | (date: Date) => boolean | -               | -      | $LOWEST_VERSION$ |

## Events

| 事件名称 | 说明           | 参数类型        | 最低版本         |
| -------- | -------------- | --------------- | ---------------- |
| select   | 选择日期时触发 | WeekDateItem    | $LOWEST_VERSION$ |
| change   | 切换周时触发   | WeekChangeEvent | $LOWEST_VERSION$ |

### WeekDateItem

| 属性       | 类型    | 说明                              |
| ---------- | ------- | --------------------------------- |
| fullDate   | string  | 完整日期字符串，格式为 YYYY-MM-DD |
| date       | string  | 日期，格式为 DD                   |
| week       | string  | 星期标签，如 '一'、'二'           |
| isActive   | boolean | 是否为选中日期                    |
| isDisabled | boolean | 是否为禁用日期                    |

### WeekChangeEvent

| 属性 | 类型            | 说明                                       |
| ---- | --------------- | ------------------------------------------ |
| date | string          | 当前周的日期字符串，格式为 YYYY-MM-DD      |
| type | 'prev' / 'next' | 切换类型，'prev'（上一周）'next'（下一周） |

## Slots

| 插槽名 | 说明             | 最低版本         |
| ------ | ---------------- | ---------------- |
| prev   | 自定义上一周按钮 | $LOWEST_VERSION$ |
| next   | 自定义下一周按钮 | $LOWEST_VERSION$ |

## 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |
