import type { ExtractPropTypes, ComponentPublicInstance } from 'vue'
import { baseProps, makeBooleanProp, makeNumericProp, makeStringProp } from '../common/props'

export type PuzzleCaptchaShape = 'puzzle' | 'shield' | 'rect' | 'triangle'

export type PuzzleCaptchaStatus = 'loading' | 'error' | 'pending' | 'dragging' | 'verifying' | 'success' | 'fail'

export type PuzzleCaptchaTrackItem = {
  type: 'down' | 'move' | 'up'
  x: number
  y: number
  t: number
}

export const puzzleCaptchaProps = {
  ...baseProps,
  /**
   * 标题
   * @default '安全验证'
   */
  title: String,
  /**
   * 操作提示
   * @default '拖动下方滑块完成拼图'
   */
  placeholder: String,
  /**
   * 背景图片
   */
  imageUrl: {
    type: String,
    required: true
  },
  /**
   * 背景图片宽度(单位:px)
   * @default 300
   */
  imageWidth: makeNumericProp(320),
  /**
   * 背景图片高度(单位:px)
   * @default 200
   */
  imageHeight: makeNumericProp(200),
  /**
   * 拼图块形状
   * @default 'puzzle'
   */
  puzzleShape: makeStringProp<PuzzleCaptchaShape>('puzzle'),
  /**
   * 拼图块宽度(单位:px)
   * @default 60
   */
  puzzleWidth: makeNumericProp(40),
  /**
   * 拼图块高度(单位:px)
   * @default 60
   */
  puzzleHeight: makeNumericProp(40),
  /**
   * 是否为加载状态
   * @default false
   */
  loading: makeBooleanProp(false),
  /**
   * 容错范围(单位:px)
   * @default 6
   */
  tolerance: makeNumericProp(6),
  /**
   * 是否启用严格模式
   * @default false
   */
  strictMode: makeBooleanProp(false),
  /**
   * 是否启用干扰缺口
   * @default false
   */
  decoyMode: makeBooleanProp(false),
  /**
   * 重试次数，超过重试次数后将会触发背景图片更新
   * @default 3
   */
  retryCount: makeNumericProp(3),
  /**
   * 是否禁用
   * @default false
   */
  disabled: makeBooleanProp(false),
  /**
   * 是否显示刷新按钮
   * @default false
   */
  refreshable: makeBooleanProp(false),
  /**
   * 是否显示关闭按钮
   * @default false
   */
  closable: makeBooleanProp(false),
  /**
   * 滑块图标
   * @default 'a-chevron-rightdouble'
   */
  trackerIcon: makeStringProp('a-chevron-rightdouble'),
  /**
   * 成功图标
   * @default 'check'
   */
  successIcon: makeStringProp('check'),
  /**
   * 验证成功提示
   * @default '验证成功'
   */
  successText: String,
  /**
   * 验证失败提示
   * @default '验证失败，请重试'
   */
  failText: String
}

export type PuzzleCaptchaProps = ExtractPropTypes<typeof puzzleCaptchaProps>

export type PuzzleCaptchaExpose = {
  /**
   * 重置验证组件到初始状态
   * @param update 是否更新背景图片
   */
  reset: (update?: boolean) => void
}

export type PuzzleCaptchaInstance = ComponentPublicInstance<PuzzleCaptchaProps, PuzzleCaptchaExpose>
