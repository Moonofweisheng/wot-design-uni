/*
 * @Author: weisheng
 * @Date: 2023-07-02 22:51:06
 * @LastEditTime: 2023-07-02 22:51:15
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\common\clickoutside.ts
 * 记得注释
 */
let queue: any[] = []
let outsideId: number = 1

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
