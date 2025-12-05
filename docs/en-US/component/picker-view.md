# PickerView

Picker view component, used to select single or multiple values from a set of data.

## Basic Usage

Single column picker, pass a numeric array to `columns` and set `v-model` for binding value. Options can be strings or objects. If an option is an object, by default the option's `label` property is used as the display content for rendering, and the `v-model` gets the value of the option's `value` property. If the option's `value` property doesn't exist, the option's `label` value is used.

```html
<wd-picker-view :columns="columns" v-model="value" @change="onChange" />
```
```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value3 = ref<string>('')
function onChange({picker, value, index}) {
  toast.show(`Current selected: ${value}, Index: ${index}`)
}
```

When `columns` options are objects, their data structure is:

| Parameter | Type | Description | Version |
|-----------|------|-------------|----------|
| value | string / number / boolean | Option value, if value property doesn't exist, label is used as the option's value | - |
| label | string | Option text content | - |
| disabled | boolean | Whether the option is disabled | - |

## Disabled Options

Options can be objects with a `disabled` property set.

```html
<wd-picker-view :columns="columns" v-model="value" disabled />
```
```typescript
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value = ref('Option 3')
```

## Loading

Set the `loading` property.

```html
<wd-picker-view :columns="columns" loading />
```

## Multiple Columns

Set `columns` property as a two-dimensional array, and `value` as an array.

```html
<wd-picker-view :columns="columns" v-model="value" />
```
```typescript
const value = ref(['Central South University', 'Software Engineering'])

const columns = ref([
  ['Sun Yat-sen University', 'Central South University', 'South China University of Technology'],
  ['Computer Science and Technology', 'Software Engineering', 'Communication Engineering', 'Law', 'Economics']
])
```

## Multi-level Linkage

Pass in `column-change` property, which is a function that receives pickerView instance, selected item, current modified column index, and resolve as parameters. Based on the selected item and column index, use the pickerView instance's exposed `setColumnData` method to modify other columns' data sources. When modification is complete, execute `resolve()` to inform the component to continue execution. If `column-change` includes asynchronous operations, it can also make the component execute according to the asynchronous sequence.

```html
<wd-picker-view :columns="columns" v-model="value" :column-change="onChangeDistrict" />
```

```typescript
const district = {
  '0': [{ label: 'Beijing', value: '110000' }, { label: 'Guangdong Province', value: '440000' }],
  '110000': [{ label: 'Beijing', value: '110100' }],
  '440000': [{ label: 'Guangzhou', value: '440100' }, { label: 'Shaoguan', value: '440200' }, { label: 'Shenzhen', value: '440300' }, { label: 'Zhuhai', value: '440400' }, { label: 'Shantou', value: '440500' }],
  '110100': [{ label: 'Dongcheng District', value: '110101' }, { label: 'Xicheng District', value: '110102' }, { label: 'Chaoyang District', value: '110105' }, { label: 'Fengtai District', value: '110106' }, { label: 'Shijingshan District', value: '110107' }],
  '440100': [{ label: 'Liwan District', value: '440103' }, { label: 'Yuexiu District', value: '440104' }, { label: 'Haizhu District', value: '440105'}],
  '440200': [{ label: 'Wujiang District', value: '440203'}],
  '440300': [{ label: 'Luohu District', value: '440303' }, { label: 'Futian District', value: '440304' }],
  '440400': [{ label: 'Xiangzhou District', value: '440402' }, { label: 'Doumen District', value: '440403' }, { label: 'Jinwan District', value: '440404' }],
  '440500': [{ label: 'Longhu District', value: '440507' }, { label: 'Jinping District', value: '440511' }]
}

const value = ref(['110000', '110100', '110102'])
const columns = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])

const onChangeDistrict = (pickerView, value, columnIndex, resolve) => {
  const item = value[columnIndex]
  if (columnIndex === 0) {
    pickerView.setColumnData(1, district[item.value])
    pickerView.setColumnData(2, district[district[item.value][0].value])
  } else if (columnIndex === 1) {
    pickerView.setColumnData(2, district[item.value])
  }
  resolve()
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value, should be array for multiple column picker | string / number / boolean / array | - | - | - |
| columns | Picker data, can be string array or object array, two-dimensional array for multiple column picker | array | - | - | - |
| loading | Loading state | boolean | - | false | - |
| loading-color | Loading color, can only use hexadecimal color values and cannot use abbreviated form | string | - | #4D80F0 | - |
| columns-height | Height of picker's internal cylinder | number | - | 231 | - |
| item-height | Height of picker item | number | - | 35 | 1.13.0 |
| value-key | Key for value in option object | string | - | value | - |
| label-key | Key for display text in option object | string | - | label | - |
| column-change | Function that receives pickerView instance, selected item, current modified column index, resolve as parameters | function | - | - | - |
| immediate-change | Whether to trigger picker-view's change event immediately when finger is released. If not enabled, change event will be triggered after scroll animation ends. Available since version 1.2.25, only supported on WeChat Mini Program and Alipay Mini Program. | boolean | - | false | 1.2.25 |

## Methods

| Method Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| getLabels | Get text of all columns' selected items, returns an array | - | - |
| getColumnIndex | Get selected item index of a column | columnIndex | - |
| getColumnData | Get options of a column | columnIndex | - |
| setColumnData | Set options of a column | columnIndex, values | - |
| resetColumns | Reset column data to specified column data | columns (same type as columns in props) | 1.3.9 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when option value is modified | event = { value, picker, index }, Single column: picker instance, selected value, selected index; Multiple columns: picker instance, all columns' selected values, current column's index | - |
| pickstart | Triggered when scroll selection starts | - | - |
| pickend | Triggered when scroll selection ends | - | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |