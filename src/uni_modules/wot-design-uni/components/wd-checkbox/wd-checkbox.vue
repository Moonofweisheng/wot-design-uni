<template>
  <view
    :class="`wd-checkbox ${innerCell ? 'is-cell-box' : ''} ${innerShape === 'button' ? 'is-button-box' : ''} ${isChecked ? 'is-checked' : ''} ${
      isFirst ? 'is-first-child' : ''
    } ${isLast ? 'is-last-child' : ''} ${innerInline ? 'is-inline' : ''} ${innerShape === 'button' ? 'is-button' : ''} ${
      innerDisabled ? 'is-disabled' : ''
    } ${innerSize ? 'is-' + innerSize : ''} ${customClass}`"
    @click="toggle"
  >
    <!--shape为button时，移除wd-checkbox__shape，只保留wd-checkbox__label-->
    <view
      v-if="innerShape !== 'button'"
      :class="`wd-checkbox__shape ${innerShape === 'square' ? 'is-square' : ''} ${customShapeClass}`"
      :style="isChecked && !innerDisabled && innerCheckedColor ? 'color :' + innerCheckedColor : ''"
    >
      <wd-icon custom-class="wd-checkbox__check" name="check-bold" size="14px" />
    </view>
    <!--shape为button时只保留wd-checkbox__label-->
    <view
      :class="`wd-checkbox__label ${customLabelClass}`"
      :style="isChecked && innerShape === 'button' && !innerDisabled && innerCheckedColor ? 'color:' + innerCheckedColor : ''"
    >
      <!--button选中时展示的icon-->
      <wd-icon v-if="innerShape === 'button' && isChecked" custom-class="wd-checkbox__btn-check" name="check-bold" size="14px" />
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
import { computed, getCurrentInstance, inject, onBeforeMount, onMounted, ref, watch } from 'vue'

type checkShape = 'circle' | 'square' | 'button'
interface Props {
  customLabelClass?: string
  customShapeClass?: string
  customClass?: string
  modelValue: string | number | boolean
  shape: checkShape
  checkedColor?: string
  disabled: boolean | null
  trueValue: string | number | boolean
  falseValue: string | number | boolean
  size?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  customLabelClass: '',
  customShapeClass: '',
  customClass: '',
  shape: 'circle',
  trueValue: true,
  falseValue: false,
  disabled: null
})

const isChecked = ref<boolean>(false) // 是否被选中

const inited = ref<boolean>(false)
// 相同组件的伪类选择器无效，这里配合类名手动模拟 last-child、first-child
const isFirst = ref<boolean>(false)
const isLast = ref<boolean>(false)
const parent = inject<any>('checkGroup')
const { proxy } = getCurrentInstance() as any

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === null || newValue === undefined) {
      // eslint-disable-next-line prettier/prettier
      throw Error('checkbox\'s value can\'t be null or undefined')
    }
    if (!inited.value) return
    // 组合使用走这个逻辑
    if (parent && parent.$.exposed.resetChildren) {
      checkName()
      return parent.$.exposed.resetChildren()
    }
    isChecked.value = newValue === props.trueValue
  }
)

watch(
  () => props.shape,
  (newValue) => {
    const type = ['circle', 'square', 'button']
    if (type.indexOf(newValue) === -1) throw Error(`shape must be one of ${type.toString()}`)
  }
)

const innerShape = computed(() => {
  if (!props.shape && parent && parent.shape) {
    return parent.shape
  } else {
    return props.shape
  }
})

const innerCheckedColor = computed(() => {
  if (!props.checkedColor && parent && parent.checkedColor) {
    return parent.checkedColor
  } else {
    return props.checkedColor
  }
})

const innerDisabled = computed(() => {
  let innerDisabled = props.disabled
  if (parent) {
    if (
      // max 生效时，group 已经选满，禁止其它节点再选中。
      (parent.max && parent.modelValue.length >= parent.max && !isChecked.value) ||
      // min 生效时，group 选中的节点数量仅满足最小值，禁止取消已选中的节点。
      (parent.min && parent.modelValue.length <= parent.min && isChecked.value) ||
      // 只要子节点自己要求 disabled，那就 disabled。
      props.disabled === true ||
      // 父节点要求全局 disabled，子节点没吱声，那就 disabled。
      (parent.disabled && props.disabled === null)
    ) {
      innerDisabled = true
    }
  }
  return innerDisabled
})

const innerInline = computed(() => {
  if (parent && parent.inline) {
    return parent.inline
  } else {
    return false
  }
})

const innerCell = computed(() => {
  if (parent && parent.cell) {
    return parent.cell
  } else {
    return false
  }
})

const innerSize = computed(() => {
  if (!props.size && parent && parent.size) {
    return parent.size
  } else {
    return props.size
  }
})

onBeforeMount(() => {
  // eslint-disable-next-line quotes
  if (props.modelValue === null) throw Error("checkbox's value must be set")
  inited.value = true
})

onMounted(() => {
  // 如果没有父组件，设置 isChecked
  if (!parent) {
    isChecked.value = props.modelValue === props.trueValue
    isFirst.value = true
    isLast.value = true
  }
  if (parent) {
    parent.$.exposed.setChild && parent.$.exposed.setChild(proxy)
    isChecked.value = props.modelValue === parent.modelValue
  }
})

const emit = defineEmits(['change', 'update:modelValue'])

/**
 * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
 * @param {Object} self 自身
 * @param  myName 自己的标识符
 */
function checkName() {
  parent &&
    parent.$.exposed.children &&
    parent.$.exposed.children.forEach((child) => {
      if (child.$.uid !== proxy.$.uid && child.value === props.modelValue) {
        throw Error(`The checkbox's bound value: ${props.modelValue} has been used`)
      }
    })
}
/**
 * @description 点击checkbox的Event handle
 */
function toggle() {
  if (innerDisabled.value) return
  // 复选框单独使用时点击反选，并且在checkbox上触发change事件
  if (parent) {
    emit('change', {
      value: !isChecked.value
    })
    parent.$.exposed.changeSelectState(props.modelValue)
  } else {
    const newVal = props.modelValue === props.trueValue ? props.falseValue : props.trueValue
    emit('update:modelValue', newVal)
    emit('change', {
      value: newVal
    })
  }
}

/**
 * 设置是否为第一个
 * @param first
 */
function setFirst(first: boolean) {
  isFirst.value = first
}

/**
 * 设置是否为最后一个
 * @param first
 */
function setLast(last: boolean) {
  isLast.value = last
}

/**
 * 设置是否选中
 * @param checked 是否选中
 */
function setChecked(checked: boolean) {
  isChecked.value = checked
}

defineExpose({
  setFirst,
  setLast,
  setChecked
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
