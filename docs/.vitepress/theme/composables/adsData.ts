import { ref, onMounted } from 'vue'

export type AdData = {
  image: string
  title?: string
  link?: string
}

const data = ref<AdData[]>([])

export function useAds() {
  onMounted(async () => {
   try {
    const result = await fetch('https://wot-sponsors.pages.dev/ads.json')
    const json = await result.json()
    data.value = json && json.ads ? json.ads : []
   } catch (error) {
    
   }
  })

  return {
    data
  }
}



