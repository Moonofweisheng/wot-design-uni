---
version: 1.11.0
---
# Root Portal

Whether to break out of the page, used to solve various fixed positioning issues, mainly used for making popups and overlays.

:::tip Tip
The root portal component only supports `WeChat Mini Program`, `Alipay Mini Program`, `APP` and `H5` platforms. The component automatically chooses the appropriate implementation based on the platform:

- **H5**: Uses `teleport` feature
- **WeChat Mini Program and Alipay Mini Program**: Uses `root-portal` component
- **App**: Uses renderjs implementation
- **Other platforms**: Not supported

This feature is mainly used to solve the hierarchy and positioning problems of popups in complex layouts, and is recommended only when needed.
:::

## Basic Usage

Use `wd-root-portal` to render content to the root node, avoiding style interference from parent components.

```html
<wd-button type="primary" @click="show = true">Show Modal</wd-button>
<wd-root-portal v-if="show">
  <view class="modal">
    <view class="modal-content">
      <text>This is a global modal</text>
      <wd-button @click="show = false">Close</wd-button>
    </view>
  </view>
</wd-root-portal>
```

```scss
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
```

## Attributes

This component has no attribute configuration.

## Events

This component has no events.

## Slots

| Name    | Description                    | Version |
| ------- | ------------------------------ | ------- |
| default | Default slot for portal content | 1.11.0  | 