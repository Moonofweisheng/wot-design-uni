import { mount } from '@vue/test-utils'
import WdLoadmore from '../../src/uni_modules/wot-design-uni/components/wd-loadmore/wd-loadmore.vue'
import { describe, expect, test } from 'vitest'

describe('WdLoadmore', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdLoadmore)
    expect(wrapper.classes()).toContain('wd-loadmore')
  })

  test('加载中状态', async () => {
    const wrapper = mount(WdLoadmore, {
      props: {
        state: 'loading',
        loadingText: '加载中...'
      }
    })
    expect(wrapper.find('.wd-loadmore__loading').exists()).toBeTruthy()
    expect(wrapper.find('.wd-loadmore__text').text()).toBe('加载中...')
  })

  test('完成状态', async () => {
    const wrapper = mount(WdLoadmore, {
      props: {
        state: 'finished',
        finishedText: '没有更多了'
      }
    })
    expect(wrapper.find('.wd-divider').exists()).toBeTruthy()
    expect(wrapper.text()).toContain('没有更多了')
  })

  test('错误状态', async () => {
    const wrapper = mount(WdLoadmore, {
      props: {
        state: 'error',
        errorText: '加载失败'
      }
    })
    expect(wrapper.find('.wd-loadmore__refresh').exists()).toBeTruthy()
    expect(wrapper.find('.wd-loadmore__text').text()).toBe('加载失败')
  })

  test('自定义样式', async () => {
    const customClass = 'custom-loadmore'
    const customStyle = 'color: red;'
    const wrapper = mount(WdLoadmore, {
      props: {
        customClass,
        customStyle
      }
    })
    expect(wrapper.classes()).toContain(customClass)
    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  test('重新加载事件', async () => {
    const wrapper = mount(WdLoadmore, {
      props: {
        state: 'error'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('reload')).toBeTruthy()
  })

  test('自定义loading属性', async () => {
    const wrapper = mount(WdLoadmore, {
      props: {
        state: 'loading',
        loadingProps: {
          color: 'red',
          size: '20px'
        }
      }
    })
    const loading = wrapper.find('.wd-loadmore__loading')
    expect(loading.exists()).toBeTruthy()
    expect(loading.attributes('style')).toContain('color: red')
    expect(loading.attributes('style')).toContain('size: 20px')
  })
})
