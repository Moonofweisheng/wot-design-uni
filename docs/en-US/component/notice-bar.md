# NoticeBar

Notice bar component, used to display notification reminders at the top of the page.

## Basic Usage

Set `text` content and `prefix` left icon.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="warn-bold" />
```

## Type Modification

Set `type` to modify the notification type. There are three types of notifications: `info`|`warning`|`danger`, with default value as `warning`.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="warn-bold" custom-class="space" />
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="check-outline" type="info" custom-class="space" />
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" prefix="wifi-error" type="danger" />
```

```scss
:deep(.space) {
  margin-bottom: 10px;
}
```

## Slot Demo

```html
<wd-notice-bar>
  <template #prefix>
    <wd-icon class="prefix" name="warn-bold">Placeholder</wd-icon>
  </template>
  Notifications may be blocked due to disabled notifications or time period filtering...
  <template #suffix>
    <div style="color: #4d80f0">View</div>
  </template>
</wd-notice-bar>
```

```scss
:deep(.prefix) {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}
```

## Multi-line Display

Set `wrapable` property to `true` and disable scrolling `scrollable` to enable multi-line display.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" wrapable :scrollable="false" />
```

## Closable

Set `closable` property to make the notice bar closable.

```html
<wd-notice-bar text="This is a message notification, this is a message notification, this is a message notification" closable />
```

## Custom Color

Set `color` to modify text and icon color, set `background-color` to modify background color.

```html
<wd-notice-bar
  text="This is a message notification, this is a message notification, this is a message notification"
  prefix="check-outline"
  closable
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

## Multiple Text Carousel

Pass a `string[]` to the `text` property to enable multiple text carousel, and the `next` event will be triggered when displaying the next text. This event receives a `number` parameter representing the current text array index.

```html
<wd-notice-bar :text="textArray" prefix="check-outline" @next="onNext" />
```

```javascript
import { ref } from 'vue'

const textArray = ref([
  'Welcome to wot design uni',
  'This component library is built based on uniapp ->Vue3, ts',
  'Project address: https://github.com/Moonofweisheng/wot-design-uni',
  'Our goal is to create the strongest uniapp component library',
  'Sincerely invite everyone to build together',
  'This is a message notification, this is a message notification, this is a message notification, this is a message notification, this is a message notification'
])

const onNext = (index: number) => {
  console.log('Show next, index: ', index)
  console.log('Text is: ' + textArray.value[index])
}
```

## Vertical Scrolling

1. Pass `vertical` to `direction` to enable vertical scrolling, currently only supports scrolling in one direction
2. Scrolling only occurs when `text` is an array

```html
<wd-notice-bar prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" custom-class="space" />
<wd-notice-bar prefix="warn-bold" direction="vertical" text="Single message won't scroll" :delay="3" custom-class="space" />
```

## Reset Play Animation <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.3.13</el-tag>
Get the component instance through `ref` and call the `reset` method to reset the play animation. When you encounter abnormal play animation of `NoticeBar`, you can call the `reset` method to reset the animation.

For example: In `APP-VUE`, when using `NoticeBar` on the `Tabbar` page, when returning to the `NoticeBar` page from other pages, there may be occasional `NoticeBar` animation abnormalities, at this time you can call the `reset` method to reset the animation.

Reference issues: [#358](https://github.com/Moonofweisheng/wot-design-uni/issues/358), [#650](https://github.com/Moonofweisheng/wot-design-uni/issues/650)

```html
<wd-notice-bar ref="notice" prefix="warn-bold" direction="vertical" :text="textArray" :delay="3" />
<wd-button @click="handleReset">Reset Play Animation</wd-button>
```

```ts
// uni_modules
import { type NoticeBarInstance } from '@/uni_modules/wot-design-uni/components/wd-notice-bar/types'
// npm
// import { type NoticeBarInstance } from 'wot-design-uni/components/wd-notice-bar/types'

const notice = ref<NoticeBarInstance>()

const textArray = ref([
  'Welcome to wot design uni',
  'This component library is built based on uniapp ->Vue3, ts',
  'Project address: https://github.com/Moonofweisheng/wot-design-uni',
  'Our goal is to create the strongest uniapp component library',
  'Sincerely invite everyone to build together',
  'This is a message notification, this is a message notification, this is a message notification, this is a message notification, this is a message notification'
])

function handleReset() {
  notice.value?.reset()
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| text | Set notice bar text | `string` `string[]` | - | - | - |
| type | Set notice bar type | `string` | info / warning / danger | warning | - |
| prefix | Set left icon, use icon name from icon section | `string` | - | - | - |
| scrollable | Whether it can scroll | `boolean` | - | true | - |
| delay | Initial delay of scroll animation, unit seconds(s) | `number` | - | 1 | - |
| speed | Scroll speed, unit px/s | `number` | - | 50 | - |
| closable | Whether it can be closed | `boolean` | - | false | - |
| wrapable | Whether to wrap display | `boolean` | - | false | - |
| color | Text and icon color | `string` | - | - | - |
| background-color | Background color | `string` | - | - | - |
| direction | Scroll direction | `NoticeBarScrollDirection` | `horizontal` `vertical` | `horizontal` | - |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| close | Triggered when close button is clicked | - | - |
| next | Triggered before next scroll | index: `number` | - |
| click | Triggered when clicked | `{ text: string, index: number }`, where `text` is the current text and `index` is the current text index | 1.2.16 |

## Methods

| Method Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| reset | Used to reset play animation | - | 1.3.13 |

## Slot

| Name | Description | Type | Version |
|------|-------------|------|----------|
| prefix | Front icon | - | - |
| suffix | Back slot | - | - |
| default | Notice text content | - | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |