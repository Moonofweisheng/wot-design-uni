#  介绍

该组件库基于`uni-app`+`vue3`构建，根据`wot desing mini`的设计规范进行开发，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。

## 快速上手

请查看[快速上手](#/components/quickUse)文档。

## 扫码体验

<div style="display: inline-block; margin-right: 60px;">
  <img style="width: 150px; height: 150px;" :src="WxQrcode" />
  <div style="text-align: center;">微信扫码</div>
</div>

<div style="display: inline-block;">
  <img style="width: 150px; height: 150px;" :src="AlipayQrcode" />
  <div style="text-align: center;">支付宝扫码</div>
</div>

## 特性

* 50+ 组件
* Vue3 + TypeScript 开发
* 支持 APP、H5、微信小程序、支付宝小程序、钉钉小程序 等平台

> 使用Vue3最新特性开发，持续优化体验

## 链接

* [意见反馈](https://github.com/Moonofweisheng/wot-design-uni/issues)
* [更新日志](/guide/changelog)
* [常见问题](/guide/commonProblems)

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