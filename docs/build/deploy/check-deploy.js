const stopDeploy = (reason) => {
  process.stdout.write(reason + '\n')
  process.exit(0)
}
/** ******在此区间进行部署条件校验，不通过时调用stopDeploy停止部署************************/

// 当前的git tag 版本
const version = process.env.RELEASE_NAME
if (!version) {
  stopDeploy('Can\'t find version to deploy, and stop to deploy !')
}

if (version !== `v${require('../../package.json').version}`) {
  stopDeploy('The deploy version isn\'t same as package.json')
}

if (!process.env.RELEASE_NOTE) {
  stopDeploy('Can\'t find the version\'s release notes of changelog.md')
}

/** ******在此区间进行部署条件校验，不通过时调用stopDeploy停止部署************************/

process.stdout.write(true + '\n')