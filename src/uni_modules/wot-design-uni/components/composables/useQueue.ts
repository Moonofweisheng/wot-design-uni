import { type Ref, provide, ref } from 'vue'

export const queueKey = '__QUEUE_KEY__'

export interface Queue {
  queue: Ref<any[]>
  pushToQueue: (comp: any) => void
  removeFromQueue: (comp: any) => void
  closeOther: (comp: any) => void
  closeOutside: () => void
}

export function useQueue() {
  const queue = ref<any[]>([])

  function pushToQueue(comp: any) {
    queue.value.push(comp)
  }

  function removeFromQueue(comp: any) {
    queue.value = queue.value.filter((item) => {
      return item.$.uid !== comp.$.uid
    })
  }

  function closeOther(comp: any) {
    queue.value.forEach((item) => {
      if (item.$.uid !== comp.$.uid) {
        item.$.exposed.close()
      }
    })
  }

  function closeOutside() {
    queue.value.forEach((item) => {
      item.$.exposed.close()
    })
  }

  provide(queueKey, {
    queue,
    pushToQueue,
    removeFromQueue,
    closeOther,
    closeOutside
  })

  return {
    closeOther,
    closeOutside
  }
}
