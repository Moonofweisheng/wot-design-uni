# Radio

Radio button, used for selecting a single option from a set of alternatives.

## Basic Usage

`v-model` is the binding value, which is the `value` of the selected `wd-radio`.

```html
<demo-block title="Basic Usage">
  <wd-radio-group v-model="value">
    <wd-radio :value="1">Radio 1</wd-radio>
    <wd-radio :value="2">Radio 2</wd-radio>
  </wd-radio-group>
  <view>Current selected value: {{value}}</view>
</demo-block>
```
```typescript
const value = ref<number>(1)
```

## Modify Icon Shape

Modify the `shape` property, available values are 'dot', 'button', 'check', default is 'check'.

```html
<!-- button style radio -->
<wd-radio-group v-model="value" shape="button" @change="change">
  <wd-radio :value="1">WOT</wd-radio>
  <wd-radio :value="2">Merchant Backend</wd-radio>
</wd-radio-group>
```

```typescript
const value = ref<number>(1)

function change(e) {
  console.log(e)
}
```

> <div style="color: #FA4350;font-weight: 500;">Note:</div>
> <div>When content items are within 3 items and have important information to choose from (such as payment type selection), you can consider using the circular component. Because it can be easily confused with circular checkboxes and will cause inconsistency in the current form page structure, <span style="color: #FA4350;font-weight: 500;">dot-style radio buttons are generally not recommended.</span></div>

```html
<!-- dot style radio -->
<wd-radio-group v-model="value" shape="dot" @change="change">
  <wd-radio :value="1">WOT</wd-radio>
  <wd-radio :value="2">Merchant Backend</wd-radio>
</wd-radio-group>
```

```typescript
const value = ref<number>(1)

function change(e) {
  console.log(e)
}
```

## Form Mode

Set the `cell` property to enable form mode radio group.

When form mode is enabled, if `shape` is set to `button`, it will enable form mode radio button group mode.

```html
<wd-radio-group v-model="value" cell>
  <wd-radio value="1">Option 1</wd-radio>
  <wd-radio value="2">Option 2</wd-radio>
  <wd-radio value="3">Option 3</wd-radio>
  <wd-radio value="4">Option 4</wd-radio>
  <wd-radio value="5">Option 5</wd-radio>
  <wd-radio value="6">Option 6</wd-radio>
  <wd-radio value="7">Option 7</wd-radio>
</wd-radio-group>
```

```typescript
const value = ref<number>(1)
```

## Inline Display

Set the `inline` property to display radio buttons in the same line.

```html
<wd-radio-group v-model="value" inline>
  <wd-radio value="1">Radio 1</wd-radio>
  <wd-radio value="2">Radio 2</wd-radio>
</wd-radio-group>
```
```typescript
const value = ref<number>(1)
```

## Modify Selected Color

Set the `checked-color` property.

```html
<wd-radio-group v-model="value" checked-color="#fa4350">
  <wd-radio value="1">WOT</wd-radio>
  <wd-radio value="2">Merchant Backend</wd-radio>
</wd-radio-group>
```
```typescript
const value = ref<number>(1)
```

## Disabled

You can set the `disabled` property on `radio-group` to disable all radio buttons, or set the `disabled` property on individual radio buttons to disable specific ones.

```html
<wd-radio-group v-model="value" disabled>
  <wd-radio value="1">WOT</wd-radio>
  <wd-radio value="2">Merchant Backend</wd-radio>
</wd-radio-group>
```
```typescript
const value = ref<number>(1)
```

## Size

Set the `size` property, available value is `large`.

```html
<wd-radio-group v-model="value" size="large">
  <wd-radio value="1">WOT</wd-radio>
  <wd-radio value="2">Merchant Backend</wd-radio>
</wd-radio-group>
```

## Props Priority

Props set on radio have higher priority than props set on radioGroup

```html
  <wd-radio-group v-model="value" shape="button" disabled checked-color="#f00">
    <wd-radio value="1" :disabled="false" checked-color="#000">Merchant Backend</wd-radio>
    <wd-radio value="2" :disabled="false">WOT</wd-radio>
    <wd-radio value="3">Merchant Intelligence</wd-radio>
  </wd-radio-group>
```

## RadioGroup Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Will automatically select the radio with matching value | string / number / boolean | - | - | - |
| shape | Radio button shape | string | dot / button / check | check | - |
| size | Set size | string | large | - | - |
| checked-color | Selected color | string | - | #4D80F0 | - |
| disabled | Disabled | boolean | - | false | - |
| max-width | Maximum width of text position | string | - | - | - |
| inline | Display in same line | boolean | - | false | - |
| cell | Form mode | boolean | - | false | - |
| icon-placement | Check icon alignment | string | left / right / auto | auto | 1.5.0 |

## RadioGroup Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when binding value changes | `{ value }` | - |

## Radio Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| value | Value when radio is selected. Will automatically match radioGroup's value | string / number / boolean | - | - | - |
| shape | Radio button shape | string | dot / button / check | check | - |
| checked-color | Selected color | string | - | #4D80F0 | - |
| disabled | Disabled | boolean | - | false | - |