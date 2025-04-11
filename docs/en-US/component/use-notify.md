# useNotify

Used for conveniently calling the Notify notification component.

## Basic Usage

You need to import the wd-notify component in the page as a mounting point.

```html
<wd-notify />
<wd-button @click="showNotify">notify</wd-button>
```

```ts
import { useNotify } from '@/uni_modules/wot-design-uni'

const { showNotify } = useNotify()

function showNotify() {
  showNotify('Notification content')
}
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

## Custom Style

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

## API

### Methods

| Method Name | Description | Parameters | 
|---------|------|------|
| showNotify | Show notification | `NotifyOptions` / `string` |
| closeNotify | Close notification | - |
| setNotifyDefaultOptions | Modify default configuration, affects all `showNotify` calls | `NotifyOptions` |
| resetNotifyDefaultOptions | Reset default configuration, affects all `showNotify` calls | - |

### Options

| Parameter | Description | Type | Accepted Values | Default |
|-----|------|------|--------|--------|
| type | Type | NotifyType | `primary` `success` `warning` `danger` | `danger` |
| message | Display text, supports line breaks with `\n` | string | - | - |
| duration | Display duration (ms), when value is 0, notify will not disappear | number | - | 3000 |
| zIndex | Layer level | number | - | 99 |
| position | Pop-up position | NotifyPosition | `top` `bottom` | `top` |
| color | Font color | string | - | - |
| background | Background color | string | - | - |
| safeHeight | Top safe height | number / string | - | - |
| onClick | Callback function when clicked | (event: MouseEvent) => void | - | - |
| onClosed | Callback function when closed | () => void | - | - |
| onOpened | Callback function after display | () => void | - | - |