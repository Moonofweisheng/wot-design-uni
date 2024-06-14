<frame/>

# Fab 悬浮按钮

悬浮动作按钮组件，按下可显示一组动作按钮。

因为`uni-app`组件无法监听点击自己以外的地方，为了在点击页面其他地方时，可以自动关闭 `fab` ，建议使用组件库的 `useQueue` hook（会关闭所有 dropmenu、popover、toast、swipeAction、fab），在页面的根元素上监听点击事件的冒泡。

:::warning
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
const position = ref<'left-top' | 'right-top' | 'left-bottom' | 'right-bottom'>('left-bottom')
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
<wd-fab v-model:active="active">
```

```ts
const active = ref<boolean>(false)

```

## 可拖动按钮

```html
<wd-fab :draggable="true">
```

:::warning
开启拖动后`direction`属性将失效，会根据拖动后的位置自动计算弹出方向。拖动完成后按钮将会自动吸边。
:::

## Attributes

| 参数           | 说明                               | 类型         | 可选值                                                                                    | 默认值                                         | 最低版本         |
| -------------- | ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------- |
| v-model:active | 是否激活                           | boolean      | -                                                                                         | false                                          | 0.1.57           |
| type           | 类型                               | FabType      | 'primary' &#124; 'success' &#124; 'info' &#124; 'warning' &#124; 'error' &#124; 'default' | 'primary'                                      | 0.1.57           |
| position       | 悬浮按钮位置                       | FabPosition  | 'left-top' &#124; 'right-top' &#124; 'left-bottom' &#124; 'right-bottom'                  | 'right-bottom'                                 | 0.1.57           |
| draggable      | 按钮能否拖动                       | boolean      |                                                                                           | false                                          | 1.2.19           |
| direction      | 悬浮按钮菜单弹出方向               | FabDirection | 'top' &#124; 'right' &#124; 'bottom' &#124; 'left'                                        | 'top'                                          | 0.1.57           |
| disabled       | 是否禁用                           | boolean      | -                                                                                         | false                                          | 0.1.57           |
| inactiveIcon   | 悬浮按钮未展开时的图标             | string       | -                                                                                         | 'add'                                          | 0.1.57           |
| activeIcon     | 悬浮按钮展开时的图标               | string       | -                                                                                         | 'close'                                        | 0.1.57           |
| zIndex         | 自定义悬浮按钮层级                 | number       | -                                                                                         | 99                                             | 0.1.57           |
| gap            | 自定义悬浮按钮与可视区域边缘的间距 | FabGap       | -                                                                                         | \{ top: 16, left: 16, right: 16, bottom: 16 \} | 1.2.26 |
| customStyle    | 自定义样式                         | string       | -                                                                                         | ''                                             | 0.1.57           |

## 外部样式类

| 类名         | 说明         | 最低版本 |
| ------------ | ------------ | -------- |
| custom-class | 自定义样式类 | 0.1.57   |
