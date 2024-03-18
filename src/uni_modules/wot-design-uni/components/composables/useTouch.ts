import { ref } from 'vue'

export function useTouch() {
  const direction = ref<string>('')
  const deltaX = ref<number>(0)
  const deltaY = ref<number>(0)
  const offsetX = ref<number>(0)
  const offsetY = ref<number>(0)
  const startX = ref<number>(0)
  const startY = ref<number>(0)

  function touchStart(event: any) {
    const touch = event.touches[0]
    direction.value = ''
    deltaX.value = 0
    deltaY.value = 0
    offsetX.value = 0
    offsetY.value = 0
    startX.value = touch.clientX
    startY.value = touch.clientY
  }

  function touchMove(event: any) {
    const touch = event.touches[0]
    deltaX.value = touch.clientX - startX.value
    deltaY.value = touch.clientY - startY.value
    offsetX.value = Math.abs(deltaX.value)
    offsetY.value = Math.abs(deltaY.value)
    direction.value = offsetX.value > offsetY.value ? 'horizontal' : offsetX.value < offsetY.value ? 'vertical' : ''
  }

  return {
    touchStart,
    touchMove,
    direction,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    startX,
    startY
  }
}
