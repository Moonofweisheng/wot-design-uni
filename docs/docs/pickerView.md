## PickerView 选择器视图

### 引入

```json
{
  "usingComponents": {
    "wd-picker-view": "/wot-design/pickerView/index"
  }
}
```
### 基本用法

单列选择器，给 `columns` 传入一个数值数组，设置 `value` 绑定值。选项可以为字符串，也可以为对象，如果为对象则默认取 `label` 属性为选项内容进行渲染，`value` 获取的值为 `value` 属性的值，如果 `value` 属性不存在，则取 `label` 的值。

```html
<wd-picker-view columns="{{columns}}" value="{{value}}" bind:change="onChange" />
```
```javascript
Page({
  data: {
    columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
    value: ''
  },
  onChange (picker, value, index) {
    Toast(`当前选中项: ${value}, 下标: ${index}`)
  }
})
```

当 `columns` 选项为对象时，其数据结构为：

| 参数 | 类型 | 说明 | 最低版本 |
|-----|-----|------|---------|
| value | string / number / boolean | 选项值，如果 value 属性不存在，则使用 label 作为选项的值 | - |
| label | string | 选项文本内容 | - |
| disabled | boolean | 选项是否禁用 | - |

### 禁用选项

选项可以为对象，设置 `disabled` 属性。

```html
<wd-picker-view columns="{{columns}}" value="{{value}}" disabled />
```
```javascript
Page({
  data: {
    columns: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],
    value: '选项3'
  }
})
```

### 加载中

设置 `loading` 属性。

```html
<wd-picker-view columns="{{columns}}" loading />
```
### 多列

`columns` 属性设置为二维数组，`value` 为数组。

```html
<wd-picker-view columns="{{columns}}" value="{{value}}" />
```
```javascript
Page({
  data: {
   value: ['中南大学', '软件工程'],
   columns: [
     ['中山大学', '中南大学', '华南理工大学'],
     ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
   ],
  }
})
```

### 多级联动

传入 `column-change` 属性，其类型为 `function`，接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源，当修改完成后需要执行 `resolve()` 告知组件修改完成以继续执行，如果 `column-change` 包含异步操作，也可以使组件按照异步顺序进行执行。

> resolve 参数为 1.4.0 添加，每次修改完后都需要调用 resolve() 通知组件。

```html
<wd-picker-view columns="{{columns}}" value="{{value}}" column-change="{{onChangeDistrict}}" />
```

```javascript
const district = {
  '0': [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  '110000': [{ label: '北京', value: '110100' }],
  '440000': [{ label: '广州市', value: '440100' }, { label: '韶关市', value: '440200' }, { label: '深圳市', value: '440300' }, { label: '珠海市', value: '440400' }, { label: '汕头市', value: '440500' }],
  '110100': [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }, { label: '朝阳区', value: '110105' }, { label: '丰台区', value: '110106' }, { label: '石景山区', value: '110107' }],
  '440100': [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }, { label: '海珠区', value: '440105'}],
  '440200': [{ label: '武江区', value: '440203'}],
  '440300': [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }],
  '440400': [{ label: '香洲区', value: '440402' }, { label: '斗门区', value: '440403' }, { label: '金湾区', value: '440404' }],
  '440500': [{ label: '龙湖区', value: '440507' }, { label: '金平区', value: '440511' }]
}
Page({
  data: {
    value: ['110000', '110100', '110102'],
    columns: [
      district[0],
      district[district[0][0].value],
      district[district[district[0][0].value][0].value]
    ],

    onChangeDistrict (pickerView, value, columnIndex, resolve) {
      const item = value[columnIndex]
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
      } else if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
      resolve()
    }
  }
})
```


### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value | 选中项，如果为多列选择器，则其类型应为数组 | string / number / boolean / array | - | - | - |
| columns | 选择器数据，可以为字符串数组，也可以为对象数组，如果为二维数组，则为多列选择器 | array | - | - | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | string | - | #4D80F0 | - |
| columns-height | picker内部滚筒高 | number | - | 231 | - |
| value-key | 选项对象中，value对应的 key | string | - | value | - |
| label-key | 选项对象中，展示的文本对应的 key | string | - | label | - |
| column-change | 接收 pickerView 实例、选中项、当前修改列的下标、resolve 作为入参，根据选中项和列下标进行判断，通过 pickerView 实例暴露出来的 `setColumnData` 方法修改其他列的数据源。 | function | - | - | - |
| name | form 表单中的字段名 | string | - | - | - |

### Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| getLabels | 获取所有列选中项的文本，返回值为一个数组 | - |
| getColumnIndex | 获取某一列的选中项下标 | columnIndex | - |
| getColumnData | 获取某一列的选项 | columnIndex | - |
| setColumnData | 设置某一列的选项 | columnIndex, values | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|------|--------|
| bind:change | 选项值修改时触发 | event.detail = { value, picker, index }, 单列: picker实例, 选中项值, 选中项下标; 多列: picker实例, 所有列选中项值, 当前列的下标 | - |
| bind:pickstart | 当滚动选择开始时候触发事件 | - | - |
| bind:pickend | 当滚动选择结束时候触发事件 | - | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
