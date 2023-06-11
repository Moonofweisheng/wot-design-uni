import KV from './KV'

/*
 * @Author: weisheng
 * @Date: 2021-12-28 15:13:43
 * @LastEditTime: 2023-03-21 22:34:12
 * @LastEditors: weisheng
 * @Description: 模板操作选项
 * @FilePath: \fant-mini-plus\src\model\OperationOption.ts
 * 记得注释
 */
export default class OperationOption {
  label: string = '' // 操作的标题（用于展示）
  name: string | string[] = '' // 操作真实值用于代码传参
  value: KV<any>[] = [] // 操作项数组
}
