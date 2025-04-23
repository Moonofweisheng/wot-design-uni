import { mount } from '@vue/test-utils'
import WdPopover from '../../src/uni_modules/wot-design-uni/components/wd-popover/wd-popover.vue'
import { describe, expect, test } from 'vitest'

describe('WdPopover', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdPopover)
    expect(wrapper.classes()).toContain('wd-popover')
  })

  test('显示状态', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.find('.wd-popover__container').exists()).toBeTruthy()
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.vm.showPopover).toBeFalsy()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toEqual({ show: false })
  })

  test('内容显示 - 普通模式', async () => {
    const content = '这是弹出内容'
    const wrapper = mount(WdPopover, {
      props: {
        content,
        modelValue: true,
        mode: 'normal'
      }
    })
    expect(wrapper.find('.wd-popover__inner').text()).toBe(content)
  })

  test('菜单模式', async () => {
    const content = [
      { content: '选项1', iconClass: 'read' },
      { content: '选项2', iconClass: 'delete' }
    ]
    const wrapper = mount(WdPopover, {
      props: {
        content,
        mode: 'menu',
        modelValue: true
      }
    })
    expect(wrapper.find('.wd-popover__menu').exists()).toBeTruthy()
    const menuItems = wrapper.findAll('.wd-popover__menu-inner')
    expect(menuItems.length).toBe(2)
    expect(menuItems[0].find('.wd-popover__icon').exists()).toBeTruthy()
    expect(menuItems[0].text()).toBe('选项1')
    await menuItems[0].trigger('click')
    expect(wrapper.emitted('menuclick')).toBeTruthy()
    expect(wrapper.emitted('menuclick')[0][0].index).toBe(0)
    expect(wrapper.emitted('menuclick')[0][0].item).toEqual(content[0])
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
  })

  test('位置设置', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        placement: 'top',
        modelValue: true
      }
    })
    // 初始化后，popover.arrowClass会被设置为对应的位置类名
    expect(wrapper.vm.popover.arrowClass.value).toContain('top')
  })

  test('偏移设置', async () => {
    const offset = 10
    const wrapper = mount(WdPopover, {
      props: {
        offset,
        modelValue: true
      }
    })
    // 初始化后，popover.control会被调用，设置偏移量
    expect(wrapper.vm.popover.offset).toBe(offset)
  })

  test('箭头显示控制', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        visibleArrow: false,
        modelValue: true
      }
    })
    expect(wrapper.find('.wd-popover__arrow').exists()).toBeFalsy()
  })

  test('点击触发', async () => {
    const wrapper = mount(WdPopover)
    await wrapper.find('.wd-popover__target').trigger('click')
    expect(wrapper.emitted('open')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        disabled: true
      }
    })
    await wrapper.find('.wd-popover__target').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('自定义类名和样式', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        customClass: 'custom-popover',
        customStyle: 'background: red;'
      }
    })
    expect(wrapper.classes()).toContain('custom-popover')
    expect(wrapper.attributes('style')).toBe('background: red;')
  })

  test('自定义箭头和弹出层类名', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        customArrow: 'custom-arrow',
        customPop: 'custom-pop',
        modelValue: true
      }
    })
    expect(wrapper.find('.wd-popover__arrow').classes()).toContain('custom-arrow')
    expect(wrapper.find('.wd-popover__container').classes()).toContain('custom-pop')
  })

  test('默认插槽内容', async () => {
    const wrapper = mount(WdPopover, {
      slots: {
        default: '<div class="custom-content">自定义内容</div>'
      },
      props: {
        modelValue: true
      }
    })
    expect(wrapper.find('.custom-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
  })

  test('内容插槽', async () => {
    const wrapper = mount(WdPopover, {
      slots: {
        content: '<div class="custom-slot-content">自定义内容插槽</div>'
      },
      props: {
        useContentSlot: true,
        modelValue: true
      }
    })
    expect(wrapper.find('.custom-slot-content').exists()).toBeTruthy()
    expect(wrapper.find('.custom-slot-content').text()).toBe('自定义内容插槽')
  })

  test('关闭事件', async () => {
    const wrapper = mount(WdPopover, {
      props: {
        modelValue: true,
        showClose: true
      }
    })
    await wrapper.find('.wd-popover__close-icon').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
  })

  test('暴露的方法', async () => {
    const wrapper = mount(WdPopover)
    wrapper.vm.open()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)

    wrapper.vm.close()
    expect(wrapper.emitted('update:modelValue')[1][0]).toBe(false)
  })
})
