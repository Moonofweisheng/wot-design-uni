# Curtain

Generally used for announcement-type image popups.

## Basic Usage

Set display and hide through the `v-model` property, which is required.

`src` is the curtain image URL (only online URLs are supported), value type is `string`, required.

`to` is the link to visit when clicking the curtain, value type is `string`, optional.

```html
<wd-button @click="handleClick">Show Curtain</wd-button>
<wd-curtain v-model="value" :src="img" :to="link"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## Set Curtain Image Width and Height

Set `width`, the default height is calculated based on the original image ratio and the input `width`, required.

```html
<wd-button @click="handleClick">Show Curtain</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" width="280"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## Modify Close Button Position

Set `close-position`, default is 'inset', available values are 'top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'.

```html
<wd-button @click="handleClick">Show Curtain</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" close-position="top" width="280"></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## Set Mask Click to Close Curtain

Set the `close-on-click-modal` property, value type is `boolean`, optional.

```html
<wd-button @click="handleClick">Show Curtain</wd-button>
<wd-curtain v-model="value" :src="img" :to="link" close-position="bottom-right" width="280" close-on-click-modal></wd-curtain>
```

```typescript
const value = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}
```

## Attributes

| Parameter           | Description                                                  | Type    | Options                                                                   | Default | Version |
|---------------------|--------------------------------------------------------------|---------|---------------------------------------------------------------------------|---------|----------|
| value               | Binding value, show/hide curtain (deprecated, use modelValue)| boolean | -                                                                         | -       | -        |
| modelValue          | Binding value, show/hide curtain                             | boolean | -                                                                         | -       | 1.7.0    |
| src                 | Curtain image URL, must use online URL                       | string  | -                                                                         | -       | -        |
| width               | Curtain image width, default unit px                         | number  | -                                                                         | -       | -        |
| to                  | Curtain image click link                                     | string  | -                                                                         | -       | -        |
| close-position      | Close button position                                        | string  | inset / top / bottom / top-left / top-right / bottom-left / bottom-right | inset   | -        |
| close-on-click-modal| Close on mask click                                         | boolean | -                                                                         | false   | -        |
| hide-when-close     | Hide popup layer when closed (display: none)                 | boolean | -                                                                         | true    | -        |
| z-index             | Set layer level                                              | number  | -                                                                         | 10      | 1.4.0    |
| root-portal         | Whether to detach from the page, used to solve various fixed positioning issues | boolean | -                                                                         | false   | 1.11.0 |

## Events

| Event Name   | Description                                                                                | Parameters | Version |
|--------------|--------------------------------------------------------------------------------------------|------------|----------|
| click        | Triggered when clicking the curtain                                                        | -          | -        |
| close        | Triggered when popup layer closes                                                          | -          | -        |
| click-modal  | Triggered when clicking the mask                                                           | -          | -        |
| beforeenter  | Triggered before enter                                                                     | -          | -        |
| enter        | Triggered during enter                                                                     | -          | -        |
| afterenter   | Triggered after enter                                                                      | -          | -        |
| beforeleave  | Triggered before leave                                                                     | -          | -        |
| leave        | Triggered during leave                                                                     | -          | -        |
| afterleave   | Triggered after leave                                                                      | -          | -        |
| load         | Image load complete event                                                                  | -          | -        |
| error        | Image load failure event, if image fails to load, curtain component won't show even if `value` is true | -          | -        |

## Slots

| Name  | Description         | Version |
|-------|---------------------|----------|
| close | Close button slot   | 1.5.0    |

## External Classes

| Class Name         | Description           | Version |
|-------------------|-----------------------|----------|
| custom-class      | Root node style       | -        |
| custom-close-class| Close button style    | 1.5.0    |
| custom-close-style| Close button style    | 1.5.0    |