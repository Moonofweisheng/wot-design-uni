import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  description: 'A uni-app component library based on wot-design',
  themeConfig: {
    lastUpdated: {
      text: 'Last Updated'
    },
    editLink: {
      pattern: 'https://github.com/Moonofweisheng/wot-design-uni/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      {
        text: 'Guide',
        activeMatch: '/guide/',
        items: [
          {
            text: 'Introduction',
            link: '/en-US/guide/introduction',
          },
          {
            text: 'Quick Start',
            link: '/en-US/guide/quick-use',
          },
          {
            text: 'CLI & Templates',
            link: '/en-US/guide/cli-templates',
          },
          {
            text: 'Custom Theme',
            link: '/en-US/guide/custom-theme',
          },
          {
            text: 'Common Problems',
            link: '/en-US/guide/common-problems',
          },
          {
            text: 'Internationalization',
            link: '/en-US/guide/locale',
          },
          {
            text: 'Changelog',
            link: '/en-US/guide/changelog',
          },
          {
            text: '⭐ Cases',
            link: '/en-US/guide/cases',
          },
          {
            text: 'Join Group',
            link: '/en-US/guide/join-group',
          }
        ]
      },
      {
        text: 'Components',
        activeMatch: '/component/',
        items: [
          {
            text: 'Basic Components',
            link: '/en-US/component/button',
          },
          {
            text: 'Navigation',
            link: '/en-US/component/pagination',
          },
          {
            text: 'Data Input',
            link: '/en-US/component/calendar',
          },
          {
            text: 'Feedback',
            link: '/en-US/component/action-sheet',
          },
          {
            text: 'Data Display',
            link: '/en-US/component/badge',
          }
        ]
      },
      { text: '🥤Buy Me a Coffee', link: '/en-US/reward/reward', activeMatch: '/reward/' },
      { text: 'Quick Start Project', link: 'https://github.com/wot-ui/wot-starter' },
      {
        text: 'Ecosystem',
        items: [
          { text: 'Vue3 uni-app Router', link: 'https://moonofweisheng.github.io/uni-mini-router/' },
          { text: 'Mini Program CI Tool', link: 'https://github.com/Moonofweisheng/uni-mini-ci' },
          { text: 'Uni Helper', link: 'https://uni-helper.js.org/' },
          { text: 'uni-ku', link: 'https://github.com/uni-ku' },
        ],
      },
    ],
    sidebar: {
      '/en-US/guide/': [
        {
          text: 'Introduction',
          link: '/en-US/guide/introduction',
        },
        {
          text: 'Quick Start',
          link: '/en-US/guide/quick-use',
        },
        {
          text: 'CLI & Templates',
          link: '/en-US/guide/cli-templates',
        },
        {
          text: 'Custom Theme',
          link: '/en-US/guide/custom-theme',
        },
        {
          text: 'Internationalization',
          link: '/en-US/guide/locale',
        },
        {
          text: 'Common Problems',
          link: '/en-US/guide/common-problems',
        },
        {
          text: 'Changelog',
          link: '/en-US/guide/changelog',
        },
        {
          text: '⭐ Cases',
          link: '/en-US/guide/cases',
        },
        {
          text: 'Join Group',
          link: '/en-US/guide/join-group',
        }
      ],
      '/en-US/reward/': [
        {
          text: '🥤Buy Me a Coffee',
          link: '/en-US/reward/reward',
        },
        {
          text: 'Donor List',
          link: '/en-US/reward/donor',
        }
      ],
      '/en-US/component/': [
        {
          text: 'Basic',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/button',
              text: 'Button'
            },
            {
              link: '/en-US/component/icon',
              text: 'Icon'
            },
            {
              link: '/en-US/component/layout',
              text: 'Layout'
            },
            {
              link: '/en-US/component/config-provider',
              text: 'ConfigProvider'
            },
            {
              link: '/en-US/component/popup',
              text: 'Popup'
            },
            {
              link: '/en-US/component/resize',
              text: 'Resize'
            },
            {
              link: '/en-US/component/transition',
              text: 'Transition'
            },
            {
              link: '/en-US/component/fab',
              text: 'Fab'
            },
            {
              link: '/en-US/component/text',
              text: 'Text'
            },
            {
              link: '/en-US/component/root-portal',
              text: 'RootPortal'
            }
          ]
        },
        {
          text: 'Navigation',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/pagination',
              text: 'Pagination'
            },
            {
              link: '/en-US/component/popover',
              text: 'Popover'
            },
            {
              link: '/en-US/component/tabs',
              text: 'Tabs'
            },
            {
              link: '/en-US/component/segmented',
              text: 'Segmented'
            },
            {
              link: '/en-US/component/tabbar',
              text: 'Tabbar'
            },
            {
              link: '/en-US/component/navbar',
              text: 'Navbar'
            },
            {
              link: '/en-US/component/sidebar',
              text: 'Sidebar'
            },
            {
              link: '/en-US/component/backtop',
              text: 'Backtop'
            },
            {
              link: '/en-US/component/index-bar',
              text: 'IndexBar'
            }
          ]
        },
        {
          text: 'Data Input',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/calendar',
              text: 'Calendar'
            },
            {
              link: '/en-US/component/calendar-view',
              text: 'CalendarView'
            },
            {
              link: '/en-US/component/checkbox',
              text: 'Checkbox'
            },
            {
              link: '/en-US/component/col-picker',
              text: 'ColPicker'
            },
            {
              link: '/en-US/component/datetime-picker',
              text: 'DatetimePicker'
            },
            {
              link: '/en-US/component/datetime-picker-view',
              text: 'DatetimePickerView'
            },
            {
              link: '/en-US/component/form',
              text: 'Form'
            },
            {
              link: '/en-US/component/input',
              text: 'Input'
            },
            {
              link: '/en-US/component/textarea',
              text: 'Textarea'
            },
            {
              link: '/en-US/component/input-number',
              text: 'InputNumber'
            },
            {
              link: '/en-US/component/picker',
              text: 'Picker'
            },
            {
              link: '/en-US/component/picker-view',
              text: 'PickerView'
            },
            {
              link: '/en-US/component/radio',
              text: 'Radio'
            },
            {
              link: '/en-US/component/rate',
              text: 'Rate'
            },
            {
              link: '/en-US/component/search',
              text: 'Search'
            },
            {
              link: '/en-US/component/select-picker',
              text: 'SelectPicker'
            },
            {
              link: '/en-US/component/slider',
              text: 'Slider'
            },
            {
              link: '/en-US/component/switch',
              text: 'Switch'
            },
            {
              link: '/en-US/component/upload',
              text: 'Upload'
            },
            {
              link: '/en-US/component/password-input',
              text: 'PasswordInput'
            },
            {
              link: '/en-US/component/signature',
              text: 'Signature'
            }
          ]
        },
        {
          text: 'Feedback',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/action-sheet',
              text: 'ActionSheet'
            },
            {
              link: '/en-US/component/drop-menu',
              text: 'DropMenu'
            },
            {
              link: '/en-US/component/floating-panel',
              text: 'FloatingPanel'
            },
            {
              link: '/en-US/component/loading',
              text: 'Loading'
            },
            {
              link: '/en-US/component/message-box',
              text: 'MessageBox'
            },
            {
              link: '/en-US/component/notice-bar',
              text: 'NoticeBar'
            },
            {
              link: '/en-US/component/overlay',
              text: 'Overlay'
            },
            {
              link: '/en-US/component/progress',
              text: 'Progress'
            },
            {
              link: '/en-US/component/circle',
              text: 'Circle'
            },
            {
              link: '/en-US/component/sort-button',
              text: 'SortButton'
            },
            {
              link: '/en-US/component/status-tip',
              text: 'StatusTip'
            },
            {
              link: '/en-US/component/swipe-action',
              text: 'SwipeAction'
            },
            {
              link: '/en-US/component/toast',
              text: 'Toast'
            },
            {
              link: '/en-US/component/notify',
              text: 'Notify'
            },
            {
              link: '/en-US/component/tooltip',
              text: 'Tooltip'
            },
            {
              link: '/en-US/component/count-down',
              text: 'CountDown'
            },
            {
              link: '/en-US/component/count-to',
              text: 'CountTo'
            },
            {
              link: '/en-US/component/keyboard',
              text: 'Keyboard'
            },
            {
              link: '/en-US/component/number-keyboard',
              text: 'NumberKeyboard'
            }
          ]
        },
        {
          text: 'Data Display',
          collapsed: false,
          items: [
            {
              link: '/en-US/component/badge',
              text: 'Badge'
            },
            {
              link: '/en-US/component/card',
              text: 'Card'
            },
            {
              link: '/en-US/component/cell',
              text: 'Cell'
            },
            {
              link: '/en-US/component/collapse',
              text: 'Collapse'
            },
            {
              link: '/en-US/component/curtain',
              text: 'Curtain'
            },
            {
              link: '/en-US/component/divider',
              text: 'Divider'
            },
            {
              link: '/en-US/component/gap',
              text: 'Gap'
            },
            {
              link: '/en-US/component/img',
              text: 'Img'
            },
            {
              link: '/en-US/component/img-cropper',
              text: 'ImgCropper'
            },
            {
              link: '/en-US/component/grid',
              text: 'Grid'
            },
            {
              link: '/en-US/component/loadmore',
              text: 'Loadmore'
            },
            {
              link: '/en-US/component/skeleton',
              text: 'Skeleton'
            },
            {
              link: '/en-US/component/steps',
              text: 'Steps'
            },
            {
              link: '/en-US/component/sticky',
              text: 'Sticky'
            },
            {
              link: '/en-US/component/tag',
              text: 'Tag'
            },
            {
              link: '/en-US/component/watermark',
              text: 'Watermark'
            },
            {
              link: '/en-US/component/swiper',
              text: 'Swiper'
            },
            {
              link: '/en-US/component/table',
              text: 'Table'
            }
          ]
        },
        {
          text: 'Composables',
          items: [
            { text: 'useUpload', link: '/en-US/component/use-upload' },
            { text: 'useCountDown', link: '/en-US/component/use-count-down' },
            { text: 'useToast', link: '/en-US/component/use-toast' },
            { text: 'useMessage', link: '/en-US/component/use-message' }
          ]
        }
      ]
    }
  }
})