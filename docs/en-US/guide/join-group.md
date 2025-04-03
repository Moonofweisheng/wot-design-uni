# Join Communication Group

If you have questions, it's recommended to use `Github` for feedback. If platforms like `Github` can't solve your problem, you can join our groups. Please ensure your questions are clear and concise, and use polite and civil language. Thank you very much for your support!

## Communication Examples

Here are several communication examples that will help us understand which questioning methods are most likely to get problems solved.

### Incorrect Examples

**_Asking questions casually, not reading documentation, not providing reproduction demo, not providing detailed problem description, full of doubt and complaints, for example:_**

- Wrong Example 1: This button is ridiculous, `custom-class` doesn't work?
- Wrong Example 2: How can your component be so terrible? The `custom-class` attribute doesn't work, my custom styles don't take effect, can you fix it?
- Wrong Example 3: ? This component has a bug? My custom styles don't work???

### Correct Examples

**_After carefully checking the documentation and common problems and confirming the issue is unresolved, describe your problem in detail when asking questions, and provide a reproduction demo to help others investigate the problem. For example:_**

I encountered an issue where custom styles don't take effect when using the `Button` component's `custom-class` attribute. I've read the official documentation and common problems but still can't solve it. I've organized my minimal reproduction demo in a repository, could you help investigate the issue?

## Support Communities

We provide WeChat Official Account, WeChat Groups, and QQ Groups. Welcome to join and exchange learning experiences.

## WeChat Official Account

Welcome to follow the official account 【阿鱼聊前端】(Fish Talks Frontend). I'm 不如摸鱼去 (Rather Go Fish), and I will share knowledge and experience about frontend, uni-app, and wot-ui component library on this official account.

You can join the WeChat group by adding 【摸鱼小助手】(Fish Assistant) on WeChat through the official account, note "Join Group".

<div style="display: flex;gap:24px;">
  <img style="min-width: 250px;max-width:400px; height: auto;" :src="wechatPublicAccount" />
</div>

### QQ Groups

Currently, Groups 1 and 2 are full, please join Group 3.

<div style="display: flex;gap:24px;flex-wrap: wrap;">
  <img style="width: 250px; height: auto;" :src="QQ1" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
  <img style="width: 250px; height: auto;" :src="QQ2" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
  <img style="width: 250px; height: auto;" :src="QQ3" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
</div>

***Quick Problem Location Tips***
1. Read component documentation to check for any omissions.
2. Check [Common Problems](/en-US/guide/common-problems) for similar issues.
3. Check [Github issues](https://github.com/Moonofweisheng/wot-design-uni/issues) for similar problems.
4. Review [Changelog](/en-US/guide/changelog) for relevant updates.
5. Learn [How To Ask Questions The Smart Way](https://lug.ustc.edu.cn/wiki/doc/smart-questions/), how to quickly ask the right questions.
6. The communication groups mainly provide a platform for mutual assistance and exchange. Please communicate friendly and don't be a freeloader. Thank you for your support.

<el-checkbox v-model="checked" label="I have read and promise to follow the above guidelines when asking questions" />

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import QQ1 from '/QQ1.jpg'
import QQ2 from '/QQ2.jpg'
import QQ3 from '/QQ3.jpg'
import wechatPublicAccount from '/wechatPublicAccount.png'

const checked = ref(false)

function handleClick() {
  if (!checked.value) {
  ElMessageBox.alert('Please read the communication examples and tips above and check "I have read" below, promising to follow the relevant guidelines when asking questions. By joining the group chat in any form, you agree to comply with the relevant guidelines, please be aware', 'Tip', {
    confirmButtonText: 'I understand',
  })
  }
}
</script>