import { onBeforeUnmount, onDeactivated, ref, watch } from 'vue'

function useLockScroll(shouldLock: () => boolean) {
  const scrollLockCount = ref(0)

  const lock = () => {
    if (scrollLockCount.value === 0) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    }
    scrollLockCount.value++
  }

  const unlock = () => {
    if (scrollLockCount.value > 0) {
      scrollLockCount.value--
      if (scrollLockCount.value === 0) {
        document.getElementsByTagName('body')[0].style.overflow = ''
      }
    }
  }

  const destroy = () => {
    shouldLock() && unlock()
  }

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })

  onDeactivated(destroy)
  onBeforeUnmount(destroy)

  return {
    lock,
    unlock
  }
}

export default useLockScroll
