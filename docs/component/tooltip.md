<frame/>

# Tooltip 文字提示

常用于展示提示信息。

## 基本用法

在这里我们提供 12 种不同方向的展示方式，可以通过以下完整示例来理解。

可以通过`v-model` 控制手动是否展示文字提示。

使用`content`属性来决定显示时的提示信息。

由`placement`属性决定展示效果：

- `placement`属性值为：`方向-对齐位置`；
- 四个方向：`top`、`left`、`right`、`bottom`；
- 三种对齐位置：`start`、''(默认空为居中)、 `end`；

如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

因为`uni-app`组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 `tooltip` ，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），在页面的根元素上监听点击事件的冒泡。

:::warning
如果存在用户手动点击 `tooltip` 以外某个地方如按钮滑出 `tooltip` 的场景，则需要在点击的元素（在这里上按钮）加上 click 阻止事件冒泡到根元素上，避免触发 `closeOutside`把要手动打开的 `tooltip` 关闭了。
:::

```html
<view @click="closeOutside">
  <wd-tooltip @change="handleChange" placement="top" content="top 提示文字">
    <wd-button>top</wd-button>
  </wd-tooltip>
</view>
```

```typescript
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()

const show = ref<boolean>(false)

```

## 更多 Content

展示多行文本或者是设置文本内容的格式

用具名 slot 分发`content`，替代 `tooltip` 中的 `content` 属性。

使用插槽时，请使用 `useContentSlot` 属性，确定 `content` 插槽开启。

:::warning 注意
目前使用`content`插槽时，组件内部无法正确获取气泡的宽高，此时设置偏移的`placement`无法生效，例如`bottom-end`。
:::

```html
<wd-tooltip placement="right" useContentSlot>
  <wd-button>多行文本</wd-button>
  <template #content>
    <view style="color: red; padding: 5px; width: 90px">
      <view>多行文本1</view>
      <view>多行文本2</view>
      <view>多行文本3</view>
    </view>
  </template>
</wd-tooltip>
```

```typescript
import { useQueue } from '@/uni_modules/wot-design-uni'

const { closeOutside } = useQueue()
const show = ref<boolean>(false)
```

## 显示关闭按钮

Tooltip 组件通过属性`show-close` 控制是否显示关闭按钮。

```html
<wd-tooltip content="显示关闭按钮" show-close>
  <wd-button>显示关闭按钮</wd-button>
</wd-tooltip>
```

## 控制显隐
通过绑定`v-model`控制 `tooltip` 的显隐。

```html
<wd-button plain @click="control" size="small" class="button-control">
  {{ show ? '关闭' : '打开' }}
</wd-button>

<wd-tooltip placement="top" content="控制显隐" v-model="show">
  <wd-button :round="false">top</wd-button>
</wd-tooltip>

```

```ts
import { ref } from 'vue'

const show = ref<boolean>(false)

const control = () => {
  show.value = !show.value
}
```



## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。

```html
<wd-tooltip placement="right-end" content="禁用" disabled>
  <wd-button>禁用</wd-button>
</wd-tooltip>
```

## 控制位置

**注意：由于小程序无法动态插入节点，因此文字气泡位置会根据传入定位的节点最外层位置对齐，如果文字提示位置不在您想要渲染的位置上，可以通过控制组件整体位置达到想要的效果。**
错误用法示例：

```html
<wd-tooltip placement="top" content="top 提示文字">
  <wd-button custom-style="margin-left: 100px">top</wd-button>
</wd-tooltip>
<wd-tooltip placement="top" content="top 提示文字">
  <wd-button custom-style="position: absolute; left: 100px;">top</wd-button>
</wd-tooltip>
```

正确用法：

```html
<wd-tooltip placement="top" content="top 提示文字" custom-style="margin-left: 100px">
  <wd-button>top</wd-button>
</wd-tooltip>
<wd-tooltip placement="top" content="top 提示文字" custom-style="position: absolute; left: 100px;">
  <wd-button>top</wd-button>
</wd-tooltip>
```

## Tooltip Attributes

| 参数          | 说明                                       | 类型           | 可选值                                                                                                                          | 默认值 | 最低版本 |
| ------------- | ------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| show          | 状态是否可见                               | boolean        | -                                                                                                                               | false  | -        |
| content       | 显示的内容，也可以通过 `slot#content` 传入 | string / array | -                                                                                                                               | -      | -        |
| placement     | Tooltip 的出现位置                         | string         | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom | -        |
| disabled      | Tooltip 是否可用                           | boolean        | -                                                                                                                               | false  | -        |
| visible-arrow | 是否显示 Tooltip 箭头                      | boolean        | -                                                                                                                               | true   | -        |
| offset        | 出现位置的偏移量                           | number         | -                                                                                                                               | 0      | -        |
| show-close    | 是否显示 Tooltip 内部的关闭按钮            | boolean        | -                                                                                                                               | false  | -        |

## Events

| 事件名称    | 说明             | 回调参数 | 最低版本 |
| ----------- | ---------------- | -------- | -------- |
| open   | 显示时触发       | -        | -        |
| close  | 隐藏时触发       | -        | -        |
| change | 显隐值变化时触发 | -        | -        |

## Methods

| 方法名称 | 说明             | 参数 | 最低版本 |
| -------- | ---------------- | ---- | -------- |
| open     | 打开文字提示弹框 | -    | -        |
| close    | 关闭文字提示弹框 | -    | -        |

## Slot

| name    | 说明                     | 最低版本 |
| ------- | ------------------------ | -------- |
| content | 多行内容或用户自定义样式 | -        |

## Tooltip 外部样式类

| 类名         | 说明         | 最低版本 |
| ------------ | ------------ | -------- |
| custom-class | 根节点样式   | -        |
| custom-arrow | 尖角样式     | -        |
| custom-pop   | 文字提示样式 | -        |
