export default {
  calendar: {
    placeholder: 'Sélectionner',
    title: 'Sélectionner une date',
    day: 'Jour',
    week: 'Semaine',
    month: 'Mois',
    confirm: 'Confirmer',
    startTime: 'Heure de début',
    endTime: 'Heure de fin',
    to: 'à',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Semaine ${week}, ${year}`,
    startWeek: 'Début de la semaine',
    endWeek: 'Fin de la semaine',
    startMonth: 'Début du mois',
    endMonth: 'Fin du mois',
    monthFormat: 'YYYY-MM'
  },
  calendarView: {
    startTime: 'Début',
    endTime: 'Fin',
    weeks: {
      sun: 'Dim',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam'
    },
    rangePrompt: (maxRange: number) => `La sélection de jours ne peut pas dépasser ${maxRange} jours`,
    rangePromptWeek: (maxRange: number) => `La sélection de semaines ne peut pas dépasser ${maxRange} semaines`,
    rangePromptMonth: (maxRange: number) => `La sélection de mois ne peut pas dépasser ${maxRange} mois`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}h`,
    minute: (value: number) => `${value}min`,
    second: (value: number) => `${value}sec`
  },
  collapse: {
    expand: 'Développer',
    retract: 'Réduire'
  },
  colPicker: {
    title: 'Sélectionner',
    placeholder: 'Sélectionner',
    select: 'Sélectionner'
  },
  datetimePicker: {
    start: 'Début',
    end: 'Fin',
    to: 'à',
    placeholder: 'Sélectionner',
    confirm: 'Confirmer',
    cancel: 'Annuler'
  },
  loadmore: {
    loading: 'Chargement en cours...',
    finished: 'Chargement terminé',
    error: 'Échec du chargement',
    retry: 'Réessayer'
  },
  messageBox: {
    inputPlaceholder: 'Veuillez entrer des informations',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    inputNoValidate: 'Veuillez entrer des informations valides'
  },
  numberKeyboard: {
    confirm: 'Confirmer'
  },
  pagination: {
    prev: 'Précédent',
    next: 'Suivant',
    page: (value: number) => `Page: ${value}`,
    total: (total: number) => `Total: ${total}`,
    size: (size: number) => `${size}/Page`
  },
  picker: {
    cancel: 'Annuler',
    done: 'Terminé',
    placeholder: 'Sélectionner'
  },
  imgCropper: {
    confirm: 'Confirmer',
    cancel: 'Annuler'
  },
  search: {
    search: 'Rechercher',
    cancel: 'Annuler'
  },
  steps: {
    wait: 'En attente',
    finished: 'Terminé',
    process: 'En cours',
    failed: 'Échec'
  },
  tabs: {
    all: 'Tous'
  },
  upload: {
    error: 'Échec du téléchargement'
  },
  input: {
    placeholder: 'Veuillez entrer des informations...'
  },
  selectPicker: {
    title: 'Sélectionner',
    placeholder: 'Sélectionner',
    select: 'Sélectionner',
    confirm: 'Confirmer',
    filterPlaceholder: 'Rechercher'
  },
  tag: {
    placeholder: 'Entrer',
    add: 'Ajouter une étiquette'
  },
  textarea: {
    placeholder: 'Veuillez entrer des informations...'
  },
  tableCol: {
    indexLabel: 'Indice'
  },
  signature: {
    confirmText: 'Signer',
    clearText: 'Effacer',
    revokeText: 'Annuler',
    restoreText: 'Restaurer'
  }
}
