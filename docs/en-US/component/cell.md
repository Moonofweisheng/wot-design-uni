# Cell

Cells are used to group information and actions for a single subject.

## Basic Usage

The `title` attribute sets the left title of the cell, and the `value` attribute sets the right content of the cell.

```html
<wd-cell title="Title" value="Content"></wd-cell>
```

## Icon

The `icon` attribute sets the icon class name on the left side of the cell.

```html
<wd-cell title="Title" value="Content" icon="setting"></wd-cell>
```

## Large Size

The `size` attribute can be set to `large` to increase the cell height.

```html
<wd-cell title="Title" value="Content" size="large"></wd-cell>
```

## Groups

Cells can be grouped using the `wd-cell-group` component.

```html
<wd-cell-group title="Group 1">
  <wd-cell title="Title" value="Content"></wd-cell>
  <wd-cell title="Title" value="Content"></wd-cell>
</wd-cell-group>
<wd-cell-group title="Group 2">
  <wd-cell title="Title" value="Content"></wd-cell>
  <wd-cell title="Title" value="Content"></wd-cell>
</wd-cell-group>
```

## Card Style

Set the `insert` attribute on `wd-cell-group` to display it in card style with rounded corners and side margins.

```html
<wd-cell-group title="Card Style Group" insert>
  <wd-cell title="Title" value="Content"></wd-cell>
  <wd-cell title="Title" value="Content"></wd-cell>
</wd-cell-group>
```

## Custom Content

The cell component provides three slots: default slot, title slot, and icon slot, which can be used to customize the content.

```html
<wd-cell title="Title">
  <view>Custom Content</view>
</wd-cell>
```

```html
<wd-cell value="Content">
  <view slot="title">
    <view>Title</view>
    <view style="margin-top: 5px; font-size: 12px; color: #999;">Subtitle</view>
  </view>
</wd-cell>
```

```html
<wd-cell title="Title" value="Content">
  <view slot="icon" class="custom-icon"></view>
</wd-cell>
```

## Clickable

The `clickable` attribute sets whether the cell is clickable. If set to `true`, the cell will have a click effect and a right arrow will be displayed.

```html
<wd-cell title="Title" value="Content" clickable></wd-cell>
```

## Link

The `is-link` attribute sets whether the cell is a link. If set to `true`, a right arrow will be displayed. The `link-type` attribute sets the link type, which can be `navigateTo`, `redirectTo`, `reLaunch`, `switchTab`. The `url` attribute sets the link path.

```html
<wd-cell title="Title" value="Content" is-link url="/pages/index/index" link-type="switchTab"></wd-cell>
```

## Arrow Direction

The `arrow-direction` attribute controls the direction of the arrow. Available values are `left`, `up`, `down`. The default is right arrow. This attribute only takes effect when `is-link` is `true`.

```html
<wd-cell title="Up Arrow" is-link arrow-direction="up" />
<wd-cell title="Down Arrow" is-link arrow-direction="down" />
<wd-cell title="Left Arrow" is-link arrow-direction="left" />
<wd-cell title="Default Arrow (Right)" is-link />
```

## Vertical Alignment

The `center` attribute sets whether the left and right content of the cell is vertically centered.

```html
<wd-cell title="Title" value="Content" center></wd-cell>
```

## Cell Group Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| title | Group title | string | - | - |
| value | Group value | string | - | - |
| border | Whether to show the outer border | boolean | true | - |
| insert | Whether to display in card style with rounded corners | boolean | false | $LOWEST_VERSION$ |
| use-slot | Enable custom slots for group | boolean | false | - |

## Cell Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| title | Left title | string | - | - |
| value | Right content | string | - | - |
| icon | Left icon class name, see Icon component for optional values | string | - | - |
| icon-size | Icon size | string \| number | - | 1.13.0 |
| icon-prefix | Icon class name prefix, same as Icon component | string | 'wd-icon' | - |
| label | Description below the title | string | - | - |
| is-link | Whether to show the right arrow and click effect | boolean | false | - |
| clickable | Whether to show the click effect | boolean | false | - |
| link-type | Link type, can be 'navigateTo', 'redirectTo', 'reLaunch', 'switchTab' | string | navigateTo | - |
| url | Link path, valid when is-link is true | string | - | - |
| to | Route object, same as the to attribute of vue-router, valid when is-link is true | string / object | - | - |
| replace | If true, the navigation will not leave a history record, valid when is-link is true | boolean | false | - |
| size | Cell size, can be 'large' | string | - | - |
| title-width | Title width, with unit | string | - | - |
| center | Whether to vertically center the left and right content | boolean | false | - |
| required | Whether to show the required asterisk | boolean | false | - |
| marker-side | Position of the required marker | 'before' \| 'after' | 'before' | 1.12.0 |
| arrow-direction | Arrow direction, only effective when is-link is true | 'left' \| 'up' \| 'down' | - | $LOWEST_VERSION$ |
| on | Whether to show the on icon on the right | boolean | false | - |
| bordered | Whether to show the bottom border | boolean | true | - |
| center-title | Whether to center the title | boolean | false | 0.1.1 |
| ellipsis | Whether to truncate content with ellipsis when it overflows | boolean | false | 1.11.0 |
| use-title-slot | Whether to enable title slot, enabled by default to solve v-slot and v-if conflict issues | boolean | true | 1.11.0 |

## Cell Events

| Event Name | Description | Parameters | Version |
|---------|---------|---------|------|
| click | Triggered when the cell is clicked | event: Event | - |

## Cell Slots

| Name | Description | Version |
|---------|---------|------|
| title | Custom title | - |
| icon | Custom icon | - |
| label | Custom label | - |
| default | Custom right content | - |

## Cell Group Slots

| Name | Description | Version |
|---------|---------|------|
| default | Default slot | - |
| value | Custom value slot | - |

## Cell External Style Classes

| Class Name | Description | Version |
|---------|---------|------|
| custom-class | Root node custom class | - |
| custom-label-class | Label custom class | - |
| custom-value-class | Value custom class | - |
| custom-title-class | Title custom class | - |

## Cell Group External Style Classes

| Class Name | Description | Version |
|---------|---------|------|
| custom-class | Root node custom class | - |
| custom-title-class | Title custom class | - |