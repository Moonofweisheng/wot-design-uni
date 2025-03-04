export default {
  calendar: {
    placeholder: 'Wählen Sie',
    title: 'Datum auswählen',
    day: 'Tag',
    week: 'Woche',
    month: 'Monat',
    confirm: 'Bestätigen',
    startTime: 'Startdatum',
    endTime: 'Enddatum',
    to: 'bis',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Woche ${week} ${year}`,
    startWeek: 'Startwoche',
    endWeek: 'Endwoche',
    startMonth: 'Startmonat',
    endMonth: 'Endmonat',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'Startzeit',
    endTime: 'Endzeit',
    weeks: {
      sun: 'So',
      mon: 'Mo',
      tue: 'Di',
      wed: 'Mi',
      thu: 'Do',
      fri: 'Fr',
      sat: 'Sa'
    },
    rangePrompt: (maxRange: number) => `Die Anzahl der ausgewählte Tage darf ${maxRange} Tage nicht überschreiten`,
    rangePromptWeek: (maxRange: number) => `Die Anzahl der ausgewählte Wochen darf ${maxRange} Wochen nicht überschreiten`,
    rangePromptMonth: (maxRange: number) => `Die Anzahl der ausgewählte Monate darf ${maxRange} Monate nicht überschreiten`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value} Stunde`,
    minute: (value: number) => `${value} Minute`,
    second: (value: number) => `${value} Sekunde`
  },
  datetimePicker: {
    start: 'Von',
    end: 'Bis',
    to: 'bis',
    placeholder: 'Wählen Sie',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen'
  },
  collapse: {
    expand: 'Expandieren',
    retract: 'Falten'
  },
  colPicker: {
    title: 'Wählen',
    placeholder: 'Wählen',
    select: 'Wählen'
  },
  loadmore: {
    loading: 'Laden...',
    finished: 'Das Laden ist abgeschlossen',
    error: 'Laden fehlgeschlagen...',
    retry: 'Aktualisieren'
  },
  imgCropper: {
    confirm: 'OK',
    cancel: 'Stornieren'
  },
  messageBox: {
    inputPlaceholder: 'Bitte geben Sie Informationen ein',
    confirm: 'OK',
    cancel: 'Stornieren',
    inputNoValidate: 'Bitte geben Sie gültige Informationen ein'
  },
  numberKeyboard: {
    confirm: 'OK'
  },
  pagination: {
    prev: 'Vorherige',
    next: 'Nächste',
    page: (value: number) => `Seite: ${value}`,
    total: (total: number) => `Gesamt: ${total}`,
    size: (size: number) => `${size}/Seite`
  },
  picker: {
    cancel: 'Stornieren',
    done: 'OK',
    placeholder: 'Wählen'
  },
  search: {
    search: 'Suchen',
    cancel: 'Stornieren'
  },
  steps: {
    wait: 'Nicht gestartet',
    finished: 'Abgelaufen',
    process: 'Im Gange',
    failed: 'Fehlgeschlagen'
  },
  tabs: {
    all: 'Alle'
  },
  upload: {
    error: 'Hochladen fehlgeschlagen'
  },
  input: {
    placeholder: 'Bitte geben Sie Informationen ein...'
  },
  selectPicker: {
    title: 'Auswählen',
    placeholder: 'Wählen Sie',
    select: 'Auswählen',
    confirm: 'Bestätigen',
    filterPlaceholder: 'Suchen'
  },
  tag: {
    placeholder: 'Eingeben',
    add: 'Tag hinzufügen'
  },
  textarea: {
    placeholder: 'Bitte geben Sie Informationen ein...'
  },
  tableCol: {
    indexLabel: 'Index'
  },
  signature: {
    confirmText: 'Bestätigen',
    clearText: 'Löschen',
    revokeText: 'Rückgängig machen',
    restoreText: 'Wiederherstellen'
  }
}
