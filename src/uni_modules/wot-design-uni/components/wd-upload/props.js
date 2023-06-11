export const chooseImageProps = {
  // 多选
  multiple: Boolean,
  // 接受类型 暂定接受类型为图片，视频后续添加
  accept: {
    type: String,
    value: 'image'
  },
  sizeType: {
    type: Array,
    value: ['original', 'compressed']
  },
  sourceType: {
    type: Array,
    value: ['album', 'camera']
  }
}

export const uploadProps = {
  header: Object,
  name: {
    type: String,
    value: 'file'
  },
  formData: Object
}