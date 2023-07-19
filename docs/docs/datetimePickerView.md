## DatetimePickerView 日期时间选择器视图

### 引入

```json
{
  "usingComponents": {
    "wd-datetime-picker-view": "/wot-design/datetimePickerView/index"
  }
}
```

### 基本用法

`value` 设置绑定值，默认为 'datetime' 类型，展示年月日时分，绑定值为 `时间戳` 类型，如果为 'time' 类型，绑定值为字符串。

```html
<wd-datetime-picker-view value="{{value}}" label="日期选择" bind:change="handleChange" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### date 类型

'date' 类型只展示年月日。

```html
<wd-datetime-picker-view type="date" value="{{value}}" label="年月日" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```
### year-month 类型

'year-month' 类型只展示年月。

```html
<wd-datetime-picker-view type="year-month" value="{{value}}" label="年月" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```

### time 类型

'time' 类型只展示时分。

```html
<wd-datetime-picker-view type="time" value="{{value}}" label="时分" />
```
```javascript
Page({
  data: {
    value: Date.now(),
  }
})
```

### 修改内部格式

> 自定义函数必须写在data中

给 `formatter` 属性传入一个函数，接收 `type` 和 `value` 值，返回展示的文本内容。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`value` 为 `number` 类型。
使用自定义`formatter`会关闭内置的默认`display-format`函数。

```html
<wd-datetime-picker-view value="{{value}}" label="内部格式" formatter="{{formatter}}" />
```

```javascript
Page({
  data: {
    value: Date.now(),
    formatter (type, value) {
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
  }
})
```

### 过滤选项

给 `filter` 属性传入一个函数，接收 `type` 和 `values` 值，返回列的选项列表。`type` 有 `year`、`month`、`date`、`hour`、`minute` 类型，`values` 为 number数组。
> 自定义函数必须写在data中
```html
<wd-datetime-picker-view value="{{value}}" label="过滤选项" filter="{{filter}}" />
```
```javascript
Page({
  data: {
    value: Date.now(),
    filter (type, values) {
      if (type === 'minute') {
        return values.filter(value => value % 5 === 0)
      }
      return values
    }
  }
})
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value | 选中项，当 type 为 time 时，类型为字符串，否则为 Date | string / date | - | - |
| type | 选择器类型 | string | date / year-month / time | datetime | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | string | - | #4D80F0 | - |
| columns-height | picker内部滚筒高 | number | - | 231 | - |
| formatter | 自定义弹出层选项文案的格式化函数，返回一个字符串 | function | - | - | - |
| filter | 自定义过滤选项的函数，返回列的选项数组 | function | - | - | - |
| minDate | 最小日期 | date | - | 当前日期 - 10年 | - |
| maxDate | 最大日期 | date | - | 当前日志 + 10年 | - |
| minHour | 最小小时，time类型时生效 | number | - | 0 | - |
| maxHour | 最大小时，time类型时生效 | number | - | 23 | - |
| minMinute | 最小分钟，time类型时生效 | number | - | 0 | - |
| maxMinute | 最大分钟，time类型时生效 | number | - | 59 | - |
### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| bind:change | 切换选项时触发 | 选中的值 event.detail = { value }，value 为当前选中日期的时间戳，'time' 类型则为字符串 | - |
| bind:pickstart | 当滚动选择开始时候触发事件 | - | - | 2.3.0 |
| bind:pickend | 当滚动选择结束时候触发事件 | - | - | 2.3.0 |
