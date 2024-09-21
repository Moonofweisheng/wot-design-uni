<template>
  <wd-toast></wd-toast>

  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-cell-group border>
        <wd-cell title="默认键盘" is-link @click="showKeyBoard(1)" />
        <wd-cell title="带右侧栏的键盘" is-link @click="showKeyBoard(2)" />
        <wd-cell title="身份证键盘" is-link @click="showKeyBoard(3)" />
        <wd-cell title="带标题的键盘" is-link @click="showKeyBoard(4)" />
        <wd-cell title="slot自定义标题" is-link @click="showKeyBoard(9)" />
        <wd-cell title="多个额外按键" is-link @click="showKeyBoard(5)" />
        <wd-cell title="随机数字键盘" is-link @click="showKeyBoard(6)" />
        <wd-cell title="车牌号键盘" is-link @click="showKeyBoard(10)" />
        <wd-cell title="双向绑定" clickable :value="value1" @click="showKeyBoard(7)" />
        <wd-cell title="展示蒙层" clickable @click="showKeyBoard(8)" />
      </wd-cell-group>
    </demo-block>

    <wd-keyboard v-model:visible="visible1" @input="onInput" @delete="onDelete"></wd-keyboard>
    <wd-keyboard v-model:visible="visible2" mode="custom" extra-key="." close-text="完成" @input="onInput" @delete="onDelete"></wd-keyboard>
    <wd-keyboard v-model:visible="visible3" extra-key="X" close-text="完成" @input="onInput" @delete="onDelete" />
    <wd-keyboard v-model:visible="visible4" title="输入密码" extra-key="." close-text="完成" @input="onInput" @delete="onDelete"></wd-keyboard>
    <wd-keyboard v-model:visible="visible9" extra-key="." close-text="完成" @input="onInput" @delete="onDelete">
      <template #title>
        <text style="color: red">自定义标题</text>
      </template>
    </wd-keyboard>

    <wd-keyboard v-model:visible="visible5" mode="custom" :extra-key="['00', '.']" close-text="完成" @input="onInput" @delete="onDelete" />

    <wd-keyboard v-model:visible="visible6" random-key-order @input="onInput" @delete="onDelete" />

    <wd-keyboard
      v-model="value1"
      :maxlength="6"
      v-model:visible="visible7"
      title="键盘标题"
      extra-key="."
      close-text="完成"
      @input="onInput"
      @delete="onDelete"
    ></wd-keyboard>

    <wd-keyboard :modal="true" v-model:visible="visible8" @input="onInput" @delete="onDelete" />

    <wd-keyboard v-model:visible="visible10" mode="car" @input="onInput" @delete="onDelete" />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
const { show: showToast } = useToast()
const visible1 = ref<boolean>(false)
const visible2 = ref<boolean>(false)
const visible3 = ref<boolean>(false)
const visible4 = ref<boolean>(false)
const visible5 = ref<boolean>(false)
const visible6 = ref<boolean>(false)
const visible7 = ref<boolean>(false)
const visible8 = ref<boolean>(false)
const visible9 = ref<boolean>(false)
const visible10 = ref<boolean>(false)

const visibleArr = [visible1, visible2, visible3, visible4, visible5, visible6, visible7, visible8, visible9, visible10]

const value1 = ref<string>('')

function showKeyBoard(index: number) {
  visibleArr.forEach((item, i) => (i === index - 1 ? (item.value = true) : (item.value = false)))
}

const onInput = (value: string) => showToast(`${value}`)
const onDelete = () => showToast('删除')
</script>
<style lang="scss" scoped></style>
