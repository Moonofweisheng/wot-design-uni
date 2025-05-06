# 🥤A Cup of Coffee

If you find this project helpful for your work, you can support the development of the component library through the following ways. Your contribution will help this project continue to grow. After donating, your avatar, nickname, and homepage will be displayed on the donor list in the `wot design uni` documentation.

:::tip Reminder
After making a donation, you can send an email to 1780903673@qq.com or contact through social platforms like GitHub or WeChat groups to provide your donor name, message, and link (the link can be your blog, GitHub, personal website, company product, etc.). If possible, please make sure to leave your Github username.
:::

### Afdian Donation

<a href="https://afdian.com/a/weisheng233">https://afdian.com/a/weisheng233</a>

### Scan to Donate

<div style="display: inline-block; margin-right: 120px;">
  <img style="width: 250px; height: 250px;" :src="WxQrcode" />
  <div style="text-align: center;">WeChat</div>
</div>

<div style="display: inline-block;">
  <img style="width: 250px; height: 250px;" :src="AlipayQrcode" />
  <div style="text-align: center;">Alipay</div>
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