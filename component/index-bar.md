---
url: 'https://wot-design-uni.cn/component/index-bar.md'
---
# IndexBar 索引栏 1.2.21

用于列表的索引分类显示和快速定位。

## 基本用法

使用一个固定高度的元素包裹`wd-index-bar`组件,组件的宽高会和包裹元素相同。

将`wd-index-anchor`作为子组件使用,会根据 anchor 组件的`index`属性生成锚点以及侧边栏。

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
    data: ['阿坝', '阿拉善', '阿里', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门']
  },
  {
    index: 'B',
    data: ['北京', '白银', '保定', '宝鸡', '保山', '包头', '巴中', '北海', '蚌埠', '本溪', '毕节', '滨州', '百色', '亳州']
  },
  {
    index: 'C',
    data: [
      '重庆',
      '成都',
      '长沙',
      '长春',
      '沧州',
      '常德',
      '昌都',
      '长治',
      '常州',
      '巢湖',
      '潮州',
      '承德',
      '郴州',
      '赤峰',
      '池州',
      '崇左',
      '楚雄',
      '滁州',
      '朝阳'
    ]
  },
  {
    index: 'D',
    data: ['大连', '东莞', '大理', '丹东', '大庆', '大同', '大兴安岭', '德宏', '德阳', '德州', '定西', '迪庆', '东营']
  },
  {
    index: 'E',
    data: ['鄂尔多斯', '恩施', '鄂州']
  },
  {
    index: 'F',
    data: ['福州', '防城港', '佛山', '抚顺', '抚州', '阜新', '阜阳']
  },
  {
    index: 'G',
    data: ['广州', '桂林', '贵阳', '甘南', '赣州', '甘孜', '广安', '广元', '贵港', '果洛']
  },
  {
    index: 'H',
    data: [
      '杭州',
      '哈尔滨',
      '合肥',
      '海口',
      '呼和浩特',
      '海北',
      '海东',
      '海南',
      '海西',
      '邯郸',
      '汉中',
      '鹤壁',
      '河池',
      '鹤岗',
      '黑河',
      '衡水',
      '衡阳',
      '河源',
      '贺州',
      '红河',
      '淮安',
      '淮北',
      '怀化',
      '淮南',
      '黄冈',
      '黄南',
      '黄山',
      '黄石',
      '惠州',
      '葫芦岛',
      '呼伦贝尔',
      '湖州',
      '菏泽'
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

## 更新列表数据

列表数据如果需要更新，可以参考此示例

::: details 查看更新列表数据示例
::: code-group

```html [vue]
<template>
    <wd-search hide-cancel placeholder="我要去哪里？" v-model="keyword" @search="handleSearch" @clear="handleClear" />
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
    data: ['阿坝', '阿拉善', '阿里', '安康', '安庆', '鞍山', '安顺', '安阳', '澳门']
  },
  {
    index: 'B',
    data: ['北京', '白银', '保定', '宝鸡', '保山', '包头', '巴中', '北海', '蚌埠', '本溪', '毕节', '滨州', '百色', '亳州']
  },
  {
    index: 'C',
    data: [
      '重庆',
      '成都',
      '长沙',
      '长春',
      '沧州',
      '常德',
      '昌都',
      '长治',
      '常州',
      '巢湖',
      '潮州',
      '承德',
      '郴州',
      '赤峰',
      '池州',
      '崇左',
      '楚雄',
      '滁州',
      '朝阳'
    ]
  },
  {
    index: 'D',
    data: ['大连', '东莞', '大理', '丹东', '大庆', '大同', '大兴安岭', '德宏', '德阳', '德州', '定西', '迪庆', '东营']
  },
  {
    index: 'E',
    data: ['鄂尔多斯', '恩施', '鄂州']
  },
  {
    index: 'F',
    data: ['福州', '防城港', '佛山', '抚顺', '抚州', '阜新', '阜阳']
  },
  {
    index: 'G',
    data: ['广州', '桂林', '贵阳', '甘南', '赣州', '甘孜', '广安', '广元', '贵港', '果洛']
  },
  {
    index: 'H',
    data: [
      '杭州',
      '哈尔滨',
      '合肥',
      '海口',
      '呼和浩特',
      '海北',
      '海东',
      '海南',
      '海西',
      '邯郸',
      '汉中',
      '鹤壁',
      '河池',
      '鹤岗',
      '黑河',
      '衡水',
      '衡阳',
      '河源',
      '贺州',
      '红河',
      '淮安',
      '淮北',
      '怀化',
      '淮南',
      '黄冈',
      '黄南',
      '黄山',
      '黄石',
      '惠州',
      '葫芦岛',
      '呼伦贝尔',
      '湖州',
      '菏泽'
    ]
  }
]

function handleClick(index: string, city: string) {
  showToast(`当前点击项：${index}，城市：${city}`)
}

function handleSearch() {
  showList.value = []
  nextTick(() => {
    if (keyword.value) {
      showList.value = indexList.filter((item) => {
        return item.data.some((city) => {
          return city.includes(keyword.value)
        })
      })
    } else {
      showList.value = indexList
    }
  })

  // 筛选indexList项中data包含keyword的项
}

function handleClear() {
  keyword.value = ''
  handleSearch()
}
</script>
```

```css [css]
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
```

:::

## Attributes

| 参数   | 说明         | 类型    | 可选值 | 默认值 | 最低版本 |
| ------ | ------------ | ------- | ------ | ------ | -------- |
| sticky | 索引是否吸顶 | boolean | -      | false  | -        |

## IndexAnchor Attributes

| 参数  | 说明     | 类型             | 可选值 | 默认值 | 最低版本 |
| ----- | -------- | ---------------- | ------ | ------ | -------- |
| index | 索引字符 | string / number | -      | -      | -        |

## IndexAnchor Slots

| name    | 说明       | 参数 | 最低版本 |
| ------- | ---------- | ---- | -------- |
| default | 自定义内容 | -    | -        |

## IndexAnchor 外部样式类

| 类名        | 说明         | 最低版本 |
| ----------- | ------------ | -------- |
| customStyle | 自定义样式   | -        |
| customClass | 自定义样式类 | -        |
