# Fab Floating Action Button

Floating action button component that displays a group of action buttons when pressed.

:::warning
Since `uni-app` components cannot monitor clicks outside themselves, to automatically close the `fab` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab). Monitor click event bubbling on the root element of the page.

If there is a scenario where the user manually clicks somewhere other than `fab` to slide out the `fab`, you need to add `click.stop=""` to the clicked element (in this case, the button) to prevent event bubbling to the root element, avoiding triggering `closeOutside` which would close the manually opened `fab`.
:::

## Basic Usage

Set the trigger type through `type`, set the trigger position through `position`, set the opening direction of action buttons through `direction`, and set whether the floating button is disabled through `disabled`.

```html
<wd-fab :disabled="disabled" :type="type" :position="position" :direction="direction">
  <wd-button @click="showToast('Triple Like')" :disabled="disabled" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Add to Favorites')" :disabled="disabled" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>

  <wd-button @click="showToast('Give Coin')" :disabled="disabled" custom-class="custom-button" type="error" round>
    <wd-icon name="money-circle" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('Like')" :disabled="disabled" custom-class="custom-button" type="warning" round>
    <wd-icon name="thumb-up" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'
const { show: showToast } = useToast()
const type = ref<'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'>('primary')
const position = ref<'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'left-center'
  | 'right-center'
  | 'top-center'
  | 'bottom-center'>('left-bottom')
const direction = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const disabled = ref<boolean>(false)
```

```scss
:deep(.custom-button) {
  min-width: auto !important;
  box-sizing: border-box;
  width: 32px !important;
  height: 32px !important;
  border-radius: 16px !important;
  margin: 8rpx;
}

:deep(.custom-radio) {
  height: 32px !important;
  line-height: 32px !important;
}
```

## Action Menu Expand/Collapse

Control the expansion/collapse of the action button menu through `v-model:active`

```html
<wd-fab v-model:active="active"></wd-fab>
```

```ts
const active = ref<boolean>(false)
```

## Draggable Button

```html
<wd-fab :draggable="true"></wd-fab>
```

:::warning
After enabling dragging, the `direction` property will be invalid, and the pop-up direction will be automatically calculated based on the position after dragging. After dragging is completed, the button will automatically snap to the edge.
:::

## Custom Trigger

Customize the trigger through the `trigger` slot, `expandable` controls whether clicking the trigger expands/collapses the action button menu.

```html
<wd-fab position="left-bottom" :expandable="false">
  <template #trigger>
    <wd-button @click="handleClick" icon="share" type="error">Share with Friends</wd-button>
  </template>
</wd-fab>
```
```ts
const handleClick = () => {
  console.log('Clicked')
}
```

## Attributes

| Parameter      | Description                                                                                      | Type         | Options                                                                                                                                       | Default Value                                   | Version |
|----------------|--------------------------------------------------------------------------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|----------|
| v-model:active | Whether activated                                                                                 | boolean      | -                                                                                                                                             | false                                          | 0.1.57   |
| type           | Type                                                                                               | FabType      | 'primary' &#124; 'success' &#124; 'info' &#124; 'warning' &#124; 'error' &#124; 'default'                                                     | 'primary'                                      | 0.1.57   |
| position       | Floating button position                                                                              | FabPosition  | 'left-top' &#124; 'right-top' &#124; 'left-bottom' &#124; 'right-bottom' &#124; left-center &#124; right-center &#124; top-center &#124; bottom-center | 'right-bottom'                                 | 0.1.57   |
| draggable      | Whether button can be dragged                                                                         | boolean      | -                                                                                                                                             | false                                          | 1.2.19   |
| direction      | Floating button menu pop-up direction                                                                | FabDirection | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left'                                                                                            | 'top'                                          | 0.1.57   |
| disabled       | Whether disabled                                                                                     | boolean      | -                                                                                                                                             | false                                          | 0.1.57   |
| inactiveIcon   | Icon when floating button is not expanded                                                            | string       | -                                                                                                                                             | 'add'                                          | 0.1.57   |
| activeIcon     | Icon when floating button is expanded                                                                | string       | -                                                                                                                                             | 'close'                                        | 0.1.57   |
| zIndex        | Custom floating button layer level                                                                   | number       | -                                                                                                                                             | 99                                             | 0.1.57   |
| gap           | Custom gap between floating button and viewport edges                                                | FabGap       | -                                                                                                                                             | \{ top: 16, left: 16, right: 16, bottom: 16 \} | 1.2.26   |
| custom-style   | Custom style                                                                                        | string       | -                                                                                                                                             | ''                                             | 0.1.57   |
| expandable    | Controls whether to expand menu when clicked, triggers click when set to false                      | boolean      | -                                                                                                                                             | true                                           | 1.3.11   |

## Events

| Event Name | Description                                                    | Parameters | Version |
|------------|----------------------------------------------------------------|------------|----------|
| click      | Triggered when clicking the floating button when expandable is false | —          | 1.3.11   |

## Methods

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| open | Expand menu | - | 0.1.57 |
| close | Collapse menu | - | 0.1.57 |

## Slot

| name    | Description                                                                                                | Version |
|---------|------------------------------------------------------------------------------------------------------------|----------|
| default | Action buttons, usually contains multiple buttons                                                           | 0.1.57   |
| trigger | Trigger slot, used for custom click button, component won't emit click when using this slot                  | 1.3.11   |

## External Classes

| Class Name   | Description         | Version |
|--------------|---------------------|----------|
| custom-class | Custom style class  | 0.1.57   |