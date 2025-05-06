# SwipeAction

A component for slide operations, commonly used for gestures like sliding to delete in cells.

:::warning
The slide operation component's functionality is deeply hidden in the page, making it difficult for users to discover. It is recommended to use other interaction methods to implement operation functions, such as having a button in the list item that opens an ActionSheet when clicked.

If you insist on using the slide operation component, it is recommended to add operation tips when users enter the page to indicate that list items can be slid left and right.
:::

## Basic Usage

`wd-swipe-action` is divided into three parts: `custom left button content`, `custom content`, and `custom right button content`. Custom button content needs to set `slot` to enable, custom content is the default slot and does not need to be manually enabled.

Since the `uni-app` component cannot listen for clicks outside itself, to automatically close the `swipeAction` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab), and listen for click event bubbling on the root element of the page.

:::warning
If there is a scenario where the user manually clicks somewhere outside of `swipeAction` like a button to slide out `swipeAction`, then you need to add @click to the clicked element (in this case the button) to prevent event bubbling to the root element, avoiding triggering `closeOutside` which would close the `swipeAction` that you want to manually open.
:::

```html
<view @click.stop="closeOutside">
  <wd-swipe-action>
    <wd-cell title="Title Text" value="Content"/>
    <template #right>
      <view class="action">
        <view class="button" style="background: #C8C7CD;" @click="handleAction('Action1')">Action1</view>
        <view class="button" style="background: #FFB300;" @click="handleAction('Action2')">Action2</view>
        <view class="button" style="background: #E2231A;" @click="handleAction('Action3')">Action3</view>
      </view>
    </template>
  </wd-swipe-action>
</view>
```

```typescript
import { useToast, useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()

const toast = useToast()

function handleAction(action: string) {
  toast.show(`Clicked ${action}`)
}
```

```scss
.action {
  height: 100%;
}
.button {
  display: inline-block;
  padding: 0 11px;
  height: 100%;
  color: white;
  line-height: 42px;
}
```

## Left and Right Sliding

> The `wd-swipe-action` component provides `left`/`right` sliding buttons, enabled by setting the `left` and `right` slots

```html
<wd-swipe-action>
  <template #left>
    <view class="action">
      <view class="button" style="background: #C8C7CD;">Action1</view>
      <view class="button" style="background: #FFB300;">Action2</view>
      <view class="button" style="background: #E2231A;">Action3</view>
    </view>
  </template>
  <wd-cell title="Title Text" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #cdb86e;">Action4</view>
      <view class="button" style="background: #42ffd1;">Action5</view>
      <view class="button" style="background: #383fe2;">Action6</view>
    </view>
  </template>
</wd-swipe-action>
```

## Toggle Buttons

> You can control opening and closing sliding buttons by setting `v-model`. Available values are: `left`, `close`, `right`, representing "Open left sliding button", "Close sliding button", "Open right sliding button" respectively

```html
<wd-swipe-action v-model="value">
  <template #left>
    <view class="action">
      <view class="button" style="background: #C8C7CD;">Action1</view>
      <view class="button" style="background: #FFB300;">Action2</view>
      <view class="button" style="background: #E2231A;">Action3</view>
    </view>
  </template>
  <wd-cell title="Title Text" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #cdb86e;">Action4</view>
      <view class="button" style="background: #42ffd1;">Action5</view>
      <view class="button" style="background: #383fe2;">Action6</view>
    </view>
  </template>
</wd-swipe-action>

<view class="button-group">
  <wd-button @click="changeState('left')">Open Left</wd-button>
  <wd-button @click="changeState('close')">Close All</wd-button>
  <wd-button @click="changeState('right')">Open Right</wd-button>
</view>
```

```typescript
const value = ref<string>('close')
function changeState(position: string) {
  value.value = position
}
```

## Hook Function Before Button Closes

> Pass a function through the `before-close` property. Note that the variable passed in must be defined in `data`. The callback function will execute before the sliding button closes.

The hook function receives two parameters: `reason` and `position`.
`reason` indicates the reason for the sliding button closing, with values: `click`, `swipe`, `value`, representing: closing by clicking, closing by sliding, closing by controlling `value`;
`position` represents the operation button being closed, with values: `left`, `right`. When `reason` is `click`, it indicates closing the sliding button by clicking the `position` location, with values: `left`, `right`, `inside`.

```html
<demo-block transparent title="Toggle Buttons">
  <wd-swipe-action v-model="value" :before-close="beforeClose">
    <template #left>
      <view class="action">
        <view class="button" style="background: #C8C7CD;">Action1</view>
        <view class="button" style="background: #FFB300;">Action2</view>
        <view class="button" style="background: #E2231A;">Action3</view>
      </view>
    </template>
    <wd-cell title="Title Text" value="Content" />
    <template #right>
      <view class="action">
        <view class="button" style="background: #cdb86e;">Action4</view>
        <view class="button" style="background: #42ffd1;">Action5</view>
        <view class="button" style="background: #383fe2;">Action6</view>
      </view>
    </template>
  </wd-swipe-action>

  <view class="button-group">
    <wd-button @click="changeState('left')">Open Left</wd-button>
    <wd-button @click="changeState('close')">Close All</wd-button>
    <wd-button @click="changeState('right')">Open Right</wd-button>
  </view>
</demo-block>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const value = ref<string>('close')
function changeState(position: string) {
  value.value = position
}

const beforeClose = (reason, position) => {
  if (reason === 'click') {
    toast.show(`${reason} ${position} caused sliding button to close`)
  } else {
    toast.show(`${reason} caused ${position} sliding button to close`)
  }
}
```

## Click Events

> The `click` event will only trigger when closing the sliding button.

The callback function's parameter indicates the clicked position, where `left` and `right` indicate clicking the left and right sliding buttons, and `inside` indicates clicking anywhere inside the container except the buttons.

```html
<wd-swipe-action @click="handleClick">
  <wd-cell title="Title Text" value="Content" />
  <template #right>
    <view class="action">
      <view class="button" style="background: #C8C7CD;">Action1</view>
      <view class="button" style="background: #FFB300;">Action2</view>
      <view class="button" style="background: #E2231A;">Action3</view>
    </view>
  </template>
</wd-swipe-action>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

function handleClick(position: string) {
  toast.show(`Clicked ${position}`)
}
```

## Attributes

| Attribute | Description | Type | Options | Default |
|---------|-------------|------|---------|---------|
| v-model | Control sliding button state | string | left / close / right | close |
| before-close | Hook function before sliding button closes | function | - | - |

## Events

| Event | Description | Parameters |
|-------|-------------|------------|
| click | Triggered when clicking to close sliding button | The clicked position (left/right/inside) |

## Slots

| Name | Description |
|------|-------------|
| left | Custom left sliding button content |
| right | Custom right sliding button content |