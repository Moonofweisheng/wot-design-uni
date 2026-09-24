---
version: $LOWEST_VERSION$
---

# PuzzleCaptcha 拼图验证

拼图验证组件，用于人机验证场景。

## 基础用法

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  @success="onSuccess()"
  @fail="onFail()"
></wd-puzzle-captcha>
```

```ts
function onSuccess() {
  console.log('verify success')
}

function onFail() {
  console.log('verify fail')
}
```

## 更新背景图片

当失败超过 `retry-count` 重试次数，或者启用 `refreshable` 属性用户点击刷新按钮，会触发 `update-image` 事件用于更新背景图片。

监听 `update-image` 事件，在事件回调中更新 `image-url`，可以使用 `loading` 控制加载状态。

```html
<wd-puzzle-captcha
  :image-url="state.image"
  :loading="state.loading"
  refreshable
  @success="onSuccess()"
  @update-image="onUpdateImage()"
></wd-puzzle-captcha>
```

```ts
const state = reactive({
  image: `https://picsum.photos/320/200?t=${Date.now()}`,
  loading: false
})

function onUpdateImage() {
  state.loading = true

  // 模拟接口请求
  setTimeout(() => {
    state.image = `https://picsum.photos/320/200?t=${Date.now()}`
    state.loading = false
  }, 500)
}
```

## 拼图形状

默认拼图形状为 puzzle，可选值如下：

- puzzle 拼图块
- shield 盾牌
- rect 矩形
- triangle 三角形

可以配合 `puzzle-width` 和 `puzzle-height` 设置拼图的宽度和高度。

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  puzzle-shape="shield"
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## 干扰模式

启用 `decoy-mode` 会生成额外的 1 个干扰缺口。

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  decoy-mode
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## 严格模式

默认仅校验拼图最终位置，启用 `strict-mode` 将会校验滑动轨迹。

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  strict-mode
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## 禁用状态

通过 `disabled` 属性禁用滑块拖动。

```html
<wd-puzzle-captcha
  image-url="https://picsum.photos/320/200"
  disabled
  @success="onSuccess()"
></wd-puzzle-captcha>
```

## 重置方法

使用 `ref` 获取组件实例，调用 `reset(update?: boolean)` 方法重置验证状态。

`update` 为可选参数，如果为 `true` 则会触发 `update-image` 事件。

```html
<wd-puzzle-captcha
  ref="captchaEl"
  image-url="https://picsum.photos/320/200"
  @success="onSuccess()"
></wd-puzzle-captcha>
```

```ts
// uni_modules
import type { PuzzleCaptchaInstance } from "@/uni_modules/wot-design-uni/components/wd-puzzle-captcha/types"
// npm
// import type { PuzzleCaptchaInstance } from "wot-design-uni/components/wd-puzzle-captcha/types"

const captchaEl = ref<PuzzleCaptchaInstance>()

function reset() {
  captchaEl.value?.reset()
}
```

## 弹窗用法

在弹窗中使用时，可以开启 `closable` 属性并监听 `close` 事件用于关闭弹窗。

::: warning 提示

由于组件内部使用 canvas 绘制拼图，在小程序端受弹窗动画的 `transform` 影响，会导致 canvas 尺寸异常而绘制失败，所以需要延迟到弹窗动画结束后再挂载验证组件。

:::

```html
<wd-popup
  v-model="state.visible"
  custom-style="border-radius: 32rpx"
  @after-enter="state.render = true"
  @after-leave="state.render = false"
>
  <wd-puzzle-captcha
    v-if="state.render"
    image-url="https://picsum.photos/320/200"
    closable
    @success="onSuccess()"
    @close="state.visible = false"
  ></wd-puzzle-captcha>
</wd-popup>

<wd-button @click="state.visible = true">验证</wd-button>
```

```ts
const state = reactive({
  visible: false,
  render: false
})
```

## Attributes

| 参数            | 说明                     | 类型              | 可选值                               | 默认值                   | 最低版本             |
|---------------|------------------------|-----------------|-----------------------------------|-----------------------|------------------|
| title         | 标题                     | string          | -                                 | 安全验证                  | $LOWEST_VERSION$ |
| placeholder   | 操作提示                   | string          | -                                 | 拖动下方滑块完成拼图            | $LOWEST_VERSION$ |
| image-url     | 背景图片（必传）               | string          | -                                 | -                     | $LOWEST_VERSION$ |
| image-width   | 背景图片宽度（单位：px）          | number / string | -                                 | 320                   | $LOWEST_VERSION$ |
| image-height  | 背景图片高度（单位：px）          | number / string | -                                 | 200                   | $LOWEST_VERSION$ |
| puzzle-shape  | 拼图形状                   | string          | puzzle / shield / rect / triangle | puzzle                | $LOWEST_VERSION$ |
| puzzle-width  | 拼图宽度（单位：px）            | number / string | -                                 | 40                    | $LOWEST_VERSION$ |
| puzzle-height | 拼图高度（单位：px）            | number / string | -                                 | 40                    | $LOWEST_VERSION$ |
| loading       | 是否为加载状态                | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| tolerance     | 容错范围（单位：px）            | number / string | -                                 | 6                     | $LOWEST_VERSION$ |
| strict-mode   | 是否启用严格模式               | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| decoy-mode    | 是否启用干扰缺口               | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| retry-count   | 重试次数，超过重试次数后将会触发背景图片更新 | number / string | -                                 | 3                     | $LOWEST_VERSION$ |
| disabled      | 是否禁用                   | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| refreshable   | 是否显示刷新按钮               | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| closable      | 是否显示关闭按钮               | boolean         | -                                 | false                 | $LOWEST_VERSION$ |
| tracker-icon  | 滑块图标                   | string          | -                                 | a-chevron-rightdouble | $LOWEST_VERSION$ |
| success-icon  | 成功图标                   | string          | -                                 | check                 | $LOWEST_VERSION$ |
| success-text  | 验证成功提示                 | string          | -                                 | 验证成功                  | $LOWEST_VERSION$ |
| fail-text     | 验证失败提示                 | string          | -                                 | 验证失败，请重试              | $LOWEST_VERSION$ |

## Events

| 事件名称         | 说明     | 参数 | 最低版本             |
|--------------|--------|----|------------------|
| update-image | 更新背景图片 | -  | $LOWEST_VERSION$ |
| success      | 验证成功   | -  | $LOWEST_VERSION$ |
| fail         | 验证失败   | -  | $LOWEST_VERSION$ |
| close        | 点击关闭按钮 | -  | $LOWEST_VERSION$ |

## Methods

| 方法名   | 说明                                                   | 参数                           | 最低版本             |
|-------|------------------------------------------------------|------------------------------|------------------|
| reset | 重置验证组件到初始状态（`update` 为 `true` 会触发 `update-image` 事件） | `(update?: boolean) => void` | $LOWEST_VERSION$ |

## 外部样式类

| 类名           | 说明    | 最低版本             |
|--------------|-------|------------------|
| custom-class | 根节点样式 | $LOWEST_VERSION$ |
