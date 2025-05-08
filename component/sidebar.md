---
url: 'https://wot-design-uni.cn/component/sidebar.md'
---
# Sidebar 侧边导航 0.1.49

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

## 基础用法

通过 `v-model` 绑定当前选中项的索引。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```typescript
const active = ref(0)
```

## 徽标提示

设置 `is-dot` 属性后，会在右上角展示一个小红点；设置 `badge` 属性后，会在右上角展示相应的徽标。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" is-dot />
  <wd-sidebar-item :value="1" label="标签名称" badge="5" />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

## 禁用选项

通过 `disabled` 属性禁用选项。

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" disabled />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

## 监听切换事件

设置 `change` 方法来监听切换导航项时的事件。

```html
<wd-sidebar v-model="active" @change="handleChange">
  <wd-sidebar-item :value="0" label="标签名称 1" />
  <wd-sidebar-item :value="1" label="标签名称 2" />
  <wd-sidebar-item :value="2" label="标签名称 3" />
</wd-sidebar>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
const active = ref<number>(1)

function handleChange({ value, label }) {
  toast.show(`当前标签名 ${label}`)
}
```

## 异步切换

通过 `before-change` 属性可以在切换标签前执行特定的逻辑。它接收 `{ value, resolve }` 参数，通过 `resolve` `继续执行，resolve` 接收 1 个 boolean 参数

```html
<wd-sidebar v-model="active" :before-change="beforeChange">
  <wd-sidebar-item :value="0" label="标签名称" />
  <wd-sidebar-item :value="1" label="标签名称" disabled />
  <wd-sidebar-item :value="2" label="标签名称" />
</wd-sidebar>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'
import type { SidebarBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-sidebar/types'
import { ref } from 'vue'
const { loading: showLoading, close: closeLoading } = useToast()

const toast = useToast()
const active = ref<number>(1)

const beforeChange: SidebarBeforeChange = ({ value, resolve }) => {
  showLoading('切换中')
  setTimeout(() => {
    closeLoading()
    resolve(true)
  }, 2000)
}
```

## 锚点用法示例

sidebar 组件的锚点用法可以帮助用户在长页面上快速导航到特定的部分。

::: details 查看锚点用法示例
::: code-group

```html [vue]
<view class="wraper">
  <wd-sidebar v-model="active" @change="handleChange">
    <wd-sidebar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label" />
  </wd-sidebar>
  <scroll-view class="content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false" @scroll="onScroll">
    <view v-for="(item, index) in categories" :key="index" class="category">
      <wd-cell-group :title="item.title" border>
        <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
          <wd-icon name="github-filled" size="24px"></wd-icon>
        </wd-cell>
      </wd-cell-group>
    </view>
  </scroll-view>
</view>
```

```typescript [typescript]
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRect, isArray } from '@/uni_modules/wot-design-uni/components/common/util'

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const subCategories = new Array(24).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    items: subCategories
  },
  {
    label: '分类二',
    title: '标题二',
    items: subCategories
  },
  {
    label: '分类三',
    title: '标题三',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类四',
    title: '标题四',
    items: subCategories.slice(0, 21)
  },
  {
    label: '分类五',
    title: '标题五',
    items: subCategories
  },
  {
    label: '分类六',
    title: '标题六',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类七',
    title: '标题七',
    items: subCategories
  }
])

onMounted(() => {
  getRect('.category', true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}
function onScroll(e) {
  const { scrollTop } = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
  if (index > -1) {
    active.value = index
  }
}
</script>
```

```css [css]
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}

.content {
  flex: 1;
  background: #fff;
}
```

:::

## 切换页面用法示例

sidebar 组件在每次切换激活项时，跳转到指定的页面，且无法通过滚动导航到下一个 sidebar 项。

::: details 查看切换页面用法示例
::: code-group

```html [vue]
<view class="wraper">
  <wd-sidebar v-model="active" @change="handleChange">
    <wd-sidebar-item
      v-for="(item, index) in categories"
      :key="index"
      :value="index"
      :label="item.label"
      :icon="item.icon"
      :disabled="item.disabled"
    />
  </wd-sidebar>
  <view class="content" :style="`transform: translateY(-${active * 100}%)`">
    <scroll-view
      v-for="(item, index) in categories"
      :key="index"
      class="category"
      scroll-y
      scroll-with-animation
      :show-scrollbar="false"
      :scroll-top="scrollTop"
      :throttle="false"
    >
      <wd-cell-group :title="item.title" border>
        <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
          <wd-icon name="github-filled" size="24px"></wd-icon>
        </wd-cell>
      </wd-cell-group>
    </scroll-view>
  </view>
</view>
```

```typescript [typescript]
<script lang="ts" setup>
import { ref, nextTick } from 'vue'

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const subCategories = new Array(24).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false
  },
  {
    label: '分类二',
    title: '标题二',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false
  },
  {
    label: '分类三',
    title: '标题三',
    icon: 'thumb-up',
    items: subCategories.slice(0, 18),
    disabled: false
  },
  {
    label: '分类四',
    title: '标题四',
    icon: 'thumb-up',
    items: subCategories.slice(0, 21),
    disabled: false
  },
  {
    label: '分类五',
    title: '标题五',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false
  },
  {
    label: '分类六',
    title: '标题六',
    icon: 'thumb-up',
    items: subCategories.slice(0, 18),
    disabled: false
  },
  {
    label: '分类七',
    title: '标题七',
    icon: 'thumb-up',
    items: subCategories,
    disabled: true
  }
])

function handleChange({ value }) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}
</script>
```

