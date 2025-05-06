<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:34:35
 * @LastEditTime: 2025-04-28 22:26:25
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-config-provider/wd-config-provider.vue
 * 记得注释
-->
<template>
  <view :class="themeClass" :style="themeStyle">
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
import { computed } from 'vue'
import { configProviderProps } from './types'
import { objToStyle } from '../common/util'

const props = defineProps(configProviderProps)

const themeClass = computed(() => {
  return `wot-theme-${props.theme} ${props.customClass}`
})

const themeStyle = computed(() => {
  const styleObj = mapThemeVarsToCSSVars(props.themeVars)
  return styleObj ? `${objToStyle(styleObj)}${props.customStyle}` : props.customStyle
})

const kebabCase = (str: string): string => {
  str = str.replace(str.charAt(0), str.charAt(0).toLocaleLowerCase())
  return str.replace(/([a-z])([A-Z])/g, (_, p1, p2) => p1 + '-' + p2.toLowerCase())
}
const colorRgb = (str: string) => {
  if (!str) return
  var sColor = str.toLowerCase()
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    var sColorChange: number[] = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return sColorChange.join(',')
  }
  return null
}

const mapThemeVarsToCSSVars = (themeVars: Record<string, string>) => {
  if (!themeVars) return
  const cssVars: Record<string, string> = {}
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--wot-${kebabCase(key)}`] = themeVars[key]
  })

  return cssVars
}
</script>

<style lang="scss" scoped></style>
