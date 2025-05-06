import '../mocks/wd-transition.mock'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import WdDropMenu from '@/uni_modules/wot-design-uni/components/wd-drop-menu/wd-drop-menu.vue'
import WdDropMenuItem from '@/uni_modules/wot-design-uni/components/wd-drop-menu-item/wd-drop-menu-item.vue'
import WdPopup from '@/uni_modules/wot-design-uni/components/wd-popup/wd-popup.vue'
import WdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import WdOverlay from '@/uni_modules/wot-design-uni/components/wd-overlay/wd-overlay.vue'
import { nextTick } from 'vue'

const globalComponents = {
  WdDropMenu,
  WdDropMenuItem,
  WdPopup,
  WdIcon,
  WdOverlay
}

describe('WdDropMenu 和 WdDropMenuItem 集成测试', () => {
  test('基本渲染和结构', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" />
          <wd-drop-menu-item v-model="value2" :options="options2" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [
              { label: '全部商品', value: 0 },
              { label: '新款商品', value: 1 },
              { label: '活动商品', value: 2 }
            ],
            value2: 'a',
            options2: [
              { label: '默认排序', value: 'a' },
              { label: '好评排序', value: 'b' },
              { label: '销量排序', value: 'c' }
            ]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.wd-drop-menu').exists()).toBe(true)
    const items = wrapper.findAllComponents(WdDropMenuItem)
    expect(items.length).toBe(2)
    expect(wrapper.findAll('.wd-drop-menu__item').length).toBe(2)
    const titles = wrapper.findAll('.wd-drop-menu__item-title-text')
    expect(titles[0].text()).toBe('全部商品')
    expect(titles[1].text()).toBe('默认排序')
  })

  test('WdDropMenuItem 禁用状态', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" disabled />
          <wd-drop-menu-item v-model="value2" :options="options2" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }],
            value2: 'a',
            options2: [{ label: '默认排序', value: 'a' }]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )
    await wrapper.vm.$nextTick()
    const items = wrapper.findAll('.wd-drop-menu__item')

    expect(items[0].classes()).toContain('is-disabled')
    expect(items[1].classes()).not.toContain('is-disabled')

    await items[0].trigger('click')
    const dropMenuItems = wrapper.findAllComponents(WdDropMenuItem)
    expect(dropMenuItems[0].findComponent(WdPopup).exists()).toBe(false)
    await items[1].trigger('click')
    expect(dropMenuItems[1].findComponent(WdPopup).exists()).toBe(true)
    expect(dropMenuItems[1].findComponent(WdPopup).props('modelValue')).toBe(true)
  })

  test('菜单项自定义标题 (title prop)', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" title="自定义标题" :options="options1" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.wd-drop-menu__item-title-text').text()).toBe('自定义标题')
  })

  test('点击菜单标题展开/收起菜单项', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu :duration="0">
          <wd-drop-menu-item v-model="value1" :options="options1" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [
              { label: '全部商品', value: 0 },
              { label: '新款商品', value: 1 }
            ]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    const menuItemTitle = wrapper.find('.wd-drop-menu__item')
    expect(wrapper.findComponent(WdPopup).exists()).toBe(false)
    await menuItemTitle.trigger('click')
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(true)
    await menuItemTitle.trigger('click')
    expect(wrapper.findComponent(WdPopup).exists() && wrapper.findComponent(WdPopup).props('modelValue')).toBe(false)
  })

  test('菜单项展开收起事件 (open/close)', async () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" @open="onOpen" @close="onClose" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }]
          }
        },
        methods: {
          onOpen,
          onClose
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    const menuItemTitle = wrapper.find('.wd-drop-menu__item')

    await menuItemTitle.trigger('click')

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()

    await nextTick()
    const menuOptions = wrapper.findComponent(WdDropMenuItem).findAll('.wd-drop-item__option')

    await menuOptions[0].trigger('click')
    await nextTick()
    expect(onOpen).toHaveBeenCalledTimes(1) // Should not be called again
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('切换菜单项选项触发 change 和 update:modelValue 事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" @change="onChange" :duration="0" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [
              { label: '全部商品', value: 0 },
              { label: '新款商品', value: 1 },
              { label: '活动商品', value: 2 }
            ]
          }
        },
        methods: {
          onChange
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    const menuItemTitle = wrapper.find('.wd-drop-menu__item')
    await menuItemTitle.trigger('click') // Open the menu
    await nextTick()
    const options = wrapper.findAll('.wd-drop-item__option')
    expect(options.length).toBe(3)
    await options[1].trigger('click')
    await nextTick()

    const itemEmitted = wrapper.findComponent(WdDropMenuItem).emitted()
    expect(itemEmitted['update:modelValue']).toBeTruthy()
    expect(itemEmitted['update:modelValue'][0]).toEqual([1]) // Check v-model update

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ value: 1, selectedItem: { label: '新款商品', value: 1 } })

    expect(menuItemTitle.text()).toBe('新款商品')
    await nextTick()

    expect(wrapper.findComponent(WdPopup).exists() && wrapper.findComponent(WdPopup).props('modelValue')).toBe(false)
  })

  test('菜单项 beforeToggle 钩子', async () => {
    const beforeToggle = vi.fn(({ status, resolve }) => {
      // console.log('beforeToggle called with status:', status)
      if (status) {
        // 只允许打开
        resolve(true)
      } else {
        // console.log('Preventing close')
        resolve(false) // 阻止关闭
      }
    })
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" :before-toggle="beforeToggle" :duration="0" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }]
          }
        },
        methods: {
          beforeToggle
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    const menuItemTitle = wrapper.find('.wd-drop-menu__item')
    await menuItemTitle.trigger('click')
    await nextTick()
    expect(beforeToggle).toHaveBeenCalledWith(expect.objectContaining({ status: true }))
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(true)

    await menuItemTitle.trigger('click')
    await nextTick()
    expect(beforeToggle).toHaveBeenCalledWith(expect.objectContaining({ status: false }))
    // 由于 beforeToggle 解析为 false，应保持打开状态
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    expect(wrapper.findComponent(WdPopup).props('modelValue')).toBe(true)
  })

  test('菜单项自定义图标 (icon-name 和 options.icon)', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" icon="star" :duration="0" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [
              { label: '全部商品', value: 0 }, // 选项图标
              { label: '新款商品', value: 1 }
            ]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.wd-drop-menu__item .wd-icon-star').exists()).toBe(true)

    // 打开菜单并检查选项图标
    await wrapper.find('.wd-drop-menu__item').trigger('click')
    await nextTick()
    const options = wrapper.findAll('.wd-drop-item__option')
    expect(options[1].find('.wd-icon').exists()).toBe(false)
  })

  test('切换不同菜单项时关闭其他菜单项', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" :duration="0" />
          <wd-drop-menu-item v-model="value2" :options="options2" :duration="0" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }],
            value2: 'a',
            options2: [{ label: '默认排序', value: 'a' }]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )
    await wrapper.vm.$nextTick()
    const titles = wrapper.findAll('.wd-drop-menu__item')
    const items = wrapper.findAllComponents(WdDropMenuItem)

    // Open first item
    await titles[0].trigger('click')
    await nextTick()
    expect(items[0].findComponent(WdPopup).exists()).toBe(true)
    expect(items[1].findComponent(WdPopup).exists()).toBe(false)

    await titles[1].trigger('click')
    await nextTick()
    expect(items[0].findComponent(WdPopup).exists() && items[0].findComponent(WdPopup).props('modelValue')).toBe(false)
    expect(items[1].findComponent(WdPopup).exists()).toBe(true)
  })

  test('点击遮罩层关闭菜单', async () => {
    const wrapper = mount(
      {
        template: `
        <wd-drop-menu>
          <wd-drop-menu-item v-model="value1" :options="options1" :duration="0" />
        </wd-drop-menu>
      `,
        data() {
          return {
            value1: 0,
            options1: [{ label: '全部商品', value: 0 }]
          }
        }
      },
      {
        global: {
          components: globalComponents
        }
      }
    )

    await wrapper.vm.$nextTick()
    await wrapper.find('.wd-drop-menu__item').trigger('click')
    await nextTick()
    expect(wrapper.findComponent(WdPopup).exists()).toBe(true)
    const overlay = wrapper.find('.wd-overlay')
    expect(overlay.exists()).toBe(true)
    await overlay.trigger('click')
    await nextTick()
    expect(wrapper.findComponent(WdPopup).exists() && wrapper.findComponent(WdPopup).props('modelValue')).toBe(false)
  })
})
