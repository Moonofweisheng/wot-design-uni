/*
 * @Author: weisheng
 * @Date: 2023-03-21 21:06:55
 * @LastEditTime: 2023-03-21 21:07:02
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\env.d.ts
 * 记得注释
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
