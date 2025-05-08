---
url: 'https://wot-design-uni.cn/component/segmented.md'
---
# Segmented 分段器 0.1.23

分段器用于展示多个选项并允许用户选择其中单个选项。

## 何时使用

* 用于展示多个选项并允许用户选择其中单个选项；
* 当切换选中选项时，关联区域的内容会发生变化。

## 基本用法

通过 `options` 属性设置选项列表，通过 `v-model:value` 绑定当前选中项。

```vue
<wd-segmented :options="list" v-model:value="current"></wd-segmented>
```

```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])

const current = ref('点赞')
```

## 大型分段器

通过设置 `size` 属性为 `"large"`，创建一个大型分段器。

```html
<wd-segmented :options="list" v-model:value="current" size="large"></wd-segmented>
```

## 小型分段器

通过设置 `size` 属性为 `"small"`，创建一个小型分段器。

```html
<wd-segmented :options="list" v-model:value="current" size="small"></wd-segmented>
```

## 带振动效果的分段器

通过设置 `vibrate-short` 属性为 `true`，使手机在切换选项时产生短暂振动。

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true"></wd-segmented>
```

## 禁用分段器

通过设置 `disabled` 属性为 `true`，禁用分段器。

```html
<wd-segmented :options="list" v-model:value="current" disabled></wd-segmented>
```

## 自定义渲染分段器标签

使用插槽 `label` 可以自定义渲染分段器的标签内容。

```html
<wd-segmented :options="list" v-model:value="current" :vibrate-short="true">
  <template #label="{ option }">
    <view class="section-slot">
      <image style="border-radius: 50%; width: 32px; height: 32px" :src="option.payload.avatar" />
      <view class="name">{{ option.value }}</view>
    </view>
  </template>
</wd-segmented>
```

```ts
const list = ref([
  {
    value: '李雷',
    disabled: false,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg'
    }
  },
  {
    value: '韩梅梅',
    disabled: false,
    payload: {
      avatar: 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg'
    }
  }
])
```

```scss
.section {
  width: 100%;
  padding: 0 24rpx;
  box-sizing: border-box;
  &-slot {
    padding: 4px;
  }
}
```

## 在弹出框中使用

微信小程序端，在弹出框中使用本组件时，需要调用 `updateActiveStyle` 方法更新分段器样式，参见[常见问题](/guide/common-problems.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%8A%E4%BD%BF%E7%94%A8popup%E3%80%81actionsheet%E3%80%81dropdownitem%E7%AD%89%E5%BC%B9%E5%87%BA%E6%A1%86%E7%BB%84%E4%BB%B6%E5%8C%85%E8%A3%B9slider%E3%80%81tabs%E7%AD%89%E7%BB%84%E4%BB%B6%E6%97%B6-slider%E3%80%81tabs%E8%A1%A8%E7%8E%B0%E5%BC%82%E5%B8%B8)。

```html
<wd-button @click="handleClick">打开弹窗</wd-button>
<wd-popup v-model="showPopup" position="bottom" @after-enter="handlePopupShow" closable custom-style="height: 200px;padding: 0 24rpx;">
  <view class="title">在弹出框中使用</view>
  <wd-segmented :options="list" v-model:value="current" ref="segmentedRef"></wd-segmented>
</wd-popup>
```

```ts
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])
const current = ref('点赞')

const segmentedRef = ref<SegmentedInstance>() // 获取分段器实例
const showPopup = ref(false) // 控制popup显示
/**
 * 点击按钮打开popup
 */
function handleClick() {
  showPopup.value = true
}
/**
 * popup打开后更新分段器样式
 */
function handlePopupShow() {
  segmentedRef.value?.updateActiveStyle()
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

## Attributes

| 参数                | 说明               | 类型                                        | 可选值                         | 默认值   | 最低版本 |
| ------------------- | ------------------ | ------------------------------------------- | ------------------------------ | -------- | -------- |
| value/v-model:value | 当前选中的值       | string / number                            | -                              | -        | 0.1.23   |
| disabled            | 是否禁用分段器     | boolean                                     | true / false                  | `false`  | 0.1.23   |
| size                | 控件尺寸           | string                                      | `large` / `middle` / `small` | `middle` | 0.1.23   |
| options             | 数据集合           | `string[] / number[] / SegmentedOption[]` | -                              | \[]       | 0.1.23   |
| vibrateShort        | 切换选项时是否振动 | boolean                                     | true / false                  | `false`  | 0.1.23   |

### SegmentedOption

| 参数     | 说明     | 类型             | 可选值        | 默认值 | 最低版本 |
| -------- | -------- | ---------------- | ------------- | ------ | -------- |
| value    | 选中值   | string / number | -             | -      | 0.1.23   |
| disabled | 是否禁用 | boolean          | true / false | -      | 0.1.23   |
| payload  | 更多数据 | any              | -             | -      | 0.1.23   |

## Events

| 事件名称 | 说明           | 参数              | 最低版本 |
| -------- | -------------- | ----------------- | -------- |
| change   | 选项切换时触发 | `SegmentedOption` | 0.1.23   |
| click    | 选项点击时触发 | `SegmentedOption` | 1.2.20   |

## Methods

对外暴露函数

| 事件名称          | 说明                                                      | 参数                           | 最低版本 |
| ----------------- | --------------------------------------------------------- | ------------------------------ | -------- |
| updateActiveStyle | 更新滑块偏移量，参数`animation`用于是否开启动画，默认开启 | `(animation: boolean) => void` | -        |

## Slots

| name  | 说明         | 参数                          | 最低版本 |
| ----- | ------------ | ----------------------------- | -------- |
| label | 选项标签内容 | `{ option: SegmentedOption }` | 0.1.23   |

## 外部样式类

| 类名        | 说明         | 最低版本 |
| ----------- | ------------ | -------- |
| customStyle | 自定义样式   | 0.1.23   |
| customClass | 自定义样式类 | 0.1.23   |
