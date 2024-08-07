<frame/>

# DatetimePicker 日期时间选择器

为 Picker 组件的封装，在其内部构建好日期时间选项。

## 基本用法

`v-model` 设置绑定值，默认为 `datetime` 类型，展示年月日时分，绑定值为 `时间戳` 类型，如果为 `time` 类型，绑定值为字符串。label 可以不传。可以通过 `label-width` 设置标题宽度，默认为 `33%`。

```html
<wd-datetime-picker v-model="value" label="日期选择" @confirm="handleConfirm" />
```

```typescript
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## 设置默认值

`default-value` 设置默认日期，打开面板时面板自动选到默认日期。

```html
<wd-datetime-picker v-model="value" :default-value="defaultValue" label="日期选择" @confirm="handleConfirm" />
```

```typescript
const value = ref<string>('')
const defaultValue = ref<number>(Date.now())

function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## date 类型

`date` 类型只展示年月日。

```html
<wd-datetime-picker type="date" v-model="value" label="年月日" />
```
```typescript

const value = ref<number>(Date.now())
```
## year-month 类型

`year-month` 类型只展示年月。

```html
<wd-datetime-picker type="year-month" v-model="value" label="年月" />
```
```typescript
const value = ref<number>(Date.now())
```

## year 类型

`year` 类型只展示年。

```html
<wd-datetime-picker type="year" v-model="value" label="年" />
```
```typescript
const value = ref<number>(Date.now())
```

## time 类型

`time` 类型只展示时分，绑定值为 `HH:mm` 格式。

```html
<wd-datetime-picker type="time" v-model="value" label="时分" />
```
```typescript
const value4 = ref<string>('09:20')
```

## 修改展示格式


给 `display-format` 属性传入一个函数，接收所有选中项数组，返回展示的文本内容。

```html
<wd-datetime-picker v-model="value" label="展示格式" :displayFormat="displayFormat" />
```
```typescript
const value = ref<number>(Date.now())
const displayFormat = (items) => {
  return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
}
```
## 修改弹出层内部格式


给 `formatter` 属性传入一个函数，接收 `type` 和 `value` 值，返回展示的文本内容。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`value` 为 `number` 类型。
使用自定义`formatter`会关闭内置的默认`display-format`函数。

```html
<wd-datetime-picker v-model="value" label="内部格式" :formatter="formatter" />
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
<wd-datetime-picker v-model="value" label="过滤选项" :filter="filter" />
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

## 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-datetime-picker label="日期选择" size="large" v-model="value" />
```

## 必填属性

设置 `required` 属性开启表单必填。

```html
<wd-datetime-picker label="必填属性" error v-model="value" required/>
```

## 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-datetime-picker label="日期选择" error v-model="value" />
```

## 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-datetime-picker label="日期选择" align-right v-model="value" />
```

## 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value`(time 类型为字符串，其他为时间戳，当picker为区间选择时，`value`为数组) 、 `resolve` 和 `picker` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭 `picker`弹窗。可以通过 `picker` 参数直接设置 `loading` 等属性。

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
      toast.error('不能选择大于今天的日期')
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ value }) {
  console.log(new Date(value))
}
```

## 唤起项插槽

开启 `use-default-slot` ，设置默认插槽修改唤起picker组件的形式。

```html
<wd-datetime-picker  v-model="value" use-default-slot>
  <wd-button>插槽唤起</wd-button>
</wd-datetime-picker>
```

## 时间范围选择

当 `v-model` 为 `Array` 类型, 时间范围选择开启。

```html
<wd-datetime-picker label="日期选择" v-model="value" @confirm="handleConfirm" />

```

```typescript
const value = ref<any[]>(['', Date.now()])

function handleConfirm({ value }) {
  console.log(new Date(value))
}

```

## 范围选择tab标签展示格式

给 `display-format-tab-label` 属性传入一个函数，接收所有选中项数组，返回展示的文本内容。


```html
<wd-datetime-picker v-model="value" label="范围tab展示格式" :display-format-tab-label="displayFormatTabLabel" @confirm="handleConfirm"></wd-datetime-picker>
```

```typescript

