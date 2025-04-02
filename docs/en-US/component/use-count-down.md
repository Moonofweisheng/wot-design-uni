# useCountDown

Used for handling countdown-related logic.

## Basic Usage

```ts
import { useCountDown } from '@/uni_modules/wot-design-uni'

const { start, pause, reset, current } = useCountDown({
  time: 60 * 1000,
  onChange(current) {
    console.log('Remaining time', current)
  },
  onFinish() {
    console.log('Countdown finished')
  }
})

// Start countdown
start()

// Pause countdown
pause()

// Reset countdown
reset()

// Get current time
console.log(current.value)
```

## API

### Parameters

| Parameter | Description | Type | Default |
|-----|------|------|--------|
| time | Total countdown time (ms) | number | - |
| millisecond | Whether to enable millisecond-level rendering | boolean | false |
| onChange | Countdown change callback | (current: CurrentTime) => void | - |
| onFinish | Countdown finish callback | () => void | - |

### Methods

| Method Name | Description | Parameters | Return Value |
|-------|------|------|--------|
| start | Start countdown | - | - |
| pause | Pause countdown | - | - |
| reset | Reset countdown | time?: number | - |

### CurrentTime Structure

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