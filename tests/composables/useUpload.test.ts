import { useUpload } from '@/uni_modules/wot-design-uni/components/composables/useUpload'
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock uni API
const mockUploadTask = {
  abort: vi.fn(),
  onProgressUpdate: vi.fn((callback) => {
    callback({ progress: 50 })
  })
}

// 使用 vi.stubGlobal 来模拟全局对象
vi.stubGlobal('uni', {
  uploadFile: vi.fn((options) => {
    const { success, fail } = options
    if (options.url.includes('success')) {
      success?.({ statusCode: 200, data: 'success' })
    } else {
      fail?.({ errMsg: 'upload failed' })
    }
    return mockUploadTask
  })
})

describe('useUpload', () => {
  const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本上传功能
  it('should upload file successfully', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const onSuccess = vi.fn()
    const onProgress = vi.fn()

    await startUpload(file, {
      action: 'https://api.example.com/success',
      name: 'file',
      onSuccess,
      onProgress
    })

    expect(file.status).toBe(UPLOAD_STATUS.SUCCESS)
    expect(onSuccess).toHaveBeenCalled()
    expect(onProgress).toHaveBeenCalledWith({ progress: 50 }, file)
  })

  // 测试上传失败场景
  it('should handle upload failure', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const onError = vi.fn()

    await startUpload(file, {
      action: 'https://api.example.com/fail',
      name: 'file',
      onError
    })

    expect(file.status).toBe(UPLOAD_STATUS.FAIL)
    expect(file.error).toBe('upload failed')
    expect(onError).toHaveBeenCalled()
  })

  // 测试自定义上传方法
  it('should use custom upload method', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const customUpload = vi.fn()

    await startUpload(file, {
      action: 'https://api.example.com',
      uploadMethod: customUpload
    })

    expect(customUpload).toHaveBeenCalledWith(
      file,
      {},
      expect.objectContaining({
        action: 'https://api.example.com'
      })
    )
  })

  // 测试中断上传
  it('should abort upload task', () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    startUpload(file, {
      action: 'https://api.example.com/success',
      abortPrevious: true
    })

    abort()
    expect(mockUploadTask.abort).toHaveBeenCalled()
  })

  // 测试自动中断之前的上传任务
  it('should abort previous upload when abortPrevious is true', async () => {
    const file1: UploadFileItem = {
      url: 'file://temp/image1.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const file2: UploadFileItem = {
      url: 'file://temp/image2.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    await startUpload(file1, {
      action: 'https://api.example.com/success',
      abortPrevious: true
    })

    await startUpload(file2, {
      action: 'https://api.example.com/success',
      abortPrevious: true
    })

    expect(mockUploadTask.abort).toHaveBeenCalledTimes(1)
  })

  // 测试请求头和表单数据的传递
  it('should pass custom headers and formData', () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const customHeaders = { 'X-Custom-Header': 'test' }
    const customFormData = { field: 'value' }

    startUpload(file, {
      action: 'https://api.example.com/success',
      header: customHeaders,
      formData: customFormData
    })

    expect(uni.uploadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        header: customHeaders,
        formData: customFormData
      })
    )
  })

  // 测试特定文件类型上传
  it('should handle specific file types', () => {
    const file: UploadFileItem = {
      url: 'file://temp/video.mp4',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    startUpload(file, {
      action: 'https://api.example.com/success',
      fileType: 'video'
    })

    expect(uni.uploadFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileType: 'video'
      })
    )
  })

  // 测试自定义状态码
  it('should handle custom status code', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const onSuccess = vi.fn()
    const onError = vi.fn()

    await startUpload(file, {
      action: 'https://api.example.com/success',
      statusCode: 201,
      onSuccess,
      onError
    })

    // 由于mock返回200，使用201作为成功状态码应该触发错误回调
    expect(onError).toHaveBeenCalled()
    expect(onSuccess).not.toHaveBeenCalled()
  })

  // 测试自定义状态字段
  it('should use custom status key', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      customStatus: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    await startUpload(file, {
      action: 'https://api.example.com/success',
      statusKey: 'customStatus'
    })

    expect(file.customStatus).toBe(UPLOAD_STATUS.SUCCESS)
  })

  // 测试具体任务的中断
  it('should abort specific upload task', () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const task = startUpload(file, {
      action: 'https://api.example.com/success'
    })

    abort(task as UniApp.UploadTask)
    expect(mockUploadTask.abort).toHaveBeenCalled()
  })

  // 测试进度回调的详细信息
  it('should provide detailed progress information', () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const onProgress = vi.fn()

    mockUploadTask.onProgressUpdate = vi.fn((callback) => {
      callback({
        progress: 50,
        totalBytesSent: 5000,
        totalBytesExpectedToSend: 10000
      })
    })

    startUpload(file, {
      action: 'https://api.example.com/success',
      onProgress
    })

    expect(onProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        progress: 50,
        totalBytesSent: 5000,
        totalBytesExpectedToSend: 10000
      }),
      file
    )
  })

  // 测试选择图片文件
  it('should choose image files', async () => {
    const mockChooseImage = vi.fn().mockImplementation((options) => {
      options.success({
        tempFiles: [
          { path: 'temp/image1.jpg', size: 1024, name: 'image1.jpg' },
          { path: 'temp/image2.jpg', size: 2048, name: 'image2.jpg' }
        ]
      })
    })
    ;(global as any).uni.chooseImage = mockChooseImage

    const files = await chooseFile({
      accept: 'image',
      multiple: true,
      maxCount: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back'
    })

    expect(files).toHaveLength(2)
    expect(files[0]).toEqual({
      path: 'temp/image1.jpg',
      size: 1024,
      name: 'image1.jpg',
      type: 'image',
      thumb: 'temp/image1.jpg'
    })
  })

  // 测试选择视频文件
  it('should choose video file', async () => {
    const mockChooseVideo = vi.fn().mockImplementation((options) => {
      options.success({
        tempFilePath: 'temp/video.mp4',
        size: 10240,
        duration: 15,
        thumbTempFilePath: 'temp/thumb.jpg',
        name: 'video.mp4'
      })
    })
    ;(global as any).uni.chooseVideo = mockChooseVideo

    const files = await chooseFile({
      accept: 'video',
      multiple: false,
      maxCount: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back'
    })

    expect(files).toHaveLength(1)
    expect(files[0]).toEqual({
      path: 'temp/video.mp4',
      size: 10240,
      name: 'video.mp4',
      type: 'video',
      thumb: 'temp/thumb.jpg',
      duration: 15
    })
  })

  // 测试选择文件失败的情况
  it('should handle choose file failure', async () => {
    const mockChooseImage = vi.fn().mockImplementation((options) => {
      options.fail(new Error('Permission denied'))
    })
    ;(global as any).uni.chooseImage = mockChooseImage

    await expect(
      chooseFile({
        accept: 'image',
        multiple: false,
        maxCount: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 60,
        camera: 'back'
      })
    ).rejects.toThrow('Permission denied')
  })

  // 测试多选限制
  it('should respect maxCount limit', async () => {
    const mockChooseImage = vi.fn().mockImplementation((options) => {
      options.success({
        tempFiles: [{ path: 'temp/image1.jpg', size: 1024, name: 'image1.jpg' }]
      })
    })
    ;(global as any).uni.chooseImage = mockChooseImage

    await chooseFile({
      accept: 'image',
      multiple: true,
      maxCount: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back'
    })

    expect(mockChooseImage).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera']
      })
    )

    // 确保异步操作完成
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  // 测试文件来源限制
  it('should respect sourceType option', async () => {
    const mockChooseImage = vi.fn().mockImplementation((options) => {
      // 立即调用 success 回调，返回测试数据
      options.success({
        tempFiles: [{ path: 'temp/image1.jpg', size: 1024, name: 'image1.jpg' }]
      })
    })
    ;(global as any).uni.chooseImage = mockChooseImage

    await chooseFile({
      accept: 'image',
      multiple: false,
      maxCount: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back'
    })

    expect(mockChooseImage).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera']
      })
    )
  })

  // 测试选择消息文件(仅微信小程序)
  // it('should choose message file in WeChat MP', async () => {
  //   const mockChooseMessageFile = vi.fn().mockImplementation((options) => {
  //     options.success({
  //       tempFiles: [
  //         {
  //           path: 'temp/doc.pdf',
  //           size: 1024,
  //           name: 'doc.pdf',
  //           type: 'file'
  //         }
  //       ]
  //     })
  //   })
  //   ;(global as any).uni.chooseMessageFile = mockChooseMessageFile

  //   const files = await chooseFile({
  //     accept: 'file',
  //     multiple: true,
  //     maxCount: 100,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     compressed: true,
  //     maxDuration: 60,
  //     camera: 'back'
  //   })

  //   expect(mockChooseMessageFile).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       count: 100,
  //       type: 'file'
  //     })
  //   )
  //   expect(files[0]).toEqual({
  //     path: 'temp/doc.pdf',
  //     size: 1024,
  //     name: 'doc.pdf',
  //     type: 'file'
  //   })
  // })

  // 测试选择全部类型文件(H5)
  it('should choose all type files in H5', async () => {
    const mockChooseFile = vi.fn().mockImplementation((options) => {
      options.success({
        tempFiles: [
          {
            path: 'temp/file.txt',
            size: 512,
            name: 'file.txt'
            // 移除 type 属性，因为 H5 的 chooseFile 返回的数据不包含 type
          }
        ]
      })
    })
    ;(global as any).uni.chooseFile = mockChooseFile

    const files = await chooseFile({
      accept: 'all',
      multiple: true,
      maxCount: 100,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 60,
      camera: 'back'
    })

    expect(mockChooseFile).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 100,
        type: 'all'
      })
    )
    expect(files[0]).toEqual({
      path: 'temp/file.txt',
      size: 512,
      name: 'file.txt'
    })
  })
})
