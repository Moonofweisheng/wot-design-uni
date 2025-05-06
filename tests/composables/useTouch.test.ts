import { useTouch } from '@/uni_modules/wot-design-uni/components/composables/useTouch'
import { describe, expect, it } from 'vitest'

describe('useTouch', () => {
  const touch = useTouch()

  it('should initialize with default values', () => {
    expect(touch.direction.value).toBe('')
    expect(touch.deltaX.value).toBe(0)
    expect(touch.deltaY.value).toBe(0)
  })

  it('should handle touch start', () => {
    touch.touchStart({
      touches: [{ clientX: 100, clientY: 100 }]
    })

    expect(touch.startX.value).toBe(100)
    expect(touch.startY.value).toBe(100)
  })

  it('should handle touch move horizontal', () => {
    touch.touchStart({
      touches: [{ clientX: 100, clientY: 100 }]
    })

    touch.touchMove({
      touches: [{ clientX: 200, clientY: 120 }]
    })

    expect(touch.direction.value).toBe('horizontal')
    expect(touch.deltaX.value).toBe(100)
  })

  it('should handle touch move vertical', () => {
    touch.touchStart({
      touches: [{ clientX: 100, clientY: 100 }]
    })

    touch.touchMove({
      touches: [{ clientX: 120, clientY: 200 }]
    })

    expect(touch.direction.value).toBe('vertical')
    expect(touch.deltaY.value).toBe(100)
  })
})
