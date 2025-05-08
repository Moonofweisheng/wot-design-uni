---
url: 'https://wot-design-uni.cn/component/fab.md'
---
# Fab 悬浮按钮

悬浮动作按钮组件，按下可显示一组动作按钮。

:::warning
因为`uni-app`组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 `fab` ，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），在页面的根元素上监听点击事件的冒泡。

如果存在用户手动点击 `fab` 以外某个地方如按钮滑出 `fab` 的场景，则需要在点击的元素（在这里是按钮）加上 `click.stop=""` 阻止事件冒泡到根元素上，避免触发 `closeOutside`把要手动打开的 `fab` 关闭了。
:::

## 基本用法

通过`type`设置悬浮按钮触发器的类型，`position`设置悬浮按钮触发器的位置，`direction`设置动作按钮的打开方向，`disabled`设置悬浮按钮是否禁用。

```html
<wd-fab :disabled="disabled" :type="type" :position="position" :direction="direction">
  <wd-button @click="showToast('一键三连')" :disabled="disabled" custom-class="custom-button" type="primary" round>
    <wd-icon name="github-filled" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要收藏')" :disabled="disabled" custom-class="custom-button" type="success" round>
    <wd-icon name="star" size="22px"></wd-icon>
  </wd-button>

  <wd-button @click="showToast('我要投币')" :disabled="disabled" custom-class="custom-button" type="error" round>
    <wd-icon name="money-circle" size="22px"></wd-icon>
  </wd-button>
  <wd-button @click="showToast('我要点赞')" :disabled="disabled" custom-class="custom-button" type="warning" round>
    <wd-icon name="thumb-up" size="22px"></wd-icon>
  </wd-button>
</wd-fab>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'
const { show: showToast } = useToast()
const type = ref<'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'>('primary')
const position = ref<'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'left-center'
  | 'right-center'
  | 'top-center'
  | 'bottom-center'>('left-bottom')
const direction = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const disabled = ref<boolean>(false)
```

```scss
:deep(.custom-button) {
  min-width: auto !important;
  box-sizing: border-box;
  width: 32px !important;
  height: 32px !important;
  border-radius: 16px !important;
  margin: 8rpx;
}

:deep(.custom-radio) {
  height: 32px !important;
  line-height: 32px !important;
}
```

## 动作菜单展开/收起

通过`v-model:active`控制动作按钮菜单的展开/收起

```html
<wd-fab v-model:active="active"></wd-fab>
```

```ts
const active = ref<boolean>(false)
```

## 可拖动按钮

```html
<wd-fab :draggable="true"></wd-fab>
```

:::warning
开启拖动后`direction`属性将失效，会根据拖动后的位置自动计算弹出方向。拖动完成后按钮将会自动吸边。
:::

## 自定义触发器

通过`trigger`插槽自定义触发器，`expandable`控制点击触发器是否展开/收起动作按钮菜单。

```html
<wd-fab position="left-bottom" :expandable="false">
  <template #trigger>
    <wd-button @click="handleClick" icon="share" type="error">分享给朋友</wd-button>
  </template>
</wd-fab>
```

```ts
const handleClick = () => {
  console.log('点击了')
}

```

## Attributes

| 参数           | 说明                                                  | 类型         | 可选值                                                                                                                                       | 默认值                                         | 最低版本         |
| -------------- | ----------------------------------------------------- | ------------ |-------------------------------------------------------------------------------------------------------------------------------------------| ---------------------------------------------- | ---------------- |
| v-model:active | 是否激活                                              | boolean      | -                                                                                                                                         | false                                          | 0.1.57           |
| type           | 类型                                                  | FabType      | 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'                                                 | 'primary'                                      | 0.1.57           |
| position       | 悬浮按钮位置                                          | FabPosition  | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | left-center | right-center | top-center | bottom-center | 'right-bottom'                                 | 0.1.57           |
| draggable      | 按钮能否拖动                                          | boolean      |                                                                                                                                           | false                                          | 1.2.19           |
| direction      | 悬浮按钮菜单弹出方向                                  | FabDirection | 'top' | 'right' | 'bottom' | 'left'                                                                                        | 'top'                                          | 0.1.57           |
| disabled       | 是否禁用                                              | boolean      | -                                                                                                                                         | false                                          | 0.1.57           |
| inactiveIcon   | 悬浮按钮未展开时的图标                                | string       | -                                                                                                                                         | 'add'                                          | 0.1.57           |
| activeIcon     | 悬浮按钮展开时的图标                                  | string       | -                                                                                                                                         | 'close'                                        | 0.1.57           |
| zIndex         | 自定义悬浮按钮层级                                    | number       | -                                                                                                                                         | 99                                             | 0.1.57           |
| gap            | 自定义悬浮按钮与可视区域边缘的间距                    | FabGap       | -                                                                                                                                         | { top: 16, left: 16, right: 16, bottom: 16 } | 1.2.26           |
| customStyle    | 自定义样式                                            | string       | -                                                                                                                                         | ''                                             | 0.1.57           |
| expandable     | 用于控制点击时是否展开菜单，设置为 false 时触发 click | boolean      | -                                                                                                                                         | true                                           | 1.3.11 |

## Events

| 事件名称 | 说明                                         | 参数 | 最低版本         |
| -------- | -------------------------------------------- | ---- | ---------------- |
| click    | expandable 设置为 false 时，点击悬浮按钮触发 | —    | 1.3.11 |

## Slot

| name    | 说明                                                           | 最低版本         |
| ------- | -------------------------------------------------------------- | ---------------- |
| trigger | 触发器插槽，用于自定义点击按钮，使用此插槽时组件不会抛出 click | 1.3.11 |

## 外部样式类

| 类名         | 说明         | 最低版本 |
| ------------ | ------------ | -------- |
| custom-class | 自定义样式类 | 0.1.57   |
