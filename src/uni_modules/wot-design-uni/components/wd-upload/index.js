import VueComponent from '../common/component'
import { getType, context, isEqual } from '../common/util'
import { chooseImageProps, uploadProps } from './props'
import { chooseFile } from './utils'

VueComponent({
  externalClasses: [
    'custom-evoke-class',
    'custom-preview-class'
  ],

  behaviors: ['jd://form-field'],

  props: {
    ...chooseImageProps,
    ...uploadProps,
    // 上传相关
    action: {
      type: String,
      required: true
    },
    fileList: {
      type: Array,
      observer (val) {
        const { statusKey } = this.data
        if (isEqual(val, this.data.uploadFiles)) return
        const uploadFiles = val.map(item => {
          item.uid = context.id++
          item[statusKey] = item[statusKey] || 'success'
          item.size = item.size || ''
          item.action = this.action || ''
          item.response = item.response || ''
          return item
        })
        this.setData({ uploadFiles })
      }
    },
    statusKey: {
      type: String,
      value: 'status'
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    limit: {
      type: Number,
      observer (val) {
        if (val && val < this.data.uploadFiles.length) {
          throw Error('[wot-design]Error: props limit must less than fileList.length')
        }
      }
    },
    showLimitMum: {
      type: Boolean,
      value: true
    },
    disabled: Boolean,
    useDefaultSlot: Boolean,
    // loading 相关
    loadingType: {
      type: String,
      value: 'ring'
    },
    loadingColor: {
      type: String,
      value: '#ffffff'
    },
    loadingSize: {
      type: String,
      value: '24px'
    },
    beforePreview: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforePreview must be Function')
        }
      }
    },
    onPreviewFail: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeRemove must be Function')
        }
      }
    },
    beforeRemove: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeRemove must be Function')
        }
      }
    },
    beforeUpload: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeUpload must be Function')
        }
      }
    },
    // 图片预览相关
    beforeChoose: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeChoose must be Function')
        }
      }
    }
  },

  data: {
    uploadFiles: []
  },

  methods: {
    /**
     * @description 初始化文件数据
     * @param {Object} file 上传的文件
     */
    initFile (file) {
      // 状态初始化
      const initState = {
        uid: context.id++,
        status: 'loading',
        size: file.size,
        url: file.path,
        action: this.data.action,
        percent: 0
      }

      const { uploadFiles } = this.data
      uploadFiles.push(initState)

      this.setData({
        uploadFiles
      })

      this.handleUpload(initState)
    },

    /**
     * @description 上传失败捕获
     * @param {Object} err 错误返回信息
     * @param {Object} file 上传的文件
     */
    handleError (err, file) {
      const { uploadFiles, statusKey } = this.data
      const index = uploadFiles.findIndex(item => item.uid === file.uid)
      if (index > -1) {
        uploadFiles[index][statusKey] = 'fail'
        uploadFiles[index].error = err.message
        uploadFiles[index].response = err
        this.setData({ uploadFiles })
        this.$emit('fail', { error: err, file })
      }
    },

    /**
     * @description 上传成功捕获
     * @param {Object} res 接口返回信息
     * @param {Object} file 上传的文件
     */
    handleSuccess (res, file) {
      const { uploadFiles, statusKey } = this.data
      const index = uploadFiles.findIndex(item => item.uid === file.uid)
      if (index > -1) {
        uploadFiles[index][statusKey] = 'success'
        uploadFiles[index].response = res.data
        this.setData({ uploadFiles })
        this.$emit('change', { fileList: uploadFiles })
        this.$emit('success', { file, fileList: uploadFiles })
      }
    },

    /**
     * @description 上传中捕获
     * @param {Object} res 接口返回信息
     * @param {Object} file 上传的文件
     */
    handleProgress (res, file) {
      const { uploadFiles } = this.data
      const index = uploadFiles.findIndex(item => item.uid === file.uid)
      if (index > -1) {
        uploadFiles[index].percent = res.progress
        this.setData({ uploadFiles })
        this.$emit('progress', { response: res, file })
      }
    },

    /**
     * @description 上传操作
     * @param {Object} file 上传的文件
     */
    handleUpload (file) {
      const {
        action,
        name,
        formData = {},
        header = {}
      } = this.data

      const _this = this

      const uploadTask = jd.uploadFile({
        url: action,
        header,
        name,
        formData,
        filePath: file.url,
        success (res) {
          // 上传成功进行文件列表拼接
          _this.handleSuccess(res, file)
        },
        fail (err) {
          // 上传失败处理
          _this.handleError(err, file)
        }
      })

      // 获取当前文件加载的百分比
      uploadTask.onProgressUpdate((res) => {
        /**
         * res.progress: 上传进度
         * res.totalBytesSent: 已经上传的数据长度
         * res.totalBytesExpectedToSend: 预期需要上传的数据总长度
         */
        _this.handleProgress(res, file)
      })
    },

    /**
     * @description 选择文件的实际操作，将chooseFile自己用promise包了一层
     */
    chooseFile () {
      const {
        multiple,
        maxSize,
        accept,
        sizeType,
        uploadFiles,
        limit,
        sourceType,
        beforeUpload
      } = this.data

      // 设置为只选择图片的时候使用 chooseImage 来实现
      if (accept === 'image') {
        // 文件选择
        chooseFile({
          multiple,
          sizeType,
          sourceType,
          maxCount: limit ? limit - uploadFiles.length : 9
        }).then((res) => {
          // 成功选择初始化file
          let files = null
          files = Array.prototype.slice.call(res.tempFiles)
          // 单选只有一个
          if (!multiple) { files = files.slice(0, 1) }

          // 遍历列表逐个初始化上传参数
          const mapFiles = (files) => {
            files.forEach(file => {
              file.size <= maxSize ? this.initFile(file) : this.$emit('oversize', { file })
            })
          }

          // 上传前的钩子
          if (beforeUpload) {
            // 向下兼容原来的参数写法，2.2.0 向下兼容 2.1.0
            if (beforeUpload.length === 2) {
              beforeUpload(files, isPass => {
                isPass && mapFiles(files)
              })
            } else {
              beforeUpload({
                files,
                fileList: uploadFiles,
                resolve: isPass => {
                  isPass && mapFiles(files)
                }
              })
            }
          } else {
            mapFiles(files)
          }
        }).catch(error => {
          this.$emit('chooseerror', { error })
        })
      }
    },

    /**
     * @description 选择文件，内置拦截选择操作
     */
    handleChoose () {
      if (this.data.disabled) return
      const { uploadFiles, beforeChoose } = this.data
      // 选择图片前的钩子
      if (beforeChoose) {
        // 向下兼容原来的参数写法，2.2.0 向下兼容 2.1.0
        if (beforeChoose.length === 2) {
          beforeChoose(uploadFiles, isPass => {
            isPass && this.chooseFile()
          })
        } else {
          beforeChoose({
            fileList: uploadFiles,
            resolve: isPass => {
              isPass && this.chooseFile()
            }
          })
        }
      } else {
        this.chooseFile()
      }
    },

    /**
     * @description 移除文件
     * @param {Object} file 上传的文件
     * @param {Number} index 删除
     */
    handleRemove (file, index) {
      const { uploadFiles } = this.data
      uploadFiles.splice(uploadFiles.findIndex(item => item.uid === file.uid), 1)
      this.setData({ uploadFiles })
      this.$emit('change', {
        fileList: uploadFiles
      })
      this.$emit('remove', { file })
    },

    removeFile (event) {
      const { index } = event.currentTarget.dataset
      const { beforeRemove, uploadFiles } = this.data
      const intIndex = parseInt(index)
      const file = uploadFiles[intIndex]
      if (beforeRemove) {
        // 向下兼容原来的参数写法，2.2.0 向下兼容 2.1.0
        if (beforeRemove.length === 3) {
          beforeRemove(file, uploadFiles, isPass => {
            isPass && this.handleRemove(file)
          })
        } else {
          beforeRemove({
            file,
            index: intIndex,
            fileList: uploadFiles,
            resolve: isPass => {
              isPass && this.handleRemove(file)
            }
          })
        }
      } else {
        this.handleRemove(file)
      }
    },

    onPreview (index, lists) {
      // 不确定京东小程序环境是否支持图片预览，因此暂不使用预览图片接口
      const { onPreviewFail } = this.data
      jd.previewImage({
        urls: lists,
        current: lists[index],
        fail () {
          if (onPreviewFail) {
            if (onPreviewFail.length === 2) {
              onPreviewFail(index, lists)
            } else {
              onPreviewFail({
                index,
                imgList: lists
              })
            }
          } else {
            jd.showToast({ title: '预览图片失败', icon: 'none' })
          }
        }
      })
    },

    onPreviewImage (event) {
      const { index } = event.currentTarget.dataset
      const { uploadFiles, beforePreview } = this.data
      const lists = uploadFiles.map(file => file.url)
      if (beforePreview) {
        // 向下兼容原来的参数写法，2.2.0 向下兼容 2.1.0
        if (beforePreview.length === 2) {
          beforePreview({ index, lists }, isPass => {
            isPass && this.onPreview(index, lists)
          })
        } else {
          beforePreview({
            index,
            imgList: lists,
            resolve: isPass => {
              isPass && this.onPreview(index, lists)
            }
          })
        }
      } else {
        this.onPreview(index, lists)
      }
    }
  }
})