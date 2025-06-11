import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { LoadingType } from '../wd-loading/types'
import type { ImageMode } from '../wd-img/types'

export interface ChooseFileOption {
  // 是否支持多选文件
  multiple?: boolean
  // 所选的图片的尺寸
  sizeType?: UploadSizeType[]
  // 选择文件的来源
  sourceType?: UploadSourceType[]
  // 最大允许上传个数
  maxCount?: number
  // 接受文件类型
  accept?: UploadFileType
  /**
   * 是否压缩视频，当 accept 为 video 时生效。
   */
  compressed?: boolean
  /**
   * 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。
   */
  maxDuration?: number
  /**
   * 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。
   */
  camera?: UploadCameraType
  /**
   * 根据文件拓展名过滤,H5、微信小程序支持
   * 每一项都不能是空字符串, 默认不过滤
   * 例如: ['.jpg'] 表示只选择.jpg文件
   */
  extension?: string[]
}

export type UploadFileItem = {
  [key: string]: any
  // 	当前上传文件在列表中的唯一标识
  uid: number
  // 缩略图地址
  thumb?: string
  // 当前文件名称，仅h5支持
  name?: string
  // 上传状态。若自定义了status-key，应取对应字段
  status?: UploadStatusType
  // 文件大小
  size?: number
  // 上传图片/视频的本地地址
  url: string
  // 上传进度
  percent?: number
  // 后端返回的内容，可能是对象，也可能是字符串
  response?: string | Record<string, any>
}

export interface ChooseFile {
  path: string // 上传临时地址
  size?: number // 上传大小
  name?: string // 当前文件名称，仅h5支持
  type: 'image' | 'video' | 'file' // 上传类型
  duration?: number // 上传时间
  thumb?: string // 缩略图地址
}

export type UploadSourceType = 'album' | 'camera'
export type UploadSizeType = 'original' | 'compressed'
export type UploadFileType = 'image' | 'video' | 'media' | 'all' | 'file'
export type UploadCameraType = 'front' | 'back'
export type UploadStatusType = 'pending' | 'loading' | 'success' | 'fail'

export type UploadBeforePreviewOption = {
  file: UploadFileItem
  index: number
  imgList: string[]
  fileList: UploadFileItem[]
  resolve: (isPass: boolean) => void
}
export type UploadBeforePreview = (option: UploadBeforePreviewOption) => void

export type UploadOnPreviewFailOption = {
  index: number
  imgList: string[]
}
export type UploadOnPreviewFail = (option: UploadOnPreviewFailOption) => void

export type UploadBeforeRemoveOption = {
  file: UploadFileItem
  index: number
  fileList: UploadFileItem[]
  resolve: (isPass: boolean) => void
}
export type UploadBeforeRemove = (option: UploadBeforeRemoveOption) => void

export type UploadBeforeChooseOption = {
  fileList: UploadFileItem[]
  resolve: (isPass: boolean) => void
}
export type UploadBeforeChoose = (option: UploadBeforeChooseOption) => void

export type UploadBeforeUploadOption = {
  files: Record<string, any>[]
  fileList: UploadFileItem[]
  resolve: (isPass: boolean) => void
}
export type UploadBeforeUpload = (options: UploadBeforeUploadOption) => void

export type UploadFormData = Record<string, any>

export type UploadBuildFormDataOption = {
  file: UploadFileItem
  formData: UploadFormData
  resolve: (formData: Record<string, any>) => void
}
export type UploadBuildFormData = (options: UploadBuildFormDataOption) => void

export type UploadFile = Partial<UploadFileItem> & { url: string }

export type UploadMethod = (
  uploadFile: UploadFileItem,
  formData: UploadFormData,
  options: {
    action: string
    header: Record<string, any>
    name: string
    fileName: string
    fileType: 'image' | 'video' | 'audio'
    statusCode: number
    // 添加是否自动中断之前上传的选项
    abortPrevious?: boolean
    onSuccess: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: UploadFormData) => void
    onError: (res: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: UploadFormData) => void
    onProgress: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => void
  }
) => UniApp.UploadTask | void | Promise<void> // 修改这里,支持返回 UploadTask 类型

