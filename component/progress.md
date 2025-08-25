---
url: 'https://wot-design-uni.cn/component/progress.md'
---
# Progress 进度条

用于展示操作的当前进度。

## 基本用法

设置百分比 `percentage`。

```html
<wd-progress :percentage="30" />
```

## 隐藏进度文字

设置 `hide-text` 隐藏进度文字。

```html
<wd-progress :percentage="60" hide-text></wd-progress>
```

## 设置状态

设置 `status`，告知用户当前状态和预期。

```html
<wd-progress :percentage="100" hide-text status="success" />
<wd-progress :percentage="70" hide-text status="danger" />
```

## 修改颜色

设置 `color` 修改进度条颜色。

```html
<wd-progress :percentage="80" color="#00c740"></wd-progress>
```

`color` 也可以设置为数组或者函数。数组如果只传入颜色，则自动计算每个颜色的进度边界。函数需要返回一个颜色值。

```html
<wd-progress :percentage="100" :color="['#00c740', '#ffb300', '#e2231a', '#0083ff']" />
```

数组也可以设置为以下格式：

```html
<wd-progress :percentage="percentage" :color="colorObject" />
```

```typescript
import type { ProgressColor } from '@/uni_modules/wot-design-uni/components/wd-progress/types'

const colorObject = ref<ProgressColor>([
  {
    color: 'yellow',
    percentage: 30
  },
  {
    color: 'red',
    percentage: 60
  },
  {
    color: 'blue',
    percentage: 80
  },
  {
    color: 'black',
    percentage: 90
  }
])
const percentage = ref<number>(100)
```

## Attributes

| 参数       | 说明                  | 类型                                    | 可选值           | 默认值 | 最低版本 |
| ---------- | --------------------- | --------------------------------------- | ---------------- | ------ | -------- |
| percentage | 进度数值，最大值 100  | `number`                                | -                | 0      | -        |
| hide-text  | 隐藏进度文字          | `boolean`                               | -                | false  | -        |
| color      | 进度条颜色            | `string / ProgressColor[] / string[]` | -                | -      | -        |
| status     | 进度条状态            | `string`                                | success / danger / warning | -      | -        |
| duration   | 进度增加 1%所需毫秒数 | `number`                                | -                | 30     | -        |

### ProgressColor

| 字段       | 说明   | 说明   | 最低版本 |
| ---------- | ------ | ------ | -------- |
| color      | string | 颜色   | -        |
| percentage | number | 百分比 | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
