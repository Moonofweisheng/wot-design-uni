<template>
  <page-wraper>
    <demo-block title="基本用法" transparent>
      <wd-cell-group>
        <wd-cell title="基础用法" is-link @click="showBasicNotify" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="通知类型" transparent>
      <wd-cell-group>
        <wd-cell title="主要通知" is-link @click="showType('primary')" />
        <wd-cell title="成功通知" is-link @click="showType('success')" />
        <wd-cell title="危险通知" is-link @click="showType('danger')" />
        <wd-cell title="警告通知" is-link @click="showType('warning')" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="自定义配置" transparent>
      <wd-cell-group>
        <wd-cell title="自定义颜色" is-link @click="showCustomColor" />
        <wd-cell title="自定义位置" is-link @click="showCustomPosition" />
        <wd-cell title="自定义时长" is-link @click="showCustomDuration" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="使用 Notify 组件" transparent>
      <wd-cell-group>
        <wd-cell title="使用 Notify 组件" is-link @click="showNotifyComponent" />
      </wd-cell-group>
    </demo-block>
    <wd-notify selector="visible" type="success" v-model:visible="visible">
      <wd-icon name="check-outline" size="inherit" color="inherit" />
      成功通知
    </wd-notify>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { NotifyType } from '@/uni_modules/wot-design-uni/components/wd-notify/types'
import { useNotify } from '@/uni_modules/wot-design-uni'

let timer: ReturnType<typeof setTimeout>
const visible = ref(false)
const { showNotify } = useNotify()

const showType = (type: NotifyType) => {
  showNotify({
    message: '通知内容',
    type
  })
}
const showBasicNotify = () => showNotify('测试')
const showCustomColor = () => {
  showNotify({
    color: '#ad0000',
    message: '自定义颜色',
    background: '#ffe1e1'
  })
}
const showCustomPosition = () => {
  showNotify({
    message: '自定义位置',
    position: 'bottom'
  })
}
const showCustomDuration = () => {
  showNotify({
    message: '自定义时长',
    duration: 1000
  })
}
const showNotifyComponent = () => {
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 2000)
}
</script>
