# IndexBar

Used for displaying index classification and quick positioning of lists.

## Basic Usage

Wrap the `wd-index-bar` component with a fixed-height element. The component's width and height will be the same as the wrapper element.

Use `wd-index-anchor` as a child component. Anchors and sidebar will be generated based on the `index` property of the anchor component.

```vue
<template>
  <view class="wraper">
    <wd-index-bar sticky>
      <view v-for="item in data" :key="item.index">
        <wd-index-anchor :index="item.index" />
        <wd-cell border clickable v-for="city in item.data" :key="city" :title="city" @click="handleClick(item.index, city)"></wd-cell>
      </view>
    </wd-index-bar>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const data = ref([
  {
    index: 'A',
    data: ['Aba', 'Alxa', 'Ali', 'Ankang', 'Anqing', 'Anshan', 'Anshun', 'Anyang', 'Macau']
  },
  {
    index: 'B',
    data: ['Beijing', 'Baiyin', 'Baoding', 'Baoji', 'Baoshan', 'Baotou', 'Bazhong', 'Beihai', 'Bengbu', 'Benxi', 'Bijie', 'Binzhou', 'Baise', 'Bozhou']
  },
  {
    index: 'C',
    data: [
      'Chongqing',
      'Chengdu',
      'Changsha',
      'Changchun',
      'Cangzhou',
      'Changde',
      'Changdu',
      'Changzhi',
      'Changzhou',
      'Chaohu',
      'Chaozhou',
      'Chengde',
      'Chenzhou',
      'Chifeng',
      'Chizhou',
      'Chongzuo',
      'Chuxiong',
      'Chuzhou',
      'Chaoyang'
    ]
  },
  {
    index: 'D',
    data: ['Dalian', 'Dongguan', 'Dali', 'Dandong', 'Daqing', 'Datong', 'Daxinganling', 'Dehong', 'Deyang', 'Dezhou', 'Dingxi', 'Diqing', 'Dongying']
  },
  {
    index: 'E',
    data: ['Erdos', 'Enshi', 'Ezhou']
  },
  {
    index: 'F',
    data: ['Fuzhou', 'Fangchenggang', 'Foshan', 'Fushun', 'Fuzhou', 'Fuxin', 'Fuyang']
  },
  {
    index: 'G',
    data: ['Guangzhou', 'Guilin', 'Guiyang', 'Gannan', 'Ganzhou', 'Ganzi', 'Guangan', 'Guangyuan', 'Guigang', 'Golog']
  },
  {
    index: 'H',
    data: [
      'Hangzhou',
      'Harbin',
      'Hefei',
      'Haikou',
      'Hohhot',
      'Haibei',
      'Haidong',
      'Hainan',
      'Haixi',
      'Handan',
      'Hanzhong',
      'Hebi',
      'Hechi',
      'Hegang',
      'Heihe',
      'Hengshui',
      'Hengyang',
      'Heyuan',
      'Hezhou',
      'Honghe',
      'Huaian',
      'Huaibei',
      'Huaihua',
      'Huainan',
      'Huanggang',
      'Huangnan',
      'Huangshan',
      'Huangshi',
      'Huizhou',
      'Huludao',
      'Hulunbuir',
      'Huzhou',
      'Heze'
    ]
  }
])
</script>

<style lang="scss">
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
```

## Update List Data

If the list data needs to be updated, you can refer to this example

::: details View Update List Data Example
::: code-group

```html [vue]
<template>
    <wd-search hide-cancel placeholder="Where do I want to go?" v-model="keyword" @search="handleSearch" @clear="handleClear" />
    <view class="wraper">
      <wd-index-bar sticky v-if="showList.length">
        <view v-for="item in showList" :key="item.index">
          <wd-index-anchor :index="item.index" />
          <wd-cell border clickable v-for="city in item.data" :key="city" :title="city" @click="handleClick(item.index, city)"></wd-cell>
        </view>
      </wd-index-bar>
    </view>
</template>
```

```typescript [typescript]
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { nextTick, onMounted, ref } from 'vue'
const { show: showToast } = useToast()

onMounted(() => {
  handleSearch()
})

const keyword = ref('')

const showList = ref<any>([])

const indexList = [
  {
    index: 'A',
    data: ['Aba', 'Alxa', 'Ali', 'Ankang', 'Anqing', 'Anshan', 'Anshun', 'Anyang', 'Macau']
  },
  {
    index: 'B',
    data: ['Beijing', 'Baiyin', 'Baoding', 'Baoji', 'Baoshan', 'Baotou', 'Bazhong', 'Beihai', 'Bengbu', 'Benxi', 'Bijie', 'Binzhou', 'Baise', 'Bozhou']
  },
  {
    index: 'C',
    data: [
      'Chongqing',
      'Chengdu',
      'Changsha',
      'Changchun',
      'Cangzhou',
      'Changde',
      'Changdu',
      'Changzhi',
      'Changzhou',
      'Chaohu',
      'Chaozhou',
      'Chengde',
      'Chenzhou',
      'Chifeng',
      'Chizhou',
      'Chongzuo',
      'Chuxiong',
      'Chuzhou',
      'Chaoyang'
    ]
  }
]

function handleSearch() {
  if (!keyword.value) {
    showList.value = indexList
    return
  }
  const list = indexList.map((item) => {
    return {
      index: item.index,
      data: item.data.filter((city) => city.toLowerCase().includes(keyword.value.toLowerCase()))
    }
  })
  showList.value = list.filter((item) => item.data.length)
}

function handleClear() {
  handleSearch()
}

function handleClick(index: string, city: string) {
  showToast({
    msg: `${index}-${city}`
  })
}
</script>
```

:::

## IndexBar Attributes

| Attribute | Description | Type | Default | Version |
|-----------|-------------|------|---------|----------|
| sticky | Whether to enable sticky mode | boolean | false | - |
| sticky-offset-top | Offset from top in sticky mode | number | 0 | - |
| z-index | z-index of sticky mode | number | 1 | - |
| highlight-color | Index character highlight color | string | #1989fa | - |

## IndexAnchor Attributes

| Attribute | Description | Type | Default | Version |
|-----------|-------------|------|---------|----------|
| index | Index character | string / number | - | - |

## IndexBar Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| select | Triggered when an index is selected | index: string / number | - |
| change | Triggered when index changes during scrolling | index: string / number | - |