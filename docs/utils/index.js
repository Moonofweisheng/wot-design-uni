const ua = navigator.userAgent.toLowerCase()

export const isWindows = ua.indexOf('win32') > -1 || ua.indexOf('wow32') > -1 || ua.indexOf('win64') > -1 || ua.indexOf('wow64') > -1
