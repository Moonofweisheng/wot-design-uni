<frame/>

# SelectPicker 单复选选择器 <el-tag text style="vertical-align: middle;margin-left:8px;" type="warning">0.1.34 更新</el-tag>

## 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)；

`v-model` 设置选中项的值，数据类型为 `Array` | `String` `Number` 或 `Boolean`；

```html
<wd-select-picker label="基本用法" v-model="value" :columns="columns" @change="handleChange"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装'
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  }
])
const value = ref<string[]>(['101'])

function handleChange({ value }) {
  toast.show('选择了' + value)
}
```

## 类型切换

`type` 默认值为 `checkbox`， 为默认值时，value 值类型为 `Array` 类型

设置 `type` 值为 `radio` ，开启单选类型，value 值类型为 `String` `Number` 或 `Boolean`。

```html
<wd-select-picker label="类型切换" v-model="value" :columns="columns" type="radio"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装'
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  }
])
const value = ref<string[]>(['101'])
```

## 禁用

设置 `disabled` 属性。

```html
<wd-select-picker label="禁用" v-model="value" :columns="columns" disabled></wd-select-picker>
```

## 只读

设置 `readonly` 属性。

```html
<wd-select-picker label="只读" v-model="value" :columns="columns" readonly></wd-select-picker>
```

## 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-select-picker label="禁用选项" v-model="value" :columns="columns"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装',
    disabled: true
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  }
])
const value = ref<string[]>(['101'])
```

## 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（当类型`checkbox`时 参数是 数组类型，类型为`radio` 时参数是 `String` `Number` 或 `Boolean` 类型）, 当前的选项数组 `columns`，返回要展示的字符串。

```html
<wd-select-picker label="展示格式化" v-model="value" :columns="columns" :display-format="displayFormat"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装',
    disabled: true
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  }
])
const value = ref<string[]>(['101'])

const displayFormat = (items, columns) => {
  let showValue = ''
  columns.forEach((column) => {
    items.forEach((item, index) => {
      if (column.value === item) {
        showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
      }
    })
  })
  return showValue
}
```

## 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入`value`(选中项 也就是当前选择的值） 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-select-picker label="确定前校验" v-model="value" :columns="columns" :before-confirm="beforeConfirm"></wd-select-picker>
```

```typescript
const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装'
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  }
])
const value = ref<string[]>(['101'])

const beforeConfirm = (value, resolve) => {
  if (value.length > 0) {
    toast.error('暂时无法选择商品')
    resolve(false)
  } else {
    resolve(true)
  }
}
```

## 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-select-picker label="标题" v-model="value" :columns="columns" title="多选"></wd-select-picker>
```

## 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-select-picker label="错误" v-model="value" :columns="columns" error></wd-select-picker>
```

## 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-select-picker label="必填" v-model="value" :columns="columns" required></wd-select-picker>
```

## 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-select-picker label="大尺寸" v-model="value" :columns="columns" size="large"></wd-select-picker>
```

## 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-select-picker label="值靠右展示" v-model="value" :columns="columns" align-right></wd-select-picker>
```

## 可搜索

设置 `filterable` 属性支持本地搜索，设置 `filter-placeholder` 属性设置搜索框的占位符。

```html
<wd-select-picker label="可搜索" v-model="value" :columns="columns" filterable></wd-select-picker>
```

## 自动完成

`radio`类型，设置 `show-confirm` 属性支持控制确认按钮的显示，设置为`false`可自动完成。

```html
<wd-select-picker label="自动完成" type="radio" :show-confirm="false" v-model="value19" :columns="columns" />
```

## 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<view>当前选中项：{{customShow}}</view>
<wd-select-picker v-model="value" use-default-slot :columns="columns" @confirm="handleConfirm">
  <wd-button>默认唤起项</wd-button>
</wd-select-picker>
```

```typescript
const value = ref<string[]>(['102'])

const columns = ref<Record<string, any>>([
  {
    value: '101',
    label: '男装'
  },
  {
    value: '102',
    label: '奢侈品'
  },
  {
    value: '103',
    label: '女装'
  },
  {
    value: '104',
    label: '鞋靴'
  },
  {
    value: '105',
    label: '内衣配饰'
  },
  {
    value: '106',
    label: '箱包'
  },
  {
    value: '107',
    label: '美妆护肤'
  },
  {
    value: '108',
    label: '个性清洁'
  },
  {
    value: '109',
    label: '钟表珠宝'
  },
  {
    value: '110',
    label: '手机'
  },
  {
    value: '111',
    label: '数码'
  },
  {
    value: '112',
    label: '电脑办公'
  }
])

function handleConfirm({ value, selectedItems }) {
  console.log(value)
  customShow.value = selectedItems
    .map((item) => {
      return item.label
    })
    .join(', ')
}
```

## Attributes

