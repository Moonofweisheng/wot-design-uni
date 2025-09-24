// 从根目录下的 package.json 中获取版本号
import { arrayToRegExp, getTypeSymbol, hyphenate, isCommonType, isUnionType } from 'components-helper'
import { version, name } from '../package.json'
import type { ReAttribute, ReComponentName, ReDocUrl, ReWebTypesSource, ReWebTypesType } from 'components-helper'
import path from 'path'
import { generateWebTypes } from './component-helper'
import os from 'os'

// 定义类型映射
const typeMap: any = {
  vue: ['Component', 'VNode', 'CSSProperties', 'StyleValue']
}

// 移除HTML标签、非英文字符和数字的函数
const removeHtmlTagsAndNonEnglish = (str: string) => {
  return str
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\d+/g, '')
    .trim()
}

// 重新定义组件名称的函数
const reComponentName: ReComponentName = (title: string) => {
  return `wd-${hyphenate(removeHtmlTagsAndNonEnglish(title)).replace(/[ ]+/g, '-')}`
}

// 重新定义文档 URL 的函数
const reDocUrl: ReDocUrl = (fileName, header) => {
  const docs = 'https://wot-ui.cn/component/'
  const _header = header ? removeHtmlTagsAndNonEnglish(header).replace(/\s+/g, '-').toLowerCase() : ''

  return `${docs}${fileName}.html${_header ? '#' : ''}${_header}`
}

// 重新定义 WebTypes 源的函数
const reWebTypesSource: ReWebTypesSource = (title) => {
  const symbol = `Wd${removeHtmlTagsAndNonEnglish(title)
    .replace(/-/g, ' ')
    .replace(/^\w|\s+\w/g, (item: string) => {
      return item.trim().toUpperCase()
    })}`
  return { symbol }
}

// 获取纯净值（移除所有反引号和星号以及首尾的单双引号）
const getPureValue = (value: string) => {
  return value
    .replace(/[`*]/g, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()
}

// 重新定义 WebTypes 类型的函数
const reWebTypesType: ReWebTypesType = (type) => {
  const _type = getPureValue(type)

  const isPublicType = isCommonType(_type)
  const isNumber = /^\d+$/.test(_type)
  const symbol = getTypeSymbol(_type)
  const isUnion = isUnionType(symbol)
  const module = findModule(symbol)

  return isPublicType || isNumber || !symbol || isUnion ? _type : { name: _type, source: { symbol, module } }
}

// 查找模块的函数
const findModule = (type: string) => {
  for (const key in typeMap) {
    const regExp = arrayToRegExp(typeMap[key])
    if (regExp.test(getTypeSymbol(type))) {
      return key
    }
  }
  return undefined
}

// 将驼峰写法转换为短横线连接的写法的函数
const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// 重新定义属性名称的函数
const reAttribute: ReAttribute = (value, key, row, title) => {
  if (title.includes('Attributes')) {
    if (key === '参数') {
      if (value.includes('v-model:')) {
        const part = value.split(/[\s/|]/).find((part) => part.startsWith('v-model:'))
        if (part) {
          const suffix = toKebabCase(part.split(':')[1].split(/[\s\W]/)[0])
          return `v-model:${suffix}`
        }
      } else if (value.includes('v-model')) {
        return 'v-model'
      }
      return toKebabCase(value.replace(/[^\w\s-]/g, ''))
    } else if (key === '可选值' || key === '默认值') {
      const pureValue = getPureValue(value)

      if (['', '-', '—'].includes(pureValue)) {
        return undefined
      } else {
        return pureValue
      }
    }
  }
  return value
}

// 定义文档目录
let entry = path.resolve(__dirname, '../docs/component/*.md')

if (os.platform() === 'win32') {
  entry = entry.replace(/\\/g, '/')
}

generateWebTypes({
  name,
  version,
  entry,
  outDir: path.resolve(__dirname, '../src/uni_modules/wot-design-uni'),
  reComponentName,
  reDocUrl,
  reWebTypesSource,
  reWebTypesType,
  reAttribute,
  events: 'Events',
  eventsName: '事件名称',
  eventsDescription: '说明',
  slots: 'Slots',
  slotsName: '名称',
  slotsDescription: '说明',
  props: 'Attributes',
  propsName: '参数',
  propsDescription: '说明',
  propsType: '类型',
  propsOptions: '可选值',
  propsDefault: '默认值',
  tableRegExp: /#+\s+(.*\s*Attributes|.*\s*Events|.*\s*Slots|.*\s*Directives)\s*\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g
})
