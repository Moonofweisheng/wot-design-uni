<template>
  <page-wraper>
    <demo-block title="基础用法">
      <wd-signature @confirm="confirm" @clear="clear" :export-scale="2" />
      <wd-img v-if="img.tempFilePath" mode="widthFix" width="100%" :src="img.tempFilePath" />
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
