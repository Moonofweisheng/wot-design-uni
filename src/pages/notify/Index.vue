<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')" transparent>
      <wd-cell-group>
        <wd-cell :title="$t('ji-chu-yong-fa-0')" is-link @click="showBasicNotify" />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('tong-zhi-lei-xing')" transparent>
      <wd-cell-group>
        <wd-cell :title="$t('zhu-yao-tong-zhi')" is-link @click="showType('primary')" />
        <wd-cell :title="$t('cheng-gong-tong-zhi')" is-link @click="showType('success')" />
        <wd-cell :title="$t('wei-xian-tong-zhi')" is-link @click="showType('danger')" />
        <wd-cell :title="$t('jing-gao-tong-zhi')" is-link @click="showType('warning')" />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('zi-ding-yi-pei-zhi')" transparent>
      <wd-cell-group>
        <wd-cell :title="$t('zi-ding-yi-yan-se-0')" is-link @click="showCustomColor" />
        <wd-cell :title="$t('zi-ding-yi-wei-zhi')" is-link @click="showCustomPosition" />
        <wd-cell :title="$t('zi-ding-yi-shi-chang')" is-link @click="showCustomDuration" />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('shi-yong-notify-zu-jian')" transparent>
      <wd-cell-group>
        <wd-cell :title="$t('shi-yong-notify-zu-jian-0')" is-link @click="showNotifyComponent" />
      </wd-cell-group>
    </demo-block>
    <wd-notify selector="visible" type="success" v-model:visible="visible">
      <wd-icon name="check-outline" size="inherit" color="inherit" />
      {{ $t('cheng-gong-tong-zhi-0') }}
    </wd-notify>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { NotifyType } from '@/uni_modules/wot-design-uni/components/wd-notify/types'
import { useNotify } from '@/uni_modules/wot-design-uni'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let timer: ReturnType<typeof setTimeout>
const visible = ref(false)
const { showNotify } = useNotify()

const showType = (type: NotifyType) => {
  showNotify({
    message: t('tong-zhi-nei-rong'),
    type
  })
}
const showBasicNotify = () => showNotify(t('ce-shi'))
const showCustomColor = () => {
  showNotify({
    color: '#ad0000',
    message: t('zi-ding-yi-yan-se-0'),
    background: '#ffe1e1'
  })
}
const showCustomPosition = () => {
  showNotify({
    message: t('zi-ding-yi-wei-zhi-0'),
    position: 'bottom'
  })
}
const showCustomDuration = () => {
  showNotify({
    message: t('zi-ding-yi-shi-chang-0'),
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
