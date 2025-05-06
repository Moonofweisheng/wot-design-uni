import { mount } from '@vue/test-utils'
import WdCellGroup from '@/uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.vue'
import WdCell from '@/uni_modules/wot-design-uni/components/wd-cell/wd-cell.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { pause } from '@/uni_modules/wot-design-uni/components/common/util'

describe('WdCellGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('测试基本渲染 - 默认属性', () => {
    const wrapper = mount(WdCellGroup)

    expect(wrapper.classes()).toContain('wd-cell-group')
    expect(wrapper.classes()).not.toContain('is-border') // 默认无边框
  })

  // 测试标题
  test('测试标题渲染', () => {
    const title = '分组标题'

    const wrapper = mount(WdCellGroup, {
      props: { title }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
    expect(wrapper.find('.wd-cell-group__left').text()).toBe(title)
  })

  // 测试值
  test('测试值渲染', () => {
    const value = '内容'

    const wrapper = mount(WdCellGroup, {
      props: { value }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
    expect(wrapper.find('.wd-cell-group__right').text()).toBe(value)
  })

  // 测试标题和值同时存在
  test('测试同时渲染标题和值', () => {
    const title = '分组标题'
    const value = '内容'

    const wrapper = mount(WdCellGroup, {
      props: { title, value }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
    expect(wrapper.find('.wd-cell-group__left').text()).toBe(title)
    expect(wrapper.find('.wd-cell-group__right').text()).toBe(value)
  })

  // 测试使用插槽
  test('测试 useSlot 属性', () => {
    const wrapper = mount(WdCellGroup, {
      props: { useSlot: true }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
  })

  // 测试插槽内容
  test('测试默认插槽内容', () => {
    const wrapper = mount(WdCellGroup, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      }
    })

    expect(wrapper.find('.wd-cell-group__body').exists()).toBe(true)
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  // 测试自定义标题插槽
  test('测试自定义标题插槽', () => {
    const wrapper = mount(WdCellGroup, {
      props: { useSlot: true },
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
    expect(wrapper.find('.wd-cell-group__left').exists()).toBe(true)
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  // 测试自定义值插槽
  test('测试自定义值插槽', () => {
    const wrapper = mount(WdCellGroup, {
      props: { useSlot: true },
      slots: {
        value: '<div class="custom-value">自定义值</div>'
      }
    })

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(true)
    expect(wrapper.find('.wd-cell-group__right').exists()).toBe(true)
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  // 测试标题插槽优先级
  test('测试标题插槽优先级高于 title 属性', () => {
    const title = '分组标题'

    const wrapper = mount(WdCellGroup, {
      props: { title },
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })

    expect(wrapper.find('.wd-cell-group__left').text()).not.toBe(title)
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  // 测试值插槽优先级
  test('测试值插槽优先级高于 value 属性', () => {
    const value = '内容'

    const wrapper = mount(WdCellGroup, {
      props: { value },
      slots: {
        value: '<div class="custom-value">自定义值</div>'
      }
    })

    expect(wrapper.find('.wd-cell-group__right').text()).not.toBe(value)
    expect(wrapper.find('.custom-value').exists()).toBe(true)
  })

  // 测试边框
  test('测试带边框渲染', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: true }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试无边框
  test('测试无边框渲染', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: false }
    })

    expect(wrapper.classes()).not.toContain('is-border')
  })

  // 测试自定义类名
  test('测试应用自定义类名', () => {
    const customClass = 'custom-group'

    const wrapper = mount(WdCellGroup, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('测试应用自定义样式', () => {
    const customStyle = 'background: yellow;'

    const wrapper = mount(WdCellGroup, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试不显示标题区域
  test('测试无标题、值或 useSlot 时不渲染标题区域', () => {
    const wrapper = mount(WdCellGroup)

    expect(wrapper.find('.wd-cell-group__title').exists()).toBe(false)
  })

  // --- Border Inheritance Tests ---

  test('测试单元格默认继承分组边框', async () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: true },
      slots: {
        default: `<wd-cell title="Test Cell1" />
        <wd-cell title="Test Cell2" />`
      },
      global: {
        components: {
          WdCell
        }
      }
    })
    await pause(100)
    const cellWrapper = wrapper.findAllComponents(WdCell)
    expect(cellWrapper[1].classes()).toContain('is-border')
  })

  test('测试分组无边框时单元格不继承边框', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: false }, // Group has no border
      slots: {
        default: '<wd-cell title="Test Cell" />'
      },
      global: {
        components: {
          WdCell
        }
      }
    })
    const cellWrapper = wrapper.findComponent(WdCell)
    expect(cellWrapper.classes()).not.toContain('is-border')
  })

  test('测试单元格边框覆盖分组边框 (单元格=false, 分组=true)', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: true }, // Group has border
      slots: {
        default: '<wd-cell title="Test Cell" :border="false" />' // Cell explicitly sets no border
      },
      global: {
        components: {
          WdCell
        }
      }
    })
    const cellWrapper = wrapper.findComponent(WdCell)
    expect(cellWrapper.classes()).not.toContain('is-border')
  })

  test('测试单元格边框覆盖分组边框 (单元格=true, 分组=false)', () => {
    const wrapper = mount(WdCellGroup, {
      props: { border: false }, // Group has no border
      slots: {
        default: '<wd-cell title="Test Cell" :border="true" />' // Cell explicitly sets border
      },
      global: {
        components: {
          WdCell
        }
      }
    })
    const cellWrapper = wrapper.findComponent(WdCell)
    expect(cellWrapper.classes()).toContain('is-border')
  })
})
