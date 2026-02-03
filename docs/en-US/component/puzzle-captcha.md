---
version: $LOWEST_VERSION$
---

# PuzzleCaptcha

A puzzle-based captcha component for human verification scenarios.

## Basic Usage

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  @success="onSuccess()"
  @fail="onFail()"
></wd-puzzle-captcha>
```

```ts
function onSuccess() {
  console.log('verify success')
}

function onFail() {
  console.log('verify fail')
}
```

## Update Background Image

When the number of failures exceeds the `retry-count`, or when the `refreshable` attribute is enabled and the user
clicks the refresh button, the `update-image` event will be triggered to update the background image.

Listen to the `update-image` event and update `image-url` in the callback. You can use `loading` to control the loading
state.

```html
<wd-puzzle-captcha
  :image-url="state.image"
  :loading="state.loading"
  refreshable
  @success="onSuccess()"
  @update-image="onUpdateImage()"
></wd-puzzle-captcha>
```

```ts
const state = reactive({
  image: `https://picsum.photos/320/200?t=${Date.now()}`,
  loading: false
})

function onUpdateImage() {
  state.loading = true

  // Simulate an API request
  setTimeout(() => {
    state.image = `https://picsum.photos/320/200?t=${Date.now()}`
    state.loading = false
  }, 500)
}
```

## Puzzle Shape

The default puzzle shape is `puzzle`. Available values are:

* puzzle: puzzle piece
* shield: shield
* rect: rectangle
* triangle: triangle

You can configure the puzzle width and height using `puzzle-width` and `puzzle-height`.

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  puzzle-shape="shield"
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## Decoy Mode

Enabling `decoy-mode` will generate one additional decoy cutout.

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  decoy-mode
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## Strict Mode

By default, only the final position of the puzzle is validated. When `strict-mode` is enabled, the sliding trajectory
will also be validated.

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  strict-mode
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## Disabled State

Disable slider dragging by using the `disabled` attribute.

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  disabled
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## Reset Method

Use `ref` to obtain the component instance and call the `reset(update?: boolean)` method to reset the verification
state.

`update` is optional. If it is set to `true`, the `update-image` event will be triggered.

```html
<wd-puzzle-captcha
  ref="captchaEl"
  image-url="https://picsum.photos/320/200"
  @success="onSuccess()"
></wd-puzzle-captcha>
```

```ts
// uni_modules
import type { PuzzleCaptchaInstance } from "@/uni_modules/wot-design-uni/components/wd-puzzle-captcha/types"
// npm
// import type { PuzzleCaptchaInstance } from "wot-design-uni/components/wd-puzzle-captcha/types"

const captchaEl = ref<PuzzleCaptchaInstance>()

function reset() {
  captchaEl.value?.reset()
}
```

## Usage in Popup

When used inside a popup, you can enable the `closable` attribute and listen to the `close` event to close the popup.

::: warning Notice

Since the component uses canvas internally to draw the puzzle, in mini-program environments the popup animation’s
`transform` may affect the canvas and cause incorrect canvas size, leading to rendering failure. Therefore, the captcha
component should be mounted only after the popup animation has finished.

:::

```html
<wd-popup
  v-model="state.visible"
  custom-style="border-radius: 32rpx"
  @after-enter="state.render = true"
  @after-leave="state.render = false"
>
  <wd-puzzle-captcha
    v-if="state.render"
    image-url="https://picsum.photos/320/200"
    closable
    @success="onSuccess()"
    @close="state.visible = false"
  ></wd-puzzle-captcha>
</wd-popup>

<wd-button @click="state.visible = true">Verify</wd-button>
```

```ts
const state = reactive({
  visible: false,
  render: false
})
```

## Attributes

| Parameter     | Description                                           | Type            | Accepted Values                   | Default Value                          | Minimum Version  |
|---------------|-------------------------------------------------------|-----------------|-----------------------------------|----------------------------------------|------------------|
| title         | Title                                                 | string          | -                                 | Security Verification                  | $LOWEST_VERSION$ |
| placeholder   | Operation prompt text                                 | string          | -                                 | Drag the slider to complete the puzzle | $LOWEST_VERSION$ |
| image-url     | Background image (required)                           | string          | -                                 | -                                      | $LOWEST_VERSION$ |
| image-width   | Background image width (px)                           | number / string | -                                 | 320                                    | $LOWEST_VERSION$ |
| image-height  | Background image height (px)                          | number / string | -                                 | 200                                    | $LOWEST_VERSION$ |
| puzzle-shape  | Puzzle shape                                          | string          | puzzle / shield / rect / triangle | puzzle                                 | $LOWEST_VERSION$ |
| puzzle-width  | Puzzle width (px)                                     | number / string | -                                 | 40                                     | $LOWEST_VERSION$ |
| puzzle-height | Puzzle height (px)                                    | number / string | -                                 | 40                                     | $LOWEST_VERSION$ |
| loading       | Whether in loading state                              | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| tolerance     | Tolerance range (px)                                  | number / string | -                                 | 6                                      | $LOWEST_VERSION$ |
| strict-mode   | Enable strict mode                                    | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| decoy-mode    | Enable decoy cutout                                   | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| retry-count   | Retry limit before triggering background image update | number / string | -                                 | 3                                      | $LOWEST_VERSION$ |
| disabled      | Whether disabled                                      | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| refreshable   | Whether to show refresh button                        | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| closable      | Whether to show close button                          | boolean         | -                                 | false                                  | $LOWEST_VERSION$ |
| tracker-icon  | Slider icon                                           | string          | -                                 | a-chevron-rightdouble                  | $LOWEST_VERSION$ |
| success-icon  | Success icon                                          | string          | -                                 | check                                  | $LOWEST_VERSION$ |
| success-text  | Success message                                       | string          | -                                 | Verification successful                | $LOWEST_VERSION$ |
| fail-text     | Failure message                                       | string          | -                                 | Verification failed, please try again  | $LOWEST_VERSION$ |

## Events

| Event Name   | Description             | Parameters | Minimum Version  |
|--------------|-------------------------|------------|------------------|
| update-image | Update background image | -          | $LOWEST_VERSION$ |
| success      | Verification successful | -          | $LOWEST_VERSION$ |
| fail         | Verification failed     | -          | $LOWEST_VERSION$ |
| close        | Close button clicked    | -          | $LOWEST_VERSION$ |

## Methods

| Method | Description                                                                      | Parameters                   | Minimum Version  |
|--------|----------------------------------------------------------------------------------|------------------------------|------------------|
| reset  | Reset the captcha to its initial state (`update = true` triggers `update-image`) | `(update?: boolean) => void` | $LOWEST_VERSION$ |

## External Style Classes

| Class Name   | Description        | Minimum Version  |
|--------------|--------------------|------------------|
| custom-class | Root element style | $LOWEST_VERSION$ |
