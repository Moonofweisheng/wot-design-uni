#!/usr/bin/env node

/**
 * 本地测试组件测试工作流 (仅 H5 平台)
 *
 * 用法:
 * - 测试单个组件: pnpm test:workflow wd-button
 * - 测试多个组件: pnpm test:workflow wd-button wd-input
 * - 测试所有组件: pnpm test:workflow --all
 * - 跳过 lint: pnpm test:workflow wd-button --skip-lint
 * - 生成覆盖率报告: pnpm test:workflow wd-button --coverage
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// 定义类型
type WorkflowOptions = {
  components: string[]
  skipLint: boolean
  coverage: boolean
  testAll: boolean
}

type TestResult = {
  component: string
  status: 'success' | 'failure'
  coverage?: CoverageData | null
  error?: string
}

type CoverageData = {
  lines: { total: number; covered: number; skipped: number; pct: number }
  statements: { total: number; covered: number; skipped: number; pct: number }
  functions: { total: number; covered: number; skipped: number; pct: number }
  branches: { total: number; covered: number; skipped: number; pct: number }
}

/**
 * 解析命令行参数
 * @returns 解析后的工作流选项
 */
function parseArgs(): WorkflowOptions {
  const args = process.argv.slice(2)
  const components: string[] = []
  let skipLint = false
  let coverage = false
  let testAll = false

  // 解析参数
  args.forEach((arg) => {
    if (arg === '--all') {
      testAll = true
    } else if (arg === '--skip-lint') {
      skipLint = true
    } else if (arg === '--coverage') {
      coverage = true
    } else {
      components.push(arg)
    }
  })

  return { components, skipLint, coverage, testAll }
}

/**
 * 显示帮助信息
 */
function showHelp(): void {
  console.log(`
本地测试组件测试工作流 (仅 H5 平台)

用法:
  - 测试单个组件: pnpm test:workflow wd-button
  - 测试多个组件: pnpm test:workflow wd-button wd-input
  - 测试所有组件: pnpm test:workflow --all
  - 跳过 lint: pnpm test:workflow wd-button --skip-lint
  - 生成覆盖率报告: pnpm test:workflow wd-button --coverage
  `)
}

/**
 * 获取所有组件测试文件
 * @returns 所有组件名称列表
 */
function getAllComponents(): string[] {
  const testsDir = path.join(__dirname, '..', 'tests', 'components')
  return fs
    .readdirSync(testsDir)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => file.replace('.test.ts', ''))
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
 * 运行 ESLint 检查
 * @returns 是否检查通过
 */
