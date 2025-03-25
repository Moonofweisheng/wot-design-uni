import { isFunction } from '../common/util'
import type { UploadFileItem, UploadMethod, UploadStatusType } from '../wd-upload/types'

export const UPLOAD_STATUS: Record<string, UploadStatusType> = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface UseUploadReturn {
  // 开始上传文件
  startUpload: (file: UploadFileItem, options: UseUploadOptions) => UniApp.UploadTask | void | Promise<void>
  // 中断上传
  abort: (task?: UniApp.UploadTask) => void
  // 上传状态常量
  UPLOAD_STATUS: Record<string, UploadStatusType>
}

export interface UseUploadOptions {
  // 上传地址
  action: string
  // 请求头
  header?: Record<string, any>
  // 文件对应的 key
  name?: string
  // 其它表单数据
  formData?: Record<string, any>
  // 文件类型 仅支付宝支持且在支付宝平台必填
  fileType?: 'image' | 'video' | 'audio'
  // 成功状态码
  statusCode?: number
  // 文件状态的key
  statusKey?: string
  // 自定义上传方法
  uploadMethod?: UploadMethod
  // 上传成功回调
  onSuccess?: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  // 上传失败回调
  onError?: (res: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  // 上传进度回调
  onProgress?: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => void
  // 是否自动中断之前的上传任务
  abortPrevious?: boolean
}

export function useUpload(): UseUploadReturn {
  let currentTask: UniApp.UploadTask | null = null

  // 中断上传
  const abort = (task?: UniApp.UploadTask) => {
    if (task) {
      task.abort()
    } else if (currentTask) {
      currentTask.abort()
      currentTask = null
    }
  }

  /**
   * 默认上传方法
   */
  const defaultUpload: UploadMethod = (file, formData, options) => {
    // 如果配置了自动中断,则中断之前的上传任务
    if (options.abortPrevious) {
      abort()
    }

    const uploadTask = uni.uploadFile({
      url: options.action,
      header: options.header,
      name: options.name,
      fileName: options.name,
      fileType: options.fileType,
      formData,
      filePath: file.url,
      success(res) {
        if (res.statusCode === options.statusCode) {
          // 上传成功
          options.onSuccess(res, file, formData)
        } else {
          // 上传失败
          options.onError({ ...res, errMsg: res.errMsg || '' }, file, formData)
        }
      },
      fail(err) {
        // 上传失败
        options.onError(err, file, formData)
      }
    })

    currentTask = uploadTask

    // 获取当前文件加载的百分比
    uploadTask.onProgressUpdate((res) => {
      options.onProgress(res, file)
    })

    // 返回上传任务实例,让外部可以控制上传过程
    return uploadTask
  }

  /**
   * 开始上传文件
   */
  const startUpload = (file: UploadFileItem, options: UseUploadOptions) => {
    const {
      uploadMethod,
      formData = {},
      action,
      name = 'file',
      header = {},
      fileType = 'image',
      statusCode = 200,
      statusKey = 'status',
      abortPrevious = false
    } = options

    // 设置上传中状态
    file[statusKey] = UPLOAD_STATUS.LOADING

    const uploadOptions = {
      action,
      header,
      name,
      fileName: name,
      fileType,
      statusCode,
      abortPrevious,
      onSuccess: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        // 更新文件状态
        file[statusKey] = UPLOAD_STATUS.SUCCESS
        currentTask = null
        options.onSuccess?.(res, file, formData)
      },
      onError: (error: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        // 更新文件状态和错误信息
        file[statusKey] = UPLOAD_STATUS.FAIL
        file.error = error.errMsg
        currentTask = null
        options.onError?.(error, file, formData)
      },
      onProgress: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => {
        // 更新上传进度
        file.percent = res.progress
        options.onProgress?.(res, file)
      }
    }

    // 返回上传任务实例,支持外部获取uploadTask进行操作
    if (isFunction(uploadMethod)) {
      return uploadMethod(file, formData, uploadOptions)
    } else {
      return defaultUpload(file, formData, uploadOptions)
    }
  }

  return {
    startUpload,
    abort,
    UPLOAD_STATUS
  }
}
