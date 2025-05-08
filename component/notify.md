---
url: 'https://wot-design-uni.cn/component/notify.md'
---
# Notify 消息通知

通知类组件，用于在页面顶部展示通知信息。

## 基本用法

需要在页面中引入该组件，作为挂载点。

```html
<wd-notify />
```

```ts
import { useNotify } from '@/uni_modules/wot-design-uni'

const { showNotify, closeNotify } = useNotify()

// 3 秒后自动关闭
showNotify('通知内容')

// 主动关闭
closeNotify()
```

## 通知类型

支持 `primary`、`success`、`warning`、`danger` 四种通知类型，默认为 `danger`。

```ts
// 主要通知
showNotify({ type: 'primary', message: '通知内容' })

// 成功通知
showNotify({ type: 'success', message: '通知内容' })

// 危险通知
showNotify({ type: 'danger', message: '通知内容' })

// 警告通知
showNotify({ type: 'warning', message: '通知内容' })
```

## 自定义通知

```ts
showNotify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
})

showNotify({
  message: '自定义位置',
  position: 'bottom'
})

showNotify({
  message: '自定义时长',
  duration: 1000
})
```

## 使用 Notify 组件

如果需要在 Notify 内嵌入组件或其他自定义内容，可以直接使用 Notify 组件，并使用默认插槽进行定制。

```html
<wd-button type="primary" @click="showNotify">使用 Notify 组件调用</wd-button>
<wd-notify type="success" :safe-height="safeHeight" v-model:visible="visible">
  <wd-icon name="check-outline" size="inherit" color="inherit" />
  成功通知
</wd-notify>
```

```ts
import { ref, onMounted } from 'vue'

let timer: ReturnType<typeof setTimeout>
export default {
  setup() {
    const visible = ref(false)
    const safeHeight = ref(0)

    const showNotify = () => {
      visible.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        visible.value = false
      }, 3000)
    }

    onMounted(() => {
      // #ifdef H5
      safeHeight.value = 44
      // #endif
    })

    return {
      visible,
      showNotify,
      safeHeight
    }
  }
}
```

## 进阶`demo`

```vue
// App.vue
<script setup lang="ts">
  import { onLaunch } from '@dcloudio/uni-app'
  import { setNotifyDefaultOptions } from '@/uni_modules/wot-design-uni'

  onLaunch(() => {
    setNotifyDefaultOptions({
      // #ifdef H5
      safeHeight: 44,
      // #endif
      onClick: (event) => console.log('onClick', event),
      onClosed: () => console.log('onClosed'),
      onOpened: () => console.log('onOpened')
    })
    // 隐藏原生tabBar
    uni.hideTabBar()
  })
</script>

<style lang="scss">
  :root, page {
    // 品牌色
    --wot-color-theme: #1989fa;

    // 模块标题/重要正文
    --wot-color-title: #323233;
    // // 副标题
    // --color-content: #969799;
    // // 次内容
    // --nut-text-color: #c8c9cc;
  }
</style>
```

```vue
// /components/layout/layout.vue
<template>
  <wd-config-provider>
    <slot />
    <TabBar />
    <wd-notify />
  </wd-config-provider>
</template>

<script lang="ts">
  export default {
    // #ifdef H5
    name: 'Layout',
    // #endif
    options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' }
  }
</script>

<script setup lang="ts">
  import TabBar from './components/tabbar.vue'
</script>
```

```vue
// /pages/user.vue
<template>
  <layout>
    <view>User</view>
    <wd-button type="primary" @click="showNotify('消息通知')">消息通知</wd-button>
  </layout>
</template>

<script lang="ts">
  export default {
    // #ifdef H5
    name: 'User',
    // #endif
    options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' }
  }
</script>

<script setup lang="ts">
  import { useNotify } from '@/uni_modules/wot-design-uni'

  const { showNotify } = useNotify()
</script>
```

## Attributes

| 参数         | 说明                                                             | 类型    | 可选值                    | 默认值       | 最低版本 |
| ------------ | ----------------------------------------------------------------| ------- | ------------------------- | ------------ | -------- |
| type         | 类型                                                             | NotifyType | `primary` `success` `warning` `danger` | `danger` | -        |
| message      | 展示文案，支持通过`\n`换行                                          | string | -                         | -            | -        |
| duration     | 展示时长(ms)，值为 0 时，notify 不会消失                             | number | -                         | `3000`            | -        |
| zIndex     | 层级                                                               | number | -                          | `99`            | -        |
| position   | 弹出位置                                                            | NotifyPosition | `top` `bottom`     | `top`            | -        |
| color     | 字体颜色                                                             | string | -     | -            | -        |
| background   | 背景颜色                                                          | string | -     | -            | -        |
| safeHeight   | 顶部安全高度                                                       | number / string | -     | -            | -        |
| selector   | 指定唯一标识                                                       | number | -     | -            | -        |

## Events

| 事件名 | 说明                                      | 参数    | 最低版本 |
| -------- | ----------------------------------------- | ------- | -------- |
| click  | 点击时的回调函数                                  | (event: MouseEvent) => void | -        |
| closed    | 关闭时的回调函数                                  | () => void | -        |
| opened     | 展示后的回调函数                                 | () => void | -        |

## Methods

| 方法名称 | 说明                                      | 参数    | 最低版本 |
| -------- | ----------------------------------------- | ------- | -------- |
| showNotify  | 展示提示                                  | `NotifyOptions` / `string` | -        |
| closeNotify    | 关闭提示                                  | - | -        |
| setNotifyDefaultOptions     | 修改默认配置，影响所有的 `showNotify` 调用                                  | `NotifyOptions` | -        |
| resetNotifyDefaultOptions  | 重置默认配置，影响所有的 `showNotify` 调用                                  | - | -        |

## Options

调用 `showNotify`、 `setNotifyDefaultOptions` 等方法时，支持传入以下选项：
| 参数         | 说明                                                             | 类型    | 可选值                    | 默认值       | 最低版本 |
| ------------ | ----------------------------------------------------------------| ------- | ------------------------- | ------------ | -------- |
| type         | 类型                                                             | NotifyType | `primary` `success` `warning` `danger` | `danger` | -        |
| message      | 展示文案，支持通过`\n`换行                                          | string | -                         | -            | -        |
| duration     | 展示时长(ms)，值为 0 时，notify 不会消失                             | number | -                         | `3000`            | -        |
| zIndex     | 层级                                                               | number | -                          | `99`            | -        |
| position   | 弹出位置                                                            | NotifyPosition | `top` `bottom`     | `top`            | -        |
| color     | 字体颜色                                                             | string | -     | -            | -        |
| background   | 背景颜色                                                          | string | -     | -            | -        |
| safeHeight   | 顶部安全高度                                                       | number / string | -     | -            | -        |
| onClick   | 点击时的回调函数                                                       | (event: MouseEvent) => void | -     | -            | -        |
| onClosed   | 关闭时的回调函数                                                       | () => void | -     | -            | -        |
| onOpened   | 展示后的回调函数                                                       | () => void | -     | -            | -        |
