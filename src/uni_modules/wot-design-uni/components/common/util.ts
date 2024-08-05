import { AbortablePromise } from './AbortablePromise'

type NotUndefined<T> = T extends undefined ? never : T

/**
 * 生成uuid
 * @returns string
 */
export function uuid() {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

/**
 * @description 对num自动填充px
 * @param {Number} num
 * @return {string} num+px
 */
export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`
}

/**
 * @description 判断target是否对象
 * @param value
 * @return {boolean}
 */
export function isObj(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]' || typeof value === 'object'
}

/**
 * 获取目标原始类型
 * @param target 任意类型
 * @returns {string} type 数据类型
 */
export function getType(target: unknown): string {
  // 得到原生类型
  const typeStr = Object.prototype.toString.call(target)
  // 拿到类型值
  const match = typeStr.match(/\[object (\w+)\]/)
  const type = match && match.length ? match[1].toLowerCase() : ''
  // 类型值转小写并返回
  return type
}

/**
 * @description 默认的外部格式化函数 - picker 组件
 * @param items - 要格式化的数据项数组或单个数据项
 * @param kv - 配置对象，包含 labelKey 作为键值
 * @returns 格式化后的字符串
 */
export const defaultDisplayFormat = function (items: any[] | Record<string, any>, kv?: { labelKey?: string }): string {
  const labelKey: string = kv?.labelKey || 'value'

  if (Array.isArray(items)) {
    return items.map((item) => item[labelKey]).join(', ')
  } else {
    return items[labelKey]
  }
}

/**
 * @description 默认函数占位符 - pickerView组件
 * @param value 值
 * @return value
 */
export const defaultFunction = <T>(value: T): T => value

/**
 * @description 检查值是否不为空
 * @param value 值
 * @return {Boolean} 是否不为空
 */
export const isDef = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null

/**
 * @description 防止数字小于零
 * @param {number} num
 * @param {string} label 标签
 */
export const checkNumRange = (num: number, label: string = 'value'): void => {
  if (num < 0) {
    throw new Error(`${label} shouldn't be less than zero`)
  }
}

/**
 * @description 防止 pixel 无意义
 * @param {number} num
 * @param {string} label 标签
 */
export const checkPixelRange = (num: number, label: string = 'value'): void => {
  if (num <= 0) {
    throw new Error(`${label} should be greater than zero`)
  }
}

/**
 * 将 RGB 值转换为十六进制颜色代码。
 * @param {number} r - 红色分量 (0-255)。
 * @param {number} g - 绿色分量 (0-255)。
 * @param {number} b - 蓝色分量 (0-255)。
 * @returns {string} 十六进制颜色代码 (#RRGGBB)。
 */
export function rgbToHex(r: number, g: number, b: number): string {
  // 将 RGB 分量组合成一个十六进制数。
  const hex = ((r << 16) | (g << 8) | b).toString(16)

  // 使用零填充十六进制数，确保它有 6 位数字（RGB 范围）。
  const paddedHex = '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex

  return paddedHex
}

/**
 * 将十六进制颜色代码转换为 RGB 颜色数组。
 * @param hex 十六进制颜色代码（例如：'#RRGGBB'）
 * @returns 包含红、绿、蓝三个颜色分量的数组
 */
function hexToRgb(hex: string): number[] {
  const rgb: number[] = []

  // 从第一个字符开始，每两个字符代表一个颜色分量
  for (let i = 1; i < 7; i += 2) {
    // 将两个字符的十六进制转换为十进制，并添加到 rgb 数组中
    rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16))
  }

  return rgb
}

/**
 * 计算渐变色的中间变量数组。
 * @param {string} startColor 开始颜色
 * @param {string} endColor 结束颜色
 * @param {number} step 获取渲染位置，默认为中间位置
 * @returns {string[]} 渐变色中间颜色变量数组
 */
export const gradient = (startColor: string, endColor: string, step: number = 2): string[] => {
  // 将hex转换为rgb
  const sColor: number[] = hexToRgb(startColor)
  const eColor: number[] = hexToRgb(endColor)

  // 计算R\G\B每一步的差值
  const rStep: number = (eColor[0] - sColor[0]) / step
  const gStep: number = (eColor[1] - sColor[1]) / step
  const bStep: number = (eColor[2] - sColor[2]) / step

  const gradientColorArr: string[] = []
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
    )
  }
  return gradientColorArr
}

