---
version: 1.6.0
---
# Signature

A signature component based on Canvas for signature scenarios. Provides basic signature, history record, and pressure effect features.

:::tip Reminder
If you encounter unclear exported images, you can set `exportScale` to `2` or higher.
:::

## Basic Usage

Basic electronic signature functionality. After signing, the signature image will be displayed using the preview component.

```html
<wd-signature @confirm="confirm" @clear="clear" :export-scale="2" background-color="#ffffff" />
```

```typescript
const img = ref<Partial<SignatureResult>>({})

function confirm(result: SignatureResult) {
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function clear() {
  img.value = {}
}
```

## History Record

Enable history record functionality through `enable-history`, allowing undo and redo operations.

```html
<wd-signature enable-history background-color="#f5f5f5" />
```

## Pressure Mode

Enable pressure mode through `pressure` to simulate real writing effects. In pressure mode, stroke thickness varies with writing speed.

### Basic Pressure Effect

```html
<wd-signature pressure :height="300" />
```

:::tip Usage Suggestions
1. Recommended parameter ranges for pressure mode:
   - min-width: 1-2
   - max-width: 4-6
   - min-speed: 1-2
2. The difference between max-width and min-width should be kept between 3-5
3. The smaller the min-speed value, the more sensitive the pressure, adjust according to actual writing habits
4. For signature scenarios, it's recommended to set the canvas height between 300-400
:::

### Custom Pressure Parameters

You can precisely control the pressure effect through these properties:
- `min-width`: Minimum stroke width, line thickness when writing quickly
- `max-width`: Maximum stroke width, line thickness when writing slowly
- `min-speed`: Speed threshold, used to adjust pressure sensitivity

```html
<wd-signature 
  pressure 
  :height="300" 
  :min-width="1" 
  :max-width="6" 
  :min-speed="1.5"
  background-color="#f5f5f5"
/>
<view class="tip-text">Fast writing produces thin lines, slow writing produces thick lines</view>
```

### Pressure Mode + History Record

Pressure mode can be combined with history record functionality, supporting undo and redo operations for strokes with pressure effects.

```html
<wd-signature 
  pressure 
  enable-history 
  :height="300" 
  :min-width="1" 
  :max-width="6"
  background-color="#f5f5f5" 
/>
<view class="tip-text">Combined with history record, supporting undo and redo of pressure effects</view>
```

## Custom Features

### Custom Buttons

Customize bottom buttons through the `footer` slot.

```html
<wd-signature :disabled="disabled" enable-history :step="3">
  <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
    <wd-button block @click="changeDisabled" v-if="disabled">Start Signing</wd-button>
    <block v-if="!disabled">
      <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">Undo</wd-button>
      <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">Redo</wd-button>
      <wd-button size="small" plain @click="clear">Clear</wd-button>
      <wd-button size="small" @click="confirm">Confirm</wd-button>
    </block>
  </template>
</wd-signature>
```

```typescript
const disabled = ref(true)

function changeDisabled() {
  disabled.value = false
}
```

### Custom Pen

You can customize the pen color and width.

```html
<wd-signature pen-color="#0083ff" :line-width="4" />
```

### Using in Popup

Use the signature pad in a popup by combining with the `wd-popup` component. It's recommended to call the signature pad's `init` method in the `after-enter` event to ensure proper initialization.

```html
<wd-button type="primary" @click="show = true">Open Signature Pad</wd-button>

<wd-popup 
  v-model="show" 
  closable
  safe-area-inset-bottom
  position="bottom"
  custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
  @after-enter="signatureRef?.init()"
>
  <wd-signature 
    ref="signatureRef"
    :height="300"
    enable-history
    pressure
    background-color="#f5f5f5"
    @confirm="handleConfirm" 
  />
</wd-popup>

<wd-img v-if="img.tempFilePath" mode="widthFix" width="100%" :src="img.tempFilePath" />
```

```typescript
import { ref } from 'vue'
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'

const show = ref(false)
const img = ref<Partial<SignatureResult>>({})
const signatureRef = ref<SignatureInstance>()

function handleConfirm(result: SignatureResult) {
  show.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}
```

```scss
.popup-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

:::tip Tips
When using the signature pad in a popup, it's recommended to:
1. Enable `closable` to show the close button
2. Set `safe-area-inset-bottom` to adapt to the bottom safe area
3. Use `custom-style` to adjust popup padding, leaving space for the close button
4. Call the signature pad's `init` method in the popup's `after-enter` event to ensure proper initialization
:::

### Landscape Signature Page

You can create a landscape signature page by configuring the page's `pageOrientation`.

## Attributes

| Attribute | Description | Type | Default | Version |
|-----------|-------------|------|---------|------|
| height | Canvas height | number | 200 | - |
| line-width | Line width | number | 3 | - |
| pen-color | Pen color | string | '#000000' | - |
| background-color | Background color | string | '#ffffff' | - |
| export-scale | Export scale | number | 1 | - |
| pressure | Enable pressure mode | boolean | false | - |
| min-width | Minimum line width in pressure mode | number | 2 | - |
| max-width | Maximum line width in pressure mode | number | 6 | - |
| min-speed | Speed threshold in pressure mode | number | 1.5 | - |
| enable-history | Enable history record | boolean | false | - |
| step | Maximum number of history records | number | 20 | - |
| disabled | Whether to disable | boolean | false | - |
| width | Canvas width | number | 300 | - |
| clear-text | Clear button text | string | - | - |
| confirm-text | Confirm button text | string | - | - |
| file-type | Export image type | string | png | - |
| quality | Export image quality(0-1) | number | 1 | - |
| disable-scroll | Whether to disable canvas scroll | boolean | true | - |

## Events

| Event | Description | Parameters | Version |
|-------|-------------|------------|------|
| confirm | Triggered when confirming signature | result: SignatureResult | - |
| clear | Triggered when clearing signature | - | - |
| change | Triggered when content changes | - | - |
| start | Triggered when starting signature | event: TouchEvent | - |
| end | Triggered when ending signature | event: TouchEvent | - |
| signing | Triggered during signature | event: TouchEvent | - |

## Methods

| Method | Description | Parameters | Version |
|--------|-------------|------------|------|
| init | Initialize signature pad | forceUpdate?: boolean | - |
| clear | Clear the signature | - | - |
| confirm | Confirm and export the signature | - | - |
| revoke | Undo operation | - | - |
| restore | Redo operation | - | - |

## Slots

| Name | Description | Parameters | Version |
|------|-------------|------------|------|
| footer | Custom footer content | `{ clear, confirm, restore, revoke, currentStep, historyList }` | - |