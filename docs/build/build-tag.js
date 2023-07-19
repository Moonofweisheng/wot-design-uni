const { exec } = require('child_process')
const chalk = require('chalk')
const packageConfig = require('../../package.json')

const tagBuildCmd = `git tag -a v${packageConfig.version} -m 'version ${packageConfig.version}'`
const tagPushCmd = `git push origin v${packageConfig.version}`

console.log(chalk.cyan(`> 开始创建标签v${packageConfig.version}...`))
exec(tagBuildCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(chalk.red(`标签创建错误：${error}`))
    return
  }
  console.log(chalk.green('-- 标签创建成功！'))
  console.log(chalk.cyan('> 将标签推送到远程服务器...'))
  exec(tagPushCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`标签推送错误：${error}`))
      return
    }
    console.log(chalk.green('-- 标签推送成功！'))
  })
})
