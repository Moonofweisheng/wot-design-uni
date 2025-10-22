# Autocomplete 自动完成

自动完成输入框，根据输入内容进行匹配，并提供下拉提示选项。

## 基本用法

可以通过 `v-model` 双向绑定输入框的值，来获取输入建议。建议列表的数据通过`fetchSuggestions`传入，`fetchSuggestions`接收一个类型为[`FetchSuggestions`](#types-section)的数组或函数。

```vue
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" clearable></wd-autocomplete>
```

```typescript
const keyword = ref('')
const list = ref([
  {
    value: '选项1'
  },
  {
    value: '选项2'
  },
  {
    value: '选项3'
  }
])
```

## 清空按钮

设置 `clearable` 属性。

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" clearable></wd-autocomplete>
```

## 禁用

设置 `disabled` 属性。

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" disabled></wd-autocomplete>
```

## 远程搜索

通过 `fetch-suggestions` 属性可以传入一个函数，该函数允许返回一个`Promise`（也可以是普通函数）。
函数的参数为当前输入的值，函数返回一个包含输入建议的数组，数组的类型为[`FetchSuggestions`](#types-section)。
该数组结构的键名默认为`value`，允许传入一个`valueKey`来更改该键名。
```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="fetchSuggestions"></wd-autocomplete>
```
```typescript
const list = ref([
  {
    value: '选项1'
  },
  {
    value: '选项2'
  },
  {
    value: '选项3'
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

## 列表插槽自定义
通过使用插槽`#menuItem`来自定义列表项。

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list">
  <template #menuItem="{ item }">
    <view class="custom-menu-item">自定义{{ item }}</view>
  </template>
</wd-autocomplete>
```

## 列表内容位置

通过 `position` 属性设置建议列表的位置，可选值为 `top` `bottom`。

```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" position="top"></wd-autocomplete>
```

## 列表保持显示
通过 `always-visible` 显示建议列表。
```html
<wd-autocomplete v-model="keyword" :fetch-suggestions="list" always-visible></wd-autocomplete>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
| --- | --- | --- | --- | --- | --- |
| v-model | 绑定值 | string | - | - | $LOWEST_VERSION$ |
| is-autocomplete | 在点击菜单后，是否自动将值回填进输入框 | boolean | - | true | $LOWEST_VERSION$ |
| is-exact-match | 建议是否完全匹配 | boolean | - | false | $LOWEST_VERSION$ |
| z-index | 组件的整体z-index值 | number / string | - | inherit | $LOWEST_VERSION$ |
| menu-z-index | 下拉列表的z-index值 | number / string | - | 3 | $LOWEST_VERSION$ |
| fetch-suggestions | 获取下拉列表的函数，可以是Promise/普通函数，也可以是数组 | [`FetchSuggestions`](#types-section) | - | [] | $LOWEST_VERSION$ |
| value-key | 列表展示元素的键名 | string | - | value | $LOWEST_VERSION$ |
| always-visible | 建议列表是否常驻显示 | boolean | - | false | $LOWEST_VERSION$ |
| position | 菜单弹出位置 | string | top / bottom | bottom | $LOWEST_VERSION$ |
| suggestion-max-height | 建议列表最大高度 | string / number | - | 300px | $LOWEST_VERSION$ |
| visible-arrow | 列表与输入框之间是否显示小三角 | boolean | - | true | $LOWEST_VERSION$ |
| offset | 建议列表的偏移量 | number / string | - | 0 | $LOWEST_VERSION$ |
| fetch-debounce | 执行搜索时的防抖时间(ms) | number / string | - | 100 | $LOWEST_VERSION$ |
| match-debounce | 执行搜索后，进行匹配的防抖时间(ms) | number / string | - | 200 | $LOWEST_VERSION$ |
| clearable | 显示清空按钮 | boolean | - | false | $LOWEST_VERSION$ |
| placeholder | 占位文本 | string | - | 请输入... | $LOWEST_VERSION$ |
| no-border | 非 cell 类型下是否隐藏下划线 | boolean | - | false | $LOWEST_VERSION$ |
| disabled | 禁用 | boolean | - | false | $LOWEST_VERSION$ |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
| --- | --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | value: string | $LOWEST_VERSION$ |
| select | 点击选中建议项时触发 | item: Record<string, any> | $LOWEST_VERSION$ |
| clear | 清空按钮点击时触发 | - | $LOWEST_VERSION$ |
| input | 输入框内容变化时触发 | `{ value: string, cursor: number, keyCode: number }` | $LOWEST_VERSION$ |

## Slots

| name | 说明 | 参数 | 最低版本 |
| --- | --- | --- | --- |
| menuItem | 自定义建议列表项内容 | item: 列表项数据 | $LOWEST_VERSION$ |
| menuTop | 自定义建议列表顶部内容 | - | $LOWEST_VERSION$ |

## Types {#types-section}
相关类型数据
```typescript
export type AutocompleteData = Array<{
  disabled?: boolean
  [key: string]: any
}>
export type FetchSuggestions = (() => Promise<AutocompleteData> | AutocompleteData) | AutocompleteData
export type WdAutocompleteProps = typeof wdAutocompleteProps
export type WdAutocompleteEmits = typeof wdAutocompleteEmit
export interface WdAutocompleteContext {
  /** 初始化，如果列表的高度异常可以执行这个 */
  handleInit: () => void
  /** 执行匹配函数 */
  handleFetch: () => Promise<void>
}

// example
import type {AutocompleteData} from '@/uni_modules/wot-design-uni/components/wd-autocomplete/types'

const list = ref<AutocompleteData>([])

```

## 外部样式类

| 类名 | 说明 | 最低版本 |
| --- | --- | --- |
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
| custom-arrow-class | 三角箭头样式 | $LOWEST_VERSION$ |
| custom-suggestions-class | 建议列表样式 | $LOWEST_VERSION$ |
