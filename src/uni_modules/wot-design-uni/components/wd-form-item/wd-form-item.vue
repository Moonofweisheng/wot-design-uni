<!--
 * @Author: weisheng
 * @Date: 2023-12-14 11:21:58
 * @LastEditTime: 2024-01-03 21:50:52
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-form-item/wd-form-item.vue
 * 记得注释
-->
<template>
  <wd-cell
    custom-class="wd-form-item"
    :required="required"
    :title="label"
    :center="center"
    :border="border"
    :title-width="labelWidth"
    :is-link="isLink"
  >
    <slot></slot>
    <view v-if="errorMessage" class="wd-form-item__error-message">{{ errorMessage }}</view>
  </wd-cell>
</template>
<script lang="ts">
export default {
  name: 'wd-form-item',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useParent } from '../composables/useParent'
import WdCell from '../wd-cell/wd-cell.vue'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'

interface Props {
  prop: string
  rules?: FormItemRule[]
  required?: boolean
  center?: boolean
  label?: string
  labelWidth?: string
  isLink?: boolean
  customClass?: string
  customStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => [],
  center: false,
  labelWidth: '100px',
  customClass: '',
  customStyle: ''
})

const { parent: form, index } = useParent(FORM_KEY)

const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

const border = computed(() => {
  if (index.value > 0 && form && form.props.border) {
    return true
  } else {
    return false
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
