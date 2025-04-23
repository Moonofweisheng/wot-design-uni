/*
 * @Author: weisheng
 * @Date: 2025-04-10 15:47:32
 * @LastEditTime: 2025-04-14 13:10:51
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/tests/components/wd-steps.test.ts
 * 记得注释
 */
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

  test('自定义样式', async () => {
    const customClass = 'custom-steps'
    const wrapper = mount(WdSteps, {
      props: {
        customClass
      }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  test('步骤渲染', async () => {
    const wrapper = mount({
      components: {
        WdSteps,
        WdStep
      },
      template: `
        <wd-steps>
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
  })
})
