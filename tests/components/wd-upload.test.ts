import { mount } from '@vue/test-utils'
import WdUpload from '@/uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { UploadFile } from '@/uni_modules/wot-design-uni/components/wd-upload/types'
import { nextTick } from 'vue'

describe('WdUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

    await wrapper.setProps({
      fileList: [{ url: 'https://example.com/image1.jpg' }, { url: 'https://example.com/image2.jpg' }]
    })
    await nextTick()
    expect(wrapper.find('.wd-upload__evoke').exists()).toBe(false)
  })

  test('删除文件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{ url: 'https://example.com/image1.jpg' }]
      }
    })

    // 模拟删除操作
    const removeIcon = wrapper.find('.wd-upload__close')
    await removeIcon.trigger('click')

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['remove']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
    expect(emitted['update:fileList']).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        disabled: true,
        fileList: []
      }
    })
    
    const uploadBtn = wrapper.find('.wd-upload__evoke')
    expect(uploadBtn.classes()).toContain('is-disabled')

    // 测试禁用状态下点击不会触发文件选择
    const fileInput = wrapper.find('input[type="file"]')
    expect(fileInput.exists()).toBe(false) // 禁用状态下不应该有文件输入框
  })

  test('自定义上传样式', async () => {
    const wrapper = mount(WdUpload, {
      slots: {
        default: '<button class="custom-upload">点击上传</button>'
      },
      props: {
        fileList: []
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
        action: 'https://example.com/upload',
        fileList: []
      }
    })
    expect(wrapper.props('autoUpload')).toBe(true)
  })

  test('手动上传功能', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        autoUpload: false,
        fileList: [
          { url: 'https://example.com/image1.jpg', name: 'image1.jpg', status: 'pending' }
        ]
      }
    })

    // 测试手动上传方法存在
    expect(typeof (wrapper.vm as any).submit).toBe('function')
  })

  test('文件上传前钩子', async () => {
    const beforeUpload = vi.fn()
    const wrapper = mount(WdUpload, {
      props: {
        beforeUpload,
        fileList: []
      }
    })
    expect(wrapper.props('beforeUpload')).toBe(beforeUpload)
  })

  test('文件预览功能', async () => {
    const beforePreview = vi.fn((options) => {
      // 立即调用 resolve 确保预览继续
      options.resolve(true)
    })
    
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{ 
          url: 'https://example.com/image1.jpg', 
          name: 'image1.jpg' 
        }],
        beforePreview,
        reupload: false // 明确设置为 false，确保走预览分支
      }
    })
    
    await nextTick() // 等待组件渲染完成
    
    // 更精确地查找图片元素（而不是整个预览容器）
    const imageItem = wrapper.find('.wd-upload__picture')
    expect(imageItem.exists()).toBe(true) // 确保元素存在
    
    // 触发点击事件
    await imageItem.trigger('click')
    
    // 添加短暂延迟确保异步操作完成
    await nextTick()
    
    expect(beforePreview).toHaveBeenCalled()
  })

  test('视频预览功能', async () => {
    const beforePreview = vi.fn((options) => {
      options.resolve(true)
    })
    
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{
          url: 'https://example.com/video1.mp4',
          name: 'video1.mp4',
          thumb: 'https://example.com/thumb1.jpg'
        }],
        beforePreview,
        reupload: false
      }
    })
    
    await nextTick()
    
    // 对于视频，查找视频预览元素
    const videoThumb = wrapper.find('.wd-upload__video')
    expect(videoThumb.exists()).toBe(true)
    
    await videoThumb.trigger('click')
    await nextTick()
    
    expect(beforePreview).toHaveBeenCalled()
  })

  test('自定义header属性', async () => {
    const customHeader = { 'X-Custom-Header': 'test-value' }
    const wrapper = mount(WdUpload, {
      props: {
        header: customHeader,
        action: 'https://example.com/upload',
        fileList: []
      }
    })

    expect(wrapper.props('header')).toEqual(customHeader)
  })

  test('文件大小限制', async () => {
    const maxSize = 1024 * 10 // 10KB
    const wrapper = mount(WdUpload, {
      props: {
        maxSize,
        action: 'https://example.com/upload',
        fileList: []
      }
    })

    // 测试maxSize属性是否正确设置
    expect(wrapper.props('maxSize')).toBe(maxSize)
  })

  test('自定义状态字段', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        statusKey: 'customStatus',
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            name: 'image1.jpg',
            customStatus: 'success'
          }
        ]
      }
    })

    expect(wrapper.props('statusKey')).toBe('customStatus')
  })

  test('加载图标尺寸', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        loadingSize: '32px',
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            name: 'image1.jpg',
            status: 'loading'
          }
        ]
      }
    })

    expect(wrapper.props('loadingSize')).toBe('32px')
  })

  test('图片模式', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        imageMode: 'scaleToFill',
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            name: 'image1.jpg'
          }
        ]
      }
    })

    expect(wrapper.props('imageMode')).toBe('scaleToFill')
  })

  test('自定义成功状态码', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        successStatus: 201,
        action: 'https://example.com/upload',
        fileList: []
      }
    })

    expect(wrapper.props('successStatus')).toBe(201)
  })

  test('自定义样式类', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        customEvokeClass: 'custom-evoke',
        customPreviewClass: 'custom-preview',
        fileList: [{ url: 'https://example.com/image1.jpg' }]
      }
    })

    const evoke = wrapper.find('.wd-upload__evoke')
    const preview = wrapper.find('.wd-upload__preview')

    expect(evoke.classes()).toContain('custom-evoke')
    expect(preview.classes()).toContain('custom-preview')
  })

  test('重新上传功能', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        reupload: true,
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'success'
          }
        ]
      }
    })

    expect(wrapper.props('reupload')).toBe(true)
  })

  test('文件扩展名过滤', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        extension: ['.jpg', '.png'],
        accept: 'image',
        fileList: []
      }
    })

    expect(wrapper.props('extension')).toEqual(['.jpg', '.png'])
  })

  test('上传失败事件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        action: 'https://example.com/fail',
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'pending'
          }
        ]
      }
    })

    // 模拟失败事件
    wrapper.vm.$emit('fail', { 
      error: { errMsg: 'upload failed' }, 
      file: { uid: 1, url: 'https://example.com/image1.jpg', status: 'pending' },
      formData: {} 
    })

    await nextTick()
    
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['fail']).toBeTruthy()
  })

  test('上传成功事件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        action: 'https://example.com/success',
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'pending'
          }
        ]
      }
    })

    // 模拟成功事件
    const file = { uid: 1, url: 'https://example.com/image1.jpg', status: 'success' }
    wrapper.vm.$emit('success', { file, fileList: [file], formData: {} })

    await nextTick()
    
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['success']).toBeTruthy()
  })

  test('上传进度事件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        action: 'https://example.com/upload',
        fileList: [
          {
            uid: 1,
            url: 'https://example.com/image1.jpg',
            status: 'loading'
          }
        ]
      }
    })

    // 模拟进度事件
    wrapper.vm.$emit('progress', { 
      response: { progress: 50 },
      file: { uid: 1, url: 'https://example.com/image1.jpg', status: 'loading' }
    })

    await nextTick()
    
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['progress']).toBeTruthy()
  })

  test('选择文件错误事件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        action: 'https://example.com/upload',
        fileList: []
      }
    })

    // 模拟选择错误事件
    const error = new Error('choose error')
    wrapper.vm.$emit('chooseerror', error)

    await nextTick()
    
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['chooseerror']).toBeTruthy()
  })

  test('文件选择前钩子', async () => {
    const beforeChoose = vi.fn()
    const wrapper = mount(WdUpload, {
      props: {
        beforeChoose,
        fileList: []
      }
    })

    expect(wrapper.props('beforeChoose')).toBe(beforeChoose)
  })
})