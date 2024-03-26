import { provide, ref } from 'vue'
import type { MediaPreview, MediaPreviewProps } from './types'
import { deepMerge } from '../common/util'

/**
 * usePreview 用到的key
 *
 * @internal
 */
export const previewDefaultOptionKey = '__PREVIEW_OPTION__'

// 默认模板
export const defaultOptions: MediaPreviewProps = {}

export function usePreview(selector: string = ''): MediaPreview {
  const previewOption = ref<MediaPreviewProps>(defaultOptions) // Toast选项
  const previewOptionKey = selector ? previewDefaultOptionKey + selector : previewDefaultOptionKey
  provide(previewOptionKey, previewOption)

  const show = (option: MediaPreviewProps | string) => {
    const options = deepMerge(defaultOptions, typeof option === 'string' ? { list: [option], current: 0 } : option)
    previewOption.value = deepMerge(options, {
      show: true
    })
  }

  const close = () => {
    previewOption.value.show = false
  }
  return {
    show,
    close
  }
}
