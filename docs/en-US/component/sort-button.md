# SortButton

Used to display sorting buttons, supporting three states: ascending, descending, and reset.

## Basic Usage

Use `v-model` to bind the component's display state, with values: `-1, 0, 1`, representing: descending order, unselected state, ascending order respectively. `title` is the display text, and the button is in an unselected state by default.

```html
<wd-sort-button title="Price" v-model="value" @change="handleChange" />
```

```typescript
const value = ref<number>(0)

function handleChange({ value }) {
  console.log(value)
}
```

## Button Reset

In double arrow state (default state), allow resetting the button to unselected state by setting `allow-reset`

```html
<wd-sort-button title="Price" allow-reset/>
```

## Priority Switch to Descending Order

Set `desc-first` to prioritize switching to descending order, ascending order by default.

```html
<wd-sort-button v-model="value" desc-first title="Price" />
```

## Hide Underline

When there is only one sort button, the underline should not be displayed. Set the `line` property to `false`.

```html
<wd-sort-button v-model="value" :line="false" title="Price" />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected arrow direction: 1 ascending, 0 reset state, -1 descending | number | -1,0,1 | 0 or -1 | - |
| title | Text displayed on the sort button | string | - | - | - |
| allow-reset | When showing double arrows, allow manual reset of the button | boolean | - | false | - |
| desc-first | Priority switch to descending order, default is ascending order if not enabled | boolean | - | false | - |
| line | Display underline, should not display when there is only one sort button | boolean | - | true | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Listen for sort modifications | `{ value }` | - |

## External Style Classes
| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |