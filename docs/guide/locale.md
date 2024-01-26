# 国际化

Wot Design Uni 默认使用中文语言，同时支持多语言切换，如果你希望使用其他语言，你可以参考下面的方案。

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

| 语言             | 文件名 | 版本      |
| ---------------- | ------ | --------- |
| 简体中文         | zh-CN  | `v0.2.20` |
| 繁体中文（台湾） | zh-TW  | `v0.2.20` |
| 繁体中文（香港） | zh-HK  | `v0.2.20` |
| 英文             | en-US  | `v0.2.20` |
| 泰文             | th-TH  | `v0.2.20` |

如果你需要使用其他的语言，欢迎贡献 [PR](https://github.com/Moonofweisheng/wot-design-uni/pulls)，只需在[这里](https://github.com/Moonofweisheng/wot-design-uni/tree/master/src/uni_modules/wot-design-uni/locale/lang)添加一个语言配置文件即可。