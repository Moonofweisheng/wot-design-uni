import MessageBox from '../../wot-design/messageBox/messageBox'
import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    action: 'https://ftf.jd.com/api/uploadImg',
    fileList1: [{
      url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
    }],
    fileList2: [{
      url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
    }],
    fileList3: [],
    fileList4: [],
    fileList5: [],
    fileList6: [],
    fileList7: [],
    fileList8: [],
    fileList9: [],
    fileList10: [],
    beforeChoose (file, resolve) {
      MessageBox.confirm({
        msg: '是否选择',
        title: '提示'
      }).then(() => {
        resolve(true)
      }).catch(() => {
        Toast('取消选择操作')
      })
    },
    beforePreview ({ file, resolve }) {
      MessageBox.confirm({
        msg: '是否预览图片',
        title: '提示'
      }).then(() => {
        resolve(true)
      }).catch(() => {
        Toast('取消预览操作')
      })
    },
    beforeUpload ({ file, resolve }) {
      MessageBox.confirm({
        msg: '是否上传',
        title: '提示'
      }).then(() => {
        resolve(true)
      }).catch(() => {
        Toast('取消上传操作')
      })
    },
    beforeRemove ({ file, fileList, resolve }) {
      MessageBox.confirm({
        msg: '是否删除',
        title: '提示'
      }).then(() => {
        Toast.success('删除成功')
        resolve(true)
      }).catch(() => {
        Toast('取消删除操作')
      })
    }
  },
  handleSuccess (event) {
    console.log('成功', event.detail)
  },
  handleFail (event) {
    console.log('失败')
  },
  handleProgess (event) {
    console.log('加载中')
  },
  handleChange1 (event) {
    this.setData({
      fileList1: event.detail.fileList
    })
  },
  handleChange2 (event) {
    this.setData({
      fileList2: event.detail.fileList
    })
  },
  handleChange3 (event) {
    this.setData({
      fileList3: event.detail.fileList
    })
  },
  handleChange4 (event) {
    this.setData({
      fileList4: event.detail.fileList
    })
  },
  handleChange5 (event) {
    this.setData({
      fileList5: event.detail.fileList
    })
  },
  handleChange6 (event) {
    this.setData({
      fileList6: event.detail.fileList
    })
  },
  handleChange7 (event) {
    this.setData({
      fileList7: event.detail.fileList
    })
  },
  handleChange8 (event) {
    this.setData({
      fileList8: event.detail.fileList
    })
  },
  handleChange9 (event) {
    this.setData({
      fileList9: event.detail.fileList
    })
  },
  handleChange10 (event) {
    this.setData({
      fileList10: event.detail.fileList
    })
  },
  handleChange11 (event) {
    this.setData({
      fileList11: event.detail.fileList
    })
  }
})