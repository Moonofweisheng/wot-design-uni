# Autocomplete

Auto-complete input box that matches based on input content and provides dropdown suggestion options.

## Basic Usage

You can use `v-model` to bind the input value bidirectionally to get input suggestions. The data for the suggestion list is passed through `fetch-suggestions`, which receives an array or function of type [`FetchSuggestions`](#types-section).

```vue
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" clearable></wd-autocomplete>
```

```typescript
const keyword = ref('')
const list = ref([
  {
    value: 'Option 1'
  },
  {
    value: 'Option 2'
  },
  {
    value: 'Option 3'
  }
])
```

## Clear Button

Set the `clearable` attribute.

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" clearable></wd-autocomplete>
```

## Disabled

Set the `disabled` attribute, or individually set the `disabled` property to disable a single option.

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" disabled></wd-autocomplete>
<wd-autocomplete v-model="keyword" :fetch-suggestions="list2"></wd-autocomplete>
```

```typescript
const list2 = ref([
  {
    value: 'Option 1'
  },
  {
    value: 'Option 2',
    disabled: true
  },
  {
    value: 'Option 3'
  }
])
```

## Remote Search

Through the `fetch-suggestions` attribute, you can pass in a function that allows returning a `Promise` (or a regular function).
The parameter of the function is the current input value, and it returns an array containing input suggestions. The type of this array is [`FetchSuggestions`](#types-section).
The default key name of this array structure is `value`. You can pass in a `valueKey` to change this key name.
```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="fetchSuggestions"></wd-autocomplete>
```
```typescript
const list = ref([
  {
    value: 'Option 1'
  },
  {
    value: 'Option 2'
  },
  {
    value: 'Option 3'
  }
])
const keyword = ref('')
// @example [{value:'xxx',...}]
const fetchSuggestions = (): Promise<typeof list.value> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list.value.filter((v) => v.value.includes(keyword.value)))
    }, 200)
  })
}
```

## Custom List Slot
Use the slot `#menuItem` to customize list items.

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list">
  <template #menuItem="{ item }">
    <view class="custom-menu-item">Custom {{ item }}</view>
  </template>
</wd-autocomplete>
```

## List Content Position

Set the position of the suggestion list through the `position` attribute. Optional values are `top` and `bottom`.

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" position="top"></wd-autocomplete>
```

## Keep List Displayed
Display the suggestion list constantly through `always-visible`.
```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" always-visible></wd-autocomplete>
```

## Attributes

| Parameter | Description | Type | Optional Values | Default Value | Minimum Version |
| --- | --- | --- | --- | --- | --- |
| v-model | Binding value | string | - | - | $LOWEST_VERSION$ |
| is-autocomplete | Whether to automatically fill the value back into the input box after clicking the menu | boolean | - | true | $LOWEST_VERSION$ |
| is-exact-match | Whether suggestions match exactly | boolean | - | false | $LOWEST_VERSION$ |
| z-index | Overall z-index value of the component | number / string | - | inherit | $LOWEST_VERSION$ |
| menu-z-index | z-index value of the dropdown list | number / string | - | 3 | $LOWEST_VERSION$ |
| fetch-suggestions | Function to get the dropdown list, can be Promise/regular function, or an array | [`FetchSuggestions`](#types-section) | - | [] | $LOWEST_VERSION$ |
| value-key | Key name of the list display element | string | - | value | $LOWEST_VERSION$ |
| always-visible | Whether the suggestion list is always displayed | boolean | - | false | $LOWEST_VERSION$ |
| position | Menu popup position | string | top / bottom | bottom | $LOWEST_VERSION$ |
| suggestion-max-height | Maximum height of the suggestion list | string / number | - | 300px | $LOWEST_VERSION$ |
| visible-arrow | Whether to show a small triangle between the list and the input box | boolean | - | true | $LOWEST_VERSION$ |
| offset | Offset of the suggestion list | number / string | - | 0 | $LOWEST_VERSION$ |
| fetch-debounce | Debounce time (ms) when executing search | number / string | - | 100 | $LOWEST_VERSION$ |
| match-debounce | Debounce time (ms) for matching after executing search | number / string | - | 200 | $LOWEST_VERSION$ |
| clearable | Show clear button | boolean | - | false | $LOWEST_VERSION$ |
| placeholder | Placeholder text | string | - | Please enter... | $LOWEST_VERSION$ |
| no-border | Whether to hide the underline in non-cell mode | boolean | - | false | $LOWEST_VERSION$ |
| disabled | Disabled | boolean | - | false | $LOWEST_VERSION$ |

## Events

| Event Name | Description | Parameters | Minimum Version |
| --- | --- | --- | --- |
| update:modelValue | Triggered when the binding value changes | value: string | $LOWEST_VERSION$ |
| select | Triggered when a suggestion item is clicked | item: Record<string, any> | $LOWEST_VERSION$ |
| clear | Triggered when the clear button is clicked | - | $LOWEST_VERSION$ |
| input | Triggered when the input box content changes | `{ value: string, cursor: number, keyCode: number }` | $LOWEST_VERSION$ |

## Slots

| Name | Description | Parameters | Minimum Version |
| --- | --- | --- | --- |
| menuItem | Customize suggestion list item content | item: List item data | $LOWEST_VERSION$ |
| menuTop | Customize the top content of the suggestion list | - | $LOWEST_VERSION$ |

## Types {#types-section}
Related type definitions
```typescript
export type AutocompleteData = Array<{
  disabled?: boolean
  [key: string]: any
}>
export type FetchSuggestions = (() => Promise<AutocompleteData> | AutocompleteData) | AutocompleteData
export type WdAutocompleteProps = typeof wdAutocompleteProps
export type WdAutocompleteEmits = typeof wdAutocompleteEmit
export interface WdAutocompleteContext {
  /** Initialize. If the list height is abnormal, you can execute this */
  handleInit: () => void
  /** Execute matching function */
  handleFetch: () => Promise<void>
}

// example
import type {AutocompleteData} from '@/uni_modules/wot-design-uni/components/wd-autocomplete/types'

const list = ref<AutocompleteData>([])

```

## External Style Classes

| Class Name | Description | Minimum Version |
| --- | --- | --- |
| custom-class | Root node style | $LOWEST_VERSION$ |
| custom-arrow-class | Triangle arrow style | $LOWEST_VERSION$ |
| custom-suggestions-class | Suggestion list style | $LOWEST_VERSION$ |
```