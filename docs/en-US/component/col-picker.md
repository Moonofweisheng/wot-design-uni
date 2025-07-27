# ColPicker

Use multi-column picker for cascading selection, providing better interaction experience. The multi-column picker supports unlimited level selection.

::: tip Note
Multi-column picker is commonly used for selecting provinces, cities, and districts. We use Vant's China province, city, and district data as the data source. You can install the [@vant/area-data](https://github.com/youzan/vant/tree/main/packages/vant-area-data) npm package to import it:

```bash
# via npm
npm i @vant/area-data

# via yarn
yarn add @vant/area-data

# via pnpm
pnpm add @vant/area-data

# via Bun
bun add @vant/area-data
```

:::

**_To facilitate developers using `@vant/area-data` for development and debugging, we have encapsulated `useColPickerData`. You can directly use `useColPickerData` to get the data source._**
::: details `useColPickerData` wrapper based on @vant/area-data

```typescript
// You can place this code in src/hooks/useColPickerData.ts in your project
import { useCascaderAreaData } from '@vant/area-data'

export type CascaderOption = {
  text: string
  value: string
  children?: CascaderOption[]
}

/**
 * Use '@vant/area-data' as data source to construct ColPicker component data
 * @returns
 */
export function useColPickerData() {
  // '@vant/area-data' data source
  const colPickerData: CascaderOption[] = useCascaderAreaData()

  // Find child nodes by code, return all nodes if no code provided
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
    if (!code) {
      return data
    }
    for (const item of data) {
      if (item.value === code) {
        return item.children || null
      }
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }
    return null
  }

  return { colPickerData, findChildrenByCode }
}
```

:::

## Basic Usage

`label` sets the left text content;

`columns` sets the data source, which is a two-dimensional array. Each column is a one-dimensional array, and each option includes `value` (option value) and `label` (option name).

`v-model` sets the selected value, which is an array;

You can also listen to the `change` event to get the selected value. The `event` is an object containing two properties: `value` (selected value array) and `selectedItems` (selected item object array).

Pass in the `column-change` property, which is of type `function` and receives an options object parameter. The structure of options is as follows:

| Parameter | Type | Description | Version |
| --------- | ---- | ----------- | ------- |
| selectedItem | object | Currently selected item in the column, data structure is consistent with the options in columns | - |
| index | number | Current column index | - |
| rowIndex | number | Current column selected item index | - |
| resolve | function | Receives the option array for the next column | - |
| finish | function | End picker selection, if cannot close normally like data fetch failure, execute `finish(false)` | - |

```html
<wd-col-picker label="Select Address" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value | array | - | - | - |
| columns | Picker data, 2D array | array | - | - | - |
| value-key | Key for the `value` property in option objects | string | - | value | - |
| label-key | Key for the `label` property in option objects | string | - | label | - |
| tip-key | Key for the `tip` property in option objects | string | - | tip | - |
| title | Popup title | string | - | - | - |
| label | Left-side text label | string | - | - | - |
| placeholder | Placeholder text | string | - | Select | - |
| disabled | Disabled state | boolean | - | false | - |
| readonly | Readonly state | boolean | - | false | - |
| display-format | Custom display text formatting function (returns a string) | function | - | - | - |
| column-change | Function to handle column changes, receives current column's selected item, column index, selected item index, next column data handler resolve, and finish selection function | function | - | - | - |
| size | Picker size | string | large | - | - |
| label-width | Left-side label width | string | - | 33% | - |
| error | Error state (displays value in red) | boolean | - | false | - |
| required | Whether to display the required asterisk | boolean | - | false | - |
| marker-side | Position of the required marker | string | before / after | after | $LOWEST_VERSION$ |
| align-right | Right-align the picker value | boolean | - | false | - |
| before-confirm | Validation function before confirming, receives (value, resolve) parameters, continue execution through resolve, resolve accepts 1 boolean parameter | function | - | - | - |
| loading-color | Loading icon color | string | - | #4D80F0 | - |
| use-default-slot | Set this option when using default slot | boolean | - | false | - |
| use-label-slot | Set this option when using label slot | boolean | - | false | - |
| close-on-click-modal | Whether to close when clicking modal | boolean | - | true | - |
| auto-complete | Automatically trigger column-change event to complete data, triggers column-change when columns is empty array or columns array length is less than value array length | boolean | - | false | - |
| z-index | Popup z-index | number | - | 15 | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation for popup panel (iPhone X type models) | boolean | - | true | - |
| ellipsis | Whether to hide overflow | boolean | - | false | - |
| prop | Form field `model` property name, required when using form validation | string | - | - | - |
| rules | Form validation rules, used with `wd-form` component | `FormItemRule []` | - | `[]` | - |
| lineWidth | Bottom line width in pixels | number | - | - | 1.3.7 |
| lineHeight | Bottom line height in pixels | number | - | - | 1.3.7 |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | false | 1.11.0 |

### FormItemRule Data Structure

| Key | Description | Type |
|-----|-------------|------|
| required | Whether it's a required field | `boolean` |
| message | Error message | `string` |
| validator | Validation through function, can return a `Promise` for async validation | `(value, rule) => boolean \| Promise` |
| pattern | Validation through regular expression, regex mismatch indicates validation failure | `RegExp` |

## Option Data Structure

| Key | Description | Type | Required | Version |
|-----|-------------|------|----------|----------|
| value | Option value | string | Yes | - |
| label | Option name | string | Yes | - |
| tip | Option tip | string | No | - |
| disabled | Disable option | boolean | No | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| confirm | Triggered when the last column option is selected | `{ value(option value array), selectedItems(option array) }` | - |
| close | Triggered when close button or overlay is clicked | - | - |

## Methods

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| open | Open picker popup | - | - |
| close | Close picker popup | - | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| default | Custom display | - |
| label | Left slot | - |

## External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-label-class | Label external custom style | - |
| custom-value-class | Value external custom style | - |typescript
// useColPickerData can be referenced from the introduction at the top of this section
// Adjust the import path according to your actual situation, don't just copy and paste
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

function handleConfirm({ value }) {
  console.log(value)
}
```

## Asynchronous Loading

Generally, column-change is an asynchronous data fetching operation. When column-change is triggered, the component will have a default loading state, which is closed after the data responds.

If the asynchronous data request fails, call `finish(false)`.

```html
<wd-col-picker label="Select Address" v-model="value" :columns="area" :column-change="columnChange" @confirm="handleConfirm"></wd-col-picker>
```

```typescript
// useColPickerData can be referenced from the introduction at the top of this section
// Adjust the import path according to your actual situation, don't just copy and paste
import { useColPickerData } from '@/hooks/useColPickerData'
const { colPickerData, findChildrenByCode } = useColPickerData()

const value = ref<string[]>([])
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  // Simulate asynchronous request
  setTimeout(() => {
    // Simulate request failure
    if (Math.random() > 0.7) {
      finish(false)
      toast.error.error('Data request failed, please try again')
      return
    }
    // Why use selectedItem.value as code? Because when constructing area, we put the identifier in the value field, similarly you can change it to other fields as long as they correspond to area's fields
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text
          }
        })
      )
    } else {
      // When there are no more items, complete the operation
      finish()
    }
  }, 300)
}

function handleConfirm({ value }) {
  console.log(value)
}
```

## Initial Options

There are two ways to set initial options:

1) When setting initial options, the length of the `columns` array should match the length of the `value` array, and each value in `value` must be found in `columns`.

```html
<wd-col-picker label="Select Address" v-model="value" :columns="area" :column-change="columnChange"></wd-col-picker>
```