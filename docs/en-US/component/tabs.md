# Tab

Tab component, used to switch between different content areas.

## Basic Usage

`v-model` is the binding value, which can be of type number (index of the selected tab) or string (tab name).

:::tip Note
When `v-model` is of type `number`, `wd-tab` does not need to set `name`. Also, if the value exceeds the number of tabs, it will automatically default to 0.
:::

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tab = ref<number>(0)
```

```scss
.content {
  line-height: 120px;
  text-align: center;
}
```

## Name Matching

Set `name` for `wd-tab` as a unique identifier.

```html
<wd-tabs v-model="tab">
  <block v-for="item in tabs" :key="item">
    <wd-tab :title="`${item}`" :name="item">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tabs = ref(['This', 'Is', 'An', 'Example'])
const tab = ref('Example')
```

```scss
.content {
  line-height: 120px;
  text-align: center;
}
```

## Using Badges <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.4.0</el-tag>

Use `badge-props` to set badge properties, you can refer to [Badge Component props](/component/badge#attributes).

```html
<wd-tabs v-model="tabWithBadge" @change="handleChange">
  <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="`${item.title}`" :badge-props="item.badgeProps">
    <view class="content">{{ item.title }} Badge</view>
  </wd-tab>
</wd-tabs>
```

```typescript
const tabWithBadge = ref(0)
const tabsWithBadge = ref([
  {
    title: 'Normal Value',
    badgeProps: {
      modelValue: 10,
      right: '-8px'
    }
  },
  {
    title: 'Max Value',
    badgeProps: {
      modelValue: 100,
      max: 99,
      right: '-8px'
    }
  },
  {
    title: 'Dot',
    badgeProps: {
      isDot: true,
      right: '-8px',
      showZero: true
    }
  }
])
```

## Auto Adjust Bottom Line Width

Set the `auto-line-width` property to automatically adjust the bottom line width to match the text content width.

```html
<wd-tabs v-model="tab" @change="handleChange" auto-line-width>
  <block v-for="item in tabs" :key="item">
    <wd-tab :title="`${item}`" :name="item">
      <view class="content">Content {{ tab }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tabs = ref(['Wot', 'Design', 'Uni'])
const tab = ref('Design')
```

## Sticky Layout

Set the `sticky` property to use sticky layout. You can set the `offset-top` property to specify how many pixels from the window top before fixing the tab header. When using a custom navigation bar in `H5`, you need to refer to [sticky's offset distance](/component/sticky.html#offset-distance) for configuration.

```html
<wd-tabs v-model="tab" sticky>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Disabled Tab

Set the `disabled` property on `wd-tab` to disable a specific tab.

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`" :disabled="item === 1">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Click Event

Listen to the click event of tabs.

```html
<wd-tabs v-model="tab" @click="handleClick">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Gesture Swipe

Set the `swipeable` property to support gesture swipe.

```html
<wd-tabs v-model="tab" swipeable>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Switch Animation

Set the `animated` property to enable transition animation when switching tab content.

```html
<wd-tabs v-model="tab" animated>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Left-aligned with Scrolling <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.4.0</el-tag>

When `slidable` is set to `always`, all tabs will be aligned to the left and can be scrolled when they overflow.

```html
<wd-tabs v-model="tab" slidable="always">
  <block v-for="item in 5" :key="item">
    <wd-tab :title="`Large Tab ${item}`">
      <view class="content">Content {{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## Tabs Attributes

| Parameter      | Description                                                                        | Type            | Options      | Default | Version |
| -------------- | ---------------------------------------------------------------------------------- | --------------- | ------------ | ------- | ------- |
| v-model        | Binding value                                                                      | string / number | -            | -       | -       |
| slidable-num   | Threshold count of tabs to enable scrolling when `slidable` is `auto`              | number          | -            | `6`     | -       |
| map-num        | Threshold count of tabs to show navigation map                                     | number          | -            | `10`    | -       |
| map-title      | Title of the navigation map                                                        | string          | -            | -       | 1.4.0   |
| sticky         | Enable sticky layout                                                               | boolean         | -            | `false` | -       |
| offset-top     | Distance from the top when sticky                                                  | number          | -            | `0`     | -       |
| swipeable      | Enable gesture swipe                                                               | boolean         | -            | `false` | -       |
| autoLineWidth  | Bottom line width follows text; invalid when `lineWidth` is specified              | boolean         | -            | `false` | 1.4.0   |
| lineWidth      | Bottom line width, unit px                                                         | number          | -            | `19`    | -       |
| lineHeight     | Bottom line height, unit px                                                        | number          | -            | `3`     | -       |
| color          | Text color                                                                         | string          | -            | -       | -       |
| inactiveColor  | Text color of inactive tabs                                                        | string          | -            | -       | -       |
| animated       | Enable transition animation when switching tab content                             | boolean         | -            | `false` | -       |
| duration       | Transition duration in ms                                                          | number          | -            | `300`   | -       |
| slidable       | Enable scrollable navigation                                                       | TabsSlidable    | `always`     | `auto`  | 1.4.0   |
| showScrollbar  | Whether to show scrollbar when tabs are slidable (nav)                             | boolean         | -            | `false` | $LOWEST_VERSION$ |
| badge-props    | Props passed to [Badge component props](/component/badge#attributes)               | BadgeProps      | -            | -       | 1.4.0   |

## Tab Attributes

| Parameter | Description                                                     | Type    | Options | Default | Version |
| --------- | --------------------------------------------------------------- | ------- | ------- | ------- | ------- |
| name      | Tab name                                                        | string  | -       | -       | -       |
| title     | Title                                                           | string  | -       | -       | -       |
| disabled  | Disable                                                         | boolean | -       | `false` | -       |
| lazy      | Lazy render; when `animated` is enabled this is always `false`  | boolean | -       | `true`  | 1.4.0   |

## Tabs Events

| Event Name | Description             | Parameters                                                     | Version |
| ---------- | ----------------------- | --------------------------------------------------------------- | ------- |
| change     | Triggered when value changes | `event = { index, name }`                                   | -       |
| click      | Triggered when title is clicked | `event = { index, name }`                               | -       |
| disabled   | Triggered when clicking a disabled title | `event = { index, name }`                            | -       |

## Methods

Exposed methods

| Method           | Description                                                                                   | Signature                                                              | Version |
| ---------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| setActive        | Set active tab; params: `value` active value, `init` initialized, `setScroll` set scroll-view | `(value: number \| string, init: boolean, setScroll: boolean) => void` | -       |
| scrollIntoView   | Scroll the selected tab into view                                                             | `() => void`                                                           | -       |
| updateLineStyle  | Update active underline style; `animation` determines whether to animate, default enabled     | `(animation?: boolean) => void`                                        | -       |

## External Classes

| Class Name   | Description      | Version |
| ------------ | ---------------- | ------- |
| custom-class | Root node style  | -       |