/*
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2024-02-02 15:30:41
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\theme\composables\sponsor.ts
 * 记得注释
 */
import { ref, onMounted } from 'vue'


const data = ref()

export function useSponsor() {
  onMounted(async () => {
    if (data.value) {
      return
    }
    const result = await fetch('https://historysoa.oss-cn-hongkong.aliyuncs.com/sponsors/wot-design-uni.json')
    const json = await result.json()
    data.value = json
  })

  return {
    data,
  }
}



