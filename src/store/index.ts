import { ref } from 'vue'

const isDark = ref<boolean>(false)

function setDark(dark: boolean) {
  isDark.value = dark
  process.env.NODE_ENV === 'development' && uni.setStorageSync('isDark', dark)
}

export function useDark() {
  process.env.NODE_ENV === 'development'
    ? setDark(Boolean(uni.getStorageSync('isDark')))
    : setDark(localStorage.getItem('vitepress-theme-appearance') === 'dark')
  return { isDark, setDark }
}
