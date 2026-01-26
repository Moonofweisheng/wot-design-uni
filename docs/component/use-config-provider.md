---
version: 1.14.0
---
# useConfigProvider

用于在 JS 逻辑中注入全局配置（如主题变量），解决在微信小程序等环境中，由于组件渲染机制限制（如原生插槽作用域隔离）或使用 `root-portal` 导致无法获取父级 `ConfigProvider` 配置的问题。

::: tip 提示
需要和 `ConfigProvider` 组件配合使用，使用 `ConfigProvider` 组件包裹你的组件。用于解决小程序端依赖注入的限制，导致部分场景下无法获取父级 `ConfigProvider` 配置的问题。
:::

## 基础用法

```ts
import { useConfigProvider } from '@/uni_modules/wot-design-uni'
import { reactive, ref } from 'vue'

// 使用 reactive
const themeVars = reactive({
  colorTheme: 'red',
  buttonPrimaryBgColor: '#07c160'
})

useConfigProvider({ themeVars })

// 或者使用 ref
const themeVarsRef = ref({
  colorTheme: 'blue'
})

useConfigProvider({ themeVars: themeVarsRef })
```

## API

### 参数

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| themeVars | 主题变量对象，支持响应式更新 | `ConfigProviderThemeVars` \| `Ref<ConfigProviderThemeVars>` | - | 1.14.0 |
