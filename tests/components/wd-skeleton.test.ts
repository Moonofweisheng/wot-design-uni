import { mount } from '@vue/test-utils'
import WdSkeleton from '@/uni_modules/wot-design-uni/components/wd-skeleton/wd-skeleton.vue'
import { describe, test, expect } from 'vitest'
import type { SkeletonRowCol, SkeletonTheme } from '@/uni_modules/wot-design-uni/components/wd-skeleton/types'

describe('WdSkeleton', () => {
  // 测试基本渲染
  test('renders skeleton with default props', () => {
    const wrapper = mount(WdSkeleton)
    expect(wrapper.classes()).toContain('wd-skeleton')
  })

  // 测试加载状态
  test('renders with loading prop', () => {
    const wrapper = mount(WdSkeleton, {
      props: { loading: true }
    })
    expect(wrapper.find('.wd-skeleton__content').exists()).toBe(true)
  })

  // 测试动画效果
  test('renders with animation', () => {
    const wrapper = mount(WdSkeleton, {
      props: { animation: 'gradient' }
    })
    expect(wrapper.find('.wd-skeleton--animation-gradient').exists()).toBe(true)
  })

  // 测试自定义行数
  test('renders custom rows', () => {
    const rows = 3
    const wrapper = mount(WdSkeleton, {
      props: { rows }
    })
    expect(wrapper.findAll('.wd-skeleton__row').length).toBe(rows)
  })

  // 测试自定义列配置
  test('renders custom row cols', () => {
    const rowCols: SkeletonRowCol[] = [1, [{ width: '100px', height: '20px' }]]
    const wrapper = mount(WdSkeleton, {
      props: { rowCols }
    })
    const rows = wrapper.findAll('.wd-skeleton__row')
    expect(rows.length).toBe(rowCols.length)
  })

  // 测试头像主题
  test('renders avatar theme', () => {
    const wrapper = mount(WdSkeleton, {
      props: { theme: 'avatar' }
    })
    expect(wrapper.find('.wd-skeleton--type-circle').exists()).toBe(true)
  })

  // 测试图片主题
  test('renders image theme', () => {
    const wrapper = mount(WdSkeleton, {
      props: { theme: 'image' }
    })
    expect(wrapper.find('.wd-skeleton--type-rect').exists()).toBe(true)
  })

  // 测试段落主题
  test('renders paragraph theme', () => {
    const wrapper = mount(WdSkeleton, {
      props: { theme: 'paragraph' }
    })
    expect(wrapper.findAll('.wd-skeleton__row').length).toBe(4)
  })

  // 测试加载完成状态
  test('renders loaded content', () => {
    const wrapper = mount(WdSkeleton, {
      props: { loading: false },
      slots: {
        default: '<div class="loaded-content">加载完成的内容</div>'
      }
    })
    expect(wrapper.find('.loaded-content').exists()).toBe(true)
    expect(wrapper.find('.wd-skeleton__content').exists()).toBe(false)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-skeleton'
    const wrapper = mount(WdSkeleton, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 16px;'
    const wrapper = mount(WdSkeleton, {
      props: { customStyle: { margin: '16px' } }
    })
    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试不同主题
  test('renders different themes', () => {
    const themes: SkeletonTheme[] = ['text', 'avatar', 'image', 'paragraph']
    themes.forEach((theme) => {
      const wrapper = mount(WdSkeleton, {
        props: { theme }
      })
      expect(wrapper.find('.wd-skeleton__row').exists()).toBe(true)
    })
  })

  // 测试闪烁动画效果
  test('renders with flashed animation', () => {
    const wrapper = mount(WdSkeleton, {
      props: { animation: 'flashed' }
    })
    expect(wrapper.find('.wd-skeleton--animation-flashed').exists()).toBe(true)
  })
})
