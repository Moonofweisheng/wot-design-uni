/*
 * @Author: weisheng
 * @Date: 2024-06-30 23:09:08
 * @LastEditTime: 2024-07-01 21:47:34
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

export type PreviewVideo = {
  url: string // 视频资源地址
  poster?: string // 视频封面
  title?: string // 视频标题
}

export type VideoPreviewProps = ExtractPropTypes<typeof videoPreviewProps>

export type VideoPreviewExpose = {
  // 打开弹框
  open: (video: PreviewVideo) => void
  // 关闭弹框
  close: () => void
}

export type VideoPreviewInstance = ComponentPublicInstance<VideoPreviewExpose, VideoPreviewProps>
