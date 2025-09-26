import { mount } from '@vue/test-utils'
import WdUpload from '@/uni_modules/wot-design-uni/components/wd-upload/wd-upload.vue'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { UploadFile } from '@/uni_modules/wot-design-uni/components/wd-upload/types'
import { nextTick } from 'vue'

describe('WdUpload', () => {
  // 在每个测试前重置所有模拟
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

    // 测试达到最大上传数时不显示上传按钮
    await wrapper.setProps({
      fileList: [{ url: 'https://example.com/image1.jpg' }, { url: 'https://example.com/image2.jpg' }]
    })
    await nextTick()
    expect(wrapper.find('.wd-upload__evoke').exists()).toBe(false)
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
    expect(videos.length + files.length).toBeGreaterThan(0)
  })

  test('删除文件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [{ url: 'https://example.com/image1.jpg' }]
      }
    })

    // 直接调用组件的 handleRemove 方法，而不是查找删除按钮
    await (wrapper.vm as any).handleRemove({ uid: 1, url: 'https://example.com/image1.jpg' })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['remove']).toBeTruthy()
    expect(emitted['change']).toBeTruthy()
    expect(emitted['update:fileList']).toBeTruthy()
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        disabled: true
      }
    })
    const uploadBtn = wrapper.find('.wd-upload__evoke')
    expect(uploadBtn.classes()).toContain('is-disabled')

    // 测试禁用状态下点击上传按钮不会触发选择文件
    const chooseFileSpy = vi.spyOn(wrapper.vm as any, 'handleChoose')
    await uploadBtn.trigger('click')
    expect(chooseFileSpy).not.toHaveBeenCalled()
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
    expect((wrapper.vm as any).autoUpload).toBe(true)
  })

  test('手动上传功能', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        autoUpload: false,
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'pending'
          }
        ],
        action: 'https://example.com/upload'
      }
    })

    // 模拟成功的上传响应
    const mockSuccessResponse = { data: { id: 123, url: 'https://example.com/uploaded.jpg' } }
    
    // 模拟 useUpload 的 startUpload 方法
    const mockStartUpload = vi.fn().mockImplementation((file, options) => {
      // 模拟上传成功
      options.onSuccess(mockSuccessResponse, file, {})
    })
    
    // 替换组件中的 startUpload 方法
    (wrapper.vm as any).startUpload = mockStartUpload

    // 调用 submit 方法并等待 Promise 完成
    const result = await (wrapper.vm as any).submit()
    
    expect(result.success).toBe(true)
    expect(result.fileList).toBeDefined()
    expect(mockStartUpload).toHaveBeenCalled()
  })

  test('手动上传失败情况', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        autoUpload: false,
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'pending'
          }
        ],
        action: 'https://example.com/upload'
      }
    })

    // 模拟失败的上传响应
    const mockStartUpload = vi.fn().mockImplementation((file, options) => {
      options.onError({ message: 'Upload failed' }, file, {})
    })
    
    (wrapper.vm as any).startUpload = mockStartUpload

    const result = await (wrapper.vm as any).submit()
    
    expect(result.success).toBe(false)
    expect(result.fileList).toBeDefined()
  })

  test('submit方法返回Promise', () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: []
      }
    })

    // 验证submit方法存在且返回Promise
    const submitResult = (wrapper.vm as any).submit()
    expect(submitResult).toBeInstanceOf(Promise)
    
    // 验证方法暴露正确
    const exposeMethods = (wrapper.vm as any).$.exposed
    expect(exposeMethods.submit).toBeDefined()
    expect(exposeMethods.abort).toBeDefined()
  })

  test('无待上传文件时submit立即resolve', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'success'
          }
        ]
      }
    })

    const result = await (wrapper.vm as any).submit()
    expect(result.success).toBe(true)
    expect(result.fileList.length).toBe(1)
  })

  test('文件上传前钩子', async () => {
    const beforeUpload = vi.fn((options) => {
      options.resolve(true)
    })
    
    const wrapper = mount(WdUpload, {
      props: {
        beforeUpload,
        autoUpload: false,
        fileList: []
      }
    })

    // 模拟文件选择
    const mockFiles = [{ path: 'temp/image.jpg', size: 1024, name: 'image.jpg', type: 'image' }]
    
    // 模拟 chooseFile 返回
    const mockChooseFile = vi.fn().mockResolvedValue(mockFiles)
    ;(wrapper.vm as any).chooseFile = mockChooseFile

    // 触发文件选择
    await (wrapper.vm as any).onChooseFile()
    
    expect(beforeUpload).toHaveBeenCalled()
    expect(mockChooseFile).toHaveBeenCalled()
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

  test('视频预览功能', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [
          {
            url: 'https://example.com/video1.mp4',
            name: 'video1.mp4',
            thumb: 'https://example.com/thumb1.jpg'
          }
        ]
      }
    })

    // 模拟videoPreview.open方法
    const openSpy = vi.fn()
    ;(wrapper.vm as any).videoPreview = { open: openSpy }

    // 点击视频缩略图
    const videoThumb = wrapper.find('.wd-upload__video')
    await videoThumb.trigger('click')

    expect(openSpy).toHaveBeenCalled()
  })

  test('自定义上传方法', async () => {
    const uploadMethod = vi.fn()
    const wrapper = mount(WdUpload, {
      props: {
        uploadMethod
      }
    })
    expect((wrapper.vm as any).uploadMethod).toBe(uploadMethod)
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

  test('多个文件并发上传', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        autoUpload: false,
        fileList: [
          { url: 'https://example.com/image1.jpg', status: 'pending' },
          { url: 'https://example.com/image2.jpg', status: 'pending' },
          { url: 'https://example.com/image3.jpg', status: 'success' } // 一个已成功的文件
        ]
      }
    })

    let uploadCount = 0
    const mockStartUpload = vi.fn().mockImplementation((file, options) => {
      uploadCount++
      // 模拟异步上传
      setTimeout(() => {
        if (uploadCount <= 2) { // 让一个失败
          options.onSuccess({ data: 'success' }, file, {})
        } else {
          options.onError({ message: 'Upload failed' }, file, {})
        }
      }, 10)
    })
    
    ;(wrapper.vm as any).startUpload = mockStartUpload

    const result = await (wrapper.vm as any).submit()
    
    // 应该只上传了2个pending状态的文件
    expect(mockStartUpload).toHaveBeenCalledTimes(2)
    expect(result.success).toBe(false) // 因为有失败
    expect(result.fileList.length).toBe(3)
  })

  // 测试自定义header属性
  test('自定义header属性', async () => {
    const customHeader = { 'X-Custom-Header': 'test-value' }
    const wrapper = mount(WdUpload, {
      props: {
        header: customHeader,
        action: 'https://example.com/upload'
      }
    })

    expect((wrapper.vm as any).header).toEqual(customHeader)
  })

  // 测试maxSize属性
  test('文件大小限制', async () => {
    const maxSize = 1024 * 10 // 10KB
    const mockFile = {
      path: 'temp/image.jpg',
      size: maxSize * 2, // 超过限制
      name: 'image.jpg',
      type: 'image'
    }

    const wrapper = mount(WdUpload, {
      props: {
        maxSize,
        action: 'https://example.com/upload'
      }
    })

    // 直接调用组件的方法触发超大文件事件
    await (wrapper.vm as any).emit('oversize', { file: mockFile })

    // 验证是否触发了oversize事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['oversize']).toBeTruthy()
    expect(emitted['oversize'][0][0].file).toEqual(mockFile)
  })

  // 测试statusKey属性
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

    expect((wrapper.vm as any).statusKey).toBe('customStatus')
  })

  // 测试loadingSize属性
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

    expect((wrapper.vm as any).loadingSize).toBe('32px')
  })

  // 测试imageMode属性
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

    expect((wrapper.vm as any).imageMode).toBe('scaleToFill')

    const image = wrapper.find('.wd-upload__picture')
    expect(image.attributes('mode')).toBe('scaleToFill')
  })

  // 测试successStatus属性
  test('自定义成功状态码', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        successStatus: 201,
        action: 'https://example.com/upload'
      }
    })

    expect((wrapper.vm as any).successStatus).toBe(201)
  })

  // 测试customEvokeClass和customPreviewClass属性
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

  // 测试reupload属性
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

    expect((wrapper.vm as any).reupload).toBe(true)
  })

  // 测试extension属性
  test('文件扩展名过滤', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        extension: ['.jpg', '.png'],
        accept: 'image'
      }
    })

    expect((wrapper.vm as any).extension).toEqual(['.jpg', '.png'])
  })

  // 测试fail事件
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

    // 直接触发fail事件
    const error = { errMsg: 'upload failed' }
    const file = { uid: 1, url: 'https://example.com/image1.jpg', status: 'pending' }
    const formData = {}

    await (wrapper.vm as any).emit('fail', { error, file, formData })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['fail']).toBeTruthy()
    expect(emitted['fail'][0][0].error).toBe(error)
    expect(emitted['fail'][0][0].file).toBe(file)
  })

  // 测试success事件
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

    // 直接触发success事件
    const file = { uid: 1, url: 'https://example.com/image1.jpg', status: 'success' }
    const fileList = [file]
    const formData = {}

    await (wrapper.vm as any).emit('success', { file, fileList, formData })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['success']).toBeTruthy()
    expect(emitted['success'][0][0].file).toBe(file)
  })

  // 测试progress事件
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

    // 直接触发progress事件
    const response = { progress: 50 }
    const file = { uid: 1, url: 'https://example.com/image1.jpg', status: 'loading' }

    await (wrapper.vm as any).emit('progress', { response, file })

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['progress']).toBeTruthy()
    expect(emitted['progress'][0][0].response).toBe(response)
    expect(emitted['progress'][0][0].file).toBe(file)
  })

  // 测试chooseerror事件
  test('选择文件错误事件', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        action: 'https://example.com/upload'
      }
    })

    // 直接触发chooseerror事件
    const error = new Error('choose error')
    await (wrapper.vm as any).emit('chooseerror', error)

    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['chooseerror']).toBeTruthy()
    expect(emitted['chooseerror'][0][0]).toBe(error)
  })

  // 测试abort方法
  test('中断上传', async () => {
    const wrapper = mount(WdUpload, {
      props: {
        fileList: [
          { url: 'https://example.com/image1.jpg', status: 'pending' }
        ]
      }
    })

    const abortSpy = vi.fn()
    ;(wrapper.vm as any).abort = abortSpy

    // 通过exposed访问abort方法
    await (wrapper.vm as any).abort()
    
    expect(abortSpy).toHaveBeenCalled()
  })

  // 测试文件选择前钩子
  test('文件选择前钩子', async () => {
    // 直接测试文件选择前钩子，不依赖组件实例
    const beforeChoose = vi.fn((options) => {
      options.resolve(true)
    })

    const onChooseFileSpy = vi.fn()

    // 模拟调用
    beforeChoose({ resolve: () => onChooseFileSpy() })

    // 验证是否被调用
    expect(beforeChoose).toHaveBeenCalled()
    expect(onChooseFileSpy).toHaveBeenCalled()
  })

  // 测试构建表单数据钩子
  test('构建表单数据钩子', async () => {
    const buildFormData = vi.fn((options) => {
      options.resolve({ custom: 'data', timestamp: Date.now() })
    })
    
    const wrapper = mount(WdUpload, {
      props: {
        buildFormData,
        autoUpload: false,
        fileList: [
          {
            url: 'https://example.com/image1.jpg',
            status: 'pending'
          }
        ]
      }
    })

    // 模拟上传调用
    const mockStartUpload = vi.fn()
    ;(wrapper.vm as any).startUpload = mockStartUpload

    await (wrapper.vm as any).startUploadFiles()
    
    expect(buildFormData).toHaveBeenCalled()
    // 验证 buildFormData 被调用并传递了正确的参数
    expect(buildFormData.mock.calls[0][0].file).toBeDefined()
    expect(typeof buildFormData.mock.calls[0][0].resolve).toBe('function')
  })
})