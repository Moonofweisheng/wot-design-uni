<frame/>

# Button 按钮


## 基本用法

基本按钮。

```html
<wd-button>主要按钮</wd-button>
<wd-button type="success">成功按钮</wd-button>
<wd-button type="info">信息按钮</wd-button>
<wd-button type="warning">警告按钮</wd-button>
<wd-button type="error">危险按钮</wd-button>
```

## 禁用

设置 `disabled` 属性。

```html
<wd-button disabled>默认按钮</wd-button>
```

## 幽灵按钮

设置 `plain` 属性。

```html
<wd-button plain>主要按钮</wd-button>
```

## 细边框幽灵按钮

设置 `hairline` 属性。

```html
<wd-button plain hairline>主要按钮</wd-button>
```


## 按钮大小

设置 `size` ，支持 'small'、'medium'、'large'，默认为 'medium'。

```html
<wd-button size="small">小号按钮</wd-button>
<wd-button size="medium">中号按钮</wd-button>
<wd-button size="large">大号按钮</wd-button>
```

## 加载中按钮

设置 `loading` 属性，让按钮处于加载中状态。加载中的按钮是禁止点击的。

```html
<wd-button loading>加载中</wd-button>
```

## 文字按钮

将 `type` 设置为 `text`。文字按钮不支持其他颜色。

```html
<wd-button type="text">文字按钮</wd-button>
```

## 图标按钮

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

```html
<wd-button type="icon" icon="picture"></wd-button>
```

## 带图标的按钮

设置 `icon` 属性，不需要设置 `type` 为 `icon`，即可以直接使用带图标的按钮。

```html
<wd-button icon="edit-outline"></wd-button>
```

结合`classPrefix`可以使用自定义图标，参见 [Icon 自定义图标](/component/icon#自定义图标)。
```html
<wd-button classPrefix="fish" icon="kehuishouwu">可回收</wd-button>
```

## 块状按钮

设置 `block` 属性。

```html
<wd-button block>主要按钮</wd-button>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| type | 按钮类型 |	string | primary / success / info / warning / error / text / icon |	primary | - |
| round	| 圆角按钮 | boolean | - |	true | - |
| plain | 幽灵按钮 | boolean | - | false | - |
| hairline| 是否细边框 | boolean | - | false | - |
| loading | 加载中按钮 | boolean | - | false | - |
| block | 块状按钮 | boolean | - | false | - |
| size | 按钮尺寸 | string | small / medium / large | medium | - |
| disabled | 禁用按钮 | boolean | - | false | - |
| icon | 图标类名 | string | - | - | - |
| loading-color | 加载图标颜色 | string | - | - | - |
| open-type | 微信开放能力 | string | - | - | - |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态 | boolean | - | false | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 | string | zh_CN / zh_TW | en | - |
| session-from | 会话来源，open-type="contact"时有效 | string | - | - | - |
| session-message-title | 会话内消息卡片标题，open-type="contact"时有效 | string | - | 当前标题 | - |
| session-message-path | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 | string | - | 当前分享路径 | - |
| send-message-img | 会话内消息卡片图片，open-type="contact"时有效 | string | - | 截图 | - |
| app-parameter | 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 | string | - | - | - |
| show-message-card	| 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean | - | false | - |
| classPrefix | 类名前缀，用于使用自定义图标，参见[icon](/component/icon#自定义图标) | string | - | 'wd-icon' | 0.1.27 |
| button-id | 按钮的唯一标识，可用于设置隐私同意授权按钮的id | string | - | - | 1.3.6 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| click | 点击事件 | `event` | - |
| getuserinfo | 获取用户信息 | `detail` | - |
| contact | 客服消息回调，open-type="contact"时有效 | `detail` | - |
| getphonenumber | 获取用户手机号回调，open-type=getPhoneNumber时有效 | `detail` | - |
| error | 当使用开放能力时，发生错误的回调，open-type=launchApp时有效 | `detail` | - |
| launchapp | 打开 APP 成功的回调，open-type=launchApp时有效 | `detail` | - |
| opensetting | 在打开授权设置页后回调，open-type=openSetting时有效 | `detail` | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
