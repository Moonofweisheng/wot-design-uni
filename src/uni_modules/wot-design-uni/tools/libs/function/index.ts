import { number, empty } from './test'
import { round } from './digit'

/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
export function range(min: number = 0, max: number = 0, value: number = 0): number {
  return Math.max(min, Math.min(max, Number(value)))
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$wd.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise<void>} 返回promise
 */
export function sleep(value: number = 30): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, value)
  })
}

/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
export function os(): string {
  return uni.getSystemInfoSync().platform.toLowerCase()
}

/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
export function sys(): UniApp.GetSystemInfoSyncResult {
  return uni.getSystemInfoSync()
}

/**
 * @description 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1
    return Math.floor(Math.random() * gab + min)
  }
  return 0
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (cache.has(obj)) return cache.get(obj)
  let clone
  if (obj instanceof Date) {
    clone = new Date(obj.getTime())
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj)
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]))
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, (value) => deepClone(value, cache)))
  } else if (Array.isArray(obj)) {
    clone = obj.map((value) => deepClone(value, cache))
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj))
    cache.set(obj, clone)
    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value, cache)
    }
  } else {
    clone = Object.assign({}, obj)
  }
  cache.set(obj, clone)
  return clone
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
export function deepMerge(target = {}, source = {}) {
  target = deepClone(target)
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) return target

  const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target)

  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const sourceValue = source[prop]
      const targetValue = merged[prop]

      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue)
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue)
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue)
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue)
      } else if (typeof sourceValue === 'object' && sourceValue !== null) {
        merged[prop] = deepMerge(targetValue, sourceValue)
      } else {
        merged[prop] = sourceValue
      }
    }
  }

  return merged
}

/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
export function randomArray(array = []) {
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(() => Math.random() - 0.5)
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength, fillString = ' ') {
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String')
    }
    const str = this
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str)

    const fillLength = maxLength - str.length
    let times = Math.ceil(fillLength / fillString.length)
    while ((times >>= 1)) {
      fillString += fillString
      if (times === 1) {
        fillString += fillString
      }
    }
    return fillString.slice(0, fillLength) + str
  }
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export function timeFormat(dateTime = null, formatStr = 'yyyy-mm-dd') {
  let date
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date()
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
    date = new Date(dateTime * 1000)
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime))
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'))
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime)
  }

  const timeSource = {
    y: date.getFullYear().toString(), // 年
    m: (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    d: date.getDate().toString().padStart(2, '0'), // 日
    h: date.getHours().toString().padStart(2, '0'), // 时
    M: date.getMinutes().toString().padStart(2, '0'), // 分
    s: date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }

  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
    if (ret) {
      // 年可能只需展示两位
      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
    }
  }

  return formatStr
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
export function timeFrom(timestamp = null, format = 'yyyy-mm-dd') {
  if (timestamp == null) timestamp = Number(new Date())
  timestamp = parseInt(timestamp)
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000
  let timer = new Date().getTime() - timestamp
  timer = parseInt(timer / 1000)
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  let tips = ''
  switch (true) {
    case timer < 300:
      tips = '刚刚'
      break
    case timer >= 300 && timer < 3600:
      tips = `${parseInt(timer / 60)}分钟前`
      break
    case timer >= 3600 && timer < 86400:
      tips = `${parseInt(timer / 3600)}小时前`
      break
    case timer >= 86400 && timer < 2592000:
      tips = `${parseInt(timer / 86400)}天前`
      break
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = `${parseInt(timer / (86400 * 30))}个月前`
        } else {
          tips = `${parseInt(timer / (86400 * 365))}年前`
        }
      } else {
        tips = timeFormat(timestamp, format)
      }
  }
  return tips
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
export function trim(str, pos = 'both') {
  str = String(str)
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '')
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '')
  }
  return str
}

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
export function priceFormat(number, decimals = 0, decimalPoint = '.', thousandsSeparator = ',') {
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator
  const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint
  let s = ''

  s = (prec ? round(n, prec) + '' : `${Math.round(n)}`).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`)
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
export function padZero(value) {
  return `00${value}`.slice(-2)
}

/**
 * @description 获取当前页面路径
 */
export function page() {
  const pages = getCurrentPages()
  const route = pages[pages.length - 1]?.route
  // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
  return `/${route ? route : ''}`
}

/**
 * @description 获取当前路由栈实例数组
 */
export function pages() {
  const pages = getCurrentPages()
  return pages
}

/**
 * 获取页面历史栈指定层实例
 * @param back {number} [0] - 0或者负数，表示获取历史栈的哪一层，0表示获取当前页面实例，-1 表示获取上一个页面实例。默认0。
 */
export function getHistoryPage(back = 0) {
  const pages = getCurrentPages()
  const len = pages.length
  return pages[len - 1 + back]
}

/**
 * 打电话
 * @param {String<Number>} phoneNumber - 数字字符串
 * @return {Promise}
 */
export function callPhone(phoneNumber = '') {
  const num = phoneNumber.toString()
  return new Promise((rs, rj) => {
    uni.makePhoneCall({
      phoneNumber: num,
      success: () => rs(true),
      fail: (err) => rj(err)
    })
  })
}
