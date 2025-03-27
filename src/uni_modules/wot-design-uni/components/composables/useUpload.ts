import { isArray, isDef, isFunction } from '../common/util'
import type { ChooseFile, ChooseFileOption, UploadFileItem, UploadMethod, UploadStatusType } from '../wd-upload/types'

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
  // 选择文件
  chooseFile: (options: ChooseFileOption) => Promise<ChooseFile[]>
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
  // 根据文件拓展名过滤(H5支持全部类型过滤,微信小程序支持all和file时过滤,其余平台不支持)
  extension?: string[]
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

  /**
   * 格式化图片信息
   */
  function formatImage(res: UniApp.ChooseImageSuccessCallbackResult): ChooseFile[] {
    // #ifdef MP-DINGTALK
    // 钉钉文件在files中
    res.tempFiles = isDef((res as any).files) ? (res as any).files : res.tempFiles
    // #endif
    if (isArray(res.tempFiles)) {
      return res.tempFiles.map((item: any) => ({
        path: item.path || '',
        name: item.name || '',
        size: item.size,
        type: 'image',
        thumb: item.path || ''
      }))
    }
    return [
      {
        path: (res.tempFiles as any).path || '',
        name: (res.tempFiles as any).name || '',
        size: (res.tempFiles as any).size,
        type: 'image',
        thumb: (res.tempFiles as any).path || ''
      }
    ]
  }

  /**
   * 格式化视频信息
   */
  function formatVideo(res: UniApp.ChooseVideoSuccess): ChooseFile[] {
    return [
      {
        path: res.tempFilePath || (res as any).filePath || '',
        name: res.name || '',
        size: res.size,
        type: 'video',
        thumb: (res as any).thumbTempFilePath || '',
        duration: res.duration
      }
    ]
  }

  /**
   * 格式化媒体信息
   */
  function formatMedia(res: UniApp.ChooseMediaSuccessCallbackResult): ChooseFile[] {
    return res.tempFiles.map((item) => ({
      type: item.fileType,
      path: item.tempFilePath,
      thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath,
      size: item.size,
      duration: item.duration
    }))
  }

  /**
   * 选择文件
   */
  function chooseFile({
    multiple,
    sizeType,
    sourceType,
    maxCount,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  }: ChooseFileOption): Promise<ChooseFile[]> {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case 'image':
          uni.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1, // 默认9,最大9
            sizeType,
            sourceType,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          break
        case 'video':
          uni.chooseVideo({
            sourceType,
            compressed,
            maxDuration,
            camera,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatVideo(res)),
            fail: reject
          })
          break
        // #ifdef MP-WEIXIN
        case 'media':
          uni.chooseMedia({
            count: multiple ? Math.min(maxCount || 9, 9) : 1, // 默认9,最大9
            sourceType,
            sizeType,
            camera,
            maxDuration,
            success: (res) => resolve(formatMedia(res)),
            fail: reject
          })
          break
        case 'file':
          uni.chooseMessageFile({
            count: multiple ? Math.min(maxCount || 100, 100) : 1, // 默认100,最大100
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          })
          break
        // #endif
        case 'all':
          // #ifdef H5
          uni.chooseFile({
            count: multiple ? Math.min(maxCount || 100, 100) : 1, // 默认100,最大100
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles as ChooseFile[]),
            fail: reject
          })
          // #endif
          // #ifdef MP-WEIXIN
          uni.chooseMessageFile({
            count: multiple ? Math.min(maxCount || 100, 100) : 1, // 默认100,最大100
            type: accept,
            extension,
            success: (res) => resolve(res.tempFiles),
            fail: reject
          })
          // #endif

          break
        default:
          // 默认选择图片
          uni.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1, // 默认9,最大9
            sizeType,
            sourceType,
            // #ifdef H5
            extension,
            // #endif
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          break
      }
    })
  }

  return {
    startUpload,
    abort,
    UPLOAD_STATUS,
    chooseFile
  }
}
