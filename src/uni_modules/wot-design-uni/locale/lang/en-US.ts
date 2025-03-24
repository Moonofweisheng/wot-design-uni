export default {
  calendar: {
    placeholder: 'Select',
    title: 'Select Date',
    day: 'Date',
    week: 'Week',
    month: 'Month',
    confirm: 'OK',
    startTime: 'Start Date',
    endTime: 'End Date',
    to: 'To',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `${year} W${week}`,
    startWeek: 'Start Week',
    endWeek: 'End Week',
    startMonth: 'Start Month',
    endMonth: 'End Month',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'Start Time',
    endTime: 'End Time',
    weeks: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    },
    rangePrompt: (maxRange: number) => `The number of selected days cannot exceed ${maxRange} days`,
    rangePromptWeek: (maxRange: number) => `The number of weeks selected cannot exceed ${maxRange} weeks`,
    rangePromptMonth: (maxRange: number) => `The selected month cannot exceed ${maxRange} months`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`
  },
  datetimePicker: {
    start: 'From',
    end: 'To',
    to: 'To',
    placeholder: 'Select',
    confirm: 'OK',
    cancel: 'Cancel'
  },
  collapse: {
    expand: 'Expand',
    retract: 'Fold'
  },
  colPicker: {
    title: 'Select',
    placeholder: 'Select',
    select: 'Select'
  },
  loadmore: {
    loading: 'Loading...',
    finished: 'Finished loading',
    error: 'Failed to load...',
    retry: 'Refresh'
  },
  imgCropper: {
    confirm: 'OK',
    cancel: 'Cancel'
  },
  messageBox: {
    inputPlaceholder: 'Please input information',
    confirm: 'OK',
    cancel: 'Cancel',
    inputNoValidate: 'Please ensure you input correct information'
  },
  numberKeyboard: {
    confirm: 'done'
  },
  pagination: {
    prev: 'Previous',
    next: 'Next',
    page: (value: number) => `Page: ${value}`,
    total: (total: number) => `Total: ${total}`,
    size: (size: number) => `${size}/page`
  },
  picker: {
    cancel: 'Cancel',
    done: 'Done',
    placeholder: 'Select'
  },
  search: {
    search: 'Search',
    cancel: 'Cancel'
  },
  steps: {
    wait: 'Not Started',
    finished: 'Expired',
    process: 'In Progress',
    failed: 'Failed'
  },
  tabs: {
    all: 'All'
  },
  upload: {
    error: 'Failed to upload'
  },
  input: {
    placeholder: 'Please input information...'
  },
  selectPicker: {
    title: 'Select',
    placeholder: 'Select',
    select: 'Select',
    confirm: 'Ok',
    filterPlaceholder: 'Search'
  },
  tag: {
    placeholder: 'Enter',
    add: 'Add Tag'
  },
  textarea: {
    placeholder: 'Please input information...'
  },
  tableCol: {
    indexLabel: 'index'
  },
  signature: {
    confirmText: 'OK',
    clearText: 'Clear',
    revokeText: 'Undo',
    restoreText: 'Restore'
  }
}
