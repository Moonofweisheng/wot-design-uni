# Grid

Grid can divide the page into equal-width blocks in the horizontal direction, used for displaying content or page navigation.

## Basic Usage

Basic usage requires binding the `icon` value and `text` property. By default, it displays one row.

`icon` is the `name` property in the `wd-icon` tag.

```html
<wd-grid>
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Custom Columns

`column` can be used to customize the number of grid columns. When the `column` property is not defined, it defaults to displaying one row. After defining this property, the component internally divides the rows based on the `column` property.

```html
<wd-grid :column="3">
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Custom Background Color

`bg-color` can be used to customize the grid background color.

```html
<wd-grid bg-color="rgba(0, 0, 0, 0.02)">
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Enable Border

`border` can be used to enable border line display.

```html
<wd-grid border :column="3">
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Content Slot

The content of `GridItem` can be customized through the default slot.

```html
<wd-grid>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
  <wd-grid-item>
    <image class="img" :src="joy" />
  </wd-grid-item>
</wd-grid>
```

```scss
.img {
  width: 100%;
  height: 90px;
}
```

## Individual Slots

The `icon` slot can be inserted into the icon position of `GridItem`.

The `text` slot can be inserted into the text position of `GridItem`.

Note:

1. When using individual slots or custom styles, users need to use `custom-class` to control the height of each `GridItem`, ensuring that each `GridItem` has the same height and meets user expectations.

2. When using the icon slot, if the slot size exceeds the value set by `icon-size`, you need to adjust the `icon-size` property to make it equal to the slot size.

```html
<wd-grid>
  <wd-grid-item text="Text" v-for="index in 3" :key="index" icon-size="36px">
    <template #icon>
      <image class="slot-img" :src="joy" />
    </template>
  </wd-grid-item>
</wd-grid>
<wd-grid>
  <wd-grid-item icon="picture" v-for="index in 3" :key="index">
    <template #text>
      <view class="text">Custom Text Slot</view>
    </template>
  </wd-grid-item>
</wd-grid>
```

```scss
.slot-img {
  height: 36px;
  width: 36px;
  border-radius: 4px;
}
.text {
  color: #ffb300;
  margin-top: 8px;
}
```

## Custom Style

The style of `GridItem` can be customized through `custom-class`.

Properties like width and height can be set in the `custom-class` style property.

Note:

- When setting properties that might affect layout like width and height, please apply `custom-class` to all `GridItem` under the current `Grid` to ensure all `GridItem` styles are the same.

- **If you want to change the height of `GridItem`, don't set the height of `Grid` directly, modify individual `GridItem`.**

- **If you want to change the `icon` size, set the `icon-size` property. `custom-icon` cannot change the current icon width and height.**

```html
<wd-grid>
  <wd-grid-item
    custom-class="custom-item"
    icon="search"
    text="JD.COM - A professional comprehensive online shopping mall, selling over 40.2 million products from tens of thousands of brands, covering 13 major categories including home appliances, phones, computers, mother & baby products, clothing, etc."
  />
  <wd-grid-item custom-class="custom-item" icon="person" text="Adhering to the customer-first philosophy, JD's products are genuine goods, with nationwide warranty and machine-printed invoices." />
</wd-grid>
```

```scss
:deep(.custom-item) {
  height: 80px !important;
  color: #e2231a;
  padding-left: 20px;
  text-align: left !important;
}
```

## Square Grid

Enable square grid property through `square` attribute. This makes each `GridItem` display as a square.

Note: When using `square`, do not customize the height style of `GridItem`.

```html
<wd-grid square :column="3">
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Set Grid Gap

Set the distance between grids through the `gutter` property.

```html
<wd-grid :gutter="10" :column="3">
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
  <wd-grid-item icon="picture" text="Text" />
</wd-grid>
```

## Page Navigation

Enable clickable state through `clickable` property, can bind `click` event.

Set page jump method through `link-type` property.

Set jump link through `url` property.

```html
<wd-grid :column="3">
  <wd-grid-item icon="picture" text="Text" :url="/pages/index/index" link-type="redirectTo" clickable />
  <wd-grid-item icon="picture" text="Text" :url="/pages/button/index" link-type="redirectTo" clickable />
  <wd-grid-item icon="picture" text="Text" :url="/pages/icon/index" link-type="redirectTo" clickable />
  <wd-grid-item icon="picture" text="Text" :url="/pages/toast/index" link-type="redirectTo" clickable />
  <wd-grid-item icon="picture" text="Text" :url="/pages/action-sheet/index" link-type="redirectTo" clickable />
</wd-grid>
```

## Grid Attributes

| Attribute | Description | Type | Default | Version |
|---------|-------------|------|---------|------|
| column | Number of columns in the grid | number | - | - |
| border | Whether to show border | boolean | false | - |
| gutter | Grid gap | number | 0 | - |
| square | Whether to be square shape | boolean | false | - |
| bg-color | Background color | string | - | - |

## GridItem Attributes

| Attribute | Description | Type | Default | Version |
|---------|-------------|------|---------|------|
| text | Text content | string | - | - |
| icon | Icon name | string | - | - |
| icon-color | Icon color | string | - | - |
| icon-prefix | Icon class name prefix | string | 'wd-icon' | - |
| icon-size | Icon size | string | '26px' | - |
| url | Page jump link | string | - | - |
| link-type | Page jump type | string | 'navigateTo' | - |
| <s>use-slot</s> | Whether to use slot **($LOWEST_VERSION$Deprecated, use default slot directly)** | boolean | false | - |
| <s>use-icon-slot</s> | Whether to use icon slot **($LOWEST_VERSION$Deprecated, component auto-detects icon slot existence)** | boolean | false | - |
| <s>use-text-slot</s> | Whether to use text slot **($LOWEST_VERSION$Deprecated, component auto-detects text slot existence)** | boolean | false | - |
| clickable | Whether clickable | boolean | false | - |

## GridItem Events

| Event | Description | Parameters | Version |
|-------|-------------|------------|------|
| click | Triggered when clicking the grid | event | - |

## GridItem Slots

| Name | Description | Version |
|------|-------------|------|
| default | Content slot | - |
| icon | Icon slot | - |
| text | Text slot | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|------|
| custom-class | Custom style class | - |