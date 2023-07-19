## 快速上手

本节介绍如何在小程序中使用 `Wot Design Uni`

### 下载组件库项目

通过 `github`下载组件库源码：

* 进入[下载页面](https://github.com/jd-ftf/wot-design-uni/releases)，选择合适版本的源码。

* 将下载的源码解压缩，将解压后得到到`wot-design` 文件夹复制到你的小程序工程中如下结构：

```node
.
├── app.js
├── app.json
├── app.wxss
├── wot-design               # wot-design 组件库源码文件夹
|   └── button               # button 组件源码
|       ├── index.js
|       ├── index.json
|       ├── index.jxml
|       └── index.jxss
├── pages                    # 小程序项目页面使用目录
├── project.config.json
└── sitemap.json
```

在页面的 index.json 文件中引入需要使用的组件：

```json
{
  "usingComponents": {
    "wd-button": "/wot-design/button/index"
  }
}
```

在页面中就可以使用该组件：

```html
<view>
  <wd-button>按钮</wd-button>
</view>
```