async function runLint(): Promise<boolean> {
  try {
    console.log('\n📝 步骤 1: 运行 ESLint 检查')
    console.log('-'.repeat(80))
    console.log('运行 ESLint 检查...')
    execSync('pnpm lint', { stdio: 'inherit' })
    console.log('✅ ESLint 检查通过')
    return true
  } catch (error) {
    console.error('❌ ESLint 检查失败')
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

/**
 * 获取覆盖率数据
 * @param component 组件名称
 * @returns 覆盖率数据
 */
function getCoverageData(component: string): CoverageData | null {
  try {
    const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-summary.json')
    if (fs.existsSync(coveragePath)) {
      const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
      return coverageData.total as CoverageData
    }
  } catch (error) {
    console.error(`无法读取 ${component} 的覆盖率数据:`, error)
  }

  return null
}

/**
 * 运行组件测试
 * @param components 组件列表
 * @param coverage 是否生成覆盖率报告
 * @returns 测试结果列表
 */
async function runComponentTests(components: string[], coverage: boolean): Promise<TestResult[]> {
  console.log('\n🧪 步骤 2: 运行组件测试 (H5 平台)')
  console.log('-'.repeat(80))

  const results: TestResult[] = []

  for (const component of components) {
    console.log(`\n测试组件: ${component}`)

    try {
      const coverageFlag = coverage ? '--coverage' : ''
      const command = `cross-env UNI_PLATFORM=h5 COMPONENT_TEST=true vitest run tests/components/${component}.test.ts ${coverageFlag}`

      console.log(`执行命令: ${command}`)
      execSync(command, { stdio: 'inherit' })

      results.push({
        component,
        status: 'success',
        coverage: coverage ? getCoverageData(component) : null
      })

      console.log(`✅ 组件 ${component} 测试通过`)
    } catch (error) {
      let errorMessage = 'Unknown error'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      results.push({
        component,
        status: 'failure',
        error: errorMessage
      })

      console.error(`❌ 组件 ${component} 测试失败`)
    }
  }

  return results
}

/**
 * 生成测试报告
 * @param results 测试结果列表
 */
function generateTestReport(results: TestResult[]): void {
  console.log('\n📊 步骤 3: 生成测试报告')
  console.log('-'.repeat(80))

  const reportDir = path.join(__dirname, '..', 'test-reports')
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true })
  }

  const reportPath = path.join(reportDir, `test-report-h5-${new Date().toISOString().replace(/:/g, '-')}.md`)

  let report = '# 组件测试报告 (H5 平台)\n\n'
  report += `## 测试时间: ${new Date().toLocaleString()}\n\n`
  report += '## 测试结果\n\n'
  report += '| 组件 | 状态 | 行覆盖率 | 语句覆盖率 | 函数覆盖率 | 分支覆盖率 |\n'
  report += '| ---- | ---- | -------- | ---------- | ---------- | ---------- |\n'

  results.forEach((result) => {
    const status = result.status === 'success' ? '✅ 通过' : '❌ 失败'

    if (result.coverage) {
      const { lines, statements, functions, branches } = result.coverage
      report += `| ${result.component} | ${status} | ${lines.pct}% | ${statements.pct}% | ${functions.pct}% | ${branches.pct}% |\n`
    } else {
      report += `| ${result.component} | ${status} | - | - | - | - |\n`
    }
  })

  fs.writeFileSync(reportPath, report)
  console.log(`测试报告已生成: ${reportPath}`)
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  try {
    const options = parseArgs()

    // 如果指定了 --all，则测试所有组件
    if (options.testAll) {
      options.components = getAllComponents()
    }

    // 如果没有指定组件且没有指定 --all，显示帮助信息
    if (options.components.length === 0 && !options.testAll) {
      showHelp()
      return
    }

    // 检查组件测试文件是否存在
    if (!checkTestFilesExist(options.components)) {
      process.exit(1)
    }

    console.log('='.repeat(80))
    console.log('🚀 开始测试工作流 - 平台: H5')
    console.log('='.repeat(80))

    const startTime = Date.now()

    // 步骤 1: 运行 ESLint 检查
    if (!options.skipLint) {
      const lintSuccess = await runLint()
      if (!lintSuccess) {
        process.exit(1)
      }
    } else {
      console.log('\n📝 步骤 1: 跳过 ESLint 检查')
    }

    // 步骤 2: 运行组件测试
    const results = await runComponentTests(options.components, options.coverage)

    // 步骤 3: 生成测试报告
    generateTestReport(results)

    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000

    console.log('\n='.repeat(80))
    console.log(`✨ 测试工作流完成 - 耗时: ${duration.toFixed(2)}s`)
    console.log('='.repeat(80))

    // 输出测试结果摘要
    const successCount = results.filter((r) => r.status === 'success').length
    const failureCount = results.filter((r) => r.status === 'failure').length

    console.log('\n📋 测试结果摘要:')
    console.log(`- 总计: ${results.length} 个组件`)
    console.log(`- 成功: ${successCount} 个组件`)
    console.log(`- 失败: ${failureCount} 个组件`)

    if (failureCount > 0) {
      console.log('\n❌ 失败的组件:')
      results
        .filter((r) => r.status === 'failure')
        .forEach((result) => {
          console.log(`- ${result.component}`)
        })

      process.exit(1)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('\n❌ 测试工作流失败:', error.message)
    } else {
      console.error('\n❌ 测试工作流失败:', error)
    }
    process.exit(1)
  }
}

// 执行主函数
main().catch((error) => {
  console.error('测试工作流失败:', error)
  process.exit(1)
})
