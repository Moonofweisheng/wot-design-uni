/*
 * @Author: weisheng
 * @Date: 2021-12-21 14:22:03
 * @LastEditTime: 2025-03-25 14:01:43
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-design-uni/src/uni_modules/wot-design-uni/index.ts
 * 记得注释
 */

export { useToast } from './components/wd-toast'
export { useMessage } from './components/wd-message-box'
export { useQueue } from './components/composables/useQueue'
export { useUpload } from './components/composables/useUpload'
export { useTouch } from './components/composables/useTouch'
export * from './components/wd-notify'

export { dayjs } from './components/common/dayjs'

export * as CommonUtil from './components/common/util'
export * as clickOut from './components/common/clickoutside'

export * from './locale'
export type { ConfigProviderThemeVars } from './components/wd-config-provider/types'
