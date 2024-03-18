import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'

export const paginationProps = {
  ...baseProps,
  modelValue: makeRequiredProp(Number), // 当前页
  totalPage: makeNumberProp(1),
  showIcon: makeBooleanProp(false), // 是否展示分页为Icon图标
  showMessage: makeBooleanProp(false),
  total: makeNumberProp(0),
  pageSize: makeNumberProp(10),
  prevText: String,
  nextText: String,
  hideIfOnePage: makeBooleanProp(true)
}
