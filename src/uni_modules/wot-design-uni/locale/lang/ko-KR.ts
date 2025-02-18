export default {
  calendar: {
    placeholder: '선택',
    title: '날짜 선택',
    day: '일',
    week: '주',
    month: '월',
    confirm: '확인',
    startTime: '시작 시간',
    endTime: '종료 시간',
    to: '~',
    timeFormat: 'YY년 MM월 DD일 HH:mm:ss',
    dateFormat: 'YYYY년 MM월 DD일',
    weekFormat: (year: number, week: number) => `${year}년 ${week}주`,
    startWeek: '주 시작',
    endWeek: '주 종료',
    startMonth: '월 시작',
    endMonth: '월 종료',
    monthFormat: 'YYYY년 MM월'
  },
  calendarView: {
    startTime: '시작',
    endTime: '종료',
    weeks: {
      sun: '일',
      mon: '월',
      tue: '화',
      wed: '수',
      thu: '목',
      fri: '금',
      sat: '토'
    },
    rangePrompt: (maxRange: number) => `최대 ${maxRange}일까지 선택할 수 있습니다`,
    rangePromptWeek: (maxRange: number) => `최대 ${maxRange}주까지 선택할 수 있습니다`,
    rangePromptMonth: (maxRange: number) => `최대 ${maxRange}개월까지 선택할 수 있습니다`,
    monthTitle: 'YYYY년 MM월',
    yearTitle: 'YYYY년',
    month: 'MM월',
    hour: (value: number) => `${value}시`,
    minute: (value: number) => `${value}분`,
    second: (value: number) => `${value}초`
  },
  collapse: {
    expand: '확장',
    retract: '축소'
  },
  colPicker: {
    title: '선택',
    placeholder: '선택',
    select: '선택'
  },
  datetimePicker: {
    start: '시작',
    end: '종료',
    to: '~',
    placeholder: '선택',
    confirm: '확인',
    cancel: '취소'
  },
  loadmore: {
    loading: '로딩 중...',
    finished: '로딩 완료',
    error: '로딩 오류',
    retry: '재시도'
  },
  messageBox: {
    inputPlaceholder: '정보를 입력해주세요',
    confirm: '확인',
    cancel: '취소',
    inputNoValidate: '유효한 정보를 입력해주세요'
  },
  numberKeyboard: {
    confirm: '확인'
  },
  pagination: {
    prev: '이전',
    next: '다음',
    page: (value: number) => `페이지: ${value}`,
    total: (total: number) => `총: ${total}`,
    size: (size: number) => `${size}/페이지`
  },
  picker: {
    cancel: '취소',
    done: '완료',
    placeholder: '선택'
  },
  imgCropper: {
    confirm: '확인',
    cancel: '취소'
  },
  search: {
    search: '검색',
    cancel: '취소'
  },
  steps: {
    wait: '대기 중',
    finished: '완료',
    process: '진행 중',
    failed: '실패'
  },
  tabs: {
    all: '모두'
  },
  upload: {
    error: '업로드 오류'
  },
  input: {
    placeholder: '정보를 입력해주세요...'
  },
  selectPicker: {
    title: '선택',
    placeholder: '선택',
    select: '선택',
    confirm: '확인',
    filterPlaceholder: '검색'
  },
  tag: {
    placeholder: '입력',
    add: '태그 추가'
  },
  textarea: {
    placeholder: '정보를 입력해주세요...'
  },
  tableCol: {
    indexLabel: '인덱스'
  },
  signature: {
    confirmText: '확인',
    clearText: '지우기',
    revokeText: '실행 취소',
    restoreText: '복원'
  }
}
