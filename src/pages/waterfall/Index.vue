<template>
  <view>
    <demo-block title="基本使用">
      <wd-cell title="删除后重新排序" label="重新排序会有页面抖动闪现效果">
        <wd-switch v-model="isReorder"></wd-switch>
      </wd-cell>
      <wd-cell title="清空数据">
        <wd-switch v-model="isClear" @change="handleClearChange"></wd-switch>
      </wd-cell>

      <wd-waterfall v-model="flowList" :isReorder="isReorder" ref="waterfallRef">
        <template v-slot:left="{ leftList }">
          <list-item v-for="(item, index) in leftList" :item="item" :key="index" @del="handleDel" @update="handleUpdate"></list-item>
        </template>
        <template v-slot:right="{ rightList }">
          <list-item v-for="(item, index) in rightList" :item="item" :key="index" @del="handleDel" @update="handleUpdate"></list-item>
        </template>
      </wd-waterfall>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'
import ListItem from './list-item.vue'
import { uuid } from '@/uni_modules/wot-design-uni/components/common/util'
const flowList = ref([
  {
    id: 1,
    title: 'wot-design-uni组件库基于vue3+Typescript构建',

    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 2,
    title: 'wot-design-uni组件库基于vue3+Typescript构建，参照wot design的设计规范进行开发',

    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 3,
    title: '提供70+高质量组件',

    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 4,
    title: '支持暗黑模式、国际化和自定义主题，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。',

    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 5,
    title:
      'wot-design-uni组件库基于vue3+Typescript构建，参照wot design的设计规范进行开发，提供70+高质量组件，支持暗黑模式、国际化和自定义主题，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。',

    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 6,
    title: '，旨在给开发者提供统一的UI交互，同时提高研发的开发效率。',
    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  },
  {
    id: 7,
    title: '支持暗黑模式、国际化和自定义主题',
    image: 'https://www.wetools.com/imgplaceholder/200x220?fontsize=20'
  }
])
const copyFlowList = JSON.parse(JSON.stringify(flowList.value))
const waterfallRef = ref()
const isReorder = ref(false)
const isClear = ref(false)

function handleDel(item: any) {
  waterfallRef.value.remove(item.id)
}
function handleUpdate(item: any) {
  const str = 'this is new title'
  if (item.title.includes(str)) {
    return waterfallRef.value.update(item.id, 'title', item.title.slice(str.length + 1))
  }
  waterfallRef.value.update(item.id, 'title', `this is new title-${item.title}`)
}

function handleClearChange() {
  if (isClear.value) {
    waterfallRef.value.clear()
  } else {
    flowList.value = copyFlowList
  }
}
function fetchMoreData() {
  return Promise.resolve(copyFlowList)
}
onReachBottom(() => {
  if (flowList.value.length < 50) {
    fetchMoreData().then((newData) => {
      flowList.value = [...flowList.value, ...newData].map((item) => {
        return {
          ...item,
          id: uuid()
        }
      })
    })
  }
})
</script>
