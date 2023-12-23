<template>
  <wd-config-provider :theme="theme">
    <wd-toast />
    <view class="page-wraper">
      <wd-cell title="切换暗黑" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isDark" />
      </wd-cell>
      <slot />
    </view>
    <wd-notify />
  </wd-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { setNotifyDefaultOptions } from '@/uni_modules/wot-design-uni'
import { useDark } from '../../store'

interface Props {
  showDarkMode?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false
})

const darkMode = useDark()
const isDark = ref<boolean>(false)

const theme = computed(() => {
  return darkMode.isDark.value || isDark.value ? 'dark' : 'light'
})

onMounted(() => {
  setNotifyDefaultOptions({
    onClick: (event) => console.log('onClick', event),
    onClosed: () => console.log('onClosed'),
    onOpened: () => console.log('onOpened')
  })
})
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .page-wraper {
    background: #000;
  }
}
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
