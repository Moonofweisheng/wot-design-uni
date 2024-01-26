# 国际化

Wot Design Uni 默认使用中文语言，同时支持多语言切换，请按照下方教程进行国际化设置。

## 使用其他语言

我们通过 __Locale__ 组件实现多语言支持，使用 __Locale.use__ 方法可以切换当前使用的语言。

```typescript
import { Locale } from 'wot-design-uni';
// 引入英文语言包
import enUS from 'wot-design-uni/locale/lang/en-US';

Locale.use('en-US', enUS);
```

## 覆盖语言包

通过 __Locale.add__ 方法可以实现文案的修改和扩展，示例如下：
```typescript
import { Locale } from 'wot-design-uni';

const messages = {
  'zh-CN': {
    calendar: {
      title: '请选择日期', // 将'选择日期'修改为'请选择日期'
    },
  },
};

Locale.add(messages);
```
 
## 支持的语言

* zh-CN 简体中文
* zh-TW 繁体中文（台湾）
* zh-HK 繁体中文（香港）
* en-US 英文
* th-TH 泰文
