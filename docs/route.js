/*
 * @Author: weisheng
 * @Date: 2023-07-20 00:34:54
 * @LastEditTime: 2023-07-20 19:40:03
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\docs\route.js
 * 记得注释
 */
import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layout/main'
import routesConfig from './routes.yml'

Vue.use(Router)

function getSideTabs(menu, parentName, sideTabs = []) {
  menu.children.forEach((item) => {
    if (item.type === 'module' || item.type === 'group') {
      sideTabs = sideTabs.concat(getSideTabs(item, parentName))
    } else if (item.type === 'page') {
      sideTabs.push({
        path: `/${parentName}/${item.name}`,
        name: `${parentName}-${item.name}`,
        component: () => import(`./pages/${item.name}`),
        meta: {
          demo: typeof item.demo !== 'boolean' && (item.demo || `/${item.name}`),
          title: item.title,
          parentName
        }
      })
    } else {
      sideTabs.push({
        path: `/${parentName}/${item.name}`,
        name: `${parentName}-${item.name}`,
        component: () => import(`./docs/${item.name}`),
        meta: {
          demo: typeof item.demo !== 'boolean' && (item.demo || `/${item.name}`),
          title: item.title,
          parentName
        }
      })
    }
  })

  return sideTabs
}

let pages = []
routesConfig.forEach((menu) => {
  if (menu.type === 'link') return

  if (menu.type === 'page') {
    pages.push({
      path: `/${menu.name}`,
      name: menu.name,
      component: () => import(`./pages/${menu.name}`),
      meta: {
        title: menu.title
      }
    })

    return
  }

  if (menu.children) {
    let sideTabs = getSideTabs(menu, menu.name)

    pages.push({
      path: `/${menu.name}`,
      name: menu.name,
      component: () => import('./layout/sideTabs'),
      redirect: sideTabs[0].path,
      children: sideTabs
    })
  }
})

const router = new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: pages[0].children[0].path,
      children: pages
    }
  ]
})

export default router
