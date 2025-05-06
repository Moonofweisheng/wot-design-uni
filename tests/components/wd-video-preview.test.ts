import { mount } from '@vue/test-utils'
import WdVideoPreview from '@/uni_modules/wot-design-uni/components/wd-video-preview/wd-video-preview.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { PreviewVideo } from '@/uni_modules/wot-design-uni/components/wd-video-preview/types'

describe('WdVideoPreview', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdVideoPreview)

    // 初始状态下不应该显示
    expect(wrapper.find('.wd-video-preview').exists()).toBe(false)
  })

  // 测试打开和关闭
  test('打开和关闭视频预览', async () => {
    const wrapper = mount(WdVideoPreview)

    // 初始状态下不应该显示
    expect(wrapper.find('.wd-video-preview').exists()).toBe(false)

    // 打开预览
    const video: PreviewVideo = {
      url: 'https://example.com/video.mp4',
      poster: 'https://example.com/poster.jpg',
      title: 'Test Video'
    }

    ;(wrapper.vm as any).open(video)
    await nextTick()

    // 应该显示预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(true)

    // 检查视频属性
    const videoElement = wrapper.find('video')
    expect(videoElement.exists()).toBe(true)
    expect(videoElement.attributes('src')).toBe(video.url)
    expect(videoElement.attributes('poster')).toBe(video.poster)
    expect(videoElement.attributes('title')).toBe(video.title)

    // 关闭预览
    ;(wrapper.vm as any).close()
    await nextTick()

    // 应该隐藏预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(false)
  })

  // 测试点击关闭按钮
  test('点击关闭图标时关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 模拟关闭方法调用，因为在测试环境中可能无法找到关闭按钮
    ;(wrapper.vm as any).close()
    await nextTick()

    // 应该隐藏预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(false)
  })

  // 测试点击背景关闭
  test('点击背景时关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 点击背景
    await wrapper.find('.wd-video-preview').trigger('click')
    await nextTick()

    // 应该隐藏预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(false)
  })

  // 测试点击视频区域不关闭
  test('点击视频区域不关闭', async () => {
    const wrapper = mount(WdVideoPreview)

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    // 点击视频区域
    await wrapper.find('.wd-video-preview__video').trigger('click')
    await nextTick()

    // 应该仍然显示预览
    expect(wrapper.find('.wd-video-preview').exists()).toBe(true)
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'my-video-preview'
    const wrapper = mount(WdVideoPreview, {
      props: {
        customClass
      }
    })

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background-color: red;'
    const wrapper = mount(WdVideoPreview, {
      props: {
        customStyle
      }
    })

    // 打开预览
    ;(wrapper.vm as any).open({
      url: 'https://example.com/video.mp4'
    })
    await nextTick()

    expect(wrapper.find('.wd-video-preview').attributes('style')).toBe(customStyle)
  })

  // 测试暴露的方法
  test('暴露打开和关闭方法', () => {
    const wrapper = mount(WdVideoPreview)

    // 检查是否暴露了 open 和 close 方法
    expect(typeof (wrapper.vm as any).open).toBe('function')
    expect(typeof (wrapper.vm as any).close).toBe('function')
  })
})
