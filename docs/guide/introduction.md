#  介绍

`wot-design-uni`组件库基于`vue3`+`Typescript`构建，参照`wot design`的设计规范进行开发，提供60+高质量组件，支持暗黑模式、国际化和自定义主题，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。

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

- 🎯 多平台覆盖，支持 微信小程序、支付宝小程序、钉钉小程序、H5、APP 等.
- 🚀 60+ 个高质量组件，覆盖移动端主流场景.
- 💪 使用 Typescript 构建，提供良好的组件类型系统.
- 🌍 支持国际化，内置 6 种语言包.
- 📖 提供丰富的文档和组件示例.
- 🎨 支持修改 CSS 变量实现主题定制.
- 🍭 支持暗黑模式

> 使用Vue3最新特性开发，持续优化体验

## 链接

* [意见反馈](https://github.com/Moonofweisheng/wot-design-uni/issues)
* [更新日志](/guide/changelog)
* [常见问题](/guide/common-problems)
* [Discussions 讨论区](https://github.com/Moonofweisheng/wot-design-uni/discussions)
* [QQ 群](https://qm.qq.com/cgi-bin/qm/qr?k=O1Z3pal6StL39qHtABqR54Tb56igr90O&jump_from=webapi&authKey=MtVWfi/EQbT03wW7tKXv4bmyKYHBHtzI8VewlzSsOdxFjN0wbgNy17np9Z9yC4Z8)
* [快速上手项目](https://github.com/Moonofweisheng/wot-starter)
* [Vue3路由库](https://wot-design-uni.gitee.io/uni-mini-router/)

## 开发计划

开发计划已公布在[Discussions 讨论区](https://github.com/Moonofweisheng/wot-design-uni/discussions/45)中，欢迎参与讨论，提出意见和建议。
  
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