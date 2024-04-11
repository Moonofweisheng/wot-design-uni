<template>
  <view :class="['wd-upload', customClass]" :style="customStyle">
    <!-- 预览列表 -->
    <view :class="['wd-upload__preview', customPreviewClass]" v-for="(file, index) in uploadFiles" :key="index">
      <!-- 成功时展示图片 -->
      <view class="wd-upload__status-content">
        <image :src="file.url" :mode="imageMode" class="wd-upload__picture" @click="onPreviewImage(index)" />
      </view>

      <view v-if="file.status !== 'success'" class="wd-upload__mask wd-upload__status-content">
        <!-- loading时展示loading图标和进度 -->
        <view v-if="file.status === 'loading'" class="wd-upload__status-content">
          <wd-loading :type="loadingType" :size="loadingSize" :color="loadingColor" />
          <text class="wd-upload__progress-txt">{{ file.percent }}%</text>
        </view>
        <!-- 失败时展示失败图标以及失败信息 -->
        <view v-if="file.status === 'fail'" class="wd-upload__status-content">
          <wd-icon name="close-outline" custom-class="wd-upload__icon"></wd-icon>
          <text class="wd-upload__progress-txt">{{ file.error || translate('error') }}</text>
        </view>
      </view>
      <!-- 上传状态为上传中时不展示移除按钮 -->
      <wd-icon v-if="file.status !== 'loading' && !disabled" name="error-fill" custom-class="wd-upload__close" @click="removeFile(index)"></wd-icon>
    </view>

    <block v-if="showUpload">
      <view :class="['wd-upload__evoke-slot', customEvokeClass]" v-if="$slots.default" @click="handleChoose">
        <slot></slot>
      </view>
      <!-- 唤起项 -->
      <view v-else @click="handleChoose" :class="['wd-upload__evoke', disabled ? 'is-disabled' : '', customEvokeClass]">
        <!-- 唤起项图标 -->
        <wd-icon class="wd-upload__evoke-icon" name="fill-camera"></wd-icon>
        <!-- 有限制个数时确认是否展示限制个数 -->
        <view v-if="limit && showLimitNum" class="wd-upload__evoke-num">（{{ uploadFiles.length }}/{{ limit }}）</view>
      </view>
    </block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-upload',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { context, getType, isDef, isEqual, isFunction } from '../common/util'
import { chooseFile } from './utils'
import { useTranslate } from '../composables/useTranslate'
import { uploadProps, type UploadFileItem } from './types'

const props = defineProps(uploadProps)
const emit = defineEmits(['fail', 'change', 'success', 'progress', 'oversize', 'chooseerror', 'remove'])

const { translate } = useTranslate('upload')

const uploadFiles = ref<UploadFileItem[]>([])

const showUpload = computed(() => !props.limit || uploadFiles.value.length < props.limit)

