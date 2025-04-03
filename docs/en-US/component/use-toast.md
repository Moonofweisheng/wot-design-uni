# useToast

Used for conveniently calling the Toast lightweight prompt component.

## Basic Usage

You need to import the wd-toast component in the page as a mounting point.

```html
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

function showToast() {
  toast.show('Prompt message')
}
```

## Success, Error, Warning, Regular

```ts
toast.show('Prompt message')
toast.success('Operation successful')
toast.error('Invalid phone verification code, please re-enter')
toast.warning('Warning message')
toast.info('Regular prompt message')
```

## Using Icons
You can use `iconClass` to specify an icon, combined with `classPrefix` to use custom icons, see [Icon Custom Icons](/component/icon#custom-icons).
```ts
// Using component library's internal icons
toast.show({
  iconClass: 'star',
  msg: 'Using component library internal icons'
})
```

```ts
// Using custom icons
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: 'Using custom icons'
})
```

## Loading Prompt

When `loading` is enabled, it needs to be closed manually by the user. You can call `close`, or call another toast prompt, because only one toast will exist, and a new toast will automatically replace the old one.

```ts
toast.loading('Loading...')
```

Modify loading indicator type:

```ts
toast.loading({
  loadingType: 'ring',
  msg: 'Loading...'
})
```

Manually close loading:
```ts
toast.close()
```

## API

### Methods

| Method Name | Description | Parameters | 
| -------- | --------------------- | ------- | 
| show | Show prompt | options | 
| success | Success prompt | options | 
| error | Error prompt | options | 
| info | Regular prompt | options | 
| warning | Warning prompt | options | 
| loading | Loading prompt | options | 
| close | Manually close message prompt box | - | 

### Options

| Parameter | Description | Type | Accepted Values | Default |
|--------------|----------------------------------------|----------|---------------------------|------------|
| msg | Message content | string | - | '' |
| duration | Duration in ms, 0 means no automatic closing | number | - | 2000 |
| direction | Layout direction | string | vertical / horizontal | horizontal |
| iconName | Icon type | string | success / error / warning | '' |
| iconSize | Left icon size | number | - | - |
| iconClass | Custom icon class name | string | - | '' |
| classPrefix | Class name prefix | string | - | 'wd-icon' |
| position | Prompt box position | string | top / middle / bottom | middle-top |
| zIndex | Toast z-index | number | - | 100 |
| loadingType | Loading icon type | string | ring | outline |
| loadingColor | Loading icon color | string | - | #4D80F0 |
| selector | Unique identifier | string | - | '' |
| cover | Whether there is a transparent mask | boolean | - | false |
| opened | Callback function after fully displayed | Function | - | - |
| closed | Callback function after fully closed | Function | - | - |