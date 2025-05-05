import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import '../mocks/wd-transition.mock'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdKey from '@/uni_modules/wot-design-uni/components/wd-keyboard/key/index.vue'
import WdKeyboard from '@/uni_modules/wot-design-uni/components/wd-keyboard/wd-keyboard.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdLoading from '@/uni_modules/wot-design-uni/components/wd-loading/wd-loading.vue'
import { nextTick, ref } from 'vue'

const globalComponents = {
  WdPopup,
  WdKey,
  WdIcon,
  WdLoading
}

describe('WdKeyboard', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.find('.wd-keyboard').exists()).toBe(true)
    // 检查默认模式下的键盘布局
    const keys = wrapper.findAllComponents(WdKey)
    expect(keys.length).toBe(12) // 默认模式下有12个按键
  })

  test('自定义标题', async () => {
    const title = '自定义标题'
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        title
      },
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.find('.wd-keyboard__title').text()).toBe(title)
  })

  test('使用插槽自定义标题', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      },
      slots: {
        title: '<div class="custom-title">自定义标题内容</div>'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题内容')
  })

  test('显示隐藏状态', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: false,
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 初始状态下，popup 应该是隐藏的
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(false)

    // 设置 visible 为 true
    await wrapper.setProps({ visible: true })
    await nextTick()

    // popup 应该显示
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(true)
  })

  test('按键点击事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: ''
      },
      global: {
        components: globalComponents
      }
    })

    // 模拟按键点击
    const key = wrapper.findAllComponents(WdKey)[0] // 第一个按键（数字1）
    key.vm.$emit('press', '1', '')

    // 验证事件
    const emitted = wrapper.emitted()
    expect(emitted.input).toBeTruthy()
    expect(emitted.input?.[0]).toEqual(['1'])
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue']?.[0]).toEqual(['1'])
  })

  test('删除按键事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '123',
        showDeleteKey: true
      },
      global: {
        components: globalComponents
      }
    })

    // 找到删除键并触发点击
    const deleteKey = wrapper.findAllComponents(WdKey).find((key) => key.props('type') === 'delete')
    expect(deleteKey).toBeTruthy()
    if (deleteKey) {
      deleteKey.vm.$emit('press', '', 'delete')
    }

    // 验证事件
    const emitted = wrapper.emitted()
    expect(emitted.delete).toBeTruthy()
    expect(emitted['update:modelValue']).toBeTruthy()
    expect(emitted['update:modelValue']?.[0]).toEqual(['12'])
  })

  test('关闭事件', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        closeText: '完成',
        title: '标题' // 添加标题以显示关闭按钮
      },
      global: {
        components: globalComponents
      }
    })

    // 找到关闭按钮并触发点击
    const closeButton = wrapper.find('.wd-keyboard__close')
    expect(closeButton.exists()).toBe(true)
    await closeButton.trigger('click')

    // 验证事件
    const emitted = wrapper.emitted()
    expect(emitted.close).toBeTruthy()
    expect(emitted['update:visible']).toBeTruthy()
    expect(emitted['update:visible']?.[0]).toEqual([false])
  })

  test('最大长度限制', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '123',
        maxlength: 3
      },
      global: {
        components: globalComponents
      }
    })

    // 模拟按键点击
    const key = wrapper.findAllComponents(WdKey)[0] // 第一个按键
    key.vm.$emit('press', '4', '')

    // 由于已达到最大长度，不应该触发更新
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('自定义模式 - 单个额外按键', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        mode: 'custom',
        extraKey: '.'
      },
      global: {
        components: globalComponents
      }
    })
    await wrapper.vm.$nextTick()

    // 检查 mode 属性是否正确设置
    expect(wrapper.props('mode')).toBe('custom')

    // 检查键盘布局
    const keys = wrapper.findAllComponents(WdKey)

    expect(keys.length).toBe(13) // 9个数字键 + 0键 + 2额外键 + 侧边栏删除键

    // 检查额外键
    const extraKey = keys.find((key) => key.props('type') === 'extra')
    expect(extraKey).toBeTruthy()
    if (extraKey) {
      expect(extraKey.props('text')).toBe('.')
    }
  })

  test('自定义模式 - 两个额外按键', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        mode: 'custom',
        extraKey: ['X', 'Y']
      },
      global: {
        components: globalComponents
      }
    })

    // 检查键盘布局
    const keys = wrapper.findAllComponents(WdKey)
    expect(keys.length).toBe(14) // 9个数字键 + 2个额外键 + 0键 + 侧边栏删除键 + 完成

    // 检查额外键
    const extraKeys = keys.filter((key) => key.props('type') === 'extra')
    expect(extraKeys.length).toBe(2)
    expect(extraKeys[0].props('text')).toBe('X')
    expect(extraKeys[1].props('text')).toBe('Y')
  })

  test('车牌模式', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        mode: 'car'
      },
      global: {
        components: globalComponents
      }
    })

    // 检查 mode 属性是否正确设置
    expect(wrapper.props('mode')).toBe('car')

    // 检查车牌模式下的键盘布局
    const keys = wrapper.findAllComponents(WdKey)
    // 车牌模式键盘组成：
    // - 第一区域（省份简称）：京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼，共30个键
    // - 第二区域（字母和数字）：1-0共10个数字/字母键
    // - 第三区域：删除键、切换键（ABC/返回）、特殊字符（港澳学警领）共8个键
    // 总计：30 + 10 + 8 = 48个键，但由于键盘区域切换，实际渲染的是38个键
    expect(keys.length).toBe(38)
  })

  test('随机键盘顺序', async () => {
    // 模拟 Math.random 以获得可预测的结果
    const originalRandom = Math.random
    Math.random = vi.fn().mockReturnValue(0.5)

    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        randomKeyOrder: true
      },
      global: {
        components: globalComponents
      }
    })

    // 检查 randomKeyOrder 属性是否正确设置
    expect(wrapper.props('randomKeyOrder')).toBe(true)

    // 恢复原始 Math.random
    Math.random = originalRandom
  })

  test('双向绑定', async () => {
    const modelValue = ref('123')
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: modelValue.value,
        'onUpdate:modelValue': (val) => {
          modelValue.value = val
          // 更新组件的 props
          wrapper.setProps({ modelValue: val })
        }
      },
      global: {
        components: globalComponents
      }
    })

    // 模拟按键点击，添加一个数字
    const key = wrapper.findAllComponents(WdKey)[3] // 第四个按键（数字4）
    await key.find('.wd-key-wrapper').trigger('touchstart', {
      touches: [{ pageY: 100, pageX: 100 }]
    })
    await key.find('.wd-key-wrapper').trigger('touchend')
    await nextTick()

    // 验证 modelValue 已更新
    expect(modelValue.value).toBe('1234')
    expect(wrapper.props('modelValue')).toBe('1234')

    // 模拟删除键点击
    const deleteKey = wrapper.findAllComponents(WdKey).find((key) => key.props('type') === 'delete')
    if (deleteKey) {
      await deleteKey.find('.wd-key-wrapper').trigger('touchstart', {
        touches: [{ pageY: 100, pageX: 100 }]
      })
      await deleteKey.find('.wd-key-wrapper').trigger('touchend')
      await nextTick()
    }

    // 验证 modelValue 已更新
    expect(modelValue.value).toBe('123')
    expect(wrapper.props('modelValue')).toBe('123')
  })

  test('点击遮罩关闭键盘', async () => {
    const wrapper = mount(WdKeyboard, {
      props: {
        visible: true,
        modelValue: '',
        hideOnClickOutside: true
      },
      global: {
        components: globalComponents
      }
    })

    // 模拟点击遮罩
    wrapper.findComponent(WdPopup).vm.$emit('click-modal')

    // 验证关闭事件
    const emitted = wrapper.emitted()
    expect(emitted.close).toBeTruthy()
    expect(emitted['update:visible']).toBeTruthy()
    expect(emitted['update:visible']?.[0]).toEqual([false])
  })
})
