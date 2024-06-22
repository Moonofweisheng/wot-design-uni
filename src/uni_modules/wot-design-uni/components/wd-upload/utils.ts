/*
 * @Author: weisheng
 * @Date: 2024-03-18 22:36:44
 * @LastEditTime: 2024-06-21 13:21:01
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-upload\utils.ts
 * 记得注释
 */
import { isArray } from '../common/util'
import type { ChooseFile, ChooseFileOption } from './types'

function formatImage(res: UniApp.ChooseImageSuccessCallbackResult): ChooseFile[] {
  if (isArray(res.tempFiles)) {
    return res.tempFiles.map((item: any) => {
      return {
        path: item.path || '',
        name: item.name || '',
        size: item.size,
        type: 'image',
        thumb: item.path || ''
      }
    })
  } else {
    return [
      {
        path: (res.tempFiles as any).path || '',
        name: (res.tempFiles as any).name || '',
        size: (res.tempFiles as any).size,
        type: 'image',
        thumb: (res.tempFiles as any).path || ''
      }
    ]
  }
}

function formatVideo(res: UniApp.ChooseVideoSuccess): ChooseFile[] {
  return [
    {
      path: res.tempFilePath || '',
      name: res.name || '',
      size: res.size,
      type: 'video',
      thumb: (res as any).thumbTempFilePath || '',
      duration: res.duration
    }
  ]
}

function formatMedia(res: UniApp.ChooseMediaSuccessCallbackResult): ChooseFile[] {
  return res.tempFiles.map((item) => ({
    type: item.fileType,
    path: item.tempFilePath,
    thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath,
    size: item.size,
    duration: item.duration
  }))
}
export function chooseFile({
  multiple,
  sizeType,
  sourceType,
  maxCount,
  accept,
  compressed,
  maxDuration,
  camera
}: ChooseFileOption): Promise<ChooseFile[]> {
  return new Promise((resolve, reject) => {
    switch (accept) {
      case 'image':
        uni.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
          sizeType,
          sourceType,
          success: (res) => resolve(formatImage(res)),
          fail: reject
        })
        break
      case 'video':
        uni.chooseVideo({
          sourceType,
          compressed,
          maxDuration,
          camera,
          success: (res) => {
            resolve(formatVideo(res))
          },
          fail: reject
        })
        break
      case 'media':
        uni.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType,
          sizeType,
          camera,
          maxDuration,
          success: (res) => resolve(formatMedia(res)),
          fail: reject
        })
        break
      case 'file':
        uni.chooseMessageFile({
          count: multiple ? Math.min(maxCount, 100) : 1,
          type: accept,
          success: (res) => resolve(res.tempFiles),
          fail: reject
        })
        break
      case 'all':
        // #ifdef MP-WEIXIN
        uni.chooseMessageFile({
          count: multiple ? Math.min(maxCount, 100) : 1,
          type: accept,
          success: (res) => resolve(res.tempFiles),
          fail: reject
        })
        // #endif
        // #ifdef H5
        uni.chooseFile({
          count: multiple ? Math.min(maxCount, 100) : 1,
          type: accept,
          success: (res) => resolve(res.tempFiles as ChooseFile[]),
          fail: reject
        })
        // #endif
        break
      default:
        break
    }
  })
}
