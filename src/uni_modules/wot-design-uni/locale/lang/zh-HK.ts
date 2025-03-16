/**
 * This file contains the default export for various UI components in Traditional Chinese.
 */

export default {
  calendar: {
    placeholder: '請選擇',
    title: '選擇日期',
    day: '日',
    week: '週',
    month: '月',
    confirm: '確定',
    startTime: '開始時間',
    endTime: '結束時間',
    to: '至',
    timeFormat: 'YY年MM月DD日 HH:mm:ss',
    dateFormat: 'YYYY年MM月DD日',
    weekFormat: (year: number, week: number) => `${year} 第 ${week} 週`,
    startWeek: '開始週',
    endWeek: '結束週',
    startMonth: '開始月',
    endMonth: '結束月',
    monthFormat: 'YYYY年MM月'
  },
  calendarView: {
    startTime: '開始',
    endTime: '結束',
    weeks: { sun: '日', mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六' },
    rangePrompt: (maxRange: number) => `選擇天數不能超過${maxRange}天`,
    rangePromptWeek: (maxRange: number) => `選擇週數不能超過${maxRange}週`,
    rangePromptMonth: (maxRange: number) => `選擇月份不能超過${maxRange}個月`,
    monthTitle: 'YYYY年M月',
    yearTitle: 'YYYY年',
    month: 'M月',
    hour: (value: number) => `${value}時`,
    minute: (value: number) => `${value}分`,
    second: (value: number) => `${value}秒`
  },
  collapse: { expand: '展開', retract: '收起' },
  colPicker: { title: '請選擇', placeholder: '請選擇', select: '請選擇' },
  datetimePicker: { start: '開始時間', end: '結束時間', to: '至', placeholder: '請選擇', confirm: '完成', cancel: '取消' },
  loadmore: { loading: '正在努力加載中...', finished: '已加載完畢', error: '加載失敗', retry: '點擊重試' },
  messageBox: { inputPlaceholder: '請輸入', confirm: '確定', cancel: '取消', inputNoValidate: '輸入的數據不合法' },
  numberKeyboard: { confirm: '完成' },
  pagination: {
    prev: '上一頁',
    next: '下一頁',
    page: (value: number) => `當前頁：${value}`,
    total: (total: number) => `當前數據：${total}條`,
    size: (size: number) => `分頁大小：${size}`
  },
  picker: { cancel: '取消', done: '完成', placeholder: '請選擇' },
  imgCropper: { confirm: '完成', cancel: '取消' },
  search: { search: '搜索', cancel: '取消' },
  steps: { wait: '未開始', finished: '已完成', process: '進行中', failed: '失敗' },
  tabs: { all: '全部' },
  upload: { error: '上傳失敗' },
  input: { placeholder: '請輸入...' },
  selectPicker: { title: '請選擇', placeholder: '請選擇', select: '確認', confirm: '確認', filterPlaceholder: '搜索' },
  tag: { placeholder: '請輸入', add: '新增標籤' },
  textarea: { placeholder: '請輸入...' },
  tableCol: {
    indexLabel: '序號'
  },
  signature: {
    confirmText: '確認',
    clearText: '清空',
    revokeText: '撤銷',
    restoreText: '恢復'
  }
}
