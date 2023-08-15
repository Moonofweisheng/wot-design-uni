<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-15 11:54:31
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\popup\Index.vue
 * 记得注释
-->
<template>
  <view>
    <page-wraper>
      <demo-block title="基本用法">
        <wd-button @click="handleClick1">弹出层</wd-button>
      </demo-block>
      <demo-block title="弹出位置">
        <wd-button @click="handleClick2">顶部</wd-button>
        <wd-button @click="handleClick3">右侧</wd-button>
        <wd-button @click="handleClick4">底部</wd-button>
        <wd-button @click="handleClick5">左侧</wd-button>
      </demo-block>
      <demo-block title="关闭按钮">
        <wd-button @click="handleClick6">关闭按钮</wd-button>
      </demo-block>

      <wd-popup v-model="show1" custom-style="padding: 30px 40px;" @close="handleClose1"><text class="custom-txt">内容</text></wd-popup>
      <wd-popup v-model="show2" position="top" custom-style="height: 200px;" @close="handleClose2"></wd-popup>
      <wd-popup v-model="show3" position="right" custom-style="width: 200px;" @close="handleClose3"></wd-popup>
      <wd-popup v-model="show4" position="bottom" custom-style="height: 200px;" @close="handleClose4"></wd-popup>
      <wd-popup v-model="show5" position="left" custom-style="width: 200px;" @close="handleClose5"></wd-popup>
      <wd-popup v-model="show6" position="bottom" closable custom-style="height: 200px;" @close="handleClose6"></wd-popup>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show1 = ref<boolean>(false)
const show2 = ref<boolean>(false)
const show3 = ref<boolean>(false)
const show4 = ref<boolean>(false)
const show5 = ref<boolean>(false)
const show6 = ref<boolean>(false)

function handleClick1() {
  show1.value = true
}
function handleClose1() {
  show1.value = false
}
function handleClick2() {
  show2.value = true
}
function handleClose2() {
  show2.value = false
}
function handleClick3() {
  show3.value = true
}
function handleClose3() {
  show3.value = false
}
function handleClick4() {
  show4.value = true
}
function handleClose4() {
  show4.value = false
}
function handleClick5() {
  show5.value = true
}
function handleClose5() {
  show5.value = false
}
function handleClick6() {
  show6.value = true
}
function handleClose6() {
  show6.value = false
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}

.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}

.custom-txt {
  color: black;
}
</style>
