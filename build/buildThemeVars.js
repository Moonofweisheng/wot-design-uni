const fs = require('fs')
const path = require('path')

const extractSCSSVariables = (scssFilePath) => {
  const scssContent = fs.readFileSync(scssFilePath, 'utf8')
  const variableRegex = /\/\*\s*([a-zA-Z0-9-]+)\s*\*\/([\s\S]*?)(?=\/\*\s*([a-zA-Z0-9-]+)\s*\*\/|$)/g

  const variables = {}

  let match
  while ((match = variableRegex.exec(scssContent)) !== null) {
    const keyComment = match[1].replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
    const value = match[2].trim()

    variables[keyComment] = value
  }
  console.log(variables)
  return variables
}

// const generateTSFileContent = (variables) => {
//   let tsContent = ''

//   for (const key in variables) {
//     tsContent += `export type ${key}ThemeVars = {\n`
//     tsContent += variables[key]
//       .split('\n')
//       .map((line) => {
//         line = line.trim()
//         if (line.split(':').length === 2) {
//           const lines = line.split(':')
//           lines[0] = lines[0].replace(/^\$-/, '').replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
//           line = `${lines[0]}?:string`
//         }
//         return `  ${line.trim()}\n`
//       })
//       .join('')
//     tsContent += '};\n\n'
//   }
//   return tsContent
// }

const generateTSFileContent = (variables) => {
  let tsContent = ''

  for (const key in variables) {
    tsContent += `export type ${key}ThemeVars = {\n`
    tsContent += variables[key]
      .split('\n')
      .map((line) => {
        line = line.trim()
        if (line.split(':').length === 2) {
          const lines = line.split(':')
          lines[0] = lines[0].replace(/^\$-/, '').replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
          line = `${lines[0]}?:string`
        }
        return `  ${line.trim()}\n`
      })
      .join('')
    tsContent += '};\n\n'
  }

  // Add logic to export all types as ConfigProviderThemeVars
  const exportTypes = Object.keys(variables)
    .map((key) => `${key}ThemeVars`)
    .join(' & ')
  tsContent += `export type ConfigProviderThemeVars = ${exportTypes};\n`

  return tsContent
}

const tsFilePath = path.resolve(__dirname, '../src/uni_modules/wot-design-uni/components/wd-config-provider/type.ts')
const scssFilePath = path.resolve(__dirname, '../src/uni_modules/wot-design-uni/components/common/abstracts/test.scss')

const variables = extractSCSSVariables(scssFilePath)
const tsContent = generateTSFileContent(variables)

fs.writeFileSync(tsFilePath, tsContent)

console.log('TS file generated successfully!')