const value = ref<any[]>(['', Date.now()])

function handleConfirm({ value }) {
  console.log(new Date(value))
}

const displayFormatTabLabel = (items) => {
  return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
}

```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model | 选中项，当 type 为 time 时，类型为字符串；当 type 为 Array 时，类型为范围选择；否则为 Date | string / date / array | - | - | - |
| default-value | 默认日期，类型保持与 value 一致，打开面板时面板自动选到默认日期 | string / date / array | - | - | - |
| type | 选择器类型 | string | date / year-month / time / year | datetime | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | string | - | #4D80F0 | - |
| columns-height | picker内部滚筒高 | number | - | 231 | - |
| title | 弹出层标题 | string | - | - | - |
| cancel-button-text | 取消按钮文案 | string | - | 取消 | - |
| confirm-button-text | 确认按钮文案 | string | - | 完成 | - |
| label | 选择器左侧文案，label可以不传 | string | - | - | - |
| placeholder | 选择器占位符 | string | - | 请选择 | - |
| disabled | 禁用 | boolean | - | fasle | - |
| readonly | 只读 | boolean | - | false | - |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - | - |
| formatter | 自定义弹出层选项文案的格式化函数，返回一个字符串 | function | - | - | - |
| filter | 自定义过滤选项的函数，返回列的选项数组 | function | - | - | - |
| display-format-tab-label | 在区域选择模式下，自定义展示tab标签文案的格式化函数，返回一个字符串 | function | - | - | - |
| minDate | 最小日期，13 位的时间戳    | `timestamp` | - | 当前日期 - 10年 | - |
| maxDate | 最大日期，13 位的时间戳    | `timestamp` | - | 当前日期 + 10年 | - |
| minHour | 最小小时，time类型时生效 | number | - | 0 | - |
| maxHour | 最大小时，time类型时生效 | number | - | 23 | - |
| minMinute | 最小分钟，time类型时生效 | number | - | 0 | - |
| maxMinute | 最大分钟，time类型时生效 | number | - | 59 | - |
| required | 表单属性，必填 | boolean | - | false | - |
| size | 设置选择器大小 | string | large | - | - |
| label-width | 设置左侧标题宽度 | string | - | 33% | - |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false | - |
| align-right | 选择器的值靠右展示 | boolean | - | false | - |
| use-label-slot | label 使用插槽 | boolean | - | false | - |
| use-default-slot | 使用默认插槽 | boolean | - | false | - |
| before-confirm | 确定前校验函数，接收 (value, resolve, picker) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| z-index | 弹窗层级 | number | - | 15 | - |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | true | - |
| ellipsis | 是否超出隐藏 | boolean | - | false | - |
| prop | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的 | string | - | - | - |
| rules | 表单验证规则，结合`wd-form`组件使用	 | `FormItemRule []`	 | - | `[]` | - |
| immediate-change | 是否在手指松开时立即触发picker-view的 change 事件。若不开启则会在滚动动画结束后触发 change 事件，1.2.25版本起提供，仅微信小程序和支付宝小程序支持。 | boolean | - | false | 1.2.25 |

### FormItemRule 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否为必选字段	 | `boolean` |
| message | 错误提示文案	 | `string` |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern | 通过正则表达式进行校验，正则无法匹配表示校验不通过 | `RegExp` |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| confirm | 点击右侧按钮触发 | `{ value }`, value 为当前选中日期的时间戳，'time' 类型则为字符串 | - |
| cancel | 点击左侧按钮触发 | - | - |
| toggle | 在区域选择模式下，tab标签切换时触发 | 切换到当前picker选中的值 | - |

## Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| open | 打开picker弹框 | - |
| close | 关闭picker弹框 | - |

## Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 使用默认插槽 | - |
| label | 左侧标题插槽 | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-view-class | pickerView 外部自定义样式 | - |
| custom-cell-class | pickerView cell 外部自定义样式 | $LOWEST_VERSION$ |
| custom-label-class | label 外部自定义样式 | - |
| custom-value-class | value 外部自定义样式 | - |
