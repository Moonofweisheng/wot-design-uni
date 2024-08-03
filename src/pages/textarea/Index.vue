<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-textarea v-model="value1" placeholder="请填写评价" />
    </demo-block>
    <demo-block title="只读" transparent>
      <wd-textarea v-model="value8" readonly clearable></wd-textarea>
    </demo-block>
    <demo-block title="禁用" transparent>
      <wd-textarea v-model="value11" disabled clearable></wd-textarea>
    </demo-block>
    <demo-block title="清空按钮 和 字数限制" transparent>
      <wd-textarea v-model="value2" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block title="有值且聚焦时展示清空按钮" transparent>
      <wd-textarea clear-trigger="focus" v-model="value14" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block title="点击清除按钮时不自动聚焦" transparent>
      <wd-textarea v-model="value15" :focus-when-clear="false" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block title="大尺寸" transparent>
      <wd-textarea v-model="value7" size="large" :maxlength="120" clearable show-word-limit></wd-textarea>
    </demo-block>
    <demo-block title="高度自适应">
      <wd-textarea v-model="value3" auto-height clearable></wd-textarea>
    </demo-block>

    <demo-block title="cell 类型" transparent>
      <wd-cell-group border>
        <wd-textarea label="高度自适应" auto-height clearable v-model="value5" placeholder="请输入..." prefix-icon="location" />
        <wd-textarea label="清空按钮" clearable v-model="value4" placeholder="请输入..." required />
        <wd-textarea label="字数限制" :maxlength="240" clearable show-word-limit v-model="value6" placeholder="请输入..." required />
        <wd-textarea label="只读" readonly clearable :maxlength="240" show-word-limit v-model="value12" placeholder="请输入..." required />
        <wd-textarea label="禁用" disabled clearable :maxlength="240" show-word-limit v-model="value13" placeholder="请输入..." required />
      </wd-cell-group>
    </demo-block>

    <demo-block title="大尺寸" transparent>
      <wd-cell-group border>
        <wd-textarea label="高度自适应" auto-height size="large" clearable v-model="value9" placeholder="请输入..." required />
        <wd-textarea label="字数限制" size="large" :maxlength="240" clearable show-word-limit v-model="value10" placeholder="请输入..." required />
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string>('')
const value2 = ref<string>('支持清空和字数限制的文本域')
const value3 = ref<string>('输入文字后，输入框高度跟随字数多少变化')
const value4 = ref<string>('')
const value5 = ref<string>('')
const value6 = ref<string>('')
const value7 = ref<string>('')
const value8 = ref<string>('只读只读只度')
const value9 = ref<string>('')
const value10 = ref<string>('')
const value11 = ref<string>('禁用禁用禁用')
const value12 = ref<string>('只读只读只度')
const value13 = ref<string>('禁用禁用禁用')
const value14 = ref<string>('')
const value15 = ref<string>('')
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix-slot {
  display: inline-block;
  height: 37px;
  line-height: 37px;
  margin-left: 8px;
  vertical-align: middle;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
