<template>
  <page-wraper>
    <wd-message-box></wd-message-box>
    <wd-toast></wd-toast>
    <wd-message-box selector="wd-message-box-slot" use-slot>
      <wd-rate custom-class="custom-rate-class" v-model="value" />
    </wd-message-box>
    <demo-block title="alert">
      <wd-button @click="alert">alert</wd-button>
    </demo-block>

    <demo-block title="显示标题">
      <wd-button @click="alertWithTitle">alert</wd-button>
    </demo-block>

    <demo-block title="confirm">
      <wd-button @click="confirm">confirm</wd-button>
    </demo-block>

    <demo-block title="prompt">
      <wd-button @click="prompt">prompt</wd-button>
    </demo-block>

    <demo-block title="当文案过长时，弹框的高度不再增加，而是将文案内容设置成滚动">
      <wd-button @click="alertWithLongChar">alert</wd-button>
    </demo-block>

    <demo-block title="使用wd-message-box组件，通过slot插入其他组件内容">
      <wd-button @click="withSlot">custom</wd-button>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useMessage } from '@/uni_modules/wot-design-uni/components/wd-message-box'
import { ref } from 'vue'
const value = ref<number>(1)
const value1 = ref<string>('')

const message = useMessage()
const message1 = useMessage('wd-message-box-slot')

function alert() {
  message.alert('操作成功')
}
function alertWithTitle() {
  message.alert({
    msg: '提示文案',
    title: '标题'
  })
}
function confirm() {
  message.confirm({
    msg: '是否删除',
    title: '提示'
  })
}
function prompt() {
  message
    .prompt({
      title: '请输入邮箱',
      inputValue: value1.value,
      inputPattern: /.+@.+\..+/i
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}
function alertWithLongChar() {
  message.alert({
    msg: '以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文',
    title: '标题'
  })
}
function withSlot() {
  message1.show({
    title: '评分'
  })
}
</script>
<style lang="scss" scoped>
:deep(.custom-rate-class) {
  display: block;
  height: 22px;
}
</style>
