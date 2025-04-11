# Toast

A lightweight feedback component that appears in the middle of the page.

## Basic Usage

The Toast component is a functional component that can be used by calling the `$toast` method on the current instance.

```html
<wd-button @click="open">Text Toast</wd-button>
```

```typescript
import { useToast } from 'wot-design-uni'

export default {
  setup() {
    const toast = useToast()

    const open = () => {
      toast.show('This is a toast')
    }

    return {
      open
    }
  }
}
```

## Success Toast

Set the `type` parameter to 'success' to display a success toast.

```typescript
const open = () => {
  toast.success('Success')
}
```

## Error Toast

Set the `type` parameter to 'error' to display an error toast.

```typescript
const open = () => {
  toast.error('Error')
}
```

## Warning Toast

Set the `type` parameter to 'warning' to display a warning toast.

```typescript
const open = () => {
  toast.warning('Warning')
}
```

## Loading Toast

Set the `type` parameter to 'loading' to display a loading toast.

```typescript
const open = () => {
  toast.loading('Loading')
}
```

## Custom Icon

Set the `icon` parameter to customize the icon of the toast.

```typescript
const open = () => {
  toast.show({
    msg: 'Custom Icon',
    icon: 'check-outline'
  })
}
```

## Custom Image

Set the `iconUrl` parameter to customize the image of the toast.

```typescript
const open = () => {
  toast.show({
    msg: 'Custom Image',
    iconUrl: 'https://example.com/image.png'
  })
}
```

## Custom Duration

Set the `duration` parameter to customize the display duration of the toast, in milliseconds. If set to 0, the toast will not automatically close.

```typescript
const open = () => {
  toast.show({
    msg: 'Custom Duration',
    duration: 5000
  })
}
```

## Custom Position

Set the `position` parameter to customize the position of the toast, which can be 'top', 'middle', 'bottom', default is 'middle'.

```typescript
const open = () => {
  toast.show({
    msg: 'Custom Position',
    position: 'top'
  })
}
```

## Close Toast

Call the `close` method to close the toast.

```typescript
const open = () => {
  toast.loading('Loading')
  setTimeout(() => {
    toast.close()
  }, 2000)
}
```

## Composables

| Name | Description | Parameters | Return Value |
|---------|---------|---------|------|
| useToast | Get the toast instance | - | Toast instance |

## Toast Methods

| Method Name | Description | Parameters | Return Value |
|---------|---------|---------|------|
| show | Show toast | options: ToastOptions / msg: string | - |
| success | Show success toast | options: ToastOptions / msg: string | - |
| error | Show error toast | options: ToastOptions / msg: string | - |
| warning | Show warning toast | options: ToastOptions / msg: string | - |
| loading | Show loading toast | options: ToastOptions / msg: string | - |
| close | Close toast | - | - |

## ToastOptions

| Attribute | Description | Type | Default | Version |
|---------|---------|---------|---------|------|
| msg | Toast content | string | - | - |
| duration | Toast display duration, in milliseconds, 0 means not automatically close | number | 2000 | - |
| iconName | Icon name, see Icon component for optional values | string | - | - |
| iconUrl | Custom image url | string | - | - |
| iconSize | Icon size | string | - | - |
| loadingType | Loading type, valid when type is loading | string | circular | - |
| loadingColor | Loading color, valid when type is loading | string | #4D80F0 | - |
| position | Toast position | string | middle | - |
| zIndex | Toast z-index | number | 100 | - |
| id | Toast id | string | - | - |
| className | Custom class name | string | - | - |