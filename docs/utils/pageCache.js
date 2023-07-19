import routesConfig from '../routes.yml'

const pageArrCache = {}
const pageObjCache = {}

function setPageCache(menu, parentName, pageArrCache, pageObjCache, totalPage = 0) {
  menu.children.forEach((item) => {
    if (item.type === 'module' || item.type === 'group') {
      totalPage = setPageCache(item, parentName, pageArrCache, pageObjCache, totalPage)
    } else {
      pageObjCache[`${parentName}-${item.name}`] = totalPage
      pageArrCache.push({
        name: `${parentName}-${item.name}`,
        title: item.title
      })
      totalPage++
    }
  })

  return totalPage
}

routesConfig.forEach((menu) => {
  if (menu.type === 'link' || !menu.children) return

  pageArrCache[menu.name] = []
  pageObjCache[menu.name] = {}

  setPageCache(menu, menu.name, pageArrCache[menu.name], pageObjCache[menu.name])
})

const prevPage = (parentName, pageName) => {
  let prevIndex = pageObjCache[parentName][pageName] - 1

  if (prevIndex < 0) {
    return ''
  }

  return pageArrCache[parentName][prevIndex]
}

const nextPage = (parentName, pageName) => {
  let nextIndex = pageObjCache[parentName][pageName] + 1

  if (nextIndex > pageArrCache[parentName].length - 1) {
    return ''
  }

  return pageArrCache[parentName][nextIndex]
}

export { prevPage, nextPage }
