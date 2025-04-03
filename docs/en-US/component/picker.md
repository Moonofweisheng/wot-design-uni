# Picker

The Picker component is a combination of popup and pickerView.

## Basic Usage

Set the data source of options through `columns`. Options can be strings or objects. If it's an object, the `label` property is used by default to render the option content. `label` sets the left text content, and `v-model` sets the value of the selected item. The label can be omitted. You can set the title width through `label-width`, which defaults to '33%'. Listen to the `confirm` event to get the selected value, which passes an event object `event = { value, selectedItems }`, where value is the bound value and selectedItems is the object of selected options.

```html
<wd-picker :columns="columns" label="Single Column" v-model="value" @confirm="handleConfirm" />
```

```typescript
const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value = ref('Option 1')

function handleConfirm({ value }) {
  value.value = value
}
```

When the `columns` option is an object, its data structure is:

| Parameter | Type | Description | Min Version |
|-----------|------|-------------|-------------|
| value | string / number / boolean | Option value. If the value property doesn't exist, the label is used as the option value | - |
| label | string | Option text content | - |
| disabled | boolean | Whether the option is disabled | - |

## Disabled

Set the `disabled` property.

```html
<wd-picker :columns="columns" label="Disabled" v-model="value" disabled />
```

```typescript
const value = ref('Option 3')

const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
```

## Read-only

Set the `readonly` property.

```html
<wd-picker :columns="columns" label="Read-only" v-model="value" readonly />
```

## Clear Button

Set the `clearable` property.

```html
<wd-picker :columns="columns" label="Clear" v-model="value" clearable />
```

## Title Text

Set the `title` property.

```html
<wd-picker label="Title" :columns="columns" title="Title Text"/>
```

## Loading

Set the `loading` property.

```html
<wd-picker-view :columns="columns" loading />
```

## Multiple Columns

Set the `columns` property as a two-dimensional array, and `value` as an array.

```html
<wd-picker :columns="columns" label="Multiple Columns" v-model="value" />
```

```typescript
const value = ref(['Central South University', 'Software Engineering'])

const columns = ref([
  ['Sun Yat-sen University', 'Central South University', 'South China University of Technology'],
  ['Computer Science and Technology', 'Software Engineering', 'Communication Engineering', 'Law', 'Economics']
])
```

## Multi-level Linkage

Pass in the `column-change` property, which is of type `function`. It receives the pickerView instance, selected item, current column index, and resolve as parameters. Based on the selected item and column index, use the `setColumnData` method exposed by the pickerView instance to modify the data source of other columns. After modification is complete, execute `resolve()` to notify the component that the modification is complete to continue execution. If `column-change` includes asynchronous operations, the component can also execute according to the asynchronous sequence.

> You need to call resolve() to notify the component after each modification.

```html
<wd-picker
  :columns="columns"
  label="Multi-level Linkage"
  v-model="value"
  :column-change="onChangeDistrict"
  :display-format="displayFormat"
 />
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

const displayFormat = (items) => {
  return items
    .map((item) => {
      return item.label
    })
    .join('-')
}
```

## Picker Size

Modify the picker size by setting `size`. When `size` is set to 'large', the font size is 16px.

```html
<wd-picker label="Single Column" size="large" v-model="value" :columns="columns" />
```

## Required Field

Set the `required` property to display the required style.

```html
<wd-picker label="Required Field" error :columns="columns" v-model="value" required/>
```

## Error State

Set the `error` property to display the picker value in red.

```html
<wd-picker label="Single Column" error :columns="columns" v-model="value"/>
```

## Right-aligned Value

Set the `align-right` property to display the picker value aligned to the right.

```html
<wd-picker label="Single Column" align-right :columns="columns" v-model="value"/>
```

## Validation Before Confirmation

Set the `before-confirm` function, which will be executed when the user clicks the 'confirm' button. It receives `value`, `resolve`, and `picker` parameters. You can validate the `value` and use the `resolve` function to notify the component whether the confirmation is approved. `resolve` accepts a boolean value, where `resolve(true)` means the option is approved, and `resolve(false)` means it's not approved. When not approved, the picker popup won't close. You can directly set properties like `loading` and `columns` through the `picker` parameter.

```html
<wd-toast />

<wd-picker label="before-confirm" :columns="columns" v-model="value" :before-confirm="beforeConfirm" @confirm="handleConfirm" />
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const beforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if (['Option 2', 'Option 3'].indexOf(value) > -1) {
      resolve(false)
      toast.show('Option 2 and Option 3 are not allowed to be selected')
    } else {
      resolve(true)
    }
  }, 2000)
}
```