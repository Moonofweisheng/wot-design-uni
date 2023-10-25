#  介绍

`wot-design-uni`组件库基于`vue3`+`Typescript`构建，参照`wot desing`的设计规范进行开发，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。

## 快速上手

请查看[快速上手](/guide/quick-use.html)文档。

## 扫码体验

<div style="display: inline-block; margin-right: 60px;">
  <img style="width: 150px; height: 150px;" :src="WxQrcode" />
  <div style="text-align: center;">微信扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AlipayQrcode" />
  <div style="text-align: center;">支付宝扫码</div>
</div>

## ✨ 特性

- 🚀 支持 APP、H5、微信小程序 等平台.
- 🚀 60+ 个高质量组件，覆盖移动端主流场景.
- 💪 使用 Typescript 构建，提供良好的组件类型系统.
- 💪 采用 Vue3 最新特性，提升组件性能.
- 📖 提供丰富的文档和组件示例.
- 🎨 支持主题定制，可以定制scss变量以及组件的样式自定义.
- 🍭 支持暗黑模式

> 使用Vue3最新特性开发，持续优化体验

## 链接

* [意见反馈](https://github.com/Moonofweisheng/wot-design-uni/issues)
* [更新日志](/guide/changelog)
* [常见问题](/guide/common-problems)
* [Discussions 讨论区](https://github.com/Moonofweisheng/wot-design-uni/discussions)
* [QQ 群](https://qm.qq.com/cgi-bin/qm/qr?k=O1Z3pal6StL39qHtABqR54Tb56igr90O&jump_from=webapi&authKey=MtVWfi/EQbT03wW7tKXv4bmyKYHBHtzI8VewlzSsOdxFjN0wbgNy17np9Z9yC4Z8)
* [快速上手项目](https://github.com/Moonofweisheng/wot-starter)
* [Vue3路由库](https://moonofweisheng.gitee.io/uni-mini-router/)
  
## 开源协议

本项目遵循 MIT 协议。

<script>
import WxQrcode from '/wx.jpg'
import AlipayQrcode from '/alipay.png'

export default {
  data () {
    return {
      WxQrcode,
      AlipayQrcode
    }
  }
}
</script>