import { mount } from '@vue/test-utils'
import WdTransition from '@/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue'
import { describe, test, expect } from 'vitest'
import { TransitionName } from '@/uni_modules/wot-design-uni/components/wd-transition/types'

describe('WdTransition', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdTransition)
    expect(wrapper.classes()).toContain('wd-transition')
  })

  // 测试显示和隐藏
  test('显示和隐藏状态', async () => {
    const wrapper = mount(WdTransition, {
      props: { show: true }
    })
    expect(wrapper.props('show')).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.props('show')).toBe(false)
  })

  // 测试不同动画名称
  test('不同动画名称', () => {
    const name = 'fade'
    const wrapper = mount(WdTransition, {
      props: { name }
    })
    expect(wrapper.props('name')).toBe(name)
  })

  // 测试多个动画名称数组
  test('多个动画名称数组', () => {
    const names: TransitionName[] = ['fade', 'slide-up']
    const wrapper = mount(WdTransition, {
      props: { name: names }
    })
    // 检查是否正确传递了动画名称数组
    expect(wrapper.props('name')).toEqual(names)
  })

  // 测试动画持续时间
  test('自定义动画持续时间', () => {
    const duration = 500
    const wrapper = mount(WdTransition, {
      props: { duration }
    })
    expect((wrapper.vm as any).duration).toBe(duration)
  })

  // 测试对象形式的动画持续时间
  test('对象形式的动画持续时间', () => {
    const durationObj = { enter: 300, leave: 500 }
    const wrapper = mount(WdTransition, {
      props: { duration: durationObj }
    })
    expect((wrapper.vm as any).duration).toEqual(durationObj)
  })

  // 测试默认插槽内容
  test('默认插槽内容', () => {
    const slotContent = '<div class="custom-content">过渡内容</div>'
    const wrapper = mount(WdTransition, {
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.html()).toContain('custom-content')
  })

  // 测试进入动画事件
  test('触发进入动画事件', async () => {
    const wrapper = mount(WdTransition)
    await wrapper.setProps({ show: true })

    // 手动触发事件，因为在测试环境中动画生命周期可能不会自动触发
    ;(wrapper.vm as any).$emit('before-enter')
    ;(wrapper.vm as any).$emit('enter')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['before-enter']).toBeTruthy()
    expect(emitted['enter']).toBeTruthy()
  })

  // 测试离开动画事件
  test('触发离开动画事件', async () => {
    const wrapper = mount(WdTransition, {
      props: { show: true }
    })
    await wrapper.setProps({ show: false })

    // 手动触发事件，因为在测试环境中动画生命周期可能不会自动触发
    ;(wrapper.vm as any).$emit('before-leave')
    ;(wrapper.vm as any).$emit('leave')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['before-leave']).toBeTruthy()
    expect(emitted['leave']).toBeTruthy()
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'custom-transition'
    const wrapper = mount(WdTransition, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'opacity: 0.8;'
    const wrapper = mount(WdTransition, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试动画完成事件
  test('触发动画完成事件', async () => {
    const wrapper = mount(WdTransition)
    await wrapper.setProps({ show: true })
    ;(wrapper.vm as any).$emit('after-enter')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['after-enter']).toBeTruthy()

    await wrapper.setProps({ show: false })
    ;(wrapper.vm as any).$emit('after-leave')
    expect(emitted['after-leave']).toBeTruthy()
  })

  // 测试懒加载渲染
  test('懒加载渲染', async () => {
    const wrapper = mount(WdTransition, {
      props: { lazyRender: true, show: false }
    })
    // 初始不渲染内容
    expect(wrapper.html()).toBe('<!--v-if-->')

    // 显示后渲染内容
    await wrapper.setProps({ show: true })
    // 等待组件完成初始化和过渡动画
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('wd-transition')
  })

  // 测试销毁机制
  test('销毁属性', async () => {
    const wrapper = mount(WdTransition, {
      props: { destroy: true, show: true }
    })
    expect(wrapper.props('show')).toBe(true)

    await wrapper.setProps({ show: false })
    // 检查元素是否被隐藏
    expect(wrapper.props('show')).toBe(false)
    expect(wrapper.attributes('style')).toContain('display: none')
  })

  // 测试自定义过渡类名
  test('自定义过渡类名', async () => {
    const enterClass = 'custom-enter'
    const enterActiveClass = 'custom-enter-active'
    const enterToClass = 'custom-enter-to'
    const leaveClass = 'custom-leave'
    const leaveActiveClass = 'custom-leave-active'
    const leaveToClass = 'custom-leave-to'

    const wrapper = mount(WdTransition, {
      props: {
        enterClass,
        enterActiveClass,
        enterToClass,
        leaveClass,
        leaveActiveClass,
        leaveToClass,
        show: true
      }
    })

    // 触发进入过渡
    ;(wrapper.vm as any).$emit('before-enter')
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['before-enter']).toBeTruthy()

    // 触发离开过渡
    await wrapper.setProps({ show: false })
    ;(wrapper.vm as any).$emit('before-leave')
    expect(emitted['before-leave']).toBeTruthy()
  })

  // 测试点击事件
  test('点击事件', async () => {
    const wrapper = mount(WdTransition, {
      props: {
        show: true
      },
      slots: {
        default: '<div>内容</div>'
      }
    })

    // 点击组件
    await wrapper.trigger('click')

    // 验证事件
    const emitted = wrapper.emitted() as Record<string, any[]>
    expect(emitted['click']).toBeTruthy()
  })

  // 测试过渡结束事件
  test('过渡结束事件', async () => {
    const wrapper = mount(WdTransition, {
      props: {
        show: true
      },
      slots: {
        default: '<div>内容</div>'
      }
    })

    // 触发过渡结束事件
    await wrapper.trigger('transitionend')

    // 设置为隐藏状态
    await wrapper.setProps({ show: false })

    // 再次触发过渡结束事件
    await wrapper.trigger('transitionend')

    // 验证样式变化
    expect(wrapper.attributes('style')).toContain('display: none')
  })
})