| 参数                   | 说明                                                                                                     | 类型                              | 可选值           | 默认值   | 最低版本 |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- | -------- | -------- |
| v-model                | 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string    | array / number / boolean / string | -                | -        | -        |
| columns                | 选择器数据，一维数组                                                                                     | array                             | -                | -        | -        |
| type                   | 单复选选择器类型                                                                                         | string                            | checkbox / radio | checkbox | -        |
| value-key              | 选项对象中，value 对应的 key                                                                             | string                            | -                | value    | -        |
| label-key              | 选项对象中，展示的文本对应的 key                                                                         | string                            | -                | label    | -        |
| title                  | 弹出层标题                                                                                               | string                            | -                | -        | -        |
| label                  | 选择器左侧文案                                                                                           | string                            | -                | -        | -        |
| placeholder            | 选择器占位符                                                                                             | string                            | -                | 请选择   | -        |
| disabled               | 禁用                                                                                                     | boolean                           | -                | fasle    | -        |
| loading                | 加载中                                                                                                   | boolean                           | -                | false    | -        |
| loading-color          | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写                                                   | String                            | -                | #4D80F0  | -        |
| readonly               | 只读                                                                                                     | boolean                           | -                | false    | -        |
| display-format         | 自定义展示文案的格式化函数，返回一个字符串                                                               | function                          | -                | -        | -        |
| confirm-button-text    | 确认按钮文案                                                                                             | string                            | -                | 确认     | -        |
| size                   | 设置选择器大小                                                                                           | string                            | large            | -        | -        |
| label-width            | 设置左侧标题宽度                                                                                         | string                            | -                | 33%      | -        |
| error                  | 是否为错误状态，错误状态时右侧内容为红色                                                                 | boolean                           | -                | false    | -        |
| required               | 必填样式                                                                                                 | boolean                           | -                | false    | -        |
| align-right            | 选择器的值靠右展示                                                                                       | boolean                           | -                | false    | -        |
| before-confirm         | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收 1 个 boolean 参数 | function                          | -                | -        | -        |
| select-size            | 设置 picker 内部的选项组尺寸大小 （单/复选框）                                                           | string                            | large            | -        | -        |
| min                    | 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`）                                           | number                            | -                | 0        | -        |
| max                    | 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`）                   | number                            | -                | 0        | -        |
| checked-color          | 选中的颜色（单/复选框）                                                                                  | string                            | -                | #4D80F0  | -        |
| use-default-slot       | 使用默认插槽时设置该选项                                                                                 | boolean                           | -                | false    | -        |
| use-label-slot         | 使用 label 插槽时设置该选项                                                                              | boolean                           | -                | false    | -        |
| close-on-click-modal   | 点击遮罩是否关闭                                                                                         | boolean                           | -                | true     | -        |
| z-index                | 弹窗层级                                                                                                 | number                            | -                | 15       | -        |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型）                                                      | boolean                           | -                | true     | -        |
| filterable             | 可搜索（目前只支持本地搜索）                                                                             | boolean                           | -                | false    | -        |
| filter-placeholder     | 搜索框占位符                                                                                             | string                            | -                | 搜索     | -        |
| ellipsis               | 是否超出隐藏                                                                                             | boolean                           | -                | false    | -        |
| scroll-into-view       | 重新打开是否滚动到选中项                                                                                 | boolean                           | -                | true     | 0.1.34   |
| show-confirm           | 是否显示确认按钮（仅`radio`类型生效）                                                                             | boolean                           |                  | true     | 1.2.8    |
| prop                   | 表单域 `model` 字段名，在使用表单校验功能的情况下，该属性是必填的                                        | string                            | -                | -        | -        |
| rules                  | 表单验证规则，结合`wd-form`组件使用                                                                      | `FormItemRule []`                 | -                | `[]`     | -        |

### FormItemRule 数据结构

| 键名      | 说明                                                    | 类型                                  |
| --------- | ------------------------------------------------------- | ------------------------------------- |
| required  | 是否为必选字段                                          | `boolean`                             |
| message   | 错误提示文案                                            | `string`                              |
| validator | 通过函数进行校验，可以返回一个 `Promise` 来进行异步校验 | `(value, rule) => boolean \| Promise` |
| pattern   | 通过正则表达式进行校验，正则无法匹配表示校验不通过      | `RegExp`                              |

## 选项数据结构

| 键名     | 说明     | 类型    | 是否必填 | 最低版本 |
| -------- | -------- | ------- | -------- | -------- |
| value    | 选项值   | string  | 是       | -        |
| label    | 选项名   | string  | 是       | -        |
| disabled | 禁用选项 | boolean | 否       | -        |

## Events

| 事件名称 | 说明                       | 参数                                                                                                       | 最低版本 |
| -------- | -------------------------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| confirm  | 点击确认时触发             | event.detail = { value, selectedItems }, checkbox 类型时 value 和 selectedItems 为数组，radio 类型为非数组 | -        |
| change   | picker 内选项更改时触发    | `{ value }`, checkbox 类型时 value 为数组，radio 类型为非数组                                              | -        |
| cancel   | 点击关闭按钮或者蒙层时触发 | -                                                                                                          | -        |
| close   | 弹窗关闭时触发 | -                                                                                                          | 1.2.29        |
| open   | 弹窗打开时触发 | -                                                                                                          | 1.2.29        |

## Methods

| 方法名称 | 说明     | 参数 | 最低版本 |
| -------- | -------- | ---- | -------- |
| open     | 打开弹窗 | -    | -        |
| close    | 关闭弹窗 | -    | -        |

## Slots

| 插槽名称 | 说明       | 最低版本 |
| -------- | ---------- | -------- |
| default  | 自定义展示 | -        |
| label    | 左侧插槽   | -        |

## 外部样式类

| 类名                 | 说明                     | 最低版本 |
| -------------------- | ------------------------ | -------- |
| custom-class         | 根节点样式               | -        |
| custom-label-class   | label 外部自定义样式     | -        |
| custom-value-class   | value 外部自定义样式     | -        |
| custom-content-class | 弹出层内容区域自定义样式 | -        |
