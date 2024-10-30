<frame/>

# Loading-page 加载页

## 基本用法

基本用法

```html
<wd-loading-page :loading="show" />
```

```js
const show = ref(false)
```

## 自定义背景色

通过 `bgColor` 修改背景色。

```html
<wd-loading-page :loading="show" bgColor="rgba(0, 0, 0, .9)" />
```

```js
const show = ref(false)
```

## 自定义图片

通过 `loadingImage` 属性修改 loding 图片。

```html
<wd-loading-page :loading="show" loadingImage="https://wot-design-uni.pages.dev/wot-design.png" />
```

```js
const show = ref(false)
```

## 自定义插槽内容

通过 `#default` 自定义 loding 内容。

```html
<wd-loading-page :loading="show">
  <template #default>
    <view class="custom-class">
      <view class="loading">
        <wd-loading />
      </view>
      <view class="mt-2">加载中...</view>
    </view>
  </template>
</wd-loading-page>
```

```js
const show = ref(false)
```

```scss
.custom-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.8);
}

.mt-2 {
  margin-top: 8px;
}
```

## Attributes

| 参数         | 说明                                | 类型    | 可选值 | 默认值   | 最低版本 |
| ------------ | ----------------------------------- | ------- | ------ | -------- | -------- |
| fontSize     | 字体大小                            | string  | -      | 16px     | -        |
| color        | 字体颜色                            | string  | -      | 18px     | -        |
| loadingText  | 加载时显示的文字                    | string  | -      | 正在加载 | -        |
| loading      | 是否加载中                          | boolean | -      | false    | -        |
| bgColor      | 背景颜色                            | string  | -      | #ffffff  | -        |
| loadingColor | 加载图标颜色                        | string  | -      | #C8C8C8  | -        |
| loadingImage | 文字上方用于替换 loading 动画的图片 | string  | -      | 空字符串 | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
