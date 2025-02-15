export default {
  calendar: {
    placeholder: 'حدد التاريخ',
    title: 'حدد التاريخ',
    day: 'يوم',
    week: 'أسبوع',
    month: 'شهر',
    confirm: 'تأكيد',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    to: 'إلى',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `${year} الأسبوع ${week}`,
    startWeek: 'بداية الأسبوع',
    endWeek: 'نهاية الأسبوع',
    startMonth: 'بداية الشهر',
    endMonth: 'نهاية الشهر',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    weeks: {
      sun: 'الأحد',
      mon: 'الاثنين',
      tue: 'الثلاثاء',
      wed: 'الأربعاء',
      thu: 'الخميس',
      fri: 'الجمعة',
      sat: 'السبت'
    },
    rangePrompt: (maxRange: number) => `لا يمكن أن تزيد الأيام المحددة عن ${maxRange} يوم`,
    rangePromptWeek: (maxRange: number) => `لا يمكن أن تزيد الأسابيع المحددة عن ${maxRange} أسبوع`,
    rangePromptMonth: (maxRange: number) => `لا يمكن أن تزيد الشهور المحددة عن ${maxRange} شهر`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value} ساعة`,
    minute: (value: number) => `${value} دقيقة`,
    second: (value: number) => `${value} ثانية`
  },
  datetimePicker: {
    start: 'من',
    end: 'إلى',
    to: 'إلى',
    placeholder: 'حدد التاريخ والوقت',
    confirm: 'تأكيد',
    cancel: 'إلغاء'
  },
  collapse: {
    expand: 'توسيع',
    retract: 'طي'
  },
  colPicker: {
    title: 'حدد لون',
    placeholder: 'حدد لون',
    select: 'حدد'
  },
  loadmore: {
    loading: 'جارٍ التحميل...',
    finished: 'التحميل قد انتهى',
    error: 'فشل التحميل...',
    retry: 'إعادة المحاولة'
  },
  imgCropper: {
    confirm: 'تأكيد',
    cancel: 'إلغاء'
  },
  messageBox: {
    inputPlaceholder: 'الرجاء إدخال المعلومات',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    inputNoValidate: 'الرجاء التأكد من إدخال المعلومات الصحيحة'
  },
  numberKeyboard: {
    confirm: 'إنهاء'
  },
  pagination: {
    prev: 'السابق',
    next: 'التالي',
    page: (value: number) => `صفحة: ${value}`,
    total: (total: number) => `المجموع: ${total}`,
    size: (size: number) => `${size} / صفحة`
  },
  picker: {
    cancel: 'إلغاء',
    done: 'إنهاء',
    placeholder: 'حدد'
  },
  search: {
    search: 'بحث',
    cancel: 'إلغاء'
  },
  steps: {
    wait: 'لم يبدأ',
    finished: 'تم',
    process: 'جاري',
    failed: 'فشل'
  },
  tabs: {
    all: 'الجميع'
  },
  upload: {
    error: 'فشل التحميل'
  },
  input: {
    placeholder: 'الرجاء إدخال المعلومات...'
  },
  selectPicker: {
    title: 'حدد',
    placeholder: 'حدد',
    select: 'حدد',
    confirm: 'تأكيد',
    filterPlaceholder: 'بحث'
  },
  tag: {
    placeholder: 'إدخال',
    add: 'إضافة وسم'
  },
  textarea: {
    placeholder: 'الرجاء إدخال نص متعدد الأسطر هنا...'
  },
  tableCol: {
    indexLabel: 'فهرس'
  },
  signature: {
    confirmText: 'تأكيد',
    clearText: 'مسح',
    revokeText: 'تراجع',
    restoreText: 'استعادة'
  }
}
