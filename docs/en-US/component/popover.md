# Popover

Commonly used to display tooltip information.

## Basic Usage

Popover's properties are very similar to [Tooltip](/component/tooltip.html). Therefore, for duplicate properties, please refer to the [Tooltip](/component/tooltip.html) documentation, which will not be explained in detail here.

Since `uni-app` components cannot listen for clicks outside themselves, to automatically close the `popover` when clicking elsewhere on the page, it is recommended to use the component library's `useQueue` hook (which will close all dropmenu, popover, toast, swipeAction, fab) and listen for click event bubbling on the page's root element.

:::warning
If there is a scenario where users manually click somewhere outside the `popover` (like a button) to open the `popover`, you need to add click event propagation prevention on the clicked element (in this case, the button) to prevent the event from bubbling up to the root element and triggering `closeOutside`, which would close the `popover` that should be manually opened.
:::

```html
<view @click="closeOutside">
  <wd-popover content="This is a message." @change="handleChange">
    <wd-button>Click to show</wd-button>
  </wd-popover>
</view>
```

```typescript
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()
function handleChange({ show }) {
  console.log(show)
}
```

## Mode

Use the `mode` property to control the display mode of the current tooltip. `mode` can be either `normal` or `menu`:

- **normal** (Normal text mode):

  - When `mode` is in default state, pass the `String` to be displayed to the `content` property.

- **menu** (List mode):
  - The tooltip will be displayed in list form. In this case, the `content` property should be an `Array` type, with the object data structure in the array as shown in the list below.
  - Bind the `menuclick` event, which executes operations and closes the list after selection.

Data structure of objects in the `content` array for list mode:

| Key | Description | Type | Required | Version |
|-----|-------------|------|----------|----------|
| content | Option name | string | Yes | - |
| iconClass (if not set, only title is shown) | Option value | string | No | - |

**Note: The iconClass property value should be an internal icon name from the component library.**

```html
<wd-popover mode="menu" :content="menu" @menuclick="link" @change="handleChange">
  <wd-button>List</wd-button>
</wd-popover>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

const menu = ref<Array<Record<string, any>>>([{
  iconClass: 'read',
  content: 'Mark all as read'
}, {
  iconClass: 'delete',
  content: 'Clear recent conversations'
}, {
  iconClass: 'detection',
  content: 'Message subscription settings'
}, {
  iconClass: 'subscribe',
  content: 'Message anomaly detection'
}])

function link(e) {
  toast.show('Selected ' + e.item.content)
}
```

## Nested Information

Enable the `use-content-slot` property and use the `content` slot to nest various types of information in the Popover.
:::warning Note
Currently, when using the `content` slot, the component cannot correctly obtain the bubble's width and height. In this case, offset `placement` settings like `bottom-end` will not take effect.
:::

```html
<wd-popover use-content-slot>
  <template #content>
    <view class="pop-content">This is content with custom style.</view>
  </template>
  <wd-button>Click to show</wd-button>
</wd-popover>
```

```scss
.pop-content {
  /* Required start */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* Required end */
  background: #fff;
  color: #8268de;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
}
```

## Popover Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Manual visibility state | boolean | - | false | - |
| content | Content to display, can also be passed through `slot#content` | string/array (when in menu mode, content property format is Array) | - | - | - |
| mode | Current display mode, determines content presentation form | string | normal (normal mode) / menu (menu mode) | normal | - |
| placement | Popover appearance position | string | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom | - |
| visible-arrow | Whether to show popover arrow | boolean | - | true | - |
| disabled | Whether popover is disabled | boolean | - | false | - |
| offset | Offset of appearance position | number | - | 0 | - |

## Slot

| Name | Description | Version |
|------|-------------|----------|
| content | Multi-line content or user-defined style | - |

## Events

| Event Name | Description | Callback Parameters | Version |
|------------|-------------|-------------------|----------|
| open | Triggered when shown | - | - |
| close | Triggered when hidden | - | - |
| change | Triggered when pop visibility changes | - | - |
| menuclick | Triggered when clicking an option in menu mode | `{ item, index }` | - |

## Methods

| Method Name | Description | Parameters | Version |
|-------------|-------------|------------|----------|
| open | Open tooltip dialog | - | - |
| close | Close tooltip dialog | - | - |

## Popover External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-arrow | Arrow style | - |
| custom-pop | Tooltip style | - |