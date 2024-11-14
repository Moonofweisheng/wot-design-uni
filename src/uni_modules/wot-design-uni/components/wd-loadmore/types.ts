import type { PropType } from 'vue'
import { baseProps } from '../common/props'
import type { LoadingProps } from '../wd-loading/types'

export type LoadMoreState = 'loading' | 'error' | 'finished'

export const loadmoreProps = {
  ...baseProps,
  /**
   * 加载状态，可选值：'loading' | 'error' | 'finished'
   */
  state: String as PropType<LoadMoreState>,
  /**
   * 加载提示文案
   */
  loadingText: String,
  /**
   * 全部加载完的提示文案
   */
  finishedText: String,
  /**
   * 加载失败的提示文案
   */
  errorText: String,
  /**
   * 加载中loading组件的属性
   * 参考loading组件
   */
  loadingProps: Object as PropType<Partial<LoadingProps>>
}
