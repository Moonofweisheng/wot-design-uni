<template>
  <page-wraper>
    <view class="page">
      <view class="page__hd">
        <view class="page__title">
          <view class="logo"></view>
          <view class="inline">
            Wot Design Uni
            <text class="version">@{{ packageConfig.version }}</text>
          </view>
        </view>
        <view class="page__desc">Wot Design Uni 是一个基于Vue3+TS开发的uni-app组件库，提供70+高质量组件，支持暗黑模式、国际化和自定义主题。</view>
      </view>
      <view class="page__bd">
        <block v-for="(item, index) in list" :key="index">
          <view class="kind-list__item">
            <view :id="item.id" class="wd-flex kind-list__item-hd" @click="kindToggle(item.id)">
              <view class="wd-flex__item title">{{ item.name }}</view>
              <image class="kind-list__img" :src="item.icon"></image>
            </view>
            <view :class="['kind-list__item-bd', item.open ? 'kind-list__item-bd_show' : '']">
              <view :class="['wd-cells', item.open ? 'wd-cells_show' : '']">
                <wd-cell
                  v-for="(page, j) in item.pages"
                  :key="j"
                  is-link
                  :label="page.name"
                  @click="handleClick(`/pages/${page.id}/Index`)"
                ></wd-cell>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import packageConfig from '../../../package.json'

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

const list = ref([
  {
    id: 'widget',
    name: '基础',
    open: false,
    icon: imgModules['../images/icon_nav_widget.png'].default,
    pages: [
      {
        id: 'button',
        name: 'Button 按钮'
      },
      {
        id: 'icon',
        name: 'Icon 图标'
      },
      {
        id: 'layout',
        name: 'Layout 布局'
      },
      {
        id: 'configProvider',
        name: 'ConfigProvider 全局配置'
      },
      {
        id: 'popup',
        name: 'Popup 弹出层'
      },
      {
        id: 'resize',
        name: 'Resize 监听元素尺寸变化'
      },
      {
        id: 'transition',
        name: 'Transition 动画'
      },
      {
        id: 'fab',
        name: 'Fab 悬浮按钮'
      },
      {
        id: 'text',
        name: 'Text 文本'
      }
    ]
  },
  {
    id: 'nav',
    name: '导航',
    open: false,
    icon: imgModules['../images/icon_nav_nav.png'].default,

    pages: [
      {
        id: 'pagination',
        name: 'Pagination 分页'
      },
      {
        id: 'popover',
        name: 'Popover 气泡'
      },
      {
        id: 'tabs',
        name: 'Tabs 标签页'
      },
      {
        id: 'segmented',
        name: 'Segmented 分段器'
      },
      {
        id: 'tabbar',
        name: 'Tabbar 标签栏'
      },
      {
        id: 'navbar',
        name: 'Navbar 导航栏'
      },
      {
        id: 'sidebar',
        name: 'Sidebar 侧边栏'
      },
      {
        id: 'backtop',
        name: 'Backtop 回到顶部'
      },
      {
        id: 'indexBar',
        name: 'IndexBar 索引栏'
      }
    ]
  },
  {
    id: 'form',
    name: '数据输入',
    open: false,
    icon: imgModules['../images/icon_nav_form.png'].default,
    pages: [
      {
        id: 'calendar',
        name: 'Calendar 日历选择器'
      },
      {
        id: 'calendarView',
        name: 'CalendarView 日历面板'
      },
      {
        id: 'checkbox',
        name: 'Checkbox 复选框'
      },
      {
        id: 'colPicker',
        name: 'ColPicker 多列选择器'
      },
      {
        id: 'datetimePicker',
        name: 'DatetimePicker 时间选择器'
      },
      {
        id: 'datetimePickerView',
        name: 'DatetimePickerView 时间选择器视图'
      },
      {
        id: 'input',
        name: 'Input 输入框'
      },
      {
        id: 'textarea',
        name: 'Textarea 文本域'
      },
      {
        id: 'inputNumber',
        name: 'InputNumber 计数器'
      },
      {
        id: 'picker',
        name: 'Picker 选择器'
      },
      {
        id: 'pickerView',
        name: 'PickerView 选择器视图'
      },
      {
        id: 'radio',
        name: 'Radio 单选框'
      },
      {
        id: 'rate',
        name: 'Rate 评分'
      },
      {
        id: 'search',
        name: 'Search 搜索'
      },
      {
        id: 'selectPicker',
        name: 'SelectPicker 单复选选择器'
      },
      {
        id: 'slider',
        name: 'Slider 滑块'
      },
      {
        id: 'switch',
        name: 'Switch 开关'
      },
      {
        id: 'form',
        name: 'Form 表单'
      },
      {
        id: 'upload',
        name: 'Upload 上传'
      },
      {
        id: 'passwordInput',
        name: 'PasswordInput 密码输入框'
      }
    ]
  },
  {
    id: 'feedback',
    name: '反馈',
    open: false,
    icon: imgModules['../images/icon_nav_feedback.png'].default,
    pages: [
      {
        id: 'actionSheet',
        name: 'ActionSheet 上拉菜单'
      },
      {
        id: 'dropMenu',
        name: 'DropMenu 下拉菜单'
      },
      {
        id: 'loading',
        name: 'Loading 加载指示器'
      },
      {
        id: 'messageBox',
        name: 'MessageBox 弹框'
      },
      {
        id: 'overlay',
        name: 'Overlay 遮罩层'
      },
      {
        id: 'noticeBar',
        name: 'NoticeBar 通知栏'
      },
      {
        id: 'progress',
        name: 'Progress 进度条'
      },
      {
        id: 'circle',
        name: 'Circle 环形进度条'
      },
      {
        id: 'sortButton',
        name: 'SortButton 排序按钮'
      },
      {
        id: 'statusTip',
        name: 'StatusTip 缺省提示'
      },
      {
        id: 'swipeAction',
        name: 'SwipeAction 滑动操作'
      },
      {
        id: 'toast',
        name: 'Toast 轻提示'
      },
      {
        id: 'notify',
        name: 'Notify 消息通知'
      },
      {
        id: 'tooltip',
        name: 'Tooltip 文字提示'
      },
      {
        id: 'countDown',
        name: 'CountDown 倒计时'
      },
      {
        id: 'statistic',
        name: 'Statistic 数值显示'
      },
      {
        id: 'numberKeyboard',
        name: 'NumberKeyboard 数字键盘'
      }
    ]
  },
  {
    id: 'show',
    name: '数据展示',
    open: false,
    icon: imgModules['../images/icon_nav_show.png'].default,
    pages: [
      {
        id: 'badge',
        name: 'Badge 徽标'
      },
      {
        id: 'card',
        name: 'Card 卡片'
      },
      {
        id: 'cell',
        name: 'Cell 单元格'
      },
      {
        id: 'collapse',
        name: 'Collapse 折叠面板'
      },
      {
        id: 'curtain',
        name: 'Curtain 幕帘'
      },
      {
        id: 'divider',
        name: 'Divider 分割线'
      },
      {
        id: 'gap',
        name: 'Gap 间隔槽'
      },
      {
        id: 'img',
        name: 'Img 图片'
      },
      {
        id: 'imgCropper',
        name: 'imgCropper 图片裁剪'
      },
      {
        id: 'grid',
        name: 'Grid 宫格'
      },
      {
        id: 'loadmore',
        name: 'Loadmore 加载更多'
      },
      {
        id: 'skeleton',
        name: 'Skeleton 骨架屏'
      },
      {
        id: 'steps',
        name: 'Steps 步骤条'
      },
      {
        id: 'sticky',
        name: 'Sticky 吸顶布局'
      },
      {
        id: 'tag',
        name: 'Tag 标签'
      },
      {
        id: 'watermark',
        name: 'Watermark 水印'
      },
      {
        id: 'swiper',
        name: 'Swiper 轮播图'
      },
      {
        id: 'table',
        name: 'Table 表格'
      }
    ]
  }
])

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

