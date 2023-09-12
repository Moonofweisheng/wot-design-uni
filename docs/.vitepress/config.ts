/*
 * @Author: weisheng
 * @Date: 2023-07-27 10:26:09
 * @LastEditTime: 2023-09-12 19:10:02
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\config.ts
 * 记得注释
 */
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: `Wot Design Uni`,
  description: '一个参照Wot-design打造的uni-app组件库',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?18377b8bd73d88647503887f67ccf27f";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `]
  ],
  themeConfig: {
    logo: '/wot-design.png',
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/Moonofweisheng/wot-design-uni/edit/master/docs/:path',
      text: '为此页提供修改建议',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Moonofweisheng/wot-design-uni' },
      { icon: { svg: '<svg t="1692699544299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#6D6D72" p-id="4185"></path></svg>' }, link: "https://gitee.com/fant-mini/wot-design-uni", ariaLabel: 'Gitee' }
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'A74X2RFXSU',
        apiKey: '6961856d63f5181bf71cb4fa3e4398d2',
        indexName: 'wot-design-uni2',
      },
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2023-present weisheng',
    },
    nav: [
      {
        text: '指南', activeMatch: '/guide/', items: [
          {
            text: '介绍',
            link: '/guide/introduction',
          },
          {
            text: '快速上手',
            link: '/guide/quick-use',
          },
          {
            text: '定制主题',
            link: '/guide/custom-theme',
          },
          {
            text: '字体',
            link: '/guide/typography',
          },
          {
            text: '更新日志',
            link: '/guide/changelog',
          },
          {
            text: '常见问题',
            link: '/guide/common-problems',
          }
        ]
      },
      {
        text: '组件', activeMatch: '/component/', items: [
          {
            text: '基础组件',
            link: "/component/button",
          },
          {
            text: "导航组件",
            link: "/component/pagination"
          }, {
            text: "数据输入",
            link: "/component/calendar",
          }, {
            text: "反馈组件",
            link: "/component/action-sheet",
          }, {
            text: "数据展示",
            link: "/component/badge",
          }

        ]
      },
      { text: '捐赠作者', link: '/reward/reward', activeMatch: '/reward/' },

      {
        text: '相关链接',
        items: [
          { text: 'uni-mini-router', link: 'https://gitee.com/fant-mini/uni-mini-router' },
          { text: 'uni-mini-ci', link: 'https://gitee.com/fant-mini/uni-mini-ci' },
          { text: 'fant-mini-plus', link: 'https://fant-mini-plus.top/fant-mini-plus/' },
          { text: 'wot-design', link: 'https://ftf.jd.com/wot-design/' },
          { text: 'wot-design-mini', link: 'https://ftf.jd.com/wot-design-mini/' }
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/introduction',
        },
        {
          text: '快速上手',
          link: '/guide/quick-use',
        },
        {
          text: '定制主题',
          link: '/guide/custom-theme',
        },
        {
          text: '字体',
          link: '/guide/typography',
        },
        {
          text: '更新日志',
          link: '/guide/changelog',
        },
        {
          text: '常见问题',
          link: '/guide/common-problems',
        }
      ],
      '/reward/': [
        {
          text: '捐赠作者',
          link: '/reward/reward',
        },
        {
          text: '榜上有名',
          link: '/reward/donor',
        },
      ],
    
      '/component/': [
        {
          text: '基础',
          items: [
            {
              link: "/component/button",
              text: "Button 按钮"
            }, {
              link: "/component/icon",
              text: "Icon 图标"
            }, {
              link: "/component/layout",
              text: "Layout 布局"
            }, {
              link: "/component/config-provider",
              text: "ConfigProvider 全局配置"
            }, {
              link: "/component/popup",
              text: "Popup 弹出层"
            }, {
              link: "/component/resize",
              text: "Resize 监听元素尺寸变化"
            }, {
              link: "/component/transition",
              text: "Transition 动画"
            }
          ]
        },
        {
    
          text: "导航",
          items: [{
            link: "/component/pagination",
            text: "Pagination 分页"
          }, {
            link: "/component/popover",
            text: "Popover 气泡"
          }, {
            link: "/component/tabs",
            text: "Tabs 标签页"
          }]
        }, {
    
          text: "数据输入",
          items: [{
            link: "/component/calendar",
            text: "Calendar 日历选择器"
          }, {
            link: "/component/calendar-view",
            text: "CalendarView 日历面板"
          }, {
            link: "/component/checkbox",
            text: "Checkbox 复选框"
          }, {
            link: "/component/col-picker",
            text: "ColPicker 多列选择器"
          }, {
            link: "/component/datetime-picker",
            text: "DatetimePicker 时间选择器"
          }, {
            link: "/component/datetime-picker-view",
            text: "DatetimePickerView 时间选择器视图"
          }, {
            link: "/component/form",
            text: "Form 表单组合"
          }, {
            link: "/component/input",
            text: "Input 输入框"
          }, {
            link: "/component/input-number",
            text: "InputNumber 计数器"
          }, {
            link: "/component/picker",
            text: "Picker 选择器"
          }, {
            link: "/component/picker-view",
            text: "PickerView 选择器视图"
          }, {
            link: "/component/radio",
            text: "Radio 单选框"
          }, {
            link: "/component/rate",
            text: "Rate 评分"
          }, {
            link: "/component/search",
            text: "Search 搜索框"
          }, {
            link: "/component/select-picker",
            text: "SelectPicker 单复选选择器"
          }, {
            link: "/component/slider",
            text: "Slider 滑块"
          }, {
            link: "/component/switch",
            text: "Switch 开关"
          }, {
            link: "/component/upload",
            text: "Upload 上传"
          }]
        }, {
          text: "反馈",
          items: [{
            link: "/component/action-sheet",
            text: "ActionSheet 动作面板"
          }, {
            link: "/component/drop-menu",
            text: "DropMenu 下拉菜单"
          }, {
            link: "/component/loading",
            text: "Loading 加载"
          }, {
            link: "/component/message-box",
            text: "MessageBox 弹框"
          }, {
            link: "/component/notice-bar",
            text: "NoticeBar 通知栏"
          }, {
            link: "/component/progress",
            text: "Progress 进度条"
          }, {
            link: "/component/sort-button",
            text: "SortButton 排序按钮"
          }, {
            link: "/component/status-tip",
            text: "StatusTip 缺省提示"
          }, {
            link: "/component/swipe-action",
            text: "SwipeAction 滑动操作"
          }, {
            link: "/component/toast",
            text: "Toast 轻提示"
          }, {
            link: "/component/notify",
            text: "Notify 消息通知"
          }, {
            link: "/component/tooltip",
            text: "Tooltip 文字提示"
          }]
        }, {
    
          text: "数据展示",
          items: [{
            link: "/component/badge",
            text: "Badge 角标"
          }, {
            link: "/component/card",
            text: "Card 卡片"
          }, {
            link: "/component/cell",
            text: "Cell 单元格"
          }, {
            link: "/component/collapse",
            text: "Collapse 折叠面板"
          }, {
            link: "/component/curtain",
            text: "Curtain 幕帘"
          }, {
            link: "/component/divider",
            text: "Divider 分割线"
          }, {
            link: "/component/img",
            text: "Img 图片"
          }, {
            link: "/component/img-cropper",
            text: "ImgCropper 图片裁剪"
          }, {
            link: "/component/grid",
            text: "Grid 宫格"
          }, {
            link: "/component/loadmore",
            text: "Loadmore 加载更多"
          }, {
            link: "/component/skeleton",
            text: "Skeleton 骨架屏"
          }, {
            link: "/component/steps",
            text: "Steps 步骤条"
          }, {
            link: "/component/sticky",
            text: "Sticky 粘性布局"
          }, {
            link: "/component/tag",
            text: "Tag 标签"
          }]
        }
      ]
    }
    
  },

})