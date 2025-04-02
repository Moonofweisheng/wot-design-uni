# Popup

A popup layer that displays content on top of the current page.

## Basic Usage

The `visible` attribute controls whether the popup is displayed. The `position` attribute sets the popup position, which can be 'center', 'top', 'right', 'bottom', 'left', default is 'center'.

```html
<wd-popup :visible.sync="show" position="bottom">
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Close Button

Set the `closable` attribute to display a close button in the popup.

```html
<wd-popup :visible.sync="show" position="bottom" closable>
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Close Button Position

Set the `close-position` attribute to customize the position of the close button, which can be 'top-left', 'top-right', 'bottom-left', 'bottom-right', default is 'top-right'.

```html
<wd-popup :visible.sync="show" position="bottom" closable close-position="top-left">
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Custom Close Icon

Set the `close-icon` attribute to customize the close icon.

```html
<wd-popup :visible.sync="show" position="bottom" closable close-icon="check">
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Rounded Corners

Set the `border-radius` attribute to customize the border radius of the popup. This attribute is only valid when the position is 'top', 'right', 'bottom', 'left'.

```html
<wd-popup :visible.sync="show" position="bottom" border-radius="16px">
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Disable Mask Click

Set the `close-on-click-modal` attribute to `false` to disable closing the popup when clicking the mask.

```html
<wd-popup :visible.sync="show" position="bottom" :close-on-click-modal="false">
  <view style="height: 200px; text-align: center; line-height: 200px;">
    Content
  </view>
</wd-popup>
```

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| visible | Whether to display the popup, supports the .sync modifier | boolean | false | - |
| position | Popup position | string | center | - |
| closable | Whether to display the close button | boolean | false | - |
| close-position | Close button position | string | top-right | - |
| close-icon | Close button icon | string | close | - |
| modal | Whether to display the mask | boolean | true | - |
| modal-style | Custom mask style | object | - | - |
| modal-class | Custom mask class | string | - | - |
| z-index | z-index | number | 10 | - |
| lazy-render | Whether to lazily render the popup | boolean | true | - |
| close-on-click-modal | Whether to close the popup when clicking the mask | boolean | true | - |
| duration | Animation duration | number | 300(ms) | - |
| custom-style | Custom popup style | object | - | - |
| border-radius | Border radius of the popup | string | 0 | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | boolean | false | - |

## Events

| Event Name | Description | Parameters | Version |
|---------|---------|---------|------|
| open | Triggered when the popup is opened | - | - |
| opened | Triggered when the popup opening animation ends | - | - |
| close | Triggered when the popup is closed | - | - |
| closed | Triggered when the popup closing animation ends | - | - |
| click-modal | Triggered when the mask is clicked | - | - |

## Slots

| Name | Description | Version |
|---------|---------|------|
| default | Content of the popup | - |

## External Style Classes

| Class Name | Description | Version |
|---------|---------|------|
| custom-class | Root node custom class | - |