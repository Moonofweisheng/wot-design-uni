import { mount } from '@vue/test-utils'
import WdTooltip from '@/uni_modules/wot-design-uni/components/wd-tooltip/wd-tooltip.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { PlacementType } from '@/uni_modules/wot-design-uni/components/wd-tooltip/types'

describe('WdTooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdTooltip, {
      props: {
        content: 'Tooltip content'
      },
      slots: {
        default: '<button>Hover me</button>'
      }
    })
    expect(wrapper.classes()).toContain('wd-tooltip')
    expect(wrapper.find('.wd-tooltip__target').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  // 测试内容渲染
  test('内容渲染', () => {
    const content = 'Tooltip content'
    const wrapper = mount(WdTooltip, {
      props: {
        content,
        modelValue: true
      },
      slots: {
        default: '<button>Hover me</button>'
      }
    })
    expect(wrapper.find('.wd-tooltip__inner').text()).toBe(content)
  })

  // 测试自定义内容插槽
  test('内容插槽', () => {
    const wrapper = mount(WdTooltip, {
      props: {
        useContentSlot: true,
        modelValue: true
      },
      slots: {
        default: '<button>Hover me</button>',
        content: '<div class="custom-content">Custom content</div>'
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
  })

  // 测试不同的位置
  test('不同位置', async () => {
    const placements: PlacementType[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end'
    ]

    for (const placement of placements) {
      const wrapper = mount(WdTooltip, {
        props: {
          content: 'Tooltip content',
          placement,
          modelValue: true
        },
        slots: {
          default: '<button>Hover me</button>'
        }
      })

      // 检查位置
      expect(wrapper.props('placement')).toBe(placement)
    }
  })

  // 测试点击事件
  test('点击事件', async () => {
    const wrapper = mount(WdTooltip, {
      props: {
        content: 'Tooltip content',
        modelValue: false
      },
      slots: {
        default: '<button>Hover me</button>'
      }
    })

    // 点击触发元素
    await wrapper.find('.wd-tooltip__target').trigger('click')

    // 应该触发 update:modelValue 事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue'][0]).toEqual([true])
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-tooltip'
    const wrapper = mount(WdTooltip, {
      props: {
        content: 'Tooltip content',
        customClass
      },
      slots: {
        default: '<button>Hover me</button>'
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'margin: 10px;'
    const wrapper = mount(WdTooltip, {
      props: {
        content: 'Tooltip content',
        customStyle
      },
      slots: {
        default: '<button>Hover me</button>'
      }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })
})
