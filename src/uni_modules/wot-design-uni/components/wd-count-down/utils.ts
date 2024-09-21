import { padZero } from '../common/util'

export type TimeData = {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function parseFormat(format: string, timeData: TimeData): string {
  const { days } = timeData
  let { hours, minutes, seconds, milliseconds } = timeData

  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days))
  } else {
    hours += days * 24
  }

  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours))
  } else {
    minutes += hours * 60
  }

  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes))
  } else {
    seconds += minutes * 60
  }

  if (format.includes('ss')) {
    format = format.replace('ss', padZero(seconds))
  } else {
    milliseconds += seconds * 1000
  }

  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3)

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms)
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.charAt(0))
    }
  }

  return format
}
