<frame/>

#  StatusTip 缺省提示

一般用于兜底占位展示。

> 本组件使用图片均为外链，推荐将图片下载到开发者的服务器后通过自定义图片`URL`使用。


## 基本用法

设置 `image` 修改展示缺省图片类型，默认为 `network`，可选值 `search`, `network`, `content`, `collect`, `comment`, `halo`, `message`。可设置 `tip` 来控制展示提示文案。

```html
<wd-status-tip image="search" tip="当前搜索无结果"/>
<wd-status-tip image="network" tip="该页面暂时无法访问"/>
<wd-status-tip image="content" tip="暂无内容"/>
<wd-status-tip image="collect" tip="暂无收藏"/>
<wd-status-tip image="comment" tip="当前没有联系人名单哦～"/>
<wd-status-tip image="halo" tip="支付失败，请重新订购"/>
<wd-status-tip image="message" tip="已订阅全部消息"/>
```

## 自定义大小

通过 `image-size` 属性图片的大小。

```html
<wd-status-tip image-size="100" image="search" tip="当前搜索无结果" />
```

## 自定义图片

需要自定义图片时，可以在 `image` 属性中传入任意图片 URL。


```html
<wd-status-tip image="https://img.wot-design-uni.cn/static/1.jpg" tip="查看我的头像" />
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| image | 缺省图片类型，支持传入图片 URL | string | search / network / content / collect / comment / halo / message | network | - |
| image-size	 | 图片大小，默认单位为 `px`	 | `string`/`number` | - | - | - |
| tip | 提示文案 | string | - | - | - |
