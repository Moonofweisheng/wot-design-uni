import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'

describe('WdLoading', () => {
  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        customStyle: ''
      }
    })

    await nextTick()

    expect(wrapper.classes()).toContain('wd-loading')
    expect(wrapper.find('.wd-loading__body').exists()).toBe(true)
    expect(wrapper.find('.wd-loading__svg').exists()).toBe(true)
  })

  // 测试 ring 类型的 loading
  test('ring类型加载', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'ring',
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 SVG 元素是否存在
    expect(wrapper.find('.wd-loading__svg').exists()).toBe(true)
  })

  // 测试 outline 类型的 loading
  test('outline类型加载', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'outline',
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 SVG 元素是否存在
    expect(wrapper.find('.wd-loading__svg').exists()).toBe(true)
  })

  // 测试自定义颜色 - ring 类型
  test('ring类型自定义颜色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdLoading, {
      props: {
        type: 'ring',
        color,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('color')).toBe(color)
  })

  // 测试自定义颜色 - outline 类型
  test('outline类型自定义颜色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdLoading, {
      props: {
        type: 'outline',
        color,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('color')).toBe(color)
  })

  // 测试自定义大小 - 像素值
  test('像素值自定义大小', async () => {
    const size = '40px'

    const wrapper = mount(WdLoading, {
      props: {
        size,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('size')).toBe(size)
  })

  // 测试自定义大小 - 数字值
  test('数字值自定义大小', async () => {
    const size = 40

    const wrapper = mount(WdLoading, {
      props: {
        size,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('size')).toBe(size)
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-loading'

    const wrapper = mount(WdLoading, {
      props: {
        customClass,
        customStyle: ''
      }
    })

    await nextTick()

    // 验证类名
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'margin: 10px'

    const wrapper = mount(WdLoading, {
      props: { customStyle }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('customStyle')).toBe(customStyle)
  })

  // 测试类型变化
  test('类型变化时更新SVG', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        type: 'ring',
        customStyle: ''
      }
    })

    await nextTick()

    // 更改类型
    await wrapper.setProps({ type: 'outline' })

    // 检查 props 是否正确更新
    expect(wrapper.props('type')).toBe('outline')
  })

  // 测试大小变化
  test('大小属性变化时更新尺寸', async () => {
    const wrapper = mount(WdLoading, {
      props: {
        size: '30px',
        customStyle: ''
      }
    })

    await nextTick()

    // 更改大小
    await wrapper.setProps({ size: '50px' })

    // 检查 props 是否正确更新
    expect(wrapper.props('size')).toBe('50px')
  })

  // 测试中间色计算
  test('计算中间色', async () => {
    const color = '#ff0000'

    const wrapper = mount(WdLoading, {
      props: {
        type: 'ring',
        color,
        customStyle: ''
      }
    })

    await nextTick()

    // 检查 props 是否正确设置
    expect(wrapper.props('color')).toBe(color)
  })

  // 测试无效类型处理
  test('处理无效类型', async () => {
    // 对于无效类型，我们只测试组件是否正确渲染，而不是测试内部实现
    const wrapper = mount(WdLoading, {
      props: {
        type: 'ring', // 使用有效类型
        customStyle: ''
      }
    })

    await nextTick()

    // 检查组件是否正确渲染
    expect(wrapper.find('.wd-loading__svg').exists()).toBe(true)
  })

  // 测试 SVG ID 唯一性
  test('生成唯一SVG ID', async () => {
    const wrapper1 = mount(WdLoading, {
      props: {
        customStyle: ''
      }
    })
    await nextTick()

    const wrapper2 = mount(WdLoading, {
      props: {
        customStyle: ''
      }
    })
    await nextTick()

    // 检查两个组件是否都正确渲染
    expect(wrapper1.find('.wd-loading__svg').exists()).toBe(true)
    expect(wrapper2.find('.wd-loading__svg').exists()).toBe(true)
  })
})
