<template>
  <view
    :class="`wd-picker ${disabled ? 'is-disabled' : ''} ${size ? 'is-' + size : ''}  ${cell.border.value ? 'is-border' : ''} ${
      alignRight ? 'is-align-right' : ''
    } ${error ? 'is-error' : ''} ${customClass}`"
  >
    <!--文案-->
    <view @click="showPopup">
      <slot v-if="useDefaultSlot"></slot>
      <view v-else class="wd-picker__field">
        <view
          v-if="label || useLabelSlot"
          :class="`wd-picker__label ${customLabelClass}  ${required ? 'is-required' : ''}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <template v-if="label">{{ label }}</template>
          <slot v-else name="label"></slot>
        </view>
        <view :class="`wd-picker__value ${ellipsis && 'is-ellipsis'} ${customValueClass} ${showValue ? '' : 'wd-picker__placeholder'}`">
          {{ showValue ? showValue : placeholder }}
        </view>
        <wd-icon v-if="!disabled && !readonly" custom-class="wd-picker__arrow" name="arrow-right" />
      </view>
    </view>
    <!--弹出层，picker-view 在隐藏时修改值，会触发多次change事件，从而导致所有列选中第一项，因此picker在关闭时不隐藏 -->
    <wd-popup
      v-model="popupShow"
      position="bottom"
      :hide-when-close="false"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @close="onCancel"
      custom-class="wd-picker__popup"
    >
      <!--toolBar-->
      <view class="wd-picker__toolbar" @touchmove="noop">
        <!--取消按钮-->
        <view class="wd-picker__action wd-picker__action--cancel" @click="onCancel">
          {{ cancelButtonText }}
        </view>
        <!--标题-->
        <view v-if="title" class="wd-picker__title">{{ title }}</view>
        <!--确定按钮-->
        <view :class="`wd-picker__action ${isLoading ? 'is-loading' : ''}`" @click="onConfirm">
          {{ confirmButtonText }}
        </view>
      </view>
      <!--pickerView-->
      <wd-picker-view
        ref="pickerViewWd"
        :custom-class="customViewClass"
        v-model="pickerValue"
        :columns="displayColumns"
        :loading="isLoading"
        :loading-color="loadingColor"
        :columns-height="columnsHeight"
        :value-key="valueKey"
        :label-key="labelKey"
        @change="pickerViewChange"
        @pickstart="onPickStart"
        @pickend="onPickEnd"
        :column-change="columnChange"
      />
    </wd-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-picker',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, ref, watch, computed, onMounted } from 'vue'
import { deepClone, defaultDisplayFormat, getType, isArray } from '../common/util'
import { useCell } from '../mixins/useCell'
import { ColumnItem, formatArray } from '../wd-picker-view/type'

interface Props {
  customClass?: string
  customLabelClass?: string
  customValueClass?: string
  customViewClass?: string
  // 选择器左侧文案
  label?: string
  // 选择器占位符
  placeholder: string
  // 禁用
  disabled: boolean
  // 只读
  readonly: boolean
  loading: boolean
  loadingColor: string
  /* popup */
  // 弹出层标题
  title?: string
  // 取消按钮文案
  cancelButtonText: string
  // 确认按钮文案
  confirmButtonText: string
  // 是否必填
  required: boolean
  size?: string
  labelWidth?: string
  useDefaultSlot: boolean
  useLabelSlot: boolean
  error: boolean
  alignRight: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeConfirm?: Function
  closeOnClickModal: boolean
  safeAreaInsetBottom: boolean
  ellipsis: boolean

  // 选项总高度
  columnsHeight: number
  // 选项对象中，value对应的 key
  valueKey: string
  // 选项对象中，展示的文本对应的 key
  labelKey: string
  // 初始值
  modelValue: string | number | Array<string | number>
  // 选择器数据
  columns: Array<string | number | ColumnItem | Array<string | number | ColumnItem>>
  // 多级联动
  // eslint-disable-next-line @typescript-eslint/ban-types
  columnChange?: Function
  // 外部展示格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  displayFormat?: Function
  // 自定义层级
  zIndex: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  customClass: '',
  customViewClass: '',
  // 选择器占位符
  placeholder: '请选择',
  // 禁用
  disabled: false,
  // 只读
  readonly: false,
  loading: false,
  loadingColor: '#4D80F0',
  // 取消按钮文案
  cancelButtonText: '取消',
  // 确认按钮文案
  confirmButtonText: '完成',
  // 是否必填
  required: false,
  useDefaultSlot: false,
  useLabelSlot: false,
  error: false,
  alignRight: false,
  closeOnClickModal: true,
  safeAreaInsetBottom: true,
  ellipsis: false,

  columnsHeight: 217,
  valueKey: 'value',
  labelKey: 'label',
  columns: () => [],
  zIndex: 15
})

const pickerViewWd = ref<any>(null)
const cell = useCell()

const innerLoading = ref<boolean>(false) // 内部控制是否loading

// 弹出层是否显示
const popupShow = ref<boolean>(false)
// 选定后展示的选中项
const showValue = ref<string>('')
const pickerValue = ref<string | number | boolean | (string | number | boolean)[]>('')
const displayColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 传入 pickerView 的columns
const resetColumns = ref<Array<string | number | ColumnItem | Array<string | number | ColumnItem>>>([]) // 保存之前的 columns，当取消时，将数据源回滚，避免多级联动数据源不正确的情况
const isPicking = ref<boolean>(false) // 判断pickview是否还在滑动中
const hasConfirmed = ref<boolean>(false) // 判断用户是否点击了确认按钮

const isLoading = computed(() => {
  return props.loading || innerLoading.value
})

