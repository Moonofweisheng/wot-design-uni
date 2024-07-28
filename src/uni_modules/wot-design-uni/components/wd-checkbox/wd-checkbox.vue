<template>
  <view
    :class="`wd-checkbox ${innerCell ? 'is-cell-box' : ''} ${innerShape === 'button' ? 'is-button-box' : ''} ${isChecked ? 'is-checked' : ''} ${
      isFirst ? 'is-first-child' : ''
    } ${isLast ? 'is-last-child' : ''} ${innerInline ? 'is-inline' : ''} ${innerShape === 'button' ? 'is-button' : ''} ${
      innerDisabled ? 'is-disabled' : ''
    } ${innerSize ? 'is-' + innerSize : ''} ${customClass}`"
    :style="customStyle"
    @click="toggle"
  >
    <!--shape为button时，移除wd-checkbox__shape，只保留wd-checkbox__label-->
    <view
      v-if="innerShape !== 'button'"
      :class="`wd-checkbox__shape ${innerShape === 'square' ? 'is-square' : ''} ${customShapeClass}`"
      :style="isChecked && !innerDisabled && innerCheckedColor ? 'color :' + innerCheckedColor : ''"
    >
      <wd-icon custom-class="wd-checkbox__check" name="check-bold" />
    </view>
    <!--shape为button时只保留wd-checkbox__label-->
    <view
      :class="`wd-checkbox__label ${customLabelClass}`"
      :style="isChecked && innerShape === 'button' && !innerDisabled && innerCheckedColor ? 'color:' + innerCheckedColor : ''"
    >
      <!--button选中时展示的icon-->
      <wd-icon v-if="innerShape === 'button' && isChecked" custom-class="wd-checkbox__btn-check" name="check-bold" />
      <!--文案-->
      <view class="wd-checkbox__txt" :style="maxWidth ? 'max-width:' + maxWidth : ''">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-checkbox',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, onBeforeMount, watch } from 'vue'
import { useParent } from '../composables/useParent'
import { CHECKBOX_GROUP_KEY } from '../wd-checkbox-group/types'
import { isDef } from '../common/util'
import { checkboxProps, type CheckboxExpose } from './types'

const props = defineProps(checkboxProps)
const emit = defineEmits(['change', 'update:modelValue'])

defineExpose<CheckboxExpose>({
  toggle
})

const { parent: checkboxGroup, index } = useParent(CHECKBOX_GROUP_KEY)

const isChecked = computed(() => {
  if (checkboxGroup) {
    return checkboxGroup.props.modelValue.indexOf(props.modelValue) > -1
  } else {
    return props.modelValue === props.trueValue
  }
}) // 是否被选中

const isFirst = computed(() => {
  return index.value === 0
})

const isLast = computed(() => {
  const children = isDef(checkboxGroup) ? checkboxGroup.children : []
  return index.value === children.length - 1
})
const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  () => {
    // 组合使用走这个逻辑
    if (checkboxGroup) {
      checkName()
    }
  }
)

watch(
  () => props.shape,
  (newValue) => {
    const type = ['circle', 'square', 'button']
    if (type.indexOf(newValue) === -1) console.error(`shape must be one of ${type.toString()}`)
  }
)

const innerShape = computed(() => {
  if (!props.shape && checkboxGroup && checkboxGroup.props.shape) {
    return checkboxGroup.props.shape
  } else {
    return props.shape
  }
})

const innerCheckedColor = computed(() => {
  if (!props.checkedColor && checkboxGroup && checkboxGroup.props.checkedColor) {
    return checkboxGroup.props.checkedColor
  } else {
    return props.checkedColor
  }
})

const innerDisabled = computed(() => {
  let innerDisabled = props.disabled
  if (checkboxGroup) {
    if (
      // max 生效时，group 已经选满，禁止其它节点再选中。
      (checkboxGroup.props.max && checkboxGroup.props.modelValue.length >= checkboxGroup.props.max && !isChecked.value) ||
      // min 生效时，group 选中的节点数量仅满足最小值，禁止取消已选中的节点。
      (checkboxGroup.props.min && checkboxGroup.props.modelValue.length <= checkboxGroup.props.min && isChecked.value) ||
      // 只要子节点自己要求 disabled，那就 disabled。
      props.disabled === true ||
      // 父节点要求全局 disabled，子节点没吱声，那就 disabled。
      (checkboxGroup.props.disabled && props.disabled === null)
    ) {
      innerDisabled = true
    }
  }
  return innerDisabled
})

const innerInline = computed(() => {
  if (checkboxGroup && checkboxGroup.props.inline) {
    return checkboxGroup.props.inline
  } else {
    return false
  }
})

const innerCell = computed(() => {
  if (checkboxGroup && checkboxGroup.props.cell) {
    return checkboxGroup.props.cell
  } else {
    return false
  }
})

const innerSize = computed(() => {
  if (!props.size && checkboxGroup && checkboxGroup.props.size) {
    return checkboxGroup.props.size
  } else {
    return props.size
  }
})

onBeforeMount(() => {
  // eslint-disable-next-line quotes
  if (props.modelValue === null) console.error("checkbox's value must be set")
})

/**
 * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
 * @param {Object} self 自身
 * @param  myName 自己的标识符
 */
function checkName() {
  checkboxGroup &&
    checkboxGroup.children &&
    checkboxGroup.children.forEach((child: any) => {
      if (child.$.uid !== proxy.$.uid && child.modelValue === props.modelValue) {
        console.error(`The checkbox's bound value: ${props.modelValue} has been used`)
      }
    })
}
/**
 * @description 点击checkbox的Event handle
 */
function toggle() {
  if (innerDisabled.value) return
  // 复选框单独使用时点击反选，并且在checkbox上触发change事件
  if (checkboxGroup) {
    emit('change', {
      value: !isChecked.value
    })
    checkboxGroup.changeSelectState(props.modelValue)
  } else {
    const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
