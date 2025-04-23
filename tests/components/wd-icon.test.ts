import { mount } from '@vue/test-utils'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, test, expect } from 'vitest'

describe('WdIcon', () => {
  // 测试基本渲染
  test('renders icon with default props', () => {
    const wrapper = mount(WdIcon, {
      props: { name: 'add' }
    })
    expect(wrapper.classes()).toContain('wd-icon')
  })

  // 测试不同的图标名称
  test('renders different icon names', () => {
    const name = 'add'
    const wrapper = mount(WdIcon, {
      props: { name }
    })
    expect(wrapper.classes()).toContain(`wd-icon-${name}`)
  })

  // 测试不同的大小
  test('renders different sizes', () => {
    const size = '20px'
    const wrapper = mount(WdIcon, {
      props: { size, name: 'add' }
    })
    expect(wrapper.attributes('style')).toContain(`font-size: ${size}`)
  })

  // 测试不同的颜色
  test('renders different colors', () => {
    const color = 'red'
    const wrapper = mount(WdIcon, {
      props: { color, name: 'add' }
    })
    expect(wrapper.attributes('style')).toContain(`color: ${color}`)
  })

  // 测试点击事件
  test('emits click event', async () => {
    const wrapper = mount(WdIcon, {
      props: { name: 'add' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-icon'
    const wrapper = mount(WdIcon, {
      props: { customClass, name: 'add' }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'margin: 8px'
    const wrapper = mount(WdIcon, {
      props: { customStyle, name: 'add' }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试图片图标
  test('renders image icon', () => {
    const imgUrl = 'https://example.com/icon.png'
    const wrapper = mount(WdIcon, {
      props: { name: imgUrl }
    })
    const imgElement = wrapper.find('img')
    expect(imgElement.exists()).toBe(true)
    expect(imgElement.attributes('src')).toBe(imgUrl)
  })
})
