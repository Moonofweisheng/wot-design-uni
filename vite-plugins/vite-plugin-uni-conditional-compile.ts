import { createFilter, FilterPattern } from '@rollup/pluginutils'
import type { Plugin, TransformResult } from 'vite'

interface ConditionalCompileOptions {
  include?: FilterPattern
  exclude?: FilterPattern
  platform?: string
  /**
   * 是否在测试环境中
   * 在测试环境中，我们可能需要特殊处理一些条件编译代码
   */
  isTest?: boolean
}

/**
 * uni-app条件编译插件
 * 用于处理uni-app的条件编译代码
 */
export default function vitePluginUniConditionalCompile(options: ConditionalCompileOptions = {}): Plugin {
  const {
    include = [/\.vue$/, /\.js$/, /\.ts$/, /\.css$/, /\.scss$/],
    exclude = [],
    platform = 'h5',
    isTest = process.env.NODE_ENV === 'test' || process.env.VITEST
  } = options

  // 在测试环境中，我们需要处理所有文件，包括测试文件
  const filter = (id: string) => {
    // 如果是测试文件，直接返回true
    if (isTest && (id.includes('test.') || id.endsWith('.test.ts') || id.endsWith('.test.js'))) {
      return true
    }
    // 否则使用createFilter
    return createFilter(include, exclude)(id)
  }

  // 匹配条件编译注释的正则
  // 处理HTML注释形式的条件编译
  const htmlConditionalPattern = /<!--\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*-->([\s\S]*?)<!--\s*#endif\s*-->/g

  // 处理Vue编译后的条件编译注释
  const vueCompiledConditionalPattern =
    /_createCommentVNode\(\s*["']#(ifdef|ifndef)\s+([\w|&!\-\s]+)["']\s*\)([\s\S]*?)_createCommentVNode\(\s*["']#endif["']\s*\)/g

  // 处理JS注释形式的条件编译 - 单行注释
  const jsConditionalPattern = /\/\/\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)[\r\n]([\s\S]*?)[\r\n]\s*\/\/\s*#endif/g

  // 处理多行JS注释形式的条件编译
  const jsMultilineConditionalPattern = /\/\*\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*\*\/([\s\S]*?)\/\*\s*#endif\s*\*\//g

  // 处理CSS注释形式的条件编译
  const cssConditionalPattern = /\/\*\s*#(ifdef|ifndef)\s+([\w|&!\-\s]+)\s*\*\/([\s\S]*?)\/\*\s*#endif\s*\*\//g

  return {
    name: 'vite-plugin-uni-conditional-compile',

    transform(code: string, id: string): TransformResult | undefined {
      if (!filter(id)) return undefined
      let transformed = code
      try {
        // 处理HTML条件块
        transformed = transformed.replace(htmlConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理Vue编译后的条件编译注释
        transformed = transformed.replace(vueCompiledConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理JS单行注释条件块
        transformed = transformed.replace(jsConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理JS多行注释条件块
        transformed = transformed.replace(jsMultilineConditionalPattern, (_match, type, envExp, content) => {
          return processCondition(type, envExp, content, platform, isTest as boolean)
        })

        // 处理CSS注释形式的条件编译
        if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.less') || id.includes('style')) {
          transformed = transformed.replace(cssConditionalPattern, (_match, type, envExp, content) => {
            return processCondition(type, envExp, content, platform, isTest as boolean)
          })
        }

        // 返回处理结果
        if (transformed !== code) {
          return {
            code: transformed,
            map: null // 可选生成 sourcemap
          }
        }

        // 如果代码没有变化，但是在测试环境中，我们仍然返回结果
        if (isTest && (id.includes('test.') || id.endsWith('.test.ts') || id.endsWith('.test.js'))) {
          return {
            code: transformed,
            map: null
          }
        }
      } catch (error) {
        console.error(`Error processing conditional compilation in file ${id}:`, error)
        // 在出错的情况下，返回原始代码，避免阻塞构建过程
        return {
          code,
          map: null
        }
      }

      return undefined
    }
  }
}

/**
 * 处理条件表达式
 * @param type 条件类型 ifdef 或 ifndef
 * @param envExp 环境表达式
 * @param content 条件块内容
 * @param platform 当前平台
 * @param isTest 是否在测试环境中
 * @returns 处理后的内容
 */
function processCondition(type: string, envExp: string, content: string, platform: string, isTest: boolean = false): string {
  // 在测试环境中，我们可能需要特殊处理一些条件
  if (isTest) {
    // 如果是测试环境，并且条件中包含测试相关的平台，则保留内容
    if (envExp.toUpperCase().includes('TEST') || envExp.toUpperCase().includes('VITEST')) {
      return content
    }
  }

  // 处理逻辑或表达式 (||)
  if (envExp.includes('||')) {
    const orParts = envExp.split(/\s*\|\|\s*/)
    const orResult = orParts.some((part) => evaluateCondition(part.trim(), platform))
    return (type === 'ifdef' && orResult) || (type === 'ifndef' && !orResult) ? content : ''
  }

  // 处理逻辑与表达式 (&&)
  if (envExp.includes('&&')) {
    const andParts = envExp.split(/\s*&&\s*/)
    const andResult = andParts.every((part) => evaluateCondition(part.trim(), platform))
    return (type === 'ifdef' && andResult) || (type === 'ifndef' && !andResult) ? content : ''
  }

  // 处理简单表达式
  const isMatch = evaluateCondition(envExp, platform)
  const shouldKeep = (type === 'ifdef' && isMatch) || (type === 'ifndef' && !isMatch)

  return shouldKeep ? content : ''
}

/**
 * 评估单个条件
 * @param condition 条件表达式
 * @param platform 当前平台
 * @returns 条件是否匹配
 */
function evaluateCondition(condition: string, platform: string): boolean {
  // 处理空条件
  if (!condition.trim()) {
    return false
  }

  const isNegate = condition.startsWith('!')
  const targetEnv = isNegate ? condition.slice(1).trim() : condition.trim()

  // 平台名称可能是大写或小写，需要进行不区分大小写的比较
  const currentPlatform = platform.toUpperCase()
  const targetPlatform = targetEnv.toUpperCase()

  // 检查平台是否匹配
  // 支持完全匹配和部分匹配
  let matched = false

  // 完全匹配
  if (targetPlatform === currentPlatform) {
    matched = true
  }

  // 特殊处理：如果条件是 MP-WEIXIN，而平台是 WEIXIN，也应该匹配
  // 或者条件是 WEIXIN，而平台是 MP-WEIXIN，也应该匹配
  if (targetPlatform.includes(currentPlatform) || currentPlatform.includes(targetPlatform)) {
    matched = true
  }

  // 如果是否定条件，则取反
  return isNegate ? !matched : matched
}
