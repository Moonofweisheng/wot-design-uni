# FloatingPanel

A panel floating at the bottom of the page, users can drag the panel up and down to browse content, allowing access to more information without leaving the current view. Commonly used in map navigation.

## Basic Usage

The initial height of FloatingPanel will take the value of `anchors[0]`, which is `100px`. Users can drag to expand the panel to reach 60% of the screen height.

```html
<wd-floating-panel>
  <wd-cell-group border>
    <wd-cell v-for="item in data" :key="item" :title="item" />
  </wd-cell-group>
</wd-floating-panel>
```

```js
const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
```

## Custom Anchors

You can set the anchor positions of <b>FloatingPanel</b> through the `anchors` property and control the current panel display height through `v-model:height`.

For example, make the panel height dock at three positions: `100px`, `40%` of screen height, and `70%` of screen height:

```html
<wd-floating-panel v-model:height="height" :anchors="anchors" @heightChange="handleHeightChange">
  <view class="inner-content">Custom Anchors {{ anchors }} - {{ height.toFixed(0) }}</view>
</wd-floating-panel>
```

```js
const height = ref<number>(0)
const windowHeight = ref<number>(0)
const anchors = ref<number[]>([])

const handleHeightChange = ({ height }: { height: number }) => {
  console.log(height)
}

onLoad(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
  anchors.value = [100, Math.round(0.4 * windowHeight.value), Math.round(0.7 * windowHeight.value)]
  height.value = anchors.value[1]
})
```

```css
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```

## Header Only Draggable

By default, both the header area and content area of <b>FloatingPanel</b> can be dragged. You can disable content area dragging through the `contentDraggable` property.

```html
<wd-floating-panel :contentDraggable="false">
  <view class="inner-content">Content area cannot be dragged</view>
</wd-floating-panel>
```

```css
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
```

## Attributes

| Parameter           | Description                                                  | Type     | Options | Default                     | Version |
| ------------------- | ------------------------------------------------------------ | -------- | ------- | --------------------------- | ------- |
| v-model:height      | Current panel display height                                 | number   | -       | `0`                         | 1.3.12  |
| anchors             | Set custom anchors, unit `px`                                | number[] | -       | `[100, windowHeight * 0.6]` | 1.3.12  |
| duration            | Animation duration, unit `ms`, set to `0` to disable animation| number   | -       | `300`                       | 1.3.12  |
| contentDraggable    | Allow dragging content container                             | boolean  | -       | `true`                      | 1.3.12  |
| safeAreaInsetBottom | Enable bottom safe area adaptation                           | boolean  | -       | `false`                     | 1.3.12  |
| showScrollbar       | Enable scrollbar                                             | boolean  | -       | `true`                      | 1.3.12  |

## Slots

| Name | Description  | Version |
| ---- | ------------ | ------- |
| —    | Default slot | 1.3.12  |

## Events

| Event Name   | Description                                                  | Parameters          | Version |
| ------------ | ------------------------------------------------------------ | ------------------- | ------- |
| heightChange | Triggered when panel display height changes and dragging ends | `{ height: number }` | 1.3.12  |

## External Classes

| Class Name   | Description      | Version |
| ------------ | ---------------- | ------- |
| custom-class | Root node style  | 1.3.12  |
| custom-style | Root node style  | 1.3.12  |