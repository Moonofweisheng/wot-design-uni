/*
 * @Author: weisheng
 * @Date: 2021-12-28 15:57:08
 * @LastEditTime: 2021-12-28 15:58:09
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini\src\model\KV.ts
 * 记得注释
 */
export default class KV<T> {
  label: string = '' // 操作标题
  value!: T // 操作项数组
}
