# Popup

A popup layer component used to display popups, information prompts, and other content.

## Basic Usage

`v-model` is the binding value that indicates whether to display the popup layer.

```html
<wd-popup v-model="show" custom-style="border-radius:32rpx;" @close="handleClose">
  <text class="custom-txt">Pop Pop Pop</text>
</wd-popup>
```

```css
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
```

## Popup Position

Set `position`, default is 'center', optional values are 'top', 'right', 'bottom', 'left'.

```html
<wd-popup v-model="show" position="top" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Close Button

Set the `closable` attribute.

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Disable Mask Click

By setting the `close-on-click-modal` attribute to `false`, you can disable the function of closing the popup layer when the user clicks the mask layer.

```html
<wd-popup v-model="show" position="bottom" :close-on-click-modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Disable Mask

By setting the `modal` attribute to `false`, you can disable the mask layer, allowing users to interact with the underlying content.

```html
<wd-popup v-model="show" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## Enable Bottom Safe Area

By setting the `safe-area-inset-bottom` attribute to `true`, you can ensure that the popup layer is not blocked by the bottom safe area when displayed at the bottom.

```html
<wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## root-portal

When the `root-portal` attribute is set to `true`, the popup will be detached from the page, which can avoid the influence of parent component's transform, filter and other CSS properties on the fixed positioning of the popup.

Different platforms use different implementation schemes:

- **H5**: Use Vue 3's teleport feature
- **APP**: Use renderjs to move elements to the uni-app root node
- **WeChat Mini Program/Alipay Mini Program**: Use root-portal component
- **Other platforms**: This feature is not supported

```html
<wd-popup v-model="show" root-portal position="center" custom-style="height: 200px;" @close="handleClose">
  <text class="custom-txt">I'm teleported to the root node</text>
</wd-popup>
```

:::tip Tip
This feature is mainly used to solve layering and positioning issues of popups in complex layouts, and it is recommended to enable it only when needed.
:::

## Prevent Scroll Penetration

When using the component, you will find that when the content part scrolls to the bottom, continuing to swipe will cause the underlying page to scroll, which is scroll penetration.

Currently, the component can handle some scroll penetration issues through the `lock-scroll` attribute. However, due to the reasons of the mini-program and APP platforms themselves, scroll penetration will still occur in the popup content area. However, we provide developers with a recommended solution to completely solve scroll penetration:

You can use the [page-meta](https://uniapp.dcloud.net.cn/component/page-meta#page-meta) component to dynamically modify the `overflow` attribute of `page-meta`.

```html
<!-- page-meta can only be the first node in the page -->
<page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>

<wd-popup v-model="show" lock-scroll position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

:::tip Tip
H5 scroll penetration does not need to be handled, the component has enabled `lock-scroll` by default.
:::

## Attributes

|Attribute|Description|Type|Optional Values|Default|Version|
|---|---|---|---|---|---|
|v-model|Whether to show popup|boolean|-|-|-|
|position|Popup position|string|center/top/right/bottom/left|center|-|
|closable|Whether to show close button|boolean|-|false|-|
|close-on-click-modal|Whether to close when clicking mask|boolean|-|true|-|
|duration|Animation duration|number/boolean|-|300(ms)|-|
|z-index|Popup z-index|number|-|10|-|
|custom-style|Custom popup style|string|-|-|-|
|modal|Whether to show mask|boolean|-|true|-|
|modal-style|Custom mask style|string|-|-|-|
|hide-when-close|Whether to hide when closed|boolean|-|true|-|
|lazy-render|Whether to enable lazy rendering|boolean|-|true|-|
|safe-area-inset-bottom|Whether to enable bottom safe area|boolean|-|false|-|
|transition|Transition type|string|fade/fade-up/fade-down/fade-left/fade-right/slide-up/slide-down/slide-left/slide-right/zoom-in|-|-|
|lock-scroll|Whether to lock background scroll|boolean|-|true|0.1.30|
|root-portal|Whether to mount to root node|boolean|-|false|1.11.0|

## Events

|Event|Description|Parameters|Version|
|---|---|---|---|
|close|Triggered when popup is closed|-|-|
|click-modal|Triggered when mask is clicked|-|-|
|before-enter|Triggered before enter transition starts|-|-|
|enter|Triggered when enter transition starts|-|-|
|after-enter|Triggered when enter transition ends|-|-|
|before-leave|Triggered before leave transition starts|-|-|
|leave|Triggered when leave transition starts|-|-|
|after-leave|Triggered when leave transition ends|-|-|

## External Style Classes

|Class Name|Description|Version|
|---|---|---|
|custom-class|Root node style|-|
