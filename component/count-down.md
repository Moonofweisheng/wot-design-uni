---
url: 'https://wot-design-uni.cn/component/count-down.md'
---
# CountDown 倒计时0.1.58

用于实时展示倒计时数值，支持毫秒精度。

## 基础用法

`time` 属性表示倒计时总时长，单位为毫秒。

```html
<wd-count-down :time="time" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## 自定义格式

`format` 属性表示倒计时格式，支持自定义。

```html
<wd-count-down :time="time" :format="format" />
```

```ts
const format = ref<string>('DD 天 HH 时 mm 分 ss 秒')
const time = ref<number>(30 * 60 * 60 * 1000)
```

## 毫秒级渲染

`millisecond` 属性表示是否开启毫秒级渲染，默认关闭。

```html
<wd-count-down :time="time" :millisecond="true" />
```

```ts
const time = ref<number>(30 * 60 * 60 * 1000)
```

## 自定义样式

通过插槽自定义倒计时的样式，`timeData` 对象格式见下方表格。

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

## 手动控制

通过 `start` 方法开始倒计时，通过 `pause` 方法暂停倒计时，通过 `reset` 方法重置倒计时。

```html
<wd-count-down ref="countDown" :time="3000" millisecond :auto-start="false" format="ss:SSS" @finish="onFinish"></wd-count-down>
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @itemclick="pause" />
  <wd-grid-item text="重置" icon="refresh" @itemclick="reset" />
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
const onFinish = () => showToast('倒计时结束')
```

## Attributes

| 参数        | 说明                 | 类型    | 可选值 | 默认值     | 最低版本 |
| ----------- | -------------------- | ------- | ------ | ---------- | -------- |
| time        | 倒计时时长，单位毫秒 | Number  | —      | 0          | 0.1.58   |
| millisecond | 是否开启毫秒级渲染   | Boolean | —      | false      | 0.1.58   |
| auto-start  | 是否自动开始倒计时   | Boolean | —      | true       | 0.1.58   |
| format      | 倒计时格式化字符串   | String  | —      | `HH:mm:ss` | 0.1.58   |

## Events

| 事件名称 | 说明             | 参数                  | 最低版本 |
| -------- | ---------------- | --------------------- | -------- |
| finish   | 倒计时结束时触发 | —                     | 0.1.58   |
| change   | 倒计时变化时触发 | current: TimeData | 0.1.58   |

## Methods

| 方法名 | 说明           | 参数                  | 最低版本 |
| -------- | ---------------- | --------------------- | -------- |
| start    | 开始倒计时       | —                     | 0.1.58   |
| pause    | 暂停倒计时       | —                     | 0.1.58   |
| reset     | 重置倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时       | —                     | 0.1.58   |

## Slots

| 名称 | 说明     | 最低版本 |
| ---- | -------- | -------- |
| —    | 默认插槽 | 0.1.58   |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |

### format 格式

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时         |
| mm   | 分钟         |
| ss   | 秒数         |
| S    | 毫秒（1 位） |
| SS   | 毫秒（2 位） |
| SSS  | 毫秒（3 位） |

### timeData 对象

| 属性         | 说明 | 类型   | 默认值 |
| ------------ | ---- | ------ | ------ |
| days         | 天   | number | -      |
| hours        | 小时 | number | -      |
| minutes      | 分钟 | number | -      |
| seconds      | 秒   | number | -      |
| milliseconds | 毫秒 | number | -      |
