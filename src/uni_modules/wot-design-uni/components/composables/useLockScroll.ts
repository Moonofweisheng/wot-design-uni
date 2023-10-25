import { ref, watch } from 'vue'

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

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })

  return {
    lock,
    unlock
  }
}

export default useLockScroll
