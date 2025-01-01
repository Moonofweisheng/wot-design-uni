# 加群沟通

如果有问题推荐使用 `Github` 反馈，如果使用 `Github` 等平台无法解决你的问题，可以加群，请确保你的提问清晰明了，用词礼貌文明，非常感谢你的支持！


## 沟通案例

下面介绍几个沟通案例，通过这些案例我们将了解哪些提问方式最容易使问题得到解决。

### 错误案例

**_提问时随意发言，不阅读文档，不提供复现 demo，不提供详细问题描述，充满质疑和抱怨，例如：_**

- 错误案例 1：这 button 真逆天，`custom-class`用不了？
- 错误案例 2：你们这个组件怎么这么垃圾，`custom-class`属性用不了，我自定义样式都不生效，你们能不能修复一下？
- 错误案例 3：？这个组件有 bug？我自定义样式都不生效？？？


### 正确案例

**_仔细察看文档和常见问题后确认未解决再提问，提问时详细描述自己的问题，并提供复现 demo 以便他人协助排查问题。例如：_**

我在使用`Button`组件的`custom-class`属性来自定义样式时遇到了自定义样式不生效的问题，我阅读了官方文档和常见问题，但仍然无法解决，我将我的最小复现 demo 整理到复现仓库了，请问能否帮助排查问题？

## 互助社群

我们提供了 微信公众号、微信群 和 QQ 群，欢迎加入，一起交流学习。

## 微信公众号

欢迎关注公众号【阿鱼聊前端】，我是不如摸鱼去，将会在此公众号分享前端、uni-app与wot-ui组件库相关知识与经验。

微信群可以通过公众号添加【摸鱼小助手】的微信，备注【加群】即可加入。

<div style="display: flex;gap:24px;">
  <img style="min-width: 250px;max-width:400px; height: auto;" :src="wechatPublicAccount" />
</div>

### QQ 群

目前 1、2 群已满，请加 3 群。

<div style="display: flex;gap:24px;flex-wrap: wrap;">
  <img style="width: 250px; height: auto;" :src="QQ1" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
  <img style="width: 250px; height: auto;" :src="QQ2" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
  <img style="width: 250px; height: auto;" :src="QQ3" @click="handleClick" :style="{filter: checked ? 'none' : 'blur(5px)'}" />
</div>

***快速定位问题小技巧***
1. 阅读组件文档，查看是否有遗漏。
2. 查看[常见问题](/guide/common-problems)，是否有类似问题。
3. 查看[Github issues](https://github.com/Moonofweisheng/wot-design-uni/issues)，是否有类似问题。
4. 翻看[更新日志](/guide/changelog)，查看是否有相关更新。
5. 学习[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/)，如何快速提出正确的问题。
6. 交流群主要是提供一个互助交流的平台，请友好交流，不做伸手党，感谢支持。

<el-checkbox  v-model="checked" label="我已阅读，并保证提问时遵守以上规范" />


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
  ElMessageBox.alert('请阅读以上沟通案例和小技巧并在下方勾选我已阅读，保证提问时遵守相关规范后可以加群。以任何形式加入到群聊，即表示同意遵守相关规范，请知悉', '提示', {
    confirmButtonText: '我知道了',
  })
  }
}
</script>
