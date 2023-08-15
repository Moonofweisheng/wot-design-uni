<template>
  <page-wraper>
    <wd-message-box></wd-message-box>
    <wd-toast id="wd-toast"></wd-toast>
    <demo-block title="基本用法">
      <wd-upload :file-list="fileList1" :action="action" @change="handleChange1"></wd-upload>
    </demo-block>
    <demo-block title="多选上传">
      <wd-upload :file-list="fileList2" multiple :action="action" @change="handleChange2"></wd-upload>
    </demo-block>
    <demo-block title="最大上传数限制">
      <wd-upload :file-list="fileList3" :limit="3" :action="action" @change="handleChange3"></wd-upload>
    </demo-block>
    <demo-block title="拦截预览图片操作">
      <wd-upload :file-list="fileList4" :action="action" @change="handleChange4" :before-preview="beforePreview"></wd-upload>
    </demo-block>
    <demo-block title="上传前置处理">
      <wd-upload :file-list="fileList5" :action="action" @change="handleChange5" :before-upload="beforeUpload"></wd-upload>
    </demo-block>
    <demo-block title="移除图片前置处理">
      <wd-upload :file-list="fileList6" :action="action" @change="handleChange6" :before-remove="beforeRemove"></wd-upload>
    </demo-block>
    <demo-block title="上传状态钩子">
      <wd-upload
        :file-list="fileList7"
        :action="action"
        @change="handleChange7"
        @success="handleSuccess"
        @fail="handleFail"
        @progress="handleProgess"
      ></wd-upload>
    </demo-block>
    <demo-block title="禁用">
      <wd-upload :file-list="fileList8" disabled :action="action" @change="handleChange8"></wd-upload>
    </demo-block>
    <demo-block title="自定义唤起上传样式">
      <wd-upload :file-list="fileList9" :action="action" @change="handleChange9" use-default-slot>
        <wd-button>自定义唤起样式</wd-button>
      </wd-upload>
    </demo-block>
    <demo-block title="选择文件前置处理">
      <wd-upload :file-list="fileList10" :action="action" @change="handleChange10" :before-choose="beforeChoose"></wd-upload>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

const action: string = 'https://ftf.jd.com/api/uploadImg'
const fileList1 = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])
const fileList2 = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])
const fileList3 = ref<Record<string, any>[]>([])
const fileList4 = ref<Record<string, any>[]>([])
const fileList5 = ref<Record<string, any>[]>([])
const fileList6 = ref<Record<string, any>[]>([])
const fileList7 = ref<Record<string, any>[]>([])
const fileList8 = ref<Record<string, any>[]>([])
const fileList9 = ref<Record<string, any>[]>([])
const fileList10 = ref<Record<string, any>[]>([])
const fileList11 = ref<Record<string, any>[]>([])

const messageBox = useMessage()
const toast = useToast()

const beforeChoose = (file, resolve) => {
  messageBox
    .confirm({
      msg: '是否选择',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消选择操作')
    })
}

const beforePreview = ({ file, resolve }) => {
  messageBox
    .confirm({
      msg: '是否预览图片',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消预览操作')
    })
}
const beforeUpload = ({ file, resolve }) => {
  messageBox
    .confirm({
      msg: '是否上传',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消上传操作')
    })
}
const beforeRemove = ({ file, fileList, resolve }) => {
  messageBox
    .confirm({
      msg: '是否删除',
      title: '提示'
    })
    .then(() => {
      toast.success('删除成功')
      resolve(true)
    })
    .catch(() => {
      toast.show('取消删除操作')
    })
}

function handleSuccess(event) {
  console.log('成功', event.detail)
}
function handleFail(event) {
  console.log('失败')
}
function handleProgess(event) {
  console.log('加载中')
}
function handleChange1({ fileList }) {
  fileList1.value = fileList
}
function handleChange2({ fileList }) {
  fileList2.value = fileList
}
function handleChange3({ fileList }) {
  fileList3.value = fileList
}
function handleChange4({ fileList }) {
  fileList4.value = fileList
}
function handleChange5({ fileList }) {
  fileList5.value = fileList
}
function handleChange6({ fileList }) {
  fileList6.value = fileList
}
function handleChange7({ fileList }) {
  fileList7.value = fileList
}
function handleChange8({ fileList }) {
  fileList8.value = fileList
}
function handleChange9({ fileList }) {
  fileList9.value = fileList
}
function handleChange10({ fileList }) {
  fileList10.value = fileList
}
function handleChange11({ fileList }) {
  fileList11.value = fileList
}
</script>
<style lang="scss" scoped></style>
