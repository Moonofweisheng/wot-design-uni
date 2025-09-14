# ConfigProvider Global Configuration

Used for global configuration of `Wot` components, providing capabilities such as dark mode and theme customization.

## Dark Mode

Set the `theme` property of the ConfigProvider component to `dark` to enable dark mode.

Dark mode will take effect globally, making all `Wot` components on the page appear in dark style.

```vue
<wd-config-provider theme="dark">...</wd-config-provider>
```

:::tip
It's worth noting that enabling `Wot`'s dark mode will only affect the `UI` of `Wot` components and will not affect global text color or background color. You can refer to the following `CSS` to set some global styles:
:::

```css
.wot-theme-dark body {
  color: #f5f5f5;
  background-color: black;
}
```

## Dynamic Switching

By dynamically setting the `theme` property, you can switch between light and dark styles.

```vue
<wd-config-provider :theme="theme">...</wd-config-provider>
```

```ts
export default {
  setup() {
    const theme = ref('light')

    setTimeout(() => {
      theme.value = 'dark'
    }, 1000)

    return { theme }
  }
}
```

## Theme Customization

`Wot` components organize styles through rich [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). By overriding these `CSS` variables, you can achieve theme customization, dynamic theme switching, and other effects.

### Example

These variables' default values are defined on the `page` node. If converting to `H5`, the default values are defined on the `:root` node.

```css
:root,
page {
  --wot-color-success: red;
  --wot-color-warning: yellow;
}
```

### Override via CSS

You can directly override these `CSS` variables in your code, and the style of the `Button` component will change accordingly:

```css
/* After adding this style, the default Button background color will become green */
:root,
page {
  --wot-button-normal-bg: green;
}
```

### Override via ConfigProvider

The `ConfigProvider` component provides the ability to override `CSS` variables. You need to wrap a `ConfigProvider` component at the root node and configure some theme variables through the `theme-vars` property.

```html
<wd-config-provider :theme-vars="themeVars">
  <div style="margin: 16px">
    <wd-button round block type="primary">Submit</wd-button>
  </div>
</wd-config-provider>
```

```ts
import { ref, reactive } from 'vue'

export default {
  setup() {
    // Values in themeVars will be converted to corresponding CSS variables
    // For example, buttonPrimaryBg will be converted to `--wot-button-primary-bg-color`
    const themeVars = reactive({
      buttonPrimaryBgColor: '#07c160',
      buttonPrimaryColor: '#07c160'
    })
    return {
      themeVars
    }
  }
}
```

### Using with TypeScript

When defining `themeVars` in TypeScript, it's recommended to use the **ConfigProviderThemeVars** type provided by **wot-design-uni**, which can provide comprehensive type hints:

```ts
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  colorTheme: 'red'
}
```

:::tip
Note: ConfigProvider only affects the styles of its child components, not the global root node.
:::

## Global Sharing

> Requires the virtual root component ([uni-ku-root](https://github.com/uni-ku/root)) for global sharing

### Installation

::: code-group

```bash [npm]
npm i -D @uni-ku/root
```

```bash [yarn]
yarn add -D @uni-ku/root
```

```bash [pnpm]
pnpm add -D @uni-ku/root
```

:::

### Import

- CLI project: Directly edit vite.config.(js|ts) in the root directory
- HBuilderX project: Need to create vite.config.(js|ts) in the root directory

```ts
// vite.config.(js|ts)

import { defineConfig } from 'vite'
import UniKuRoot from '@uni-ku/root'
import Uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [
    // ...plugins
    UniKuRoot(),
    Uni()
  ]
})
```

:::tip
If there are plugins that change pages.json, UniKuRoot needs to be placed after them
:::

### Usage

1. Create a root component and handle global configuration components

- CLI project: Create App.ku.vue in the **src** directory
- HBuilderX project: Create App.ku.vue in the **root** directory

:::tip
The `<KuRootView />` tag in App.ku.vue represents the specified view placement location
:::

```vue
<!-- src/App.ku.vue | App.ku.vue -->

<script setup lang="ts">
import { useTheme } from './composables/useTheme'

const { theme, themeVars } = useTheme({
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#07c160'
})
</script>

<template>
  <div>Hello AppKuVue</div>
  <!-- Ensure WdConfigProvider component is registered -->
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </wd-config-provider>
</template>
```

2. Write a composable function for theme control

```ts
// src/composables/useTheme.ts

import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>()
const themeVars = ref<ConfigProviderThemeVars>()

export function useTheme(vars?: ConfigProviderThemeVars) {
  vars && (themeVars.value = vars)

  function toggleTheme(mode?: 'light' | 'dark') {
    theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    themeVars,
    toggleTheme
  }
}
```

3. Use theme switching in any view file

```vue
<!-- src/pages/*.vue -->

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">Toggle theme, current mode: {{ theme }}</button>
</template>
```

## Attributes

| Parameter  | Description                                                           | Type                      | Options        | Default | Version |
| ---------- | --------------------------------------------------------------------- | ------------------------- | -------------- | ------- | ------- |
| theme      | Theme style, set to `dark` to enable dark mode, takes effect globally | string                    | `dark`/`light` | -       | -       |
| theme-vars | Custom theme variables                                                | `ConfigProviderThemeVars` | -              | -       | -       |

## External Style Classes

| Class Name   | Description     | Version |
| ------------ | --------------- | ------- |
| custom-class | Root node style | 1.3.9   |
| custom-style | Root node style | 1.3.9   |
