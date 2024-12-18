import { getCurrentInstance, ref } from 'vue'
import { getRect, isObj } from '../common/util'

export function usePopover(visibleArrow = true) {
  const { proxy } = getCurrentInstance() as any
  const popStyle = ref<string>('')
  const arrowStyle = ref<string>('')
  const showStyle = ref<string>('')
  const arrowClass = ref<string>('')
  const popWidth = ref<number>(0)
  const popHeight = ref<number>(0)
  const left = ref<number>(0)
  const bottom = ref<number>(0)
  const width = ref<number>(0)
  const height = ref<number>(0)
  const top = ref<number>(0)

  function noop() {}

  function init(
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end',
    visibleArrow: boolean,
    selector: string
  ) {
    // 初始化 class
    if (visibleArrow) {
      const arrowClassArr = [
        `wd-${selector}__arrow`,
        placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end' ? `wd-${selector}__arrow-up` : '',
        placement === 'left' || placement === 'left-start' || placement === 'left-end' ? `wd-${selector}__arrow-right` : '',
        placement === 'right' || placement === 'right-start' || placement === 'right-end' ? `wd-${selector}__arrow-left` : '',
        placement === 'top' || placement === 'top-start' || placement === 'top-end' ? `wd-${selector}__arrow-down` : ''
      ]
      arrowClass.value = arrowClassArr.join(' ')
    }

    // 初始化数据获取
    getRect('#target', false, proxy).then((rect) => {
      if (!rect) return
      left.value = rect.left as number
      bottom.value = rect.bottom as number
      width.value = rect.width as number
      height.value = rect.height as number
      top.value = rect.top as number
    })
    // 用透明度可在初始化时获取到pop尺寸
    getRect('#pos', false, proxy).then((rect) => {
      if (!rect) return
      popWidth.value = rect.width as number
      popHeight.value = rect.height as number
    })
  }

  function control(
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end',
    offset: number | number[] | Record<'x' | 'y', number>
  ) {
    // arrow size
    const arrowSize = visibleArrow ? 9 : 0
    // 上下位（纵轴）对应的距离左边的距离
    const verticalX = width.value / 2
    // 上下位（纵轴）对应的距离底部的距离
    const verticalY = arrowSize + height.value + 5
    // 左右位（横轴）对应的距离左边的距离
    const horizontalX = width.value + arrowSize + 5
    // 左右位（横轴）对应的距离底部的距离
    const horizontalY = height.value / 2

    let offsetX = 0
    let offsetY = 0
    if (Array.isArray(offset)) {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset[0]
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + (offset[1] ? offset[1] : offset[0])
    } else if (isObj(offset)) {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset.x
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset.y
    } else {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset
    }
    // const offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset
    // const offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset

    const placements = new Map([
      // 上
      ['top', [`left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']],
      [
        'top-start',
        [
          `left: ${offsetX}px; bottom: ${verticalY}px;`,
          `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;`
        ]
      ],
      [
        'top-end',
        [
          `right: ${offsetX}px; bottom: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],
      // 下
      ['bottom', [`left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']],
      [
        'bottom-start',
        [`left: ${offsetX}px; top: ${verticalY}px;`, `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;`]
      ],
      [
        'bottom-end',
        [
          `right: ${offsetX}px; top: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],
      // 左
      ['left', [`right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']],
      [
        'left-start',
        [
          `right: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        'left-end',
        [
          `right: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ],
      // 右
      ['right', [`left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']],
      [
        'right-start',
        [
          `left: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        'right-end',
        [
          `left: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ]
    ])
    popStyle.value = placements.get(placement)![0]
    arrowStyle.value = placements.get(placement)![1]
  }

  return { popStyle, arrowStyle, showStyle, arrowClass, init, control, noop }
}
