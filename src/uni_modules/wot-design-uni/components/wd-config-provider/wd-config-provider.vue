<template>
  <view :class="themeClass" :style="rootStyle">
    <slot />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-config-provider',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { configProviderProps, CONFIG_PROVIDER_KEY, type ConfigProviderProvide } from './types'
import { objToStyle } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { mapThemeVarsToCSSVars } from '../composables/useConfigProvider'
import { USE_CONFIG_PROVIDER_KEY } from '../composables/useConfigProvider'

const None = Symbol('None')
const hooksProvider = inject<ConfigProviderProvide | typeof None>(USE_CONFIG_PROVIDER_KEY, None)
const props = defineProps(configProviderProps)

const { linkChildren } = useChildren(CONFIG_PROVIDER_KEY)

const themeClass = computed(() => {
  return `wot-theme-${props.theme} ${props.customClass}`
})

const themeStyle = computed(() => {
  if (hooksProvider !== None) {
    return hooksProvider.themeStyle.value
  }
  const styleObj = mapThemeVarsToCSSVars(props.themeVars)
  return styleObj ? `${objToStyle(styleObj)}` : ''
})

const rootStyle = computed(() => {
  const style = `${themeStyle.value}${props.customStyle}`
  return style
})

linkChildren({
  themeStyle
} as ConfigProviderProvide)
</script>

<style lang="scss" scoped></style>
