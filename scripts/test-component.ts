#!/usr/bin/env node

/**
 * 组件测试脚本 (仅 H5 平台)
 * 用法：
 * - 测试单个组件：pnpm test:component wd-button
 * - 测试多个组件：pnpm test:component wd-button wd-input
 * - 生成覆盖率报告：pnpm test:component wd-button --coverage
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// 定义类型
type TestOptions = {
  components: string[]
  coverage: boolean
}

/**
 * 解析命令行参数
 * @returns 解析后的测试选项
 */
function parseArgs(): TestOptions {
  const args = process.argv.slice(2)
  const components: string[] = []
  let coverage = false

  // 解析参数
  args.forEach((arg) => {
    if (arg === '--coverage') {
      coverage = true
    } else {
      components.push(arg)
    }
  })

  return { components, coverage }
}

/**
 * 显示帮助信息
 */
function showHelp(): void {
  console.log(`
组件测试脚本 (仅 H5 平台)
用法：
  - 测试单个组件：pnpm test:component wd-button
  - 测试多个组件：pnpm test:component wd-button wd-input
  - 生成覆盖率报告：pnpm test:component wd-button --coverage
  `)
}

/**
 * 检查组件测试文件是否存在
 * @param components 组件列表
 * @returns 是否所有组件测试文件都存在
 */
function checkTestFilesExist(components: string[]): boolean {
  for (const component of components) {
    const testFile = path.join(__dirname, '..', 'tests', 'components', `${component}.test.ts`)
    if (!fs.existsSync(testFile)) {
      console.error(`错误：找不到组件 ${component} 的测试文件：${testFile}`)
      return false
    }
  }
  return true
}

/**
 * 运行组件测试
 * @param options 测试选项
 */
function runComponentTests(options: TestOptions): void {
  const { components, coverage } = options

  // 构建测试命令
  const testFiles = components.map((component) => `tests/components/${component}.test.ts`).join(' ')
  const coverageFlag = coverage ? '--coverage' : ''
  const command = `cross-env UNI_PLATFORM=h5 COMPONENT_TEST=true vitest run ${testFiles} ${coverageFlag}`

  console.log(`正在运行测试 (H5 平台)：${command}`)

  try {
    // 执行测试命令
    execSync(command, { stdio: 'inherit' })
    console.log('测试完成！')
  } catch (error) {
    if (error instanceof Error) {
      console.error('测试失败！', error.message)
    } else {
      console.error('测试失败！', error)
    }
    process.exit(1)
  }
}

/**
 * 主函数
 */
function main(): void {
  const options = parseArgs()

  // 如果没有指定组件，显示帮助信息
  if (options.components.length === 0) {
    showHelp()
    process.exit(0)
  }

  // 检查组件测试文件是否存在
  if (!checkTestFilesExist(options.components)) {
    process.exit(1)
  }

  // 运行组件测试
  runComponentTests(options)
}

// 执行主函数
main()
