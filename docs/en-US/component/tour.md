---
version: 1.14.0
---
# Tour

A component used to guide users step-by-step through application features, capable of highlighting specific elements on the page and providing explanations.

## Basic Usage

Set the guide steps via the `steps` prop, and control visibility via `v-model`.

```html
<template>
  <view>
    <view class="tour-item" id="step1">
      <text class="tour-title">Step 1</text>
      <text class="tour-content">This is the first step, introducing basic features</text>
    </view>
    
    <view class="tour-item" id="step2">
      <text class="tour-title">Step 2</text>
      <text class="tour-content">This is the second step, showing more features</text>
    </view>
    
    <wd-tour 
      :model-value="showTour" 
      :steps="steps" 
      v-model:current="current"
      @finish="onFinish"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showTour = ref(true)
const current = ref(0)

const steps = [
  {
    element: '#step1',
    content: 'This is the explanation for step 1'
  },
  {
    element: '#step2',
    content: 'This is the explanation for step 2'
  }
]

function onFinish() {
  console.log('Tour finished')
}
</script>
```

### Custom Content

Customize the guide content via the `content` slot.

```html
<wd-tour :model-value="showTour" :steps="steps">
  <template #content>
    <view class="custom-content">
      <wd-icon name="help-circle-filled" size="22px"></wd-icon>
      <text class="custom-text">Custom guide content area</text>
    </view>
  </template>
</wd-tour>
```

### Custom Highlight Area

Customize the highlight area style via the `highlight` slot.

```html
<wd-tour :model-value="showTour" :steps="steps">
  <template #highlight="{ elementInfo }">
    <view class="custom-highlight" :style="getCustomHighlightStyle(elementInfo)"></view>
  </template>
</wd-tour>
```

### Custom Buttons

Customize buttons via `prev`, `next`, `skip`, and `finish` slots.

```html
<wd-tour :model-value="showTour" :steps="steps" next-text="Continue" finish-text="Got it">
  <template #next>
    <view class="custom-button custom-next">Next Step</view>
  </template>
  <template #finish>
    <view class="custom-button custom-finish">Finish</view>
  </template>
</wd-tour>
```

### Click Mask to Next

Set whether clicking the mask proceeds to the next step via the `click-mask-next` prop.

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  :click-mask-next="true"
/>
```

### Custom Mask Style

Customize mask style via `mask-color`, `offset`, `border-radius`, and `padding` props.

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  mask-color="rgba(255, 0, 0, 0.6)"
  :offset="40"
  :border-radius="15"
  :padding="20"
/>
```

### Disable Mask

Control whether to show the mask via the `mask` prop.

```html
<wd-tour 
  :model-value="showTour" 
  :steps="steps" 
  :mask="false"
/>
```

### Control Current Step

Control the current step via `v-model:current`.

```html
<view>
  <wd-button @click="current = 2">Jump to Step 3</wd-button>
  <wd-tour 
    :model-value="showTour" 
    :steps="steps" 
    v-model:current="current"
  />
</view>
```

## Attributes

| Attribute | Description | Type | Optional Values | Default |
|------|------|------|--------|--------|
| v-model | Whether to show the tour component | boolean | - | false |
| steps | List of tour steps | array | - | [] |
| current | Current step index, supports v-model:current binding | number | - | 0 |
| mask | Whether to show the mask | boolean | - | true |
| mask-color | Mask color (supports rgba format) | string | - | rgba(0, 0, 0, 0.5) |
| offset | Spacing between the tooltip and the highlight box | number | - | 20 |
| duration | Animation duration (ms) | number | - | 300 |
| border-radius | Border radius of the highlight area | number | - | 8 |
| padding | Padding of the highlight area | number | - | 8 |
| prev-text | Text for the "Previous" button | string | - | Previous |
| next-text | Text for the "Next" button | string | - | Next |
| skip-text | Text for the "Skip" button | string | - | Skip |
| finish-text | Text for the "Finish" button | string | - | Finish |
| highlight-style | Style of the highlight area | object | - | - |
| bottom-safety-offset | Bottom safety offset, used to ensure enough space around the element during scroll calculation | number | - | 100 |
| top-safety-offset | Top safety offset, used to ensure enough space around the element during scroll calculation | number | - | 0 |
| custom-nav | Whether the navigation bar is custom | boolean | - | false |
| click-mask-next | Whether clicking the mask proceeds to the next step | boolean | - | false |
| z-index | Z-index of the tour component | number | - | 999 |
| show-tour-buttons | Whether to show tour buttons | boolean | - | true |
| scope | Query scope (limit selector range) | object | - | - |
| missing-strategy | Strategy for handling missing elements | 'skip' \| 'stop' \| 'hide' | - | stop |

