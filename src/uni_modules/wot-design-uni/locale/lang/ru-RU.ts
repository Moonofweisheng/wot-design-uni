export default {
  calendar: {
    placeholder: 'Выберите, пожалуйста',
    title: 'Выбор даты',
    day: 'День',
    week: 'Неделя',
    month: 'Месяц',
    confirm: 'Ок',
    startTime: 'Начало',
    endTime: 'Конец',
    to: 'до',
    timeFormat: 'DD.MM.YY HH:mm:ss',
    dateFormat: 'DD.MM.YYYY',
    weekFormat: (year: number, week: number) => `${year} Неделя ${week}`,
    startWeek: 'Начало недели',
    endWeek: 'Конец недели',
    startMonth: 'Начало месяца',
    endMonth: 'Конец месяца',
    monthFormat: 'MM.YYYY'
  },
  calendarView: {
    startTime: 'Начало',
    endTime: 'Конец',
    weeks: {
      sun: 'Вс',
      mon: 'Пн',
      tue: 'Вт',
      wed: 'Ср',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Сб'
    },
    rangePrompt: (maxRange: number) => `Выбор не должен превышать ${maxRange} дня`,
    rangePromptWeek: (maxRange: number) => `Выбор не должен превышать ${maxRange} недели`,
    rangePromptMonth: (maxRange: number) => `Выбор не должен превышать ${maxRange} месяца`,
    monthTitle: 'Месяц YYYY-MM',
    yearTitle: 'Год YYYY',
    month: 'Месяц MM',
    hour: (value: number) => `${value} час`,
    minute: (value: number) => `${value} минут`,
    second: (value: number) => `${value} секунд`
  },
  collapse: {
    expand: 'Развернуть',
    retract: 'Свернуть'
  },
  colPicker: {
    title: 'Выберите, пожалуйста',
    placeholder: 'Выберите, пожалуйста',
    select: 'Выберите'
  },
  datetimePicker: {
    start: 'Начало',
    end: 'Конец',
    to: 'до',
    placeholder: 'Выберите, пожалуйста',
    confirm: 'Готово',
    cancel: 'Отмена'
  },
  loadmore: {
    loading: 'Загрузка...',
    finished: 'Загрузка завершена',
    error: 'Ошибка загрузки',
    retry: 'Повторить'
  },
  messageBox: {
    inputPlaceholder: 'Введите, пожалуйста',
    confirm: 'Ок',
    cancel: 'Отмена',
    inputNoValidate: 'Неверные данные'
  },
  numberKeyboard: {
    confirm: 'Готово'
  },
  pagination: {
    prev: 'Предыдущая',
    next: 'Следующая',
    page: (value: number) => `Страница: ${value}`,
    total: (total: number) => `Всего: ${total} записи`,
    size: (size: number) => `Размер страницы: ${size}`
  },
  picker: {
    cancel: 'Отмена',
    done: 'Готово',
    placeholder: 'Выберите, пожалуйста'
  },
  imgCropper: {
    confirm: 'Готово',
    cancel: 'Отмена'
  },
  search: {
    search: 'Поиск',
    cancel: 'Отмена'
  },
  steps: {
    wait: 'Не началось',
    finished: 'Завершено',
    process: 'В процессе',
    failed: 'Неудачно'
  },
  tabs: {
    all: 'Все'
  },
  upload: {
    error: 'Ошибка загрузки'
  },
  input: {
    placeholder: 'Введите...'
  },
  selectPicker: {
    title: 'Выберите, пожалуйста',
    placeholder: 'Выберите, пожалуйста',
    select: 'Выберите',
    confirm: 'Подтвердить',
    filterPlaceholder: 'Поиск'
  },
  tag: {
    placeholder: 'Введите',
    add: 'Добавить тег'
  },
  textarea: {
    placeholder: 'Введите...'
  },
  tableCol: {
    indexLabel: '№'
  },
  signature: {
    confirmText: 'Подтвердить',
    clearText: 'Очистить',
    revokeText: 'Отменить',
    restoreText: 'Восстановить'
  }
}
