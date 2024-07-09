/**
 * 验证电子邮箱格式
 */
export function email(value: string): boolean {
  // 基本的邮箱正则表达式，但不一定符合所有情况
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}

/**
 * 验证手机格式
 */
export function mobile(value: string): boolean {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value)
}

/**
 * 验证字符串
 */
export function string(value: any): boolean {
  return typeof value === 'string'
}

/**
 * 验证身份证号码
 */
export function idCard(value: string): boolean {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}

/**
 * 中文
 */
export function chinese(value: string): boolean {
  const reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
export function letter(value: string): boolean {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
export function enOrNum(value: string): boolean {
  return /^[0-9a-zA-Z]*$/.test(value)
}

/**
 * 验证是否包含某个值
 */
export function contains(value: string, param: string): boolean {
  return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
export function range(value: number, param: [number, number]): boolean {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export function rangeLength(value: string, param: [number, number]): boolean {
  return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定电话
 */
export function landline(value: string): boolean {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
  return reg.test(value)
}

/**
 * 判断是否为空
 */
export function empty(value: any): boolean {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      return value.trim().length === 0
    case 'boolean':
      return !value
    case 'number':
      return value === 0 || isNaN(value)
    case 'object':
      if (value === null) return true
      if (Array.isArray(value)) return value.length === 0
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) return false
      }
      return true
    default:
      return false
  }
}

/**
 * 是否json字符串
 */
export function jsonString(value: string): boolean {
  if (typeof value === 'string') {
    try {
      const obj = JSON.parse(value)
      return typeof obj === 'object' && obj !== null
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
export function array(value: any): boolean {
  return Array.isArray(value)
}

/**
 * 是否对象
 */
export function object(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否短信验证码
 */
export function code(value: string, len: number = 6): boolean {
  return new RegExp(`^\\d{${len}}$`).test(value)
}

/**
 * 是否函数方法
 */
export function func(value: any): boolean {
  return typeof value === 'function'
}

/**
 * 是否promise对象
 */
export function promise(value: any): boolean {
  return object(value) && func(value.then) && func(value.catch)
}

/**
 * 是否图片格式
 */
export function image(value: string): boolean {
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/i
  return IMAGE_REGEXP.test(value)
}

/**
 * 是否视频格式
 */
export function video(value: string): boolean {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)$/i
  return VIDEO_REGEXP.test(value)
}

/**
 * 是否为正则对象
 */
export function regExp(o: any): boolean {
  return o instanceof RegExp
}
