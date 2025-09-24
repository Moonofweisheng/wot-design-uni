# NumberKeyboard

Virtual numeric keyboard, used for inputting numbers, passwords, or ID cards and other scenarios.

:::danger Warning⚠️
The virtual numeric keyboard functionality has been moved to the [KeyBoard](./keyboard) component. Please migrate as soon as possible. This component will be deprecated in version `1.10`.
:::

## Basic Usage

You can control whether the keyboard is displayed through `v-model:visible`.

```html
<wd-cell title="Default Keyboard" is-link @click="showKeyBoard" />

<wd-number-keyboard v-model:visible="visible" @input="onInput" @delete="onDelete"></wd-number-keyboard>
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

Set the `mode` property to `custom` to display the keyboard's right sidebar, commonly used in amount input scenarios.

```html
<wd-cell title="Keyboard with Right Sidebar" is-link @click="showKeyBoard" />

<wd-number-keyboard v-model:visible="visible" mode="custom" extra-key="." close-text="Done" @input="onInput" @delete="onDelete"></wd-number-keyboard>
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

You can set the content of the bottom-left button through the `extra-key` property. For example, when inputting an ID card number, you can set `extra-key` to `X`.

```html
<wd-cell title="ID Card Keyboard" is-link @click="showKeyBoard" />

<wd-number-keyboard v-model:visible="visible" extra-key="X" close-text="Done" @input="onInput" @delete="onDelete" />
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

## Keyboard with Title

You can set the keyboard title through the `title` property.

```html
<wd-cell title="Keyboard with Title" is-link @click="showKeyBoard" />

<wd-number-keyboard v-model:visible="visible" title="Enter Password" extra-key="." close-text="Done" @input="onInput" @delete="onDelete" />
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

<wd-number-keyboard v-model:visible="visible" extra-key="." close-text="Done" @input="onInput" @delete="onDelete">
  <template #title>
    <text style="color: red">Custom Title</text>
  </template>
</wd-number-keyboard>
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

<wd-number-keyboard v-model:visible="visible" mode="custom" :extra-key="['00', '.']" close-text="Done" @input="onInput" @delete="onDelete" />
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

You can randomly arrange the number keyboard through the `random-key-order` property, commonly used in scenarios with high security requirements.

```html
<wd-cell title="Random Number Keyboard" is-link @click="showKeyBoard" />

<wd-number-keyboard v-model:visible="visible" random-key-order @input="onInput" @delete="onDelete" />
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

You can bind the current input value of the keyboard through `v-model` and limit the input length through the `maxlength` property.

```html
<wd-cell title="Two-way Binding" :value="value1" is-link @click="showKeyBoard" />
<wd-number-keyboard
  v-model="value1"
  :maxlength="6"
  v-model:visible="visible"
  title="Keyboard Title"
  extra-key="."
  close-text="Done"
  @input="onInput"
  @delete="onDelete"
></wd-number-keyboard>
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

## Show Modal Overlay

`hideOnClickOutside` controls whether the keyboard popup has an overlay, and `modal` controls whether the overlay is transparent.

::: tip Note
Currently, `modal` only controls whether the overlay is transparent, while `hideOnClickOutside` controls whether the popup has an overlay. When there is an overlay, clicking it can close the keyboard, but when the keyboard is expanded, you must close the current keyboard by clicking the overlay before clicking other buttons. You can also disable `hideOnClickOutside` and manually control whether the keyboard is displayed to achieve more flexible behavior when clicking outside.
:::

## Attributes
| Parameter | Description | Type | Accepted Values | Default | Version |
|-----------|-------------|------|-----------------|---------|----------|
| v-model | Current input value | string | - | - | - |
| v-model:visible | Whether to show keyboard | boolean | - | `false` | - |
| title | Keyboard title | string | - | - | - |
| mode | Keyboard mode | string | `default` `custom` | `default` | - |
| maxlength | Maximum input length | number | - | - | - |
| transition | Whether to show transition animation | boolean | - | `true` | - |
| show-close-button | Whether to show close button | boolean | - | `true` | - |
| close-text | Close button text | string | - | - | - |
| extra-key | Content of bottom left button | string / string[] | - | - | - |
| z-index | Keyboard z-index | number | - | `100` | - |
| random-key-order | Whether to shuffle keyboard keys | boolean | - | `false` | - |
| hide-on-click-outside | Whether to hide keyboard when clicking outside | boolean | - | `true` | - |
| modal | Whether to show transparent modal | boolean | - | `true` | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | `false` | 1.11.0 |

## Events
| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| input | Triggered when a key is pressed | key: string | - |
| delete | Triggered when delete key is pressed | - | - |
| close | Triggered when close button is clicked | - | - |
| blur | Triggered when keyboard is hidden | - | - |
| show | Triggered when keyboard is shown | - | - |

## Slots
| Name | Description | Version |
|------|-------------|----------|
| title | Custom title content | - |