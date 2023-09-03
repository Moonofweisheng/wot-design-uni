/*
 * @Author: weisheng
 * @Date: 2023-09-01 21:42:32
 * @LastEditTime: 2023-09-03 11:43:06
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\common\lodash\internal\root.ts
 * 记得注释
 */
import freeGlobal from './freeGlobal'

/** Detect free variable `globalThis` */
// eslint-disable-next-line eqeqeq
const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis

/** Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self

/** Used as a reference to the global object. */
// eslint-disable-next-line no-new-func
const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

export default root
