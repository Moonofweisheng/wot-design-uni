# Button

Buttons are used to trigger an action, such as submitting a form or opening a link.


## Basic Usage

Basic button.

```html
<wd-button>Primary Button</wd-button>
<wd-button type="success">Success Button</wd-button>
<wd-button type="info">Info Button</wd-button>
<wd-button type="warning">Warning Button</wd-button>
<wd-button type="error">Danger Button</wd-button>
```

## Disabled

Set the `disabled` attribute.

```html
<wd-button disabled>Default Button</wd-button>
```

## Plain Button

Set the `plain` attribute.

```html
<wd-button plain>Primary Button</wd-button>
```

## Hairline Plain Button

Set the `hairline` attribute.

```html
<wd-button plain hairline>Primary Button</wd-button>
```

## Button Size

Set the `size` attribute, supports 'small', 'medium', 'large', default is 'medium'.

```html
<wd-button size="small">Small Button</wd-button>
<wd-button size="medium">Medium Button</wd-button>
<wd-button size="large">Large Button</wd-button>
```

## Loading Button

Set the `loading` attribute to make the button in loading state. A loading button is disabled from being clicked.

```html
<wd-button loading>Loading</wd-button>
```

## Text Button

Set `type` to `text`. Text buttons do not support other colors.

```html
<wd-button type="text">Text Button</wd-button>
```

## Icon Button

Set `type` to `icon` and set the `icon` attribute. The icon is the class name of the icon, which can directly use the icon class names from the `Icon` section.

```html
<wd-button type="icon" icon="picture"></wd-button>
```

## Button with Icon

Set the `icon` attribute without setting `type` to `icon` to use a button with an icon.

```html
<wd-button icon="edit-outline"></wd-button>
```