## Steps Data Structure

| Property | Description | Type |
|------|------|------|
| element | Selector for the element to highlight | string |
| content | Guide text content (supports rich text) | string |
| padding | Override padding for the current step | number |
| offset | Override spacing between tooltip and highlight for the current step | number |
| placement | Force tooltip placement | 'auto' \| 'top' \| 'bottom' \| 'left' \| 'right' |

## Events

| Event Name | Description | Parameters |
|--------|------|------|
| change | Triggered when the step changes | `{ current: number }` |
| prev | Triggered when the previous button is clicked | `{ prevCurrent: number, current: number, total: number, isElementInTop: boolean }` |
| next | Triggered when the next button is clicked | `{ prevCurrent: number, current: number, total: number, isElementInTop: boolean }` |
| finish | Triggered when the finish button is clicked | `{ current: number, total: number }` |
| skip | Triggered when the skip button is clicked | `{ current: number, total: number }` |
| error | Triggered when finding the guide element fails | `{ message: string, element: string }` |

## Slots

| Slot Name | Description | Parameters |
|--------|------|------|
| highlight | Custom highlight area | elementInfo: Element position info |
| content | Custom guide content | - |
| prev | Custom previous button | - |
| next | Custom next button | - |
| skip | Custom skip button | - |
| finish | Custom finish button | - |

## Methods

You can get the component instance via ref and call the methods provided by the component:

| Method Name | Description | Parameters |
|--------|------|------|
| handlePrev | Switch to the previous step | - |
| handleNext | Switch to the next step | - |
| handleSkip | Skip the tour | - |
| handleFinish | Finish the tour | - |

## Notes

1. Ensure the element to highlight exists on the page and is selectable.
2. In case of a custom navigation bar, set `custom-nav` and an appropriate `top-safety-offset` value.
3. The tour component automatically handles scrolling to ensure the highlighted element is within the viewport.
4. You can control whether to show the mask via the `mask` prop.
5. When using a custom highlight area, be careful not to obscure the tour operation buttons.
6. Slot usage might vary slightly across different platforms (H5, WeChat Mini Program, etc.).
7. It is recommended to use `v-if` or `v-show` conditional rendering to ensure the component is initialized correctly.

## Theme Customization

The component supports theme customization via CSS variables. You can modify the following variables:

```scss
// Mask color
--wd-tour-mask-color: rgba(0, 0, 0, 0.5);

// Guide popover background color
--wd-tour-popover-bg-color: #ffffff;

// Button background color
--wd-tour-button-primary-bg-color: #007aff;

// Button text color
--wd-tour-button-color: #ffffff;
```

## FAQ

### Why do custom slots not show up in WeChat Mini Program?

Issues may arise when combining conditional rendering with slots in WeChat Mini Program. It is recommended to use `v-show` instead of `v-if` or move the condition inside the slot.

### Why does the highlight area flicker?

This is usually caused by element information not being fully retrieved when the component initializes. The component has optimized the initial state to avoid flickering.

### How to solve click issues?

If the custom highlight area obscures operation buttons, you can adjust the `z-index` or modify the style of the custom highlight area to ensure buttons are clickable.
