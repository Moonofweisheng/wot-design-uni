import { ref, onMounted } from 'vue'
import axios from 'axios'


const data = ref()

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }

    // 定义数据源URL列表，按优先级排序
    const urls = [
      'https://sponsor.wot-ui.cn/wot-design-uni.json',
      'https://wot-sponsors.pages.dev/wot-design-uni.json'
    ]

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          return response.data // 成功获取数据后直接返回
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
          // 继续尝试下一个URL
        }
      }
      return null // 所有数据源都失败时返回null
    }

    data.value = await fetchData()
  })

  return {
    data,
  }
}



