/*
 * @Author: weisheng
 * @Date: 2023-08-01 11:12:05
 * @LastEditTime: 2023-08-15 22:58:47
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-upload\utils.ts
 * 记得注释
 */
// 后续会对外暴露选中视频文件
export function chooseFile({ multiple, sizeType, sourceType, maxCount }) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
      sizeType,
      sourceType,
      success: resolve,
      fail: reject
    })
  })
}