/**
 * 确保数值不超出指定范围。
 * @param {number} num 要限制范围的数值
 * @param {number} min 最小范围
 * @param {number} max 最大范围
 * @returns {number} 在指定范围内的数值
 */
export const range = (num: number, min: number, max: number): number => {
  // 使用 Math.min 和 Math.max 保证 num 不会超出指定范围
  return Math.min(Math.max(num, min), max)
}

/**
 * 比较两个值是否相等。
 * @param {any} value1 第一个值
 * @param {any} value2 第二个值
 * @returns {boolean} 如果值相等则为 true，否则为 false
 */
export const isEqual = (value1: any, value2: any): boolean => {
  // 使用严格相等运算符比较值是否相等
  if (value1 === value2) {
    return true
  }

  // 如果其中一个值不是数组，则认为值不相等
  if (!Array.isArray(value1) || !Array.isArray(value2)) {
    return false
  }

  // 如果数组长度不相等，则认为值不相等
  if (value1.length !== value2.length) {
    return false
  }

  // 逐个比较数组元素是否相等
  for (let i = 0; i < value1.length; ++i) {
    if (value1[i] !== value2[i]) {
      return false
    }
  }

  // 所有比较均通过，则认为值相等
  return true
}

/**
 * 在数字前补零，使其达到指定长度。
 * @param {number | string} number 要补零的数字
 * @param {number} length 目标长度，默认为 2
 * @returns {string} 补零后的结果
 */
export const padZero = (number: number | string, length: number = 2): string => {
  // 将输入转换为字符串
  let numStr: string = number.toString()

  // 在数字前补零，直到达到指定长度
  while (numStr.length < length) {
    numStr = '0' + numStr
  }

  return numStr
}

/** @description 全局变量id */
export const context = {
  id: 1000
}

export type RectResultType<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo

/**
 * 获取节点信息
 * @param selector 节点选择器 #id,.class
 * @param all 是否返回所有 selector 对应的节点
 * @param scope 作用域（支付宝小程序无效）
 * @returns 节点信息或节点信息数组
 */
export function getRect<T extends boolean>(selector: string, all: T, scope?: any): Promise<RectResultType<T>> {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    let query: UniNamespace.SelectorQuery | null = null
    if (scope) {
      query = uni.createSelectorQuery().in(scope)
    } else {
      query = uni.createSelectorQuery()
    }
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && isArray(rect) && rect.length > 0) {
          resolve(rect as RectResultType<T>)
        } else if (!all && rect) {
          resolve(rect as RectResultType<T>)
        } else {
          reject(new Error('No nodes found'))
        }
      })
      .exec()
  })
}

/**
 * 将驼峰命名转换为短横线命名。
 * @param {string} word 待转换的词条
 * @returns {string} 转换后的结果
 */
export function kebabCase(word: string): string {
  // 使用正则表达式匹配所有大写字母，并在前面加上短横线，然后转换为小写
  const newWord: string = word
    .replace(/[A-Z]/g, function (match) {
      return '-' + match
    })
    .toLowerCase()

  return newWord
}

/**
 * 将短横线链接转换为驼峰命名
 * @param word 需要转换的短横线链接
 * @returns 转换后的驼峰命名字符串
 */
