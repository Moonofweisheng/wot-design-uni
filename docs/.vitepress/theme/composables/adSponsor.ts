/*
 * @Author: weisheng
 * @Date: 2025-09-21 19:12:03
 * @LastEditTime: 2025-09-21 19:52:54
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/docs/.vitepress/theme/composables/adSponsor.ts
 * 记得注释
 */
import { ref, onMounted } from 'vue'
import axios from 'axios'

export type GridSize = 'xmini' | 'mini' | 'small' | 'medium' | 'big'

export interface Sponsor {
  name: string
  img: string
  url: string
}
export interface Sponsors {
  tier?: string
  size?: GridSize
  items: Sponsor[]
}


const data = ref<Sponsors[]>([])

export function useAdSponsor() {
  onMounted(async () => {
    // 定义数据源URL列表，按优先级排序
    const urls = [
      'https://sponsor.wot-ui.cn/sponsor.json',
      'https://wot-sponsors.pages.dev/sponsor.json'
    ]

    // 尝试从多个数据源获取数据
    const fetchData = async () => {
      for (const url of urls) {
        try {
          const response = await axios.get(url + '?t=' + Date.now(), {
            timeout: 5000 // 设置5秒超时
          })
          return response?.data?.data // 成功获取数据后直接返回
        } catch (error) {
          console.warn(`Failed to fetch from ${url}`)
          // 继续尝试下一个URL
        }
      }
      return [] // 所有数据源都失败时返回null
    }

    data.value = await fetchData()
  })

  return {
    data,
  }
}



