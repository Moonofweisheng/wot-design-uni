export default {
  calendar: {
    placeholder: 'เลือก',
    title: 'เลือกวันที่',
    day: 'วันที่',
    week: 'สัปดาห์',
    month: 'เดือน',
    confirm: 'ยืนยัน',
    startTime: 'วันที่เริ่มต้น',
    endTime: 'วันที่สิ้นสุด',
    to: 'ถึง',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `${year} W${week}`,
    startWeek: 'เริ่มต้นสัปดาห์',
    endWeek: 'สิ้นสุดสัปดาห์',
    startMonth: 'เดือนเริ่มต้น',
    endMonth: 'สิ้นเดือน',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'เวลาเริ่มต้น',
    endTime: 'เวลาสิ้นสุด',
    weeks: {
      sun: 'อา',
      mon: 'จ',
      tue: 'อ',
      wed: 'พ',
      thu: 'พฤ',
      fri: 'ศ',
      sat: 'ส'
    },
    rangePrompt: (maxRange: number) => `จำนวนวันที่เลือกต้องไม่เกิน ${maxRange} วัน`,
    rangePromptWeek: (maxRange: number) => `จำนวนสัปดาห์ที่เลือกต้องไม่เกิน ${maxRange} สัปดาห์`,
    rangePromptMonth: (maxRange: number) => `เดือนที่เลือกต้องไม่เกิน ${maxRange} เดือน`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`
  },
  collapse: {
    expand: 'ดูเพิ่มเติม',
    retract: 'ย่อ'
  },
  colPicker: {
    title: 'เลือก',
    placeholder: 'เลือก',
    select: 'เลือก'
  },
  datetimePicker: {
    start: 'จาก',
    end: 'ถึง',
    to: 'ถึง',
    placeholder: 'เลือก',
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก'
  },
  loadmore: {
    loading: 'กำลังโหลด.. รอสักครู่..',
    finished: 'โหลดสำเร็จ',
    error: 'โหลดไม่สำเร็จ',
    retry: 'รีเฟรช'
  },
  imgCropper: {
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก'
  },
  messageBox: {
    inputPlaceholder: 'กรุณาใส่ข้อมูล',
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก',
    inputNoValidate: 'กรุณาตรวจสอบว่าคุณได้ใส่ข้อมูลที่ถูกต้อง'
  },
  numberKeyboard: {
    confir: 'ตกลง'
  },
  pagination: {
    prev: 'ก่อนหน้า',
    next: 'หน้าต่อไป',
    page: (value: number) => `หน้า: ${value}`,
    total: (total: number) => `ทั้งหมด: ${total} หน้า`,
    size: (size: number) => `${size}/ ต่อหน้า`
  },
  picker: {
    cancel: 'ยกเลิก',
    done: 'ตกลง',
    placeholder: 'เลือก'
  },
  search: {
    search: 'ค้นหา',
    cancel: 'ยกเลิก'
  },
  steps: {
    wait: 'ยังไม่เริ่ม',
    finished: 'เสร็จสิ้น',
    process: 'กำลังดำเนินการ',
    failed: 'ไม่ผ่าน'
  },
  tabs: {
    all: 'ทั้งหมด'
  },
  upload: {
    error: 'อัปโหลดไม่สำเร็จ'
  },
  input: {
    placeholder: 'กรุณาใส่ข้อมูล...'
  },
  selectPicker: {
    title: 'เลือก',
    placeholder: 'เลือก',
    select: 'เลือก',
    confirm: 'ยืนยัน',
    filterPlaceholder: 'ค้นหา'
  },
  tag: {
    placeholder: 'กรุณาใส่',
    add: 'ป้ายใหม่'
  },
  textarea: {
    placeholder: 'กรุณาใส่ข้อมูล...'
  },
  tableCol: {
    indexLabel: 'หมายเลขซีเรียล'
  },
  signature: {
    confirmText: 'ยืนยัน',
    clearText: 'ล้าง',
    revokeText: 'ย้อนกลับ',
    restoreText: 'เรียกคืน'
  }
}
