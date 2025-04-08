import { Composer, ComponentCustomProperties } from 'vue-i18n'

declare module 'vue-i18n' {
  export declare interface Composer {
    t(key: string | number, ...args: any[]): string
  }
}
