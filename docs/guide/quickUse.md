# 快速上手

本节介绍如何在`uni-app`项目中使用 `Wot Design Uni`

## 安装

`Wot Design Uni` 支持 uni_modules 规范，已经上架到 uni-app 的插件市场，故我们推荐使用 uni_modules 的方式引入，方便更新。

在`uni-app插件市场`选择使用`HBuildX`导入，或者选择手动在src目录下创建uni_modules文件夹并将Wot Design Uni解压到uni_modules中，结构如下:
``` 
- uni_modules
- - - wot-design-uni 
```

下载地址：<a href="https://ext.dcloud.net.cn/plugin?id=13889"><span >wot-design-uni</span></a>


## 使用
`Wot Design Uni`的组件支持easycom规范，故可以直接在.vue中使用，无需在页面内import，也不需要在components内声明，即可在任意页面使用。值得注意的是，uni-app平台不支持全局挂载组件，所以```Message```、```Toast```等组件仍需在SFC中显式使用，例如:
``` html
<wd-toast></wd-toast>
```
