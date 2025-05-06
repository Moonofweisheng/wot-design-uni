import { mount } from '@vue/test-utils'
import WdSwiperNav from '@/uni_modules/wot-design-uni/components/wd-swiper-nav/wd-swiper-nav.vue'
import { describe, test, expect } from 'vitest'
import type { DirectionType, IndicatorPositionType } from '@/uni_modules/wot-design-uni/components/wd-swiper/types'
import type { SwiperIndicatorType } from '@/uni_modules/wot-design-uni/components/wd-swiper-nav/types'

// 默认属性值
const defaultProps = {
  type: 'dots' as SwiperIndicatorType,
  direction: 'horizontal' as DirectionType,
  indicatorPosition: 'bottom' as IndicatorPositionType,
  current: 0,
  total: 5,
  minShowNum: 2,
  showControls: false
}

describe('轮播导航组件', () => {
  // 测试基本渲染
  test('使用默认属性渲染轮播导航', () => {
    const wrapper = mount(WdSwiperNav, {
      props: defaultProps
    })

    // 检查组件是否正确渲染
    const navElement = wrapper.find('.wd-swiper-nav')
    expect(navElement.exists()).toBe(true)
  })

  // 测试不同类型的指示器
  test('渲染不同类型的指示器', () => {
    const types: SwiperIndicatorType[] = ['dots', 'dots-bar', 'fraction']

    types.forEach((type) => {
      const wrapper = mount(WdSwiperNav, {
        props: {
          ...defaultProps,
          type
        }
      })

      // 检查组件是否正确渲染
      const navElement = wrapper.find(`.wd-swiper-nav--${type}`)
      expect(navElement.exists()).toBe(true)
    })
  })

  // 测试方向
  test('渲染不同方向的导航', () => {
    const directions: DirectionType[] = ['horizontal', 'vertical']

    directions.forEach((direction) => {
      const wrapper = mount(WdSwiperNav, {
        props: {
          ...defaultProps,
          direction
        }
      })

      // 检查组件是否正确渲染
      const navElement = wrapper.find(`.wd-swiper-nav--${direction}`)
      expect(navElement.exists()).toBe(true)
    })
  })

  // 测试位置
  test('渲染不同位置的导航', () => {
    // 注意：IndicatorPositionType 实际上包含更多选项，这里只测试基本的四个方向
    const positions: IndicatorPositionType[] = ['top', 'bottom', 'left', 'right']

    positions.forEach((position) => {
      const wrapper = mount(WdSwiperNav, {
        props: {
          ...defaultProps,
          indicatorPosition: position
        }
      })

      // 检查组件是否正确渲染
      const navElement = wrapper.find(`.wd-swiper-nav--${position}`)
      expect(navElement.exists()).toBe(true)
    })
  })

  // 测试控制按钮
  test('渲染带控制按钮的导航', () => {
    const wrapper = mount(WdSwiperNav, {
      props: {
        showControls: true,
        current: 0,
        total: 5
      }
    })
    expect(wrapper.find('.wd-swiper-nav__btn').exists()).toBe(true)
    expect(wrapper.find('.wd-swiper-nav__btn--prev').exists()).toBe(true)
    expect(wrapper.find('.wd-swiper-nav__btn--next').exists()).toBe(true)
  })

  // 测试点击事件
  test('点击按钮触发change事件', async () => {
    const wrapper = mount(WdSwiperNav, {
      props: {
        showControls: true,
        current: 0,
        total: 5
      }
    })

    // 点击上一个按钮
    await wrapper.find('.wd-swiper-nav__btn--prev').trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ dir: 'prev', source: 'nav' })

    // 点击下一个按钮
    await wrapper.find('.wd-swiper-nav__btn--next').trigger('click')
    expect(emitted['change'][1][0]).toEqual({ dir: 'next', source: 'nav' })
  })

  // 测试最小显示数量
  test('当总数小于最小显示数量时不渲染导航', () => {
    const wrapper = mount(WdSwiperNav, {
      props: {
        minShowNum: 5,
        current: 0,
        total: 3
      }
    })
    expect(wrapper.find('.wd-swiper-nav').exists()).toBe(false)
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'custom-nav'
    const wrapper = mount(WdSwiperNav, {
      props: {
        ...defaultProps,
        customClass
      }
    })

    // 检查组件是否正确渲染
    const navElement = wrapper.find(`.${customClass}`)
    expect(navElement.exists()).toBe(true)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdSwiperNav, {
      props: {
        ...defaultProps,
        customStyle
      }
    })

    // 检查组件是否正确渲染
    const navElement = wrapper.find('.wd-swiper-nav')
    expect(navElement.exists()).toBe(true)
    expect(navElement.attributes('style')).toBe(customStyle)
  })

  // 测试当前项高亮
  test('当前项高亮显示', () => {
    const current = 2
    const wrapper = mount(WdSwiperNav, {
      props: {
        ...defaultProps,
        current,
        type: 'dots' as SwiperIndicatorType
      }
    })

    // 检查当前项是否有激活类名
    const activeItem = wrapper.find('.is-active')
    expect(activeItem.exists()).toBe(true)

    // 检查是否只有一个激活项
    const activeItems = wrapper.findAll('.is-active')
    expect(activeItems.length).toBe(1)
  })

  // 测试分数类型的内容
  test('分数类型显示正确的页码', () => {
    const current = 2
    const total = 5
    const wrapper = mount(WdSwiperNav, {
      props: {
        ...defaultProps,
        current,
        total,
        type: 'fraction' as SwiperIndicatorType
      }
    })

    // 检查分数类型的内容是否正确
    const navElement = wrapper.find('.wd-swiper-nav')
    expect(navElement.text()).toBe(`${current + 1}/${total}`)
  })
})
