export default {
  calendar: {
    placeholder: 'Selecione',
    title: 'Selecione a data',
    day: 'Data',
    week: 'Semana',
    month: 'Mês',
    confirm: 'OK',
    startTime: 'Data de início',
    endTime: 'Data de término',
    to: 'Para',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Semana ${year}, ${week}`,
    startWeek: 'Semana de início',
    endWeek: 'Fim da semana',
    startMonth: 'Mês de início',
    endMonth: 'Fim do mês',
    monthFormat: 'YYYY-MM',
  },
  calendarView: {
    startTime: 'Hora de início',
    endTime: 'Hora de término',
    weeks: {
      sun: 'dom',
      mon: 'seg',
      tue: 'ter',
      wed: 'qua',
      thu: 'qui',
      fri: 'sex',
      sat: 'sáb',
    },
    rangePrompt: (maxRange: number) =>
      `O número de dias selecionados não pode exceder ${maxRange} dias`,
    rangePromptWeek: (maxRange: number) =>
      `O número de semanas selecionado não pode exceder ${maxRange} semanas`,
    rangePromptMonth: (maxRange: number) => `O mês selecionado não pode exceder ${maxRange} meses`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`,
  },
  datetimePicker: {
    start: 'De',
    end: 'Para',
    to: 'Para',
    placeholder: 'Selecione',
    confirm: 'OK',
    cancel: 'Cancelar',
  },
  collapse: {
    expand: 'Expandir',
    retract: 'Dobrar',
  },
  colPicker: {
    title: 'Selecione',
    placeholder: 'Selecione',
    select: 'Selecione',
  },
  loadmore: {
    loading: 'Carregando...',
    finished: 'Carregamento concluído',
    error: 'Falha ao carregar...',
    retry: 'Atualizar',
  },
  imgCropper: {
    confirm: 'OK',
    cancel: 'Cancelar',
  },
  messageBox: {
    inputPlaceholder: 'Por favor insira informações',
    confirm: 'OK',
    cancel: 'Cancelar',
    inputNoValidate: 'Certifique-se de inserir informações corretas',
  },
  numberKeyboard: {
    confirm: 'feito',
  },
  pagination: {
    prev: 'Anterior',
    next: 'Próximo',
    page: (value: number) => `Página${value}`,
    total: (total: number) => `Total:${total}`,
    size: (size: number) => `${size}/Página`,
  },
  picker: {
    cancel: 'Cancelar',
    done: 'Feito',
    placeholder: 'Selecione',
  },
  search: {
    search: 'Procurar',
    cancel: 'Cancelar',
  },
  steps: {
    wait: 'Não iniciado',
    finished: 'Expirado',
    process: 'Em andamento',
    failed: 'Fracassado',
  },
  tabs: {
    all: 'Todos',
  },
  upload: {
    error: 'Falha ao carregar',
  },
  input: {
    placeholder: 'Por favor insira informações...',
  },
  selectPicker: {
    title: 'Selecione',
    placeholder: 'Selecione',
    select: 'Selecione',
    confirm: 'OK',
    filterPlaceholder: 'Procurar',
  },
  tag: {
    placeholder: 'Digitar',
    add: 'Adicionar etiqueta',
  },
  textarea: {
    placeholder: 'Por favor insira informações...',
  },
  tableCol: {
    indexLabel: 'índice',
  },
}
