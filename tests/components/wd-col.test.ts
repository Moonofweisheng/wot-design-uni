import { mount } from '@vue/test-utils'
import WdCol from '@/uni_modules/wot-design-uni/components/wd-col/wd-col.vue'
import { describe, test, expect } from 'vitest'

describe('WdCol', () => {
  // 测试基本渲染
  test('renders col with default props', () => {
    const wrapper = mount(WdCol)
    expect(wrapper.classes()).toContain('wd-col')
  })

  // 测试栅格占据的列数
  test('renders with span', () => {
    const span = 12
    const wrapper = mount(WdCol, {
      props: { span }
    })
    expect(wrapper.classes()).toContain(`wd-col-${span}`)
  })

  // 测试栅格左侧的间隔格数
  test('renders with offset', () => {
    const offset = 4
    const wrapper = mount(WdCol, {
      props: { offset }
    })
    expect(wrapper.classes()).toContain(`wd-col-offset-${offset}`)
  })

  // 测试响应式布局 - xs
  test('renders with xs breakpoint', () => {
    const xs = 24
    const wrapper = mount(WdCol, {
      props: { xs }
    })
    expect(wrapper.classes()).toContain(`wd-col-xs-${xs}`)
  })

  // 测试响应式布局 - sm
  test('renders with sm breakpoint', () => {
    const sm = 12
    const wrapper = mount(WdCol, {
      props: { sm }
    })
    expect(wrapper.classes()).toContain(`wd-col-sm-${sm}`)
  })

  // 测试响应式布局 - md
  test('renders with md breakpoint', () => {
    const md = 8
    const wrapper = mount(WdCol, {
      props: { md }
    })
    expect(wrapper.classes()).toContain(`wd-col-md-${md}`)
  })

  // 测试响应式布局 - lg
  test('renders with lg breakpoint', () => {
    const lg = 6
    const wrapper = mount(WdCol, {
      props: { lg }
    })
    expect(wrapper.classes()).toContain(`wd-col-lg-${lg}`)
  })

  // 测试响应式布局 - xl
  test('renders with xl breakpoint', () => {
    const xl = 4
    const wrapper = mount(WdCol, {
      props: { xl }
    })
    expect(wrapper.classes()).toContain(`wd-col-xl-${xl}`)
  })

  // 测试响应式偏移
  test('renders with responsive offset', () => {
    const wrapper = mount(WdCol, {
      props: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 2 }
      }
    })
    expect(wrapper.classes()).toContain('wd-col-xs-24')
    expect(wrapper.classes()).toContain('wd-col-xs-offset-0')
    expect(wrapper.classes()).toContain('wd-col-sm-12')
    expect(wrapper.classes()).toContain('wd-col-sm-offset-2')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-col'
    const wrapper = mount(WdCol, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'background: #f5f5f5;'
    const wrapper = mount(WdCol, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试默认插槽
  test('renders default slot content', () => {
    const wrapper = mount(WdCol, {
      slots: {
        default: '<div class="test-content">列内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // 测试组合使用各种属性
  test('renders with combined props', () => {
    const wrapper = mount(WdCol, {
      props: {
        span: 12,
        offset: 2,
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 2 },
        customStyle: 'margin: 10px;'
      }
    })
    expect(wrapper.classes()).toContain('wd-col-12')
    expect(wrapper.classes()).toContain('wd-col-offset-2')
    expect(wrapper.classes()).toContain('wd-col-xs-24')
    expect(wrapper.classes()).toContain('wd-col-xs-offset-0')
    expect(wrapper.classes()).toContain('wd-col-sm-12')
    expect(wrapper.classes()).toContain('wd-col-sm-offset-2')
    expect(wrapper.attributes('style')).toContain('margin: 10px;')
  })
})
