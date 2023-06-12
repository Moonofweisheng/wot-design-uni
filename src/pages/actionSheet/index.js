import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    show: false,
    actions: '',
    panels: '',
    cancelText: '',
    show1: false,
    show2: false,
    show3: false,
    show4: false

  },
  showActions1 () {
    this.setData({
      show: true,
      actions: [
        {
          name: '选项1'
        }, {
          name: '选项2'
        }, {
          name: '选项3',
          subname: '描述信息'
        }
      ]
    })
  },
  showActions2 () {
    this.setData({
      show: true,
      actions: [
        {
          name: '颜色',
          color: '#0083ff'
        }, {
          name: '禁用',
          disabled: true
        }, {
          loading: true
        }
      ]
    })
  },
  showActions3 () {
    this.setData({
      show1: true,
      actions: [
        {
          name: '选项1'
        }, {
          name: '选项2'
        }, {
          name: '选项3',
          subname: '描述信息'
        }
      ]
    })
  },
  showActions4 () {
    this.setData({
      show2: true,
      panels: [
        {
          iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
          title: '微信好友'
        },
        {
          iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
          title: '微信朋友圈'
        },
        {
          iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
          title: 'QQ好友'
        },
        {
          iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
          title: '微信收藏'
        },
        {
          iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
          title: '微信朋友圈'
        },
        {
          iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
          title: 'QQ好友'
        }
      ]
    })
  },
  showActions5 () {
    this.setData({
      show3: true,
      panels: [
        [
          {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            title: 'QQ好友'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            title: '微信收藏'
          },
          {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          },
          {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/111572/11/11734/1245/5f0692a1E39d13d21/b35dfe9243bd6c2a.png',
            title: '微信朋友圈'
          }
        ],
        [
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/132639/25/4003/945/5f069336E18778248/fa181913030bed8a.png',
            title: 'QQ好友'
          },
          {
            iconUrl: 'https://img14.360buyimg.com/imagetools/jfs/t1/134807/4/3950/1256/5f069336E76949e27/d20641da8e699f07.png',
            title: '微信收藏'
          },
          {
            iconUrl: 'https://img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
            title: '微信好友'
          }
        ]
      ]
    })
  },
  showActions6 () {
    this.setData({
      show4: true
    })
  },
  close () {
    this.setData({
      show: false
    })
  },
  close1 () {
    this.setData({
      show1: false
    })
  },
  close2 () {
    this.setData({
      show2: false
    })
  },
  close3 () {
    this.setData({
      show3: false
    })
  },
  close4 () {
    this.setData({
      show4: false
    })
  },
  select ({ detail: { item, index } }) {
    Toast(`当前选中项: ${item.title}, 下标: ${index}`, 1)
  },
  select1 ({ detail: { item, rowIndex, colIndex } }) {
    Toast(`当前选中项: ${item.title}, 行下标: ${rowIndex}, 列下标: ${colIndex}`)
  }
})