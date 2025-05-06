import { mount } from '@vue/test-utils'
import WdBacktop from '@/uni_modules/wot-design-uni/components/wd-backtop/wd-backtop.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdTransition from '@/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'

describe('WdBacktop', () => {
  // 测试基本渲染
  test('基本渲染', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 0
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.wd-backtop').exists()).toBe(true)
    // 默认情况下，当 scrollTop < top (默认为300)时，不应该显示
    expect(wrapper.findComponent(WdTransition).props('show')).toBe(false)
  })

  // 测试滚动显示/隐藏逻辑
  test('根据滚动位置显示/隐藏', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 0,
        top: 300
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    // 初始状态，scrollTop < top，不应该显示
    expect(wrapper.findComponent(WdTransition).props('show')).toBe(false)

    // 更新 scrollTop > top，应该显示
    await wrapper.setProps({ scrollTop: 400 })
    await nextTick()
    expect(wrapper.findComponent(WdTransition).props('show')).toBe(true)

    // 更新 scrollTop < top，不应该显示
    await wrapper.setProps({ scrollTop: 200 })
    await nextTick()
    expect(wrapper.findComponent(WdTransition).props('show')).toBe(false)
  })

  // 测试自定义图标
  test('自定义图标内容', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400
      },
      slots: {
        default: '<text>TOP</text>'
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.find('text').text()).toBe('TOP')
    expect(wrapper.findComponent(WdIcon).exists()).toBe(false)
  })

  // 测试默认图标
  test('无插槽内容时显示默认图标', async () => {
    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(WdIcon).props('name')).toBe('backtop')
    expect(wrapper.findComponent(WdIcon).classes()).toContain('wd-backtop__backicon')
  })

  // 测试自定义样式
  test('应用自定义样式', async () => {
    const customStyle = 'background: red; color: white;'

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        customStyle
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-backtop').attributes('style')).toContain(customStyle)
  })

  // 测试自定义图标样式
  test('应用自定义图标样式', async () => {
    const iconStyle = 'font-size: 20px;'

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        iconStyle
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.findComponent(WdIcon).props('customStyle')).toBe(iconStyle)
  })

  // 测试不同形状
  test('不同形状渲染', async () => {
    const shapes = ['circle', 'square']

    for (const shape of shapes) {
      const wrapper = mount(WdBacktop, {
        props: {
          scrollTop: 400,
          shape
        },
        global: {
          components: {
            WdIcon,
            WdTransition
          }
        }
      })

      await nextTick()

      expect(wrapper.find('.wd-backtop').classes()).toContain(`is-${shape}`)
    }
  })

  // 测试自定义位置
  test('应用自定义位置', async () => {
    const bottom = 150
    const right = 30

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        bottom,
        right
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    const style = wrapper.find('.wd-backtop').attributes('style')
    expect(style).toContain(`bottom: ${bottom}px`)
    expect(style).toContain(`right: ${right}px`)
  })

  // 测试自定义z-index
  test('应用自定义z-index', async () => {
    const zIndex = 20

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        zIndex
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-backtop').attributes('style')).toContain(`z-index: ${zIndex}`)
  })

  // 测试点击事件
  test('触发点击事件并滚动到顶部', async () => {
    const duration = 300

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        duration
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-backtop').trigger('click')

    // 验证调用了 uni.pageScrollTo
    expect(uni.pageScrollTo).toHaveBeenCalledWith({
      scrollTop: 0,
      duration
    })
  })

  // 测试自定义滚动持续时间
  test('应用自定义滚动持续时间', async () => {
    const duration = 500

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        duration
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    await wrapper.find('.wd-backtop').trigger('click')

    // 验证调用了 uni.pageScrollTo 并传入了自定义的 duration
    expect(uni.pageScrollTo).toHaveBeenCalledWith({
      scrollTop: 0,
      duration
    })
  })

  // 测试自定义类名
  test('应用自定义类名', async () => {
    const customClass = 'custom-backtop'

    const wrapper = mount(WdBacktop, {
      props: {
        scrollTop: 400,
        customClass
      },
      global: {
        components: {
          WdIcon,
          WdTransition
        }
      }
    })

    await nextTick()

    expect(wrapper.find('.wd-backtop').classes()).toContain(customClass)
  })
})
