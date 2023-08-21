<template>
  <view :class="`wd-col-picker ${cell.border.value ? 'is-border' : ''} ${customClass}`">
    <view class="wd-col-picker__field" @click="showPicker">
      <slot v-if="useDefaultSlot"></slot>
      <view
        v-else
        :class="`wd-col-picker__cell ${disabled && 'is-disabled'} ${readonly && 'is-readonly'} ${alignRight && 'is-align-right'} ${
          error && 'is-error'
        }  ${size && 'is-' + size}`"
      >
        <view
          v-if="label || useLabelSlot"
          :class="`wd-col-picker__label ${required && 'is-required'} ${customLabelClass}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view
          :class="`wd-col-picker__value ${ellipsis && 'is-ellipsis'} ${customValueClass} ${showValue ? '' : 'wd-col-picker__value--placeholder'}`"
        >
          {{ showValue || placeholder || '请选择' }}
        </view>
        <wd-icon v-if="!disabled && !readonly" custom-class="wd-col-picker__arrow" name="arrow-right" />
      </view>
    </view>
    <wd-action-sheet
      :show="pickerShow"
      :duration="250"
      :title="title || '请选择'"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @close="handlePickerClose"
    >
      <view class="wd-col-picker__selected">
        <scroll-view :scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
          <view class="wd-col-picker__selected-container">
            <view
              v-for="(select, colIndex) in selectList"
              :key="colIndex"
              :class="`wd-col-picker__selected-item  ${colIndex === currentCol && 'is-selected'}`"
              @click="handleColClick(colIndex)"
            >
              {{ selectShowList[colIndex] || '请选择' }}
            </view>
            <view class="wd-col-picker__selected-line" :style="lineStyle"></view>
          </view>
        </scroll-view>
      </view>
      <view class="wd-col-picker__list-container">
        <view
          v-for="(col, colIndex) in selectList"
          :key="colIndex"
          class="wd-col-picker__list"
          :style="colIndex === currentCol ? 'display: block;' : 'display: none;'"
        >
          <view
            v-for="(item, index) in col"
            :key="index"
            :class="`wd-col-picker__list-item ${pickerColSelected[colIndex] && item[valueKey] === pickerColSelected[colIndex] && 'is-selected'} ${
              item.disabled && 'is-disabled'
            }`"
            @click="chooseItem(colIndex, index)"
          >
            <view>
              <view class="wd-col-picker__list-item-label">{{ item[labelKey] }}</view>
              <view v-if="item[tipKey]" class="wd-col-picker__list-item-tip">{{ item[tipKey] }}</view>
            </view>
            <wd-icon custom-class="wd-col-picker__checked" name="check"></wd-icon>
          </view>
          <view v-if="loading" class="wd-col-picker__loading">
            <wd-loading :color="loadingColor" />
          </view>
        </view>
      </view>
    </wd-action-sheet>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-col-picker',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import { debounce, getRect, getType } from '../common/util'
import { useCell } from '../mixins/useCell'

const $container = '.wd-col-picker__selected-container'
const $item = '.wd-col-picker__selected-item'

interface Props {
  customClass?: string
  customViewClass?: string
  customLabelClass?: string
  customValueClass?: string
  modelValue: Array<Record<string, any>>
  columns: Array<Array<Record<string, any>>>
  label?: string
  labelWidth: string
  useLabelSlot: boolean
  useDefaultSlot: boolean
  disabled: boolean
  readonly: boolean
  placeholder: string
  title?: string
  // 接收当前列的选中项 item、当前列下标、当前列选中项下标下一列数据处理函数 resolve、结束选择 finish
  // eslint-disable-next-line @typescript-eslint/ban-types
  columnChange?: Function
  // 外部展示格式化函数
  // eslint-disable-next-line @typescript-eslint/ban-types
  displayFormat?: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeConfirm?: Function
  alignRight: boolean
  error: boolean
  required: boolean
  size?: string
  valueKey: string
  labelKey: string
  tipKey: string
  loadingColor: string
  closeOnClickModal: boolean
  autoComplete: boolean
  zIndex: number
  safeAreaInsetBottom: boolean
  ellipsis: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customViewClass: '',
  customLabelClass: '',
  customValueClass: '',
  columns: () => [],
  useLabelSlot: false,
  useDefaultSlot: false,
  disabled: false,
  readonly: false,
  placeholder: '请选择',
  alignRight: false,
  error: false,
  required: false,
  valueKey: 'value',
  labelKey: 'label',
  tipKey: 'tip',
  loadingColor: '#4D80F0',
  closeOnClickModal: true,
  autoComplete: false,
  zIndex: 15,
  safeAreaInsetBottom: true,
  ellipsis: false,
  labelWidth: '33%'
})

const pickerShow = ref<boolean>(false)
const currentCol = ref<number>(0)
const selectList = ref<Record<string, any>[]>([])
const pickerColSelected = ref<Record<string, any>[]>([])
const selectShowList = ref<Record<string, any>[]>([])
const loading = ref<boolean>(false)
const showValue = ref<string>('')
const isChange = ref<boolean>(false)
const lastSelectList = ref<Record<string, any>[]>([])
const lastPickerColSelected = ref<Record<string, any>[]>([])
const lineStyle = ref<string>('')
const scrollLeft = ref<number>(0)
const inited = ref<boolean>(false)
const isCompleting = ref<boolean>(false)
const { proxy } = getCurrentInstance() as any

const cell = useCell()

const updateLineAndScroll = debounce(function (animation = true) {
  setLineStyle(animation)
  lineScrollIntoView()
}, 50)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === pickerColSelected.value) return
    pickerColSelected.value = newValue
    newValue.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
    })
    setShowValue(newValue)
    handleAutoComplete()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columns,
  (newValue, oldValue) => {
    if (newValue.length && !(newValue[0] instanceof Array)) {
      console.error('[wot design] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
      return
    }

    if (newValue.length === 0 && !oldValue) return

    const newSelectedList = newValue.slice(0)

    selectList.value = newSelectedList
    selectShowList.value = pickerColSelected.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, newSelectedList)[props.labelKey]
    })
    lastSelectList.value = newSelectedList

    if (newSelectedList.length > 0) {
      currentCol.value = newSelectedList.length - 1
      setShowValue(props.modelValue)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columnChange,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of columnChange must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.displayFormat,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of displayFormat must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.beforeConfirm,
  (fn) => {
    if (fn && getType(fn) !== 'function') {
      throw Error('The type of beforeConfirm must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const emit = defineEmits(['close', 'update:modelValue', 'confirm'])

onMounted(() => {
  inited.value = true
})

// 对外暴露方法，打开弹框
function open() {
  showPicker()
}
// 对外暴露方法，关闭弹框
function close() {
  handlePickerClose()
}
function handlePickerClose() {
  pickerShow.value = false
  // 如果目前用户正在选择，需要在popup关闭时将数据重置回上次数据，popup 关闭时间 250
  if (isChange.value) {
    setTimeout(() => {
      selectList.value = lastSelectList.value.slice(0)
      pickerColSelected.value = lastPickerColSelected.value.slice(0)
      selectShowList.value = lastPickerColSelected.value.map((item, colIndex) => {
        return getSelectedItem(item, colIndex, lastSelectList)[props.labelKey]
      })
      currentCol.value = lastSelectList.value.length - 1
      isChange.value = false
    }, 250)
  }
  emit('close')
}
function showPicker() {
  const { disabled, readonly } = props

  if (disabled || readonly) return
  pickerShow.value = true
  lastPickerColSelected.value = pickerColSelected.value.slice(0)
  lastSelectList.value = selectList.value.slice(0)
  setTimeout(() => {
    updateLineAndScroll()
  }, 30)
}

function getSelectedItem(value, colIndex, selectList) {
  const { valueKey, labelKey } = props
  if (selectList[colIndex]) {
    const selecteds = selectList[colIndex].filter((item) => {
      return item[valueKey] === value
    })

    if (selecteds.length > 0) {
      return selecteds[0]
    }
  }

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function chooseItem(colIndex, index) {
  const item = selectList.value[colIndex][index]
  if (item.disabled) return

  const newPickerColSelected = pickerColSelected.value.slice(0, colIndex)
  newPickerColSelected.push(item[props.valueKey])
  isChange.value = true
  pickerColSelected.value = newPickerColSelected
  selectList.value = selectList.value.slice(0, colIndex + 1)
  selectShowList.value = newPickerColSelected.map((item, colIndex) => {
    return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
  })
  handleColChange(colIndex, item, index)
}
function handleColChange(colIndex, item, index, callback?) {
  loading.value = true
  const { columnChange, beforeConfirm } = props
  columnChange &&
    columnChange({
      selectedItem: item,
      index: colIndex,
      rowIndex: index,
      resolve: (nextColumn) => {
        if (!(nextColumn instanceof Array)) {
          console.error('[wot design] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
          return
        }

        const newSelectList = selectList.value.slice(0)
        newSelectList[colIndex + 1] = nextColumn

        selectList.value = newSelectList
        loading.value = false
        currentCol.value = colIndex + 1

        updateLineAndScroll(true)
        if (typeof callback === 'function') {
          isCompleting.value = false
          selectShowList.value = pickerColSelected.value.map((item, colIndex) => {
            return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
          })
          callback()
        }
      },
      finish: (isOk) => {
        // 每设置展示数据回显
        if (typeof callback === 'function') {
          loading.value = false
          isCompleting.value = false
          return
        }
        if (getType(isOk) === 'boolean' && !isOk) {
          loading.value = false
          return
        }

        if (beforeConfirm) {
          beforeConfirm(
            pickerColSelected.value,
            pickerColSelected.value.map((item, colIndex) => {
              return getSelectedItem(item, colIndex, selectList.value)
            }),
            (isPass) => {
              if (isPass) {
                onConfirm()
              } else {
                loading.value = false
              }
            }
          )
        } else {
          onConfirm()
        }
      }
    })
}
function onConfirm() {
  isChange.value = false
  loading.value = false
  pickerShow.value = false

  emit('update:modelValue', pickerColSelected.value)
  setShowValue(pickerColSelected.value)
  emit('confirm', {
    value: pickerColSelected.value,
    selectedItems: pickerColSelected.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, selectList.value)
    })
  })
}
function handleColClick(index: number) {
  isChange.value = true
  currentCol.value = index
  updateLineAndScroll(true)
}
/**
 * @description 更新navBar underline的偏移量
 * @param {Boolean} animation 是否伴随动画
 */
function setLineStyle(animation = true) {
  if (!inited.value) return
  getRect($item, true, proxy).then((rects: any) => {
    const rect = rects[currentCol.value]
    // const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
    const width = 16
    let left = rects.slice(0, currentCol.value).reduce((prev, curr) => prev + curr.width, 0)
    left += (rect.width - width) / 2
    const transition = animation ? 'transition: width 300ms ease, transform 300ms ease;' : ''

    const lineStyleTemp = `
          transform: translateX(${left}px);
          ${transition}
        `
    // 防止重复绘制
    if (lineStyle.value !== lineStyleTemp) {
      lineStyle.value = lineStyleTemp
    }
  })
}
/**
 * @description scroll-view滑动到active的tab_nav
 */
function lineScrollIntoView() {
  if (!inited.value) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
    if ((navItemsRects as any).length === 0) return
    // 选中元素
    const selectItem = navItemsRects[currentCol.value]
    // 选中元素之前的节点的宽度总和
    const offsetLeft = (navItemsRects as any).slice(0, currentCol).reduce((prev, curr) => prev + curr.width, 0)
    // scroll-view滑动到selectItem的偏移量
    scrollLeft.value = offsetLeft - ((navRect as any).width - selectItem.width) / 2
  })
}
function setShowValue(value) {
  const selectedItems = value.map((item, colIndex) => {
    return getSelectedItem(item, colIndex, selectList.value)
  })

  if (props.displayFormat) {
    showValue.value = props.displayFormat(selectedItems)
  } else {
    showValue.value = selectedItems
      .map((item) => {
        return item[props.labelKey]
      })
      .join('')
  }
}
// 递归列数据补齐
function diffColumns(colIndex) {
  // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
  const item = colIndex === -1 ? {} : { [props.valueKey]: props.modelValue[colIndex] }
  handleColChange(colIndex, item, -1, () => {
    // 如果 columns 长度还小于 value 长度，colIndex + 1，继续递归补齐
    if (selectList.value.length < props.modelValue.length) {
      diffColumns(colIndex + 1)
    } else {
      setShowValue(pickerColSelected.value)
    }
  })
}
function handleAutoComplete() {
  if (props.autoComplete) {
    // 如果 columns 数组长度为空，或者长度小于 value 的长度，自动触发 columnChange 来补齐数据
    if (selectList.value.length < props.modelValue.length || selectList.value.length === 0) {
      // isCompleting 是否在自动补全，锁操作
      if (!isCompleting.value) {
        // 如果 columns 长度为空，则传入的 colIndex 为 -1
        const colIndex = selectList.value.length === 0 ? -1 : selectList.value.length - 1
        diffColumns(colIndex)
      }
      isCompleting.value = true
    }
  }
}

defineExpose({
  close,
  open
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
