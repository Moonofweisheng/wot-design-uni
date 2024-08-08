/*
 * @Author: weisheng
 * @Date: 2023-07-27 10:26:09
 * @LastEditTime: 2024-07-19 13:29:51
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\docs\.vitepress\config.mts
 * 记得注释
 */
import { defineConfig } from 'vitepress';
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default defineConfig({
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      })
    ],
    ssr: { noExternal: ['element-plus'] }
    // build: {
    //   terserOptions: {
    //     compress: {
    //       //生产环境时移除console
    //       drop_console: true,
    //       drop_debugger: true
    //     }
    //   },
    //   //   关闭文件计算
    //   reportCompressedSize: false,
    //   //   关闭生成map文件 可以达到缩小打包体积
    //   sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
    // }
  },
  title: `Wot Design Uni`,
  description: '一个参照wot-design打造的uni-app组件库',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      !function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"3J4q4tM6fN0n1fbZ",ck:"3J4q4tM6fN0n1fbZ"});
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
      { icon: { svg: '<svg t="1692699544299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4184" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#6D6D72" p-id="4185"></path></svg>' }, link: "https://gitee.com/fant-mini/wot-design-uni", ariaLabel: 'Gitee' },
      { icon: { svg: '<svg t="1694688365239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4048" width="200" height="200"><path d="M980.79827 694.105946c-21.144216-122.796973-109.844757-203.250162-109.844757-203.250162 12.647784-111.477622-33.792-131.26573-33.792-131.26573C827.392 14.668108 530.985514 20.67373 524.730811 20.839784 518.476108 20.67373 222.01427 14.668108 212.300108 359.590054c0 0-46.467459 19.788108-33.819676 131.26573 0 0-88.700541 80.453189-109.817081 203.250162 0 0-11.291676 207.484541 101.403676 25.40627 0 0 25.350919 69.161514 71.790703 131.26573 0 0-83.082378 28.256865-75.997405 101.625081 0 0-2.87827 81.836973 177.401081 76.218811 0 0 126.699243-9.852541 164.753297-63.515676l16.605405 0 0.276757 0 16.633081 0c38.026378 53.635459 164.725622 63.515676 164.725622 63.515676 180.224 5.618162 177.401081-76.218811 177.401081-76.218811 7.029622-73.368216-75.997405-101.625081-75.997405-101.625081 46.439784-62.104216 71.790703-131.26573 71.790703-131.26573C992.034595 901.590486 980.79827 694.105946 980.79827 694.105946z" p-id="4049" fill="#6D6D72"></path></svg>' }, link: "/guide/join-group", ariaLabel: 'QQ' }
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
            text: '常见问题',
            link: '/guide/common-problems',
          },
          {
            text: '国际化',
            link: '/guide/locale',
          }, {
            text: '更新日志',
            link: '/guide/changelog',
          },{
            text: '加群沟通',
            link: '/guide/join-group',
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
      { text: '🥤一杯咖啡', link: '/reward/reward', activeMatch: '/reward/' },
      {
        text: '相关链接',
        items: [
          { text: 'Vue3 uni-app路由库', link: 'https://moonofweisheng.github.io/uni-mini-router/' },
          { text: '多平台小程序CI工具', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
          { text: '快速上手项目', link: 'https://github.com/Moonofweisheng/wot-starter' },
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
          text: '国际化',
          link: '/guide/locale',
        },
        {
          text: '常见问题',
          link: '/guide/common-problems',
        },
        {
          text: '更新日志',
          link: '/guide/changelog',
        },{
          text: '加群沟通',
          link: '/guide/join-group',
        }
      ],
      '/reward/': [
        {
          text: '🥤一杯咖啡',
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
          collapsed: false,
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
            }, {
              link: "/component/fab",
              text: "Fab 悬浮按钮"
            }, {
              link: "/component/text",
              text: "Text 文本"
            }
          ]
        },
        {

          text: "导航",
          collapsed: false,
          items: [{
            link: "/component/pagination",
            text: "Pagination 分页"
          }, {
            link: "/component/popover",
            text: "Popover 气泡"
          }, {
            link: "/component/tabs",
            text: "Tabs 标签页"
          }, {
            link: "/component/segmented",
            text: "Segmented 分段器"
          }, {
            link: "/component/tabbar",
            text: "Tabbar 标签栏"
          }, {
            link: "/component/navbar",
            text: "Navbar 导航栏"
          }, {
            link: "/component/sidebar",
            text: "Sidebar 侧边栏"
          }, {
            link: "/component/backtop",
            text: "Backtop 回到顶部"
          }, {
            link: "/component/index-bar",
            text: "IndexBar 索引栏"
          }]
        }, {

          text: "数据输入",
          collapsed: false,
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
            text: "Form 表单"
          }, {
            link: "/component/input",
            text: "Input 输入框"
          }, {
            link: "/component/textarea",
            text: "Textarea 文本域"
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
          }, {
            link: "/component/password-input",
            text: "PasswordInput 密码输入框"
          }]
        }, {
          text: "反馈",
          collapsed: false,
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
            link: "/component/overlay",
            text: "Overlay 遮罩层"
          }, {
            link: "/component/progress",
            text: "Progress 进度条"
          }, {
            link: "/component/circle",
            text: "Circle 环形进度条"
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
          }, {
            link: "/component/count-down",
            text: "CountDown 倒计时"
          }, {
            link: "/component/statistic",
            text: "Statistic 数值显示"
          }, {
            link: "/component/number-keyboard",
            text: "NumberKeyboard 数字键盘"
          }]
        }, {

          text: "数据展示",
          collapsed: false,
          items: [{
            link: "/component/badge",
            text: "Badge 徽标"
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
            link: "/component/gap",
            text: "Gap 间隔槽"
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
          }, {
            link: "/component/watermark",
            text: "Watermark 水印"
          }, {
            link: "/component/swiper",
            text: "Swiper 轮播图"
          }, {
            link: "/component/table",
            text: "Table 表格"
          }]
        }
      ]
    }

  },

})
