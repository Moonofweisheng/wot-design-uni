---
url: 'https://wot-design-uni.cn/component/button.md'
---
# Button 按钮

按钮用于触发一个操作，如提交表单或打开链接。

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

将 `type` 设置为 `icon`，同时设置 `icon` 属性，icon 为图标的类名，可以直接使用 `Icon 图标` 章节中的图标类名。

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

## 自定义样式

通过 `custom-class` 和 `custom-style` 属性可以自定义按钮的样式，这里我们使用`custom-class`给按钮添加一个 `Material Design 3` 风格的`box-shadow`。

```html
<view class="page-class">
  <wd-button custom-class="custom-shadow">主要按钮</wd-button>
  <wd-button type="success" custom-class="custom-shadow">成功按钮</wd-button>
  <wd-button type="info" custom-class="custom-shadow">信息按钮</wd-button>
  <wd-button type="warning" custom-class="custom-shadow">警告按钮</wd-button>
  <wd-button type="error" custom-class="custom-shadow">危险按钮</wd-button>
</view>
```

```scss
.page-class {
  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
}
```

## Attributes

| 参数                   | 说明                                                                                                                                                           | 类型        | 可选值                                                   | 默认值       | 最低版本 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------- | ------------ | -------- |
| type                   | 按钮类型                                                                                                                                                       | string      | primary / success / info / warning / error / text / icon | primary      | -        |
| round                  | 圆角按钮                                                                                                                                                       | boolean     | -                                                        | true         | -        |
| plain                  | 幽灵按钮                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| hairline               | 是否细边框                                                                                                                                                     | boolean     | -                                                        | false        | -        |
| loading                | 加载中按钮                                                                                                                                                     | boolean     | -                                                        | false        | -        |
| block                  | 块状按钮                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| size                   | 按钮尺寸                                                                                                                                                       | string      | small / medium / large                                   | medium       | -        |
| disabled               | 禁用按钮                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| icon                   | 图标类名                                                                                                                                                       | string      | -                                                        | -            | -        |
| loading-color          | 加载图标颜色                                                                                                                                                   | string      | -                                                        | -            | -        |
| open-type              | 微信开放能力                                                                                                                                                   | string      | -                                                        | -            | -        |
| hover-stop-propagation | 指定是否阻止本节点的祖先节点出现点击态                                                                                                                         | boolean     | -                                                        | false        | -        |
| lang                   | 指定返回用户信息的语言，zh\_CN 简体中文，zh\_TW 繁体中文，en 英文                                                                                                | string      | zh\_CN / zh\_TW                                            | en           | -        |
| session-from           | 会话来源，open-type="contact"时有效                                                                                                                            | string      | -                                                        | -            | -        |
| session-message-title  | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                  | string      | -                                                        | 当前标题     | -        |
| session-message-path   | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                    | string      | -                                                        | 当前分享路径 | -        |
| send-message-img       | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                  | string      | -                                                        | 截图         | -        |
| app-parameter          | 打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效                                                                                                     | string      | -                                                        | -            | -        |
| show-message-card      | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | boolean     | -                                                        | false        | -        |
| classPrefix            | 类名前缀，用于使用自定义图标，参见[icon](/component/icon#自定义图标)                                                                                           | string      | -                                                        | 'wd-icon'    | 0.1.27   |
| button-id              | 按钮的唯一标识，可用于设置隐私同意授权按钮的 id                                                                                                                | string      | -                                                        | -            | 1.3.6    |
| scope                  | 支付宝小程序使用，当 open-type 为 getAuthorize 时有效。                                                                                                        | ButtonScope | `phoneNumber` / `userInfo`                               | -            | 1.3.14   |

### ButtonOpenType 开放能力

| 属性                      | 说明                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| feedback                  | 打开“意见反馈”页面，用户可提交反馈内容并上传日志。                                         |
| share                     | 触发用户转发                                                                               |
| getUserInfo               | 获取用户信息，可以从@getuserinfo 回调中获取到用户信息                                      |
| contact                   | 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息   |
| getPhoneNumber            | 获取用户手机号，可以从@getphonenumber 回调中获取到用户信息                                 |
| launchApp                 | 小程序中打开 APP，可以通过 app-parameter 属性设定向 APP 传的参数                           |
| openSetting               | 打开授权设置页                                                                             |
| chooseAvatar              | 获取用户头像，可以从@chooseavatar 回调中获取到头像信息                                     |
| getAuthorize              | 支持小程序授权，支付宝小程序配合`scope`使用，可以实现`getPhoneNumber`和`getUserInfo`功能。 |
| lifestyle                 | 关注生活号，支付宝小程序                                                                   |
| contactShare              | 分享到通讯录好友，支付宝小程序                                                             |
| agreePrivacyAuthorization | 用户同意隐私协议按钮。可通过 @agreeprivacyauthorization 监听用户同意隐私协议事件。         |

## Events

| 事件名称       | 说明                                                         | 参数     | 最低版本 |
| -------------- | ------------------------------------------------------------ | -------- | -------- |
| click          | 点击事件                                                     | `event`  | -        |
| getuserinfo    | 获取用户信息                                                 | `detail` | -        |
| contact        | 客服消息回调，open-type="contact"时有效                      | `detail` | -        |
| getphonenumber | 获取用户手机号回调，open-type=getPhoneNumber 时有效          | `detail` | -        |
| error          | 当使用开放能力时，发生错误的回调，open-type=launchApp 时有效 | `detail` | -        |
| launchapp      | 打开 APP 成功的回调，open-type=launchApp 时有效              | `detail` | -        |
| opensetting    | 在打开授权设置页后回调，open-type=openSetting 时有效         | `detail` | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
