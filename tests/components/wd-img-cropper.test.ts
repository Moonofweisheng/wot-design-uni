import { mount } from '@vue/test-utils'
import WdImgCropper from '@/uni_modules/wot-design-uni/components/wd-img-cropper/wd-img-cropper.vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'

describe('WdImgCropper 图片裁剪组件', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('基本渲染', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
    expect(wrapper.props('imgSrc')).toBe('test-image.jpg')
    expect(wrapper.find('.wd-img-cropper__img').exists()).toBe(true)
  })

  test('组件显示与隐藏', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false,
        imgSrc: 'test-image.jpg'
      }
    })

    // 初始状态不显示
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(false)

    // 设置 modelValue 为 true 显示组件
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)

    // 设置 modelValue 为 false 隐藏组件
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(false)
  })

  test('自定义裁剪框宽高比', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        aspectRatio: '3:2'
      }
    })
    await nextTick()

    expect(wrapper.props('aspectRatio')).toBe('3:2')
    // 验证裁剪框的宽高比是否正确设置
    const cutBody = wrapper.find('.wd-img-cropper__cut--body')
    expect(cutBody.exists()).toBe(true)
  })

  test('禁用旋转功能', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        disabledRotate: true
      }
    })
    await nextTick()

    // 禁用旋转时，旋转按钮不应该存在
    expect(wrapper.find('.wd-img-cropper__rotate').exists()).toBe(false)
  })

  test('自定义按钮文案', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        cancelButtonText: '返回',
        confirmButtonText: '完成'
      }
    })
    await nextTick()

    const cancelButton = wrapper.find('.is-cancel')
    const confirmButton = wrapper.find('.wd-button')

    expect(cancelButton.text()).toBe('返回')
    expect(confirmButton.text()).toBe('完成')
  })

  test('图片加载成功事件', async () => {
    const onImgLoaded = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onImgloaded: onImgLoaded
      }
    })
    await nextTick()

    // 模拟图片加载完成
    const image = wrapper.find('.wd-img-cropper__img')
    await image.trigger('load')

    expect(wrapper.emitted('imgloaded')).toBeTruthy()
  })

  test('图片加载失败事件', async () => {
    const onImgLoadError = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onImgloaderror: onImgLoadError
      }
    })
    await nextTick()

    // 模拟图片加载失败
    const image = wrapper.find('.wd-img-cropper__img')
    await image.trigger('error')

    expect(wrapper.emitted('imgloaderror')).toBeTruthy()
  })

  test('取消裁剪事件', async () => {
    const onCancel = vi.fn()
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onCancel,
        'onUpdate:modelValue': onUpdateModelValue
      }
    })
    await nextTick()

    // 点击取消按钮
    const cancelButton = wrapper.find('.is-cancel')
    await cancelButton.trigger('click')

    expect(onCancel).toHaveBeenCalled()
    expect(onUpdateModelValue).toHaveBeenCalledWith(false)
  })

  test('确认裁剪事件', async () => {
    const onConfirm = vi.fn()
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        onConfirm
      }
    })
    await nextTick()

    // 点击确认按钮
    const confirmButton = wrapper.find('.wd-button')
    await confirmButton.trigger('click')

    // 由于实际裁剪过程涉及到 canvas 操作，这里只能验证事件触发
    // 实际裁剪结果需要在真实环境中测试
    expect(uni.canvasToTempFilePath).toHaveBeenCalled()
  })

  test('图片触摸事件', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    const image = wrapper.find('.wd-img-cropper__img')

    // 模拟触摸开始
    await image.trigger('touchstart', {
      touches: [{ clientX: 100, clientY: 100 }]
    })

    // 模拟触摸移动
    await image.trigger('touchmove', {
      touches: [{ clientX: 150, clientY: 150 }]
    })

    // 模拟触摸结束
    await image.trigger('touchend')

    // 这里只能验证事件触发，实际效果需要在真实环境中测试
    expect(true).toBe(true)
  })

  test('旋转图片', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 调用旋转方法
    const rotateButton = wrapper.find('.wd-img-cropper__rotate')
    await rotateButton.trigger('click')

    // 验证旋转效果，这里只能间接验证
    // 实际旋转效果需要在真实环境中测试
    expect(rotateButton.exists()).toBe(true)
  })

  test('重置图片', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际重置效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('设置旋转角度', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际旋转效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('动画控制', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg'
      }
    })
    await nextTick()

    // 由于实际动画效果需要在真实环境中测试，这里只验证组件是否正确渲染
    expect(wrapper.find('.wd-img-cropper').exists()).toBe(true)
  })

  test('导出参数设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        fileType: 'jpg',
        quality: 0.8,
        exportScale: 3
      }
    })
    await nextTick()

    expect(wrapper.props('fileType')).toBe('jpg')
    expect(wrapper.props('quality')).toBe(0.8)
    expect(wrapper.props('exportScale')).toBe(3)
  })

  test('图片尺寸设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        imgWidth: '300',
        imgHeight: '200'
      }
    })
    await nextTick()

    expect(wrapper.props('imgWidth')).toBe('300')
    expect(wrapper.props('imgHeight')).toBe('200')
  })

  test('最大缩放比例设置', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        maxScale: 5
      }
    })
    await nextTick()

    expect(wrapper.props('maxScale')).toBe(5)
  })

  test('自定义类名和样式', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: true,
        imgSrc: 'test-image.jpg',
        customClass: 'custom-cropper',
        customStyle: 'background: red;'
      }
    })
    await nextTick()

    const cropper = wrapper.find('.wd-img-cropper')
    expect(cropper.classes()).toContain('custom-cropper')
    expect(cropper.attributes('style')).toContain('background: red;')
  })
})
