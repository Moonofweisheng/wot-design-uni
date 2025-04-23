import { mount } from '@vue/test-utils'
import WdImgCropper from '../../src/uni_modules/wot-design-uni/components/wd-img-cropper/wd-img-cropper.vue'
import { describe, expect, test } from 'vitest'

describe('WdImgCropper', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false,
        src: 'test-image.jpg'
      }
    })

    expect(wrapper.classes()).toContain('wd-img-cropper')
    expect(wrapper.vm.src).toBe('test-image.jpg')
  })

  test('自定义裁剪框宽高比', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false,
        aspectRatio: '3:2'
      }
    })

    expect(wrapper.props('aspectRatio')).toBe('3:2')
  })

  test('自定义裁剪框形状', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false,
        shape: 'round'
      }
    })

    expect(wrapper.classes()).toContain('is-round')
  })

  test('确认裁剪事件', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false
      }
    })

    await wrapper.vm.$emit('confirm', { tempFilePath: 'cropped-image.jpg' })
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')![0][0]).toHaveProperty('tempFilePath', 'cropped-image.jpg')
  })

  test('取消裁剪事件', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false
      }
    })

    await wrapper.vm.$emit('cancel')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  test('加载图片失败事件', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false
      }
    })

    await wrapper.vm.$emit('error')
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  test('显示隐藏状态', async () => {
    const wrapper = mount(WdImgCropper, {
      props: {
        modelValue: false
      }
    })

    await wrapper.setProps({ modelValue: true })
    expect(wrapper.classes()).toContain('is-show')

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.classes()).not.toContain('is-show')
  })
})
