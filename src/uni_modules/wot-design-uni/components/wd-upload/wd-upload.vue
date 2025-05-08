<template>
  <view :class="['wd-upload', customClass]" :style="customStyle">
    <!-- 预览列表 -->
    <view :class="['wd-upload__preview', customPreviewClass]" v-for="(file, index) in uploadFiles" :key="index">
      <!-- 成功时展示图片 -->
      <view class="wd-upload__status-content">
        <image v-if="isImage(file)" :src="file.url" :mode="imageMode" class="wd-upload__picture" @click="onPreviewImage(file)" />
        <template v-else-if="isVideo(file)">
          <view class="wd-upload__video" v-if="file.thumb" @click="onPreviewVideo(file)">
            <image :src="file.thumb" :mode="imageMode" class="wd-upload__picture" />
            <wd-icon name="play-circle-filled" custom-class="wd-upload__video-paly"></wd-icon>
          </view>
          <view v-else class="wd-upload__video" @click="onPreviewVideo(file)">
            <!-- #ifdef APP-PLUS || MP-DINGTALK -->
            <wd-icon custom-class="wd-upload__video-icon" name="video"></wd-icon>
            <!-- #endif -->
            <!-- #ifndef APP-PLUS -->
            <!-- #ifndef MP-DINGTALK -->
            <video
              :src="file.url"
              :title="file.name || '视频' + index"
              object-fit="contain"
              :controls="false"
              :poster="file.thumb"
              :autoplay="false"
              :show-center-play-btn="false"
              :show-fullscreen-btn="false"
              :show-play-btn="false"
              :show-loading="false"
              :show-progress="false"
              :show-mute-btn="false"
              :enable-progress-gesture="false"
              :enableNative="true"
              class="wd-upload__video"
            ></video>
            <wd-icon name="play-circle-filled" custom-class="wd-upload__video-paly"></wd-icon>
            <!-- #endif -->
            <!-- #endif -->
          </view>
        </template>

        <view v-else class="wd-upload__file" @click="onPreviewFile(file)">
          <wd-icon name="file" custom-class="wd-upload__file-icon"></wd-icon>
          <view class="wd-upload__file-name">{{ file.name || file.url }}</view>
        </view>
      </view>

      <view v-if="file[props.statusKey] !== 'success'" class="wd-upload__mask wd-upload__status-content">
        <!-- loading时展示loading图标和进度 -->
        <view v-if="file[props.statusKey] === 'loading'" class="wd-upload__status-content">
          <wd-loading :type="loadingType" :size="loadingSize" :color="loadingColor" />
          <text class="wd-upload__progress-txt">{{ file.percent }}%</text>
        </view>
        <!-- 失败时展示失败图标以及失败信息 -->
        <view v-if="file[props.statusKey] === 'fail'" class="wd-upload__status-content">
          <wd-icon name="close-outline" custom-class="wd-upload__icon"></wd-icon>
          <text class="wd-upload__progress-txt">{{ file.error || translate('error') }}</text>
        </view>
      </view>
      <!-- 上传状态为上传中时不展示移除按钮 -->
      <wd-icon
        v-if="file[props.statusKey] !== 'loading' && !disabled"
        name="error-fill"
        custom-class="wd-upload__close"
        @click="removeFile(index)"
      ></wd-icon>
      <!-- 自定义预览样式 -->
      <slot name="preview-cover" v-if="$slots['preview-cover']" :file="file" :index="index"></slot>
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
  <wd-video-preview ref="videoPreview"></wd-video-preview>
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
import wdIcon from '../wd-icon/wd-icon.vue'
import wdVideoPreview from '../wd-video-preview/wd-video-preview.vue'
import wdLoading from '../wd-loading/wd-loading.vue'

import { computed, ref, watch } from 'vue'
import { context, isEqual, isImageUrl, isVideoUrl, isFunction, isDef, deepClone } from '../common/util'
import { useTranslate } from '../composables/useTranslate'
import { useUpload } from '../composables/useUpload'
import {
  uploadProps,
  type UploadFileItem,
  type ChooseFile,
  type UploadExpose,
  type UploadErrorEvent,
  type UploadChangeEvent,
  type UploadSuccessEvent,
  type UploadProgressEvent,
  type UploadOversizeEvent,
  type UploadRemoveEvent,
  type UploadMethod
} from './types'
import type { VideoPreviewInstance } from '../wd-video-preview/types'

