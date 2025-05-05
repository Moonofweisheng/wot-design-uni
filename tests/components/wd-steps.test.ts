import { mount } from '@vue/test-utils'
import WdSteps from '@/uni_modules/wot-design-uni/components/wd-steps/wd-steps.vue'
import WdStep from '@/uni_modules/wot-design-uni/components/wd-step/wd-step.vue'
import { describe, expect, test } from 'vitest'

describe('WdSteps', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSteps)
    expect(wrapper.classes()).toContain('wd-steps')
  })

  test('垂直布局', async () => {
    const wrapper = mount(WdSteps, {
      props: {
        vertical: true
      }
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  test('居中对齐', async () => {
    const wrapper = mount(WdSteps, {
      props: {
        alignCenter: true
      }
    })
    expect(wrapper.props('alignCenter')).toBe(true)
  })

  test('点状样式', async () => {
    const wrapper = mount(WdSteps, {
      props: {
        dot: true
      }
    })
    expect(wrapper.props('dot')).toBe(true)
  })

  test('自定义样式', async () => {
    const customClass = 'custom-steps'
    const customStyle = 'color: red;'
    const wrapper = mount(WdSteps, {
      props: {
        customClass,
        customStyle
      }
    })
    expect(wrapper.classes()).toContain(customClass)
    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  test('步骤渲染和活动状态', async () => {
    const wrapper = mount({
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps :active="1">
          <wd-step title="步骤1" description="描述1" />
          <wd-step title="步骤2" description="描述2" />
          <wd-step title="步骤3" description="描述3" />
        </wd-steps>
      `
    })

    const steps = wrapper.findAllComponents(WdStep)
    expect(steps).toHaveLength(3)
    expect(steps[0].props('title')).toBe('步骤1')
    expect(steps[1].props('title')).toBe('步骤2')
    expect(steps[2].props('title')).toBe('步骤3')

    // 验证描述
    expect(steps[0].props('description')).toBe('描述1')
    expect(steps[1].props('description')).toBe('描述2')
    expect(steps[2].props('description')).toBe('描述3')

    // 验证活动状态
    const stepsComponent = wrapper.findComponent(WdSteps)
    expect(stepsComponent.props('active')).toBe(1)
  })
})
