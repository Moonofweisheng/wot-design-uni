import { useTranslate } from '@/uni_modules/wot-design-uni/components/composables/useTranslate'
import Locale from '@/uni_modules/wot-design-uni/locale'
import enUS from '@/uni_modules/wot-design-uni/locale/lang/en-US'
import viVN from '@/uni_modules/wot-design-uni/locale/lang/vi-VN'
import zhTW from '@/uni_modules/wot-design-uni/locale/lang/zh-TW'
import zhHK from '@/uni_modules/wot-design-uni/locale/lang/zh-HK'
import arSA from '@/uni_modules/wot-design-uni/locale/lang/ar-SA'
import deDE from '@/uni_modules/wot-design-uni/locale/lang/de-DE'
import esES from '@/uni_modules/wot-design-uni/locale/lang/es-ES'
import frFR from '@/uni_modules/wot-design-uni/locale/lang/fr-FR'
import jaJP from '@/uni_modules/wot-design-uni/locale/lang/ja-JP'
import koKR from '@/uni_modules/wot-design-uni/locale/lang/ko-KR'
import ptPT from '@/uni_modules/wot-design-uni/locale/lang/pt-PT'
import ruRU from '@/uni_modules/wot-design-uni/locale/lang/ru-RU'
import thTH from '@/uni_modules/wot-design-uni/locale/lang/th-TH'
import trTR from '@/uni_modules/wot-design-uni/locale/lang/tr-TR'
import { beforeEach, describe, expect, it } from 'vitest'

