# 国际化<el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">0.2.20</el-tag>

Wot Design Uni 默认使用中文语言，同时支持多语言切换，如果你希望使用其他语言，你可以参考下面的方案。

:::warning 注意点
目前组件库发布到 npm 上的包是未经编译的`vue`与`ts`，而 Vite 会将[预构建](https://cn.vitejs.dev/guide/dep-pre-bundling.html)的依赖项缓存到 `node_modules/.vite`，组件库的国际化的实现是基于`reactive`实现的数据共享，在`dev`阶段就会出现页面使用预构建产物中的国际化数据，而组件库使用组件库内部的国际化数据，所以在非`uni_modules`模式引入时，需要在`vite.config.ts`中增加以下配置:

```ts
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  ...
  optimizeDeps: {
    exclude: process.env.UNI_PLATFORM === 'h5' && process.env.NODE_ENV === 'development' ? ['wot-design-uni'] : []
  }
  ...
})

```

使用[optimizeDeps.exclude](https://cn.vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude)在预构建中强制排除`wot-design-uni`模块，在`uni_modules`模式下，不需要做任何处理。

:::

## 使用其他语言

我们通过 **Locale** 组件实现多语言支持，使用 **Locale.use** 方法可以切换当前使用的语言。

```typescript
import { Locale } from 'wot-design-uni'
// 引入英文语言包
import enUS from 'wot-design-uni/locale/lang/en-US'

Locale.use('en-US', enUS)
```

## 覆盖语言包

通过 **Locale.add** 方法可以实现文案的修改和扩展，示例如下：

```typescript
import { Locale } from 'wot-design-uni'

const messages = {
  'zh-CN': {
    calendar: {
      title: '请选择日期' // 将'选择日期'修改为'请选择日期'
    }
  }
}

Locale.add(messages)
```

## 支持的语言

| 语言             | 文件名    | 版本      |
| ---------------- | --------- | --------- |
| 简体中文         | zh-CN     | `v0.2.20` |
| 繁体中文（台湾） | zh-TW     | `v0.2.20` |
| 繁体中文（香港） | zh-HK     | `v0.2.20` |
| 英语             | en-US     | `v0.2.20` |
| 泰语             | th-TH     | `v0.2.20` |
| 越南语             | vi-VN    | `v0.2.20` |
| 阿拉伯语             | ar-SA    | `v1.3.12` |
| 德语             | de-DE    | `v1.3.12` |
| 西班牙语             | es-ES    | `v1.3.12` |
| 葡萄牙语             | pt-PT    | `v1.3.12` |
| 法语             | fr-FR    | `v1.3.12` |
| 日语             | ja-JP    | `v1.3.12` |
| 韩语             | ko-KR    | `v1.3.12` |
| 土耳其语             | tr-TR    | `v1.3.12` |
| 俄语             | ru-RU    | `v1.3.12` |

如果你需要使用其他的语言，欢迎贡献 [PR](https://github.com/Moonofweisheng/wot-design-uni/pulls)，只需在[这里](https://github.com/Moonofweisheng/wot-design-uni/tree/master/src/uni_modules/wot-design-uni/locale/lang)添加一个语言配置文件即可。
