# Tabbar

Bottom navigation bar, used for switching between different pages.

## Basic Usage

`v-model` is the binding value, representing the index value or name of the selected tab.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```

```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Match by Name

By setting the `name` property, you can match the selected tab by name.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item name="home" title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item name="cart" title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item name="setting" title="Settings" icon="setting"></wd-tabbar-item>
  <wd-tabbar-item name="user" title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref('home')
```

## Badge Tips

By setting the `value` property, you can display badge tips, and by setting the is-dot property, a small red dot will be displayed in the upper right corner of the icon.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item is-dot :value="2" title="Dot" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Max Value" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Floating Tab Bar

By setting the `shape` property to `round`, you can set the tab bar to floating style.

```html
<wd-tabbar shape="round" v-model="tabbar">
  <wd-tabbar-item title="Home" is-dot :value="2" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" :value="2" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="Photos" :value="30" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="My" :value="200" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Custom Icon

By using `<template #icon>`, you can customize the tab's icon.

```html
<wd-tabbar v-model="tabbar">
  <wd-tabbar-item :value="2" title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category">
    <template #icon>
      <wd-img round height="40rpx" width="40rpx" src="https://wot-ui.cn/assets/panda.jpg"></wd-img>
    </template>
  </wd-tabbar-item>
  <wd-tabbar-item :value="3" title="My" icon="user"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Custom Color

By setting `active-color` and `inactive-color` properties, you can customize the color of active and inactive tabs.

```html
<wd-tabbar v-model="tabbar" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item is-dot :value="2" title="Dot" icon="home"></wd-tabbar-item>
  <wd-tabbar-item :value="2" icon="cart" title="Category"></wd-tabbar-item>
  <wd-tabbar-item :value="30" title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Max Value" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Listen to Switch Events

By listening to the `change` event, you can get the value of the selected tab.

```html
<wd-tabbar v-model="tabbar" @change="handleChange" active-color="#ee0a24" inactive-color="#7d7e80">
  <wd-tabbar-item title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item title="Photos" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```

```typescript
import { ref } from 'vue'

const tabbar = ref(1)

function handleChange({ value }: { value: string }) {
  show(`Selected tab:${value}`)
}
```

## Fixed Bottom

By setting the `fixed` property, you can fix the tab bar at the bottom; by setting the `placeholder` property, you can generate a placeholder element of the same height at the tab position when fixed at the bottom.

```html
<wd-tabbar fixed v-model="tabbar" bordered safeAreaInsetBottom placeholder>
  <wd-tabbar-item :value="2" is-dot title="Home" icon="home"></wd-tabbar-item>
  <wd-tabbar-item title="Category" icon="cart"></wd-tabbar-item>
  <wd-tabbar-item title="My" icon="user"></wd-tabbar-item>
  <wd-tabbar-item :value="200" title="Photos" icon="photo"></wd-tabbar-item>
  <wd-tabbar-item :value="10" title="Service" icon="chat"></wd-tabbar-item>
</wd-tabbar>
```
```typescript
import { ref } from 'vue'

const tabbar = ref(1)
```

## Attributes
| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| model-value / v-model | Index value or name of the selected tab | number / string | - | 0 | 0.1.27 |
| fixed | Whether to fix at the bottom | boolean | - | false | 0.1.27 |
| safeAreaInsetBottom | Whether to set bottom safe area (iPhone X type devices) | boolean | - | false | 0.1.27 |
| bordered | Whether to show top border | boolean | - | true | 0.1.27 |
| shape | Shape of the tab bar | TabbarShape | 'default' / 'round' | 'default' | 0.1.27 |
| activeColor | Color of active tab | string | - | - | 0.1.27 |
| inactiveColor | Color of inactive tab | string | - | - | 0.1.27 |
| placeholder | Whether to generate a placeholder element of the same height at the tab position when fixed at the bottom | boolean | - | false | 0.1.27 |
| zIndex | Z-index of tabbar component | number | - | 500 | 0.1.27 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| change | Triggered when tabbar tab switches | `{ value }` | 0.1.27 |

## External Style Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style class | 0.1.27 |
| custom-style | Root node style | 0.1.27 |

## TabbarItem Attributes
| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| title | Title of the tab | string | - | - | 0.1.27 |
| name | Unique identifier | string / number | - | - | 0.1.27 |
| icon | Icon | string | - | - | 0.1.27 |