## Calendar 日历选择器

**2.3.0版本新增**

提供日历单选、多选、范围选择、周维度、月维度等功能。

### 引入

```json
{
  "usingComponents": {
    "wd-calendar": "/wot-design/calendar/index"
  }
}
```

### 基本使用

`type` 默认为 `date` 类型，设置 `value` 绑定值（13位时间戳格式），监听 `bind:confirm` 事件获取选中值。`min-date` 最小日期默认为当前日期往前推 6 个月，`max-date` 最大日期默认为当前日期往后推 6 个月，日历的日期只展示最小日期到最大日期之间的日期。label 可以不传。可以通过 `label-width` 设置标题宽度，默认为 '33%'。

> 小程序中这两个值尽量不要设置过大，避免大量数据的计算和传递导致页面性能低下。

```html
<wd-calendar value="{{ value }}" label="日期选择" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: Date.now()
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 日期多选

设置 `type` 为 `dates` 类型，此时 `value` 为数组。

```html
<wd-calendar type="dates" value="{{ value }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: []
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 周类型选择

设置 `type` 为 `week` 类型，如果 `value` 有初始值，建议将周起始日 `first-day-of-week` 设置为 1（周一），避免选中样式和回显匹配不上。

```html
<wd-calendar type="week" value="{{ value }}" first-day-of-week="{{ 1 }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: Date.now()
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 月类型选择

设置 `type` 为 `month` 类型，此时 `value` 有值时其值为月的第一天。

```html
<wd-calendar type="month" value="{{ value }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: Date.now()
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 范围选择

`type` 支持 `daterange`（日期范围选择）、`weekrange`（周范围选择）、`monthrange`（月范围选择） 类型，此时 `value` 为数组格式。

```html
<wd-calendar type="daterange" value="{{ value }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: []
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 日期时间类型

设置 `type` 为 `datetime` 类型，可以选择到时分秒，设置 `type` 为 `datetimerange` 为范围选择。

```html
<wd-calendar type="datetime" value="{{ value }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: ''
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

可以设置 `hide-second`，使时间只展示到分钟级别；设置 `time-filter` 属性，可以自定义过滤 时分秒 选项，该属性接收 { type: string, values: array } 参数，返回一个新的数组，type 值为 'hour'、'minute' 或 'second'，values 为picker数据列表。

```html
<wd-calendar type="datetime" value="{{ value }}" bind:confirm="handleConfirm" hide-second time-filter="{{ timeFilter }}" />
```

