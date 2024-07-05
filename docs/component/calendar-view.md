<frame/>

# CalendarView 日历面板组件

提供日历单选、多选、范围选择、周维度、月维度等功能。可以根据实际业务场景基于该组件进行封装高度定制化组件。

## 基本使用

`type` 默认为 `date` 类型，设置 `v-model` 绑定值（13 位时间戳格式），也可以监听 `@change` 事件获取选中值。`min-date` 最小日期默认为当前日期往前推 6 个月，`max-date` 最大日期默认为当前日期往后推 6 个月，日历面板的日期只展示最小日期到最大日期之间的日期。

> `min-date`和`max-date`这两个值尽量不要设置过大，避免大量数据的计算和传递导致页面性能低下。

```html
<wd-calendar-view v-model="value" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## 日期多选

设置 `type` 为 `dates` 类型，此时 `value` 为数组。

```html
<wd-calendar-view type="dates" v-model="value" @change="handleChange" />
```

```typescript
const value = ref([])

function handleChange({ value }) {
  console.log(value)
}
```

## 周类型选择

设置 `type` 为 `week` 类型，如果 `value` 有初始值，建议将周起始日 `first-day-of-week` 设置为 1（周一），避免选中样式和回显匹配不上。

```html
<wd-calendar-view type="week" v-model="value" :first-day-of-week="1" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## 月类型选择

设置 `type` 为 `month` 类型，此时 `value` 有值时其值为月的第一天。

```html
<wd-calendar-view type="month" v-model="value" @change="handleChange" />
```

```typescript
const value = ref(Date.now())

function handleChange({ value }) {
  console.log(value)
}
```

## 范围选择

`type` 支持 `daterange`（日期范围选择）、`weekrange`（周范围选择）、`monthrange`（月范围选择） 类型，此时 `value` 为数组格式。

```html
<wd-calendar-view type="daterange" v-model="value" @change="handleChange" />
```

```typescript
const value = ref([])

function handleChange({ value }) {
  console.log(value)
}
```

## 日期时间类型

设置 `type` 为 `datetime` 类型，可以选择到时分秒，设置 `type` 为 `datetimerange` 为范围选择。

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" />
```

```typescript
const value = ref('')

function handleChange({ value }) {
  console.log(value)
}
```

可以设置 `hide-second`，使时间只展示到分钟级别；设置 `time-filter` 属性，可以自定义过滤 时分秒 选项，该属性接收 { type: string, values: array } 参数，返回一个新的数组，type 值为 'hour'、'minute' 或 'second'，values 为 picker 数据列表。

```html
<wd-calendar-view type="datetime" v-model="value" @change="handleChange" hide-second :time-filter="timeFilter" />
```

```typescript
const value = ref('')

const timeFilter = ({ type, values }) => {
  if (type === 'minute') {
    // 只展示 0,10,20,30,40,50 分钟选项
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

## 范围选择允许选中同一日期

设置 `allow-same-day` 属性，范围选择允许用户选择同一天、同一周、同一个月。

```html
<wd-calendar-view type="daterange" v-model="value" allow-same-day @change="handleChange" />
```

## 格式化日期

设置 `formatter` 参数，其值为函数类型，接收一个 `object` 参数，返回一个对象，对象的属性保持跟入参的属性一致，其属性如下：

| 属性       | 类型      | 说明                                                                                                                                                    | 最低版本 |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type       | string    | 日期类型，'selected' - 单日期选中，'start' - 范围开始日期，'end' - 范围结束日期，'middle' - 范围开始与结束之间的日期，'same' - 范围开始与结束日期同一天 | -        |
| date       | timestamp | 13 位的时间戳                                                                                                                                           | -        |
| text       | string    | 日期文本内容                                                                                                                                            | -        |
| topInfo    | string    | 上方提示信息                                                                                                                                            | -        |
| bottomInfo | string    | 下方提示信息                                                                                                                                            | -        |
| disabled   | boolean   | 是否禁用                                                                                                                                                | -        |

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
    day.topInfo = '今天'
  }

  if (month === 5 && da === 18) {
    day.topInfo = '618大促'
  }

  if (month === 10 && da === 11) {
    day.topInfo = '京东双11'
  }

  if (day.type === 'start') {
    day.bottomInfo = '开始'
  }

  if (day.type === 'end') {
    day.bottomInfo = '结束'
  }

  if (day.type === 'same') {
    day.bottomInfo = '开始/结束'
  }

  return day
}

function handleChange({ value }) {
  console.log(value)
}
```

## 最大范围限制

设置 `max-range` 属性，设置范围选择的最大限制。

```html
<wd-calendar-view type="daterange" :max-range="3" v-model="value" @change="handleChange" />
```

## 展示面板标题

`show-panel-title` 默认为 `true`，会自动计算标题并进行展示，可以选择不进行展示。

```html
<wd-calendar-view type="daterange" :show-panel-title="false" v-model="value" @change="handleChange" />
```

## 设置周起始日

设置 `first-day-of-week` 属性，默认为 0，即周日，设置为 1 则为周一，依此类推。

## Attributes

| 参数              | 说明                                                                   | 类型                  | 可选值                                                                                      | 默认值                | 最低版本 |
| ----------------- | ---------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------- | --------------------- | -------- |
| v-model           | 选中值，为 13 位时间戳或时间戳数组                                     | null / number / array | -                                                                                           | -                     | -        |
| type              | 日期类型                                                               | string                | date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange | date                  | -        |
| min-date          | 最小日期，为 13 位时间戳                                               | number                | -                                                                                           | 当前日期往前推 6 个月 | -        |
| max-date          | 最大日期，为 13 位时间戳                                               | number                | -                                                                                           | 当前日期往后推 6 个月 | -        |
| first-day-of-week | 周起始天                                                               | number                | -                                                                                           | 0                     | -        |
| formatter         | 日期格式化函数                                                         | function              | -                                                                                           | -                     | -        |
| max-range         | type 为范围选择时有效，最大日期范围                                    | number                | -                                                                                           | -                     | -        |
| range-prompt      | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案            | string                | -                                                                                           | 选择天数不能超过 x 天 | -        |
| allow-same-day    | type 为范围选择时有效，是否允许选择同一天                              | boolean               | -                                                                                           | false                 | -        |
| show-panel-title  | 是否展示面板标题，自动计算当前滚动的日期月份                           | boolean               | -                                                                                           | true                  | -        |
| default-time      | 选中日期所使用的当日内具体时刻                                         | string / array        | -                                                                                           | 00:00:00              | -        |
| panel-height      | 可滚动面板的高度                                                       | number                | -                                                                                           | 378                   | -        |
| time-filter       | type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据 | function              | -                                                                                           | -                     | -        |
| hide-second       | type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改         | boolean               | -                                                                                           | false                 | -        |
| immediate-change | type 为 'datetime' 或 'datetimerange' 时有，是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 | boolean | - | false | 1.2.25 |

## Events

| 事件名称 | 说明             | 参数        | 最低版本 |
| -------- | ---------------- | ----------- | -------- |
| change   | 绑定值变化时触发 | `{ value }` | -        |

## Methods

| 方法名称       | 说明                                                                                                         | 参数 | 最低版本 |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ---- | -------- |
| scrollIntoView | 使当前日期或者选中日期滚动到可视区域，并监听滚动，在面板从 隐藏状态（如 display: none） 切换为展示状态时调用 | -    |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
