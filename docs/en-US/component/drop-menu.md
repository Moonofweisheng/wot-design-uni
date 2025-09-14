# DropMenu Drop-down Menu

A menu list that drops down or up.

## Basic Usage

Basic usage requires binding a `v-model` value and the `options` property.

The `options` property is a one-dimensional object array, where each array item's data structure includes: label (option text), value (option value), tip (option description).

Since `uni-app` components cannot listen for clicks outside themselves, to automatically close the `dropmenu` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab), and listen for click event bubbling on the page's root element.

:::warning
If there is a scenario where the user manually clicks somewhere outside the `dropmenu` like a button to open the `dropmenu`, then you need to add @click to the clicked element (in this case the button) to prevent event bubbling to the root element, avoiding triggering `closeOutside` which would close the `dropmenu` that should be manually opened.
:::

```html
<view @click="closeOutside">
  <wd-drop-menu>
    <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
    <wd-drop-menu-item v-model="value2" :options="option2" @change="handleChange2" />
  </wd-drop-menu>
</view>
```

```typescript
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()
const value1 = ref<number>(0)
const value2 = ref<number>(0)

const option1 = ref<Record<string, any>[]>([
  { label: 'All Products', value: 0 },
  { label: 'New Products', value: 1 },
  { label: 'Promotional Products', value: 2 }
])
const option2 = ref<Record<string, any>[]>([
  { label: 'Comprehensive', value: 0 },
  { label: 'Sales', value: 1 },
  { label: 'Listing Time', value: 2 }
])

function handleChange1({ value }) {
  console.log(value)
}
function handleChange2({ value }) {
  console.log(value)
}
```

## Custom Menu Content

You can customize the content of `DropMenuItem` through the `default` slot. In this case, you need to use the instance's `close` method to manually control the menu's closure.

You can set the menu title through `title`.

> Don't pass in options and value at this time

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" @change="handleChange" />
  <wd-drop-menu-item title="Filter" ref="dropMenu" @opened="handleOpened">
    <view>
      <wd-slider v-model="sliderValue" ref="slider" />
      <wd-cell title="Title Text" value="Content" />
      <wd-cell title="Title Text" label="Description" value="Content" />
      <wd-button block size="large" suck @click="confirm">Primary Button</wd-button>
    </view>
  </wd-drop-menu-item>
</wd-drop-menu>
```

```typescript
const dropMenu = ref()
const slider = ref<SliderInstance>() // slider 1.2.25 supported

const value = ref<number>(0)
const sliderValue = ref<number>(30)
const option = ref<Record<string, any>[]>([
  { label: 'All Products', value: 0 },
  { label: 'New Products', value: 1 },
  { label: 'Promotional Products', value: 2 }
])
function handleChange({ value }) {
  console.log(value)
}

function confirm() {
  dropMenu.value.close()
}

function handleOpened() {
  slider.value?.initSlider()
}
```

## Custom Menu Options

Create custom filter display using flex layout.

```html
<view style="display: flex; background: #fff; text-align: center;">
  <wd-drop-menu style="flex: 1; min-width: 0;">
    <wd-drop-menu-item v-model="value1" :options="option" @change="handleChange1" />
  </wd-drop-menu>
  <view style="flex: 1;">
    <wd-sort-button v-model="value2" title="Listing Time" @change="handleChange2" />
  </view>
</view>
```

## Custom Menu Icon<el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.3.7</el-tag>

You can set the menu's right icon through `icon`, equivalent to the `name` property of `<wd-icon />`. Set the icon size through `icon-size`, equivalent to the `size` property of `<wd-icon />`.

```html
<wd-drop-menu>
  <wd-drop-menu-item title="Map" icon="location" icon-size="14px" />
