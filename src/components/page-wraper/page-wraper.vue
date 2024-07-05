<template>
  <wd-config-provider :theme="theme" :theme-vars="isRed ? themeVars : {}">
    <wd-toast />
    <view class="page-wraper">
      <wd-cell title="切换暗黑" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isDark" />
      </wd-cell>
      <wd-cell title="切换主题色" title-width="240px" center v-if="showDarkMode">
        <wd-switch v-model="isRed" />
      </wd-cell>
      <slot />
      <wd-gap height="0" v-if="safeAreaInsetBottom" safe-area-bottom></wd-gap>
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
import { setNotifyDefaultOptions, type ConfigProviderThemeVars } from '@/uni_modules/wot-design-uni'
import { useDark } from '../../store'

interface Props {
  showDarkMode?: boolean
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDarkMode: false,
  safeAreaInsetBottom: true
})

const darkMode = useDark()
const isDark = ref<boolean>(false)
const isRed = ref<boolean>(false)

const themeVars: ConfigProviderThemeVars = {
  colorTheme: 'red'
}

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
}
</style>
