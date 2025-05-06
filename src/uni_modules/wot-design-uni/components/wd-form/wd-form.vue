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
import wdToast from '../wd-toast/wd-toast.vue'
import { reactive, watch } from 'vue'
import { deepClone, getPropByPath, isArray, isDef, isPromise, isString } from '../common/util'
import { useChildren } from '../composables/useChildren'
import { useToast } from '../wd-toast'
import { type FormRules, FORM_KEY, type ErrorMessage, formProps, type FormExpose } from './types'

const { show: showToast } = useToast('wd-form-toast')
const props = defineProps(formProps)

const { children, linkChildren } = useChildren(FORM_KEY)
let errorMessages = reactive<Record<string, string>>({})

linkChildren({ props, errorMessages })

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
 * @param prop 指定校验字段或字段数组
 */
async function validate(prop?: string | string[]): Promise<{ valid: boolean; errors: ErrorMessage[] }> {
  const errors: ErrorMessage[] = []
  let valid: boolean = true
  const promises: Promise<void>[] = []
  const formRules: FormRules = getMergeRules()
  const propsToValidate = isArray(prop) ? prop : isDef(prop) ? [prop] : []
  const rulesToValidate: FormRules =
    propsToValidate.length > 0
      ? propsToValidate.reduce((acc, key) => {
          if (formRules[key]) {
            acc[key] = formRules[key]
          }
          return acc
        }, {} as FormRules)
      : formRules

  for (const propName in rulesToValidate) {
    const rules = rulesToValidate[propName]
    const value = getPropByPath(props.model, propName)

    if (rules && rules.length > 0) {
      for (const rule of rules) {
        if (rule.required && (!isDef(value) || value === '')) {
          errors.push({
            prop: propName,
            message: rule.message
          })
          valid = false
          break
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push({
            prop: propName,
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
                .then((res) => {
                  if (typeof res === 'string') {
                    errors.push({
                      prop: propName,
                      message: res
                    })
                    valid = false
                  } else if (typeof res === 'boolean' && !res) {
                    errors.push({
                      prop: propName,
                      message: rule.message
                    })
                    valid = false
                  }
                })
                .catch((error?: string | Error) => {
                  const message = isDef(error) ? (isString(error) ? error : error.message || rule.message) : rule.message
                  errors.push({ prop: propName, message })
                  valid = false
                })
            )
          } else {
            if (!result) {
              errors.push({
                prop: propName,
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

  showMessage(errors)

  if (valid) {
    if (propsToValidate.length) {
      propsToValidate.forEach(clearMessage)
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
  const childrenProps = children.map((child) => child.prop)

  // 过滤掉在 children 中不存在对应子组件的规则
  Object.keys(mergedRules).forEach((key) => {
    if (!childrenProps.includes(key)) {
      delete mergedRules[key]
    }
  })

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

function showMessage(errors: ErrorMessage[]) {
  const childrenProps = children.map((e) => e.prop).filter(Boolean)
  const messages = errors.filter((error) => error.message && childrenProps.includes(error.prop))
  if (messages.length) {
    messages.sort((a, b) => {
      return childrenProps.indexOf(a.prop) - childrenProps.indexOf(b.prop)
    })
    if (props.errorType === 'toast') {
      showToast(messages[0].message)
    } else if (props.errorType === 'message') {
      messages.forEach((error) => {
        errorMessages[error.prop] = error.message
      })
    }
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
