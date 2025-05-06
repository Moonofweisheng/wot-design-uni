export default {
  calendar: {
    placeholder: 'Seleccionar',
    title: 'Seleccionar Fecha',
    day: 'Día',
    week: 'Semana',
    month: 'Mes',
    confirm: 'Confirmar',
    startTime: 'Hora de Inicio',
    endTime: 'Hora de Fin',
    to: 'a',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Semana ${week}, ${year}`,
    startWeek: 'Inicio de Semana',
    endWeek: 'Fin de Semana',
    startMonth: 'Inicio de Mes',
    endMonth: 'Fin de Mes',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'Inicio',
    endTime: 'Fin',
    weeks: {
      sun: 'Dom',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb'
    },
    rangePrompt: (maxRange: number) => `No se puede seleccionar más de ${maxRange} días`,
    rangePromptWeek: (maxRange: number) => `No se puede seleccionar más de ${maxRange} semanas`,
    rangePromptMonth: (maxRange: number) => `No se puede seleccionar más de ${maxRange} meses`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}h`,
    minute: (value: number) => `${value}min`,
    second: (value: number) => `${value}seg`
  },
  collapse: {
    expand: 'Expandir',
    retract: 'Contraer'
  },
  colPicker: {
    title: 'Seleccionar',
    placeholder: 'Seleccionar',
    select: 'Seleccionar'
  },
  datetimePicker: {
    start: 'Inicio',
    end: 'Fin',
    to: 'a',
    placeholder: 'Seleccionar',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },
  loadmore: {
    loading: 'Cargando...',
    finished: 'Carga Completa',
    error: 'Error al Cargar',
    retry: 'Reintentar'
  },
  messageBox: {
    inputPlaceholder: 'Por favor ingrese información',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    inputNoValidate: 'Por favor ingrese información válida'
  },
  numberKeyboard: {
    confirm: 'Confirmar'
  },
  pagination: {
    prev: 'Anterior',
    next: 'Siguiente',
    page: (value: number) => `Página: ${value}`,
    total: (total: number) => `Total: ${total}`,
    size: (size: number) => `${size}/Página`
  },
  picker: {
    cancel: 'Cancelar',
    done: 'Hecho',
    placeholder: 'Seleccionar'
  },
  imgCropper: {
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },
  search: {
    search: 'Buscar',
    cancel: 'Cancelar'
  },
  steps: {
    wait: 'Pendiente',
    finished: 'Completado',
    process: 'En Proceso',
    failed: 'Fallido'
  },
  tabs: {
    all: 'Todos'
  },
  upload: {
    error: 'Error al Subir'
  },
  input: {
    placeholder: 'Por favor ingrese información...'
  },
  selectPicker: {
    title: 'Seleccionar',
    placeholder: 'Seleccionar',
    select: 'Seleccionar',
    confirm: 'Confirmar',
    filterPlaceholder: 'Buscar'
  },
  tag: {
    placeholder: 'Ingresar',
    add: 'Agregar Etiqueta'
  },
  textarea: {
    placeholder: 'Por favor ingrese información...'
  },
  tableCol: {
    indexLabel: 'Índice'
  },
  signature: {
    confirmText: 'Confirmar',
    clearText: 'Limpiar',
    revokeText: 'Deshacer',
    restoreText: 'Restaurar'
  }
}
