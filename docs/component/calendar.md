<frame/>

# Calendar 日历选择器

提供日历单选、多选、范围选择、周维度、月维度等功能。

## 基本使用

`type` 默认为 `date` 类型，设置 `v-model` 绑定值（13 位时间戳格式），监听 `@confirm` 事件获取选中值。`min-date` 最小日期默认为当前日期往前推 6 个月，`max-date` 最大日期默认为当前日期往后推 6 个月，日历的日期只展示最小日期到最大日期之间的日期。label 可以不传。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

> `min-date`和`max-date`这两个值尽量不要设置过大，避免大量数据的计算和传递导致页面性能低下。

```html
<wd-calendar v-model="value" label="日期选择" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## 日期多选

设置 `type` 为 `dates` 类型，此时 `value` 为数组。

```html
<wd-calendar type="dates" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number[]>([])
function handleConfirm({ value }) {
  console.log(value)
}
```

## 周类型选择

设置 `type` 为 `week` 类型，如果 `value` 有初始值，建议将周起始日 `first-day-of-week` 设置为 1（周一），避免选中样式和回显匹配不上。

```html
<wd-calendar type="week" v-model="value" :first-day-of-week="1" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## 月类型选择

设置 `type` 为 `month` 类型，此时 `value` 有值时其值为月的第一天。

```html
<wd-calendar type="month" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(value)
}
```

## 范围选择

`type` 支持 `daterange`（日期范围选择）、`weekrange`（周范围选择）、`monthrange`（月范围选择） 类型，此时 `value` 为数组格式。

```html
<wd-calendar type="daterange" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<number[]>([])
function handleConfirm({ value }) {
  console.log(value)
}
```

## 日期时间类型

设置 `type` 为 `datetime` 类型，可以选择到时分秒，设置 `type` 为 `datetimerange` 为范围选择。

```html
<wd-calendar type="datetime" v-model="value" @confirm="handleConfirm" />
```

```typescript
const value = ref<string>('')
function handleConfirm({ value }) {
  console.log(value)
}
```

可以设置 `hide-second`，使时间只展示到分钟级别；设置 `time-filter` 属性，可以自定义过滤 时分秒 选项，该属性接收 { type: string, values: array } 参数，返回一个新的数组，type 值为 'hour'、'minute' 或 'second'，values 为 picker 数据列表。

```html
<wd-calendar type="datetime" v-model="value" @confirm="handleConfirm" hide-second :time-filter="timeFilter" />
```

```typescript
const value = ref<string>('')

function timeFilter({ type, values }) {
  if (type === 'minute') {
    // 只展示 0,10,20,30,40,50 分钟选项
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

## 日周月切换

设置 `show-type-switch` 属性，展示 日周月 切换功能，支持在日周月类型 `date、week、month` 之间进行来回切换，可以通过 `type` 属性设置初始类型。如果 `type` 为 range 类型如 `daterange`，则日历可以在 `daterange、weekrange、monthrang` 之间进行来回切换。

```html
<wd-calendar label="日周月切换" :first-day-of-week="1" show-type-switch v-model="value" @confirm="handleConfirm" />
```

## 快捷操作

设置 `show-confirm` 属性为 `false`，不展示确定按钮，只对 `date、daterange、week、weekrange、month、monthrange` 类型有效。

```html
<wd-calendar label="快捷操作" :show-confirm="false" v-model="value" @confirm="handleConfirm" />
```

## 范围选择允许选中同一日期

设置 `allow-same-day` 属性，范围选择允许用户选择同一天、同一周、同一个月。

```html
<wd-calendar type="daterange" v-model="value" allow-same-day @confirm="handleConfirm" />
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
<wd-calendar type="daterange" v-model="value" allow-same-day :formatter="formatter" @confirm="handleConfirm" />
```

```typescript
const value = ref<number[]>([])

function handleConfirm({ value }) {
  console.log(value)
}

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
```

## 快捷选项

设置 `shortcuts` 属性，配置快捷选项列表，传入 `on-shortcuts-click` 属性，`on-shortcuts-click` 是个函数，接收 { item, index } 参数，item 为当前选项，index 为当前选项的下标。当快捷选项被点击时，会调用 `on-shortcuts-click`，接收到日历新的选中值。`text` 为选项的必传字段，其他字段根据自己需要自行传入。

```html
<wd-calendar
  label="快捷选项"
  :shortcuts ="shortcuts "
  :on-shortcuts-click="onShortcutsClick"
  type="daterange"
  v-model="value"
  @confirm="handleConfirm"
