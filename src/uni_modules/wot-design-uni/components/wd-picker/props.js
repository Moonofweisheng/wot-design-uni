export default {
  // 选择器左侧文案
  label: String,
  // 选择器占位符
  placeholder: {
    type: String,
    value: '请选择'
  },
  // 禁用
  disabled: {
    type: Boolean,
    value: false
  },
  // 只读
  readonly: {
    type: Boolean,
    value: false
  },
  loading: {
    type: Boolean,
    value: false
  },
  loadingColor: {
    type: String,
    value: '#4D80F0'
  },
  /* popup */
  // 弹出层标题
  title: String,
  // 取消按钮文案
  cancelButtonText: {
    type: String,
    value: '取消'
  },
  // 确认按钮文案
  confirmButtonText: {
    type: String,
    value: '完成'
  },
  // 是否必填
  required: Boolean,
  size: String,
  labelWidth: String,
  useDefaultSlot: Boolean,
  useLabelSlot: Boolean,
  error: Boolean,
  alignRight: Boolean,
  beforeConfirm: null,
  closeOnClickModal: {
    type: Boolean,
    value: true
  },
  safeAreaInsetBottom: {
    type: Boolean,
    value: true
  },
  ellipsis: Boolean
}