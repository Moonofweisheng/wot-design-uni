/* eslint-disable no-prototype-builtins */
import debounce from './lodash/debounce'

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
export function addUnit(num) {
  return Number.isNaN(Number(num)) ? num : `${num}px`
}

/**
 * @description 获取当前页面栈顶(当前显示的页面)
 * @return {wx.Page}
 */
export function getContext() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * @description 判断target是否对象
 * @param obj
 * @return {boolean}
 */
export function isObj(obj) {
  // Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase() === 'object'
  return typeof obj === 'object'
}

/**
 * @description 获取目标原始类型
 * @param target 任意类型
 * @returns {string} type 数据类型
 */
export function getType(target) {
  // 得到原生类型
  const typeStr = Object.prototype.toString.call(target)
  // 拿到类型值
  const match = typeStr.match(/\[object (\w+)\]/)
  const type = match && match.length ? match[1] : ''
  // 类型值转小写并返回
  return type.toLowerCase()
}

/**
 * @description 默认的外部格式化函数 - picker组件
 * @param items
 * @param labelKey
 * @return {*}
 */
export const defaultDisplayFormat = function (items, kv: Record<string, any>) {
  const labelKey: string = kv ? kv['labelKey'] || 'value' : 'value'
  // 在props中，this被指向了全局data
  if (items instanceof Array) {
    return items.map((item) => item[labelKey]).toString()
  } else {
    return items[labelKey]
  }
}
/**
 * @description 默认函数占位符 - pickerView组件
 * @param value
 * @return value
 */
export const defaultFunction = (value) => value
/**
 * @description 是否不为空
 * @param value
 * @return {Boolean}
 */
export const isDef = (value) => value !== undefined && value !== null

export { debounce }

/**
 * @description 防止数字小于零
 * @param {Number} num
 * @param {String} label 标签
 */
export const checkNumRange = (num, label = 'value') => {
  if (num < 0) {
    throw Error(`${label} shouldn't be less than zero`)
  }
}
/**
 * @description 防止pixel无意义
 * @param {Number} num
 * @param {String} label 标签
 */
export const checkPixelRange = (num, label = 'value') => {
  if (num <= 0) {
    throw Error(`${label} should be greater than zero`)
  }
}

function rgbToHex(r: number, g: number, b: number) {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

function hexToRgb(hex) {
  const rgb: number[] = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return rgb
}

/**
 * @default 计算渐变色的中间变量
 * @param {String} startColor 开始颜色
 * @param {String} endColor 结束颜色
 * @param {Number} step 获取渲染位置，默认为中间位置
 * @return {String} 渐变色中间颜色变量
 */
export const gradient = (startColor, endColor, step = 2) => {
  // 将hex转换为rgb
  const sColor: number[] = hexToRgb(startColor)
  const eColor: number[] = hexToRgb(endColor)

  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step
  const gStep = (eColor[1] - sColor[1]) / step
  const bStep = (eColor[2] - sColor[2]) / step

  const gradientColorArr: string[] = []
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
    )
  }
  return gradientColorArr
}

/** @description 保证num不超出min和max的范围 */
export const range = (num: number, min: number, max: number) => Math.min(Math.max(Number(num), Number(min)), Number(max))

/** @description 比较数值是否相等 */
export const isEqual = (value1, value2) => {
  if (value1 === value2) return true
  if (!(value1 instanceof Array)) return false
  if (!(value2 instanceof Array)) return false
  if (value1.length !== value2.length) return false
  for (let i = 0; i !== value1.length; ++i) {
    if (value1[i] !== value2[i]) return false
  }
  return true
}

/** @description 不满10补0 */
export const padZero = (number, length = 2) => {
  number = number + ''

  while (number.length < length) {
    number = '0' + number
  }

  return number
}

/** @description 全局变量id */
export const context = {
  id: 1000
}

/**
 * 获取节点信息
 * @param selector 节点 #id,.class
 * @param all 是否返回所有 selector 对应的节点
 * @param scope 作用域（支付宝小程序无效）
 * @returns
 */
export function getRect(selector: string, all: boolean = false, scope?: any) {
  return new Promise<UniApp.NodeInfo | UniApp.NodeInfo[]>((resolve) => {
    let query: UniNamespace.SelectorQuery | null = null
    // #ifndef MP-ALIPAY
    query = uni.createSelectorQuery().in(scope)
    // #endif
    // #ifdef MP-ALIPAY
    query = uni.createSelectorQuery()
    // #endif
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
  })
}

/**
 * 驼峰转短横线
 * @param word 待转换词条
 * @returns
 */
export function kebabCase(word) {
  const newWord = word
    .replace(RegExp('[A-Z]', 'g'), function (i) {
      return '-' + i
    })
    .toLowerCase()
  return newWord
}

/**
 * 是否数组
 */
export function isArray(value: any) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否函数方法
 * @param {Object} value
 */
export function isFunction(value): boolean {
  return typeof value === 'function'
}

/**
 * 是否为promise
 * @param value 函数
 * @returns
 */
export function isPromise(value: any): value is Promise<any> {
  return Boolean(value) && isObj(value) && isFunction(value.then) && isFunction(value.catch)
}

/**
 * 外部传入样式格式化为css可读样式
 * @param styles 外部传入样式
 * @returns
 */
export function objToStyle(styles) {
  if (isArray(styles)) {
    return styles
      .filter(function (item) {
        return item != null && item !== ''
      })
      .map(function (item) {
        return objToStyle(item)
      })
      .join(';')
  }

  if (isObj(styles)) {
    return Object.keys(styles)
      .filter(function (key) {
        return styles[key] != null && styles[key] !== ''
      })
      .map(function (key) {
        return [kebabCase(key), [styles[key]]].join(':')
      })
      .join(';')
  }
  return styles
}

export const requestAnimationFrame = (cb = () => void 0) => {
  return new Promise((resolve, reject) => {
    // nextTick(() => {
    //   resolve(true)
    //   cb()
    // })
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 60)
  })
}

/**
 * 深拷贝
 * @param obj 深度拷贝的对象
 * @param cache
 * @returns
 */
export function deepClone(obj, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Object.prototype.toString.call(obj) === '[object Date]') return new Date(obj)
  if (Object.prototype.toString.call(obj) === '[object RegExp]') return new RegExp(obj)
  if (Object.prototype.toString.call(obj) === '[object Error]') return new Error(obj)

  const item: any = cache.filter((item: any) => item.original === obj)[0]
  if (item) return item.copy

  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], cache)
  })

  return copy
}

// JS对象深度合并
export function deepMerge(target = {}, source = {}) {
  target = deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') return false
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      } else {
        target[prop] = deepMerge(target[prop], source[prop])
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * 设置参数
 * @param path 路径（无参数）
 * @param params （参数）
 * @returns
 */
export function setUrlParams(path: string, params: Record<string, string>) {
  for (const key in params) {
    if (path.indexOf('?') > -1) {
      path = path + `&${key}=${params[key]}`
    } else {
      path = path + `?${key}=${params[key]}`
    }
  }
  return path
}
