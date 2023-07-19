/**
 * 页面配置获取地址表
 * @param {Array} routes 路径地址数组
 * @param {String} pre 地址前缀
 */
const siteMapUrls = (routes, pre) => {
  return routes.reduce((array, route) => {
    if (route.children) {
      array.push(...siteMapUrls(route.children, pre))
    } else if (route.type !== 'link') {
      const path = `${pre}/components/${route.name}`
      array.push(path)
    }

    return array
  }, [])
}

// 根据路由列表生成sitemap
const createSitemapXml = (routeList) => {
  const list = routeList
    .map(
      (route) => `
    <url>
      <loc>${route}</loc>
      <changefreq>weekly</changefreq>
    </url>`
    )
    .join('\r\n')
  return `
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>
  `
}

module.exports = {
  siteMapUrls,
  createSitemapXml
}