</wd-drop-menu>
```

## Asynchronous Open/Close<el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.3.7</el-tag>

Set the `before-toggle` function to execute specific logic before the dropdown menu opens or closes, achieving the purpose of state change validation and asynchronous open/close. `before-toggle` accepts { status: current operation type: true to open dropdown menu, false to close dropdown menu, resolve }, can validate the operation, and inform the component whether to confirm through the resolve function. resolve accepts a boolean value, resolve(true) means the option is approved, resolve(false) means the option is not approved, and when not approved, the close or expand operation will not be executed.

:::warning Note
The `before-toggle` function cannot prevent the expansion/closure operations of other `drop-menu` or other `drop-menu-item`, it is limited to the expansion/closure operation of the current `drop-menu-item`.
:::

```html
<wd-message-box></wd-message-box>
<wd-drop-menu>
  <wd-drop-menu-item v-model="value" :options="option" :before-toggle="handleBeforeToggle" />
</wd-drop-menu>
```

```typescript
import { useMessage } from '@/uni_modules/wot-design-uni'
import type { DropMenuItemBeforeToggle } from '@/uni_modules/wot-design-uni/components/wd-drop-menu-item/types'

const messageBox = useMessage()

const value = ref<number>(0)

const option = ref<Record<string, any>[]>([
  { label: 'All Products', value: 0 },
  { label: 'New Products', value: 1 },
  { label: 'Promotional Products', value: 2 }
])

// Confirm whether to open/close the dropdown menu through dialog
const handleBeforeToggle: DropMenuItemBeforeToggle = ({ status, resolve }) => {
  messageBox
    .confirm({
      title: `Asynchronous ${status ? 'Open' : 'Close'}`,
      msg: `Are you sure you want to ${status ? 'open' : 'close'} the dropdown menu?`
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      resolve(false)
    })
}
```

## Expand Upward

Set the `direction` property value to `up`, and the menu will expand upward

```html
<wd-drop-menu direction="up">
  <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
  <wd-drop-menu-item v-model="value2" :options="option2" @change="handleChange2" />
</wd-drop-menu>
```

## Disable Menu

```html
<wd-drop-menu>
  <wd-drop-menu-item v-model="value1" disabled :options="option2" @change="handleChange1" />
  <wd-drop-menu-item v-model="value2" :options="option1" @change="handleChange2" />
</wd-drop-menu>
```

## DropMenu Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| direction | Menu expansion direction, can be `up` or `down` | string | up / down | down | - |
| modal | Whether to show overlay | boolean | - | true | - |
| close-on-click-modal | Whether to close when clicking overlay | boolean | - | true | - |
| duration | Menu expand/collapse animation time in ms | number | - | 200 | - |

## DropMenuItem Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Selected value | string / number | - | - | - |
| disabled | Whether disabled | boolean | - | false | - |
| title | Title | string | - | - | - |
| options | Option array | array | - | - | - |
| icon | Right icon name | string | - | arrow-down | 1.3.7 |
| icon-size | Right icon size | string | - | 12px | 1.3.7 |
| before-toggle | Function executed before toggle | function(status: boolean, resolve: Function) | - | - | 1.3.7 |
| value-key | Key for value in options object | string | - | value | - |
| label-key | Key for display text in options object | string | - | label | - |
| tip-key | Key for option description in options object | string | - | tip | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | false | 1.11.0 |
| icon-name | Selected icon name (available names in wd-icon component) | string | - | check | - |

## DropMenu Slot

| Name | Description | Version |
|------|-------------|----------|
| default | Menu content | - |

## DropMenuItem Slot

| Name | Description | Version |
|------|-------------|----------|
| default | Custom inner content of menu | - |

## DropMenu External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style class of DropMenu | - |

## DropMenuItem External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style class of DropMenuItem | - |
| custom-title | Style class for left text of DropMenuItem | - |
| custom-icon | Style class for right icon of DropMenuItem | - |
| custom-popup-class | Custom popup style class for dropdown menu | 1.5.0 |
| custom-popup-style | Custom popup style for dropdown menu | 1.5.0 |