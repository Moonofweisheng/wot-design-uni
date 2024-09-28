export default {
  calendar: {
    placeholder: 'Seleccionar',
    title: 'Seleccionar fecha',
    day: 'Fecha',
    week: 'Semana',
    month: 'Mes',
    confirm: 'DE ACUERDO',
    startTime: 'Fecha de inicio',
    endTime: 'Fecha de finalización',
    to: 'A',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Semana ${week}, ${year}`,
    startWeek: 'Semana de inicio',
    endWeek: 'fin de semana',
    startMonth: 'Mes de inicio',
    endMonth: 'Fin de mes',
    monthFormat: 'YYYY-MM',
  },
  calendarView: {
    startTime: 'Hora de inicio',
    endTime: 'Hora de finalización',
    weeks: {
      sun: 'Sol',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Se sentó',
    },
    rangePrompt: (maxRange: number) =>
      `El número de días seleccionados no puede exceder los ${maxRange} días.`,
    rangePromptWeek: (maxRange: number) =>
      `El número de semanas seleccionadas no puede exceder ${maxRange} semana.`,
    rangePromptMonth: (maxRange: number) => `El mes seleccionado no puede exceder ${maxRange} mes.`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`,
  },
  datetimePicker: {
    start: 'De',
    end: 'A',
    to: 'A',
    placeholder: 'Seleccionar',
    confirm: 'DE ACUERDO',
    cancel: 'Cancelar',
  },
  collapse: {
    expand: 'Expandir',
    retract: 'Doblar',
  },
  colPicker: {
    title: 'Seleccionar',
    placeholder: 'Seleccionar',
    select: 'Seleccionar',
  },
  loadmore: {
    loading: 'Cargando...',
    finished: 'Carga terminada',
    error: 'No se pudo cargar...',
    retry: 'Refrescar',
  },
  imgCropper: {
    confirm: 'DE ACUERDO',
    cancel: 'Cancelar',
  },
  messageBox: {
    inputPlaceholder: 'Por favor ingrese información',
    confirm: 'DE ACUERDO',
    cancel: 'Cancelar',
    inputNoValidate: 'Por favor asegúrese de ingresar la información correcta',
  },
  numberKeyboard: {
    confirm: 'hecho',
  },
  pagination: {
    prev: 'Anterior',
    next: 'Próximo',
    page: (value: number) => `Página:${value}`,
    total: (total: number) => `Total:${total}`,
    size: (size: number) => `${size}/página`,
  },
  picker: {
    cancel: 'Cancelar',
    done: 'Hecho',
    placeholder: 'Seleccionar',
  },
  search: {
    search: 'Buscar',
    cancel: 'Cancelar',
  },
  steps: {
    wait: 'No iniciado',
    finished: 'Venció',
    process: 'En curso',
    failed: 'Fallido',
  },
  tabs: {
    all: 'Todo',
  },
  upload: {
    error: 'No se pudo cargar',
  },
  input: {
    placeholder: 'Por favor ingrese información...',
  },
  selectPicker: {
    title: 'Seleccionar',
    placeholder: 'Seleccionar',
    select: 'Seleccionar',
    confirm: 'De acuerdo',
    filterPlaceholder: 'Buscar',
  },
  tag: {
    placeholder: 'Ingresar',
    add: 'Agregar etiqueta',
  },
  textarea: {
    placeholder: 'Por favor ingrese información...',
  },
  tableCol: {
    indexLabel: 'índice',
  },
}
