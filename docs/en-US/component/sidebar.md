# Sidebar

A vertical navigation bar used to switch between different content areas.

## Basic Usage

Bind the current selected item's index through `v-model`.

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="Label Name" />
  <wd-sidebar-item :value="1" label="Label Name" />
  <wd-sidebar-item :value="2" label="Label Name" />
</wd-sidebar>
```

```typescript
const active = ref(0)
```

## Badge Tips

After setting the `is-dot` property, a small red dot will be displayed in the upper right corner. Setting the `badge` property will display the corresponding badge in the upper right corner.

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="Label Name" is-dot />
  <wd-sidebar-item :value="1" label="Label Name" badge="5" />
  <wd-sidebar-item :value="2" label="Label Name" />
</wd-sidebar>
```

## Disabled Options

Disable options through the `disabled` property.

```html
<wd-sidebar v-model="active">
  <wd-sidebar-item :value="0" label="Label Name" />
  <wd-sidebar-item :value="1" label="Label Name" disabled />
  <wd-sidebar-item :value="2" label="Label Name" />
</wd-sidebar>
```

## Listen to Switch Events

Set the `change` method to listen to events when switching navigation items.

```html
<wd-sidebar v-model="active" @change="handleChange">
  <wd-sidebar-item :value="0" label="Label Name 1" />
  <wd-sidebar-item :value="1" label="Label Name 2" />
  <wd-sidebar-item :value="2" label="Label Name 3" />
</wd-sidebar>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()
const active = ref<number>(1)

function handleChange({ value, label }) {
  toast.show(`Current Label Name ${label}`)
}
```

## Asynchronous Switching

Through the `before-change` property, you can execute specific logic before switching tabs. It receives `{ value, resolve }` parameters, continues execution through `resolve`, and `resolve` accepts 1 boolean parameter.

```html
<wd-sidebar v-model="active" :before-change="beforeChange">
  <wd-sidebar-item :value="0" label="Label Name" />
  <wd-sidebar-item :value="1" label="Label Name" disabled />
  <wd-sidebar-item :value="2" label="Label Name" />
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
  showLoading('Switching')
  setTimeout(() => {
    closeLoading()
    resolve(true)
  }, 2000)
}
```

## Anchor Usage Example

The anchor usage of the sidebar component can help users quickly navigate to specific sections on long pages.

::: details View Anchor Usage Example
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

const subCategories = new Array(24).fill({ title: 'Title Text', label: 'This is description This is description' }, 0, 24)
const categories = ref([
  {
    label: 'Category 1',
    title: 'Title 1',
    items: subCategories
  },
  {
    label: 'Category 2',
    title: 'Title 2',
    items: subCategories
  },
  {
    label: 'Category 3',
    title: 'Title 3',
    items: subCategories.slice(0, 18)
  },
  {
    label: 'Category 4',
    title: 'Title 4',
    items: subCategories.slice(0, 21)
  },
  {
    label: 'Category 5',
    title: 'Title 5',
    items: subCategories
  },
  {
    label: 'Category 6',
    title: 'Title 6',
    items: subCategories.slice(0, 18)
  },
  {
    label: 'Category 7',
    title: 'Title 7',
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
  const threshold = 50 // Distance between the next title and the top
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
  height: 100vh;
  overflow: hidden;
}
.content {
  flex: 1;
  height: 100%;
}
.category {
  background: #fff;
}
```
:::

## Attributes

| Parameter          | Description                                                                                                                                                                     | Type             | Accepted Values | Default | Version |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|-----------------|---------|---------|
| modelValue/v-model | Index of current navigation item                                                                                                                                                | string / number  | -               | 0       | 0.1.49  |
| before-change     | Hook before switching navigation items. Can execute specific logic before switching tabs. Receives { value, resolve } parameters, continue execution through resolve               | function         | -               | -       | 1.4.0   |

## Events

| Event Name | Description                    | Parameters                                  | Version |
|------------|--------------------------------|---------------------------------------------|---------|
| change     | Triggered when option switches | `(value: number \| string, label: string)` | 0.1.49  |

## Slots

| Name    | Description     | Parameters | Version |
|---------|----------------|------------|---------|
| default | Custom display | -          | 0.1.49  |

## External Classes

| Class Name   | Description      | Version |
|-------------|------------------|----------|
| customStyle | Custom style     | 0.1.49   |
| customClass | Custom style class| 0.1.49   |

## SidebarItem Attributes

| Parameter   | Description                                                                                                      | Type                      | Accepted Values | Default | Version |
|-------------|----------------------------------------------------------------------------------------------------------------|---------------------------|-----------------|---------|---------|
| label       | Current option title                                                                                             | string                    | -               | -       | 0.1.49  |
| value       | Current option value, unique identifier                                                                          | `number / string`         | -               | -       | 0.1.49  |
| icon        | Icon                                                                                                             | string                    | -               | -       | 0.1.49  |
| badge       | Badge value                                                                                                      | `number / string / null`  | -               | -       | 0.1.49  |
| isDot       | Whether to display dot badge                                                                                     | boolean                   | -               | false   | 0.1.49  |
| max         | Maximum badge value                                                                                              | number                    | -               | 99      | 0.1.49  |
| disabled    | Whether disabled                                                                                                 | boolean                   | -               | false   | 0.1.49  |
| badge-props | Custom badge properties, passed object will be transparent to [Badge component props](/component/badge#attributes)| BadgeProps                | -               | -       | 0.1.50  |

## SidebarItem Slots

| Name | Description    | Parameters | Version |
|------|----------------|------------|---------|
| icon | Custom icon    | -          | 0.1.49  |

## SidebarItem External Classes

| Class Name   | Description      | Version |
|-------------|------------------|----------|
| customStyle | Custom style     | 0.1.49   |
| customClass | Custom style class| 0.1.49   |