/>
```

```typescript
const shortcuts = ref<Record<string, any>[]>([
  {
    text: '近7天',
    id: 7
  },
  {
    text: '近15天',
    id: 15
  },
  {
    text: '近30天',
    id: 30
  }
])
const value = ref<string>('')

const onShortcutsClick = ({ item }) => {
  const dayDiff = item.id
  const endDate = Date.now() - 24 * 60 * 60 * 1000
  const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

  return [startDate, endDate]
}


function handleConfirm({ value }) {
  console.log(value)
}
```

## 自定义展示

设置 `display-format` 属性可以自定义表单回显，`inner-display-format` 属性自定义范围选择类型的面板内部回显。

`display-format` 为函数，接收 `value`（当前值，type 为范围类型时为时间戳数组，其他类型为 number）、`type`（当前日历类型） 两个参数。

`inner-display-format` 为函数，会调用两次，接收 `value`（开始日期或结束日期，类型为 number）、`rangeType`（'start' - 开始日期, 'end' - 结束日期）、`type`（当前日历类型）三个参数。

```html
<wd-calendar
  label="自定义展示"
  type="daterange"
  v-model="value"
  :display-format="displayFormat"
  :inner-display-format="innerDisplayFormat"
  @confirm="handleConfirm"
/>
```

```typescript
import { dayjs } from '@/uni_modules/wot-design-uni'

const value = ref<string>('')

const displayFormat = (value) => {
  return dayjs(value[0]).format('YY年MM月DD日') + ' - ' + dayjs(value[1]).format('YY年MM月DD日')
}

const innerDisplayFormat = (value, rangeType) => {
  if (!value) {
    return rangeType === 'start' ? '活动开始时间' : '活动结束时间'
  }

  return dayjs(value).format('YY年MM月DD日')
}

function handleConfirm({ value }) {
  console.log(value)
}
```

## 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value` 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-toast />

<wd-calendar label="before-confirm" v-model="value" :before-confirm="beforeConfirm" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const value = ref<string>('')

const beforeConfirm = ({ value, resolve }) => {
  if (value > Date.now()) {
    toast.error('该日期暂无数据')
    resolve(false)
  } else {
    resolve(true)
  }
}

function handleConfirm({ value }) {
  console.log(value)
}

```

## 最大范围限制

设置 `max-range` 属性，设置范围选择的最大限制。

```html
<wd-calendar type="daterange" :max-range="3" v-model="value" @confirm="handleConfirm" />
```

## 设置周起始日

设置 `first-day-of-week` 属性，默认为 0，即周日，设置为 1 则为周一，依此类推。

## 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<view style="margin-bottom: 10px;">当前选中日期：{{ formatValue }}</view>
<wd-calendar use-default-slot v-model="value" @confirm="handleConfirm4">
  <wd-button>选择日期</wd-button>
</wd-calendar>
```

```typescript
const value = ref<string>('')
const formatValue = ref<string>('')

function handleConfirm4({ value }) {
  formatValue.value = new Date(value).toString()
}

```

## Attributes

