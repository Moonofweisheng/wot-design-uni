<frame/>

# Text 文本

> $LOWEST_VERSION$ 版本提供

## 基本用法

设置 `text` 设置文本内容。推荐您使用<code>:text='value'</code>的形式。

```html
<wd-text
  text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
></wd-text>
```

## 设置主题

通过<code>type</code>参数设置文本主题，我们提供了五类属性：<code>primary</code> <code>error</code> <code>success</code> <code>warning</code> <code>info-默认</code>。

```html
<wd-text type="primary" text="主色"></wd-text>
<wd-text type="error" text="错误"></wd-text>
<wd-text type="success" text="成功"></wd-text>
<wd-text type="warning" text="警告"></wd-text>
<wd-text text="默认"></wd-text>
```

## 自定义字体颜色

设置 `color` 属性。

```html
<wd-text
  text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
  color="#36B8C2"
></wd-text>
```

## 是否粗体

设置 `bold` 属性。

```html
<wd-text
  text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
  bold
></wd-text>
```

## 字体大小

设置 `size` 属性。

```html
<wd-text
  text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
  size="16px"
></wd-text>
```

## 脱敏

设置 `format` 属性,当 `mode` 为 ` phone``name `时生效。

```html
<wd-text text="李四" mode="name" :format="true"></wd-text>
<wd-text text="张长三" mode="name" :format="true"></wd-text>
<wd-text text="18888888888" mode="phone" :format="true"></wd-text>
```

## 事件

```html
<wd-text
  text="芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人曾到否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
  @click="clickTest"
></wd-text>
```

```typescript
function clickTest() {
  console.log(1)
}
```

## Attributes

| 参数       | 说明                                                               | 类型    | 可选值                                                             | 默认值  | 最低版本         |
| ---------- | ------------------------------------------------------------------ | ------- | ------------------------------------------------------------------ | ------- | ---------------- |
| type       | 主题类型                                                           | string  | 'primary' / 'error' / 'warning' / 'success'                        | default | $LOWEST_VERSION$ |
| text       | 文字                                                               | string  | -                                                                  |         | $LOWEST_VERSION$ |
| size       | 字体大小                                                           | string  | -                                                                  | -       | $LOWEST_VERSION$ |
| mode       | 文本处理的匹配模式                                                 | string  | 'text-普通文本' / 'date - 日期' / 'phone - 手机号' / 'name - 姓名' | text    | $LOWEST_VERSION$ |
| bold       | 是否粗体，默认 normal                                              | boolean | -                                                                  | false   | $LOWEST_VERSION$ |
| format     | 是否脱敏                                                           | boolean | 当 mode 为 phone 和 name 时生效                                    | false   | $LOWEST_VERSION$ |
| color      | 文字颜色                                                           | string  | -                                                                  | -       | $LOWEST_VERSION$ |
| lines      | 文本显示的行数，如果设置，超出此行数，将会显示省略号。最大值为 5。 | Number  | -                                                                  | -       | $LOWEST_VERSION$ |
| lineHeight | 文本行高                                                           | string  | -                                                                  |         | $LOWEST_VERSION$ |

## Events

| 事件名称 | 说明           | 参数  | 最低版本         |
| -------- | -------------- | ----- | ---------------- |
| click    | 标签点击时触发 | event | $LOWEST_VERSION$ |

## Slots

## 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |
