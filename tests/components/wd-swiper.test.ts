import { mount } from '@vue/test-utils'
import WdSwiper from '@/uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.vue'
import { describe, expect, test } from 'vitest'

describe('WdSwiper', () => {
  test('基本渲染', async () => {
    const wrapper = mount(WdSwiper)
    expect(wrapper.classes()).toContain('wd-swiper')
  })

  test('轮播项渲染', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }, { image: 'image3.jpg' }]
      }
    })
    const items = wrapper.findAll('.wd-swiper-item')
    expect(items.length).toBe(3)
  })

  test('自动播放', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        autoplay: true,
        interval: 3000,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      }
    })
    expect(wrapper.vm.autoplay).toBe(true)
    expect(wrapper.vm.interval).toBe(3000)
  })

  test('指示器显示', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        showIndicator: true,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      }
    })
    expect(wrapper.find('.wd-swiper__indicators').exists()).toBeTruthy()
    const indicators = wrapper.findAll('.wd-swiper__indicator')
    expect(indicators.length).toBe(2)
  })

  test('垂直方向', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        vertical: true,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      }
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  test('循环播放', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        loop: true,
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      }
    })
    expect(wrapper.vm.loop).toBe(true)
  })

  test('切换事件', async () => {
    const wrapper = mount(WdSwiper, {
      props: {
        list: [{ image: 'image1.jpg' }, { image: 'image2.jpg' }]
      }
    })
    await wrapper.vm.$emit('change', 1)
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })
})
