---
url: 'https://wot-design-uni.cn/component/status-tip.md'
---
# StatusTip 缺省提示

一般用于兜底占位展示。

::: warning 注意
本组件使用图片均为外链，***不保证稳定性***，推荐将图片下载到开发者的服务器后通过自定义图片`URL`或者自定义`url-prefix`使用。1.3.11版本开始支持自定义图片地址前缀`url-prefix`。

下载地址：

1. Github 仓库：<https://github.com/Moonofweisheng/wot-design-uni-assets>
2. npm 地址：

* npm：<https://www.npmjs.com/package/wot-design-uni-assets>
* 淘宝镜像：<https://npmmirror.com/package/wot-design-uni-assets>

:::

## 基本用法

设置 `image` 修改展示缺省图片类型，默认为 `network`，可选值 `search`, `network`, `content`, `collect`, `comment`, `halo`, `message`。可设置 `tip` 来控制展示提示文案。

```html
<wd-status-tip image="search" tip="当前搜索无结果" />
<wd-status-tip image="network" tip="该页面暂时无法访问" />
<wd-status-tip image="content" tip="暂无内容" />
<wd-status-tip image="collect" tip="暂无收藏" />
<wd-status-tip image="comment" tip="当前没有联系人名单哦～" />
<wd-status-tip image="halo" tip="支付失败，请重新订购" />
<wd-status-tip image="message" tip="已订阅全部消息" />
```

## 自定义大小

通过 `image-size` 属性图片的大小。

```html
<wd-status-tip
  :image-size="{
          height: 200,
          width: 300
  }"
  image="search"
  tip="当前搜索无结果"
/>
```

## 自定义图片

需要自定义图片时，可以在 `image` 属性中传入任意图片 URL。

```html
<wd-status-tip image="https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg" tip="查看我的头像" />
```

## 自定义图片内容

使用插槽 `image` 可以自定义图片内容。

```html
<wd-status-tip tip="自定义图片内容">
  <template #image>
    <wd-icon name="ie-filled" size="100px"></wd-icon>
  </template>
</wd-status-tip>
```

## Attributes

| 参数       | 说明                                               | 类型                          | 可选值                                                          | 默认值                                                        | 最低版本         |
| ---------- | -------------------------------------------------- | ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ---------------- |
| image      | 缺省图片类型，支持传入图片 URL                     | string                        | search / network / content / collect / comment / halo / message | network                                                       | -                |
| image-size | 图片大小，默认单位为 `px`                          | `string`/`number`/`ImageSize` | -                                                               | -                                                             | -                |
| tip        | 提示文案                                           | string                        | -                                                               | -                                                             | -                |
| image-mode | 预览图片的 mode 属性                               | `ImageMode`                   | -                                                               | aspectFit                                                     | 1.2.12           |
| url-prefix | 图片路径前缀，指向图片所在目录，用于拼接图片 URL。 | string                        | -                                                               | https://registry.npmmirror.com/wot-design-uni-assets/\*/files/ | 1.3.11 |

### ImageSize

| 参数   | 说明                      | 类型             | 可选值 | 默认值 | 最低版本 |
| ------ | ------------------------- | ---------------- | ------ | ------ | -------- |
| height | 图片高度，默认单位为 `px` | string / number | -      | -      | 1.2.12   |
| width  | 图片宽度，默认单位为 `px` | string / number | -      | -      | 1.2.12   |

## Slot

| name    | 说明                     | 最低版本 |
| ------- | ------------------------ | -------- |
| image   | 图片内容                  | 1.3.12 |
