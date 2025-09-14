# CountDown

Used to display countdown values in real-time, supporting millisecond precision.

## Basic Usage

The `time` property represents the total duration of the countdown in milliseconds.

```html
<wd-count-down :time="time" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## Custom Format

The `format` property represents the countdown format, which can be customized.

```html
<wd-count-down :time="time" :format="format" />
```

```ts
const format = ref<string>('DD Days HH Hours mm Minutes ss Seconds')
const time = ref<number>(30 * 60 * 60 * 1000)
```

## Millisecond Rendering

The `millisecond` property indicates whether to enable millisecond-level rendering, which is disabled by default.

```html
<wd-count-down :time="time" :millisecond="true" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## Custom Style

Customize the countdown style through slots. The `timeData` object format is shown in the table below.

```html
<wd-count-down :time="time">
  <template #default="{ current }">
    <span class="custom-count-down">{{ current.hours }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.minutes }}</span>
    <span class="custom-count-down-colon">:</span>
    <span class="custom-count-down">{{ current.seconds }}</span>
  </template>
</wd-count-down>
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

```css
.custom-count-down {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #f0883a;
  border-radius: 2px;
}

.custom-count-down-colon {
  display: inline-block;
  margin: 0 4px;
  color: #f0883a;
}
```

## Manual Control

Start the countdown using the `start` method, pause it using the `pause` method, and reset it using the `reset` method.

```html
<wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish"></wd-count-down>
<wd-grid clickable border>
  <wd-grid-item text="Start" icon="play-circle-stroke" @itemclick="start" />
  <wd-grid-item text="Pause" icon="pause-circle" @itemclick="pause" />
  <wd-grid-item text="Reset" icon="refresh" @itemclick="reset" />
</wd-grid>
```

```ts
const { show: showToast } = useToast()

const countDown = ref<any>(null)

const start = () => {
  countDown.value.start()
}
const pause = () => {
  countDown.value.pause()
}
const reset = () => {
  countDown.value.reset()
}
const onFinish = () => showToast('Countdown ended')
```

## Attributes

| Parameter   | Description                                | Type    | Options | Default   | Version |
| ----------- | ------------------------------------------ | ------- | ------- | --------- | ------- |
| time        | Countdown duration in milliseconds         | Number  | —       | 0         | 0.1.58  |
| millisecond | Enable millisecond-level rendering         | Boolean | —       | false     | 0.1.58  |
| auto-start  | Automatically start countdown              | Boolean | —       | true      | 0.1.58  |
| format      | Countdown format string                    | String  | —       | `HH:mm:ss`| 0.1.58  |

## Events

| Event Name | Description                    | Parameters            | Version |
| ---------- | ------------------------------ | --------------------- | ------- |
| finish     | Triggered when countdown ends  | —                     | 0.1.58  |
| change     | Triggered on countdown change  | current: TimeData     | 0.1.58  |

## Methods

| Method Name | Description                    | Parameters            | Version |
| ----------- | ------------------------------ | --------------------- | ------- |
| start       | Start countdown                | —                     | 0.1.58  |
| pause       | Pause countdown                | —                     | 0.1.58  |
| reset       | Reset countdown, auto-starts if `auto-start` is `true` | —      | 0.1.58  |

## Slots

| Name | Description    | Version |
| ---- | -------------- | ------- |
| —    | Default slot   | 0.1.58  |

## External Classes

| Class Name    | Description           | Version |
| ------------- | --------------------- | ------- |
| custom-class  | Root node style       | -       |

### format Options

| Format | Description           |
| ------ | --------------------- |
| DD     | Days                  |
| HH     | Hours                 |
| mm     | Minutes               |
| ss     | Seconds               |
| S      | Milliseconds (1 digit)|
| SS     | Milliseconds (2 digits)|
| SSS    | Milliseconds (3 digits)|

### timeData Object

| Property     | Description  | Type   | Default |
| ------------ | ------------ | ------ | ------- |
| days         | Days         | number | -       |
| hours        | Hours        | number | -       |
| minutes      | Minutes      | number | -       |
| seconds      | Seconds      | number | -       |
| milliseconds | Milliseconds | number | -       |