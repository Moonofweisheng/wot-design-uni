<template>
  <view :class="`wd-col-picker ${customClass}`" :style="customStyle">
    <wd-cell
      v-if="!$slots.default"
      :title="label"
      :value="showValue || placeholder || translate('placeholder')"
      :required="required"
      :size="size"
      :title-width="labelWidth"
      :prop="prop"
      :rules="rules"
      :clickable="!disabled && !readonly"
      :value-align="alignRight ? 'right' : 'left'"
      :custom-class="cellClass"
      :custom-style="customStyle"
      :custom-title-class="customLabelClass"
      :custom-value-class="customValueClass"
      :ellipsis="ellipsis"
      :use-title-slot="!!$slots.label"
      :marker-side="markerSide"
      @click="showPicker"
    >
      <template v-if="$slots.label" #title>
        <slot name="label"></slot>
      </template>
      <template #right-icon>
        <wd-icon v-if="showArrow" custom-class="wd-col-picker__arrow" name="arrow-right" />
      </template>
    </wd-cell>
    <view v-else @click="showPicker">
      <slot></slot>
    </view>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      :root-portal="rootPortal"
      @open="handlePickerOpend"
      @close="handlePickerClose"
      @closed="handlePickerClosed"
    >
      <view class="wd-col-picker__selected">
        <scroll-view :scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
          <view class="wd-col-picker__selected-container">
            <view
              v-for="(_, colIndex) in selectList"
              :key="colIndex"
              :class="`wd-col-picker__selected-item  ${colIndex === currentCol && 'is-selected'}`"
              @click="handleColClick(colIndex)"
            >
              {{ selectShowList[colIndex] || translate('select') }}
            </view>
            <view class="wd-col-picker__selected-line" :style="state.lineStyle"></view>
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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdLoading from '../wd-loading/wd-loading.vue'
import wdActionSheet from '../wd-action-sheet/wd-action-sheet.vue'
import wdCell from '../wd-cell/wd-cell.vue'
import { computed, getCurrentInstance, onMounted, ref, watch, type CSSProperties, reactive } from 'vue'
import { addUnit, debounce, getRect, isArray, isBoolean, isDef, isEqual, isFunction, objToStyle } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { colPickerProps, type ColPickerExpose } from './types'

const { translate } = useTranslate('col-picker')

const $container = '.wd-col-picker__selected-container'
const $item = '.wd-col-picker__selected-item'

const props = defineProps(colPickerProps)
const emit = defineEmits(['close', 'update:modelValue', 'confirm'])

const pickerShow = ref<boolean>(false)
const currentCol = ref<number>(0)
const selectList = ref<Record<string, any>[][]>([])
const pickerColSelected = ref<(string | number)[]>([])
const selectShowList = ref<Record<string, any>[]>([])
const loading = ref<boolean>(false)
const isChange = ref<boolean>(false)
const lastSelectList = ref<Record<string, any>[][]>([])
const lastPickerColSelected = ref<(string | number)[]>([])
const scrollLeft = ref<number>(0)
const inited = ref<boolean>(false)
const isCompleting = ref<boolean>(false)
const autoCompletePending = ref<boolean>(false)
let autoCompleteSeq = 0
const colChangeSeq: Record<number, number> = {}
let pickerSession = 0
const labelCache = new Map<string | number, string>()

const state = reactive({
  lineStyle: 'display:none;' // 激活项边框线样式
})

const { proxy } = getCurrentInstance() as any

const updateLineAndScroll = debounce(function (animation = true) {
  setLineStyle(animation)
  lineScrollIntoView()
}, 50)

const showValue = computed(() => {
  const selectedItems = (props.modelValue || []).map((item, colIndex) => {
    return getSelectedItem(item, colIndex, selectList.value)
  })

  if (props.displayFormat) {
    return props.displayFormat(selectedItems)
  } else {
    return selectedItems
      .map((item) => {
        return item[props.labelKey]
      })
      .join('')
  }
})

const cellClass = computed(() => {
  const classes = ['wd-col-picker__cell']
  if (props.disabled) classes.push('is-disabled')
  if (props.readonly) classes.push('is-readonly')
  if (props.error) classes.push('is-error')
  if (!showValue.value) classes.push('wd-col-picker__cell--placeholder')
  return classes.join(' ')
})

