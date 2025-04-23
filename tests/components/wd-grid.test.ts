import { mount } from '@vue/test-utils'
import WdGrid from '@/uni_modules/wot-design-uni/components/wd-grid/wd-grid.vue'
import WdGridItem from '@/uni_modules/wot-design-uni/components/wd-grid-item/wd-grid-item.vue'
import { describe, test, expect } from 'vitest'

describe('WdGrid', () => {
  // 测试基本渲染
  test('renders grid with default props', () => {
    const wrapper = mount(WdGrid)
    expect(wrapper.classes()).toContain('wd-grid')
  })

  // 测试列数设置
  test('renders with custom column count', () => {
    const column = 4
    const wrapper = mount(WdGrid, {
      props: { column }
    })
    expect(wrapper.vm.column).toBe(column)
  })

  // 测试格子间距
  test('renders with custom gutter', () => {
    const gutter = 16
    const wrapper = mount(WdGrid, {
      props: { gutter }
    })
    expect(wrapper.vm.gutter).toBe(gutter)
  })

  // 测试边框
  test('renders with border', () => {
    const wrapper = mount(WdGrid, {
      props: { border: true }
    })
    expect(wrapper.classes()).toContain('is-border')
  })

  // 测试格子点击
  test('handles grid item click', async () => {
    const wrapper = mount({
      components: {
        WdGrid,
        WdGridItem
      },
      template: `
        <wd-grid>
          <wd-grid-item>格子1</wd-grid-item>
          <wd-grid-item>格子2</wd-grid-item>
        </wd-grid>
      `
    })

    const gridItem = wrapper.findComponent(WdGridItem)
    await gridItem.trigger('click')
    expect(gridItem.emitted('click')).toBeTruthy()
  })

  // 测试格子链接
  test('renders grid item with link', () => {
    const wrapper = mount({
      components: {
        WdGrid,
        WdGridItem
      },
      template: `
        <wd-grid>
          <wd-grid-item url="/page">链接格子</wd-grid-item>
        </wd-grid>
      `
    })

    const gridItem = wrapper.findComponent(WdGridItem)
    expect(gridItem.vm.url).toBe('/page')
  })

  // 测试格子图标
  test('renders grid item with icon', () => {
    const wrapper = mount({
      components: {
        WdGrid,
        WdGridItem
      },
      template: `
        <wd-grid>
          <wd-grid-item icon="setting">图标格子</wd-grid-item>
        </wd-grid>
      `
    })

    const gridItem = wrapper.findComponent(WdGridItem)
    expect(gridItem.vm.icon).toBe('setting')
  })

  // 测试格子插槽
  test('renders grid item slots', () => {
    const wrapper = mount({
      components: {
        WdGrid,
        WdGridItem
      },
      template: `
        <wd-grid>
          <wd-grid-item>
            <template #icon>自定义图标</template>
            <template #text>自定义文本</template>
          </wd-grid-item>
        </wd-grid>
      `
    })

    expect(wrapper.html()).toContain('自定义图标')
    expect(wrapper.html()).toContain('自定义文本')
  })

  // 测试正方形格子
  test('renders square grid items', () => {
    const wrapper = mount(WdGrid, {
      props: { square: true },
      slots: {
        default: '<wd-grid-item>方形格子</wd-grid-item>'
      }
    })
    expect(wrapper.classes()).toContain('is-square')
  })

  // 测试自定义类名
  test('applies custom class', () => {
    const customClass = 'custom-grid'
    const wrapper = mount(WdGrid, {
      props: { customClass }
    })
    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试自定义样式
  test('applies custom style', () => {
    const customStyle = 'padding: 10px;'
    const wrapper = mount(WdGrid, {
      props: { customStyle }
    })
    expect(wrapper.attributes('style')).toContain(customStyle)
  })

  // 测试格子间的边框处理
  test('handles border between items', () => {
    const wrapper = mount({
      components: {
        WdGrid,
        WdGridItem
      },
      template: `
        <wd-grid :column="2" border>
          <wd-grid-item>格子1</wd-grid-item>
          <wd-grid-item>格子2</wd-grid-item>
          <wd-grid-item>格子3</wd-grid-item>
          <wd-grid-item>格子4</wd-grid-item>
        </wd-grid>
      `
    })

    const gridItems = wrapper.findAllComponents(WdGridItem)
    expect(gridItems).toHaveLength(4)
    expect(wrapper.classes()).toContain('is-border')
  })
})
