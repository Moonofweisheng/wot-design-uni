# Badge

A number or status mark on buttons and icons.

## Basic Usage

Set the `value` attribute, the badge will be displayed in the upper right corner of the element.

```html
<wd-badge value="12">
  <wd-button>Button</wd-button>
</wd-badge>
<wd-badge value="24">
  <wd-button icon="cart-o"></wd-button>
</wd-badge>
```

## Maximum Value

Set the `max` attribute, when the value exceeds the maximum value, it will be displayed as 'max+'.

```html
<wd-badge value="12" max="10">
  <wd-button>Button</wd-button>
</wd-badge>
<wd-badge value="1024" max="999">
  <wd-button icon="cart-o"></wd-button>
</wd-badge>
```

## Custom Content

Set the `value` attribute to a string type to display custom content.

```html
<wd-badge value="new">
  <wd-button>Button</wd-button>
</wd-badge>
<wd-badge value="hot">
  <wd-button icon="cart-o"></wd-button>
</wd-badge>
```

## Dot Badge

Set the `is-dot` attribute to display a small red dot without specific content.

```html
<wd-badge is-dot>
  <wd-button>Button</wd-button>
</wd-badge>
<wd-badge is-dot>
  <wd-button icon="cart-o"></wd-button>
</wd-badge>
```

## Custom Badge Color

Set the `type` attribute to change the badge color, supporting `primary` / `success` / `warning` / `danger` / `info`, default is `danger`.

```html
<wd-badge value="12">
  <wd-button>Danger</wd-button>
</wd-badge>
<wd-badge value="12" type="primary">
  <wd-button>Primary</wd-button>
</wd-badge>
<wd-badge value="12" type="success">
  <wd-button>Success</wd-button>
</wd-badge>
<wd-badge value="12" type="warning">
  <wd-button>Warning</wd-button>
</wd-badge>
<wd-badge value="12" type="info">
  <wd-button>Info</wd-button>
</wd-badge>
```

## Independent Display

When the badge is used independently, the badge will be centered.

```html
<wd-badge value="12"></wd-badge>
<wd-badge value="primary" type="primary"></wd-badge>
```

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| value | Display value | string / number | - | - |
| max | Maximum value, only valid when value is a number | number | - | - |
| top | Distance from the top of the badge to the top of the container | string | - | - |
| right | Distance from the right of the badge to the right of the container | string | - | - |
| is-dot | Whether to display a small dot | boolean | false | - |
| hidden | Whether to hide the badge | boolean | false | - |
| type | Badge type | string | danger | - |
| bg-color | Custom badge background color | string | - | - |

## External Style Classes

| Class Name | Description |
|---------|------|
| custom-class | Root node custom class |