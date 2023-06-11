/*
 * @Author: weisheng
 * @Date: 2021-10-13 11:15:00
 * @LastEditTime: 2023-04-06 20:10:46
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \fant-mini-plus\src\router\index.ts
 * 记得注释
 */
import { createRouter } from 'uni-mini-router'

const router = createRouter({
  routes: [...ROUTES]
})
router.beforeEach((to, from, next) => {
  console.log(to, 'to')
  console.log(from, 'from')
  console.log('进入路由之前调用')
  next()
})
router.afterEach((to, from) => {
  console.log(to, 'to')
  console.log(from, 'from')
  console.log('进入路由之后调用')
})

export default router