export const uploadProps = {
  ...baseProps,
  /**
   * 上传的文件列表,例如:[{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}]
   * 类型：array
   * 默认值：[]
   */
  fileList: makeArrayProp<UploadFile>(),
  /**
   * 必选参数，上传的地址
   * 类型：string
   * 默认值：''
   */
  action: makeStringProp(''),
  /**
   * 设置上传的请求头部
   * 类型：object
   * 默认值：{}
   */
  header: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  /**
   * 是否支持多选文件
   * 类型：boolean
   * 默认值：false
   */
  multiple: makeBooleanProp(false),
  /**
   * 是否禁用
   * 类型：boolean
   * 默认值：false
   */
  disabled: makeBooleanProp(false),
  /**
   * 最大允许上传个数
   * 类型：number
   * 默认值：无
   */
  limit: Number,
  /**
   * 限制上传个数的情况下，是否展示当前上传的个数
   * 类型：boolean
   * 默认值：true
   */
  showLimitNum: makeBooleanProp(true),
  /**
   * 文件大小限制，单位为byte
   * 类型：number
   * 默认值：Number.MAX_VALUE
   */
  maxSize: makeNumberProp(Number.MAX_VALUE),
  /**
   * 选择图片的来源，chooseImage接口详细参数，查看官方手册
   * 类型：array
   * 默认值：['album','camera']
   */
  sourceType: {
    type: Array as PropType<UploadSourceType[]>,
    default: () => ['album', 'camera']
  },
  /**
   * 所选的图片的尺寸，chooseImage接口详细参数，查看官方手册
   * 类型：array
   * 默认值：['original','compressed']
   */
  sizeType: {
    type: Array as PropType<UploadSizeType[]>,
    // #ifndef MP-DINGTALK
    default: () => ['original', 'compressed']
    // #endif
  },
  /**
   * 文件对应的key，开发者在服务端可以通过这个key获取文件的二进制内容，uploadFile接口详细参数，查看官方手册
   * 类型：string
   * 默认值：'file'
   */
  name: makeStringProp('file'),
  /**
   * HTTP请求中其他额外的formdata，uploadFile接口详细参数，查看官方手册
   * 类型：object
   * 默认值：{}
   */
  formData: { type: Object as PropType<UploadFormData>, default: () => ({}) },
  /**
   * 预览失败执行操作
   * 类型：function({index,imgList})
   * 默认值：-
   */
  onPreviewFail: Function as PropType<UploadOnPreviewFail>,
  /**
   * 上传文件之前的钩子，参数为上传的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({files,fileList,resolve})
   * 默认值：-
   */
  beforeUpload: Function as PropType<UploadBeforeUpload>,
  /**
   * 选择图片之前的钩子，参数为文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({fileList,resolve})
   * 默认值：-
   */
  beforeChoose: Function as PropType<UploadBeforeChoose>,
  /**
   * 删除文件之前的钩子，参数为要删除的文件和文件列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({file,fileList,resolve})
   * 默认值：-
   */
  beforeRemove: Function as PropType<UploadBeforeRemove>,
  /**
   * 图片预览前的钩子，参数为预览的图片下标和图片列表，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({index,imgList,resolve})
   * 默认值：-
   */
  beforePreview: Function as PropType<UploadBeforePreview>,
  /**
   * 构建上传formData的钩子，参数为上传的文件、待处理的formData，返回值为处理后的formData，若返回false或者返回Promise且被reject，则停止上传。
   * 类型：function({file,formData,resolve})
   * 默认值：-
   * 最低版本：0.1.61
   */
  buildFormData: Function as PropType<UploadBuildFormData>,
  /**
   * 加载中图标类型
   * 类型：string
   * 默认值：'ring'
   */
  loadingType: makeStringProp<LoadingType>('ring'),
  /**
   * 加载中图标颜色
   * 类型：string
   * 默认值：'#ffffff'
   */
  loadingColor: makeStringProp('#ffffff'),
  /**
   * 文件类型，可选值：'image' | 'video' | 'media' | 'all' | 'file'
   * 默认值：image
   * 描述：'media'表示同时支持'image'和'video'，'file'表示支持除'image'和'video'外的所有文件类型，'all'标识支持全部类型文件
   * 'media'和'file'仅微信支持，'all'仅微信和H5支持
   */
  accept: makeStringProp<UploadFileType>('image'),
  /**
   * file 数据结构中，status 对应的 key
   * 类型：string
   * 默认值：'status'
   */
  statusKey: makeStringProp('status'),
  /**
   * 加载中图标尺寸
   * 类型：string
   * 默认值：'24px'
   */
  loadingSize: makeStringProp('24px'),
  /**
   * 是否压缩视频，当 accept 为 video 时生效。
   * 类型：boolean
   * 默认值：true
   */
  compressed: makeBooleanProp(true),
  /**
   * 拍摄视频最长拍摄时间，当 accept 为 video | media 时生效，单位秒。
   * 类型：number
   * 默认值：60
   */
  maxDuration: makeNumberProp(60),
  /**
   * 使用前置或者后置相机，当 accept 为 video | media 时生效，可选值为：back｜front。
   * 类型：UploadCameraType
   * 默认值：'back'
   */
  camera: makeStringProp<UploadCameraType>('back'),
  /**
   * 预览图片的mode属性
   */
  imageMode: makeStringProp<ImageMode>('aspectFit'),
  /**
   * 接口响应的成功状态（statusCode）值
   */
  successStatus: makeNumberProp(200),
  /**
   * 自定义上传按钮样式
   * 类型：string
   */
  customEvokeClass: makeStringProp(''),
  /**
   * 自定义预览图片列表样式
   * 类型：string
   */
  customPreviewClass: makeStringProp(''),
  /**
   * 是否选择文件后自动上传
   * 类型：boolean
   */
  autoUpload: makeBooleanProp(true),
  /**
   * 点击已上传时是否可以重新上传
   * 类型：boolean
   * 默认值：false
   */
  reupload: makeBooleanProp(false),
  /**
   * 自定义上传文件的请求方法
   * 类型：UploadMethod
   * 默认值：-
   */
  uploadMethod: Function as PropType<UploadMethod>,
  /**
   * 根据文件拓展名过滤,每一项都不能是空字符串。默认不过滤。
   * H5支持全部类型过滤。
   * 微信小程序支持all和file时过滤,其余平台不支持。
   */
  extension: Array as PropType<string[]>
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadExpose = {
  /**
   * 手动触发上传
   */
  submit: () => void
  /**
   * 取消上传
   * @param task 上传任务
   */
  abort: (task?: UniApp.UploadTask) => void
}

export type UploadErrorEvent = {
  error: any
  file: UploadFileItem
  formData: UploadFormData
}

export type UploadChangeEvent = {
  fileList: UploadFileItem[]
}

export type UploadSuccessEvent = {
  file: UploadFileItem
  fileList: UploadFileItem[]
  formData: UploadFormData
}

export type UploadProgressEvent = {
  response: UniApp.OnProgressUpdateResult
  file: UploadFileItem
}

export type UploadOversizeEvent = {
  file: ChooseFile
}

export type UploadRemoveEvent = {
  file: UploadFileItem
}

export type UploadInstance = ComponentPublicInstance<UploadProps, UploadExpose>