watch(
  () => props.modelValue,
  (newValue) => {
    const normalized = Array.isArray(newValue) ? newValue.slice(0) : []
    if (isEqual(normalized, pickerColSelected.value)) return
    pickerColSelected.value = normalized
    selectShowList.value = pickerColSelected.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
    })
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
    if (newValue.length && !isArray(newValue[0])) {
      console.error('[wot ui] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
      return
    }
    if (newValue.length === 0 && !oldValue) return

    const newSelectedList = newValue.slice(0)

    selectList.value = newSelectedList
    newSelectedList.forEach((col) => {
      if (!Array.isArray(col)) return
      col.forEach((item) => {
        const v = item?.[props.valueKey]
        const l = item?.[props.labelKey]
        if ((typeof v === 'string' || typeof v === 'number') && typeof l === 'string') {
          labelCache.set(v, l)
        }
      })
    })

    selectShowList.value = pickerColSelected.value.map((item, colIndex) => {
      return getSelectedItem(item, colIndex, newSelectedList)[props.labelKey]
    })
    lastSelectList.value = newSelectedList

    if (newSelectedList.length > 0) {
      currentCol.value = newSelectedList.length - 1
    }
    handleAutoComplete()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.columnChange,
  (fn) => {
    if (fn && !isFunction(fn)) {
      console.error('The type of columnChange must be Function')
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
    if (fn && !isFunction(fn)) {
      console.error('The type of displayFormat must be Function')
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
    if (fn && !isFunction(fn)) {
      console.error('The type of beforeConfirm must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly
})

onMounted(() => {
  inited.value = true
})

// 打开弹框
function open() {
  showPicker()
}
// 关闭弹框
function close() {
  handlePickerClose()
}
function handlePickerOpend() {
  updateLineAndScroll(false)
}

function handlePickerClose() {
  pickerSession++
  loading.value = false
  pickerShow.value = false
  emit('close')
}

function handlePickerClosed() {
  if (isChange.value) {
    setTimeout(() => {
      selectList.value = lastSelectList.value.slice(0)
      pickerColSelected.value = lastPickerColSelected.value.slice(0)
      selectShowList.value = lastPickerColSelected.value.map((item, colIndex) => {
        return getSelectedItem(item, colIndex, lastSelectList.value)[props.labelKey]
      })
      currentCol.value = lastSelectList.value.length - 1
      isChange.value = false
    }, 250)
  }
}

function showPicker() {
  const { disabled, readonly } = props

  if (disabled || readonly) return
  pickerSession++
  pickerShow.value = true
  lastPickerColSelected.value = pickerColSelected.value.slice(0)
  lastSelectList.value = selectList.value.slice(0)
}

function getSelectedItem(value: string | number, colIndex: number, selectList: Record<string, any>[][]) {
  const { valueKey, labelKey } = props
  if (selectList[colIndex]) {
    const selecteds = selectList[colIndex].filter((item) => {
      return item[valueKey] === value
    })

    if (selecteds.length > 0) {
      return selecteds[0]
    }
  }

  const cachedLabel = labelCache.get(value)
  return {
    [valueKey]: value,
    [labelKey]: cachedLabel || ''
  }
}

function chooseItem(colIndex: number, index: number) {
  autoCompletePending.value = false
  isCompleting.value = false
  autoCompleteSeq++
  const item = selectList.value[colIndex][index]
  if (item.disabled) return
  const cachedV = item?.[props.valueKey]
  const cachedL = item?.[props.labelKey]
  if ((typeof cachedV === 'string' || typeof cachedV === 'number') && typeof cachedL === 'string') {
    labelCache.set(cachedV, cachedL)
  }

  const newPickerColSelected = pickerColSelected.value.slice(0, colIndex)
  newPickerColSelected.push(item[props.valueKey])
  isChange.value = true
  pickerColSelected.value = newPickerColSelected
  selectList.value = selectList.value.slice(0, colIndex + 1)
  selectShowList.value = newPickerColSelected.map((item, colIndex) => {
    return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
  })

  if (selectShowList.value[colIndex] && colIndex === currentCol.value) {
    updateLineAndScroll(true)
  }

  handleColChange(colIndex, item, index)
}

function handleColChange(colIndex: number, item: Record<string, any>, index: number, callback?: () => void) {
  const session = pickerSession
  colChangeSeq[colIndex] = (colChangeSeq[colIndex] || 0) + 1
  const seq = colChangeSeq[colIndex]
  loading.value = true
  const { columnChange, beforeConfirm } = props
  columnChange &&
    columnChange({
      selectedItem: item,
      index: colIndex,
      rowIndex: index,
      resolve: (nextColumn: Record<string, any>[]) => {
        if (pickerSession !== session) return
        if (colChangeSeq[colIndex] !== seq) return
        if (!isArray(nextColumn)) {
          console.error('[wot ui] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
          return
        }
        nextColumn.forEach((item) => {
          const v = item?.[props.valueKey]
          const l = item?.[props.labelKey]
          if ((typeof v === 'string' || typeof v === 'number') && typeof l === 'string') {
            labelCache.set(v, l)
          }
        })

        const newSelectList = selectList.value.slice(0)
        newSelectList[colIndex + 1] = nextColumn

        selectList.value = newSelectList
        loading.value = false
        currentCol.value = colIndex + 1

        updateLineAndScroll(true)
        if (typeof callback === 'function') {
          selectShowList.value = pickerColSelected.value.map((item, colIndex) => {
            return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
          })
          callback()
        }
      },
      finish: (isOk?: boolean) => {
        if (pickerSession !== session) return
        if (colChangeSeq[colIndex] !== seq) return
        // 每设置展示数据回显
        if (typeof callback === 'function') {
          loading.value = false
          if (isCompleting.value) {
            isCompleting.value = false
            if (autoCompletePending.value) {
              autoCompletePending.value = false
              handleAutoComplete()
            }
          }
          return
        }
        if (isBoolean(isOk) && !isOk) {
          loading.value = false
          return
        }

        if (beforeConfirm) {
          beforeConfirm(
            pickerColSelected.value,
            pickerColSelected.value.map((item, colIndex) => {
              return getSelectedItem(item, colIndex, selectList.value)
            }),
            (isPass: boolean) => {
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

  emit('update:modelValue', pickerColSelected.value.slice(0))
  emit('confirm', {
    value: pickerColSelected.value.slice(0),
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
function setLineStyle(animation: boolean = true) {
  if (!inited.value) return
  const { lineWidth, lineHeight } = props
  getRect($item, true, proxy)
    .then((rects) => {
      const lineStyle: CSSProperties = {}
      if (isDef(lineWidth)) {
        lineStyle.width = addUnit(lineWidth)
      }
      if (isDef(lineHeight)) {
        lineStyle.height = addUnit(lineHeight)
        lineStyle.borderRadius = `calc(${addUnit(lineHeight)} / 2)`
      }
      const rect = rects[currentCol.value]
      let left = rects.slice(0, currentCol.value).reduce((prev, curr) => prev + Number(curr.width), 0) + Number(rect.width) / 2
      lineStyle.transform = `translateX(${left}px) translateX(-50%)`

      if (animation) {
        lineStyle.transition = 'width 300ms ease, transform 300ms ease'
      }

      state.lineStyle = objToStyle(lineStyle)
    })
    .catch(() => {})
}
/**
 * @description scroll-view滑动到active的tab_nav
 */
function lineScrollIntoView() {
  if (!inited.value) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)])
    .then(([navItemsRects, navRect]) => {
      if (!isArray(navItemsRects) || navItemsRects.length === 0) return
      // 选中元素
      const selectItem = navItemsRects[currentCol.value]
      // 选中元素之前的节点的宽度总和
      const offsetLeft = navItemsRects.slice(0, currentCol.value).reduce((prev, curr) => prev + Number(curr.width), 0)
      // scroll-view滑动到selectItem的偏移量
      scrollLeft.value = offsetLeft - ((navRect as any).width - Number(selectItem.width)) / 2
    })
    .catch(() => {})
}

// 递归列数据补齐
function diffColumns(colIndex: number, seq: number) {
  // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
  if (seq !== autoCompleteSeq) return
  const modelValue = Array.isArray(props.modelValue) ? props.modelValue : []
  const item = colIndex === -1 ? {} : { [props.valueKey]: modelValue[colIndex] }
  handleColChange(colIndex, item, -1, () => {
    if (seq !== autoCompleteSeq) return
    const nextIndex = colIndex + 1
    if (nextIndex < modelValue.length - 1) {
      diffColumns(nextIndex, seq)
      return
    }
    isCompleting.value = false
    if (autoCompletePending.value) {
      autoCompletePending.value = false
      handleAutoComplete()
    }
  })
}
function handleAutoComplete() {
  if (!props.autoComplete) return
  const modelValue = Array.isArray(props.modelValue) ? props.modelValue : []
  if (modelValue.length === 0) return
  if (isCompleting.value) {
    autoCompletePending.value = true
    return
  }

  let missingAt = -1
  for (let i = 0; i < modelValue.length; i++) {
    const col = selectList.value[i]
    if (!Array.isArray(col)) {
      missingAt = i
      break
    }
    const v = modelValue[i]
    const ok = col.some((item) => item?.[props.valueKey] === v)
    if (!ok) {
      missingAt = i
      break
    }
  }
  if (missingAt === -1) return

  isCompleting.value = true
  const seq = ++autoCompleteSeq
  diffColumns(missingAt - 1, seq)
}

defineExpose<ColPickerExpose>({
  close,
  open
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
