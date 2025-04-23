import { mount } from '@vue/test-utils'
import WdIndexBar from '../../src/uni_modules/wot-design-uni/components/wd-index-bar/wd-index-bar.vue'
import { describe, expect, test } from 'vitest'

describe('WdIndexBar', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: ''
      }
    })

    expect(wrapper.classes()).toContain('wd-index-bar')
  })

  test('自定义索引列表', async () => {
    const indexList = ['A', 'B', 'C']
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: '',
        indexList
      }
    })

    const indexes = wrapper.findAll('.wd-index-bar__index')
    expect(indexes.length).toBe(indexList.length)
    indexes.forEach((index, i) => {
      expect(index.text()).toBe(indexList[i])
    })
  })

  test('点击索引事件', async () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('click-index', 'A')
    expect(wrapper.emitted('click-index')).toBeTruthy()
    expect(wrapper.emitted('click-index')![0]).toEqual(['A'])
  })

  test('滚动事件', async () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.vm.$emit('change', 'B')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual(['B'])
  })

  test('自定义高亮颜色', async () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: '',
        highlightColor: '#ff0000'
      }
    })

    expect(wrapper.attributes('style')).toContain('--index-bar-highlight-color: #ff0000')
  })

  test('禁用状态', async () => {
    const wrapper = mount(WdIndexBar, {
      props: {
        modelValue: '',
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('is-disabled')
  })
})
