import { type InjectionKey } from 'vue'

export type TabsProvide = {
  state: {
    activeIndex: number
  }
}

export const TABS_KEY: InjectionKey<TabsProvide> = Symbol('wd-tabs')
