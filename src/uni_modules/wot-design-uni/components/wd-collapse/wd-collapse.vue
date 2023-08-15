<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-04 13:34:15
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-collapse\wd-collapse.vue
 * 记得注释
-->
<template>
  <view :class="`wd-collapse ${viewmore ? 'is-viewmore' : ''} ${customClass}`">
    <!-- 普通或手风琴 -->
    <block v-if="!viewmore">
      <slot></slot>
    </block>
    <!-- 查看更多模式 -->
    <view v-else>
      <view
        :class="`wd-collapse__content ${!modelValue ? 'is-retract' : ''} `"
        :style="`-webkit-line-clamp: ${contentLineNum}; -webkit-box-orient: vertical`"
      >
        <slot></slot>
      </view>
      <view class="wd-collapse__more" @click="handleMore">
        <!-- 自定义展开按钮 -->
        <view v-if="useMoreSlot" :class="customMoreSlotClass">
          <slot name="more"></slot>
        </view>
        <!-- 显示展开或折叠按钮 -->
        <block v-else>
          <span class="wd-collapse__more-txt">{{ !modelValue ? '展开' : '折叠' }}</span>
          <view :class="`wd-collapse__arrow ${modelValue ? 'is-retract' : ''}`">
            <wd-icon name="arrow-down"></wd-icon>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-collapse',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, provide, ref, watch } from 'vue'
import { CollapseItem } from './types'
import { deepClone } from '../common/util'

interface Props {
  customClass?: string
  customMoreSlotClass?: string
  modelValue: string | Array<string> | boolean
  accordion: boolean
  viewmore: boolean
  useMoreSlot: boolean
  lineNum: number
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customMoreSlotClass: '',
  accordion: false,
  viewmore: false,
  useMoreSlot: false,
  lineNum: 2
})

const contentLineNum = ref<number>(0) // 查看更多的折叠面板，收起时的显示行数
const children: CollapseItem[] = [] // 子组件
const firstItem = ref<string>('') // 第一项
const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['change', 'update:modelValue'])

watch(
  () => props.modelValue,
  (newVal) => {
    const { viewmore, accordion } = props
    // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
    if (newVal === null || newVal === undefined) {
      throw Error('value can not be null or undefined')
    }
    // 手风琴状态下 value 类型只能为 string
    if (accordion && typeof newVal !== 'string') {
      throw Error('accordion value must be string')
    } else if (!accordion && !viewmore && checkType(newVal) !== 'Array') {
      throw Error('value must be Array')
    }
  },
  { deep: true, immediate: true }
)

watch(
  () => props.lineNum,
  (newVal) => {
    if (newVal <= 0) {
      throw Error('lineNum must greater than 0')
    }
  },
  { deep: true, immediate: true }
)

onBeforeMount(() => {
  const { lineNum, viewmore, modelValue } = props
  contentLineNum.value = viewmore && !modelValue ? lineNum : 0
})

/**
 * 设置子项
 * @param child
 */
function setChild(child: CollapseItem) {
  const hasChild = children.findIndex((item) => {
    return item.name === child.name
  })
  if (hasChild === -1) {
    const repeat = checkRepeat(children, child.name, 'name')
    if (repeat > -1) {
      throw Error('Name attribute cannot be defined repeatedly')
    }
    children.push(child)
  } else {
    children[hasChild] = child
  }
  if (children.length) {
    firstItem.value = children[0].name
  }
}

function checkType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}
/**
 * 检查是否存在重复属性
 * @param {Array} currentList
 * @param {String} checkValue 比较的重复值
 * @param {String} key 键名
 */
function checkRepeat(currentList, checkValue, key) {
  return currentList.findIndex((item) => item[key] === checkValue)
}

/**
 * 子项状态变更
 * @param child 子项
 */
function change(child: CollapseItem) {
  let activeNames: string | string[] = deepClone(props.modelValue || '')
  if (props.accordion) {
    activeNames = child.expanded ? child.name : ''
  } else {
    activeNames = child.expanded
      ? Array.from(new Set((activeNames || []).concat(child.name)))
      : ((activeNames as string[]) || []).filter((activeName: string | number) => activeName !== child.name)
  }
  emit('update:modelValue', activeNames)
  emit('change', {
    value: activeNames
  })
}

/**
 * 查看更多点击
 */
function handleMore() {
  emit('update:modelValue', !props.modelValue)
  emit('change', {
    value: !props.modelValue
  })
}

provide('wdcollapse', proxy)
provide('firstItem', firstItem)
provide('set-child', setChild) // 将设置子项方法导出
provide('set-change', change) // 将子项状态变更方法导出

defineExpose({
  children,
  setChild,
  checkRepeat
  // switchValue
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
