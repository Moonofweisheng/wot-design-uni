import { ref, onMounted } from 'vue'
import axios from 'axios'

export type AdData = {
  image: string
  title?: string
  link?: string
}

const data = ref<AdData[]>([])

export function useAds() {
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = [
      'https://sponsor.wot-design-uni.cn/ads.json',
      'https://wot-sponsors.pages.dev/ads.json'
    ]

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url, {
            timeout: 5000 // 设置5秒超时
          })
          return response.data && response.data.ads ? response.data.ads : [] // 成功获取数据后直接返回
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
          // 继续尝试下一个URL
        }
      }
      return [] // 所有数据源都失败时返回空数组
    }

    data.value = await fetchData()
  })

  return {
    data
  }
}



