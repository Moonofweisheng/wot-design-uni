# Msg 提示页

提示页，常用布局。

> $LOWEST_VERSION$ 版本提供

## 基本用法

设置 `type` 类型。

```html
<wd-msg type="success" title="操作成功" desc="内容详情，根据实际需要进行展示，内容为空则不展示展示" color="#07c160">
  <!--自定义内容部分-->
  <view class="mt-5"><wd-button size="medium" block>主要操作</wd-button></view>
  <view class="mt-5"><wd-button size="medium" type="info" block>辅助操作</wd-button></view>
</wd-msg>
```


## Slots

标签显示内容，自定义内容



## Attributes

| 参数       | 说明                                                               | 类型    | 可选值                                                             | 默认值  | 最低版本         |
| ---------- | ------------------------------------------------------------------ | ------- | ------------------------------------------------------------------ | ------- | ---------------- |
| type       | 主题类型                                                           | string  | 'success'、'warn'、'clear'、'waiting'                        | success | $LOWEST_VERSION$ |
| title       | 文字                                                               | string  | -                                                                  |         | $LOWEST_VERSION$ |
| desc       | 描述文字                                                           | string  | -                                                                  | -       | $LOWEST_VERSION$ |
| size       | icon大小                                                           | number  | -                                                                  | 64       | $LOWEST_VERSION$ |
| color      | icon颜色                                                           | string  | -                                                                  | -       | $LOWEST_VERSION$ |
| src      | 自定义图标                                                           | string  | 图片图标，置src 之后，type失效                                        | -       | $LOWEST_VERSION$ |
| width      | 图标宽度                                                           | number  | 图片图标有效                                        | 90       | $LOWEST_VERSION$ |
| height      | 图标高度                                                           | number  | 图片图标有效                                        | 90       | $LOWEST_VERSION$ |



## 外部样式类

| 类名         | 说明       | 最低版本         |
| ------------ | ---------- | ---------------- |
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
| custom-style | 根节点样式 | $LOWEST_VERSION$ |
