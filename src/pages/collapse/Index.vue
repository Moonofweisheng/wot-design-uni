<template>
  <view>
    <demo-block title="基础用法" transparent>
      <wd-collapse v-model="value1" @change="handleChange1">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="手风琴" transparent>
      <wd-collapse v-model="value2" :accordion="accordion" @change="handleChange2">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="禁用" transparent>
      <wd-collapse v-model="value3" @change="handleChange3">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多" transparent>
      <wd-collapse viewmore v-model="value4" @change="handleChange4">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-行数显示设置" transparent>
      <wd-collapse viewmore v-model="value5" @change="handleChange5" :line-num="3">
        行数显示设置：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-具名插槽" transparent>
      <wd-collapse viewmore v-model="value6" @change="handleChange6" use-more-slot custom-more-slot-class="more-slot">
        具名插槽：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        <template #more>
          <view>显示全部</view>
        </template>
      </wd-collapse>
    </demo-block>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<string[]>(['item1'])
const value2 = ref<string>('item1')
const value3 = ref<string[]>(['item1'])
const value4 = ref<boolean>(false)
const value5 = ref<boolean>(false)
const value6 = ref<boolean>(false)
const accordion = ref<boolean>(true)
const name = ref<string>('item1')

function handleChange1({ value }) {
  // console.log(value)
}
function handleChange2({ value }) {
  // console.log(value)
}
function handleChange3({ value }) {
  // console.log(value)
}
function handleChange4({ value }) {
  // console.log(value)
}
function handleChange5({ value }) {
  // console.log(value)
}

function handleChange6({ value }) {
  // console.log(value)
}
</script>
<style lang="scss" scoped>
:deep(.more-slot) {
  color: red;
}
</style>
