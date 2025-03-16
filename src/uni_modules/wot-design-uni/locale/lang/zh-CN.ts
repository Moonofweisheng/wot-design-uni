/**
 * This file contains localization strings for various components.
 */

export default {
  calendar: {
    placeholder: '请选择',
    title: '选择日期',
    day: '日',
    week: '周',
    month: '月',
    confirm: '确定',
    startTime: '开始时间',
    endTime: '结束时间',
    to: '至',
    timeFormat: 'YY年MM月DD日 HH:mm:ss',
    dateFormat: 'YYYY年MM月DD日',
    weekFormat: (year: number, week: number) => `${year} 第 ${week} 周`,
    startWeek: '开始周',
    endWeek: '结束周',
    startMonth: '开始月',
    endMonth: '结束月',
    monthFormat: 'YYYY年MM月'
  },
  calendarView: {
    startTime: '开始',
    endTime: '结束',
    weeks: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    rangePrompt: (maxRange: number) => `选择天数不能超过${maxRange}天`,
    rangePromptWeek: (maxRange: number) => `选择周数不能超过${maxRange}周`,
    rangePromptMonth: (maxRange: number) => `选择月份不能超过${maxRange}个月`,
    monthTitle: 'YYYY年M月',
    yearTitle: 'YYYY年',
    month: 'M月',
    hour: (value: number) => `${value}时`,
    minute: (value: number) => `${value}分`,
    second: (value: number) => `${value}秒`
  },
  collapse: {
    expand: '展开',
    retract: '收起'
  },
  colPicker: {
    title: '请选择',
    placeholder: '请选择',
    select: '请选择'
  },
  datetimePicker: {
    start: '开始时间',
    end: '结束时间',
    to: '至',
    placeholder: '请选择',
    confirm: '完成',
    cancel: '取消'
  },
  loadmore: {
    loading: '正在努力加载中...',
    finished: '已加载完毕',
    error: '加载失败',
    retry: '点击重试'
  },
  messageBox: {
    inputPlaceholder: '请输入',
    confirm: '确定',
    cancel: '取消',
    inputNoValidate: '输入的数据不合法'
  },
  numberKeyboard: {
    confirm: '完成'
  },
  pagination: {
    prev: '上一页',
    next: '下一页',
    page: (value: number) => `当前页：${value}`,
    total: (total: number) => `当前数据：${total}条`,
    size: (size: number) => `分页大小：${size}`
  },
  picker: {
    cancel: '取消',
    done: '完成',
    placeholder: '请选择'
  },
  imgCropper: {
    confirm: '完成',
    cancel: '取消'
  },
  search: {
    search: '搜索',
    cancel: '取消'
  },
  steps: {
    wait: '未开始',
    finished: '已完成',
    process: '进行中',
    failed: '失败'
  },
  tabs: {
    all: '全部'
  },
  upload: {
    error: '上传失败'
  },
  input: {
    placeholder: '请输入...'
  },
  selectPicker: {
    title: '请选择',
    placeholder: '请选择',
    select: '请选择',
    confirm: '确认',
    filterPlaceholder: '搜索'
  },
  tag: {
    placeholder: '请输入',
    add: '新增标签'
  },
  textarea: {
    placeholder: '请输入...'
  },
  tableCol: {
    indexLabel: '序号'
  },
  signature: {
    confirmText: '确认',
    clearText: '清空',
    revokeText: '撤销',
    restoreText: '恢复'
  }
}
