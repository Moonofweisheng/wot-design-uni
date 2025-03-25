import { useUpload } from '@/uni_modules/wot-design-uni/components/composables/useUpload'
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

// Mock uni API
const mockUploadTask = {
  abort: jest.fn(),
  onProgressUpdate: jest.fn((callback) => {
    callback({ progress: 50 })
  })
}

;(global as any).uni = {
  uploadFile: jest.fn((options) => {
    const { success, fail } = options
    if (options.url.includes('success')) {
      success?.({ statusCode: 200, data: 'success' })
    } else {
      fail?.({ errMsg: 'upload failed' })
    }
    return mockUploadTask
  })
} as any

describe('useUpload', () => {
  const { startUpload, abort, UPLOAD_STATUS } = useUpload()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 测试基本上传功能
  it('should upload file successfully', async () => {
    const file: UploadFileItem = {
      url: 'file://temp/image.png',
      status: UPLOAD_STATUS.PENDING,
      percent: 0,
      uid: 1
    }

    const onSuccess = jest.fn()
    const onProgress = jest.fn()

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

    const onError = jest.fn()

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

    const customUpload = jest.fn()

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

    const onSuccess = jest.fn()
    const onError = jest.fn()

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

    const onProgress = jest.fn()

    mockUploadTask.onProgressUpdate = jest.fn((callback) => {
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
})