describe('useTranslate', () => {
  beforeEach(() => {
    Locale.use('zh-CN')
  })

  it('should translate basic messages in Chinese', () => {
    const { translate: calendarTranslate } = useTranslate('calendar')
    const { translate: pickerTranslate } = useTranslate('picker')

    expect(calendarTranslate('placeholder')).toBe('请选择')
    expect(pickerTranslate('cancel')).toBe('取消')
  })

  it('should switch to English translations', () => {
    const { translate } = useTranslate('calendar')
    expect(translate('confirm')).toBe('确定')

    Locale.use('en-US', enUS)
    expect(translate('confirm')).toBe('OK')
  })

  it('should handle function messages with parameters', () => {
    const { translate } = useTranslate('calendarView')
    expect(translate('rangePrompt', 7)).toBe('选择天数不能超过7天')
    expect(translate('hour', 10)).toBe('10时')
    expect(translate('minute', 30)).toBe('30分')
    expect(translate('second', 45)).toBe('45秒')

    Locale.use('en-US', enUS)
    expect(translate('rangePrompt', 7)).toBe('The number of selected days cannot exceed 7 days')
    expect(translate('hour', 10)).toBe('10')
    expect(translate('minute', 30)).toBe('30')
    expect(translate('second', 45)).toBe('45')
  })

  it('should handle nested object translations', () => {
    const { translate } = useTranslate('calendarView')
    expect(translate('weeks.mon')).toBe('一')
    expect(translate('weeks.sun')).toBe('日')

    Locale.use('en-US', enUS)
    expect(translate('weeks.mon')).toBe('Mon')
    expect(translate('weeks.sun')).toBe('Sun')
  })

  it('should handle pagination translations', () => {
    const { translate } = useTranslate('pagination')
    expect(translate('prev')).toBe('上一页')
    expect(translate('next')).toBe('下一页')
    expect(translate('total', 100)).toBe('当前数据：100条')

    Locale.use('en-US', enUS)
    expect(translate('prev')).toBe('Previous')
    expect(translate('next')).toBe('Next')
    expect(translate('total', 100)).toBe('Total: 100')
  })

  it('should handle date formats', () => {
    const { translate } = useTranslate('calendar')
    expect(translate('timeFormat')).toBe('YY年MM月DD日 HH:mm:ss')
    expect(translate('dateFormat')).toBe('YYYY年MM月DD日')
    expect(translate('weekFormat', 2023, 1)).toBe('2023 第 1 周')

    Locale.use('en-US', enUS)
    expect(translate('timeFormat')).toBe('YY-MM-DD HH:mm:ss')
    expect(translate('dateFormat')).toBe('YYYY-MM-DD')
    expect(translate('weekFormat', 2023, 1)).toBe('2023 W1')
  })

  it('should handle form related translations', () => {
    const { translate } = useTranslate('messageBox')
    expect(translate('confirm')).toBe('确定')
    expect(translate('cancel')).toBe('取消')
    expect(translate('inputPlaceholder')).toBe('请输入')

    Locale.use('en-US', enUS)
    expect(translate('confirm')).toBe('OK')
    expect(translate('cancel')).toBe('Cancel')
    expect(translate('inputPlaceholder')).toBe('Please input information')
  })

  it('should fallback to key path when translation missing', () => {
    const { translate } = useTranslate('nonexistent')
    expect(translate('key')).toBe('nonexistent.key')
  })

  it('should handle component specific messages', () => {
    const { translate: uploadTranslate } = useTranslate('upload')
    const { translate: searchTranslate } = useTranslate('search')
    const { translate: signatureTranslate } = useTranslate('signature')

    expect(uploadTranslate('error')).toBe('上传失败')
    expect(searchTranslate('search')).toBe('搜索')
    expect(signatureTranslate('confirmText')).toBe('确认')

    Locale.use('en-US', enUS)
    expect(uploadTranslate('error')).toBe('Failed to upload')
    expect(searchTranslate('search')).toBe('Search')
    expect(signatureTranslate('confirmText')).toBe('OK')
  })

  it('should handle Vietnamese translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('vi-VN', viVN)
    expect(translate('placeholder')).toBe('Vui lòng chọn')
    expect(translate('confirm')).toBe('Xác nhận')

    const { translate: calendarViewTranslate } = useTranslate('calendarView')
    expect(calendarViewTranslate('weeks.mon')).toBe('T2')
    expect(calendarViewTranslate('hour', 10)).toBe('10 giờ')
  })

  it('should handle Traditional Chinese translations', () => {
    const { translate } = useTranslate('calendar')
    Locale.use('zh-TW', zhTW)
    expect(translate('placeholder')).toBe('請選擇')
    expect(translate('confirm')).toBe('確定')

    const { translate: calendarViewTranslate } = useTranslate('calendarView')
    expect(calendarViewTranslate('weeks.mon')).toBe('一')
    expect(calendarViewTranslate('hour', 10)).toBe('10 時')
  })

  it('should handle Arabic translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('ar-SA', arSA)
    expect(translate('placeholder')).toBe('حدد التاريخ')
    expect(translate('confirm')).toBe('تأكيد')
  })

  it('should handle German translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('de-DE', deDE)
    expect(translate('placeholder')).toBe('Wählen Sie')
    expect(translate('confirm')).toBe('Bestätigen')
  })

  it('should handle Spanish translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('es-ES', esES)
    expect(translate('placeholder')).toBe('Seleccionar')
    expect(translate('confirm')).toBe('Confirmar')
  })

  it('should handle French translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('fr-FR', frFR)
    expect(translate('placeholder')).toBe('Sélectionner')
    expect(translate('confirm')).toBe('Confirmer')
  })

  it('should handle Japanese translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('ja-JP', jaJP)
    expect(translate('placeholder')).toBe('選択してください')
    expect(translate('confirm')).toBe('確認')
  })

  it('should handle Korean translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('ko-KR', koKR)
    expect(translate('placeholder')).toBe('선택')
    expect(translate('confirm')).toBe('확인')
  })

  it('should handle Portuguese translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('pt-PT', ptPT)
    expect(translate('placeholder')).toBe('Por favor selecione')
    expect(translate('confirm')).toBe('Confirmar')
  })

  it('should handle Russian translations', () => {
    const { translate } = useTranslate('calendar')
    Locale.use('ru-RU', ruRU)
    expect(translate('placeholder')).toBe('Выберите, пожалуйста')
    expect(translate('confirm')).toBe('Ок')
  })

  it('should handle Thai translations', () => {
    const { translate } = useTranslate('calendar')

    Locale.use('th-TH', thTH)
    expect(translate('placeholder')).toBe('เลือก')
    expect(translate('confirm')).toBe('ยืนยัน')
  })

  it('should handle Turkish translations', () => {
    const { translate } = useTranslate('calendar')
    Locale.use('tr-TR', trTR)
    expect(translate('placeholder')).toBe('Lütfen seçin')
    expect(translate('confirm')).toBe('Tamam')
  })

  it('should handle Hong Kong Traditional Chinese translations', () => {
    const { translate } = useTranslate('calendar')
    Locale.use('zh-HK', zhHK)
    expect(translate('placeholder')).toBe('請選擇')
    expect(translate('confirm')).toBe('確定')

    const { translate: calendarViewTranslate } = useTranslate('calendarView')
    expect(calendarViewTranslate('weeks.mon')).toBe('一')
    expect(calendarViewTranslate('hour', 10)).toBe('10時')
    expect(calendarViewTranslate('minute', 30)).toBe('30分')
    expect(calendarViewTranslate('second', 45)).toBe('45秒')

    const { translate: paginationTranslate } = useTranslate('pagination')
    expect(paginationTranslate('prev')).toBe('上一頁')
    expect(paginationTranslate('next')).toBe('下一頁')
  })
})
