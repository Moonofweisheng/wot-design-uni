/**
 * This file contains the default export for the Turkish localization of the application.
 * It includes translations for various components such as calendar, datetime picker, pagination, etc.
 */

export default {
  calendar: {
    placeholder: 'Lütfen seçin',
    title: 'Tarih seç',
    day: 'Gün',
    week: 'Hafta',
    month: 'Ay',
    confirm: 'Tamam',
    startTime: 'Başlangıç zamanı',
    endTime: 'Bitiş zamanı',
    to: 'ile',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `${year} ${week}. Hafta`,
    startWeek: 'Başlangıç hafta',
    endWeek: 'Bitiş hafta',
    startMonth: 'Başlangıç ay',
    endMonth: 'Bitiş ay',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'Başlangıç',
    endTime: 'Bitiş',
    weeks: {
      sun: 'Paz',
      mon: 'Pzt',
      tue: 'Sal',
      wed: 'Çar',
      thu: 'Per',
      fri: 'Cum',
      sat: 'Cts'
    },
    rangePrompt: (maxRange: number) => `Seçilen gün sayısı ${maxRange} günü geçemez`,
    rangePromptWeek: (maxRange: number) => `Seçilen hafta sayısı ${maxRange} haftayı geçemez`,
    rangePromptMonth: (maxRange: number) => `Seçilen ay sayısı ${maxRange} ayı geçemez`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY Yılı',
    month: 'MM Ay',
    hour: (value: number) => `${value} Saat`,
    minute: (value: number) => `${value} Dakika`,
    second: (value: number) => `${value} Saniye`
  },
  collapse: {
    expand: 'Genişlet',
    retract: 'Daralt'
  },
  colPicker: {
    title: 'Lütfen seçin',
    placeholder: 'Lütfen seçin',
    select: 'Seç'
  },
  datetimePicker: {
    start: 'Başlangıç zamanı',
    end: 'Bitiş zamanı',
    to: 'ile',
    placeholder: 'Lütfen seçin',
    confirm: 'Tamam',
    cancel: 'İptal'
  },
  loadmore: {
    loading: 'Yükleniyor...',
    finished: 'Yüklenme tamamlandı',
    error: 'Yükleme başarısız',
    retry: 'Tekrar deneyin'
  },
  messageBox: {
    inputPlaceholder: 'Lütfen girin',
    confirm: 'Tamam',
    cancel: 'İptal',
    inputNoValidate: 'Girilen veriler geçerli değil'
  },
  numberKeyboard: {
    confirm: 'Tamam'
  },
  pagination: {
    prev: 'Önceki Sayfa',
    next: 'Sonraki Sayfa',
    page: (value: number) => `Şu anki Sayfa: ${value}`,
    total: (total: number) => `Toplam Veri: ${total} adet`,
    size: (size: number) => `Sayfa Boyutu: ${size}`
  },
  picker: {
    cancel: 'İptal',
    done: 'Tamam',
    placeholder: 'Lütfen seçin'
  },
  imgCropper: {
    confirm: 'Tamam',
    cancel: 'İptal'
  },
  search: {
    search: 'Ara',
    cancel: 'İptal'
  },
  steps: {
    wait: 'Başlamadı',
    finished: 'Tamamlandı',
    process: 'Süreçte',
    failed: 'Başarısız'
  },
  tabs: {
    all: 'Hepsi'
  },
  upload: {
    error: 'Yükleme başarısız'
  },
  input: {
    placeholder: 'Lütfen girin...'
  },
  selectPicker: {
    title: 'Lütfen seçin',
    placeholder: 'Lütfen seçin',
    select: 'Seç',
    confirm: 'Onayla',
    filterPlaceholder: 'Ara'
  },
  tag: {
    placeholder: 'Lütfen girin',
    add: 'Yeni Etiket Ekle'
  },
  textarea: {
    placeholder: 'Lütfen girin...'
  },
  tableCol: {
    indexLabel: 'Sıra No'
  },
  signature: {
    confirmText: 'İmzala',
    clearText: 'Temizle',
    revokeText: 'Geri Al',
    restoreText: 'Geri Yükle'
  }
}
