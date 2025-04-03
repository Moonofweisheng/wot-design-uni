# Pagination

When there is too much data, use pagination to break down the data.

## Basic Usage

Use `v-model` to bind the current page number, set `total` for total number of items, and `page-size` for items per page (default is 10). The total number of pages is automatically calculated based on `total` and `page-size`.

```html
<wd-pagination v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(1)
function handleChange({ value }) {
  console.log(value)
}
```

## Icon Display

Set the `show-icon` property to display pagination navigation as Icon icons.

```html
<wd-pagination v-model="value" @change="handleChange" show-icon ></wd-pagination>
```

## Text Tips

Set the `show-message` property to display text tips.

```html
<wd-pagination 
  v-model="value" 
  :total="total" 
  :page-size="page" 
  @change="handleChange" 
  show-icon 
  show-message
/>
```

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Binding value | number | - | - | - |
| prev-text | Previous page button text | string | - | Previous | - |
| next-text | Next page button text | string | - | Next | - |
| total-page | Total pages, if total exists, total will be used first to calculate pages | number | - | `Calculated based on pages` | - |
| page-size | Items per page | number | - | 10 | - |
| total | Total number of items | number | - | - | - |
| show-icon | Whether to show pagination icons | boolean | - | false | - |
| show-message | Whether to show text tips | boolean | - | false | - |
| hide-if-one-page | Whether to hide when there is only one page | boolean | - | true | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Value change event | `{ value }`, value is the current value | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |