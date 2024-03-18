import { baseProps, makeBooleanProp, makeNumberProp, makeRequiredProp } from '../common/props'

export const paginationProps = {
  ...baseProps,
  /**
   * 当前页
   */
  modelValue: makeRequiredProp(Number),
  /**
   * 总页数，如果有total，则优先使用total计算页数
   */
  totalPage: makeNumberProp(1),
  /**
   * 是否展示分页为Icon图标
   */
  showIcon: makeBooleanProp(false),
  /**
   * 是否展示总条数
   */
  showMessage: makeBooleanProp(false),
  /**
   * 总条数
   */
  total: makeNumberProp(0),
  /**
   * 每页条数
   */
  pageSize: makeNumberProp(10),
  /**
   * 上一页文本
   */
  prevText: String,
  /**
   * 下一页文本
   */
  nextText: String,
  /**
   * 总页数只有一页时是否隐藏
   */
  hideIfOnePage: makeBooleanProp(true)
}
