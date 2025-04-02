# Slider

Supports single-direction slider and dual-direction slider.

## Basic Usage

`v-model` is the binding value. If it's a number type, one slider will be displayed; if it's an array type, two sliders will be displayed.

```html
<wd-slider v-model="value"/>
```
```typescript
const value = ref<number>(30)
```

## Dual Slider

In dual slider mode, `value` should be a `two-element array` type.

```html
<wd-slider v-model="value" />
```
```typescript
const value = ref<number[]>([10, 30])
```

## Maximum and Minimum Values

Set `min` for minimum value and `max` for maximum value.

```html
<wd-slider v-model="value" :min="4" :max="1000" />
```

## Hide Labels

Set `hide-label` to hide the current value of the slider.

```html
<wd-slider v-model="value" hide-label/>
```

Set `hide-min-max` to hide the maximum and minimum values.

```html
<wd-slider v-model="value" hide-min-max />
```

## Disabled

Set the `disabled` property.

```html
<wd-slider v-model="value" disabled />
```

## Attributes
| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Slider value, if it's an array, it's a dual slider | number / array | - | - | - |
| hide-min-max | Whether to show the maximum and minimum values on both sides | boolean | - | false | - |
| hide-label | Whether to show the current slider value | boolean | - | false | - |
| disabled | Whether to disable | boolean | - | false | - |
| max | Maximum value | number | - | 100 | - |
| min | Minimum value, negative numbers allowed `(1.2.19)` | number | - | 0 | - |
| step | Step value | number | - | 1 | `1.2.19` |
| active-color | Active background color of the progress bar | string | - | linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%) | - |
| inactive-color | Inactive background color of the progress bar | string | - | #e5e5e5 | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| dragstart | Triggered when starting to move | `{ value }` | - |
| dragmove | Triggered when moving the slider | `{ value }` | - |
| dragend | Triggered when movement ends | `{ value }` | - |

## Methods

Exposed functions

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| initSlider | Initialize slider width data | - | 1.2.25 |

## External Style Classes
| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-min-class | Custom style for minimum value | - |
| custom-max-class | Custom style for maximum value | - |