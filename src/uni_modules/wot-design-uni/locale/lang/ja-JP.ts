export default {
  calendar: {
    placeholder: '選択してください',
    title: '日付を選択',
    day: '日',
    week: '週',
    month: '月',
    confirm: '確認',
    startTime: '開始時間',
    endTime: '終了時間',
    to: '〜',
    timeFormat: 'YY年MM月DD日 HH:mm:ss',
    dateFormat: 'YYYY年MM月DD日',
    weekFormat: (year: number, week: number) => `${year}年 第${week}週`,
    startWeek: '開始週',
    endWeek: '終了週',
    startMonth: '開始月',
    endMonth: '終了月',
    monthFormat: 'YYYY年MM月'
  },
  calendarView: {
    startTime: '開始',
    endTime: '終了',
    weeks: {
      sun: '日',
      mon: '月',
      tue: '火',
      wed: '水',
      thu: '木',
      fri: '金',
      sat: '土'
    },
    rangePrompt: (maxRange: number) => `選択できる日数は最大${maxRange}日です`,
    rangePromptWeek: (maxRange: number) => `選択できる週数は最大${maxRange}週です`,
    rangePromptMonth: (maxRange: number) => `選択できる月数は最大${maxRange}ヶ月です`,
    monthTitle: 'YYYY年MM月',
    yearTitle: 'YYYY年',
    month: 'MM月',
    hour: (value: number) => `${value}時`,
    minute: (value: number) => `${value}分`,
    second: (value: number) => `${value}秒`
  },
  collapse: {
    expand: '展開',
    retract: '折りたたむ'
  },
  colPicker: {
    title: '選択してください',
    placeholder: '選択してください',
    select: '選択'
  },
  datetimePicker: {
    start: '開始時間',
    end: '終了時間',
    to: '〜',
    placeholder: '選択してください',
    confirm: '完了',
    cancel: 'キャンセル'
  },
  loadmore: {
    loading: '読み込み中...',
    finished: '読み込み完了',
    error: '読み込みエラー',
    retry: '再試行'
  },
  messageBox: {
    inputPlaceholder: '入力してください',
    confirm: '確認',
    cancel: 'キャンセル',
    inputNoValidate: '無効なデータが入力されました'
  },
  numberKeyboard: {
    confirm: '完了'
  },
  pagination: {
    prev: '前へ',
    next: '次へ',
    page: (value: number) => `ページ: ${value}`,
    total: (total: number) => `合計: ${total}`,
    size: (size: number) => `ページサイズ: ${size}`
  },
  picker: {
    cancel: 'キャンセル',
    done: '完了',
    placeholder: '選択してください'
  },
  imgCropper: {
    confirm: '完了',
    cancel: 'キャンセル'
  },
  search: {
    search: '検索',
    cancel: 'キャンセル'
  },
  steps: {
    wait: '未開始',
    finished: '完了',
    process: '進行中',
    failed: '失敗'
  },
  tabs: {
    all: 'すべて'
  },
  upload: {
    error: 'アップロードエラー'
  },
  input: {
    placeholder: '入力してください...'
  },
  selectPicker: {
    title: '選択してください',
    placeholder: '選択してください',
    select: '選択',
    confirm: '確認',
    filterPlaceholder: '検索'
  },
  tag: {
    placeholder: '入力してください',
    add: 'タグを追加'
  },
  textarea: {
    placeholder: '入力してください...'
  },
  tableCol: {
    indexLabel: '索引'
  },
  signature: {
    confirmText: '確認',
    clearText: 'クリア',
    revokeText: '元に戻す',
    restoreText: '復元'
  }
}
