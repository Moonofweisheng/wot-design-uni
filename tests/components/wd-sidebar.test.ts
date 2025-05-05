import { mount } from '@vue/test-utils'
import WdSidebar from '@/uni_modules/wot-design-uni/components/wd-sidebar/wd-sidebar.vue'
import { describe, expect, test, vi } from 'vitest'

describe('侧边栏组件', () => {
  describe('WdSidebar 组件', () => {
    test('基本渲染', async () => {
      const wrapper = mount(WdSidebar)
      expect(wrapper.classes()).toContain('wd-sidebar')
    })

    test('自定义样式', async () => {
      const wrapper = mount(WdSidebar, {
        props: {
          customClass: 'custom-sidebar',
          customStyle: 'background: red;'
        }
      })
      expect(wrapper.classes()).toContain('custom-sidebar')
      expect(wrapper.attributes('style')).toBe('background: red;')
    })

    test('自定义内容', async () => {
      const wrapper = mount(WdSidebar, {
        slots: {
          default: '<div class="custom-content">自定义内容</div>'
        }
      })
      expect(wrapper.find('.custom-content').exists()).toBeTruthy()
      expect(wrapper.find('.custom-content').text()).toBe('自定义内容')
    })

    test('触发更新事件', async () => {
      const wrapper = mount(WdSidebar)

      // 手动调用 setChange 方法
      await (wrapper.vm as any).setChange(2, '选项3')

      // 验证事件
      const emitted = wrapper.emitted() as Record<string, any[]>
      expect(emitted['update:modelValue']).toBeTruthy()
      expect(emitted['update:modelValue'][0]).toEqual([2])
      expect(emitted['change']).toBeTruthy()
      expect(emitted['change'][0][0]).toEqual({ value: 2, label: '选项3' })
    })

    test('使用 beforeChange 钩子', async () => {
      const beforeChange = vi.fn(({ resolve }: { resolve: (pass: boolean) => void }) => {
        resolve(true)
      })

      const wrapper = mount(WdSidebar, {
        props: {
          beforeChange
        }
      })

      // 手动调用 setChange 方法
      await (wrapper.vm as any).setChange(2, '选项3')

      // 验证 beforeChange 被调用
      expect(beforeChange).toHaveBeenCalled()

      // 验证事件
      const emitted = wrapper.emitted() as Record<string, any[]>
      expect(emitted['update:modelValue']).toBeTruthy()
      expect(emitted['update:modelValue'][0]).toEqual([2])
    })
  })

  describe('WdSidebar 和 WdSidebarItem 组合使用', () => {
    test('渲染侧边栏和侧边栏项', () => {
      // 创建一个简化版的 SidebarItem 组件
      const MockSidebarItem = {
        name: 'WdSidebarItem',
        template: `
          <div class="wd-sidebar-item">
            {{ label }}
          </div>
        `,
        props: {
          label: String,
          value: [Number, String],
          disabled: Boolean
        }
      }

      const wrapper = mount(WdSidebar, {
        props: {
          modelValue: 1
        },
        slots: {
          default: `
            <mock-sidebar-item label="选项1" :value="0"></mock-sidebar-item>
            <mock-sidebar-item label="选项2" :value="1"></mock-sidebar-item>
            <mock-sidebar-item label="选项3" :value="2"></mock-sidebar-item>
          `
        },
        global: {
          components: {
            MockSidebarItem
          }
        }
      })

      // 检查侧边栏是否存在
      expect(wrapper.classes()).toContain('wd-sidebar')

      // 检查侧边栏项是否存在
      const items = wrapper.findAll('.wd-sidebar-item')
      expect(items.length).toBe(3)

      // 检查标签文本
      expect(items[0].text()).toBe('选项1')
      expect(items[1].text()).toBe('选项2')
      expect(items[2].text()).toBe('选项3')
    })
  })
})
