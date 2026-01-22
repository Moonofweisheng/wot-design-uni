import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import WdPuzzleCaptcha from '@/uni_modules/wot-design-uni/components/wd-puzzle-captcha/wd-puzzle-captcha.vue'

describe('WdPuzzleCaptcha', () => {
  test('基本渲染', () => {
    const wrapper = mount(WdPuzzleCaptcha, {
      props: {
        imageUrl: 'https://picsum.photos/320/200'
      }
    })
    expect(wrapper.classes()).toContain('wd-puzzle-captcha')
  })
})
