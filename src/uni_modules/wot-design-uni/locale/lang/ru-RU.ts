export default {
  calendar: {
    placeholder: 'Выбирать',
    title: 'Выберите дату',
    day: 'Дата',
    week: 'Неделя',
    month: 'Месяц',
    confirm: 'ХОРОШО',
    startTime: 'Дата начала',
    endTime: 'Дата окончания',
    to: 'К',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Неделя${week}, ${year} г.`,
    startWeek: 'Начало недели',
    endWeek: 'Конец недели',
    startMonth: 'Начальный месяц',
    endMonth: 'Конец месяца',
    monthFormat: 'YYYY-ММ',
  },
  calendarView: {
    startTime: 'Время начала',
    endTime: 'Конец Времени',
    weeks: {
      sun: 'Солнце',
      mon: 'Пн.',
      tue: 'Вт',
      wed: 'Ср',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Суббота',
    },
    rangePrompt: (maxRange: number) =>
      `Количество выбранных дней не может превышать ${maxRange} дни`,
    rangePromptWeek: (maxRange: number) =>
      `Количество выбранных недель не может превышать ${maxRange} недели`,
    rangePromptMonth: (maxRange: number) => `Выбранный месяц не может превышать ${maxRange} месяцы`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`,
  },
  datetimePicker: {
    start: 'От',
    end: 'К',
    to: 'К',
    placeholder: 'Выбирать',
    confirm: 'ХОРОШО',
    cancel: 'Отмена',
  },
  collapse: {
    expand: 'Расширять',
    retract: 'Складывать',
  },
  colPicker: {
    title: 'Выбирать',
    placeholder: 'Выбирать',
    select: 'Выбирать',
  },
  loadmore: {
    loading: 'Загрузка...',
    finished: 'Загрузка завершена',
    error: 'Не удалось загрузить...',
    retry: 'Обновить',
  },
  imgCropper: {
    confirm: 'ХОРОШО',
    cancel: 'Отмена',
  },
  messageBox: {
    inputPlaceholder: 'Пожалуйста, введите информацию',
    confirm: 'ХОРОШО',
    cancel: 'Отмена',
    inputNoValidate: 'Пожалуйста, убедитесь, что вы вводите правильную информацию',
  },
  numberKeyboard: {
    confirm: 'сделанный',
  },
  pagination: {
    prev: 'Предыдущий',
    next: 'Следующий',
    page: (value: number) => `Страница:${value}`,
    total: (total: number) => `Общий:${total}`,
    size: (size: number) => `${size}/Cтраница`,
  },
  picker: {
    cancel: 'Отмена',
    done: 'Сделанный',
    placeholder: 'Выбирать',
  },
  search: {
    search: 'Поиск',
    cancel: 'Отмена',
  },
  steps: {
    wait: 'Не запущено',
    finished: 'Истекший',
    process: 'В ходе выполнения',
    failed: 'Неуспешный',
  },
  tabs: {
    all: 'Все',
  },
  upload: {
    error: 'Не удалось загрузить',
  },
  input: {
    placeholder: 'Пожалуйста, введите информацию...',
  },
  selectPicker: {
    title: 'Выбирать',
    placeholder: 'Выбирать',
    select: 'Выбирать',
    confirm: 'Хорошо',
    filterPlaceholder: 'Поиск',
  },
  tag: {
    placeholder: 'Входить',
    add: 'Добавить тег',
  },
  textarea: {
    placeholder: 'Пожалуйста, введите информацию...',
  },
  tableCol: {
    indexLabel: 'индекс',
  },
}