Combine with `classPrefix` to use custom icons, see [Icon Custom Icons](/component/icon#custom-icons).

```html
<wd-button classPrefix="fish" icon="kehuishouwu">Recyclable</wd-button>
```

## Block Button

Set the `block` attribute.

```html
<wd-button block>Primary Button</wd-button>
```

## Custom Style

Use the `custom-class` and `custom-style` attributes to customize the button's style. Here we use `custom-class` to add a `Material Design 3` style `box-shadow` to the button.

```html
<view class="page-class">
  <wd-button custom-class="custom-shadow">Primary Button</wd-button>
  <wd-button type="success" custom-class="custom-shadow">Success Button</wd-button>
  <wd-button type="info" custom-class="custom-shadow">Info Button</wd-button>
  <wd-button type="warning" custom-class="custom-shadow">Warning Button</wd-button>
  <wd-button type="error" custom-class="custom-shadow">Danger Button</wd-button>
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

| Parameter             | Description                                                                                                                                                           | Type        | Accepted Values                                           | Default      | Min Version |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------- | ------------ | -------- |
| type                   | Button type                                                                                                                                                       | string      | primary / success / info / warning / error / text / icon | primary      | -        |
| round                  | Round button                                                                                                                                                       | boolean     | -                                                        | true         | -        |
| plain                  | Plain button                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| hairline               | Whether to use hairline border                                                                                                                                     | boolean     | -                                                        | false        | -        |
| loading                | Loading button                                                                                                                                                     | boolean     | -                                                        | false        | -        |
| block                  | Block button                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| size                   | Button size                                                                                                                                                       | string      | small / medium / large                                   | medium       | -        |
| disabled               | Disabled button                                                                                                                                                       | boolean     | -                                                        | false        | -        |
| icon                   | Icon class name                                                                                                                                                       | string      | -                                                        | -            | -        |
| loading-color          | Loading icon color                                                                                                                                                   | string      | -                                                        | -            | -        |
| open-type              | WeChat open capability                                                                                                                                                   | string      | -                                                        | -            | -        |
| hover-stop-propagation | Specifies whether to prevent the ancestor node of this node from appearing in the clicked state                                                                                                                         | boolean     | -                                                        | false        | -        |
| lang                   | Specifies the language of the returned user information, zh_CN for Simplified Chinese, zh_TW for Traditional Chinese, en for English                                                                                                | string      | zh_CN / zh_TW                                            | en           | -        |
| session-from           | Session source, valid when open-type="contact"                                                                                                            | string      | -                                                        | -            | -        |
| send-message-title     | Session message card title, valid when open-type="contact"                                                                                                                  | string      | -                                                        | Current title     | -        |
| send-message-path      | Session message card click jump Mini Program path, valid when open-type="contact"                                                                                                    | string      | -                                                        | Current share path | -        |
| send-message-img       | Session message card image, valid when open-type="contact"                                                                                                                  | string      | -                                                        | Screenshot         | -        |
| app-parameter          | Parameters passed to the APP when opening the APP, valid when open-type=launchApp                                                                                                     | string      | -                                                        | -            | -        |
| show-message-card      | Whether to display the message card in the session, setting this parameter to true will show a prompt "May want to send Mini Program" in the bottom right corner when the user enters the customer service session, and the user can quickly send the Mini Program message after clicking, valid when open-type="contact" | boolean     | -                                                        | false        | -        |
| classPrefix            | Class name prefix, used for custom icons, see [icon](/component/icon#custom-icons)                                                                                           | string      | -                                                        | 'wd-icon'    | 0.1.27   |
| button-id              | Unique identifier of the button, can be used to set the id of the privacy consent authorization button                                                                                                                | string      | -                                                        | -            | 1.3.6    |
| scope                  | Used by Alipay Mini Program, valid when open-type is getAuthorize.                                                                                                        | ButtonScope | `phoneNumber` / `userInfo`                               | -            | 1.3.14   |

### ButtonOpenType Open Capabilities

WeChat Mini Program open capabilities, see [WeChat Mini Program Button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html).

| Value            | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| feedback                  | Open the "Feedback" page, where users can submit feedback content and upload logs.                                         |
| share                     | Trigger user forwarding                                                                               |
| getUserInfo               | Get user information, which can be obtained from the @getuserinfo callback                                      |
| contact                   | Open customer service session, if the user returns to the application after clicking the message card in the session, specific information can be obtained from the @contact callback   |
| getPhoneNumber            | Get the user's phone number, which can be obtained from the @getphonenumber callback                                 |
| launchApp                 | Open APP in Mini Program, parameters can be passed to the APP through the app-parameter attribute                           |
| openSetting               | Open authorization settings page                                                                             |
| chooseAvatar              | Get user avatar, avatar information can be obtained from the @chooseavatar callback                                     |
| getAuthorize              | Support Mini Program authorization, used with `scope` in Alipay Mini Program, can implement `getPhoneNumber` and `getUserInfo` functions. |
| lifestyle                 | Follow the lifestyle account, Alipay Mini Program                                                                   |
| contactShare              | Share to contacts, Alipay Mini Program                                                             |
| agreePrivacyAuthorization | User agrees to privacy agreement button. User agreement to privacy agreement events can be monitored through @agreeprivacyauthorization.         |

## Events

| Event Name       | Description                                                         | Parameters     | Min Version |
| -------------- | ------------------------------------------------------------ | -------- | -------- |
| click          | Click event                                                     | `event`  | -        |
| getuserinfo    | Get user information                                                 | `detail` | -        |
| contact        | Customer service message callback, valid when open-type="contact"                      | `detail` | -        |
| getphonenumber | Get user phone number callback, valid when open-type=getPhoneNumber          | `detail` | -        |
| error          | Error callback when using open capabilities, valid when open-type=launchApp | `detail` | -        |
| launchapp      | Callback for successfully opening APP, valid when open-type=launchApp              | `detail` | -        |
| opensetting    | Callback after opening authorization settings page, valid when open-type=openSetting         | `detail` | -        |
| chooseavatar   | Get user avatar callback, valid when open-type=chooseAvatar              | `detail` | -        |
| agreeprivacyauthorization | User agrees to privacy agreement callback, valid when open-type=agreePrivacyAuthorization | `detail` | -        |

## External Style Classes

| Class Name         | Description       | Min Version |
| ------------ | ---------- | -------- |
| custom-class | Root node style | -        |