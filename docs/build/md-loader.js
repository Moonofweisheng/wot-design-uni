const hljs = require('highlight.js')
const MarkdownIt = require('markdown-it')
const markdownItContainer = require('markdown-it-container')
const markdownItAnchor = require('markdown-it-anchor')
const slugify = require('transliteration').slugify

const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    str = str.replace(/&lt;/g, '<')
    str = str.replace(/&gt;/g, '>')

    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs language-' + lang + '"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})
  .use(markdownItContainer, 'warning')
  .use(markdownItContainer, 'error')
  .use(markdownItContainer, 'info')
  .use(markdownItAnchor, {
    level: 2,
    slugify,
    permalink: true,
    permalinkBefore: true
  })

module.exports = (source) => {
  const content = md.render(source)
  let scriptStart = content.indexOf('<script>')
  let scriptEnd = 0
  let pageScript
  let pageHtml = []

  if (scriptStart > -1) {
    scriptEnd = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(scriptStart, scriptEnd)
  } else {
    scriptStart = 0
  }

  pageHtml.push(content.slice(0, scriptStart))
  pageHtml.push(content.slice(scriptEnd))

  let output = pageHtml.join('').replace(/\{/g, '<span>&#123;</span>').replace(/\}/g, '<span>&#125;</span>')

  return `
    <template>
      <section class="markdown-content">
        ${output}
      </section>
    </template>
    ${pageScript}
  `
}
