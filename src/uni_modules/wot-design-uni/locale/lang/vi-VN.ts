/*
 * @Author: 810505339
 * @Date: 2025-02-11 21:17:21
 * @LastEditors: 810505339
 * @LastEditTime: 2025-02-15 21:32:57
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\locale\lang\vi-VN.ts
 * 记得注释
 */
/**
 * This file contains localization strings for various components in Vietnamese.
 */

export default {
  calendar: {
    placeholder: 'Vui lòng chọn',
    title: 'Chọn ngày',
    day: 'Ngày',
    week: 'Tuần',
    month: 'Tháng',
    confirm: 'Xác nhận',
    startTime: 'Thời gian bắt đầu',
    endTime: 'Thời gian kết thúc',
    to: 'đến',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Tuần thứ ${week} năm ${year}`,
    startWeek: 'Tuần bắt đầu',
    endWeek: 'Tuần kết thúc',
    startMonth: 'Tháng bắt đầu',
    endMonth: 'Tháng kết thúc',
    monthFormat: 'Tháng YYYY MM'
  },
  calendarView: {
    startTime: 'Bắt đầu',
    endTime: 'Kết thúc',
    weeks: { sun: 'CN', mon: 'T2', tue: 'T3', wed: 'T4', thu: 'T5', fri: 'T6', sat: 'T7' },
    rangePrompt: (maxRange: number) => `Không thể chọn quá ${maxRange} ngày`,
    rangePromptWeek: (maxRange: number) => `Không thể chọn quá ${maxRange} tuần`,
    rangePromptMonth: (maxRange: number) => `Không thể chọn quá ${maxRange} tháng`,
    monthTitle: 'Tháng YYYY M',
    yearTitle: 'Năm YYYY',
    month: 'MM',
    hour: (value: number) => `${value} giờ`,
    minute: (value: number) => `${value} phút`,
    second: (value: number) => `${value} giây`
  },
  collapse: { expand: 'Mở rộng', retract: 'Thu gọn' },
  colPicker: { title: 'Vui lòng chọn', placeholder: 'Vui lòng chọn', select: 'Vui lòng chọn' },
  datetimePicker: {
    start: 'Thời gian bắt đầu',
    end: 'Thời gian kết thúc',
    to: 'đến',
    placeholder: 'Vui lòng chọn',
    confirm: 'Hoàn thành',
    cancel: 'Hủy bỏ'
  },
  loadmore: { loading: 'Đang tải...', finished: 'Đã tải xong', error: 'Tải thất bại', retry: 'Nhấp để thử lại' },
  messageBox: { inputPlaceholder: 'Vui lòng nhập', confirm: 'Xác nhận', cancel: 'Hủy bỏ', inputNoValidate: 'Dữ liệu không hợp lệ' },
  numberKeyboard: { confirm: 'Hoàn thành' },
  pagination: {
    prev: 'Trang trước',
    next: 'Trang sau',
    page: (value: number) => `Trang hiện tại: ${value}`,
    total: (total: number) => `Tổng số dữ liệu: ${total}`,
    size: (size: number) => `Kích thước trang: ${size}`
  },
  picker: { cancel: 'Hủy bỏ', done: 'Hoàn thành', placeholder: 'Vui lòng chọn' },
  imgCropper: { confirm: 'Hoàn thành', cancel: 'Hủy bỏ' },
  search: { search: 'Tìm kiếm', cancel: 'Hủy bỏ' },
  steps: { wait: 'Chưa bắt đầu', finished: 'Đã hoàn thành', process: 'Đang tiến hành', failed: 'Thất bại' },
  tabs: { all: 'Tất cả' },
  upload: { error: 'Tải lên thất bại' },
  input: { placeholder: 'Vui lòng nhập...' },
  selectPicker: { title: 'Vui lòng chọn', placeholder: 'Vui lòng chọn', select: 'Xác nhận', confirm: 'Xác nhận', filterPlaceholder: 'Tìm kiếm' },
  tag: { placeholder: 'Vui lòng nhập', add: 'thêm' },
  textarea: { placeholder: 'Vui lòng nhập...' },
  tableCol: {
    indexLabel: 'Số sê-ri'
  },
  signature: {
    confirmText: 'Xác nhận',
    clearText: 'Xóa',
    revokeText: 'Hoàn tác',
    restoreText: 'Khôi phục'
  }
}
