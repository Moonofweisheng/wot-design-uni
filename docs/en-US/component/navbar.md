# Navbar

Provides navigation functionality for pages, commonly used at the top of pages.

::: tip Common Issues

**Right icon blocked by mini-program capsule?**

When custom top navigation is enabled on the mini-program platform, the capsule will be fixed in the top-right corner, so the right slot and options are not recommended to use at this time.

**How to set transparent background?**

Set the component's `background-color` to `transparent` through `custom-style`.

```html
<wd-navbar title="Title" custom-style="background-color: transparent !important;"></wd-navbar>
```

**Component covered by `video`?**

`video` is a native component with a higher z-index level, currently cannot be covered, needs specific platform analysis.
:::


## Basic Usage

Set the navigation bar title through the `title` property.

```html
<wd-navbar title="Title"></wd-navbar>
```

## Return to Previous Level

Implement return to previous level functionality in the navigation bar.

```html
<wd-navbar title="Title" left-text="Back" left-arrow @click-left="handleClickLeft"></wd-navbar>
```

```ts
function handleClickLeft() {
  uni.navigateBack()
}
```

## Right Button

Add clickable buttons on the right side of the navigation bar.

```html
<wd-toast></wd-toast>

<wd-navbar title="Title" left-text="Back" left-arrow right-text="Button" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'

const { show: showToast } = useToast()


function handleClickRight() {
  showToast('Button')
}
```

## Using Slots
You can customize the content on both sides of the navigation bar through the `left` and `right` slots.

```html
<wd-navbar title="Title" left-text="Back" left-arrow>
  <template #right>
    <wd-icon name="search" size="18" />
  </template>
</wd-navbar>
```

## Fixed at Top

Through `fixed`, you can set the navigation bar fixed at the top of the page. By setting `placeholder`, you can generate placeholder space at the top, and by setting `safeAreaInsetTop`, you can enable top safe area adaptation.

```html
<wd-navbar fixed placeholder title="Navbar" left-arrow safeAreaInsetTop></wd-navbar>
```

## Disable Buttons

Disable buttons on both sides through the `left-disabled` or `right-disabled` properties. When buttons are disabled, their opacity is reduced and they cannot be clicked.

```html
<wd-navbar title="Title" left-text="Back" right-text="Button" left-arrow left-disabled right-disabled></wd-navbar>
```

## Capsule Style

Customize the return capsule through the `capsule` slot and `navbar-capsule` component.

```html
<wd-navbar title="Title" left-text="Back" right-text="Settings" left-arrow>
  <template #capsule>
    <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
  </template>
</wd-navbar>
```
```ts
function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
```

## With Search Bar
Customize the title through the `title` slot.

```html
<wd-navbar left-text="Back" right-text="Settings" left-arrow>
  <template #title>
    <view class="search-box">
      <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
    </view>
  </template>
</wd-navbar>
```
```scss
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
```

## Navbar Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| title | Card title | string | - | '' | 0.1.33 |
| leftText | Left text | string | - | '' | 0.1.33 |
| rightText | Right text | string | - | '' | 0.1.33 |
| leftArrow | Show left arrow | boolean | true, false | false | 0.1.33 |
| bordered | Show bottom border | boolean | true, false | true | 0.1.33 |
| fixed | Fixed at top | boolean | true, false | false | 0.1.33 |
| placeholder | When fixed at top, generate a placeholder element of equal height at the tag position | boolean | true, false | false | 0.1.33 |
| zIndex | Navigation bar z-index | number | - | 1 | 0.1.33 |
| safeAreaInsetTop | Enable top safe area adaptation | boolean | true, false | false | 0.1.33 |
| leftDisabled | Disable left button, when disabled opacity is reduced and cannot be clicked | boolean | true, false | false | 0.1.33 |
| rightDisabled | Disable right button, when disabled opacity is reduced and cannot be clicked | boolean | true, false | false | 0.1.33 |

## Navbar Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| click-left | Triggered when clicking left button | - | 0.1.33 |
| click-right | Triggered when clicking right button | - | 0.1.33 |

## NavbarCapsule Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| back | Triggered when clicking back button | - | 0.1.33 |
| back-home | Triggered when clicking back home button | - | 0.1.33 |

## Navbar Slot

| Name | Description | Version |
|------|-------------|----------|
| capsule | Custom capsule (when capsule exists, left does not take effect) | 0.1.33 |
| left | Left content | 0.1.33 |
| title | Title content | 0.1.33 |
| right | Right content | 0.1.33 |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style class | 0.1.33 |
| custom-style | Root node style | 0.1.33 |