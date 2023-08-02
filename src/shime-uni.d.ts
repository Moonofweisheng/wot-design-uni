/* eslint-disable @typescript-eslint/no-empty-interface */
/*
 * @Author: weisheng
 * @Date: 2023-03-09 19:23:03
 * @LastEditTime: 2023-03-21 21:30:30
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\shime-uni.d.ts
 * 记得注释
 */
export {}
declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}
