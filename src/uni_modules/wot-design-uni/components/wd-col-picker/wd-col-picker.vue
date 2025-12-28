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
      <!-- 搜索框 -->
      <view class="wd-col-picker__search" v-if="filterable">
        <slot name="search">
          <wd-search
            v-model="searchText"
            :placeholder="translate('search')"
            hide-cancel
            :clearable="true"
            @change="handleSearchChange"
            @search="handleSearch"
            @clear="handleClear"
          />
        </slot>
      </view>
      <view class="wd-col-picker__list-container">
        <view
          v-for="(col, colIndex) in filterData"
          :key="colIndex"
          class="wd-col-picker__list"
          :style="colIndex === currentCol ? 'display: block;' : 'display: none;'"
        >
          <scroll-view
            scroll-y
            class="wd-col-picker__list-scroll-view"
            :scroll-with-animation="true"
            show-scrollbar
            :refresher-enabled="refresherEnabled && colIndex === currentCol"
            :refresher-triggered="refreshTriggered"
            :refresher-default-style="refresherDefaultStyle"
            :refresher-background="refresherBackground"
            @scrolltolower="(e) => handleScrollToLower(e, colIndex)"
            @refresherrefresh="(e) => handleRefresh(e, colIndex)"
          >
            <template v-if="col.length > 0">
              <view
                v-for="(item, index) in col"
                :key="index"
                :class="`wd-col-picker__list-item ${pickerColSelected[colIndex] && item[valueKey] === pickerColSelected[colIndex] && 'is-selected'} ${
                  item.disabled && 'is-disabled'
                }`"
                :id="`item-${colIndex}-${item[valueKey]}`"
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
            </template>
            <template v-else>
              <slot name="empty">
                <wd-status-tip image="content" tip="暂无内容" />
              </slot>
            </template>
          </scroll-view>
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
import wdSearch from '../wd-search/wd-search.vue'
import wdStatusTip from '../wd-status-tip/wd-status-tip.vue'
import { computed, getCurrentInstance, onMounted, ref, watch, type CSSProperties, reactive } from 'vue'
import { addUnit, debounce, getRect, isArray, isBoolean, isDef, isFunction, objToStyle } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { colPickerProps, type ColPickerExpose } from './types'

const { translate } = useTranslate('col-picker')

const $container = '.wd-col-picker__selected-container'
const $item = '.wd-col-picker__selected-item'

const props = defineProps(colPickerProps)
const emit = defineEmits([
  'close',
  'update:modelValue',
  'confirm',
  // 纯净解耦事件：只负责事件抛出，不负责数据处理
  'search-change', // 搜索内容变化
  'search', // 执行搜索
  'search-clear', // 清空搜索
  'refresh', // 下拉刷新
  'scroll-to-lower' // 上拉加载更多
])

const pickerShow = ref<boolean>(false)
const currentCol = ref<number>(0)
const selectList = ref<Record<string, any>[][]>([])
const pickerColSelected = ref<(string | number)[]>([])
const selectShowList = computed(() => {
  return pickerColSelected.value.map((item, colIndex) => {
    return getSelectedItem(item, colIndex, selectList.value)[props.labelKey]
  })
})
const loading = ref<boolean>(false)
const isChange = ref<boolean>(false)
const lastSelectList = ref<Record<string, any>[][]>([])
const lastPickerColSelected = ref<(string | number)[]>([])
const scrollLeft = ref<number>(0)
const inited = ref<boolean>(false)
const isCompleting = ref<boolean>(false)
const searchText = ref<string>('') // 搜索文本
const refreshTriggered = ref<boolean>(false) // 是否触发了下拉刷新
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

const filterData = computed(() => {
  if (props.filterType === 'local') {
    return selectList.value.map((col, colIndex) => {
      // 只过滤当前显示的列
      if (colIndex === currentCol.value) {
        return col.filter((item) => {
          const label = item[props.labelKey]
          return label && label.toString().toLowerCase().includes(searchText.value.toLowerCase())
        })
      }
      return col
    })
  } else {
    // 远程搜索模式下，computed 只负责返回原始数据，不触发事件
    return selectList.value
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
      console.error('[wot ui] error(wd-col-picker): the columns props of wd-col-picker should be a two-dimensional array')
      return
    }
    if (newValue.length === 0 && !oldValue) return

    const newSelectedList = newValue.slice(0)

    selectList.value = newSelectedList

    lastSelectList.value = newSelectedList

    if (newSelectedList.length > 0 && (!oldValue || newSelectedList.length > oldValue.length)) {
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
// 是否展示箭头
const showArrow = computed(() => {
  return !props.disabled && !props.readonly
})

onMounted(() => {
  inited.value = true
})
type SearchEventName = 'search-change' | 'search' | 'search-clear'

/**
 * 通用搜索事件emit函数
 * @param eventName 事件名称
 * @param searchText 搜索文本
 */
function emitSearchEvent(eventName: SearchEventName, searchText: string) {
  emit(eventName, {
    searchText,
    colIndex: currentCol.value,
    selectedValues: pickerColSelected.value,
    selectedItems: pickerColSelected.value.map((value, index) => {
      const colData = selectList.value[index] || []
      return colData.find((item) => item[props.valueKey] === value) || { [props.valueKey]: value, [props.labelKey]: value }
    })
  })
}

/**
 * 搜索内容变化处理 - 纯净事件抛出模式
 */
function handleSearchChange({ value }: { value: string }) {
  if (props.filterType === 'local') return
  emitSearchEvent('search-change', value)
}
/**
 * 搜索执行处理 - 纯净事件抛出模式
 */
function handleSearch({ value }: { value: string }) {
  if (props.filterType === 'local') return
  emitSearchEvent('search', value)
}
/**
 * 清空搜索处理 - 简化事件抛出模式
 */
function handleClear() {
  if (props.filterType === 'local') return
  emitSearchEvent('search-clear', '')
}
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
  emit('close')
}

function handlePickerClosed() {
  if (isChange.value) {
    setTimeout(() => {
      selectList.value = lastSelectList.value.slice(0)
      pickerColSelected.value = lastPickerColSelected.value.slice(0)
      currentCol.value = lastSelectList.value.length - 1
      isChange.value = false
    }, 250)
  }
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
  if (refreshTriggered.value || loading.value) return
  // 使用filterData获取当前显示的项目
  const currentFilteredCol = filterData.value[colIndex]
  const item = currentFilteredCol[index]
  if (item.disabled) return

  const newPickerColSelected = pickerColSelected.value.slice(0, colIndex)
  newPickerColSelected.push(item[props.valueKey])
  isChange.value = true
  pickerColSelected.value = newPickerColSelected
  selectList.value = selectList.value.slice(0, colIndex + 1)

  if (selectShowList.value[colIndex] && colIndex === currentCol.value) {
    updateLineAndScroll(true)
  }

  // 清除搜索文本
  searchText.value = ''

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
          console.error('[wot ui] error(wd-col-picker): the data of each column of wd-col-picker should be an array')
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
/**
 * 列点击处理
 * @param {Number} index 点击的列索引
 */
function handleColClick(index: number) {
  searchText.value = ''
  isChange.value = true
  currentCol.value = index
  updateLineAndScroll(true)
  // 切换列时搜索框被清空，通知外部更新状态
  // 注意：这里是在切换到新列之后抛出的，所以 colIndex 是新列的索引
  if (props.filterType !== 'local') {
    emitSearchEvent('search-clear', '')
  }
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

/*
 * @description 滚动加载数据
 * @param {Event} e scroll-view滚动到底部的事件对象
 * @param {Number} colIndex 当前列的索引
 */
function handleScrollToLower(e: any, colIndex: number) {
  if (!props.scrollToLowerEnabled) {
    return
  }

  // 直接抛出事件，不再处理handler逻辑
  emit('scroll-to-lower', {
    searchText: searchText.value,
    colIndex: colIndex,
    isRefresh: false
  })
}

/**
 * @description 下拉刷新 - 纯净事件模式
 * @param {Event} e scroll-view滚动到顶部的事件对象
 * @param {Number} colIndex 当前列的索引
 */
function handleRefresh(e: any, colIndex: number) {
  if (!props.refresherEnabled) {
    return
  }
  // 开始刷新状态
  refreshTriggered.value = true
  // 直接抛出事件，不再处理handler逻辑
  emit('refresh', {
    searchText: searchText.value,
    colIndex: colIndex,
    isRefresh: true
  })
}

/**
 * 停止刷新状态 - 用于下拉刷新完成后
 */
function stopRefresh() {
  refreshTriggered.value = false
  console.log('[wd-col-picker] 停止刷新状态')
}

defineExpose<ColPickerExpose>({
  close,
  open,
  // 新增：外部数据更新API
  stopRefresh
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
