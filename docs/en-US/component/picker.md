# Picker Selector

The Picker component is a combination of popup and pickerView.

## Basic Usage

Set the `columns` property to configure the option data source. Options can be strings or objects. If they are objects, the `label` property is used by default for rendering the option content. The `label` property sets the left-side text content, and `v-model` sets the selected value. The `label` can be omitted. The title width can be set via `label-width`, which defaults to '33%'. Listen to the `confirm` event to get the selected value, which returns an event object: `event = { value, selectedItems }`. `value` is the bound value, and `selectedItems` is the selected option object(s).

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

When `columns` options are objects, their data structure is as follows:

| Parameter | Type                      | Description                                                                 | Minimum Version |
| --------- | ------------------------- | --------------------------------------------------------------------------- | --------------- |
| value     | string / number / boolean | Option value. If the `value` property is missing, `label` is used as the value. | -               |
| label     | string                    | Option text content                                                        | -               |
| disabled  | boolean                   | Whether the option is disabled                                              | -               |

## Disabled

Set the `disabled` property.

```html
<wd-picker :columns="columns" label="Disabled" v-model="value" disabled />
```

```typescript
const value = ref('Option 3')

const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
```

## Readonly

Set the `readonly` property.

```html
<wd-picker :columns="columns" label="Readonly" v-model="value" readonly />
```

## Clear Button

Set the `clearable` property.

```html
<wd-picker :columns="columns" label="Clear" v-model="value" clearable />
```

## Title

Set the `title` property.

```html
<wd-picker label="Title" :columns="columns" title="Picker Title"/>
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
  ['Computer Science', 'Software Engineering', 'Communication Engineering', 'Law', 'Economics']
])
```

## Cascading

Pass the `column-change` property, which is a `function` that receives the pickerView instance, selected item, current column index, and `resolve` as parameters. Based on the selected item and column index, modify the data source of other columns using the `setColumnData` method exposed by the pickerView instance. After modification, call `resolve()` to notify the component that the modification is complete. If `column-change` contains asynchronous operations, the component will execute them in order.

> `resolve()` must be called after each modification.

```html
<wd-picker
  :columns="columns"
  label="Cascading"
  v-model="value"
  :column-change="onChangeDistrict"
  :display-format="displayFormat"
 />
```

```typescript
const district = {
  '0': [{ label: 'Beijing', value: '110000' }, { label: 'Guangdong', value: '440000' }],
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

Modify the picker size by setting `size`. When `size` is set to 'large', the font size becomes 16px.

```html
<wd-picker label="Single Column" size="large" v-model="value" :columns="columns" />
```

## Required

Set the `required` property to display the required style.

```html
<wd-picker label="Required" error :columns="columns" v-model="value" required/>
```

## Error State

Set the `error` property to display the picker value in red.

```html
<wd-picker label="Single Column" error :columns="columns" v-model="value"/>
```

## Right-Aligned Value

Set the `align-right` property to right-align the picker value.

```html
<wd-picker label="Single Column" align-right :columns="columns" v-model="value"/>
```

## Pre-Confirmation Validation

Set the `before-confirm` function. When the user clicks the "Confirm" button, the `before-confirm` function is executed, receiving `value`, `resolve`, and `picker` parameters. You can validate `value` and notify the component whether the validation passes via `resolve`. `resolve` accepts a boolean value: `resolve(true)` indicates validation passes, while `resolve(false)` indicates validation fails (the picker popup will not close). Properties like `loading` and `columns` can be directly set via the `picker` parameter.

```html
<wd-toast />

<wd-picker label="Before Confirm" :columns="columns" v-model="value" :before-confirm="beforeConfirm" @confirm="handleConfirm" />
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
      toast.error('Validation failed. Please reselect.')
    } else {
      resolve(true)
    }
  }, 2000)
}

const columns = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'])
const value = ref('')

const beforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if (['Option 2', 'Option 3'].indexOf(value) > -1) {
      resolve(false)
      toast.error('Validation failed. Please reselect.')
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ value }) {
  value.value = value
}
```

## Trigger Slot

Enable `use-default-slot` and use the default slot to customize the picker trigger component.

```html
<wd-picker :columns="columns" v-model="value" use-default-slot>
  <wd-button>Slot Trigger</wd-button>
