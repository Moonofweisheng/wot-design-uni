export default {
  calendar: {
    placeholder: 'Sélectionner',
    title: 'Sélectionnez une date',
    day: 'Date',
    week: 'Semaine',
    month: 'Mois',
    confirm: "Confirmer",
    startTime: 'Date de début',
    endTime: 'Date de fin',
    to: 'À',
    timeFormat: 'YY-MM-DD HH:mm:ss',
    dateFormat: 'YYYY-MM-DD',
    weekFormat: (year: number, week: number) => `Semaine ${week}, ${year}`,
    startWeek: 'Début de la semaine',
    endWeek: 'Fin de semaine',
    startMonth: 'Mois de début',
    endMonth: 'Mois de fin',
    monthFormat: 'YYYY-MM',
  },
  calendarView: {
    startTime: 'Heure de début',
    endTime: 'Heure de fin',
    weeks: {
      sun: 'Dim',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam',
    },
    rangePrompt: (maxRange: number) =>
      `Le nombre de jours sélectionnés ne peut pas dépasser ${maxRange} jours`,
    rangePromptWeek: (maxRange: number) =>
      `Le nombre de semaines sélectionné ne peut excéder ${maxRange} semaines`,
    rangePromptMonth: (maxRange: number) =>
      `Le mois sélectionné ne peut pas dépasser ${maxRange} mois`,
    monthTitle: 'YYYY-MM',
    yearTitle: 'YYYY',
    month: 'MM',
    hour: (value: number) => `${value}`,
    minute: (value: number) => `${value}`,
    second: (value: number) => `${value}`,
  },
  datetimePicker: {
    start: 'Depuis',
    end: 'À',
    to: 'À',
    placeholder: 'Sélectionner',
    confirm: "Confirmer",
    cancel: 'Annuler',
  },
  collapse: {
    expand: 'Développer',
    retract: 'Pli',
  },
  colPicker: {
    title: 'Sélectionner',
    placeholder: 'Sélectionner',
    select: 'Sélectionner',
  },
  loadmore: {
    loading: 'Chargement...',
    finished: 'Chargement terminé',
    error: 'Échec du chargement...',
    retry: 'Rafraîchir',
  },
  imgCropper: {
    confirm: "Confirmer",
    cancel: 'Annuler',
  },
  messageBox: {
    inputPlaceholder: 'Veuillez saisir des informations',
    confirm: "Confirmer",
    cancel: 'Annuler',
    inputNoValidate: 'Veuillez vous assurer de saisir des informations correctes',
  },
  numberKeyboard: {
    confirm: 'Confirmer',
  },
  pagination: {
    prev: 'Précédent',
    next: 'Suivant',
    page: (value: number) => `Page: ${value}`,
    total: (total: number) => `Total: ${total}`,
    size: (size: number) => `${size}/page`,
  },
  picker: {
    cancel: 'Annuler',
    done: 'Fait',
    placeholder: 'Sélectionner',
  },
  search: {
    search: 'Recherche',
    cancel: 'Annuler',
  },
  steps: {
    wait: 'Non démarré',
    finished: 'Expiré',
    process: 'En cours',
    failed: 'Échoué',
  },
  tabs: {
    all: 'Tous',
  },
  upload: {
    error: 'Échec du téléchargement',
  },
  input: {
    placeholder: 'Veuillez saisir les informations...',
  },
  selectPicker: {
    title: 'Sélectionner',
    placeholder: 'Sélectionner',
    select: 'Sélectionner',
    confirm: "Confirmer",
    filterPlaceholder: 'Recherche',
  },
  tag: {
    placeholder: 'Entrer',
    add: 'Ajouter une balise',
  },
  textarea: {
    placeholder: 'Veuillez saisir les informations...',
  },
  tableCol: {
    indexLabel: 'indice',
  },
}
