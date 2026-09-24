import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import WdPuzzleCaptcha from '@/uni_modules/wot-design-uni/components/wd-puzzle-captcha/wd-puzzle-captcha.vue'
import { wait } from '../utils'

describe('WdPuzzleCaptcha', () => {
  test('基本渲染', () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        imageUrl: 'https://picsum.photos/320/200'
      }
    })

    expect(wrapper.classes()).toContain('wd-puzzle-captcha')
    expect(wrapper.find('.wd-puzzle-captcha__header').exists()).toBe(true)
    expect(wrapper.find('.wd-puzzle-captcha__operation').exists()).toBe(true)
    expect(wrapper.find('.wd-puzzle-captcha__main').exists()).toBe(true)
    expect(wrapper.find('.wd-puzzle-captcha__footer').exists()).toBe(true)
  })

  test('自定义文案与尺寸', async () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        title: '自定义标题',
        placeholder: '自定义操作提示',
        imageUrl: 'https://picsum.photos/320/200',
        imageWidth: 360,
        imageHeight: 240,
        puzzleWidth: 50,
        puzzleHeight: 50
      }
    })

    expect(wrapper.find('.wd-puzzle-captcha__title').text()).toBe('自定义标题')
    expect(wrapper.find('.wd-puzzle-captcha__description').text()).toBe('自定义操作提示')

    await wait()

    const mainStyle = wrapper.find('.wd-puzzle-captcha__main').attributes('style')
    expect(mainStyle).toContain('width: 360px')
    expect(mainStyle).toContain('height: 240px')

    const puzzleStyle = wrapper.find('.wd-puzzle-captcha__puzzle').attributes('style')
    expect(puzzleStyle).toContain('width: 50px')
    expect(puzzleStyle).toContain('height: 50px')
  })

  test('刷新与关闭按钮触发事件', async () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        imageUrl: 'https://picsum.photos/320/200',
        refreshable: true,
        closable: true
      }
    })

    const actions = wrapper.findAll('.wd-puzzle-captcha__action')
    expect(actions.length).toBe(2)

    await wait()

    await actions[0].trigger('tap')
    expect(wrapper.emitted('update-image')).toBeTruthy()

    await actions[1].trigger('tap')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('禁用状态阻止拖动', async () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        imageUrl: 'https://picsum.photos/320/200',
        disabled: true
      }
    })

    await wait()

    const tracker = wrapper.find('.wd-puzzle-captcha__tracker')
    const initialStyle = tracker.attributes('style')

    await tracker.trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }]
    })
    await tracker.trigger('touchmove', {
      touches: [{ clientX: 120, clientY: 0 }]
    })

    expect(tracker.attributes('style')).toBe(initialStyle)
  })

  test('调用重置方法', async () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        imageUrl: 'https://picsum.photos/320/200'
      }
    })

    wrapper.vm.reset(true)

    expect(wrapper.emitted('update-image')).toBeTruthy()
  })
})
