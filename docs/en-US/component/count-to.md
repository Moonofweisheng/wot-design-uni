# CountTo Number Animation

Number animation component.

## Basic Usage

Set the `endVal` property to specify the final value.
Set the `startVal` property to specify the starting value.
Set the `duration` property to specify the time for number animation from start to end.
Set the `autoplay` property to specify whether to play automatically.
Set the `decimals` property to specify the number of decimal places to retain.
Set the `decimal` property to specify the decimal point symbol.
Set the `prefix` property to specify the number prefix.
Set the `suffix` property to specify the number suffix.
Set the `fontSize` property to specify the font size.
Set the `color` property to specify the text color.

```vue
<wd-count-to :endVal="2024" suffix="year" color="#16baaa"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="186.321" :fontSize="32" suffix="%" color="#1e9fff"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ff5722"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ffb800" :duration="2000"></wd-count-to>
```

## Set Theme

Set the text theme through the <code>type</code> parameter. We provide five types: <code>primary</code> <code>error</code> <code>success</code> <code>warning</code> <code>default</code>.

```html
<wd-count-to type="primary" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="error" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="success" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="warning" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="info" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
```

## Manual Control

Start the animation using the `start` method, pause it using the `pause` method, and reset it using the `reset` method.

```html
<wd-count-to
  ref="countTo"
  :auto-start="false"
  prefix="￥"
  :startVal="1000"
  :decimals="3"
  :endVal="9999.32"
  :fontSize="32"
  suffix="%"
  color="#1e9fff"
></wd-count-to>
<wd-grid clickable border>
  <wd-grid-item text="Start" icon="play-circle-stroke" @itemclick="start" />
  <wd-grid-item text="Pause" icon="pause-circle" @itemclick="pause" />
  <wd-grid-item text="Reset" icon="refresh" @itemclick="reset" />
</wd-grid>
```

```ts
import type { CountToInstance } from '@/uni_modules/wot-design-uni/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

const start = () => {
  countTo.value!.start()
}
const pause = () => {
  countTo.value!.pause()
}
const reset = () => {
  countTo.value!.reset()
}
```

## Attributes

| Parameter  | Description                                   | Type    | Options                                      | Default | Version |
| ---------- | --------------------------------------------- | ------- | -------------------------------------------- | ------- | ------- |
| fontSize   | Font size                                     | number  | 16                                           | default | 1.3.8   |
| color      | Text color                                    | string  | -                                            | ''      | 1.3.8   |
| type       | Theme type                                    | string  | 'primary' / 'error' / 'warning' / 'success'  | default | 1.3.9   |
| startVal   | Starting value                                | number  | -                                            | 0       | 1.3.8   |
| endVal     | Final value                                   | number  | -                                            | 2024    | 1.3.8   |
| duration   | Animation duration from start to end          | number  | -                                            | 3000    | 1.3.8   |
| autoplay   | Auto play                                     | boolean | -                                            | true    | 1.3.8   |
| decimals   | Number of decimal places (must be >= 0)       | number  | -                                            | 0       | 1.3.8   |
| decimal    | Decimal point symbol                          | string  | -                                            | '.'     | 1.3.8   |
| separator  | Thousands separator                           | string  | -                                            | ','     | 1.3.8   |
| prefix     | Prefix                                        | string  | -                                            | -       | 1.3.8   |
| suffix     | Suffix                                        | string  | -                                            | -       | 1.3.8   |
| useEasing  | Use easing animation                          | boolean | -                                            | true    | 1.3.8   |

## Events

| Event Name | Description                           | Parameters | Version |
| ---------- | ------------------------------------- | ---------- | ------- |
| finish     | Triggered when animation completes    | —          | 1.3.8   |
| mounted    | Triggered when component is mounted   | -          | 1.3.8   |

## Methods

| Method Name | Description                                                      | Parameters | Version |
| ----------- | ---------------------------------------------------------------- | ---------- | ------- |
| start       | Start animation                                                  | —          | 1.3.8   |
| pause       | Pause animation                                                  | —          | 1.3.8   |
| reset       | Reset animation, auto-starts if `auto-start` is `true`           | —          | 1.3.8   |

## Slots

| Name    | Description    | Version |
| ------- | -------------- | ------- |
| default | Default slot   | 1.3.8   |
| prefix  | Prefix slot    | 1.3.8   |
| suffix  | Suffix slot    | 1.3.8   |

## External Classes

| Class Name    | Description      | Version |
| ------------- | ---------------- | ------- |
| custom-class  | Root node style  | 1.3.8   |
| custom-style  | Root node style  | 1.3.8   |