# 榜上有名

感谢各位捐赠者对本项目的支持，以下排名不分先后，按时间顺序排列。

:::tip 提醒
捐赠后，可以发送邮件到1780903673@qq.com或者通过github、微信群等社交平台告知要展示的捐赠者名称、留言、链接 (链接可以是您的博客、github、个人网站、公司产品等)，如果可以，请务必留下你的Github用户名。
:::

## 捐赠榜单

<table v-if="data&&data.donor">
  <thead>
    <tr>
      <th>捐赠者</th>
      <th>留言</th>
      <th>链接</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(donor,index) in data.donor">
      <td>{{donor.name}}</td>
      <td>{{donor.message}}</td>
      <td>
          <el-link v-if="donor.link!=='-'" :href="donor.link" target="_blank">{{donor.link}}</el-link>
          <span v-else>-</span>
      </td>
    </tr>
  </tbody>
</table>

:beers::beers::beers: 再次感谢各位捐赠者的支持，也欢迎大家提出自己的意见和建议。:beers::beers::beers:

<script setup>
import { useSponsor } from '../.vitepress/theme/composables/sponsor'
const { data } = useSponsor()
</script>
