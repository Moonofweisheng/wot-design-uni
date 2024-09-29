export default {
  calendar: {
    placeholder: 'Wählen',
    title: 'Wählen Sie Datum aus',
    day: 'Datum',
    week: 'Woche',
    month: 'Monat',
    confirm: 'OK',
    startTime: 'Startdatum',
    endTime: 'Enddatum',
    to: 'Zu',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Woche ${week},${year}`,
    startWeek: 'Startwoche',
    endWeek: 'Endwoche',
    startMonth: 'Startmonat',
    endMonth: 'Endmonat',
    monthFormat: 'YYYY-MM',
  },
  calendarView: {
    startTime: 'Startzeit',
    endTime: 'Endzeit',
    weeks: {
      sun: 'Sonne',
      mon: 'Mo',
      tue: 'Di',
      wed: 'Heiraten',
      thu: 'Do',
      fri: 'Fr',
      sat: 'Sa',
    },
    rangePrompt: (maxRange: number) =>
      `Die Anzahl der ausgewählten Tage darf ${maxRange} Tage nicht überschreiten`,
    rangePromptWeek: (maxRange: number) =>
      `Die Anzahl der ausgewählten Wochen darf ${maxRange} Wochen nicht überschreiten`,
    rangePromptMonth: (maxRange: number) =>
      `Der ausgewählte Monat darf ${maxRange} Monat nicht überschreiten`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`,
  },
  datetimePicker: {
    start: 'Aus',
    end: 'Zu',
    to: 'Zu',
    placeholder: 'Wählen',
    confirm: 'OK',
    cancel: 'Stornieren',
  },
  collapse: {
    expand: 'Expandieren',
    retract: 'Falten',
  },
  colPicker: {
    title: 'Wählen',
    placeholder: 'Wählen',
    select: 'Wählen',
  },
  loadmore: {
    loading: 'Laden...',
    finished: 'Das Laden ist abgeschlossen',
    error: 'Laden fehlgeschlagen...',
    retry: 'Aktualisieren',
  },
  imgCropper: {
    confirm: 'OK',
    cancel: 'Stornieren',
  },
  messageBox: {
    inputPlaceholder: 'Bitte geben Sie Informationen ein',
    confirm: 'OK',
    cancel: 'Stornieren',
    inputNoValidate: 'Bitte geben Sie gültige Informationen ein',
  },
  numberKeyboard: {
    confirm: 'OK',
  },
  pagination: {
    prev: 'Vorherige',
    next: 'Nächste',
    page: (value: number) => `Seite: ${value}`,
    total: (total: number) => `Gesamt: ${total}`,
    size: (size: number) => `${size}/Seite`,
  },
  picker: {
    cancel: 'Stornieren',
    done: 'OK',
    placeholder: 'Wählen',
  },
  search: {
    search: 'Suchen',
    cancel: 'Stornieren',
  },
  steps: {
    wait: 'Nicht gestartet',
    finished: 'Abgelaufen',
    process: 'Im Gange',
    failed: 'Fehlgeschlagen',
  },
  tabs: {
    all: 'Alle',
  },
  upload: {
    error: 'Hochladen fehlgeschlagen',
  },
  input: {
    placeholder: 'Bitte geben Sie Informationen ein...',
  },
  selectPicker: {
    title: 'Wählen',
    placeholder: 'Wählen',
    select: 'Wählen',
    confirm: 'OK',
    filterPlaceholder: 'Suchen',
  },
  tag: {
    placeholder: 'Eingeben',
    add: 'Tag hinzufügen',
  },
  textarea: {
    placeholder: 'Bitte geben Sie Informationen ein...',
  },
  tableCol: {
    indexLabel: 'Index',
  },
}
