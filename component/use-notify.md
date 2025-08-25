---
url: 'https://wot-design-uni.cn/component/use-notify.md'
---
# useNotify

用于便捷地调用 Notify 消息通知组件。

## 基本用法

需要在页面中引入 wd-notify 组件作为挂载点。

```html
<wd-notify />
<wd-button @click="showNotify">notify</wd-button>
```

```ts
import { useNotify } from '@/uni_modules/wot-design-uni'

const { showNotify } = useNotify()

function showNotify() {
  showNotify('通知内容')
}
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

## 自定义样式

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

## API

### Methods

| 方法名称 | 说明 | 参数 |
|---------|------|------|
| showNotify | 展示提示 | `NotifyOptions` / `string` |
| closeNotify | 关闭提示 | - |
| setNotifyDefaultOptions | 修改默认配置，影响所有的 `showNotify` 调用 | `NotifyOptions` |
| resetNotifyDefaultOptions | 重置默认配置，影响所有的 `showNotify` 调用 | - |

### Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|------|------|--------|--------|
| type | 类型 | NotifyType | `primary` `success` `warning` `danger` | `danger` |
| message | 展示文案，支持通过\n换行 | string | - | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | number | - | 3000 |
| zIndex | 层级 | number | - | 99 |
| position | 弹出位置 | NotifyPosition | `top` `bottom` | `top` |
| color | 字体颜色 | string | - | - |
| background | 背景颜色 | string | - | - |
| safeHeight | 顶部安全高度 | number / string | - | - |
| onClick | 点击时的回调函数 | (event: MouseEvent) => void | - | - |
| onClosed | 关闭时的回调函数 | () => void | - | - |
| onOpened | 展示后的回调函数 | () => void | - | - |
