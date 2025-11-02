import { ref, onMounted } from 'vue'
import axios from 'axios'

export type CaseData = {
  name: string
  image: string
  description?: string
}

const data = ref<CaseData[]>([])

export function useCaseData() {
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = [
      'https://sponsor.wot-ui.cn',
      'https://wot-sponsors.pages.dev'
    ]

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const path = '/cases.json'
          const response = await axios.get(url + path + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          const data: CaseData[] = response.data && response.data.data ? response.data.data : []
          return data.map(item => {
            return {
              name: item.name,
              image: item.image ? url + item.image : '',
              description: item.description
            }
          }) // 成功获取数据后直接返回
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



