<!--
 * @Author: weisheng
 * @Date: 2023-07-20 00:34:54
 * @LastEditTime: 2023-07-21 17:56:33
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\collapse\Index.vue
 * 记得注释
-->
<template>
  <view>
    <!-- <demo-block title="基础用法" transparent>
      <wd-collapse value="{{ value1 }}" bind:change="handleChange1">
        <wd-collapse-item title="标签1" name="{{ name }}">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="手风琴" transparent>
      <wd-collapse value="{{ value2  }}" accordion="{{ accordion }}" bindchange="handleChange2">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="禁用" transparent>
      <wd-collapse value="{{ value3 }}" bind:change="handleChange3">
        <wd-collapse-item title="标签1" name="item1">这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" disabled>这是一条简单的示例文字。</wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3">这是一条简单的示例文字。</wd-collapse-item>
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多" transparent>
      <wd-collapse viewmore value="{{ value4 }}" bind:change="handleChange4">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-行数显示设置" transparent>
      <wd-collapse viewmore value="{{ value5 }}" bind:change="handleChange5" line-num="3">
        行数显示设置：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
      </wd-collapse>
    </demo-block>
    <demo-block title="查看更多-具名插槽" transparent>
      <wd-collapse viewmore value="{{ value6 }}" bind:change="handleChange6" use-more-slot custom-more-slot-class="more-slot">
        具名插槽：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        <view slot="more">显示全部</view>
      </wd-collapse>
    </demo-block> -->
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

// const value1 = ref<string[]>(['item1'])
// const value2 = ref<string>('item1')
// const value3 = ref<string[]>(['item1'])
// const value4 = ref<boolean>(false)
// const value5 = ref<boolean>(false)
// const value6 = ref<boolean>(false)
// const accordion = ref<boolean>(true)
// const name = ref<string>('item1')

// function handleChange1({ detail }) {
//   this.setData({ value1: detail.value })
// }
// function handleChange2({ detail }) {
//   this.setData({ value2: detail.value })
// }
// function handleChange3({ detail }) {
//   this.setData({ value3: detail.value })
// }
// function handleChange4({ detail }) {
//   this.setData({ value4: detail.value })
// }
// function handleChange5({ detail }) {
//   this.setData({ value5: detail.value })
// }
</script>
<style lang="scss" scoped>
.more-slot {
  color: red;
}
</style>
