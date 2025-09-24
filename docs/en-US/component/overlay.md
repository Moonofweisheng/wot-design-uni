# Overlay

Create a mask layer to emphasize specific page elements and prevent users from performing other operations.

## Basic Usage

Use `show` to control the display/hide of the mask layer.

```html
<wd-button type="primary" @click="show = true">Show Overlay</wd-button>
<wd-overlay :show="show" @click="show = false" />
```

## Embedded Content

Modify the indicator type through `type`, with optional value 'outline', suitable for general module loading.

```html
<wd-button type="primary" @click="show = true">Embedded Content</wd-button>
<wd-overlay :show="show" @click="show = false">
  <view class="wrapper">
    <view class="block" @click.stop="" />
  </view>
</wd-overlay>
```

```scss
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

## Attributes

| Attribute   | Description            | Type              | Options | Default | Version |
|-------------|------------------------|-------------------|---------|---------|----------|
| show        | Whether to show overlay| `boolean`         | true    | false   | -        |
| duration    | Animation duration in milliseconds | `string / number` | -     | 300     | -        |
| lockScroll  | Whether to lock scrolling | `boolean`      | false   | true    | -        |
| zIndex      | z-index level         | `number`          | -       | 10      | -        |
| customStyle | Custom style          | `string`          | -       | -       | -        |