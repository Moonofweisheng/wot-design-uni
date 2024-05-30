import type { ChooseFileOption } from './types'

// 后续会对外暴露选中视频文件
export function chooseFile({ multiple, sizeType, sourceType, maxCount }: ChooseFileOption) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: multiple ? maxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1,移除9张上限限制
      sizeType,
      sourceType,
      success: resolve,
      fail: reject
    })
  })
}
