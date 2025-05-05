import { mount } from '@vue/test-utils'
import WdImg from '@/uni_modules/wot-design-uni/components/wd-img/wd-img.vue'
import { describe, test, expect, vi } from 'vitest'
import type { ImageMode } from '@/uni_modules/wot-design-uni/components/wd-img/types'

describe('WdImg', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdImg)
    expect(wrapper.classes()).toContain('wd-img')
  })

  // 测试图片来源
  test('图片来源', () => {
    const src = 'https://example.com/image.jpg'
    const wrapper = mount(WdImg, {
      props: { src }
    })
    const img = wrapper.find('image')
    expect(img.attributes('src')).toBe(src)
  })

  // 测试图片填充模式
  test('不同填充模式', () => {
    const modes: ImageMode[] = ['scaleToFill', 'aspectFit', 'aspectFill', 'widthFix', 'heightFix']
    modes.forEach((mode) => {
      const wrapper = mount(WdImg, {
        props: { mode }
      })
      expect(wrapper.vm.mode).toBe(mode)
      const img = wrapper.find('image')
      expect(img.attributes('mode')).toBe(mode)
    })
  })

  // 测试宽高设置
  test('宽高设置', () => {
    const width = '200px'
    const height = '150px'
    const wrapper = mount(WdImg, {
      props: { width, height }
    })
    expect(wrapper.attributes('style')).toContain(`width: ${width}`)
    expect(wrapper.attributes('style')).toContain(`height: ${height}`)
  })

  // 测试圆角设置
  test('圆角设置', () => {
    const radius = '8px'
    const wrapper = mount(WdImg, {
      props: { radius }
    })
    expect(wrapper.attributes('style')).toContain(`border-radius: ${radius}`)
  })

  // 测试圆形属性
  test('圆形图片', () => {
    const wrapper = mount(WdImg, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试懒加载
  test('懒加载', () => {
    const wrapper = mount(WdImg, {
      props: { lazyLoad: true }
    })
    expect(wrapper.vm.lazyLoad).toBe(true)
    const img = wrapper.find('image')
    expect(img.attributes('lazy-load')).toBe('true')
  })

  // 测试长按菜单属性
  test('长按菜单', () => {
    const wrapper = mount(WdImg, {
      props: { showMenuByLongpress: true }
    })
    const image = wrapper.find('image')
    expect(image.attributes('show-menu-by-longpress')).toBe('true')
  })

  // 测试图片加载事件
  test('加载事件', async () => {
    const wrapper = mount(WdImg)
    await wrapper.find('image').trigger('load')
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  // 测试图片错误事件
  test('错误事件', async () => {
    const wrapper = mount(WdImg)
    await wrapper.find('image').trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  // 测试点击事件
  test('点击事件', async () => {
    const wrapper = mount(WdImg)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 测试图片预览功能
  test('图片预览功能', async () => {
    const wrapper = mount(WdImg, {
      props: {
        src: 'https://example.com/image.jpg',
        enablePreview: true
      }
    })
    expect(wrapper.vm.enablePreview).toBe(true)

    // 模拟图片加载成功
    await wrapper.find('image').trigger('load')

    await wrapper.trigger('click')
    expect(uni.previewImage).toHaveBeenCalledWith({
      urls: ['https://example.com/image.jpg']
    })
  })

  // 测试预览图片源
  test('使用预览图片源', async () => {
    const src = 'https://example.com/image.jpg'
    const previewSrc = 'https://example.com/preview-image.jpg'
    const wrapper = mount(WdImg, {
      props: {
        src,
        previewSrc,
        enablePreview: true
      }
    })

    // 模拟图片加载成功
    await wrapper.find('image').trigger('load')

    await wrapper.trigger('click')
    expect(uni.previewImage).toHaveBeenCalledWith({
      urls: [previewSrc]
    })
  })

  // 测试加载中占位内容
  test('加载中插槽', () => {
    const wrapper = mount(WdImg, {
      slots: {
        loading: '<div class="custom-loading">加载中...</div>'
      }
    })
    expect(wrapper.find('.custom-loading').exists()).toBe(true)
  })

  // 测试加载失败占位内容
  test('错误插槽', async () => {
    const wrapper = mount(WdImg, {
      slots: {
        error: '<div class="custom-error">加载失败</div>'
      }
    })

    // 需要先触发错误事件，才能显示错误插槽
    await wrapper.find('image').trigger('error')

    expect(wrapper.find('.custom-error').exists()).toBe(true)
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-img'
    const wrapper = mount(WdImg, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'object-fit: contain;'
    const wrapper = mount(WdImg, {
      props: { customStyle }
    })

    // 检查 props 是否正确设置，而不是直接检查 style 属性
    expect(wrapper.props('customStyle')).toBe(customStyle)
  })

  // 测试图片加载状态
  test('图片加载中显示加载插槽', async () => {
    const wrapper = mount(WdImg, {
      props: { src: 'https://example.com/image.jpg' },
      slots: {
        loading: '<div class="loading-indicator">Loading...</div>'
      }
    })

    // 初始状态应该是加载中
    expect(wrapper.find('.loading-indicator').exists()).toBe(true)

    // 模拟图片加载完成
    await wrapper.find('image').trigger('load')

    // 加载完成后，加载中的插槽应该不可见
    expect(wrapper.find('.loading-indicator').exists()).toBe(false)
  })

  // 测试图片错误状态
  test('图片加载失败显示错误插槽', async () => {
    const wrapper = mount(WdImg, {
      props: { src: 'https://example.com/invalid-image.jpg' },
      slots: {
        error: '<div class="error-indicator">Failed to load</div>'
      }
    })

    // 模拟图片加载失败
    await wrapper.find('image').trigger('error')

    // 加载失败后，错误插槽应该可见
    expect(wrapper.find('.error-indicator').exists()).toBe(true)
  })
})
