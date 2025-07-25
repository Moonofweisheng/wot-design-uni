---
url: 'https://wot-design-uni.cn/component/tabs.md'
---
# Tab 标签页

标签页组件，用于在不同的内容区域之间进行切换。

## 基本用法

`v-model` 为绑定值，可以为 number 类型（选中的 tab 的下标）和 string 类型（标签名）。

:::tip 提示
当`v-model`为`number`类型时，`wd-tab`可以不必设置`name`。同时如果 value 超出了 tab 数量，会用 0 自动兜底。
:::

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item}}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tab = ref<number>(0)
```

```scss
.content {
  line-height: 120px;
  text-align: center;
}
```

## name 匹配

为`wd-tab`设置`name`作为唯一标识。

```html
<wd-tabs v-model="tab">
  <block v-for="item in tabs" :key="item">
    <wd-tab :title="`${item}`" :name="item">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tabs = ref(['这', '是', '一', '个', '例子'])
const tab = ref('例子')
```

```scss
.content {
  line-height: 120px;
  text-align: center;
}
```

## 使用徽标1.4.0

使用`bage-props`设置徽标属性，可以参考[Badge 组件的 props](/component/badge#attributes)。

```html
<wd-tabs v-model="tabWithBadge" @change="handleChange">
  <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="`${item.title}`" :badge-props="item.badgeProps">
    <view class="content">{{ item.title }}徽标</view>
  </wd-tab>
