import { mount } from '@vue/test-utils'
import WdUpload from '@/uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue'
import { describe, expect, test, vi } from 'vitest'
import { UploadFile } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

describe('WdUpload', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: []
      }
    })
    expect(wrapper.find('.wd-upload').exists()).toBe(true)
  })

  test('文件列表渲染', async () => {
    const fileList = [
      { url: 'https://example.com/image1.jpg', name: 'image1.jpg' },
      { url: 'https://example.com/image2.jpg', name: 'image2.jpg' }
    ]
    const wrapper = mount(WdUpload, {
      props: {
        fileList
      }
    })
    const items = wrapper.findAll('.wd-upload__preview')
    expect(items.length).toBe(fileList.length)
  })

  test('最大上传数限制', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        limit: 2,
        fileList: [{ url: 'https://example.com/image1.jpg' }]
      }
    })
    const uploadBtn = wrapper.find('.wd-upload__evoke')
    expect(uploadBtn.exists()).toBe(true)
  })

  test('文件类型判断', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [
          { url: 'https://example.com/image1.jpg', name: 'image1.jpg' },
          { url: 'https://example.com/video1.mp4', name: 'video1.mp4' },
          { url: 'https://example.com/document.pdf', name: 'document.pdf' }
        ]
      }
    })

    const images = wrapper.findAll('.wd-upload__picture')
    const videos = wrapper.findAll('.wd-upload__video')
    const files = wrapper.findAll('.wd-upload__file')

    // 根据组件的isImage和isVideo方法判断文件类型
    expect(images.length).toBeGreaterThan(0)
    expect(files.length).toBeGreaterThan(0)
  })

  test('删除文件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{ url: 'https://example.com/image1.jpg' }]
      }
    })
    // 查找删除按钮，实际类名为.wd-upload__close
    const deleteBtn = wrapper.find('.wd-upload__close')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        disabled: true
      }
    })
    const uploadBtn = wrapper.find('.wd-upload__evoke')
    expect(uploadBtn.classes()).toContain('is-disabled')
  })

  test('自定义上传样式', async () => {
    const wrapper = mount(WdUpload, {
      slots: {
        default: '<button class="custom-upload">点击上传</button>'
      }
    })
    const customBtn = wrapper.find('.custom-upload')
    expect(customBtn.exists()).toBe(true)
    expect(customBtn.text()).toBe('点击上传')
  })

  test('自动上传功能', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        autoUpload: true,
        action: 'https://example.com/upload'
      }
    })
    expect(wrapper.vm.autoUpload).toBe(true)
  })

  test('文件上传前钩子', async () => {
    const beforeUpload = vi.fn((options) => {
      options.resolve(true)
    })
    const wrapper = mount(WdUpload, {
      props: {
        beforeUpload
      }
    })
    expect(wrapper.vm.beforeUpload).toBe(beforeUpload)
  })

  test('文件预览功能', async () => {
    const beforePreview = vi.fn((options) => {
      options.resolve(true)
    })
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{ url: 'https://example.com/image1.jpg', name: 'image1.jpg' }],
        beforePreview
      }
    })
    const image = wrapper.find('.wd-upload__picture')
    await image.trigger('click')
    expect(beforePreview).toHaveBeenCalled()
  })

  test('自定义上传方法', async () => {
    const uploadMethod = vi.fn()
    const wrapper = mount(WdUpload, {
      props: {
        uploadMethod
      }
    })
    expect(wrapper.vm.uploadMethod).toBe(uploadMethod)
  })

  test('文件状态展示', async () => {
    const fileList: UploadFile[] = [
      { url: 'https://example.com/image1.jpg', name: 'image1.jpg', status: 'success' },
      { url: 'https://example.com/image2.jpg', name: 'image2.jpg', status: 'loading', percent: 50 },
      { url: 'https://example.com/image3.jpg', name: 'image3.jpg', status: 'fail', error: '上传失败' }
    ]
    const wrapper = mount(WdUpload, {
      props: {
        fileList
      }
    })

    const loadingIcon = wrapper.find('.wd-loading')
    const errorIcon = wrapper.find('.wd-icon-close-outline')

    expect(loadingIcon.exists() || errorIcon.exists()).toBe(true)
  })
})
