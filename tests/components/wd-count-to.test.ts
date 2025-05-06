import { mount } from '@vue/test-utils'
import WdCountTo from '@/uni_modules/wot-design-uni/components/wd-count-to/wd-count-to.vue'
import WdText from '@/uni_modules/wot-design-uni/components/wd-text/wd-text.vue'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

describe('WdCountTo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdCountTo, {
      global: {
        components: {
          WdText
        }
      }
    })

    expect(wrapper.classes()).toContain('wd-count-to')
    expect(wrapper.findAllComponents(WdText).length).toBe(3) // 前缀、数值、后缀
  })

  // 测试自定义起始值和结束值
  test('自定义起始值和结束值', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 100,
        endVal: 200,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查组件是否正确接收了属性
    expect(wrapper.props('startVal')).toBe(100)
    expect(wrapper.props('endVal')).toBe(200)
    expect(wrapper.props('duration')).toBe(1000)

    // 检查初始值是否接近起始值
    const initialText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(initialText)).toBeCloseTo(100, 0)

    // 前进一半时间
    vi.advanceTimersByTime(500)
    await nextTick()

    // 检查中间值是否在合理范围内
    const midText = wrapper.findAllComponents(WdText)[1].props('text')
    const midValue = Number(midText)
    expect(midValue).toBeGreaterThan(100)
    expect(midValue).toBeLessThan(200)

    // 前进到结束
    vi.advanceTimersByTime(500)
    await nextTick()

    // 检查最终值是否接近结束值
    const finalText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(finalText)).toBeCloseTo(200, 0)
  })

  // 测试小数位数
  test('小数位数设置', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 10.5,
        decimals: 2,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查组件是否正确接收了属性
    expect(wrapper.props('startVal')).toBe(0)
    expect(wrapper.props('endVal')).toBe(10.5)
    expect(wrapper.props('decimals')).toBe(2)

    // 前进到结束
    vi.advanceTimersByTime(1000)
    await nextTick()

    // 检查最终值是否有两位小数
    const finalText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(finalText).toBe('10.50')
  })

  // 测试分隔符
  test('应用分隔符', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 9999,
        separator: ',',
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查组件是否正确接收了属性
    expect(wrapper.props('startVal')).toBe(0)
    expect(wrapper.props('endVal')).toBe(9999)
    expect(wrapper.props('separator')).toBe(',')

    // 前进到结束
    vi.advanceTimersByTime(1050)
    await nextTick()

    // 检查最终值是否包含分隔符
    const finalText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(finalText).toBe('9,999')
  })

  // 测试前缀和后缀
  test('显示前缀和后缀', async () => {
    const prefix = '¥'
    const suffix = '元'

    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        prefix,
        suffix,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查组件是否正确接收了属性
    expect(wrapper.props('prefix')).toBe(prefix)
    expect(wrapper.props('suffix')).toBe(suffix)

    // 检查前缀和后缀是否正确显示
    const textComponents = wrapper.findAllComponents(WdText)
    expect(textComponents[0].props('text')).toBe(prefix)
    expect(textComponents[2].props('text')).toBe(suffix)
  })

  // 测试手动控制
  test('支持手动控制', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 1000,
        autoStart: false
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查初始值
    let currentText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(currentText)).toBeCloseTo(0, 0)

    // 手动开始
    await wrapper.vm.start()

    // 前进一半时间
    vi.advanceTimersByTime(500)
    await nextTick()

    // 检查中间值
    currentText = wrapper.findAllComponents(WdText)[1].props('text')
    const midValue = Number(currentText)
    expect(midValue).toBeGreaterThan(0)
    expect(midValue).toBeLessThan(100)

    // 暂停
    await wrapper.vm.pause()

    // 记录暂停时的值
    const pausedValue = Number(wrapper.findAllComponents(WdText)[1].props('text'))

    // 前进一些时间，值应该保持不变
    vi.advanceTimersByTime(200)
    await nextTick()
    expect(Number(wrapper.findAllComponents(WdText)[1].props('text'))).toBeCloseTo(pausedValue, 0)

    // 重置
    await wrapper.vm.reset()

    // 检查重置后的值
    expect(Number(wrapper.findAllComponents(WdText)[1].props('text'))).toBeCloseTo(0, 0)
  })

  // 测试缓动效果与线性效果的区别
  test('基于useEasing应用不同动画效果', async () => {
    // 使用缓动效果
    const wrapperWithEasing = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 1000,
        useEasing: true,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 使用线性效果
    const wrapperWithoutEasing = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 1000,
        useEasing: false,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 前进一半时间
    vi.advanceTimersByTime(500)
    await nextTick()

    // 获取两种效果下的中间值
    const easingValue = Number(wrapperWithEasing.findAllComponents(WdText)[1].props('text'))
    const linearValue = Number(wrapperWithoutEasing.findAllComponents(WdText)[1].props('text'))

    // 缓动效果应该与线性效果不同
    // 由于缓动函数的特性，在相同时间点，缓动值通常会大于线性值
    expect(easingValue).not.toBeCloseTo(linearValue, 0)

    // 前进到结束
    vi.advanceTimersByTime(550)
    await nextTick()

    // 两种效果最终都应该达到结束值
    expect(Number(wrapperWithEasing.findAllComponents(WdText)[1].props('text'))).toBeCloseTo(100, 0)
    expect(Number(wrapperWithoutEasing.findAllComponents(WdText)[1].props('text'))).toBeCloseTo(100, 0)
  })

  // 测试负向计数（从大到小）
  test('当startVal > endVal时倒计数', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 100,
        endVal: 0,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查初始值
    let currentText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(currentText)).toBeCloseTo(100, 0)

    // 前进一半时间
    vi.advanceTimersByTime(500)
    await nextTick()

    // 检查中间值
    currentText = wrapper.findAllComponents(WdText)[1].props('text')
    const midValue = Number(currentText)
    expect(midValue).toBeLessThan(100)
    expect(midValue).toBeGreaterThan(0)

    // 前进到结束
    vi.advanceTimersByTime(500)
    await nextTick()

    // 检查最终值
    currentText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(currentText)).toBeCloseTo(0, 0)
  })

  // 测试事件
  test('触发mounted和finish事件', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 应该触发 mounted 事件
    expect(wrapper.emitted('mounted')).toBeTruthy()

    // 前进到结束
    vi.advanceTimersByTime(1100)
    await nextTick()

    // 应该触发 finish 事件
    expect(wrapper.emitted('finish')).toBeTruthy()
  })

  // 测试自定义类名
  test('应用自定义类名', () => {
    const customClass = 'my-count-to'

    const wrapper = mount(WdCountTo, {
      props: {
        customClass
      },
      global: {
        components: {
          WdText
        }
      }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试字体大小
  test('应用字体大小', () => {
    const fontSize = 24

    const wrapper = mount(WdCountTo, {
      props: {
        fontSize
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查数值文本的字体大小
    const textComponent = wrapper.findAllComponents(WdText)[1]
    expect(textComponent.props('size')).toBe(`${fontSize}px`)

    // 检查前缀和后缀的字体大小（应该是主字体的0.7倍）
    const prefixComponent = wrapper.findAllComponents(WdText)[0]
    const suffixComponent = wrapper.findAllComponents(WdText)[2]
    expect(prefixComponent.props('size')).toBe(`${fontSize * 0.7}px`)
    expect(suffixComponent.props('size')).toBe(`${fontSize * 0.7}px`)
  })

  // 测试文本颜色
  test('应用文本颜色', () => {
    const color = '#ff0000'

    const wrapper = mount(WdCountTo, {
      props: {
        color
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查所有文本组件的颜色
    const textComponents = wrapper.findAllComponents(WdText)
    textComponents.forEach((component) => {
      expect(component.props('color')).toBe(color)
    })
  })

  // 测试文本类型
  test('应用文本类型', () => {
    const type = 'primary'

    const wrapper = mount(WdCountTo, {
      props: {
        type
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查所有文本组件的类型
    const textComponents = wrapper.findAllComponents(WdText)
    textComponents.forEach((component) => {
      expect(component.props('type')).toBe(type)
    })
  })

  // 测试自定义小数点
  test('应用自定义小数点', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        startVal: 0,
        endVal: 10.5,
        decimals: 2,
        decimal: ',', // 使用逗号作为小数点
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 前进到结束
    vi.advanceTimersByTime(1100)
    await nextTick()

    // 检查最终值是否使用了自定义小数点
    const finalText = wrapper.findAllComponents(WdText)[1].props('text')

    expect(finalText).toBe('10,50')
  })

  // 测试插槽
  test('正确渲染插槽', () => {
    const wrapper = mount(WdCountTo, {
      slots: {
        default: '<div class="custom-number">Custom Number</div>',
        prefix: '<div class="custom-prefix">Custom Prefix</div>',
        suffix: '<div class="custom-suffix">Custom Suffix</div>'
      },
      global: {
        components: {
          WdText
        }
      }
    })

    // 检查自定义插槽内容
    expect(wrapper.find('.custom-number').exists()).toBe(true)
    expect(wrapper.find('.custom-prefix').exists()).toBe(true)
    expect(wrapper.find('.custom-suffix').exists()).toBe(true)
  })

  // 测试非数字值处理
  test('处理非数字值', async () => {
    const wrapper = mount(WdCountTo, {
      props: {
        // 使用类型断言处理字符串类型
        startVal: '10' as unknown as number,
        endVal: '20' as unknown as number,
        duration: 1000,
        autoStart: true
      },
      global: {
        components: {
          WdText
        }
      }
    })
    // 前进到结束
    vi.advanceTimersByTime(1100)
    await nextTick()
    // 检查最终值是否正确解析了字符串数字
    const finalText = wrapper.findAllComponents(WdText)[1].props('text')
    expect(Number(finalText)).toBeCloseTo(20, 0)
  })
})
