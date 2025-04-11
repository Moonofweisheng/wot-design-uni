# Hall of Fame

Thank you to all donors for supporting this project. The following list is arranged in chronological order, not by donation amount.

:::tip Reminder
After making a donation, you can send an email to 1780903673@qq.com or contact through social platforms like GitHub or WeChat groups to provide your donor name, message, and link (the link can be your blog, GitHub, personal website, company product, etc.). If possible, please make sure to leave your Github username.
:::

## Donor List

<table v-if="data&&data.donor">
  <thead>
    <tr>
      <th>Donor</th>
      <th>Message</th>
      <th>Link</th>
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

:beers::beers::beers: Thank you again to all donors for your support. We also welcome everyone to share your opinions and suggestions. :beers::beers::beers:

<script setup>
import { useSponsor } from '../../.vitepress/theme/composables/sponsor'
const { data } = useSponsor()
</script>