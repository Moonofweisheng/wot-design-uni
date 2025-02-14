<!--
 * @Author: 810505339
 * @Date: 2025-02-11 21:17:21
 * @LastEditors: 810505339
 * @LastEditTime: 2025-02-14 12:22:03
 * @FilePath: \wot-design-uni\src\pages\signature\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基础用法">
      <wd-signature @confirm="confirm" @clear="clear" :export-scale="2" />
      <wd-img v-if="img.tempFilePath" mode="widthFix" width="100%" :src="img.tempFilePath" />
    </demo-block>
    <demo-block title="开启历史记录">
      <wd-signature :history="true" background-color="lightgray" />
    </demo-block>
    <demo-block title="自定义画笔颜色">
      <wd-signature pen-color="red" />
    </demo-block>
    <demo-block title="自定义画笔宽度">
      <wd-signature :line-width="6" />
    </demo-block>
    <demo-block title="自定义背景颜色">
      <wd-signature background-color="lightgray" />
    </demo-block>
    <demo-block title="自定义插槽">
      <wd-signature :disabled="disabled" :history="true" :step="3">
        <template #footer="{ clear, confirm, currentStep, undo, redo }">
          <wd-button block @click="changeDisabled" v-if="disabled">开始签名</wd-button>
          <block v-if="!disabled">
            <wd-button size="small" plain @click="undo" :disabled="currentStep <= 0">撤销三步</wd-button>
            <wd-button size="small" plain @click="redo">恢复三步</wd-button>
            <wd-button size="small" plain @click="clear">清除</wd-button>
            <wd-button size="small" style="margin-left: 4px" @click="confirm">确认</wd-button>
          </block>
        </template>
      </wd-signature>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'
import { ref } from 'vue'

const img = ref<Partial<SignatureResult>>({})

const disabled = ref(true)

function confirm(result: SignatureResult) {
  img.value = result
}

function clear() {
  img.value = {}
}

function changeDisabled() {
  disabled.value = false
}
</script>