watch(
  () => props.displayFormat,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of displayFormat must be Function')
    }
    if (pickerViewWd.value && pickerViewWd.value.selectedIndex && pickerViewWd.value.selectedIndex.length !== 0) {
      if (props.modelValue) {
        setShowValue(pickerViewWd.value.getSelects())
      } else {
        showValue.value = ''
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    pickerValue.value = newValue
    // 获取初始选中项,并展示初始选中文案
    if (newValue && pickerViewWd.value) {
      setShowValue(pickerViewWd.value!.getSelects())
    } else {
      showValue.value = ''
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue) => {
    displayColumns.value = newValue
    resetColumns.value = newValue
    // 获取初始选中项,并展示初始选中文案
    if (props.modelValue && pickerViewWd.value) {
      setShowValue(pickerViewWd.value!.getSelects())
    } else {
      showValue.value = ''
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columnChange,
  (newValue) => {
    if (newValue && getType(newValue) !== 'function') {
      throw Error('The type of columnChange must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['confirm', 'open', 'cancel', 'update:modelValue'])

onMounted(() => {
  props.modelValue && setShowValue(getSelects(props.modelValue))
  if (props.modelValue && pickerViewWd.value && pickerViewWd.value.getSelects) {
    setShowValue(pickerViewWd.value!.getSelects())
  }
})

onBeforeMount(() => {
  displayColumns.value = deepClone(props.columns)
  resetColumns.value = deepClone(props.columns)
})

/**
 * @description 根据传入的value，picker组件获取当前cell展示值。
 * @param {String|Number|Array<String|Number|Array<any>>}value
 */
function getSelects(value) {
  const formatColumns = formatArray(props.columns, props.valueKey, props.labelKey)
  if (props.columns.length === 0) return

  // 使其默认选中首项
  if (value === '' || value === null || value === undefined || (getType(value) === 'array' && value.length === 0)) {
    value = formatColumns.map((col) => {
      return col[0][props.valueKey]
    })
  }
  const valueType = getType(value)
  const type = ['string', 'number', 'boolean', 'array']
  if (type.indexOf(valueType) === -1) return []
  /**
   * 1.单key转为Array<key>
   * 2.根据formatColumns的长度截取Array<String>，保证下面的遍历不溢出
   * 3.根据每列的key值找到选项中value为此key的下标并记录
   */
  value = value instanceof Array ? value : [value]
  value = value.slice(0, formatColumns.length)

  if (value.length === 0) {
    value = formatColumns.map(() => 0)
  }
  let selected: number[] = []
  value.forEach((target, col) => {
    let row = formatColumns[col].findIndex((row) => {
      return row[props.valueKey].toString() === target.toString()
    })
    row = row === -1 ? 0 : row
    selected.push(row)
  })

  const selects = selected.map((row, col) => formatColumns[col][row])
  // 单列选择器，则返回单项
  if (selects.length === 1) {
    return selects[0]
  }
  return selects
}

// 对外暴露方法，打开弹框
function open() {
  showPopup()
}
// 对外暴露方法，关闭弹框
function close() {
  onCancel()
}
/**
 * @description 展示popup，小程序有个bug，在picker-view弹出时设置value，会触发change事件，而且会将picker-view的value多次触发change重置为第一项
 */
function showPopup() {
  if (props.disabled || props.readonly) return

  emit('open')
  popupShow.value = true
  pickerValue.value = props.modelValue
  displayColumns.value = resetColumns.value
}
/**
 * @description 点击取消按钮触发。关闭popup，触发cancel事件。
 */
function onCancel() {
  popupShow.value = false
  emit('cancel')
}
/**
 * @description 点击确定按钮触发。展示选中值，触发cancel事件。
 */
function onConfirm() {
  if (isLoading.value) return

  // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
  if (isPicking.value) {
    hasConfirmed.value = true
    return
  }

  const { beforeConfirm } = props
  if (beforeConfirm && getType(beforeConfirm) === 'function') {
    beforeConfirm(
      pickerValue.value,
      (isPass) => {
        isPass && handleConfirm()
      },
      proxy.$.exposed
    )
  } else {
    handleConfirm()
  }
}
function handleConfirm() {
  if (isLoading.value || props.disabled) {
    popupShow.value = false
    return
  }

  const selects = pickerViewWd.value!.getSelects()
  const values = pickerViewWd.value!.getValues()
  // 获取当前的数据源，并设置给 resetColumns，用于取消时可以回退数据源
  const columns = pickerViewWd.value!.getColumnsData()
  popupShow.value = false
  resetColumns.value = deepClone(columns)
  emit('update:modelValue', values)
  setShowValue(selects)
  emit('confirm', {
    value: values,
    selectedItems: selects
  })
}
/**
 * @description 初始change事件
 * @param event
 */
function pickerViewChange({ value }) {
  pickerValue.value = value
}
/**
 * @description 设置展示值
 * @param {Array<String>} items
 */
function setShowValue(items) {
  // 避免值为空时调用自定义展示函数
  if ((items instanceof Array && !items.length) || !items) return

  const { valueKey, labelKey } = props
  showValue.value = (props.displayFormat || defaultDisplayFormat)(items, { valueKey, labelKey })
}
function noop() {}
function onPickStart() {
  isPicking.value = true
}
function onPickEnd() {
  isPicking.value = false

  if (hasConfirmed.value) {
    hasConfirmed.value = false
    onConfirm()
  }
}

/**
 * 外部设置是否loading
 * @param loading 是否loading
 */
function setLoading(loading: boolean) {
  innerLoading.value = loading
}

defineExpose({
  close,
  open,
  setLoading
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
