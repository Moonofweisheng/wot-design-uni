import { useTranslate } from '@/uni_modules/wot-design-uni/components/composables/useTranslate'
import Locale from '@/uni_modules/wot-design-uni/locale'
import enUS from '@/uni_modules/wot-design-uni/locale/lang/en-US'

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
})
