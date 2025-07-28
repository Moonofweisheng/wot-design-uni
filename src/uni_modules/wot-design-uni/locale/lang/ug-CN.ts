/**
 * This file contains localization strings for various components.
 */

export default {
  calendar: {
    placeholder: 'تاللاڭ',
    title: 'چېسلا تاللاش',
    day: 'كۈن',
    week: 'ھەپتە',
    month: 'ئاي',
    confirm: 'جەزملەش',
    startTime: 'باشلىنىش ۋاقتى',
    endTime: 'ئاخىرلىشىش ۋاقتى',
    to: 'دىن',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `${year}يىلى ${week}ھەپتە`,
    startWeek: 'باشلىنىش ھەپتىسى',
    endWeek: 'ئاخىرلىشىش ھەپتىسى',
    startMonth: 'باشلىنىش ئېيى',
    endMonth: 'ئاخىرلىشىش ئېيى',
    monthFormat: 'YYYYيىل MMئاي'
  },
  calendarView: {
    startTime: 'باشلا',
    endTime: 'ئاخىرلاش',
    weeks: {
      sun: 'ي',
      mon: 'د',
      tue: 'س',
      wed: 'چ',
      thu: 'پ',
      fri: 'ج',
      sat: 'ش'
    },
    rangePrompt: (maxRange: number) => `تاللىغان كۈن سانى ${maxRange} كۈندىن ئېشىپ كەتمىسۇن`,
    rangePromptWeek: (maxRange: number) => `تاللىغان ھەپتە سانى ${maxRange} ھەپتىدىن ئېشىپ كەتمىسۇن`,
    rangePromptMonth: (maxRange: number) => `تاللىغان ئاي سانى ${maxRange} ئايدىن ئېشىپ كەتمىسۇن`,
    monthTitle: 'YYYYيىل Mئاي',
    yearTitle: 'YYYYيىل',
    month: 'Mئاي',
    hour: (value: number) => `${value} سائەت`,
    minute: (value: number) => `${value} مىنۇت`,
    second: (value: number) => `${value} سېكۇنت`
  },
  collapse: {
    expand: 'يايماق',
    retract: 'يىغماق'
  },
  colPicker: {
    title: 'تاللاڭ',
    placeholder: 'تاللاڭ',
    select: 'تاللاڭ'
  },
  datetimePicker: {
    start: 'باشلىنىش ۋاقتى',
    end: 'ئاخىرلىشىش ۋاقتى',
    to: 'دىن',
    placeholder: 'تاللاڭ',
    confirm: 'تامام',
    cancel: 'بىكار قىلىش'
  },
  loadmore: {
    loading: 'يۈكلەۋاتىدۇ...',
    finished: 'يۈكلەش تامام',
    error: 'يۈكلەش مەغلۇپ بولدى',
    retry: 'قايتا سىناڭ'
  },
  messageBox: {
    inputPlaceholder: 'كىرگۈزۈڭ',
    confirm: 'جەزملەش',
    cancel: 'بىكار قىلىش',
    inputNoValidate: 'كىرگۈزۈلگەن سانلىق مەلۇمات ئىناۋەتسىز'
  },
  numberKeyboard: {
    confirm: 'تامام'
  },
  pagination: {
    prev: 'ئالدىنقى بەت',
    next: 'كېيىنكى بەت',
    page: (value: number) => `نۆۋەتتىكى بەت: ${value}`,
    total: (total: number) => `نۆۋەتتىكى سانلىق مەلۇمات: ${total} تۈر`,
    size: (size: number) => `ھەر بەتتىكى تۈر سانى: ${size}`
  },
  picker: {
    cancel: 'بىكار قىلىش',
    done: 'تامام',
    placeholder: 'تاللاڭ'
  },
  imgCropper: {
    confirm: 'تامام',
    cancel: 'بىكار قىلىش'
  },
  search: {
    search: 'ئىزدەش',
    cancel: 'بىكار قىلىش'
  },
  steps: {
    wait: 'باشلانمىدى',
    finished: 'تامام بولدى',
    process: 'ئېلىپ بېرىلىۋاتىدۇ',
    failed: 'مەغلۇپ بولدى'
  },
  tabs: {
    all: 'ھەممىسى'
  },
  upload: {
    error: 'يوللاش مەغلۇپ بولدى'
  },
  input: {
    placeholder: 'كىرگۈزۈڭ...'
  },
  selectPicker: {
    title: 'تاللاڭ',
    placeholder: 'تاللاڭ',
    select: 'تاللاڭ',
    confirm: 'جەزملەش',
    filterPlaceholder: 'ئىزدەش'
  },
  tag: {
    placeholder: 'كىرگۈزۈڭ',
    add: 'يېڭى بەلگە قوشۇش'
  },
  textarea: {
    placeholder: 'كىرگۈزۈڭ...'
  },
  tableCol: {
    indexLabel: 'تەرتىپ نومۇرى'
  },
  signature: {
    confirmText: 'جەزملەش',
    clearText: 'تازىلاش',
    revokeText: 'بىكار قىلىش',
    restoreText: 'ئەسلىگە كەلتۈرۈش'
  }
}