export function camelCase(word: string): string {
  return word.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * 检查给定值是否为数组。
 * @param {any} value 要检查的值
 * @returns {boolean} 如果是数组则返回 true，否则返回 false
 */
export function isArray(value: any): value is Array<any> {
  // 如果 Array.isArray 函数可用，直接使用该函数检查
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  // 否则，使用对象原型的 toString 方法进行检查
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 检查给定值是否为函数。
 * @param {any} value 要检查的值
 * @returns {boolean} 如果是函数则返回 true，否则返回 false
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T extends Function>(value: any): value is T {
  return getType(value) === 'function'
}

/**
 * 检查给定值是否为字符串。
 * @param {unknown} value 要检查的值
 * @returns {value is string} 如果是字符串则返回 true，否则返回 false
 */
export function isString(value: unknown): value is string {
  return getType(value) === 'string'
}

/**
 * 否是数值
 * @param {*} value
 */
export function isNumber(value: any): value is number {
  return getType(value) === 'number'
}

/**
 * 检查给定值是否为 Promise 对象。
 * @param {unknown} value 要检查的值
 * @returns {value is Promise<any>} 如果是 Promise 对象则返回 true，否则返回 false
 */
export function isPromise(value: unknown): value is Promise<any> {
  // 先将 value 断言为 object 类型
  if (isObj(value) && isDef(value)) {
    // 然后进一步检查 value 是否具有 then 和 catch 方法，并且它们是函数类型
    return isFunction((value as Promise<any>).then) && isFunction((value as Promise<any>).catch)
  }
  return false // 如果 value 不是对象类型，则肯定不是 Promise
}

/**
 * 检查给定的值是否为布尔类型
 * @param value 要检查的值
 * @returns 如果值为布尔类型，则返回true，否则返回false
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

export function isNotUndefined<T>(value: T): value is NotUndefined<T> {
  return !isUndefined(value)
}

/**
 * 检查给定的值是否为奇数
 * @param value 要检查的值
 * @returns
 */
export function isOdd(value: number): boolean {
  if (typeof value !== 'number') {
    throw new Error('输入必须为数字')
  }

  // 使用取模运算符来判断是否为奇数
  // 如果 number 除以 2 的余数为 1，就是奇数
  // 否则是偶数
  return value % 2 === 1
}

/**
 * 是否为base64图片
 * @param {string} url
 * @return
 */
export function isBase64Image(url: string) {
  // 使用正则表达式检查URL是否以"data:image"开头，这是Base64图片的常见前缀
  return /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/.test(url)
}

/**
 * 将外部传入的样式格式化为可读的 CSS 样式。
 * @param {object | object[]} styles 外部传入的样式对象或数组
 * @returns {string} 格式化后的 CSS 样式字符串
 */
export function objToStyle(styles: Record<string, any> | Record<string, any>[]): string {
  // 如果 styles 是数组类型
  if (isArray(styles)) {
    // 使用过滤函数去除空值和 null 值的元素
    // 对每个非空元素递归调用 objToStyle，然后通过分号连接
    return styles
      .filter(function (item) {
        return item != null && item !== ''
      })
      .map(function (item) {
        return objToStyle(item)
      })
      .join(';')
  }

  if (isString(styles)) {
    return styles
  }

  // 如果 styles 是对象类型
  if (isObj(styles)) {
    // 使用 Object.keys 获取所有属性名
    // 使用过滤函数去除值为 null 或空字符串的属性
    // 对每个属性名和属性值进行格式化，通过分号连接
    return Object.keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== ''
      })
      .map(function (key) {
        // 使用 kebabCase 函数将属性名转换为 kebab-case 格式
        // 将属性名和属性值格式化为 CSS 样式的键值对
        return [kebabCase(key), styles[key]].join(':')
      })
      .join(';')
  }
  // 如果 styles 不是对象也不是数组，则直接返回
  return ''
}

export const requestAnimationFrame = (cb = () => {}) => {
  return new AbortablePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 30)
  })
}

/**
 * 暂停指定时间函数
 * @param ms 延迟时间
 * @returns
 */
export const pause = (ms: number) => {
  return new AbortablePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, ms)
  })
}

/**
 * 深拷贝函数，用于将对象进行完整复制。
 * @param obj 要深拷贝的对象
 * @param cache 用于缓存已复制的对象，防止循环引用
 * @returns 深拷贝后的对象副本
 */
export function deepClone<T>(obj: T, cache: Map<any, any> = new Map()): T {
  // 如果对象为 null 或者不是对象类型，则直接返回该对象
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理特殊对象类型：日期、正则表达式、错误对象
  if (isDate(obj)) {
    return new Date(obj.getTime()) as any
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as any
  }
  if (obj instanceof Error) {
    const errorCopy = new Error(obj.message) as any
    errorCopy.stack = obj.stack
    return errorCopy
  }

  // 检查缓存中是否已存在该对象的复制
  if (cache.has(obj)) {
    return cache.get(obj)
  }

  // 根据原始对象的类型创建对应的空对象或数组
  const copy: any = Array.isArray(obj) ? [] : {}

  // 将当前对象添加到缓存中
  cache.set(obj, copy)

  // 递归地深拷贝对象的每个属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache)
    }
  }

  return copy as T
}

