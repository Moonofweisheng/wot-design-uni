import { vi } from 'vitest'
import { watch } from 'vue'

/**
 * 定义组件 props 类型
 */
interface TransitionProps {
  show?: boolean
  name?: string | string[]
  customClass?: string
  customStyle?: string
  duration?: number | { enter: number; leave: number }
  destroy?: boolean
  lazyRender?: boolean
}

/**
 * 极简版 wd-transition 组件模拟
 * 为了解决测试中的渲染时序问题，这个版本会立即渲染内容，不依赖于任何异步操作
 */
vi.mock('@/uni_modules/wot-design-uni/components/wd-transition/wd-transition.vue', () => ({
  default: {
    name: 'wd-transition',
    props: {
      show: Boolean,
      name: [String, Array],
      customClass: String,
      customStyle: String,
      duration: [Number, Object],
      destroy: Boolean,
      lazyRender: Boolean
    },
    emits: ['click', 'touchmove', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'],
    setup(props: TransitionProps, { emit }: { emit: (event: string, ...args: any[]) => void }) {
      // 监听 show 属性变化，触发相应事件
      watch(
        () => props.show,
        (newVal, oldVal) => {
          if (newVal === oldVal) return

          if (newVal) {
            // 显示
            emit('before-enter')
            emit('enter')
            emit('after-enter')
          } else {
            // 隐藏
            emit('before-leave')
            emit('leave')
            emit('after-leave')
          }
        },
        { immediate: true } // 初始化时也触发一次
      )

      // 简单的事件处理函数
      const handleClick = (): void => emit('click')
      const handleTouchMove = (event: Event): void => emit('touchmove', event)

      return {
        handleClick,
        handleTouchMove
      }
    },
    // 简化模板，始终渲染内容，只通过 display 控制显示/隐藏
    template: `
      <div
        :class="['wd-transition', customClass]"
        :style="[customStyle, { display: show ? '' : (destroy ? 'none' : '') }]"
        @click="handleClick"
        @touchmove="handleTouchMove"
      >
        <slot></slot>
      </div>
    `
  }
}))
