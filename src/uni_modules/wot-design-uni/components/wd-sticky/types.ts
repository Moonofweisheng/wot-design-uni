import { baseProps, makeNumberProp } from '../common/props'

export const stickyProps = {
  ...baseProps,
  zIndex: makeNumberProp(1), // 使用 makeNumberProp 工具函数
  offsetTop: makeNumberProp(0) // 使用 makeNumberProp 工具函数
}
