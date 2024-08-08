<template>
  <view :class="`wd-form ${customClass}`" :style="customStyle">
    <slot></slot>
    <wd-toast v-if="props.errorType === 'toast'" selector="wd-form-toast" />
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-form',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { deepClone, getPropByPath, isDef, isPromise } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { useToast } from '../wd-toast'
import { type FormRules, FORM_KEY, type ErrorMessage, formProps, type FormExpose } from './types'

const toast = useToast('wd-form-toast')
const props = defineProps(formProps)

const { children, linkChildren } = useChildren(FORM_KEY)
let errorMessages = reactive<Record<string, string>>({})

linkChildren({ props, errorMessages: errorMessages })

watch(
  () => props.model,
  () => {
    if (props.resetOnChange) {
      clearMessage()
    }
  },
  { immediate: true, deep: true }
)

/**
 * 表单校验
 * @param prop 指定校验字段
 */
async function validate(prop?: string): Promise<{ valid: boolean; errors: ErrorMessage[] }> {
  const errors: ErrorMessage[] = []
  let valid: boolean = true
  const promises: Promise<void>[] = []
  const formRules: FormRules = getMergeRules()
  const rulesToValidate: FormRules = prop ? { [prop]: formRules[prop] } : formRules
  for (const prop in rulesToValidate) {
    const rules = rulesToValidate[prop]
    const value = getPropByPath(props.model, prop)
    if (rules && rules.length > 0) {
      for (const rule of rules) {
        if (rule.required && (!isDef(value) || value === '')) {
          errors.push({
            prop,
            message: rule.message
          })
          valid = false
          break
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push({
            prop,
            message: rule.message
          })
          valid = false
          break
        }
        const { validator, ...ruleWithoutValidator } = rule
        if (validator) {
          const result = validator(value, ruleWithoutValidator)
          if (isPromise(result)) {
            promises.push(
              result
                .then((res: any) => {
                  if (typeof res === 'string') {
                    errors.push({
                      prop,
                      message: res
                    })
                    valid = false
                  } else if (typeof res === 'boolean' && !res) {
                    errors.push({
                      prop,
                      message: rule.message
                    })
                    valid = false
                  }
                })
                .catch((error) => {
                  errors.push({
                    prop,
                    message: error || rule.message
                  })
                  valid = false
                })
            )
          } else {
            if (!result) {
              errors.push({
                prop,
                message: rule.message
              })
              valid = false
            }
          }
        }
      }
    }
  }

  await Promise.all(promises)

  errors.forEach((error) => {
    showMessage(error)
  })

  if (valid) {
    if (prop) {
      clearMessage(prop)
    } else {
      clearMessage()
    }
  }

  return {
    valid,
    errors
  }
}

// 合并子组件的rules到父组件的rules
function getMergeRules() {
  const mergedRules: FormRules = deepClone(props.rules)
  children.forEach((item) => {
    if (isDef(item.prop) && isDef(item.rules) && item.rules.length) {
      if (mergedRules[item.prop]) {
        mergedRules[item.prop] = [...mergedRules[item.prop], ...item.rules]
      } else {
        mergedRules[item.prop] = item.rules
      }
    }
  })
  return mergedRules
}

function showMessage(errorMsg: ErrorMessage) {
  if (!errorMsg.message) return

  if (props.errorType === 'toast') {
    toast.show(errorMsg.message)
  } else if (props.errorType === 'message') {
    errorMessages[errorMsg.prop] = errorMsg.message
  }
}

function clearMessage(prop?: string) {
  if (prop) {
    errorMessages[prop] = ''
  } else {
    Object.keys(errorMessages).forEach((key) => {
      errorMessages[key] = ''
    })
  }
}

/**
 * 重置表单项的验证提示
 */
function reset() {
  clearMessage()
}

defineExpose<FormExpose>({ validate, reset })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
