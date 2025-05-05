import { mount } from '@vue/test-utils'
import WdIndexBar from '@/uni_modules/wot-design-uni/components/wd-index-bar/wd-index-bar.vue'
import WdIndexAnchor from '@/uni_modules/wot-design-uni/components/wd-index-anchor/wd-index-anchor.vue'
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

describe('WdIndexBar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('基本渲染', () => {
    const wrapper = mount(WdIndexBar)
    expect(wrapper.classes()).toContain('wd-index-bar')
  })

  test('渲染带有索引锚点的索引栏', async () => {
    const wrapper = mount({
      template: `
        <wd-index-bar>
          <wd-index-anchor index="A">标题A</wd-index-anchor>
          <view>内容A</view>
          <wd-index-anchor index="B">标题B</wd-index-anchor>
          <view>内容B</view>
          <wd-index-anchor index="C">标题C</wd-index-anchor>
          <view>内容C</view>
        </wd-index-bar>
      `,
      components: {
        WdIndexBar,
        WdIndexAnchor
      }
    })

    await nextTick()

    // 前进 100ms，让 init 函数中的 setTimeout 执行完毕
    vi.advanceTimersByTime(100)
    await nextTick()

    // 检查索引锚点是否正确渲染
    const anchors = wrapper.findAllComponents(WdIndexAnchor)
    expect(anchors.length).toBe(3)

    // 检查索引锚点的内容
    expect(anchors[0].text()).toBe('标题A')
    expect(anchors[1].text()).toBe('标题B')
    expect(anchors[2].text()).toBe('标题C')

    // 检查索引锚点的 index 属性
    expect(anchors[0].props('index')).toBe('A')
    expect(anchors[1].props('index')).toBe('B')
    expect(anchors[2].props('index')).toBe('C')
  })

  test('自定义高亮颜色', () => {
    const highlightColor = '#ff0000'
    const wrapper = mount(WdIndexBar, {
      attrs: {
        style: `--index-bar-highlight-color: ${highlightColor}`
      }
    })

    // 检查 style 属性是否包含高亮颜色
    expect(wrapper.attributes('style')).toContain(`--index-bar-highlight-color: ${highlightColor}`)
  })

  test('粘性定位属性', () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        sticky: true
      }
    })

    // 检查 sticky 属性是否正确设置
    expect(wrapper.props('sticky')).toBe(true)
  })

  test('触发滚动事件', async () => {
    const wrapper = mount({
      template: `
        <wd-index-bar>
          <wd-index-anchor index="A">标题A</wd-index-anchor>
          <view>内容A</view>
          <wd-index-anchor index="B">标题B</wd-index-anchor>
          <view>内容B</view>
        </wd-index-bar>
      `,
      components: {
        WdIndexBar,
        WdIndexAnchor
      }
    })

    await nextTick()

    // 前进 100ms，让 init 函数中的 setTimeout 执行完毕
    vi.advanceTimersByTime(100)
    await nextTick()

    // 模拟滚动事件
    const scrollView = wrapper.find('.wd-index-bar__content')
    await scrollView.trigger('scroll', {
      detail: { scrollTop: 150 }
    })

    // 验证滚动视图存在
    expect(scrollView.exists()).toBe(true)
  })

  test('触发触摸事件', async () => {
    const wrapper = mount({
      template: `
        <wd-index-bar>
          <wd-index-anchor index="A">标题A</wd-index-anchor>
          <view>内容A</view>
          <wd-index-anchor index="B">标题B</wd-index-anchor>
          <view>内容B</view>
        </wd-index-bar>
      `,
      components: {
        WdIndexBar,
        WdIndexAnchor
      }
    })

    await nextTick()

    // 前进 100ms，让 init 函数中的 setTimeout 执行完毕
    vi.advanceTimersByTime(100)
    await nextTick()

    // 获取侧边栏元素
    const sidebar = wrapper.find('.wd-index-bar__sidebar')

    // 模拟触摸事件
    await sidebar.trigger('touchstart')
    await sidebar.trigger('touchmove', {
      touches: [{ pageY: 124 }]
    })
    await sidebar.trigger('touchend', {
      changedTouches: [{ pageY: 124 }]
    })

    // 等待 pause 函数执行完毕
    vi.advanceTimersByTime(100)
    await nextTick()

    // 验证侧边栏存在
    expect(sidebar.exists()).toBe(true)
  })
})
