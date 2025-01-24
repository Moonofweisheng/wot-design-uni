import fg from 'fast-glob'
import { read, parse, vetur, webTypes, write, isString } from 'components-helper'
import type { Config, InstallOptions, NormalizeData, Options, ParseData, ParseTable } from 'components-helper'

const config: Config = {
  tags: 'tags.json',
  attributes: 'attributes.json',
  webTypes: 'web-types.json',
  titleRegExp: /#+\s+(.*)\n+([^(#|\n)]*)/g,
  tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
  fileNameRegExp: /\/((\w|-)+)\.\w+$/,
  separator: '/',
  props: 'props',
  propsName: 'Name',
  propsType: 'Type',
  propsDescription: 'Description',
  propsOptions: 'Options',
  propsDefault: 'Default',
  events: 'events',
  eventsName: 'Name',
  eventsDescription: 'Description',
  slots: 'slots',
  slotsName: 'Name',
  slotsDescription: 'Description',
  slotsType: 'Type',
  slotsSubtags: 'Subtags',
  directives: 'directives',
  directivesName: 'Name',
  directivesType: 'Type',
  directivesDescription: 'Description'
}

function normalize(options: Options, data: ParseData, path: string): NormalizeData {
  const { fileNameRegExp, props, events, slots, directives } = options
  const _fileNameRegExp = isString(fileNameRegExp) ? new RegExp(fileNameRegExp) : fileNameRegExp
  const _path = path.match(_fileNameRegExp)
  const fileName = _path ? _path[1] : ''
  const _data: NormalizeData = Object.assign(data, { path, fileName })
  const _props = new RegExp(props, 'i')
  const _events = new RegExp(events, 'i')
  const _slots = new RegExp(slots, 'i')
  const _directives = new RegExp(directives, 'i')

  if (!_data.table || !_data.table.length) return _data

  for (let i = 0; i < _data.table.length; i++) {
    const item = _data.table[i]
    const title = item.title
    if (!title) continue

    if (_props.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'props',
        regExp: _props
      })
    } else if (_events.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'events',
        regExp: _events
      })
    } else if (_slots.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'slots',
        regExp: _slots
      })
    } else if (_directives.test(title)) {
      setData({
        data: _data,
        item,
        path,
        fileName,
        title,
        key: 'directives',
        regExp: _directives
      })
    }
  }
  return _data
}

function setData({
  data,
  key,
  item,
  title,
  path,
  fileName,
  regExp
}: {
  data: NormalizeData
  key: 'props' | 'events' | 'slots' | 'directives'
  item: ParseTable
  title: string
  path: string
  fileName: string
  regExp: RegExp
}) {
  const childTitle = title.replace(regExp, '').trim()

  if (childTitle) {
    const childHeader = data.headers?.find((item) => item.title === childTitle)
    const childItem = {
      path,
      fileName,
      title: childTitle,
      description: childHeader?.description || data.description,
      [key]: item
    }

    if (!data.children) {
      data.children = [childItem]
    } else {
      const child = data.children.find((item) => item.title === childTitle)

      if (child) {
        child[key] = item
      } else {
        data.children.push(childItem)
      }
    }
  } else {
    data[key] = item
  }
}

export function generateWebTypes(options = {} as InstallOptions) {
  if (!options.entry) throw new Error('entry must be a string (non empty) or an array of strings')
  if (!options.outDir) throw new Error('outDir must be a string (non empty)')
  if (!options.name) console.warn('missing property "name"')
  if (!options.version) console.warn('missing property "version"')

  const _options: Options = Object.assign(config, options)
  const files: string[] = fg.sync(_options.entry, _options.fastGlobConfig)
  const data = files.map((path) => {
    const fileContent = read(path)
    const parseContent = parse(_options, fileContent)
    const content = normalize(_options, parseContent, path)
    return content
  })
  const { tags, attributes } = vetur(_options, data)
  const webTypesData = webTypes(_options, data)

  write(_options, 'tags', tags)
  write(_options, 'attributes', attributes)
  write(_options, 'webTypes', webTypesData)
}
