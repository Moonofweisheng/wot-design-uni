export default {
  calendar: {
    placeholder: 'Por favor selecione',
    title: 'Selecione a data',
    day: 'Dia',
    week: 'Semana',
    month: 'Mês',
    confirm: 'Confirmar',
    startTime: 'Hora de início',
    endTime: 'Hora de término',
    to: 'até',
    timeFormat: 'DD/MM/YYYY HH:mm:ss',
    dateFormat: 'DD/MM/YYYY',
    weekFormat: (year: number, week: number) => `${year} Semana ${week}`,
    startWeek: 'Semana de início',
    endWeek: 'Semana de término',
    startMonth: 'Mês de início',
    endMonth: 'Mês de término',
    monthFormat: 'MM/YYYY'
  },
  calendarView: {
    startTime: 'Início',
    endTime: 'Término',
    weeks: {
      sun: 'Dom',
      mon: 'Seg',
      tue: 'Ter',
      wed: 'Qua',
      thu: 'Qui',
      fri: 'Sex',
      sat: 'Sáb'
    },
    rangePrompt: (maxRange: number) => `Não pode selecionar mais que ${maxRange} dias`,
    rangePromptWeek: (maxRange: number) => `Não pode selecionar mais que ${maxRange} semanas`,
    rangePromptMonth: (maxRange: number) => `Não pode selecionar mais que ${maxRange} meses`,
    monthTitle: 'MM/YYYY',
    yearTitle: 'YYYY',
    month: 'Mês',
    hour: (value: number) => `${value} horas`,
    minute: (value: number) => `${value} minutos`,
    second: (value: number) => `${value} segundos`
  },
  collapse: {
    expand: 'Expandir',
    retract: 'Retrair'
  },
  colPicker: {
    title: 'Por favor selecione',
    placeholder: 'Por favor selecione',
    select: 'Por favor selecione'
  },
  datetimePicker: {
    start: 'Hora de início',
    end: 'Hora de término',
    to: 'até',
    placeholder: 'Por favor selecione',
    confirm: 'Concluir',
    cancel: 'Cancelar'
  },
  loadmore: {
    loading: 'Carregando...',
    finished: 'Carregamento concluído',
    error: 'Falha ao carregar',
    retry: 'Clique para tentar novamente'
  },
  messageBox: {
    inputPlaceholder: 'Por favor insira',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    inputNoValidate: 'Dados inseridos inválidos'
  },
  numberKeyboard: {
    confirm: 'Concluir'
  },
  pagination: {
    prev: 'Página anterior',
    next: 'Próxima página',
    page: (value: number) => `Página atual: ${value}`,
    total: (total: number) => `Total de dados: ${total}`,
    size: (size: number) => `Tamanho da página: ${size}`
  },
  picker: {
    cancel: 'Cancelar',
    done: 'Concluir',
    placeholder: 'Por favor selecione'
  },
  imgCropper: {
    confirm: 'Concluir',
    cancel: 'Cancelar'
  },
  search: {
    search: 'Buscar',
    cancel: 'Cancelar'
  },
  steps: {
    wait: 'Não iniciado',
    finished: 'Concluído',
    process: 'Em progresso',
    failed: 'Falhou'
  },
  tabs: {
    all: 'Todos'
  },
  upload: {
    error: 'Falha ao carregar'
  },
  input: {
    placeholder: 'Por favor insira...'
  },
  selectPicker: {
    title: 'Por favor selecione',
    placeholder: 'Por favor selecione',
    select: 'Por favor selecione',
    confirm: 'Confirmar',
    filterPlaceholder: 'Buscar'
  },
  tag: {
    placeholder: 'Por favor insira',
    add: 'Adicionar etiqueta'
  },
  textarea: {
    placeholder: 'Por favor insira...'
  },
  tableCol: {
    indexLabel: 'Número'
  },
  signature: {
    confirmText: 'Concluir',
    clearText: 'Limpar',
    revokeText: 'Desfazer',
    restoreText: 'Restaurar'
  }
}