| 参数                   | 说明                                                                                                | 类型                  | 可选值                                                                                      | 默认值                | 最低版本 |
| ---------------------- | --------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------- | --------------------- | -------- |
| v-model                  | 选中值，为 13 位时间戳或时间戳数组                                                                  | null / number / array | -                                                                                           | -                     | -        |
| type                   | 日期类型                                                                                            | string                | date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange | date                  | -        |
| min-date               | 最小日期，为 13 位时间戳                                                                            | number                | -                                                                                           | 当前日期往前推 6 个月 | -        |
| max-date               | 最大日期，为 13 位时间戳                                                                            | number                | -                                                                                           | 当前日期往后推 6 个月 | -        |
| first-day-of-week      | 周起始天                                                                                            | number                | -                                                                                           | 0                     | -        |
| formatter              | 日期格式化函数                                                                                      | function              | -                                                                                           | -                     | -        |
| max-range              | type 为范围选择时有效，最大日期范围                                                                 | number                | -                                                                                           | -                     | -        |
| range-prompt           | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案                                         | string                | -                                                                                           | 选择天数不能超过 x 天 | -        |
| allow-same-day         | type 为范围选择时有效，是否允许选择同一天                                                           | boolean               | -                                                                                           | false                 | -        |
| default-time           | 选中日期所使用的当日内具体时刻                                                                      | string / array        | -                                                                                           | 00:00:00              | -        |
| time-filter            | type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据                              | function              | -                                                                                           | -                     | -        |
| hide-second            | type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改                                      | boolean               | -                                                                                           | false                 | -        |
| show-confirm           | 是否显示确定按钮                                                                                    | boolean               | -                                                                                           | true                  | -        |
| show-type-switch       | 是否显示类型切换功能                                                                                | boolean               | -                                                                                           | false                 | -        |
| shortcuts              | 快捷选项，为对象数组，其中对象的 `text` 必传                                                        | array                 | -                                                                                           | -                     | -        |
| title                  | 弹出层标题                                                                                          | string                | -                                                                                           | 选择日期              | -        |
| label                  | 选择器左侧文案                                                                                      | string                | -                                                                                           | -                     | -        |
| placeholder            | 选择器占位符                                                                                        | string                | -                                                                                           | 请选择                | -        |
| disabled               | 禁用                                                                                                | boolean               | -                                                                                           | fasle                 | -        |
| readonly               | 只读                                                                                                | boolean               | -                                                                                           | false                 | -        |
| display-format         | 自定义展示文案的格式化函数，返回一个字符串                                                          | function              | -                                                                                           | -                     | -        |
| inner-display-format   | 自定义范围选择类型的面板内部回显，返回一个字符串                                                    | function              | -                                                                                           | -                     | -        |
| size                   | 设置选择器大小                                                                                      | string                | large                                                                                       | -                     | -        |
| label-width            | 设置左侧标题宽度                                                                                    | string                | -                                                                                           | 33%                   | -        |
| error                  | 是否为错误状态，错误状态时右侧内容为红色                                                            | boolean               | -                                                                                           | false                 | -        |
| required               | 必填样式                                                                                            | boolean               | -                                                                                           | false                 | -        |
| center                 | 是否垂直居中                                                                                        | boolean               | -                                                                                           | false                 | -        |
| ellipsis               | 是否超出隐藏                                                                                        | boolean               | -                                                                                           | false                 | -        |
| align-right            | 选择器的值靠右展示                                                                                  | boolean               | -                                                                                           | false                 | -        |
| before-confirm         | 确定前校验函数，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收 1 个 boolean 参数 | function              | -                                                                                           | -                     | -        |
| use-default-slot       | 使用默认插槽时设置该选项                                                                            | boolean               | -                                                                                           | false                 | -        |
| use-label-slot         | 使用 label 插槽时设置该选项                                                                         | boolean               | -                                                                                           | false                 | -        |
| close-on-click-modal   | 点击遮罩是否关闭                                                                                    | boolean               | -                                                                                           | true                  | -        |
| z-index                | 弹窗层级                                                                                            | number                | -                                                                                           | 15                    | -        |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型）                                                 | boolean               | -                                                                                           | true                  | -        |
| prop | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 | string | - | - | - |
| rules | 表单验证规则，结合`wd-form`组件使用	 | `FormItemRule []`	 | - | `[]` | - |
| immediate-change | type 为 'datetime' 或 'datetimerange' 时有，是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 | boolean | - | false | 1.2.25 |


### FormItemRule 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段	 | `boolean` |
| message | 错误提示文案	 | `string` |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern | 通过正则表达式进行校验，正则无法匹配表示校验不通过 | `RegExp` |

## Events

| 事件名称 | 说明                                 | 参数                     | 最低版本 |
| -------- | ------------------------------------ | ------------------------ | -------- |
| confirm  | 绑定值变化时触发                     | `{ value }`               | -        |
| change   | 点击面板日期时触发                   | `{ value }`               | -        |
| cancel   | 点击关闭按钮或者蒙层时触发           | -|-|

## Methods

| 方法名称 | 说明     | 参数 | 最低版本 |
| -------- | -------- | ---- | -------- |
| open     | 打开面板 | -    | -        |
| close    | 关闭面板 | -    | -        |

## Slots

| name    | 说明       | 最低版本 |
| ------- | ---------- | -------- |
| default | 自定义展示 | -        |
| label   | 左侧插槽   | -        |

## 外部样式类

| 类名               | 说明                 | 最低版本 |
| ------------------ | -------------------- | -------- |
| custom-class       | 根节点样式           | -        |
| custom-label-class | label 外部自定义样式 | -        |
| custom-value-class | value 外部自定义样式 | -        |
