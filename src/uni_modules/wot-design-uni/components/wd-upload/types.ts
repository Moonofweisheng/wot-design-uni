import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { LoadingType } from '../wd-loading/types'
import type { ImageMode } from '../wd-img/types'

export interface ChooseFileOption {
  multiple: boolean
  sizeType: string | string[]
  sourceType: string[]
  maxCount: number
}

export interface UploadFileItem {
  [key: string]: any
  // 	当前上传文件在列表中的唯一标识
  uid: number
  // 当前文件名称，仅h5支持
  name?: string
  // 上传状态
  status: string
  // 文件大小
  size: number
  // 上传图片的本地地址
  url: string
  // 上传的地址
  action: string
  // 上传进度
  percent: number
  // 后端返回的内容，可能是对象，也可能是字符串
  response?: string | Record<string, any>
}

export type UploadSourceType = 'album' | 'camera'
export type UploadSizeType = 'original' | 'compressed'

export type UploadBeforePreviewOption = {
  index: number
  imgList: string[]
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

export type UploadBuildFormDataOption = {
  file: UploadFileItem
  formData: Record<string, any>
  resolve: (formData: Record<string, any>) => void
}
export type UploadBuildFormData = (options: UploadBuildFormDataOption) => void

export const uploadProps = {
  ...baseProps,

  /**
   * 上传的文件列表,例如:[{name:'food.jpg',url:'https://xxx.cdn.com/xxx.jpg'}]
   * 类型：array
   * 默认值：[]
   */
  fileList: makeArrayProp<UploadFileItem>(),
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
  header: { type: Object as PropType<Record<string, any>>, default: () => {} },
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
   * 默认值：0
   */
  limit: makeNumberProp(0),
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
    default: () => ['original', 'compressed']
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
  formData: { type: Object as PropType<Record<string, any>>, default: () => {} },
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
  accept: makeStringProp('image'),
  /**
   * file 数据结构中，status 对应的 key
   * 类型：string
   * 默认值：'status'
   */
  statusKey: makeStringProp('status'),
  /**
   * 开启默认唤起项插槽
   * 类型：boolean
   * 默认值：false
   */
  useDefaultSlot: makeBooleanProp(false),
  /**
   * 加载中图标尺寸
   * 类型：string
   * 默认值：'24px'
   */
  loadingSize: makeStringProp('24px'),
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
   * 预览图片的mode属性
   */
  imageMode: makeStringProp<ImageMode>('aspectFit')
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
