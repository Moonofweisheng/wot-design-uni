---
version: 1.14.0
---

# SlideVerify

A slide verification component for human-machine verification scenarios.

## Basic Usage

```html
<wd-slide-verify @success="handleSuccess" @fail="handleFail" />
```

```typescript
function handleSuccess() {
  console.log('Verification successful')
}

function handleFail() {
  console.log('Verification failed')
}
```

## Custom Text

Customize prompt text through `text` and `success-text` properties.

```html
<wd-slide-verify text="Please drag the slider" success-text="Verification successful" />
```

## Custom Size

Customize the width and height of the slide bar through `width` and `height` properties.
Set the corresponding icon sizes through `icon-size` and `success-icon-size` properties.

```html
<wd-slide-verify :width="250" :height="50" icon-size="60rpx" success-icon-size="30rpx" />
```

## Custom Color

Customize colors through `background-color` and `active-background-color` properties.

```html
<wd-slide-verify background-color="#E8F4FF" active-background-color="#4D94FF" />
```

## Custom Icon

Customize icons through `icon` and `success-icon` properties, and set icon size with `icon-size` property.

```html
<wd-slide-verify icon="arrow-right" success-icon="success" :icon-size="24" />
```

## Custom Tolerance

Set the tolerance range (in pixels) through `tolerance` property, defaults to 10px.

```html
<wd-slide-verify :tolerance="20" />
```

## Disabled State

Set the `disabled` property to disable slide verification.

```html
<wd-slide-verify disabled />
```

## Reset Method

Get the component instance through `ref` and call the `reset` method to reset the verification state.

```html
<wd-slide-verify ref="slideVerifyRef" />
<wd-button @click="handleReset">Reset</wd-button>
```

```typescript
import { ref } from 'vue'
import type { SlideVerifyInstance } from '@/uni_modules/wot-design-uni/components/wd-slide-verify/type'

const slideVerifyRef = ref<SlideVerifyInstance>()

function handleReset() {
  slideVerifyRef.value?.reset()
}
```

## Slots

Supports customizing content through slots.

```html
<wd-slide-verify>
  <template #text>
    <text>Slide right to complete verification</text>
  </template>
  <template #success-text>
    <text>Verification passed</text>
  </template>
  <template #icon>
    <view>ICON</view>
  </template>
  <template #success-icon>
    <view style="color: red">OK</view>
  </template>
</wd-slide-verify>
```

## Attributes

| Parameter               | Description                                                                                           | Type            | Options | Default                              | Version          |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | --------------- | ------- | ------------------------------------ | ---------------- |
| width                   | Width of slide bar (unit: px)                                                                         | number / string | -       | 300                                  | 1.14.0 |
| height                  | Height of slider (unit: px)                                                                           | number / string | -       | 40                                   | 1.14.0 |
| tolerance               | Tolerance range (unit: px), distance from endpoint within which verification is considered successful | number / string | -       | 10                                   | 1.14.0 |
| text                    | Prompt text                                                                                           | string          | -       | Slide right to complete verification | 1.14.0 |
| success-text            | Success prompt text                                                                                   | string          | -       | Verification passed                  | 1.14.0 |
| disabled                | Whether to disable                                                                                    | boolean         | -       | false                                | 1.14.0 |
| background-color        | Background color                                                                                      | string          | -       | #F5F7FA                              | 1.14.0 |
| active-background-color | Active background color                                                                               | string          | -       | #49C75F                              | 1.14.0 |
| icon                    | Slider icon name                                                                                      | string          | -       | a-chevron-rightdouble                | 1.14.0 |
| success-icon            | Success icon name                                                                                     | string          | -       | check                                | 1.14.0 |
| icon-size               | Icon size (unit: px)                                                                                  | number / string | -       | 20                                   | 1.14.0 |
| success-icon-size       | Success icon size (unit: px)                                                                          | number / string | -       | 12                                   | 1.14.0 |

## Events

| Event Name | Description                          | Parameters | Version          |
| ---------- | ------------------------------------ | ---------- | ---------------- |
| success    | Triggered when verification succeeds | -          | 1.14.0 |
| fail       | Triggered when verification fails    | -          | 1.14.0 |

## Methods

You can get the component instance through ref and call the methods provided by the component:

| Method | Description                                           | Parameters | Version          |
| ------ | ----------------------------------------------------- | ---------- | ---------------- |
| reset  | Reset the verification component to its initial state | -          | 1.14.0 |

## Slots API

| Slot Name    | Description                        | Version          |
| ------------ | ---------------------------------- | ---------------- |
| text         | Custom prompt text content         | 1.14.0 |
| success-text | Custom success prompt text content | 1.14.0 |
| icon         | Custom slider icon                 | 1.14.0 |
| success-icon | Custom success icon                | 1.14.0 |

## External Style Classes

| Class Name   | Description     | Version          |
| ------------ | --------------- | ---------------- |
| custom-class | Root node style | 1.14.0 |
| custom-style | Root node style | 1.14.0 |
