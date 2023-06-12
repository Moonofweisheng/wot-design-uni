import Toast from '../../wot-design/toast/toast.js'

Page({
  showToast () {
    Toast('提示信息')
  },
  showSuccessToast () {
    Toast.success('操作成功')
  },
  showErrorToast () {
    Toast.error('错误提示错误提示')
  },
  showWarnToast () {
    Toast.warning('提示信息')
  },
  showNormalToast () {
    Toast.info('常规提示常规提示')
  },
  showTopToast () {
    Toast({
      position: 'top',
      msg: '提示信息'
    })
  },
  showBottomToast () {
    Toast({
      position: 'bottom',
      msg: '提示信息'
    })
  },
  showLoadingToast () {
    Toast.loading('3s后调用close关闭')
    setTimeout(() => {
      Toast.close()
    }, 3000)
  },
  showLoadingToast2 () {
    Toast.loading({
      msg: '3s后调用close关闭',
      loadingType: 'ring',
      loadingColor: '#fff'
    })
    setTimeout(() => {
      Toast.close()
    }, 3000)
  },
  showLongToast () {
    Toast('这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文案')
  }
})