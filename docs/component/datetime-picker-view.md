<frame/>

#  DatetimePickerView 日期时间选择器视图


## 基本用法

`v-model` 设置绑定值，默认为 `datetime` 类型，展示年月日时分，绑定值为 `时间戳` 类型，如果为 `time` 类型，绑定值为字符串。

```html
<wd-toast />

<wd-datetime-picker-view v-model="value" label="日期选择" @change="handleChange" />
```
```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const value = ref<number>(Date.now())

function onChange1({ value }) {
  toast.show('选择了' + new Date(value))
}
```

## date 类型

`date` 类型只展示年月日。

```html
<wd-datetime-picker-view type="date" v-model="value" label="年月日" />
```
```typescript
const value = ref<number>(Date.now())
```
## year-month 类型

`year-month` 类型只展示年月。

```html
<wd-datetime-picker-view type="year-month" v-model="value" label="年月" />
```
```typescript
const value = ref<number>(Date.now())
```

## year 类型

`year` 类型只展示年月。

```html
<wd-datetime-picker-view type="year" v-model="value" label="年" />
```
```typescript
const value = ref<number>(Date.now())
```

## time 类型

`time` 类型只展示时分，绑定值为 `HH:mm` 格式。

```html
<wd-datetime-picker-view type="time" v-model="value" label="时分" />
```
```typescript
const value4 = ref<string>('11:12')
```

## 修改内部格式



给 `formatter` 属性传入一个函数，接收 `type` 和 `value` 值，返回展示的文本内容。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`value` 为 `number` 类型。
使用自定义`formatter`会关闭内置的默认`display-format`函数。

```html
<wd-datetime-picker-view v-model="value" label="内部格式" :formatter="formatter" />
```

```typescript
const value = ref<number>(Date.now())

const formatter = (type, value) => {
  switch (type) {
    case 'year':
      return value + '年'
    case 'month':
      return value + '月'
    case 'date':
      return value + '日'
    case 'hour':
      return value + '时'
    case 'minute':
      return value + '分'
    default:
      return value
  }
}
```

## 过滤选项

给 `filter` 属性传入一个函数，接收 `type` 和 `values` 值，返回列的选项列表。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`values` 为 number数组。

```html
<wd-datetime-picker-view v-model="value" label="过滤选项" :filter="filter" />
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

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model | 选中项，当 type 为 time 时，类型为字符串，否则为 Date | string / date | - | - |
| type | 选择器类型 | string | date / year-month / time / year | datetime | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | string | - | #4D80F0 | - |
| columns-height | picker内部滚筒高 | number | - | 231 | - |
| formatter | 自定义弹出层选项文案的格式化函数，返回一个字符串 | function | - | - | - |
| filter | 自定义过滤选项的函数，返回列的选项数组 | function | - | - | - |
| minDate | 最小日期，13 位的时间戳    | `timestamp` | - | 当前日期 - 10年 | - |
| maxDate | 最大日期，13 位的时间戳  | `timestamp` | - | 当前日期 + 10年 | - |
| minHour | 最小小时，time类型时生效 | number | - | 0 | - |
| maxHour | 最大小时，time类型时生效 | number | - | 23 | - |
| minMinute | 最小分钟，time类型时生效 | number | - | 0 | - |
| maxMinute | 最大分钟，time类型时生效 | number | - | 59 | - |
| immediate-change | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 | boolean | - | false | 1.2.25 |
## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| change | 切换选项时触发 | 选中的值 `{ value }`，value 为当前选中日期的时间戳，'time' 类型则为字符串 | - |
| pickstart | 当滚动选择开始时候触发事件 | - | - | - |
| pickend | 当滚动选择结束时候触发事件 | - | - | - |