/**
 * 深度合并两个对象。
 * @param target 目标对象，将合并的结果存放在此对象中
 * @param source 源对象，要合并到目标对象的对象
 * @returns 合并后的目标对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  // 深拷贝目标对象，避免修改原始对象
  target = deepClone(target)

  // 检查目标和源是否都是对象类型
  if (typeof target !== 'object' || typeof source !== 'object') {
    throw new Error('Both target and source must be objects.')
  }

  // 遍历源对象的属性
  for (const prop in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (!source.hasOwnProperty(prop))
      continue
      // 使用类型断言，告诉 TypeScript 这是有效的属性
    ;(target as Record<string, any>)[prop] = source[prop]
  }

  return target
}

/**
 * 深度合并两个对象。
 * @param target
 * @param source
 * @returns
 */
export function deepAssign(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const newObjValue = source[key]
    if (isObj(targetValue) && isObj(newObjValue)) {
      deepAssign(targetValue, newObjValue)
    } else {
      target[key] = newObjValue
    }
  })
  return target
}

/**
 * 构建带参数的URL
 * @param baseUrl 基础URL
 * @param params 参数对象，键值对表示要添加到URL的参数
 * @returns 返回带有参数的URL
 */
export function buildUrlWithParams(baseUrl: string, params: Record<string, string>) {
  // 将参数对象转换为查询字符串
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  // 检查基础URL是否已包含查询字符串，并选择适当的分隔符
  const separator = baseUrl.includes('?') ? '&' : '?'

  // 返回带有参数的URL
  return `${baseUrl}${separator}${queryString}`
}

type DebounceOptions = {
  leading?: boolean // 是否在延迟时间开始时调用函数
  trailing?: boolean // 是否在延迟时间结束时调用函数
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, options: DebounceOptions = {}): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | undefined
  let lastThis: any
  let result: ReturnType<T> | undefined
  const leading = isDef(options.leading) ? options.leading : false
  const trailing = isDef(options.trailing) ? options.trailing : true

  function invokeFunc() {
    if (lastArgs !== undefined) {
      result = func.apply(lastThis, lastArgs)
      lastArgs = undefined
    }
  }

  function startTimer() {
    timeoutId = setTimeout(() => {
      timeoutId = null
      if (trailing) {
        invokeFunc()
      }
    }, wait)
  }

  function cancelTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    lastArgs = args
    lastThis = this

    if (timeoutId === null) {
      if (leading) {
        invokeFunc()
      }
      startTimer()
    } else if (trailing) {
      cancelTimer()
      startTimer()
    }

    return result
  }

  return debounced as T
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(func: Function, wait: number): Function {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous: number = 0

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }

  return throttled
}

/**
 * 根据属性路径获取对象中的属性值
 * @param obj 目标对象
 * @param path 属性路径，可以是字符串或字符串数组
 * @returns 属性值，如果属性不存在或中间的属性为 null 或 undefined，则返回 undefined
 */
export const getPropByPath = (obj: any, path: string): any => {
  const keys: string[] = path.split('.')

  try {
    return keys.reduce((acc: any, key: string) => (acc !== undefined && acc !== null ? acc[key] : undefined), obj)
  } catch (error) {
    return undefined
  }
}

/**
 * 检查一个值是否为Date类型
 * @param val 要检查的值
 * @returns 如果值是Date类型，则返回true，否则返回false
 */
export const isDate = (val: unknown): val is Date => Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN((val as Date).getTime())

/**
 * 检查提供的URL是否为视频链接。
 * @param url 需要检查的URL字符串。
 * @returns 返回一个布尔值，如果URL是视频链接则为true，否则为false。
 */
export function isVideoUrl(url: string): boolean {
  // 使用正则表达式匹配视频文件类型的URL
  const videoRegex = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)/i
  return videoRegex.test(url)
}

/**
 * 检查提供的URL是否为图片URL。
 * @param url 待检查的URL字符串。
 * @returns 返回一个布尔值，如果URL是图片格式，则为true；否则为false。
 */
export function isImageUrl(url: string): boolean {
  // 使用正则表达式匹配图片URL
  const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i
  return imageRegex.test(url)
}

/**
 * 判断环境是否是H5
 */
export const isH5 = process.env.UNI_PLATFORM === 'h5'

/**
 * 剔除对象中的某些属性
 * @param obj
 * @param predicate
 * @returns
 */
export function omitBy<O extends Record<string, any>>(obj: O, predicate: (value: any, key: keyof O) => boolean): Partial<O> {
  const newObj = deepClone(obj)
  Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key]) // 遍历对象的键，删除值为不满足predicate的字段
  return newObj
}
