import type { ExtractPropTypes } from 'vue'
import { baseProps, makeBooleanProp, makeRequiredProp, makeStringProp } from '../common/props'

export const countDownProps = {
  ...baseProps,
  // 倒计时时长，单位毫秒
  time: makeRequiredProp(Number),
  // 是否开启毫秒
  millisecond: makeBooleanProp(false),
  // 格式化时间
  format: makeStringProp('HH:mm:ss'),
  // 是否自动开始
  autoStart: makeBooleanProp(true)
}

export type CountDownProps = ExtractPropTypes<typeof countDownProps>