</wd-picker>
```

## Attributes

| Parameter | Description | Type | Options | Default | Minimum Version |
|-----------|-------------|------|---------|---------|-----------------|
| v-model | Selected value. For multi-column pickers, this should be an array. | string/number/boolean/array | - | - | - |
| columns | Picker data. Can be an array of strings or objects. If a 2D array, it becomes a multi-column picker. | array | - | - | - |
| loading | Loading state | boolean | - | false | - |
| loading-color | Loading color (hexadecimal format, no shorthand). | string | - | #4D80F0 | - |
| columns-height | Internal picker roller height | number | - | 231 | - |
| value-key | Key for the `value` property in option objects | string | - | value | - |
| label-key | Key for the `label` property in option objects | string | - | label | - |
| title | Popup title | string | - | - | - |
| cancel-button-text | Cancel button text | string | - | Cancel | - |
| confirm-button-text | Confirm button text | string | - | Confirm | - |
| label | Left-side text label | string | - | - | - |
| placeholder | Placeholder text | string | - | Select | - |
| disabled | Disabled state | boolean | - | false | - |
| readonly | Readonly state | boolean | - | false | - |
| display-format | Custom display text formatting function (returns a string) | function | - | - | - |
| column-change | Function to handle column changes (receives pickerView instance, selected item, column index, and resolve) | function | - | - | - |
| size | Picker size | string | large | - | - |
| label-width | Left-side label width | string | - | 33% | - |
| error | Error state (displays value in red) | boolean | - | false | - |
| required | Required field style | boolean | - | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | - | 'before' | $LOWEST_VERSION$ |
| align-right | Right-align the picker value | boolean | - | false | - |
| use-label-slot | Use label slot | boolean | - | false | - |
| use-default-slot | Use default slot | boolean | - | false | - |
| before-confirm | Pre-confirmation validation function (receives value, resolve, picker) | function | - | - | - |
| close-on-click-modal | Close popup when clicking the mask | boolean | - | true | - |
| z-index | Popup z-index | number | - | 15 | - |
| safe-area-inset-bottom | Enable bottom safe area for iPhone X-type devices | boolean | - | true | - |
| ellipsis | Enable text overflow ellipsis | boolean | - | false | - |
| prop | Form model field name (required for form validation) | string | - | - | - |
| rules | Form validation rules (used with `wd-form`) | `FormItemRule []` | - | `[]` | - |
| immediate-change | Trigger picker-view change event immediately on touch release (supported in WeChat Mini Program and Alipay Mini Program from v1.2.25) | boolean | - | false | 1.2.25 |
| clearable | Show clear button | boolean | - | false | 1.11.0 |
| root-portal | Detach from page to resolve fixed positioning issues | boolean | - | false | 1.11.0 |

### FormItemRule Structure

| Key       | Description                                                                 | Type                                  |
| --------- | --------------------------------------------------------------------------- | ------------------------------------- |
| required  | Whether the field is required                                               | `boolean`                             |
| message   | Error message text                                                          | `string`                              |
| validator | Custom validation function (can return a `Promise` for async validation)   | `(value, rule) => boolean \| Promise` |
| pattern   | Validate using a regular expression (fails if no match)                     | `RegExp`                              |

## Events

| Event Name | Description                  | Parameters                                                                                               | Minimum Version |
| ---------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- | --------------- |
| confirm    | Triggered on confirm button click | { value, selectedItems }, where `value` is the selected value (array for multi-column), and `selectedItems` is the selected option(s) | -               |
| cancel     | Triggered on cancel button click | -                                                                                                        | -               |
| open       | Triggered when picker popup opens | -                                                                                                        | -               |
| clear      | Triggered on clear button click | -                                                                                                        | 1.11.0 |

## Methods

| Method Name | Description          | Parameters | Minimum Version |
| ----------- | -------------------- | ---------- | --------------- |
| open        | Open picker popup    | -          | -               |
| close       | Close picker popup   | -          | -               |

## Slots

| Name    | Description          | Minimum Version |
| ------- | -------------------- | --------------- |
| default | Default slot content | -               |
| label   | Left-side label slot | -               |

## External Classes

| Class Name          | Description                     | Minimum Version |
| ------------------- | ------------------------------- | --------------- |
| custom-class       | Root node styles                | -               |
| custom-view-class  | Custom styles for pickerView    | -               |
| custom-label-class | Custom styles for label         | -               |
| custom-value-class | Custom styles for value         | -               |