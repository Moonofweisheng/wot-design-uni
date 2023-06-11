/*
 * @Author: weisheng
 * @Date: 2022-01-28 14:23:02
 * @LastEditTime: 2023-03-21 20:59:16
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\build\deploy.js
 * 记得注释
 */

const OSS = require('ali-oss')
const fs = require('fs')

const client = new OSS({
  region: 'oss-cn-hongkong',
  accessKeyId: 'LTAI5tJ6okg3xgdy4VfCjmzs',
  accessKeySecret: '8Hk0Af1CQufErdjrnTI2o5BQmbhY41',
  bucket: 'historysoa'
})

async function putOss(ossPath, filePath) {
  try {
    const result = await client.multipartUpload(ossPath, filePath)
    console.log(`上传远程oss文件:${filePath}成功！`)
  } catch (e) {
    console.log(`上传异常：${e}`)
  }
}

/**
 * 上传前删除所有的文件
 */
async function deleteAll(object) {
  const result = await client.list({
    prefix: `${object}`
  })
  result.objects.forEach((item) => {
    client.delete(item.name)
    console.log(`删除远程oss文件:${item.name}成功！`)
  })
}

/**
 * 获取指定文件夹下的文件
 * @param {string} local 文件夹路径
 */
async function addFile(local, objectName, srcName) {
  const localFiles = fs.readdirSync(local)
  localFiles.forEach(async (localFile) => {
    // 拼接文件夹子项的路径
    const filePath = `${local}/${localFile}`
    // 获取子项文件信息
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      console.log(srcName, 'srcName')
      const ossPath = filePath.split(`${srcName ? srcName : local}`).join(`${objectName}`)
      // 上传到oss
      await putOss(ossPath, filePath)
    } else {
      addFile(filePath, objectName, srcName ? srcName : local)
    }
  })
}

async function upload() {
  await deleteAll('fant-mini-plus')
  await addFile('fant-doc/dist', 'fant-mini-plus')
  await deleteAll('fant-demo')
  await addFile('dist/build/h5', 'fant-demo')
}

upload()
