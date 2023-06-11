let queue = []
let outsideId = 1

export function pushToQueue(comp) {
  comp.outsideId = ++outsideId
  queue.push(comp)
}

export function removeFromQueue(comp) {
  queue = queue.filter((item) => {
    return item.outsideId !== comp.outsideId
  })
}

export function closeOther(comp) {
  queue.forEach((item) => {
    if (item.outsideId !== comp.outsideId) {
      item.close()
    }
  })
}

export default function closeOutside() {
  queue.forEach((item) => {
    item.close()
  })
}
