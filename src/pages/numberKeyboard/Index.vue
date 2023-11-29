<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-cell-group border>
        <wd-cell title="弹出默认键盘" is-link @click="showKeyBoard(1)" />
        <wd-cell title="弹出带右侧栏的键盘" is-link @click="showKeyBoard(2)" />
        <wd-cell title="危险通知" is-link @click="showKeyBoard(3)" />
        <wd-cell title="警告通知" is-link @click="showKeyBoard(4)" />
      </wd-cell-group>
      <wd-number-keyboard v-model:visible="visible1"></wd-number-keyboard>

      <wd-number-keyboard v-model:visible="visible2" mode="custom" extra-key="." close-text="完成"></wd-number-keyboard>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const visible1 = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const visible4 = ref<boolean>(false)

const visibleArr = [visible1, visible2, visible3, visible4]

function showKeyBoard(index: number) {
  visibleArr.forEach((item, i) => (i === index - 1 ? (item.value = true) : (item.value = false)))
}
</script>
<style lang="scss" scoped></style>
