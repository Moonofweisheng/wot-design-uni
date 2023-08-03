<!--
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-03 23:17:24
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
      <view class="wd-collapse__more" @click="switchValue(!modelValue)">
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

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, provide, ref, watch } from 'vue'

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
const children: any[] = [] // 子组件
const { proxy } = getCurrentInstance() as any

const emit = defineEmits(['change', 'update:modelValue'])

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
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
    // 初始状态不执行动画
    // 外部修改 value 滚动
    if (oldVal && !viewmore && children) {
      children.forEach((item) => {
        const condition = Array.isArray(newVal) ? newVal.indexOf(item.name) > -1 : newVal === item.name
        if (item.isExpand === condition) return
        item.$.exposed.scrollHeight('.wd-collapse-item__body')
      })
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
function setChild(child) {
  const hasChild = children.findIndex((item) => {
    return item.$.uid === child.$.uid
  })
  if (hasChild === -1) {
    const repeat = checkRepeat(children, child.name, 'name')
    if (repeat > -1) {
      throw Error('Name attribute cannot be defined repeatedly')
    }
    children.push(child)
    children[0].$.exposed.setFirstItem(true)
  } else {
    children[hasChild] = child
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
 * 折叠控制
 * @param {String} name 当前选中的 item name
 * @param {Boolean} expanded 是否展开 false: 开->关(删除)；true: 关->开(添加)
 */
function switchValue(name, expanded?) {
  const { accordion, viewmore, modelValue } = props
  if (!accordion && !viewmore && modelValue && Array.isArray(modelValue)) {
    name = expanded ? modelValue.concat(name) : modelValue.filter((item) => item !== name)
  }
  emit('update:modelValue', name)
  emit('change', {
    value: name
  })
}

provide('wdcollapse', proxy)
provide('collapseChildren', children)

defineExpose({
  children,
  setChild,
  checkRepeat,
  switchValue
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
