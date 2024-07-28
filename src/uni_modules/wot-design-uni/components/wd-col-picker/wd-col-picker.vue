<template>
  <view :class="`wd-col-picker ${cell.border.value ? 'is-border' : ''} ${customClass}`" :style="customStyle">
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
          :class="`wd-col-picker__label ${isRequired && 'is-required'} ${customLabelClass}`"
          :style="labelWidth ? 'min-width:' + labelWidth + ';max-width:' + labelWidth + ';' : ''"
        >
          <block v-if="label">{{ label }}</block>
          <slot v-else name="label"></slot>
        </view>
        <view class="wd-col-picker__body">
          <view class="wd-col-picker__value-wraper">
            <view
              :class="`wd-col-picker__value ${ellipsis && 'is-ellipsis'} ${customValueClass} ${showValue ? '' : 'wd-col-picker__value--placeholder'}`"
            >
              {{ showValue || placeholder || translate('placeholder') }}
            </view>
            <wd-icon v-if="!disabled && !readonly" custom-class="wd-col-picker__arrow" name="arrow-right" />
          </view>
          <view v-if="errorMessage" class="wd-col-picker__error-message">{{ errorMessage }}</view>
        </view>
      </view>
    </view>
    <wd-action-sheet
      v-model="pickerShow"
      :duration="250"
      :title="title || translate('title')"
      :close-on-click-modal="closeOnClickModal"
      :z-index="zIndex"
      :safe-area-inset-bottom="safeAreaInsetBottom"
      @open="handlePickerOpend"
      @close="handlePickerClose"
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
import { computed, getCurrentInstance, onMounted, ref, watch, type CSSProperties, reactive, nextTick } from 'vue'
import { addUnit, debounce, getRect, isArray, isBoolean, isDef, isFunction, objToStyle } from '../common/util'
import { useCell } from '../composables/useCell'
import { FORM_KEY, type FormItemRule } from '../wd-form/types'
import { useParent } from '../composables/useParent'
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

const state = reactive({
  lineStyle: 'display:none;' // 激活项边框线样式
})

const { proxy } = getCurrentInstance() as any

const cell = useCell()

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

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === pickerColSelected.value) return
    pickerColSelected.value = newValue
    newValue.map((item, colIndex) => {
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

const { parent: form } = useParent(FORM_KEY)

// 表单校验错误信息
const errorMessage = computed(() => {
  if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
    return form.errorMessages[props.prop]
  } else {
    return ''
  }
})

// 是否展示必填
const isRequired = computed(() => {
  let formRequired = false
  if (form && form.props.rules) {
    const rules = form.props.rules
    for (const key in rules) {
      if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
        formRequired = rules[key].some((rule: FormItemRule) => rule.required)
      }
    }
  }
  return props.required || props.rules.some((rule) => rule.required) || formRequired
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
  pickerShow.value = false
  // 如果目前用户正在选择，需要在popup关闭时将数据重置回上次数据，popup 关闭时间 250
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
  emit('close')
}
function showPicker() {
  const { disabled, readonly } = props

  if (disabled || readonly) return
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

  return {
    [valueKey]: value,
    [labelKey]: ''
  }
}

function chooseItem(colIndex: number, index: number) {
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

  if (selectShowList.value[colIndex] && colIndex === currentCol.value) {
    updateLineAndScroll(true)
  }

  handleColChange(colIndex, item, index)
}

function handleColChange(colIndex: number, item: Record<string, any>, index: number, callback?: () => void) {
  loading.value = true
  const { columnChange, beforeConfirm } = props
  columnChange &&
    columnChange({
      selectedItem: item,
      index: colIndex,
      rowIndex: index,
      resolve: (nextColumn: Record<string, any>[]) => {
        if (!isArray(nextColumn)) {
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
      finish: (isOk?: boolean) => {
        // 每设置展示数据回显
        if (typeof callback === 'function') {
          loading.value = false
          isCompleting.value = false
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

  emit('update:modelValue', pickerColSelected.value)
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
function setLineStyle(animation: boolean = true) {
  if (!inited.value) return
  const { lineWidth, lineHeight } = props
  getRect($item, true, proxy).then((rects) => {
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
}
/**
 * @description scroll-view滑动到active的tab_nav
 */
function lineScrollIntoView() {
  if (!inited.value) return
  Promise.all([getRect($item, true, proxy), getRect($container, false, proxy)]).then(([navItemsRects, navRect]) => {
    if (!isArray(navItemsRects) || navItemsRects.length === 0) return
    // 选中元素
    const selectItem = navItemsRects[currentCol.value]
    // 选中元素之前的节点的宽度总和
    const offsetLeft = navItemsRects.slice(0, currentCol.value).reduce((prev, curr) => prev + Number(curr.width), 0)
    // scroll-view滑动到selectItem的偏移量
    scrollLeft.value = offsetLeft - ((navRect as any).width - Number(selectItem.width)) / 2
  })
}

// 递归列数据补齐
function diffColumns(colIndex: number) {
  // colIndex 为 -1 时，item 为空对象，>=0 时则具有 value 属性
  const item = colIndex === -1 ? {} : { [props.valueKey]: props.modelValue[colIndex] }
  handleColChange(colIndex, item, -1, () => {
    // 如果 columns 长度还小于 value 长度，colIndex + 1，继续递归补齐
    if (selectList.value.length < props.modelValue.length) {
      diffColumns(colIndex + 1)
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

defineExpose<ColPickerExpose>({
  close,
  open
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
