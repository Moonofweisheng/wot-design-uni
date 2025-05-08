---
url: 'https://wot-design-uni.cn/component/navbar.md'
---
# Navbar 导航栏

为页面提供导航功能，常用于页面顶部。

::: tip 常见问题

**右图标被小程序胶囊挡住？**

在小程序平台开启自定义顶部导航时，右上角会固定显示胶囊，所以此时右侧插槽及选项是不建议使用。

**如何设置为背景透明？**

通过 `custom-style` 设置组件 `background-color` 为 `transparent`。

```html
<wd-navbar title="标题" custom-style="background-color: transparent !important;"></wd-navbar>
```

**组件会被 `video` 覆盖？**

`video`为原生组件，层级较高，目前无法遮盖，需要具体平台具体分析。
:::

## 基础用法

通过 `title` 属性设置导航栏标题。

```html
<wd-navbar title="标题"></wd-navbar>
```

## 返回上级

在导航栏实现返回上级功能。

```html
<wd-navbar title="标题" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
```

```ts
function handleClickLeft() {
  uni.navigateBack()
}
```

## 右侧按钮

在导航栏右侧添加可点击的按钮。

```html
<wd-toast></wd-toast>

<wd-navbar title="标题" left-text="返回" left-arrow right-text="按钮" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'

const { show: showToast } = useToast()


function handleClickRight() {
  showToast('按钮')
}
```

## 使用插槽

可以通过 `left` 和 `right` 插槽自定义导航栏两侧的内容。

```html
<wd-navbar title="标题" left-text="返回" left-arrow>
  <template #right>
    <wd-icon name="search" size="18" />
  </template>
</wd-navbar>
```

## 固定在顶部

通过 `fixed` 可以设置导航条固定在页面顶部，通过设置 `placeholder` 可以在顶部生成占位空间，通过设置 `safeAreaInsetTop` 可以开启顶部安全区的适配。

```html
<wd-navbar fixed placeholder title="Navbar 导航条" left-arrow safeAreaInsetTop></wd-navbar>

```

## 禁用按钮

通过 `left-disabled` 或 `right-disabled` 属性来禁用两侧的按钮。按钮被禁用时透明度降低，且无法点击。

```html
<wd-navbar title="标题" left-text="返回" right-text="按钮" left-arrow left-disabled right-disabled></wd-navbar>
```

## 胶囊样式

通过 `capsule` 插槽和 `navbar-capsule` 组件定制返回胶囊。

```html
<wd-navbar title="标题" left-text="返回" right-text="设置" left-arrow>
  <template #capsule>
    <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
  </template>
</wd-navbar>
```

```ts
function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
```

## 带搜索栏

通过 `title` 插槽，自定义标题。

```html
<wd-navbar left-text="返回" right-text="设置" left-arrow>
  <template #title>
    <view class="search-box">
      <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
    </view>
  </template>
</wd-navbar>
```

```scss
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
```

## Navbar Attributes

| 参数          | 说明     | 类型    | 可选值 | 默认值 | 最低版本 |
| ------------- | -------- | ------- | ------ | ------ | -------- |
| title         | 卡片标题 | string  | -      | ''     | 0.1.33   |
| leftText      | 左侧文案 | string  | -      | ''     | 0.1.33   |
| rightText     | 右侧文案 | string  | -      | ''     | 0.1.33   |
| leftArrow     | 显示左侧箭头 | boolean | true, false | false | 0.1.33   |
| bordered      | 显示下边框 | boolean | true, false | true  | 0.1.33   |
| fixed         | 固定到顶部 | boolean | true, false | false | 0.1.33   |
| placeholder   | 固定在顶部时，在标签位置生成一个等高的占位元素 | boolean | true, false | false | 0.1.33   |
| zIndex        | 导航栏 z-index | number | -      | 1      | 0.1.33   |
| safeAreaInsetTop | 开启顶部安全区适配 | boolean | true, false | false | 0.1.33   |
| leftDisabled  | 禁用左侧按钮，禁用时透明度降低，且无法点击 | boolean | true, false | false | 0.1.33   |
| rightDisabled | 禁用右侧按钮，禁用时透明度降低，且无法点击 | boolean | true, false | false | 0.1.33   |

## Navbar Events

| 事件名称     | 说明                          | 参数                                           | 最低版本 |
| ------------ | ----------------------------- | ---------------------------------------------- | --------- |
| click-left   | 点击左侧按钮时触发            | -                                              | 0.1.33    |
| click-right  | 点击右侧按钮时触发            | -                                              | 0.1.33    |

## NavbarCapsule Events

| 事件名称     | 说明                          | 参数                                           | 最低版本 |
| ------------ | ----------------------------- | ---------------------------------------------- | --------- |
| back         | 点击返回按钮时触发             | -                                              | 0.1.33    |
| back-home    | 点击返回首页按钮时触发          | -                                              | 0.1.33    |

## Navbar Slot

| 名称    | 说明     | 最低版本 |
| ------- | -------- | -------- |
| capsule | 自定义胶囊（当存在胶囊时，left不生效）   | 0.1.33         |
| left    | 左侧内容                                | 0.1.33         |
| title   | 标题内容                                | 0.1.33         |
| right   | 右侧内容                                | 0.1.33         |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式类 | 0.1.33 |
| custom-style | 根节点样式 | 0.1.33 |
