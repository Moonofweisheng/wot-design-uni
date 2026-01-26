---
version: 1.14.0
---
# useConfigProvider

Used to inject global configuration (such as theme variables) in JS logic. This solves the issue where configuration from a parent `ConfigProvider` cannot be accessed in environments like WeChat Mini Program due to component rendering limitations (such as native slot scope isolation) or when using `root-portal`.

::: tip Tip
Needs to be used together with the `ConfigProvider` component. Wrap your components with the `ConfigProvider` component. This solves the issue of dependency injection limitations on the mini program side, which prevents accessing parent `ConfigProvider` configuration in certain scenarios.
:::

## Basic Usage

```ts
import { useConfigProvider } from '@/uni_modules/wot-design-uni'
import { reactive, ref } from 'vue'

// Use reactive
const themeVars = reactive({
  colorTheme: 'red',
  buttonPrimaryBgColor: '#07c160'
})

useConfigProvider({ themeVars })

// Or use ref
const themeVarsRef = ref({
  colorTheme: 'blue'
})

useConfigProvider({ themeVars: themeVarsRef })
```

## API

### Parameters

| Parameter | Description | Type | Default | Minimum Version |
|-----|------|------|--------|---------|
| themeVars | Theme variable object, supports reactive updates | `ConfigProviderThemeVars` \| `Ref<ConfigProviderThemeVars>` | - | 1.14.0 |
