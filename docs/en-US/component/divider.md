# Divider

Used to separate content into multiple areas.

:::danger Please Note
The `hairline`, `dashed`, `content-position`, and `vertical` properties are newly supported in version 1.5.0. Before this version, only default slot text display and custom `color` were supported.
:::

## Basic Usage

By default, renders a horizontal dividing line.

```html
<wd-divider></wd-divider>
```

## Display Text

Use the default slot to insert content in the middle of the dividing line.

```html
<wd-divider>Display Text</wd-divider>
```

## Custom Render Content

Use the default slot to insert custom content in the middle of the dividing line.

```html
<wd-divider>
  <wd-icon name="arrow-down" size="20" color="#1989fa" />
</wd-divider>
```

## Content Position

Specify the content position through `content-position`.

```html
<wd-divider>Center</wd-divider>
<wd-divider content-position="left">Left</wd-divider>
<wd-divider content-position="right">Right</wd-divider>
```

## Dashed Line

Add the `dashed` property to render the dividing line as a dashed line.

```html
<wd-divider dashed>Dashed Divider</wd-divider>
```

## Custom Color

Set the `color` property.

```html
<wd-divider color="#4D80F0">Custom Color</wd-divider>
```

## Vertical Divider

Add the `vertical` property to render the dividing line as a vertical divider.

```html
<view class="content">
  Text
  <wd-divider vertical />
  Text
  <wd-divider vertical dashed />
  Text
  <wd-divider vertical :hairline="false" />
  Text
  <wd-divider vertical color="#1989fa" />
  Text
</view>
```

```css
.content {
  padding: 12rpx 15px;
}
```

## Attributes

| Attribute | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| color | Custom color, supports all color writing formats | string | - | - | - |
| hairline | Whether to show border | boolean | - | true | 1.5.0 |
| dashed | Whether to show as dashed line | boolean | - | false | 1.5.0 |
| content-position | Content position | string | `left`/`center`/`right` | `center` | 1.5.0 |
| vertical | Whether to show as vertical divider | boolean | - | false | 1.5.0 |

## Slot

| Name | Description | Version |
|------|-------------|----------|
| default | Content, only effective when `vertical` is `false` | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |