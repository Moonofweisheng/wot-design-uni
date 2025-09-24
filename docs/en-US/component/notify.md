# Notify

Notification component, used to display notification information at the top of the page.

## Basic Usage

You need to import this component in the page as a mounting point.
```html
<wd-notify />
```

```ts
import { useNotify } from '@/uni_modules/wot-design-uni'

const { showNotify, closeNotify } = useNotify()

// Automatically close after 3 seconds
showNotify('Notification content')

// Actively close
closeNotify()
```

## Notification Type
Supports four types of notifications: `primary`, `success`, `warning`, `danger`, with `danger` as the default.
```ts
// Primary notification
showNotify({ type: 'primary', message: 'Notification content' })

// Success notification
showNotify({ type: 'success', message: 'Notification content' })

// Danger notification
showNotify({ type: 'danger', message: 'Notification content' })

// Warning notification
showNotify({ type: 'warning', message: 'Notification content' })
```

## Custom Notification

```ts
showNotify({
  message: 'Custom color',
  color: '#ad0000',
  background: '#ffe1e1'
})

showNotify({
  message: 'Custom position',
  position: 'bottom'
})

showNotify({
  message: 'Custom duration',
  duration: 1000
})
```

## Using Notify Component
If you need to embed components or other custom content in Notify, you can directly use the Notify component and customize it using the default slot.
```html
<wd-button type="primary" @click="showNotify">Call using Notify component</wd-button>
<wd-notify type="success" :safe-height="safeHeight" v-model:visible="visible">
  <wd-icon name="check-outline" size="inherit" color="inherit" />
  Success notification
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

## Advanced Demo
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
    // Hide native tabBar
    uni.hideTabBar()
  })
</script>

<style lang="scss">
  :root, page {
    // Brand color
    --wot-color-theme: #1989fa;

    // Module title/important text
    --wot-color-title: #323233;
    // // Subtitle
    // --color-content: #969799;
    // // Secondary content
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
    <wd-button type="primary" @click="showNotify('Notification message')">Notification message</wd-button>
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
| Parameter | Description | Type | Accepted Values | Default | Version |
|-----------|-------------|------|-----------------|---------|----------|
| type | Type | NotifyType | `primary` `success` `warning` `danger` | `danger` | - |
| message | Display text, supports line breaks with `\n` | string | - | - | - |
| duration | Display duration (ms), when value is 0, notify will not disappear | number | - | `3000` | - |
| zIndex | Layer level | number | - | `99` | - |
| position | Pop-up position | NotifyPosition | `top` `bottom` | `top` | - |
| color | Font color | string | - | - | - |
| background | Background color | string | - | - | - |
| safeHeight | Top safe height | number / string | - | - | - |
| selector | Unique identifier | number | - | - | - |
| root-portal | Whether to detach from the page, used to solve various fixed positioning issues | boolean | - | false | 1.11.0 |

## Events
| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| onClick | Triggered when clicking | event: MouseEvent | - |
| onOpened | Triggered when fully displayed | - | - |
| onClosed | Triggered when fully closed | - | - |