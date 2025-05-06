import { mount } from '@vue/test-utils'
import WdSegmented from '@/uni_modules/wot-design-uni/components/wd-segmented/wd-segmented.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

describe('分段器组件', () => {
  beforeEach(() => {
    // 模拟 createSelectorQuery 方法
    vi.spyOn(uni, 'createSelectorQuery').mockImplementation(() => {
      // 创建一个更简单但更健壮的 mock 对象
      let isSelectAll = false
      let boundingClientRectCallback: ((rect: any) => void) | null = null

      const mockQuery = {
        // 简化 in 方法，直接返回 mockQuery 自身
        in: vi.fn(() => {
          return mockQuery
        }),

        select: vi.fn((_) => {
          // 忽略选择器，只设置 isSelectAll 标志
          isSelectAll = false
          return mockQuery
        }),

        selectAll: vi.fn((_) => {
          // 忽略选择器，只设置 isSelectAll 标志
          isSelectAll = true
          return mockQuery
        }),

        selectViewport: vi.fn(() => {
          // 忽略选择器，只设置 isSelectAll 标志
          isSelectAll = false
          return mockQuery
        }),

        boundingClientRect: vi.fn((callback) => {
          boundingClientRectCallback = callback
          return mockQuery
        }),

        exec: vi.fn(() => {
          // 为所有查询返回固定的模拟数据
          // 这样无论是什么选择器，都能返回有效的数据
          const mockRects = Array(3)
            .fill(0)
            .map((_, index) => ({
              id: `item-${index}`,
              dataset: {},
              width: 100,
              height: 40,
              top: 0,
              left: index * 100,
              right: (index + 1) * 100,
              bottom: 40
            }))

          // 调用回调函数
          if (boundingClientRectCallback) {
            if (isSelectAll) {
              boundingClientRectCallback(mockRects)
            } else {
              boundingClientRectCallback(mockRects[0])
            }
          }

          return Promise.resolve(isSelectAll ? [mockRects] : [mockRects[0]])
        })
      }

      return mockQuery as any
    })

    // 确保 uni.vibrateShort 是一个函数
    if (typeof uni.vibrateShort !== 'function') {
      uni.vibrateShort = vi.fn()
    }
  })
  // 测试基本渲染
  test('使用默认属性渲染分段器', async () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2', 'option3']
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('wd-segmented')
    expect(wrapper.findAll('.wd-segmented__item').length).toBe(3)
  })

  // 测试选中项
  test('高亮显示激活项', async () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option2',
        options: ['option1', 'option2', 'option3']
      }
    })

    await nextTick()

    // 检查选中项
    const items = wrapper.findAll('.wd-segmented__item')
    expect(items[1].classes()).toContain('is-active')
  })

  // 测试点击事件
  test('点击项目时触发事件', async () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2', 'option3']
      }
    })

    // 点击第二个选项
    await wrapper.findAll('.wd-segmented__item')[1].trigger('click')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:value']).toBeTruthy()
    expect(emitted['update:value'][0]).toEqual(['option2'])

    expect(emitted['change']).toBeTruthy()
    expect(emitted['change'][0][0]).toEqual({ value: 'option2' })

    expect(emitted['click']).toBeTruthy()
    expect(emitted['click'][0][0]).toEqual({ value: 'option2' })
  })

  // 测试禁用状态
  test('禁用状态下禁用分段器', async () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2', 'option3'],
        disabled: true
      }
    })

    // 所有选项都应该被禁用
    wrapper.findAll('.wd-segmented__item').forEach((item) => {
      expect(item.classes()).toContain('is-disabled')
    })

    // 点击第二个选项不应该触发事件
    await wrapper.findAll('.wd-segmented__item')[1].trigger('click')
    expect(wrapper.emitted('update:value')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试单个选项禁用
  test('禁用单个项目', async () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: [{ value: 'option1' }, { value: 'option2', disabled: true }, { value: 'option3' }]
      }
    })
    // 只有第二个选项应该被禁用
    const items = wrapper.findAll('.wd-segmented__item')
    expect(items[0].classes()).not.toContain('is-disabled')
    expect(items[1].classes()).toContain('is-disabled')
    expect(items[2].classes()).not.toContain('is-disabled')

    // 点击第二个选项不应该触发事件
    await items[1].trigger('click')
    expect(wrapper.emitted('update:value')).toBeFalsy()

    // 点击第三个选项应该触发事件
    await items[2].trigger('click')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['update:value']).toBeTruthy()
    expect(emitted['update:value'][0]).toEqual(['option3'])
  })

  // 测试不同尺寸
  test('渲染不同尺寸', () => {
    const sizes = ['large', 'middle', 'small'] as const

    sizes.forEach((size) => {
      const wrapper = mount(WdSegmented, {
        props: {
          value: 'option1',
          options: ['option1', 'option2'],
          size
        }
      })

      expect(wrapper.find(`.wd-segmented__item.is-${size}`).exists()).toBe(true)
    })
  })

  // 测试自定义标签插槽
  test('渲染标签插槽', () => {
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2']
      },
      slots: {
        label: `<template #label="{ option }">
          <div class="custom-label">{{ option.value }}</div>
        </template>`
      }
    })

    expect(wrapper.findAll('.custom-label').length).toBe(2)
    expect(wrapper.findAll('.custom-label')[0].text()).toBe('option1')
    expect(wrapper.findAll('.custom-label')[1].text()).toBe('option2')
  })

  // 测试振动反馈
  test('启用振动反馈时触发振动', async () => {
    // 确保 uni.vibrateShort 是一个函数
    if (typeof uni.vibrateShort !== 'function') {
      uni.vibrateShort = vi.fn()
    }

    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2'],
        vibrateShort: true
      }
    })

    // 点击第二个选项
    await wrapper.findAll('.wd-segmented__item')[1].trigger('click')

    // 更新 value 属性
    await wrapper.setProps({ value: 'option2' })

    // 验证振动函数被调用
    expect(uni.vibrateShort).toHaveBeenCalled()
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'my-segmented'
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2'],
        customClass
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdSegmented, {
      props: {
        value: 'option1',
        options: ['option1', 'option2'],
        customStyle
      }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })
})
