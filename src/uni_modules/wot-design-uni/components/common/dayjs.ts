import { isDate } from './util'

/* eslint-disable */
class Dayjs {
  utc: boolean
  date: Date
  timeZone: number
  timeZoneString: any
  mYear: any
  mMonth: any
  mDay: any
  mWeek: any
  mHour: any
  mMinute: any
  mSecond: any
  constructor(dateStr?: string | number | Date) {
    this.utc = false
    const parsedDate = this.parseConfig(dateStr)
    this.date = new Date(parsedDate)
    this.timeZone = this.date.getTimezoneOffset() / 60
    this.timeZoneString = this.padNumber(String(-1 * this.timeZone).replace(/^(.)?(\d)/, '$10$200'), 5, '+')
    this.mYear = this.date.getFullYear()
    this.mMonth = this.date.getMonth()
    this.mDay = this.date.getDate()
    this.mWeek = this.date.getDay()
    this.mHour = this.date.getHours()
    this.mMinute = this.date.getMinutes()
    this.mSecond = this.date.getSeconds()
  }

  parseConfig(dateStr?:string | number | Date) {
    if (!dateStr) return new Date()
    if (isDate(dateStr)) return dateStr
    if (/^(\d){8}$/.test(dateStr as string)) {
      this.utc = true
      return `${(dateStr as string).substr(0, 4)}-${(dateStr as string).substr(4, 2)}-${(dateStr as string).substr(6, 2)}`
    }
    return dateStr
  }

  padNumber(num:string, length:number, padChar:string) {
    return !num || num.length >= length ? num : `${Array(length + 1 - num.length).join(padChar)}${num}`
  }

  year() {
    return this.mYear
  }

  month() {
    return this.mMonth
  }

  unix() {
    const timeZoneOffset = this.utc ? 60 * this.timeZone * 60 * 1000 : 0
    return Math.floor((this.date.getTime() + timeZoneOffset) / 1000)
  }

  toString() {
    return this.date.toUTCString()
  }

  startOf(unit:string) {
    switch (unit) {
      case 'year':
        return new Dayjs(new Date(this.year(), 0, 1))
      case 'month':
        return new Dayjs(new Date(this.year(), this.month(), 1))
      default:
        return this
    }
  }

  add(amount:number, unit:string) {
    let interval
    switch (unit) {
      case 'm':
      case 'minutes':
        interval = 60
        break
      case 'h':
      case 'hours':
        interval = 60 * 60
        break
      case 'd':
      case 'days':
        interval = 24 * 60 * 60
        break
      case 'w':
      case 'weeks':
        interval = 7 * 24 * 60 * 60
        break
      default:
        interval = 1
    }
    const newUnixTime = this.unix() + amount * interval
    return new Dayjs(1000 * newUnixTime)
  }

  subtract(amount:number, unit:string) {
    return this.add(-1 * amount, unit)
  }

  format(formatStr = 'YYYY-MM-DDTHH:mm:ssZ') {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return formatStr.replace(/Y{2,4}|M{1,2}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, (match) => {
      switch (match) {
        case 'YY':
          return String(this.mYear).slice(-2)
        case 'YYYY':
          return String(this.mYear)
        case 'M':
          return String(this.mMonth + 1)
        case 'MM':
          return this.padNumber(String(this.mMonth + 1), 2, '0')
        case 'D':
          return String(this.mDay)
        case 'DD':
          return this.padNumber(String(this.mDay), 2, '0')
        case 'd':
          return String(this.mWeek)
        case 'dddd':
          return weekdays[this.mWeek]
        case 'H':
          return String(this.mHour)
        case 'HH':
          return this.padNumber(String(this.mHour), 2, '0')
        case 'm':
          return String(this.mMinute)
        case 'mm':
          return this.padNumber(String(this.mMinute), 2, '0')
        case 's':
          return String(this.mSecond)
        case 'ss':
          return this.padNumber(String(this.mSecond), 2, '0')
        case 'Z':
          return `${this.timeZoneString.slice(0, -2)}:00`
        case 'ZZ':
          return this.timeZoneString
        default:
          return match
      }
    })
  }
}

export  function dayjs(dateStr?: string | number | Date) {
 return new Dayjs(dateStr)
}
