import { mount } from '@vue/test-utils'
import WdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
import wdIcon from '@/uni_modules/wot-design-uni/components/wd-icon/wd-icon.vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { ButtonSize, ButtonType, ButtonOpenType, ButtonLang, ButtonScope } from '@/uni_modules/wot-design-uni/components/wd-button/types'

describe('WdButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdButton)

    expect(wrapper.classes()).toContain('wd-button')
    expect(wrapper.classes()).toContain('is-primary')
    expect(wrapper.classes()).toContain('is-medium')
    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试按钮类型
  test('不同按钮类型', () => {
    const types: ButtonType[] = ['primary', 'success', 'info', 'warning', 'error', 'default', 'text', 'icon']

    types.forEach((type) => {
      const wrapper = mount(WdButton, {
        props: { type }
      })

      expect(wrapper.classes()).toContain(`is-${type}`)
    })
  })

  // 测试按钮尺寸
  test('不同按钮尺寸', () => {
    const sizes: ButtonSize[] = ['small', 'medium', 'large']

    sizes.forEach((size) => {
      const wrapper = mount(WdButton, {
        props: { size }
      })

      expect(wrapper.classes()).toContain(`is-${size}`)
    })
  })

  // 测试朴素按钮
  test('朴素按钮', () => {
    const wrapper = mount(WdButton, {
      props: { plain: true }
    })

    expect(wrapper.classes()).toContain('is-plain')
  })

  // 测试圆角按钮
  test('圆角按钮', () => {
    const wrapper = mount(WdButton, {
      props: { round: true }
    })

    expect(wrapper.classes()).toContain('is-round')
  })

  // 测试细边框按钮
  test('细边框按钮', () => {
    const wrapper = mount(WdButton, {
      props: { hairline: true }
    })

    expect(wrapper.classes()).toContain('is-hairline')
  })

  // 测试块级按钮
  test('块级按钮', () => {
    const wrapper = mount(WdButton, {
      props: { block: true }
    })

    expect(wrapper.classes()).toContain('is-block')
  })

  // 测试禁用状态
  test('禁用按钮', async () => {
    const wrapper = mount(WdButton, {
      props: { disabled: true }
    })

    expect(wrapper.classes()).toContain('is-disabled')

    // 点击禁用按钮不应该触发事件
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试加载状态
  test('加载状态', async () => {
    const wrapper = mount(WdButton, {
      props: { loading: true }
    })

    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.wd-button__loading').exists()).toBe(true)
    expect(wrapper.find('.wd-button__loading-svg').exists()).toBe(true)

    // 点击加载中按钮不应该触发事件
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  // 测试自定义加载颜色
  test('自定义加载颜色', async () => {
    const loadingColor = '#ff0000'

    const wrapper = mount(WdButton, {
      props: {
        loading: true,
        loadingColor
      }
    })

    await nextTick()

    // 检查加载图标样式
    expect(wrapper.find('.wd-button__loading-svg').attributes('style')).toContain('background-image: url(')
  })

  // 测试图标按钮
  test('带图标的按钮', () => {
    const icon = 'add'

    const wrapper = mount(WdButton, {
      props: { icon }
    })

    expect(wrapper.findComponent(wdIcon).exists()).toBe(true)
    expect(wrapper.findComponent(wdIcon).props('name')).toBe(icon)
  })

  // 测试自定义图标前缀
  test('自定义图标前缀', () => {
    const classPrefix = 'custom-icon'

    const wrapper = mount(WdButton, {
      props: {
        icon: 'add',
        classPrefix
      }
    })
    expect(wrapper.findComponent(wdIcon).props('classPrefix')).toBe(classPrefix)
  })

  // 测试插槽内容
  test('插槽内容', () => {
    const buttonText = 'Button Text'

    const wrapper = mount(WdButton, {
      slots: {
        default: buttonText
      }
    })

    expect(wrapper.find('.wd-button__text').text()).toBe(buttonText)
  })

  // 测试点击事件
  test('非禁用或加载状态下触发点击事件', async () => {
    const wrapper = mount(WdButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  // 测试自定义样式
  test('自定义样式', () => {
    const customStyle = 'color: red;'

    const wrapper = mount(WdButton, {
      props: { customStyle }
    })

    expect(wrapper.attributes('style')).toBe(customStyle)
  })

  // 测试自定义类名
  test('自定义类名', () => {
    const customClass = 'my-button'

    const wrapper = mount(WdButton, {
      props: { customClass }
    })

    expect(wrapper.classes()).toContain(customClass)
  })

  // 测试开放能力
  test('设置开放能力', () => {
    const openType: ButtonOpenType = 'share'

    const wrapper = mount(WdButton, {
      props: { openType }
    })

    expect(wrapper.attributes('open-type')).toBe(openType)
  })

  // 测试禁用状态下不应用开放能力
  test('禁用状态下不应用开放能力', () => {
    const openType: ButtonOpenType = 'share'

    const wrapper = mount(WdButton, {
      props: {
        openType,
        disabled: true
      }
    })

    expect(wrapper.attributes('open-type')).toBeUndefined()
  })

  // 测试加载状态下不应用开放能力
  test('加载状态下不应用开放能力', () => {
    const openType: ButtonOpenType = 'share'

    const wrapper = mount(WdButton, {
      props: {
        openType,
        loading: true
      }
    })

    expect(wrapper.attributes('open-type')).toBeUndefined()
  })

  // 测试语言设置
  test('设置语言属性', () => {
    const lang: ButtonLang = 'en'

    const wrapper = mount(WdButton, {
      props: { lang }
    })

    expect(wrapper.attributes('lang')).toBe(lang)
  })

  // 测试会话来源
  test('设置会话来源属性', () => {
    const sessionFrom = 'test-session'

    const wrapper = mount(WdButton, {
      props: { sessionFrom }
    })

    expect(wrapper.attributes('session-from')).toBe(sessionFrom)
  })

  // 测试会话内消息卡片标题
  test('设置会话内消息卡片标题属性', () => {
    const sendMessageTitle = 'Message Title'

    const wrapper = mount(WdButton, {
      props: { sendMessageTitle }
    })

    expect(wrapper.attributes('send-message-title')).toBe(sendMessageTitle)
  })

  // 测试会话内消息卡片路径
  test('设置会话内消息卡片路径属性', () => {
    const sendMessagePath = '/pages/index/index'

    const wrapper = mount(WdButton, {
      props: { sendMessagePath }
    })

    expect(wrapper.attributes('send-message-path')).toBe(sendMessagePath)
  })

  // 测试会话内消息卡片图片
  test('设置会话内消息卡片图片属性', () => {
    const sendMessageImg = 'https://example.com/image.jpg'

    const wrapper = mount(WdButton, {
      props: { sendMessageImg }
    })

    expect(wrapper.attributes('send-message-img')).toBe(sendMessageImg)
  })

  // 测试 APP 参数
  test('设置 APP 参数属性', () => {
    const appParameter = 'app-param'

    const wrapper = mount(WdButton, {
      props: { appParameter }
    })

    expect(wrapper.attributes('app-parameter')).toBe(appParameter)
  })

  // 测试显示会话内消息卡片
  test('设置显示会话内消息卡片属性', () => {
    const wrapper = mount(WdButton, {
      props: { showMessageCard: true }
    })

    expect(wrapper.attributes('show-message-card')).toBe('true')
  })

  // 测试按钮 ID
  test('设置按钮 ID 属性', () => {
    const buttonId = 'test-button-id'

    const wrapper = mount(WdButton, {
      props: { buttonId }
    })

    expect(wrapper.attributes('id')).toBe(buttonId)
  })

  // 测试支付宝小程序授权范围
  test('设置授权范围属性', () => {
    const scope: ButtonScope = 'phoneNumber'

    const wrapper = mount(WdButton, {
      props: { scope }
    })

    expect(wrapper.attributes('scope')).toBe(scope)
  })

  // 测试阻止祖先节点点击态
  test('设置阻止祖先节点点击态属性', () => {
    const wrapper = mount(WdButton, {
      props: { hoverStopPropagation: true }
    })

    expect(wrapper.attributes('hover-stop-propagation')).toBe('true')
  })

  // 测试 hover 类名
  test('设置 hover 类名', () => {
    const wrapper = mount(WdButton)

    expect(wrapper.attributes('hover-class')).toBe('wd-button--active')
  })

  // 测试禁用状态下不应用 hover 类名
  test('禁用状态下不应用 hover 类名', () => {
    const wrapper = mount(WdButton, {
      props: { disabled: true }
    })

    expect(wrapper.attributes('hover-class')).toBe('')
  })

  // 测试加载状态下不应用 hover 类名
  test('加载状态下不应用 hover 类名', () => {
    const wrapper = mount(WdButton, {
      props: { loading: true }
    })

    expect(wrapper.attributes('hover-class')).toBe('')
  })

  // 测试 hover 开始时间
  test('设置 hover 开始时间属性', () => {
    const wrapper = mount(WdButton)

    expect(wrapper.attributes('hover-start-time')).toBe('20')
  })

  // 测试 hover 停留时间
  test('设置 hover 停留时间属性', () => {
    const wrapper = mount(WdButton)

    expect(wrapper.attributes('hover-stay-time')).toBe('70')
  })

  // 测试获取用户信息事件
  test('触发获取用户信息事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { userInfo: { nickName: 'Test User' } }

    await wrapper.trigger('getuserinfo', { detail })

    expect(wrapper.emitted('getuserinfo')).toBeTruthy()
    const getuserinfoEvent = wrapper.emitted('getuserinfo')
    expect(getuserinfoEvent && getuserinfoEvent[0][0]).toEqual(detail)
  })

  // 测试客服会话事件
  test('触发客服会话事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { path: '/pages/index/index' }

    await wrapper.trigger('contact', { detail })

    expect(wrapper.emitted('contact')).toBeTruthy()
    const contactEvent = wrapper.emitted('contact')
    expect(contactEvent && contactEvent[0][0]).toEqual(detail)
  })

  // 测试获取手机号事件
  test('触发获取手机号事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { phoneNumber: '12345678901' }

    await wrapper.trigger('getphonenumber', { detail })

    expect(wrapper.emitted('getphonenumber')).toBeTruthy()
    const getphonenumberEvent = wrapper.emitted('getphonenumber')
    expect(getphonenumberEvent && getphonenumberEvent[0][0]).toEqual(detail)
  })

  // 测试错误事件
  test('触发错误事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { errMsg: 'Error message' }

    await wrapper.trigger('error', { detail })

    expect(wrapper.emitted('error')).toBeTruthy()
    const errorEvent = wrapper.emitted('error')
    expect(errorEvent && errorEvent[0][0]).toEqual(detail)
  })

  // 测试打开 APP 事件
  test('触发打开 APP 事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { errMsg: 'launchApp:ok' }

    await wrapper.trigger('launchapp', { detail })

    expect(wrapper.emitted('launchapp')).toBeTruthy()
    const launchappEvent = wrapper.emitted('launchapp')
    expect(launchappEvent && launchappEvent[0][0]).toEqual(detail)
  })

  // 测试打开设置页面事件
  test('触发打开设置页面事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { authSetting: {} }

    await wrapper.trigger('opensetting', { detail })

    expect(wrapper.emitted('opensetting')).toBeTruthy()
    const opensettingEvent = wrapper.emitted('opensetting')
    expect(opensettingEvent && opensettingEvent[0][0]).toEqual(detail)
  })

  // 测试选择头像事件
  test('触发选择头像事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { avatarUrl: 'https://example.com/avatar.jpg' }

    await wrapper.trigger('chooseavatar', { detail })

    expect(wrapper.emitted('chooseavatar')).toBeTruthy()
    const chooseavatarEvent = wrapper.emitted('chooseavatar')
    expect(chooseavatarEvent && chooseavatarEvent[0][0]).toEqual(detail)
  })

  // 测试同意隐私授权事件
  test('触发同意隐私授权事件', async () => {
    const wrapper = mount(WdButton)
    const detail = { errMsg: 'agree:ok' }

    await wrapper.trigger('agreeprivacyauthorization', { detail })

    expect(wrapper.emitted('agreeprivacyauthorization')).toBeTruthy()
    const agreeprivacyauthorizationEvent = wrapper.emitted('agreeprivacyauthorization')
    expect(agreeprivacyauthorizationEvent && agreeprivacyauthorizationEvent[0][0]).toEqual(detail)
  })

  // 测试支付宝小程序授权 - 手机号
  test('处理手机号授权事件', async () => {
    const wrapper = mount(WdButton, {
      props: {
        scope: 'phoneNumber'
      }
    })

    const detail = { phoneNumber: '12345678901' }

    await wrapper.trigger('getAuthorize', { detail })

    expect(wrapper.emitted('getphonenumber')).toBeTruthy()
    const getphonenumberEvent = wrapper.emitted('getphonenumber')
    expect(getphonenumberEvent && getphonenumberEvent[0][0]).toEqual(detail)
  })

  // 测试支付宝小程序授权 - 用户信息
  test('处理用户信息授权事件', async () => {
    const wrapper = mount(WdButton, {
      props: {
        scope: 'userInfo'
      }
    })

    const detail = { userInfo: { nickName: 'Test User' } }

    await wrapper.trigger('getAuthorize', { detail })

    expect(wrapper.emitted('getuserinfo')).toBeTruthy()
    const getuserinfoEvent = wrapper.emitted('getuserinfo')
    expect(getuserinfoEvent && getuserinfoEvent[0][0]).toEqual(detail)
  })

  // 测试加载图标构建
  test('不同类型的加载图标构建', async () => {
    const types: ButtonType[] = ['primary', 'success', 'info', 'warning', 'error', 'default']

    for (const type of types) {
      const wrapper = mount(WdButton, {
        props: {
          type,
          loading: true
        }
      })

      await nextTick()

      // 检查加载图标是否构建成功
      expect(wrapper.find('.wd-button__loading-svg').attributes('style')).toContain('background-image: url(')
    }
  })

  // 测试朴素按钮的加载图标
  test('朴素按钮的加载图标构建', async () => {
    const wrapper = mount(WdButton, {
      props: {
        plain: true,
        loading: true
      }
    })

    await nextTick()

    // 检查加载图标是否构建成功
    expect(wrapper.find('.wd-button__loading-svg').attributes('style')).toContain('background-image: url(')
  })
})
