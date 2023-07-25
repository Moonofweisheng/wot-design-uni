/*
 * @Author: weisheng
 * @Date: 2023-07-02 22:51:06
 * @LastEditTime: 2023-07-13 10:07:17
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\common\clickoutside.ts
 * 记得注释
 */
let queue: any[] = []

export function pushToQueue(comp) {
  queue.push(comp)
}

export function removeFromQueue(comp) {
  queue = queue.filter((item) => {
    return item.$.uid !== comp.$.uid
  })
}

export function closeOther(comp) {
  queue.forEach((item) => {
    if (item.$.uid !== comp.$.uid) {
      item.$.exposed.close()
    }
  })
}

export function closeOutside() {
  queue.forEach((item) => {
    item.$.exposed.close()
  })
}
