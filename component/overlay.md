---
url: 'https://wot-design-uni.cn/component/overlay.md'
---
# Overlay 遮罩层 0.1.30

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 基础用法

使用 `show` 控制遮罩层的显示/隐藏。

```html
<wd-button type="primary" @click="show = true">显示遮罩层</wd-button>
<wd-overlay :show="show" @click="show = false" />
```

## 嵌入内容

通过 `type` 修改指示器的类型，可选值为 'outline'，适用于通用模块加载。

```html
<wd-button type="primary" @click="show = true">嵌入内容</wd-button>
<wd-overlay :show="show" @click="show = false">
  <view class="wrapper">
    <view class="block" @click.stop="" />
  </view>
</wd-overlay>
```

```scss
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
```

## Attributes

| 参数        | 说明               | 类型              | 可选值 | 默认值 | 最低版本 |
| ----------- | ------------------ | ----------------- | ------ | ------ | -------- |
| show        | 是否展示遮罩层     | `boolean`         | true   | false  | -        |
| duration    | 动画时长，单位毫秒 | `string / number` | -      | 300    | -        |
| lockScroll  | 是否锁定滚动       | `boolean`         | false  | true   | -        |
| zIndex      | 层级               | `number`          | -      | 10     | -        |
| customStyle | 自定义样式         | `string`          | -      | -      | -        |
