Page({
  data: {
    list: [
      {
        id: 'widget',
        name: '基础',
        open: false,
        pages: [
          {
            id: 'button',
            name: 'Button 按钮'
          }, {
            id: 'icon',
            name: 'Icon 图标'
          }, {
            id: 'layout',
            name: 'Layout 布局'
          }, {
            id: 'popup',
            name: 'Popup 弹出层'
          }, {
            id: 'resize',
            name: 'Resize 监听元素尺寸变化'
          }, {
            id: 'transition',
            name: 'Transition 动画'
          }
        ]
      }, {
        id: 'nav',
        name: '导航',
        open: false,
        pages: [
          {
            id: 'pagination',
            name: 'Pagination 分页'
          }, {
            id: 'popover',
            name: 'Popover 气泡'
          }, {
            id: 'tabs',
            name: 'Tabs 标签页'
          }
        ]
      }, {
        id: 'form',
        name: '数据输入',
        open: false,
        pages: [
          {
            id: 'calendar',
            name: 'Calendar 日历选择器'
          },
          {
            id: 'calendarView',
            name: 'CalendarView 日历面板'
          }, {
            id: 'checkbox',
            name: 'Checkbox 复选框'
          }, {
            id: 'colPicker',
            name: 'ColPicker 多列选择器'
          }, {
            id: 'datetimePicker',
            name: 'DatetimePicker 时间选择器'
          }, {
            id: 'datetimePickerView',
            name: 'DatetimePickerView 时间选择器视图'
          }, {
            id: 'input',
            name: 'Input 输入框'
          }, {
            id: 'inputNumber',
            name: 'InputNumber 计数器'
          }, {
            id: 'picker',
            name: 'Picker 选择器'
          }, {
            id: 'pickerView',
            name: 'PickerView 选择器视图'
          }, {
            id: 'radio',
            name: 'Radio 单选框'
          }, {
            id: 'rate',
            name: 'Rate 评分'
          }, {
            id: 'search',
            name: 'Search 搜索'
          }, {
            id: 'selectPicker',
            name: 'SelectPicker 单复选选择器'
          }, {
            id: 'slider',
            name: 'Slider 滑块'
          }, {
            id: 'switch',
            name: 'Switch 开关'
          }, {
            id: 'form',
            name: 'Form 表单组件组合'
          }, {
            id: 'upload',
            name: 'Upload 上传'
          }
        ]
      }, {
        id: 'feedback',
        name: '反馈',
        open: false,
        pages: [
          {
            id: 'actionSheet',
            name: 'ActionSheet 上拉菜单'
          }, {
            id: 'dropMenu',
            name: 'DropMenu 下拉菜单'
          }, {
            id: 'loading',
            name: 'Loading 加载指示器'
          }, {
            id: 'messageBox',
            name: 'MessageBox 弹框'
          }, {
            id: 'noticeBar',
            name: 'NoticeBar 通知栏'
          }, {
            id: 'progress',
            name: 'Progress 进度条'
          }, {
            id: 'sortButton',
            name: 'SortButton 排序按钮'
          }, {
            id: 'statusTip',
            name: 'StatusTip 缺省提示'
          }, {
            id: 'swipeAction',
            name: 'SwipeAction 滑动操作'
          }, {
            id: 'toast',
            name: 'Toast 轻提示'
          }, {
            id: 'tooltip',
            name: 'Tooltip 文字提示'
          }
        ]
      }, {
        id: 'show',
        name: '数据展示',
        open: false,
        pages: [
          {
            id: 'badge',
            name: 'Badge 徽标'
          }, {
            id: 'card',
            name: 'Card 卡片'
          }, {
            id: 'cell',
            name: 'Cell 单元格'
          }, {
            id: 'collapse',
            name: 'Collapse 折叠面板'
          }, {
            id: 'curtain',
            name: 'Curtain 幕帘'
          }, {
            id: 'divider',
            name: 'Divider 分割线'
          }, {
            id: 'img',
            name: 'Img 图片'
          }, {
            id: 'imgCropper',
            name: 'imgCropper 图片裁剪'
          }, {
            id: 'grid',
            name: 'Grid 宫格'
          }, {
            id: 'loadmore',
            name: 'Loadmore 加载更多'
          }, {
            id: 'steps',
            name: 'Steps 步骤条'
          }, {
            id: 'sticky',
            name: 'Sticky 吸顶布局'
          }, {
            id: 'tag',
            name: 'Tag 标签'
          }
        ]
      }
    ]
  },
  kindToggle: function (e) {
    const { id } = e.currentTarget
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
        break
      }
    }
    this.setData({
      list: list
    })
  }
})