import { mount } from '@vue/test-utils'
import WdStep from '@/uni_modules/wot-design-uni/components/wd-step/wd-step.vue'
import WdSteps from '@/uni_modules/wot-design-uni/components/wd-steps/wd-steps.vue'
import { describe, test, expect, vi } from 'vitest'

describe('WdStep', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdStep)
    expect(wrapper.classes()).toContain('wd-step')
    expect(wrapper.classes()).toContain('is-wait')
  })

  // 测试自定义标题
  test('自定义标题', () => {
    const title = '步骤1'
    const wrapper = mount(WdStep, {
      props: {
        title
      }
    })
    expect(wrapper.text()).toContain(title)
  })

  // 测试描述文本
  test('描述文本', () => {
    const description = '这是步骤1的描述'
    const wrapper = mount(WdStep, {
      props: {
        description
      }
    })
    expect(wrapper.text()).toContain(description)
  })

  // 测试自定义图标
  test('自定义图标', () => {
    const icon = 'setting'
    const wrapper = mount(WdStep, {
      props: {
        icon
      }
    })
    expect(wrapper.html()).toContain('wd-icon')
    expect(wrapper.props('icon')).toBe(icon)
  })

  // 测试自定义状态
  test('自定义状态', () => {
    const status = 'error'
    const wrapper = mount(WdStep, {
      props: {
        status
      }
    })
    expect(wrapper.classes()).toContain(`is-${status}`)
  })

  // 测试与 Steps 的交互
  test('与 Steps 的交互', async () => {
    // 创建一个包含 Steps 和 Step 的组件
    const StepsWrapper = {
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps :active="active">
          <wd-step title="步骤1"></wd-step>
          <wd-step title="步骤2"></wd-step>
          <wd-step title="步骤3"></wd-step>
        </wd-steps>
      `,
      data() {
        return {
          active: 1
        }
      }
    }

    const wrapper = mount(StepsWrapper)

    // 获取所有 Step
    const steps = wrapper.findAllComponents(WdStep)

    // 检查是否有三个步骤
    expect(steps.length).toBe(3)

    // 检查标题
    expect(steps[0].props('title')).toBe('步骤1')
    expect(steps[1].props('title')).toBe('步骤2')
    expect(steps[2].props('title')).toBe('步骤3')
  })

  // 测试垂直布局
  test('垂直布局', async () => {
    // 创建一个包含 Steps 和 Step 的组件
    const StepsWrapper = {
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps :active="1" vertical>
          <wd-step title="步骤1"></wd-step>
          <wd-step title="步骤2"></wd-step>
        </wd-steps>
      `
    }

    const wrapper = mount(StepsWrapper)

    // 获取 Steps 组件
    const steps = wrapper.findComponent(WdSteps)

    // 检查垂直布局
    expect(steps.props('vertical')).toBe(true)
  })

  // 测试点状样式
  test('点状样式', async () => {
    // 创建一个包含 Steps 和 Step 的组件
    const StepsWrapper = {
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps :active="1" dot>
          <wd-step title="步骤1"></wd-step>
          <wd-step title="步骤2"></wd-step>
        </wd-steps>
      `
    }

    const wrapper = mount(StepsWrapper)

    // 获取 Steps 组件
    const steps = wrapper.findComponent(WdSteps)

    // 检查点状样式
    expect(steps.props('dot')).toBe(true)
  })

  // 测试居中对齐
  test('居中对齐', async () => {
    // 创建一个包含 Steps 和 Step 的组件
    const StepsWrapper = {
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps :active="1" align-center>
          <wd-step title="步骤1"></wd-step>
          <wd-step title="步骤2"></wd-step>
        </wd-steps>
      `
    }

    const wrapper = mount(StepsWrapper)

    // 获取 Steps 组件
    const steps = wrapper.findComponent(WdSteps)

    // 检查居中对齐
    expect(steps.props('alignCenter')).toBe(true)
  })

  // 测试标题插槽
  test('标题插槽', () => {
    const wrapper = mount(WdStep, {
      slots: {
        title: '<div class="custom-title">自定义标题</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  // 测试描述插槽
  test('描述插槽', () => {
    const wrapper = mount(WdStep, {
      slots: {
        description: '<div class="custom-description">自定义描述</div>'
      }
    })
    expect(wrapper.find('.custom-description').exists()).toBe(true)
    expect(wrapper.find('.custom-description').text()).toBe('自定义描述')
  })

  // 测试图标插槽
  test('图标插槽', () => {
    const wrapper = mount(WdStep, {
      slots: {
        icon: '<div class="custom-icon">图标</div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').text()).toBe('图标')
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-step'
    const wrapper = mount(WdStep, {
      props: {
        customClass
      }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'color: red;'
    const wrapper = mount(WdStep, {
      props: {
        customStyle
      }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })
})