</wd-tabs>
```

```typescript
const tabWithBadge = ref(0)
const tabsWithBadge = ref([
  {
    title: '普通数值',
    badgeProps: {
      modelValue: 10,
      right: '-8px'
    }
  },
  {
    title: '最大值',
    badgeProps: {
      modelValue: 100,
      max: 99,
      right: '-8px'
    }
  },
  {
    title: '点状',
    badgeProps: {
      isDot: true,
      right: '-8px',
      showZero: true
    }
  }
])
```

## 自动调整底部条宽度

设置 `auto-line-width` 属性，自动调整底部条宽度为文本内容宽度。

```html
<wd-tabs v-model="tab" @change="handleChange" auto-line-width>
  <block v-for="item in tabs" :key="item">
    <wd-tab :title="`${item}`" :name="item">
      <view class="content">内容{{ tab }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

```typescript
const tabs = ref(['Wot', 'Design', 'Uni'])
const tab = ref('Design')
```

## 粘性布局

设置 `sticky` 属性，使用粘性布局。可以设置 `offset-top` 属性，当距离窗口顶部多少像素时，固定标签头。在`H5`端使用自定义导航栏时需要参考[sticky 的吸顶距离](/component/sticky.html#吸顶距离)进行配置。

```html
<wd-tabs v-model="tab" sticky>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item}}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 禁用 Tab

在 `wd-tab` 上设置 `disabled` 属性，禁用某个页签。

```html
<wd-tabs v-model="tab">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`" :disabled="item === 1">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 点击事件

监听页签的点击事件.

```html
<wd-tabs v-model="tab" @click="handleClick">
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 手势滑动

设置 `swipeable` 属性，支持手势滑动。

```html
<wd-tabs v-model="tab" swipeable>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 切换动画

设置 `animated` 属性，开启切换标签内容时的过渡动画。

```html
<wd-tabs v-model="tab" animated>
  <block v-for="item in 4" :key="item">
    <wd-tab :title="`标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

## 左对齐超出即可滚动 1.4.0

`slidable`设置为`always`时，所有的标签会向左侧收缩对齐，超出即可滑动。

```html
<wd-tabs v-model="tab" slidable="always">
  <block v-for="item in 5" :key="item">
    <wd-tab :title="`超大标签${item}`">
      <view class="content">内容{{ item }}</view>
    </wd-tab>
  </block>
</wd-tabs>
```

***

标签页在标签数大于等于 6 个时，可以滑动；当标签数大于等于 10 个时，将会显示导航地图，便于快速定位到某个标签。可以通过设置 `slidable-num` 修改可滑动的数量阈值；设置 `map-num` 修改显示导航地图的阈值。`slidable`设置为`always`时，所有的标签会向左侧收缩对齐，超出即可滑动。

## 在弹出框中使用

微信小程序端，在弹出框中使用本组件时，需要调用 `updateLineStyle` 方法更新激活项样式，参见[常见问题](/guide/common-problems.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%8A%E4%BD%BF%E7%94%A8popup%E3%80%81actionsheet%E3%80%81dropdownitem%E7%AD%89%E5%BC%B9%E5%87%BA%E6%A1%86%E7%BB%84%E4%BB%B6%E5%8C%85%E8%A3%B9slider%E3%80%81tabs%E7%AD%89%E7%BB%84%E4%BB%B6%E6%97%B6-slider%E3%80%81tabs%E8%A1%A8%E7%8E%B0%E5%BC%82%E5%B8%B8)。

```html
<wd-button @click="handleClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">在弹出框中使用</view>
  <wd-tabs v-model="tab" ref="tabsRef">
    <wd-tab v-for="item in tabs" :key="item" :title="`${item}`" :name="item">
      <view class="content">内容{{ tab }}</view>
    </wd-tab>
  </wd-tabs>
</wd-popup>
```

```ts
const tab = ref<number>(3)
const tabs = ref(['这', '是', '一', '个', '例子'])

const showPopup = ref(false) // 控制popup显示
const tabsRef = ref<TabsInstance>() // 获取分段器实例
/**
 * 点击按钮打开popup
 */
function handleOpenClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  tabsRef.value?.updateLineStyle(false)
}
```

```css
.title {
  display: flex;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  padding: 24rpx 0;
}
```

## Tabs Attributes

| 参数          | 说明                                                                                     | 类型            | 可选值   | 默认值 | 最低版本 |
| ------------- | ---------------------------------------------------------------------------------------- | --------------- | -------- | ------ | -------- |
| v-model       | 绑定值                                                                                   | string / number | -        | -      | -        |
| slidable-num  | 可滑动的标签数阈值，`slidable`设置为`auto`时生效                                         | number          | -        | 6      | -        |
| map-num       | 显示导航地图的标签数阈值                                                                 | number          | -        | 10     | -        |
| map-title     | 导航地图标题                                                                             | string          | -        | -      | 1.4.0    |
| sticky        | 粘性布局                                                                                 | boolean         | -        | false  | -        |
| offset-top    | 粘性布局时距离窗口顶部距离                                                               | number          | -        | 0      | -        |
| swipeable     | 开启手势滑动                                                                             | boolean         | -        | false  | -        |
| autoLineWidth | 底部条宽度跟随文字，指定`lineWidth`时此选项不生效                                        | boolean         | -        | false  | 1.4.0    |
| lineWidth     | 底部条宽度，单位像素                                                                     | number          | -        | 19     | -        |
| lineHeight    | 底部条高度，单位像素                                                                     | number          | -        | 3      | -        |
| color         | 文字颜色                                                                                 | string          | -        | -      | -        |
| inactiveColor | 非活动标签文字颜色                                                                       | string          | -        | -      | -        |
| animated      | 是否开启切换标签内容时的转场动画                                                         | boolean         | -        | false  | -        |
| duration      | 切换动画过渡时间，单位毫秒                                                               | number          | -        | 300    | -        |
| slidable      | 是否开启滚动导航                                                                         | TabsSlidable    | `always` | `auto` | 1.4.0    |
| badge-props   | 自定义徽标的属性，传入的对象会被透传给 [Badge 组件的 props](/component/badge#attributes) | BadgeProps      | -        | -      | 1.4.0    |

## Tab Attributes

| 参数     | 说明                                                    | 类型    | 可选值 | 默认值 | 最低版本 |
| -------- | ------------------------------------------------------- | ------- | ------ | ------ | -------- |
| name     | 标签页名称                                              | string  | -      | -      | -        |
| title    | 标题                                                    | string  | -      | -      | -        |
| disabled | 禁用                                                    | boolean | -      | false  | -        |
| lazy     | 延迟渲染，默认开启，开启`animated`后此选项始终为`false` | boolean | -      | true   | 1.4.0    |

## Tabs Events

| 事件名称 | 说明                 | 参数                                                            | 最低版本 |
| -------- | -------------------- | --------------------------------------------------------------- | -------- |
| change   | 绑定值变化时触发     | event = { index, name },index 为 tab 下标，name 为 tab 绑定的值 | -        |
| click    | 点击标题时触发       | event = { index, name },index 为 tab 下标，name 为 tab 绑定的值 | -        |
| disabled | 点击禁用的标题时触发 | event = { index, name },index 为 tab 下标，name 为 tab 绑定的值 | -        |

## Methods

对外暴露函数

| 事件名称        | 说明                                                                                                | 参数                                                                   | 最低版本 |
| --------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------- |
| setActive       | 设置激活项，参数分别为：`value` 激活值，`init` 是否已初始化 ，`setScroll` 是否设置 scroll-view 滚动 | `(value: number \| string, init: boolean, setScroll: boolean) => void` | -        |
| scrollIntoView  | 使选中项滚动到可视区域                                                                              | -                                                                      | -        |
| updateLineStyle | 更新激活项边框线样式，参数`animation`用于是否开启动画，默认开启                                     | `(animation: boolean) => void`                                         | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