```css [css]
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
  overflow: hidden;
}
.content {
  flex: 1;
  background: #fff;
  transition: transform 0.3s ease;
}
.category {
  box-sizing: border-box;
  height: 100%;
}
```

:::

## 自定义图标用法示例

设置`sidebar-item`的`icon`属性，自定义图标。

::: details 自定义图标用法示例
::: code-group

```html [vue]
<view class="wraper">
  <wd-sidebar v-model="active" @change="handleChange">
    <wd-sidebar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label" :icon="item.icon" />
  </wd-sidebar>
  <scroll-view class="content" scroll-y scroll-with-animation :scroll-top="scrollTop" :throttle="false" @scroll="onScroll">
    <view v-for="(item, index) in categories" :key="index" class="category">
      <wd-cell-group :title="item.title" border>
        <wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
          <wd-icon name="github-filled" size="24px"></wd-icon>
        </wd-cell>
      </wd-cell-group>
    </view>
  </scroll-view>
</view>
```

```typescript [typescript]
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getRect, isArray } from '@/uni_modules/wot-design-uni/components/common/util'

const active = ref<number>(1)
const scrollTop = ref<number>(0)
const itemScrollTop = ref<number[]>([])

const subCategories = new Array(24).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    icon: 'thumb-up',
    items: subCategories
  },
  {
    label: '分类二',
    title: '标题二',
    icon: 'qrcode',
    items: subCategories
  },
  {
    label: '分类三',
    title: '标题三',
    icon: 'location',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类四',
    title: '标题四',
    icon: 'ie',
    items: subCategories.slice(0, 21)
  },
  {
    label: '分类五',
    title: '标题五',
    icon: 'github-filled',
    items: subCategories
  },
  {
    label: '分类六',
    title: '标题六',
    icon: 'chrome',
    items: subCategories.slice(0, 18)
  },
  {
    label: '分类七',
    title: '标题七',
    icon: 'android',
    items: subCategories
  }
])

onMounted(() => {
  getRect('.category', true).then((rects) => {
    if (isArray(rects)) {
      itemScrollTop.value = rects.map((item) => item.top || 0)
      scrollTop.value = rects[active.value].top || 0
    }
  })
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = itemScrollTop.value[value]
}
function onScroll(e) {
  const { scrollTop } = e.detail
  const threshold = 50 // 下一个标题与顶部的距离
  if (scrollTop < threshold) {
    active.value = 0
    return
  }
  const index = itemScrollTop.value.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)
  if (index > -1) {
    active.value = index
  }
}
</script>
```

```css [css]
.wraper {
  display: flex;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
.content {
  flex: 1;
  background: #fff;
}
```

:::

## Attributes

| 参数               | 说明                                                                                                                                  | 类型             | 可选值 | 默认值 | 最低版本         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------ | ------ | ---------------- |
| modelValue / v-model | 当前导航项的索引                                                                                                                      | string / number | -      | 0      | 0.1.49           |
| before-change      | 切换导航项前钩子，可以在切换标签前执行特定的逻辑，接收 { value, resolve } 参数，通过 resolve 继续执行，resolve 接收 1 个 boolean 参数 | function         | -      | -      | 1.4.0 |

## Events

| 事件名称 | 说明           | 参数                                       | 最低版本 |
| -------- | -------------- | ------------------------------------------ | -------- |
| change   | 选项切换时触发 | `(value: number \| string, label: string)` | 0.1.49   |

## Slots

| name    | 说明       | 参数 | 最低版本 |
| ------- | ---------- | ---- | -------- |
| default | 自定义展示 | -    | 0.1.49   |

## 外部样式类

| 类名        | 说明         | 最低版本 |
| ----------- | ------------ | -------- |
| customStyle | 自定义样式   | 0.1.49   |
| customClass | 自定义样式类 | 0.1.49   |

## SidebarItem Attributes

| 参数        | 说明                                                                                     | 类型                       | 可选值 | 默认值 | 最低版本 |
| ----------- | ---------------------------------------------------------------------------------------- | -------------------------- | ------ | ------ | -------- |
| label       | 当前选项标题                                                                             | string                     | -      | -      | 0.1.49   |
| value       | 当前选项的值，唯一标识                                                                   | `number / string`         | -      | -      | 0.1.49   |
| icon        | 图标                                                                                     | string                     | -      | -      | 0.1.49   |
| badge       | 徽标属性，徽标显示值                                                                     | `number / string / null` | -      | -      | 0.1.49   |
| isDot       | 徽标属性，是否点状徽标                                                                   | boolean                    | -      | false  | 0.1.49   |
| max         | 徽标属性，徽标最大值                                                                     | number                     | -      | 99     | 0.1.49   |
| disabled    | 是否禁用                                                                                 | boolean                    | -      | false  | 0.1.49   |
| badge-props | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/component/badge#attributes) | BadgeProps                 | -      | -      | 0.1.50   |

## SidebarItem Slots

| name | 说明       | 参数 | 最低版本 |
| ---- | ---------- | ---- | -------- |
| icon | 自定义图标 | -    | 0.1.49   |

## SidebarItem 外部样式类

| 类名        | 说明         | 最低版本 |
| ----------- | ------------ | -------- |
| customStyle | 自定义样式   | 0.1.49   |
| customClass | 自定义样式类 | 0.1.49   |