```javascript
Page({
  data: {
    value: '',
    timeFilter ({ type, values }) {
      if (type === 'minute') {
        // 只展示 0,10,20,30,40,50 分钟选项
        return values.filter(item => {
          return item % 10 === 0
        })
      }

      return values
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 日周月切换

设置 `show-type-switch` 属性，展示 日周月 切换功能，支持在日周月类型 `date、week、month` 之间进行来回切换，可以通过 `type` 属性设置初始类型。如果 `type` 为 range 类型如 `daterange`，则日历可以在 `daterange、weekrange、monthrang` 之间进行来回切换。

```html
<wd-calendar label="日周月切换" first-day-of-week="{{ 1 }}" show-type-switch value="{{ value }}" bind:confirm="handleConfirm" />
```

### 快捷操作

设置 `show-confirm` 属性为 `false`，不展示确定按钮，只对 `date、daterange、week、weekrange、month、monthrange` 类型有效。

```html
<wd-calendar label="快捷操作" show-confirm="{{ false }}" value="{{ value }}" bind:confirm="handleConfirm" />
```

### 范围选择允许选中同一日期

设置 `allow-same-day` 属性，范围选择允许用户选择同一天、同一周、同一个月。

```html
<wd-calendar type="daterange" value="{{ value }}" allow-same-day bind:confirm="handleConfirm" />
```

### 格式化日期

设置 `formatter` 参数，其值为函数类型，接收一个 `object` 参数，返回一个对象，对象的属性保持跟入参的属性一致，其属性如下：

| 属性 | 类型 | 说明 | 最低版本 |
|-----|------|-----|---------|
| type | string | 日期类型，'selected' - 单日期选中，'start' - 范围开始日期，'end' - 范围结束日期，'middle' - 范围开始与结束之间的日期，'same' - 范围开始与结束日期同一天 | 2.3.0 |
| date | timestamp | 13位的时间戳 | 2.3.0 |
| text | string | 日期文本内容 | 2.3.0 |
| topInfo | string | 上方提示信息 | 2.3.0 |
| bottomInfo | string | 下方提示信息 | 2.3.0 |
| disabled | boolean | 是否禁用 | 2.3.0 |

```html
<wd-calendar type="daterange" value="{{ value }}" allow-same-day formatter="{{ formatter }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: [],
    formatter: function (day) {
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
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 快捷选项

设置 `shortcuts` 属性，配置快捷选项列表，传入 `on-shortcuts-click` 属性，`on-shortcuts-click` 是个函数，接收 { item, index } 参数，item 为当前选项，index 为当前选项的下标。当快捷选项被点击时，会调用 `on-shortcuts-click`，接收到日历新的选中值。`text` 为选项的必传字段，其他字段根据自己需要自行传入。

```html
<wd-calendar label="快捷选项" shortcuts="{{ shortcuts }}" on-shortcuts-click="{{ onShortcutsClick }}" type="daterange" value="{{ value }}" bind:confirm="handleConfirm" />
```

```javascript
Page({
  data: {
    value: '',
    shortcuts: [
      {
        text: '近7天',
        id: 7
      }, {
        text: '近15天',
        id: 15
      }, {
        text: '近30天',
        id: 30
      }
    ],
    onShortcutsClick ({ item }) {
      const dayDiff = item.id
      const endDate = Date.now() - 24 * 60 * 60 * 1000
      const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

      return [startDate, endDate]
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 自定义展示

设置 `display-format` 属性可以自定义表单回显，`inner-display-format` 属性自定义范围选择类型的面板内部回显。

`display-format` 为函数，接收 `value`（当前值，type为范围类型时为时间戳数组，其他类型为 number）、`type`（当前日历类型） 两个参数。

`inner-display-format` 为函数，会调用两次，接收 `value`（开始日期或结束日期，类型为 number）、`rangeType`（'start' - 开始日期, 'end' - 结束日期）、`type`（当前日历类型）三个参数。

```html
<wd-calendar label="自定义展示" type="daterange" value="{{ value }}" display-format="{{ displayFormat }}" inner-display-format="{{ innerDisplayFormat }}" bind:confirm="handleConfirm" />
```

```javascript
import dayjs from '../../wot-design/common/dayjs.min.js'

Page({
  data: {
    value: '',
    displayFormat (value) {
      return dayjs(value[0]).format('YY年MM月DD日') + ' - ' + dayjs(value[1]).format('YY年MM月DD日')
    },
    innerDisplayFormat (value, rangeType) {
      if (!value) {
        return rangeType === 'start' ? '活动开始时间' : '活动结束时间'
      }

      return dayjs(value).format('YY年MM月DD日')
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入 `value` 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-toast id="wd-toast" />

<wd-calendar label="before-confirm" value="{{ value }}" before-confirm="{{ beforeConfirm }}" />
```

```javascript
import Toast from '../../wot-design/toast/toast.js'

Page({
  data: {
    value: '',
    beforeConfirm({ value, resolve }) {
      if (value > Date.now()) {
        Toast.error('该日期暂无数据')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 最大范围限制

设置 `max-range` 属性，设置范围选择的最大限制。

```html
<wd-calendar type="daterange" max-range="{{ 3 }}" value="{{ value }}" bind:confirm="handleConfirm" />
```

### 设置周起始日

设置 `first-day-of-week` 属性，默认为 0，即周日，设置为 1 则为周一，依此类推。

### 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<view style="margin-bottom: 10px;">
  当前选中日期：{{ formatValue }}
</view>
<wd-calendar use-default-slot value="{{ value }}" bind:confirm="handleConfirm4">
  <wd-button>选择日期</wd-button>
</wd-calendar>
```

```javascript
Page({
  data: {
    value: '',
    formatValue: ''
  },
  handleConfirm (event) {
    const { value } = event.detail

    this.setData({
      value: value
      formatValue: new Date(value).toString()
    })
  }
})
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|-----|
| value | 选中值，为 13 位时间戳或时间戳数组 | null / number / array | - | - | 2.3.0 |
| type | 日期类型 | string | date / dates / datetime / week / month / daterange / datetimerange / weekrange / monthrange | date | 2.3.0 |
| min-date | 最小日期，为 13 位时间戳 | number | - | 当前日期往前推 6 个月 | 2.3.0 |
| max-date | 最大日期，为 13 位时间戳 | number | - | 当前日期往后推 6 个月 | 2.3.0 |
| first-day-of-week | 周起始天 | number | - | 0 | 2.3.0 |
| formatter | 日期格式化函数 | function | - | - | 2.3.0 |
| max-range | type 为范围选择时有效，最大日期范围 | number | - | - | 2.3.0 |
| range-prompt | type 为范围选择时有效，选择超出最大日期范围时的错误提示文案 | string | - | 选择天数不能超过x天 | 2.3.0 |
| allow-same-day | type 为范围选择时有效，是否允许选择同一天 | boolean | - | false | 2.3.0 |
| default-time | 选中日期所使用的当日内具体时刻 | string / array | - | 00:00:00 | 2.3.0 |
| time-filter | type 为 'datetime' 或 'datetimerange' 时有效，用于过滤时间选择器的数据 | function | - | - | 2.3.0 |
| hide-second | type 为 'datetime' 或 'datetimerange' 时有效，是否不展示秒修改 | boolean | - | false | 2.3.0 |
| show-confirm | 是否显示确定按钮 | boolean | - | true | 2.3.0 |
| show-type-switch | 是否显示类型切换功能 | boolean | - | false | 2.3.0 |
| shortcuts | 快捷选项，为对象数组，其中对象的 `text` 必传 | array | - | - | 2.3.0 |
| title | 弹出层标题 | string | - | 选择日期 | 2.3.0 |
| label | 选择器左侧文案 | string | - | - | 2.3.0 |
| placeholder | 选择器占位符 | string | - | 请选择 | 2.3.0 |
| disabled | 禁用 | boolean | - | fasle | 2.3.0 |
| readonly | 只读 | boolean | - | false | 2.3.0 |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - | 2.3.0 |
| inner-display-format | 自定义范围选择类型的面板内部回显，返回一个字符串 | function | - | - | 2.3.0 |
| size | 设置选择器大小 | string | large | - | 2.3.0 |
| label-width | 设置左侧标题宽度 | string | - | 33% | 2.3.0 |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false | 2.3.0 |
| required | 必填样式 | boolean | - | false | 2.3.0 |
| center | 是否垂直居中 | boolean | - | false | 2.3.0 |
| ellipsis | 是否超出隐藏 | boolean | - | false | 2.3.0 |
| align-right | 选择器的值靠右展示 | boolean | - | false | 2.3.0 |
| before-confirm | 确定前校验函数，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收1个boolean参数 | function | - | - | 2.3.0 |
| use-default-slot | 使用默认插槽时设置该选项 | boolean | - | false | 2.3.0 |
| use-label-slot | 使用 label 插槽时设置该选项 | boolean | - | false | 2.3.0 |
| name | form 表单中的字段名 | string | - | - | 2.3.0 |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | 2.3.0 |
| z-index | 弹窗层级 | number | - | 15 | 2.3.0 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | true | 2.3.0 |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:confirm | 绑定值变化时触发 | event.detail = { value } | 2.3.0 |
| bind:change | 点击面板日期时触发 | event.detail = { value } | 2.3.0 |
| bind:cancel | 点击关闭按钮或者蒙层时触发 ｜ - ｜ 2.3.0 

### Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| open | 打开面板 | - | 2.3.0 |
| close | 关闭面板 | - | 2.3.0 |

### Slots

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 自定义展示 | - |
| label | 左侧插槽 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | 2.3.0 |
| custom-label-class | label 外部自定义样式 | 2.3.0 |
| custom-value-class | value 外部自定义样式 | 2.3.0 |
