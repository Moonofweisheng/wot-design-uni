import { mount } from '@vue/test-utils'
import WdRow from '@/uni_modules/wot-design-uni/components/wd-row/wd-row.vue'
import WdCol from '@/uni_modules/wot-design-uni/components/wd-col/wd-col.vue'
import { describe, test, expect } from 'vitest'

describe('布局组件', () => {
  describe('Row 行组件', () => {
    // 测试基本渲染
    test('使用默认属性渲染行', () => {
      const wrapper = mount(WdRow)
      expect(wrapper.classes()).toContain('wd-row')
    })

    // 测试栅格间隔
    test('渲染带间隔的行', () => {
      const gutter = 20
      const wrapper = mount(WdRow, {
        props: { gutter }
      })
      expect(wrapper.vm.gutter).toBe(gutter)
    })

    // 测试行样式计算
    test('计算行样式', () => {
      const gutter = 20
      const wrapper = mount(WdRow, {
        props: { gutter }
      })

      // 检查计算出的样式是否包含正确的边距
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left')
      expect(style).toContain('margin-right')
    })

    // 测试自定义类名
    test('应用自定义类名到行', () => {
      const customClass = 'custom-row'
      const wrapper = mount(WdRow, {
        props: { customClass }
      })
      expect(wrapper.classes()).toContain(customClass)
    })

    // 测试自定义样式
    test('应用自定义样式到行', () => {
      const customStyle = 'margin-bottom: 20px;'
      const wrapper = mount(WdRow, {
        props: { customStyle }
      })
      expect(wrapper.attributes('style')).toContain(customStyle)
    })

    // 测试默认插槽
    test('渲染行的默认插槽', () => {
      const wrapper = mount(WdRow, {
        slots: {
          default: '<div class="test-content">测试内容</div>'
        }
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
    })
  })

  describe('Col 列组件', () => {
    // 测试基本渲染
    test('使用默认属性渲染列', () => {
      const wrapper = mount(WdCol)
      expect(wrapper.classes()).toContain('wd-col')
    })

    // 测试栅格占据的列数
    test('渲染指定列宽的列', () => {
      const span = 12
      const wrapper = mount(WdCol, {
        props: { span }
      })
      expect(wrapper.classes()).toContain(`wd-col__${span}`)
    })

    // 测试栅格左侧的间隔格数
    test('渲染带偏移的列', () => {
      const offset = 4
      const wrapper = mount(WdCol, {
        props: { offset }
      })
      expect(wrapper.classes()).toContain(`wd-col__offset-${offset}`)
    })

    // 测试自定义类名
    test('应用自定义类名到列', () => {
      const customClass = 'custom-col'
      const wrapper = mount(WdCol, {
        props: { customClass }
      })
      expect(wrapper.classes()).toContain(customClass)
    })

    // 测试自定义样式
    test('应用自定义样式到列', () => {
      const customStyle = 'background: #f5f5f5;'
      const wrapper = mount(WdCol, {
        props: { customStyle }
      })
      expect(wrapper.attributes('style')).toContain('background:')
    })

    // 测试默认插槽
    test('渲染列的默认插槽', () => {
      const wrapper = mount(WdCol, {
        slots: {
          default: '<div class="test-content">列内容</div>'
        }
      })
      expect(wrapper.find('.test-content').exists()).toBe(true)
    })

    // 测试组合使用各种属性
    test('渲染组合属性的列', () => {
      const wrapper = mount(WdCol, {
        props: {
          span: 12,
          offset: 2,
          customStyle: 'margin: 10px;'
        }
      })
      expect(wrapper.classes()).toContain('wd-col__12')
      expect(wrapper.classes()).toContain('wd-col__offset-2')
      expect(wrapper.attributes('style')).toContain('margin: 10px;')
    })
  })

  describe('Row 和 Col 组合使用', () => {
    // 测试配合Col使用
    test('行和列组件一起使用', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="12">col-12</wd-col>
            <wd-col :span="12">col-12</wd-col>
          </wd-row>
        `
      })

      expect(wrapper.findAllComponents(WdCol)).toHaveLength(2)
    })

    // 测试间隔对子组件的影响
    test('行的间隔影响列组件', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="12" />
            <wd-col :span="12" />
          </wd-row>
        `
      })

      // 检查是否找到了两个 WdCol 组件
      const cols = wrapper.findAllComponents(WdCol)
      expect(cols.length).toBe(2)
    })

    // 测试响应式布局
    test('渲染响应式布局', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row>
            <wd-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" />
          </wd-row>
        `
      })

      const col = wrapper.findComponent(WdCol)
      expect(col.exists()).toBe(true)
    })

    // 测试复杂布局
    test('渲染复杂布局', () => {
      const wrapper = mount({
        components: {
          WdRow,
          WdCol
        },
        template: `
          <wd-row :gutter="20">
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
            <wd-col :span="6">col-6</wd-col>
          </wd-row>
          <wd-row :gutter="20">
            <wd-col :span="8">col-8</wd-col>
            <wd-col :span="8">col-8</wd-col>
            <wd-col :span="8">col-8</wd-col>
          </wd-row>
          <wd-row :gutter="20">
            <wd-col :span="12">col-12</wd-col>
            <wd-col :span="12">col-12</wd-col>
          </wd-row>
        `
      })

      const rows = wrapper.findAllComponents(WdRow)
      expect(rows.length).toBe(3)

      const cols = wrapper.findAllComponents(WdCol)
      expect(cols.length).toBe(9)
    })
  })
})
