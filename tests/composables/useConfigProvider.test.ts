import { describe, test, expect } from 'vitest'
import { ref, reactive, nextTick, defineComponent, inject, h } from 'vue'
import { mount } from '@vue/test-utils'
import { useConfigProvider, USE_CONFIG_PROVIDER_KEY } from '@/uni_modules/wot-design-uni/components/composables/useConfigProvider'

const ChildComponent = defineComponent({
  setup() {
    const provider = inject(USE_CONFIG_PROVIDER_KEY) as any
    return { provider }
  },
  render() {
    return h('div', { class: 'child' }, this.provider?.themeStyle?.value)
  }
})

describe('useConfigProvider', () => {
  test('should work with plain object', () => {
    const themeVars = { colorTheme: 'red' }
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-color-theme:red')
  })

  test('should work with reactive object', async () => {
    const themeVars = reactive({ colorTheme: 'red' })
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
        return { themeVars }
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-color-theme:red')

    themeVars.colorTheme = 'blue'
    await nextTick()
    expect(wrapper.find('.child').text()).toContain('--wot-color-theme:blue')
  })

  test('should work with ref', async () => {
    const themeVars = ref({ colorTheme: 'red' })
    const Wrapper = defineComponent({
      setup() {
        useConfigProvider({ themeVars })
        return { themeVars }
      },
      render() {
        return h(ChildComponent)
      }
    })

    const wrapper = mount(Wrapper)
    expect(wrapper.find('.child').text()).toContain('--wot-color-theme:red')

    themeVars.value = { colorTheme: 'green' }
    await nextTick()
    expect(wrapper.find('.child').text()).toContain('--wot-color-theme:green')
  })
})
