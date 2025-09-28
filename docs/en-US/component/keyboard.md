---
version: 1.3.10
---

# Keyboard

Virtual keyboard for inputting numbers, passwords, ID cards, or license plate numbers.

## Basic Usage

You can control the keyboard's visibility through `v-model:visible`.

```html
<wd-cell title="Default Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Keyboard with Right Sidebar

Set the `mode` property to `custom` to display the keyboard's right sidebar, commonly used for inputting amounts.

```html
<wd-cell title="Keyboard with Right Sidebar" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="Done" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## ID Card Keyboard

You can set the content of the bottom-left button through the `extra-key` property. For example, when inputting ID card numbers, you can set `extra-key` to `X`.

```html
<wd-cell title="ID Card Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="X" close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## License Plate Keyboard

Set the `mode` property to `car` to display the license plate keyboard, commonly used for inputting license plate numbers.

```html
<wd-cell title="License Plate Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## License Plate Keyboard Language Control

You can control the language mode of the license plate keyboard through the `car-lang` property, supporting Chinese provinces (`zh`) and English letters (`en`). Use the `auto-switch-lang` property to control whether to automatically switch languages.

```html
<!-- Controlled mode: Manual language switching -->
<wd-cell title="License Plate Keyboard (Controlled)" :value="value" is-link @click="showKeyBoard" />

<wd-keyboard v-model="value" v-model:visible="visible" v-model:car-lang="lang" mode="car" @input="onInput" @delete="onDelete"></wd-keyboard>

<!-- Uncontrolled mode: Disable auto-switching -->
<wd-cell title="License Plate Keyboard (No Auto-switch)" :value="value2" is-link @click="showKeyBoard2" />

<wd-keyboard v-model="value2" v-model:visible="visible2" mode="car" auto-switch-lang @input="onInput" @delete="onDelete"></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const value = ref<string>('')
const value2 = ref<string>('')
const lang = ref<'zh' | 'en'>('zh')

function showKeyBoard() {
  visible.value = true
}

function showKeyBoard2() {
  visible2.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Keyboard with Title

You can set the keyboard title through the `title` property.

```html
<wd-cell title="Keyboard with Title" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" title="Enter Password" extra-key="." close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Custom Title Using Slot

```html
<wd-cell title="Custom Title Using Slot" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" extra-key="." close-text="Done" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">Custom Title</text>
  </template>
</wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Multiple Extra Keys

When `mode` is set to `custom`, you can configure two `extra-key` values in array form.

```html
<wd-cell title="Multiple Extra Keys" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="Done" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Random Number Keyboard

You can randomly arrange the number keyboard through the `random-key-order` property, commonly used in high-security scenarios.

```html
<wd-cell title="Random Number Keyboard" is-link @click="showKeyBoard" />

<wd-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Two-way Binding

You can bind the keyboard's current input value through `v-model` and limit the input length through the `maxlength` property.

```html
<wd-cell title="Two-way Binding" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="Keyboard Title"
  extra-key="."
  close-text="Done"
  @input="onInput"
  @delete="onDelete"
></wd-keyboard>
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Display Modal Overlay

`hideOnClickOutside` controls whether the keyboard popup has an overlay, and `modal` controls whether the overlay is transparent.

::: tip
Currently `modal` only controls whether the overlay is transparent, `hideOnClickOutside` controls whether the popup has an overlay. When there is an overlay, clicking the overlay can close the keyboard, but when the keyboard is open, you must click the overlay to close the current keyboard before you can click other buttons. You can also disable `hideOnClickOutside` and manually control whether the keyboard is displayed to implement closing the keyboard when clicking outside, which is more flexible.
:::

```html
<wd-cell title="Two-way Binding" :value="value1" is-link @click="showKeyBoard" />
<wd-keyboard :modal="true" :hide-on-click-outside="true" v-model:visible="visible" @input="onInput" @delete="onDelete" />
```

```ts
const { show: showToast } = useToast()
const visible = ref<boolean>(false)
const value1 = ref<string>('')

function showKeyBoard() {
  visible.value = true
}

const onInput = (value) => showToast(`${value}`)
const onDelete = () => showToast('Delete')
```

## Attributes

| Parameter           | Description                                                                                                           | Type                  | Options                    | Default    | Version |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------- | ---------- | ------- |
| v-model:visible     | Whether to display                                                                                                    | `boolean`             | -                          | `false`    | 1.3.10  |
| v-model             | Bound value                                                                                                           | `string`              | -                          | -          | 1.3.10  |
| title               | Title                                                                                                                 | `string`              | -                          | -          | 1.3.10  |
| mode                | Keyboard mode                                                                                                         | `string`              | `default`, `car`, `custom` | `default`  | 1.3.10  |
| zIndex              | Z-index                                                                                                               | `number`              | -                          | `100`      | 1.3.10  |
| maxlength           | Maximum length                                                                                                        | `number`              | -                          | `Infinity` | 1.3.10  |
| showDeleteKey       | Whether to show delete key                                                                                            | `boolean`             | -                          | `true`     | 1.3.10  |
| randomKeyOrder      | Whether to randomize keyboard key order                                                                               | `boolean`             | -                          | `false`    | 1.3.10  |
| closeText           | Confirm button text                                                                                                   | `string`              | -                          | -          | 1.3.10  |
| deleteText          | Delete button text                                                                                                    | `string`              | -                          | -          | 1.3.10  |
| closeButtonLoading  | Whether close button shows loading state                                                                              | `boolean`             | -                          | `false`    | 1.3.10  |
| modal               | Whether to show modal overlay                                                                                         | `boolean`             | -                          | `false`    | 1.3.10  |
| hideOnClickOutside  | Whether to close keyboard when clicking outside                                                                       | `boolean`             | -                          | `true`     | 1.3.10  |
| lockScroll          | Whether to lock background scroll, when locked, content in the overlay will also not scroll                           | `boolean`             | -                          | `true`     | 1.3.10  |
| safeAreaInsetBottom | Whether to enable bottom safe area                                                                                    | `boolean`             | -                          | `true`     | 1.3.10  |
| extraKey            | Extra key                                                                                                             | `string` / `string[]` | -                          | -          | 1.3.10  |
| root-portal         | Whether to detach from the page, used to solve various fixed positioning issues                                       | `boolean`             | -                          | `false`    | 1.11.0  |
| v-model:carLang     | License plate keyboard language mode, effective when mode=car                                                         | `string`              | `zh`, `en`                 | -          | 1.13.0  |
| autoSwitchLang      | Whether to automatically switch license plate keyboard language, effective when mode=car and car-lang is uncontrolled | `boolean`             | -                          | `false`    | 1.13.0  |

## Slot

| name  | Description | Type | Version |
| ----- | ----------- | ---- | ------- |
| title | Title       | -    | 1.2.12  |

## Events

| Event Name | Description                                       | Parameters  | Version |
| ---------- | ------------------------------------------------- | ----------- | ------- |
| input      | Triggered when a key is pressed                   | key: string | -       |
| delete     | Triggered when delete key is pressed              | -           | -       |
| close      | Triggered when close button or outside is clicked | -           | -       |

## External Style Classes

| Class Name   | Description           | Version |
| ------------ | --------------------- | ------- |
| custom-class | Root node style class | 1.3.10  |
| custom-style | Root node style       | 1.3.10  |
