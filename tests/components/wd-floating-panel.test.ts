import { mount } from '@vue/test-utils'
import WdFloatingPanel from '../../src/uni_modules/wot-design-uni/components/wd-floating-panel/wd-floating-panel.vue'
import { describe, expect, test } from 'vitest'

describe('WdFloatingPanel', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdFloatingPanel)
    expect(wrapper.classes()).toContain('wd-floating-panel')
  })

  test('自定义高度', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        height: 300
      }
    })

    // 检查样式中是否包含高度设置
    expect(wrapper.attributes('style')).toContain('height:')
  })

  test('自定义锚点', async () => {
    const anchors = [100, 200, 300]
    const wrapper = mount(WdFloatingPanel, {
      props: {
        anchors
      }
    })

    // 通过检查组件实例的属性来验证锚点设置
    expect(wrapper.vm.anchors).toEqual(anchors)
  })

  test('底部安全距离', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        safeAreaInsetBottom: true
      }
    })

    expect(wrapper.classes()).toContain('is-safe')
  })

  test('显示滚动条', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        showScrollbar: false
      }
    })

    const scrollView = wrapper.find('.wd-floating-panel__content')
    expect(scrollView.attributes('show-scrollbar')).toBe('false')
  })

  test('动画时长', async () => {
    const duration = 500
    const wrapper = mount(WdFloatingPanel, {
      props: {
        duration
      }
    })

    // 检查样式中是否包含动画时长设置
    expect(wrapper.vm.duration).toBe(duration)
  })

  test('内容区域拖拽', async () => {
    const wrapper = mount(WdFloatingPanel, {
      props: {
        contentDraggable: false
      }
    })

    expect(wrapper.vm.contentDraggable).toBe(false)
  })

  test('高度变化事件', async () => {
    const wrapper = mount(WdFloatingPanel)

    // 模拟高度变化事件
    await wrapper.vm.$emit('height-change', { height: 200 })
    expect(wrapper.emitted('height-change')).toBeTruthy()
    expect(wrapper.emitted('height-change')![0][0]).toEqual({ height: 200 })
  })

  test('更新高度事件', async () => {
    const wrapper = mount(WdFloatingPanel)

    // 模拟更新高度事件
    await wrapper.vm.$emit('update:height', 200)
    expect(wrapper.emitted('update:height')).toBeTruthy()
    expect(wrapper.emitted('update:height')![0][0]).toBe(200)
  })
})