function kindToggle(id: string) {
  const listValue = list.value
  for (let i = 0, len = listValue.length; i < len; ++i) {
    if (listValue[i].id === id) {
      listValue[i].open = !listValue[i].open
      break
    }
  }
  list.value = listValue
}
</script>

<style lang="scss" scoped>
.wot-theme-dark {
  .page__hd,
  .kind-list__item {
    background: $-dark-background2;
  }
  .title {
    color: $-dark-color;
  }
  :deep(.wd-cell__label) {
    color: $-dark-color3 !important;
  }
  .kind-list__img {
    filter: invert(100%);
  }
}
.page__hd {
  padding: 40px 40px 30px;
  margin-bottom: 30px;
  background: #fff;
}
.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: #0083ff;
}
.page__desc {
  margin-top: 20px;
  color: #999;
  text-align: left;
  font-size: 12px;
}
.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
}
.logo {
  display: inline-block;
  margin-right: 14px;
  width: 40px;
  height: 40px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAAFPCAYAAADNzUzyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFIGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDEtMDNUMTg6MjI6MzgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAxLTAzVDE4OjIzOjMzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAxLTAzVDE4OjIzOjMzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxMWQ3NjM4LTcy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')
    no-repeat;
  background-size: cover;
  vertical-align: middle;
}
.inline {
  display: inline-block;
  vertical-align: middle;
}
.version {
  font-size: 14px;
}

.wd-cell_access {
  padding: 15px 20px;
}
.wd-cell__ft {
  padding-right: 16px;
  position: relative;
}
.wd-cells {
  position: relative;
  margin-top: 0;
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s;
  :deep(.wd-cell__label) {
    color: rgba(0, 0, 0, 0.65);
  }
}
.wd-cells_show {
  opacity: 1;
  transform: translateY(0);
}

.kind-list__item {
  border-radius: 30px;
  background: #fff;
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.kind-list__img {
  width: 20px;
  height: 20px;
}

.kind-list__item-hd {
  padding: 15px 30px;
  transition: opacity 0.3s;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}
.kind-list__item-bd_show {
  height: auto;
}

.wd-flex {
  display: flex;
}
.wd-flex__item {
  flex: 1;
}
.title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}
.page-name {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}

.wd-tool-right-line-angle::after {
  content: ' ';
  display: inline-block;
  height: 8px;
  width: 8px;
  border-width: 2px 2px 0 0;
  border-color: #b2b2b2;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0;
}
</style>
