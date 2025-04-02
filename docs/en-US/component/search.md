# Search

Search box component, supports input box focus, blur, input, search, cancel, and clear events.

## Basic Usage

`v-model` sets the input box binding value, `focus` binds the focus event, `change` binds the input event, `blur` binds the blur event, `search` binds the search event, `cancel` binds the cancel event, and `clear` binds the clear event.

```html
<wd-search v-model="value" @focus="focus" @blur="blur" @search="search" @clear="clear" @cancel="cancel" @change="change" maxlength="10" />
```

```typescript
const value = ref<string>('')

function focus() {
  console.log('Focus')
}
function blur() {
  console.log('Blur')
}
function search() {
  console.log('Search')
}
function clear() {
  console.log('Reset')
}
function cancel() {
  console.log('Cancel')
}
function change({ value }) {
  console.log('Input', value)
}
```

## Light Theme

Set the `light` property to reverse the component background color and input box background color.

```html
<wd-search light />
```

## Left-aligned Input Box Placeholder

Set the `placeholder-left` property.

```html
<wd-search placeholder-left />
```

## Hide Cancel Button

Set the `hide-cancel` property.

```html
<wd-search hide-cancel />
```

## Disabled

Set the `disabled` property.

```html
<wd-search disabled />
```

It can be used in combination with `hide-cancel` to only display the search box on the current page. When clicking the search box, the page route will switch to the search page, where the search function can be used.

```html
<wd-search hide-cancel disabled />
```

## Custom Left Slot

Customize the content on the left side of the search box using the `prefix` slot.

```html
<wd-search v-model="value">
  <template #prefix>
    <wd-popover mode="menu" :content="menu" @menuclick="changeSearchType">
      <view class="search-type">
        <text>{{ searchType }}</text>
        <wd-icon custom-class="icon-arrow" name="fill-arrow-down"></wd-icon>
      </view>
    </wd-popover>
  </template>
</wd-search>
```

```typescript
const searchType = ref<string>('All')
const value = ref<string>('')
const menu = ref([
  {
    content: 'All'
  },
  {
    content: 'Order Number'
  },
  {
    content: 'Refund Number'
  }
])

function changeSearchType({ item, index }) {
  searchType.value = item.content
}
```

```scss
.search-type {
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 8px 0 16px;
}
.search-type::after {
  position: absolute;
  content: '';
  width: 1px;
  right: 0;
  top: 5px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.25);
}
.search-type {
  :deep(.icon-arrow) {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }
}
```

## Custom Text

Modify the input box placeholder text through the `placeholder` property and the cancel button text through `cancel-txt`.

```html
<wd-search placeholder="Please enter order number/order name" cancel-txt="Search" />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| placeholder | Search box placeholder text | string | - | Search | - |
| placeholder-left | Placeholder aligned to the left | boolean | - | false | - |
| cancel-txt | Text on the right side of search box | string | - | Cancel | - |
| light | Light color search box (white) | boolean | - | false | - |
| hide-cancel | Whether to hide the right text | boolean | - | false | - |
| disabled | Whether to disable the search box | boolean | - | false | - |
| maxlength | Native attribute, set maximum length. -1 means no limit | string / number | - | -1 | - |
| v-model | Input box content, two-way binding | string | - | - | - |
| ~~use-suffix-slot~~ | ~~Whether to use the input box right slot~~**(Deprecated, will be removed in the next minor version, use slot directly)** | boolean | - | false | - |
| focus | Whether to automatically focus | boolean | - | false | 0.1.63 |
| focusWhenClear | Whether to focus the input box when clicking the clear button | boolean | - | false | 0.1.63 |
| placeholderStyle | Native attribute, specify placeholder style, currently only supports color, font-size and font-weight | string | - | - | 1.6.0 |
| placeholderClass | Native attribute, specify placeholder style class | string | - | - | 1.6.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| focus | Input box focus event | `{ value }` | - |
| blur | Input box blur event | `{ value }` | - |
| search | Input box search event | `{ value }` | - |
| clear | Input box clear button event | - | - |
| cancel | Input box right text click event | `{ value }` | - |
| change | Input box content change event | `{ value }` | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| prefix | Custom content on the left side of input box | - |
| suffix | Custom content on the right side of input box | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-input-class | Input external custom style | 1.6.0 |