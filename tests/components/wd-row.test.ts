import { mount } from '@vue/test-utils'
import WdRow from '@/uni_modules/wot-design-uni/components/wd-row/wd-row.vue'
import WdCol from '@/uni_modules/wot-design-uni/components/wd-col/wd-col.vue'
import { describe, test, expect } from 'vitest'

describe('WdRow', () => {
  // 测试基本渲染
  test('renders row with default props', () => {
    const wrapper = mount(WdRow)
    expect(wrapper.classes()).toContain('wd-row')
  })

  // 测试栅格间隔
  test('renders with gutter', () => {
    const gutter = 20
    const wrapper = mount(WdRow, {
      props: { gutter }
    })
    expect(wrapper.vm.gutter).toBe(gutter)
  })

  // 测试Flex布局
  test('renders with flex', () => {
    const wrapper = mount(WdRow, {
      props: { flex: true }
    })
    expect(wrapper.classes()).toContain('is-flex')
  })

  // 测试水平对齐方式
  test('renders with different justify', () => {
    const justifyOptions = ['start', 'end', 'center', 'space-around', 'space-between']
    justifyOptions.forEach((justify) => {
      const wrapper = mount(WdRow, {
        props: { justify }
      })
      expect(wrapper.classes()).toContain(`is-justify-${justify}`)
    })
  })

  // 测试垂直对齐方式
  test('renders with different align', () => {
    const alignOptions = ['top', 'middle', 'bottom']
    alignOptions.forEach((align) => {
      const wrapper = mount(WdRow, {
        props: { align }
      })
      expect(wrapper.classes()).toContain(`is-align-${align}`)
    })
  })

  // 测试配合Col使用
  test('works with col components', () => {
    const wrapper = mount({
      components: {
        WdRow,
        WdCol
      },
      template: `
        <wd-row :gutter="20">
          <wd-col :span="12">col-12</wd-col>
          <wd-col :span="12">col-12</wd-col>
        </wd-row>
      `
    })

    expect(wrapper.findAllComponents(WdCol)).toHaveLength(2)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-row'
    const wrapper = mount(WdRow, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin-bottom: 20px;'
    const wrapper = mount(WdRow, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试默认插槽
  test('renders default slot', () => {
    const wrapper = mount(WdRow, {
      slots: {
        default: '<div class="test-content">测试内容</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  // 测试间隔对子组件的影响
  test('applies gutter to child cols', () => {
    const wrapper = mount({
      components: {
        WdRow,
        WdCol
      },
      template: `
        <wd-row :gutter="20">
          <wd-col :span="12" />
          <wd-col :span="12" />
        </wd-row>
      `
    })

    const cols = wrapper.findAllComponents(WdCol)
    cols.forEach((col) => {
      expect(col.attributes('style')).toContain('padding-left: 10px')
      expect(col.attributes('style')).toContain('padding-right: 10px')
    })
  })

  // 测试响应式布局
  test('renders responsive layout', () => {
    const wrapper = mount({
      components: {
        WdRow,
        WdCol
      },
      template: `
        <wd-row>
          <wd-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" />
        </wd-row>
      `
    })

    const col = wrapper.findComponent(WdCol)
    expect(col.exists()).toBe(true)
  })
})
