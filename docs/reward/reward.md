# 🥤一杯咖啡

如果您认为本项目对你的工作起到了帮助，可以通过以下方式捐助组件库的研发工作，使本项目持续发展下去，捐赠后你的头像、昵称和主页将会被展示在 `wot design uni` 文档的捐赠榜单上。

:::tip
捐赠后，可以发送邮件到1780903673@qq.com或者通过github、微信群等社交平台告知要展示的捐赠者名称、留言、链接 (链接可以是您的博客、github、个人网站、公司产品等)
:::



### 爱发电捐赠

<a href="https://afdian.com/a/weisheng233">https://afdian.com/a/weisheng233</a>


### 扫码捐赠


<div style="display: inline-block; margin-right: 120px;">
  <img style="width: 250px; height: 250px;" :src="WxQrcode" />
  <div style="text-align: center;">微信</div>
</div>

<div style="display: inline-block;">
  <img style="width: 250px; height: 250px;" :src="AlipayQrcode" />
  <div style="text-align: center;">支付宝</div>
</div>

<script>
import WxQrcode from '/weixinQrcode.jpg'
import AlipayQrcode from '/alipayQrcode.jpg'

export default {
  data () {
    return {
      WxQrcode,
      AlipayQrcode
    }
  }
}
</script>