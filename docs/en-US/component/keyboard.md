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

## Attributes

| Attribute | Description | Type | Default | Version |
|---------|-------------|------|---------|------|
| v-model:visible | Whether to display keyboard | boolean | false | - |
| v-model | Keyboard input value | string | - | - |
| maxlength | Maximum input length | number | - | - |
| title | Keyboard title | string | - | - |
| mode | Keyboard mode, can be set to `custom` or `car` | string | - | - |
| close-text | Text of close button | string | - | - |
| extra-key | Content of extra key | string / string[] | - | - |
| random-key-order | Whether to randomly arrange number keys | boolean | false | - |
| show-close-button | Whether to show close button | boolean | true | - |
| safe-area-inset-bottom | Whether to enable bottom safe area adaptation | boolean | true | - |
| z-index | Keyboard z-index | number | 100 | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | false | 1.11.0 |

## Events

| Event | Description | Parameters |
|-------|-------------|------------|
| input | Triggered when a key is pressed | key: The pressed key |
| delete | Triggered when delete key is pressed | - |
| close | Triggered when keyboard is closed | - |

## Slots

| Name | Description |
|------|-------------|
| title | Custom title content |