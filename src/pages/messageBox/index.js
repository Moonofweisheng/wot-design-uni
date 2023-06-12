import MessageBox from '../../wot-design/messageBox/messageBox'
import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    value: 1,
    value1: ''
  },
  changeValue ({ detail }) {
    this.setData({ value: detail })
  },
  alert () {
    MessageBox.alert('操作成功')
  },
  alertWithTitle () {
    MessageBox.alert({
      msg: '提示文案',
      title: '标题'
    })
  },
  confirm () {
    MessageBox.confirm({
      msg: '是否删除',
      title: '提示'
    })
  },
  prompt () {
    MessageBox.prompt({
      title: '请输入邮箱',
      inputValue: this.data.value1,
      inputPattern: /.+@.+\..+/i
    }).then(({ value }) => {
      this.setData({
        value1: value
      })
      Toast('当前值' + this.data.value1)
    }).catch(e => {
      Toast.error(e)
    })
  },
  alertWithLongChar () {
    MessageBox.alert({
      msg: '以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文字是示意以上文',
      title: '标题'
    })
  },
  withSlot () {
    MessageBox({
      title: '评分',
      selector: '#wd-message-box-slot'
    })
  }
})