watch(
  () => props.fileList,
  (val) => {
    const { statusKey } = props
    if (isEqual(val, uploadFiles.value)) return
    const uploadFileList = val.map((item) => {
      item.uid = context.id++
      item[statusKey] = item[statusKey] || 'success'
      item.action = props.action || ''
      item.response = item.response || ''
      return item
    })
    uploadFiles.value = uploadFileList
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.limit,
  (val) => {
    if (val && val < uploadFiles.value.length) {
      console.error('[wot-design]Error: props limit must less than fileList.length')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.beforePreview,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of beforePreview must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.onPreviewFail,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of onPreviewFail must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.beforeRemove,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of beforeRemove must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.beforeUpload,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of beforeUpload must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.beforeChoose,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of beforeChoose must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.buildFormData,
  (fn) => {
    if (fn && !isFunction(fn) && getType(fn) !== 'asyncfunction') {
      console.error('The type of buildFormData must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * @description 初始化文件数据
 * @param {Object} file 上传的文件
 */
function initFile(file: UploadFileItem) {
  // 状态初始化
  const initState: UploadFileItem = {
    uid: context.id++,
    // 仅h5支持 name
    name: file.name || '',
    status: 'loading',
    size: file.size,
    url: file.path,
    action: props.action,
    percent: 0
  }

  uploadFiles.value.push(initState)

  const { buildFormData, formData = {} } = props

  if (buildFormData) {
    buildFormData({
      file: initState,
      formData,
      resolve: (formData: Record<string, any>) => {
        formData && handleUpload(initState, formData)
      }
    })
  } else {
    handleUpload(initState, formData)
  }
}

/**
 * @description 上传失败捕获
 * @param {Object} err 错误返回信息
 * @param {Object} file 上传的文件
 */
function handleError(err: Record<string, any>, file: UploadFileItem, formData: Record<string, any>) {
  const { statusKey } = props
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index][statusKey] = 'fail'
    uploadFiles.value[index].error = err.message
    uploadFiles.value[index].response = err
    emit('fail', { error: err, file, formData })
  }
}

/**
 * @description 上传成功捕获
 * @param {Object} res 接口返回信息
 * @param {Object} file 上传的文件
 */
function handleSuccess(res: Record<string, any>, file: UploadFileItem, formData: Record<string, any>) {
  const { statusKey } = props
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index][statusKey] = 'success'
    uploadFiles.value[index].response = res.data
    emit('change', { fileList: uploadFiles.value })
    emit('success', { file, fileList: uploadFiles.value, formData })
  }
}

/**
 * @description 上传中捕获
 * @param {Object} res 接口返回信息
 * @param {Object} file 上传的文件
 */
function handleProgress(res: Record<string, any>, file: UploadFileItem) {
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index].percent = res.progress
    emit('progress', { response: res, file })
  }
}

/**
 * @description 上传操作
 * @param {Object} file 上传的文件
 */
function handleUpload(file: UploadFileItem, formData: Record<string, any>) {
  const { action, name, header = {}, accept } = props

  const uploadTask = uni.uploadFile({
    url: action,
    header,
    name,
    fileName: name,
    fileType: accept as 'image' | 'video' | 'audio',
    formData,
    filePath: file.url,
    success(res) {
      if (res.statusCode === 200) {
        // 上传成功进行文件列表拼接
        handleSuccess(res, file, formData)
      } else {
        // 上传失败处理
        handleError(res, file, formData)
      }
    },
    fail(err) {
      // 上传失败处理
      handleError(err, file, formData)
    }
  })

  // 获取当前文件加载的百分比
  uploadTask.onProgressUpdate((res) => {
    /**
     * res.progress: 上传进度
     * res.totalBytesSent: 已经上传的数据长度
     * res.totalBytesExpectedToSend: 预期需要上传的数据总长度
     */
    handleProgress(res, file)
  })
}

/**
 * @description 选择文件的实际操作，将chooseFile自己用promise包了一层
 */
function onChooseFile() {
  const { multiple, maxSize, accept, sizeType, limit, sourceType, beforeUpload } = props
  // 设置为只选择图片的时候使用 chooseImage 来实现
  if (accept === 'image') {
    // 文件选择
    chooseFile({
      multiple,
      sizeType,
      sourceType,
      maxCount: limit ? limit - uploadFiles.value.length : 9
    })
      .then((res: any) => {
        // 成功选择初始化file
        let files: Array<any> = Array.prototype.slice.call(res.tempFiles)
        // 单选只有一个
        if (!multiple) {
          files = files.slice(0, 1)
        }

        // 遍历列表逐个初始化上传参数
        const mapFiles = (files: Array<any>) => {
          files.forEach(async (file: any) => {
            if (!isDef(file.size)) {
              file.size = await getImageInfo(file.path)
            }
            file.size <= maxSize ? initFile(file) : emit('oversize', { file })
          })
        }

        // 上传前的钩子
        if (beforeUpload) {
          beforeUpload({
            files,
            fileList: uploadFiles.value,
            resolve: (isPass: boolean) => {
              isPass && mapFiles(files)
            }
          })
        } else {
          mapFiles(files)
        }
      })
      .catch((error) => {
        emit('chooseerror', { error })
      })
  }
}

/**
 * 获取图片信息
 * @param src 图片地址
 */
function getImageInfo(src: string) {
  return new Promise<number>((resolve, reject) => {
    uni.getImageInfo({
      src: src,
      success: (res) => {
        resolve(res.height * res.width)
      },
      fail: () => {
        reject(0)
      }
    })
  })
}

/**
 * @description 选择文件，内置拦截选择操作
 */
function handleChoose() {
  if (props.disabled) return
  const { beforeChoose } = props

  // 选择图片前的钩子
  if (beforeChoose) {
    beforeChoose({
      fileList: uploadFiles.value,
      resolve: (isPass: boolean) => {
        isPass && onChooseFile()
      }
    })
  } else {
    onChooseFile()
  }
}

/**
 * @description 移除文件
 * @param {Object} file 上传的文件
 * @param {Number} index 删除
 */
function handleRemove(file: Record<any, any>, index?: number) {
  uploadFiles.value.splice(
    uploadFiles.value.findIndex((item) => item.uid === file.uid),
    1
  )
  emit('change', {
    fileList: uploadFiles.value
  })
  emit('remove', { file })
}

function removeFile(index: number) {
  const { beforeRemove } = props
  const intIndex: number = index
  const file = uploadFiles.value[intIndex]
  if (beforeRemove) {
    beforeRemove({
      file,
      index: intIndex,
      fileList: uploadFiles.value,
      resolve: (isPass: boolean) => {
        isPass && handleRemove(file)
      }
    })
  } else {
    handleRemove(file)
  }
}

function onPreview(index: number, lists: string[]) {
  const { onPreviewFail } = props
  uni.previewImage({
    urls: lists,
    current: lists[index],
    fail() {
      if (onPreviewFail) {
        onPreviewFail({
          index,
          imgList: lists
        })
      } else {
        uni.showToast({ title: '预览图片失败', icon: 'none' })
      }
    }
  })
}

function onPreviewImage(index: number) {
  const { beforePreview } = props
  const lists = uploadFiles.value.map((file) => file.url)
  if (beforePreview) {
    beforePreview({
      index,
      imgList: lists,
      resolve: (isPass: boolean) => {
        isPass && onPreview(index, lists)
      }
    })
  } else {
    onPreview(index, lists)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
