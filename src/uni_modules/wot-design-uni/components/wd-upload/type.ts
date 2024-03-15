import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'
import type { LoadingType } from '../wd-loading/type'

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
  customEvokeClass: makeStringProp(''),
  customPreviewClass: makeStringProp(''),
  multiple: makeBooleanProp(false),
  accept: makeStringProp('image'),
  sizeType: makeArrayProp<UploadSourceType>(),
  sourceType: makeArrayProp<UploadSizeType>(),
  header: {
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  name: makeStringProp('file'),
  formData: {
    type: Object as PropType<Record<string, any>>,
    default: () => {}
  },
  action: makeStringProp(''),
  fileList: makeArrayProp<UploadFileItem>(),
  statusKey: makeStringProp('status'),
  maxSize: makeNumberProp(Number.MAX_VALUE),
  limit: makeNumberProp(0),
  showLimitNum: makeBooleanProp(true),
  disabled: makeBooleanProp(false),
  useDefaultSlot: makeBooleanProp(false),
  loadingType: makeStringProp<LoadingType>('ring'),
  loadingColor: makeStringProp('#ffffff'),
  loadingSize: makeStringProp('24px'),
  beforePreview: Function as PropType<UploadBeforePreview>,
  onPreviewFail: Function as PropType<UploadOnPreviewFail>,
  beforeRemove: Function as PropType<UploadBeforeRemove>,
  beforeUpload: Function as PropType<UploadBeforeUpload>,
  beforeChoose: Function as PropType<UploadBeforeChoose>,
  buildFormData: Function as PropType<UploadBuildFormData>
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
