import { mount } from '@vue/test-utils'
import '../mocks/wd-transition.mock'
import WdActionSheet from '@/uni_modules/wot-design-uni/components/wd-action-sheet/wd-action-sheet.vue'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import { describe, expect, test } from 'vitest'
import type { Action, Panel } from '@/uni_modules/wot-design-uni/components/wd-action-sheet/types'

import { nextTick } from 'vue'

describe('WdActionSheet', () => {
  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    expect(wrapper.find('.wd-action-sheet').exists()).toBe(true)
  })

  // 测试标题渲染
  test('标题渲染', async () => {
    const title = '标题文本'

    const wrapper = mount(WdActionSheet, {
      props: {
        title,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-action-sheet__header').exists()).toBe(true)
    expect(wrapper.find('.wd-action-sheet__header').text()).toContain(title)
  })

  // 测试动作列表渲染
  test('动作列表渲染', async () => {
    const actions: Action[] = [
      { name: '选项1' },
      { name: '选项2', subname: '描述信息' },
      { name: '选项3', color: 'red' },
      { name: '选项4', disabled: true },
      { name: '选项5', loading: true }
    ]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    const actionButtons = wrapper.findAll('.wd-action-sheet__action')
    expect(actionButtons.length).toBe(5)
    // 测试基本选项
    expect(actionButtons[0].text()).toContain('选项1')

    // 测试带描述的选项
    const action2 = actionButtons[1]
    expect(action2.find('.wd-action-sheet__name').text()).toBe('选项2')
    expect(action2.find('.wd-action-sheet__subname').text()).toBe('描述信息')

    // 测试带颜色的选项
    expect(actionButtons[2].attributes('style')).toContain('color: red')

    // 测试禁用状态
    expect(actionButtons[3].classes()).toContain('wd-action-sheet__action--disabled')

    // 测试加载状态
    expect(actionButtons[4].classes()).toContain('wd-action-sheet__action--loading')
    expect(actionButtons[4].findComponent(WdLoading).exists()).toBe(true)
  })

  // 测试面板渲染 - 一维数组
  test('一维数组面板渲染', async () => {
    const panels: Panel[] = [
      { iconUrl: 'url1', title: '面板1' },
      { iconUrl: 'url2', title: '面板2' }
    ]

    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })
    await nextTick()
    const panelItems = wrapper.findAll('.wd-action-sheet__panel')
    expect(panelItems.length).toBe(2)

    // 验证面板内容
    expect(panelItems[0].find('.wd-action-sheet__panel-img').attributes('src')).toBe('url1')
    expect(panelItems[0].find('.wd-action-sheet__panel-title').text()).toBe('面板1')
  })

  // 测试取消按钮
  test('取消按钮渲染和事件触发', async () => {
    const cancelText = '取消'

    const wrapper = mount(WdActionSheet, {
      props: {
        cancelText,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    const cancelButton = wrapper.find('.wd-action-sheet__cancel')
    expect(cancelButton.exists()).toBe(true)
    expect(cancelButton.text()).toBe(cancelText)

    await cancelButton.trigger('click')

    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  // 测试选项点击事件
  test('选项点击触发选择事件', async () => {
    const actions: Action[] = [{ name: '选项1' }]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    await wrapper.find('.wd-action-sheet__action').trigger('click')

    const selectEvent = wrapper.emitted('select')?.[0][0]
    expect(selectEvent).toEqual({
      item: actions[0],
      index: 0
    })
  })

  // 测试禁用项点击
  test('禁用项点击不触发选择事件', async () => {
    const actions: Action[] = [{ name: '选项1', disabled: true }]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__action').trigger('click')

    expect(wrapper.emitted('select')).toBeFalsy()
  })

  // 测试加载项点击
  test('加载项点击不触发选择事件', async () => {
    const actions: Action[] = [{ name: '选项1', loading: true }]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })
    await nextTick()
    await wrapper.find('.wd-action-sheet__action').trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  // 测试多行面板 - 二维数组
  test('二维数组面板渲染', async () => {
    const panels: Panel[][] = [[{ iconUrl: 'url1', title: '面板1' }], [{ iconUrl: 'url2', title: '面板2' }]]

    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    const panelRows = wrapper.findAll('.wd-action-sheet__panels')
    expect(panelRows.length).toBe(2)
  })

  // 测试面板点击事件 - 一维数组
  test('一维数组面板点击触发选择事件', async () => {
    const panels: Panel[] = [{ iconUrl: 'url1', title: '面板1' }]

    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__panel').trigger('click')

    const selectEvent = wrapper.emitted('select')?.[0][0]
    expect(selectEvent).toEqual({
      item: panels[0],
      index: 0
    })
  })

  // 测试面板点击事件 - 二维数组
  test('二维数组面板点击触发选择事件', async () => {
    const panels: Panel[][] = [[{ iconUrl: 'url1', title: '面板1' }], [{ iconUrl: 'url2', title: '面板2' }]]

    const wrapper = mount(WdActionSheet, {
      props: {
        panels,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__panel').trigger('click')

    const selectEvent = wrapper.emitted('select')?.[0][0]
    expect(selectEvent).toEqual({
      item: panels[0][0],
      rowIndex: 0,
      colIndex: 0
    })
  })

  // 测试点击后关闭
  test('点击后关闭功能', async () => {
    const actions: Action[] = [{ name: '选项1' }]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true,
        closeOnClickAction: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__action').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  // 测试点击后不关闭
  test('点击后不关闭功能', async () => {
    const actions: Action[] = [{ name: '选项1' }]

    const wrapper = mount(WdActionSheet, {
      props: {
        actions,
        modelValue: true,
        closeOnClickAction: false
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__action').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  // 测试点击遮罩事件
  test('点击遮罩事件触发', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    // 触发 Popup 的 click-modal 事件
    wrapper.findComponent(WdPopup).vm.$emit('click-modal')

    expect(wrapper.emitted('click-modal')).toBeTruthy()
  })

  // 测试打开事件
  test('打开事件触发', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    // 触发 Popup 的 enter 事件
    wrapper.findComponent(WdPopup).vm.$emit('enter')

    expect(wrapper.emitted('open')).toBeTruthy()
  })

  // 测试打开完成事件
  test('打开完成事件触发', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    // 触发 Popup 的 after-enter 事件
    wrapper.findComponent(WdPopup).vm.$emit('after-enter')

    expect(wrapper.emitted('opened')).toBeTruthy()
  })

  // 测试关闭完成事件
  test('关闭完成事件触发', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    // 触发 Popup 的 after-leave 事件
    wrapper.findComponent(WdPopup).vm.$emit('after-leave')

    expect(wrapper.emitted('closed')).toBeTruthy()
  })

  // 测试关闭按钮
  test('点击关闭图标关闭', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        title: '标题',
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-action-sheet__close').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  // 测试自定义头部样式
  test('应用自定义头部类名', async () => {
    const customHeaderClass = 'custom-header'

    const wrapper = mount(WdActionSheet, {
      props: {
        title: '标题',
        customHeaderClass,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-action-sheet__header').classes()).toContain(customHeaderClass)
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-action-sheet'

    const wrapper = mount(WdActionSheet, {
      props: {
        customClass,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.wd-action-sheet').classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background: red;'

    const wrapper = mount(WdActionSheet, {
      props: {
        customStyle,
        modelValue: true
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-action-sheet').attributes('style')).toContain(customStyle)
  })

  // 测试默认插槽
  test('渲染默认插槽内容', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true
      },
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  // 测试 modelValue 变化
  test('modelValue 变化时更新显示状态', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: false
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })
    await nextTick()

    // 初始状态
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(false)

    // 更新 modelValue
    await wrapper.setProps({ modelValue: true })

    // 验证 showPopup 更新
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(true)
  })

  // 测试 z-index 属性
  test('传递 z-index 属性到弹出层', async () => {
    const zIndex = 1000

    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true,
        zIndex
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdPopup).props('zIndex')).toBe(zIndex)
  })

  // 测试 duration 属性
  test('传递 duration 属性到弹出层', async () => {
    const duration = 300

    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true,
        duration
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdPopup).props('duration')).toBe(duration)
  })

  // 测试 closeOnClickModal 属性
  test('传递 closeOnClickModal 属性到弹出层', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true,
        closeOnClickModal: false
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdPopup).props('closeOnClickModal')).toBe(false)
  })

  // 测试 safeAreaInsetBottom 属性
  test('传递 safeAreaInsetBottom 属性到弹出层', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true,
        safeAreaInsetBottom: false
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdPopup).props('safeAreaInsetBottom')).toBe(false)
  })

  // 测试 lazyRender 属性
  test('传递 lazyRender 属性到弹出层', async () => {
    const wrapper = mount(WdActionSheet, {
      props: {
        modelValue: true,
        lazyRender: false
      },
      global: {
        components: {
          WdPopup,
          WdIcon,
          WdLoading
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdPopup).props('lazyRender')).toBe(false)
  })
})
