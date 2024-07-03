<frame/>

# Text 文本

## 基本用法

设置 `text` 设置文本内容。推荐您使用<code>:text='value'</code>的形式。

```html
<wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。"></wd-text>
```


## 设置主题

通过<code>type</code>参数设置文本主题，我们提供了五类属性：<code>primary</code> <code>error</code> <code>success</code> <code>warning</code> <code>info-默认</code>。

```html
<wd-text type="primary" text="主色"></wd-text>
<wd-text type="error"   text="错误"></wd-text>
<wd-text type="success" text="成功"></wd-text>
<wd-text type="warning" text="警告"></wd-text>
<wd-text text="默认"></wd-text>
```

## 自定义字体颜色

设置 `color` 属性。

```html
<wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" color="#36B8C2"></wd-text>
```

## 是否粗体

设置 `bold` 属性。

```html
<wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" bold></wd-text>
```

## 字体大小

设置 `size` 属性。

```html
<wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" size="16px"></wd-text>
```


## 事件

```html
<wd-text text="只有拼尽全力，才能不留遗憾。只有奋斗不止，才能拥有更好的未来。" @click="clickTest"></wd-text>
```

```typescript
function clickTest(){
  console.log(1)
}
```

## Attributes

| 参数          | 说明                     | 类型    | 可选值                                       | 默认值 | 最低版本 |
| ------------- | ------------------------ | ------- | -------------------------------------------- | ------ | -------- |
| type          | 主题类型                 | string  | 'primary' / 'error' / 'warning' / 'success' | default      | -        |
| text         | 文字                 | string | -                                            |   | -        |
| size          | 字体大小                 | string | -                                            | false  | -        |
| mode         | 文本处理的匹配模式                 | string | 'text-普通文本' / 'date - 日期'                                            | text  | -        |
| bold          | 是否粗体，默认normal                 | boolean  | -                                            | -      | -        |
| color         | 文字颜色                 | string  | -                                            | -      | -        |
| lines      | 文本显示的行数，如果设置，超出此行数，将会显示省略号。最大值为5。           | Number  | -                                            | -      | -        |
| lineHeight      | 文本行高 | string | -                                            |   | -        |

## Events

| 事件名称 | 说明                       | 参数        | 最低版本 |
| -------- | -------------------------- | ----------- | -------- |
| click    | 标签点击时触发             | event       | -        |


## Slots



## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
| custom-style | 根节点样式 | -        |