const props = defineProps(uploadProps)

const emit = defineEmits<{
  (e: 'fail', value: UploadErrorEvent): void
  (e: 'change', value: UploadChangeEvent): void
  (e: 'success', value: UploadSuccessEvent): void
  (e: 'progress', value: UploadProgressEvent): void
  (e: 'oversize', value: UploadOversizeEvent): void
  (e: 'chooseerror', value: any): void
  (e: 'remove', value: UploadRemoveEvent): void
  (e: 'update:fileList', value: UploadFileItem[]): void
}>()

defineExpose<UploadExpose>({
  submit: () => startUploadFiles(),
  abort: () => abort()
})

const { translate } = useTranslate('upload')

const uploadFiles = ref<UploadFileItem[]>([])

const showUpload = computed(() => !props.limit || uploadFiles.value.length < props.limit)

const videoPreview = ref<VideoPreviewInstance>()

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

watch(
  () => props.fileList,
  (val) => {
    const { statusKey } = props
    if (isEqual(val, uploadFiles.value)) return
    const uploadFileList: UploadFileItem[] = val.map((item) => {
      item[statusKey] = item[statusKey] || 'success'
      item.response = item.response || ''
      return { ...item, uid: context.id++ }
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
    if (fn && !isFunction(fn)) {
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
    if (fn && !isFunction(fn)) {
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
    if (fn && !isFunction(fn)) {
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
    if (fn && !isFunction(fn)) {
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
    if (fn && !isFunction(fn)) {
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
    if (fn && !isFunction(fn)) {
      console.error('The type of buildFormData must be Function')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

function emitFileList() {
  emit('update:fileList', uploadFiles.value)
}

/**
 *  开始上传文件
 */
function startUploadFiles() {
  const { buildFormData, formData = {}, statusKey } = props
  const { action, name, header = {}, accept, successStatus, uploadMethod } = props
  const statusCode = isDef(successStatus) ? successStatus : 200

  for (const uploadFile of uploadFiles.value) {
    // 仅开始未上传的文件
    if (uploadFile[statusKey] === UPLOAD_STATUS.PENDING) {
      if (buildFormData) {
        buildFormData({
          file: uploadFile,
          formData,
          resolve: (formData: Record<string, any>) => {
            formData &&
              startUpload(uploadFile, {
                action,
                header,
                name,
                formData,
                fileType: accept as 'image' | 'video' | 'audio',
                statusCode,
                statusKey,
                uploadMethod,
                onSuccess: handleSuccess,
                onError: handleError,
                onProgress: handleProgress
              })
          }
        })
      } else {
        startUpload(uploadFile, {
          action,
          header,
          name,
          formData,
          fileType: accept as 'image' | 'video' | 'audio',
          statusCode,
          statusKey,
          uploadMethod,
          onSuccess: handleSuccess,
          onError: handleError,
          onProgress: handleProgress
        })
      }
    }
  }
}

/**
 * 获取图片信息
 * @param img
 */
function getImageInfo(img: string) {
  return new Promise<UniApp.GetImageInfoSuccessData>((resolve, reject) => {
    uni.getImageInfo({
      src: img,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

/**
 * @description 初始化文件数据
 * @param {Object} file 上传的文件
 */
function initFile(file: ChooseFile, currentIndex?: number) {
  const { statusKey } = props
  // 状态初始化
  const initState: UploadFileItem = {
    uid: context.id++,
    // 仅h5支持 name
    name: file.name || '',
    thumb: file.thumb || '',
    [statusKey]: 'pending',
    size: file.size || 0,
    url: file.path,
    percent: 0
  }
  if (typeof currentIndex === 'number') {
    uploadFiles.value.splice(currentIndex, 1, initState)
  } else {
    uploadFiles.value.push(initState)
  }
  if (props.autoUpload) {
    startUploadFiles()
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
    emitFileList()
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
    emitFileList()
  }
}

/**
 * @description 上传中捕获
 * @param {Object} res 接口返回信息
 * @param {Object} file 上传的文件
 */
function handleProgress(res: UniApp.OnProgressUpdateResult, file: UploadFileItem) {
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index].percent = res.progress
    emit('progress', { response: res, file })
  }
}

/**
 * @description 选择文件的实际操作，将chooseFile自己用promise包了一层
 */
function onChooseFile(currentIndex?: number) {
  const { multiple, maxSize, accept, sizeType, limit, sourceType, compressed, maxDuration, camera, beforeUpload, extension } = props

  chooseFile({
    multiple,
    sizeType,
    sourceType,
    maxCount: limit ? limit - uploadFiles.value.length : 9,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  })
    .then((res) => {
      // 成功选择初始化file
      let files = res
      // 单选只有一个
      if (!multiple) {
        files = files.slice(0, 1)
      }
      // 遍历列表逐个初始化上传参数
      const mapFiles = async (files: ChooseFile[]) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index]
          if (file.type === 'image' && !file.size) {
            const imageInfo = await getImageInfo(file.path)
            file.size = imageInfo.width * imageInfo.height
          }
          Number(file.size) <= maxSize ? initFile(file, currentIndex) : emit('oversize', { file })
        }
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

/**
 * @description 选择文件，内置拦截选择操作
 */
function handleChoose(index?: number) {
  if (props.disabled) return
  const { beforeChoose } = props

  // 选择图片前的钩子
  if (beforeChoose) {
    beforeChoose({
      fileList: uploadFiles.value,
      resolve: (isPass: boolean) => {
        isPass && onChooseFile(index)
      }
    })
  } else {
    onChooseFile(index)
  }
}

/**
 * @description 移除文件
 * @param {Object} file 上传的文件
 * @param {Number} index 删除
 */
function handleRemove(file: UploadFileItem) {
  uploadFiles.value.splice(
    uploadFiles.value.findIndex((item) => item.uid === file.uid),
    1
  )
  emit('change', {
    fileList: uploadFiles.value
  })
  emit('remove', { file })
  emitFileList()
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

/**
 * 预览文件
 * @param file
 */
function handlePreviewFile(file: UploadFileItem) {
  uni.openDocument({
    filePath: file.url,
    showMenu: true
  })
}

/**
 * 预览图片
 * @param index
 * @param lists
 */
function handlePreviewImage(index: number, lists: string[]) {
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

/**
 * 预览视频
 * @param index
 * @param lists
 */
function handlePreviewVieo(index: number, lists: UploadFileItem[]) {
  const { onPreviewFail } = props
  // #ifdef MP-WEIXIN
  uni.previewMedia({
    current: index,
    sources: lists.map((file) => {
      return {
        url: file.url,
        type: 'video',
        poster: file.thumb
      }
    }),
    fail() {
      if (onPreviewFail) {
        onPreviewFail({
          index,
          imgList: []
        })
      } else {
        uni.showToast({ title: '预览视频失败', icon: 'none' })
      }
    }
  })
  // #endif

  // #ifndef MP-WEIXIN
  videoPreview.value?.open({ url: lists[index].url, poster: lists[index].thumb, title: lists[index].name })
  // #endif
}

function onPreviewImage(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  const imgList = fileList.filter((file) => isImage(file)).map((file) => file.url)
  const imgIndex: number = imgList.findIndex((item) => item === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    if (beforePreview) {
      beforePreview({
        file,
        index,
        fileList: fileList,
        imgList: imgList,
        resolve: (isPass: boolean) => {
          isPass && handlePreviewImage(imgIndex, imgList)
        }
      })
    } else {
      handlePreviewImage(imgIndex, imgList)
    }
  }
}

function onPreviewVideo(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  const videoList = fileList.filter((file) => isVideo(file))
  const videoIndex: number = videoList.findIndex((item) => item.url === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    if (beforePreview) {
      beforePreview({
        file,
        index,
        imgList: [],
        fileList,
        resolve: (isPass: boolean) => {
          isPass && handlePreviewVieo(videoIndex, videoList)
        }
      })
    } else {
      handlePreviewVieo(videoIndex, videoList)
    }
  }
}

function onPreviewFile(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    if (beforePreview) {
      beforePreview({
        file,
        index,
        imgList: [],
        fileList,
        resolve: (isPass: boolean) => {
          isPass && handlePreviewFile(file)
        }
      })
    } else {
      handlePreviewFile(file)
    }
  }
}

function isVideo(file: UploadFileItem) {
  return (file.name && isVideoUrl(file.name)) || isVideoUrl(file.url)
}

function isImage(file: UploadFileItem) {
  return (file.name && isImageUrl(file.name)) || isImageUrl(file.url)
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
