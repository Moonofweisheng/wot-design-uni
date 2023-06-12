Page({
  data: {
    tags: [
      {
        plain: true,
        closable: true,
        type: 'primary',
        value: '标签一'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        value: '标签二'
      },
      {
        plain: true,
        closable: true,
        type: 'primary',
        value: '标签三'
      }
    ],
    dynamicTags: ['标签一', '标签二']
  },
  handleClick ({ currentTarget: { dataset: { index } } }) {
    console.log('click:index' + index)
  },
  handleClose ({ currentTarget: { dataset: { index: order } } }) {
    this.setData({
      tags: this.data.tags.filter((value, index) => index !== order)
    })
    console.log('close:index' + order)
  },
  handleClose1 ({ currentTarget: { dataset: { index: order } } }) {
    this.setData({
      dynamicTags: this.data.dynamicTags.filter((item, index) => {
        return index !== order
      })
    })
  },
  handleConfirm (event) {
    const { value } = event.detail

    if (!value) return

    this.setData({
      dynamicTags: [...this.data.dynamicTags, value]
    })
  }
})