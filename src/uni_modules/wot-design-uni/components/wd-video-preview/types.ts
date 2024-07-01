/*
 * @Author: weisheng
 * @Date: 2024-06-30 23:09:08
 * @LastEditTime: 2024-07-01 13:02:57
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/components/wd-video-preview/types.ts
 * 记得注释
 */
import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps } from '../common/props'

export const videoPreviewProps = {
  ...baseProps
}

export type VideoPreviewProps = ExtractPropTypes<typeof videoPreviewProps>

export type VideoPreviewExpose = {
  // 打开弹框
  open: (url: string) => void
  // 关闭弹框
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>
