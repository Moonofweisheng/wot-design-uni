<!--
 * @Author: 810505339
 * @Date: 2025-01-10 15:49:26
 * @LastEditors: 810505339
 * @LastEditTime: 2025-01-11 22:10:22
 * @FilePath: \wot-design-uni\src\pages\signature\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基础用法">
      <wd-signature @confirm="confirm" />
      <wd-img :height="img.height" :width="img.width" :src="img.src" v-if="img.src" />
    </demo-block>
    <demo-block title="自定义颜色">
      <wd-signature pen-color="red" />
    </demo-block>
    <demo-block title="自定义宽度">
      <wd-signature :line-width="6" />
    </demo-block>
    <demo-block title="自定义按钮">
      <wd-signature :disabled="disabled">
        <template #footer="{ clear, confirm }">
          <wd-button block @click="changeDisabled" v-if="disabled">开始签名</wd-button>
          <wd-button v-if="!disabled" size="small" plain @click="clear">清除</wd-button>
          <wd-button v-if="!disabled" size="small" style="margin-left: 4px" @click="confirm">确认</wd-button>
        </template>
      </wd-signature>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { FileType } from '@/uni_modules/wot-design-uni/components/wd-signature/types'
import { ref } from 'vue'
const img = ref({
  width: 0,
  height: 0,
  src: ''
})
const disabled = ref(true)
function confirm(result: FileType) {
  img.value.src = result.tempFilePath
  img.value.height = result.height
  img.value.width = result.width
}
function changeDisabled() {
  disabled.value = false
}
</script>
