---
url: 'https://wot-design-uni.cn/component/use-count-down.md'
---
# useCountDown

用于处理倒计时相关的逻辑。

## 基础用法

```ts
import { useCountDown } from '@/uni_modules/wot-design-uni'

const { start, pause, reset, current } = useCountDown({
  time: 60 * 1000,
  onChange(current) {
    console.log('剩余时间', current)
  },
  onFinish() {
    console.log('倒计时结束')
  }
})

// 开始倒计时
start()

// 暂停倒计时
pause()

// 重置倒计时
reset()

// 获取当前时间
console.log(current.value)
```

## API

### 参数

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|------|--------|
| time | 倒计时总时间(ms) | number | - |
| millisecond | 是否开启毫秒级渲染 | boolean | false |
| onChange | 倒计时变化回调 | (current: CurrentTime) => void | - |
| onFinish | 倒计时结束回调 | () => void | - |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|--------|
| start | 开始倒计时 | - | - |
| pause | 暂停倒计时 | - | - |
| reset | 重置倒计时 | time?: number | - |

### CurrentTime 结构

```ts
type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}
```
