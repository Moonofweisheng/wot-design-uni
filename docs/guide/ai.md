---
version: New
---
# AI

Wot UI 是一个 AI 友好型的组件库，本指南旨在介绍如何让 VSCode、Cursor、TRAE、Antigravity 等 AI 工具更好地理解 Wot UI 组件库。

## llms.txt

[llms.txt](https://llmstxt.org/) 是一个专为大型语言模型（Large Language Models，简称 LLMs）设计的文本文件，类似于 robots.txt，但目的不同。robots.txt 告诉搜索引擎爬虫哪些页面可以爬取，而 llms.txt 则是为 AI 工具提供网站内容的结构化信息，帮助 AI 更好地理解和索引网站内容。llms.txt 的名称中的 "llms" 代表 "Large Language Models"，表明这个文件是专门为大型语言模型设计的。它包含了项目的关键文档链接、代码示例和最佳实践，能够帮助 VSCode、Cursor、TRAE、Antigravity 等 AI 工具更好地理解 Wot UI 组件库。

### 可用资源

我们提供 2 个 llms.txt 路由来帮助 AI 工具访问文档：

- [llms.txt](https://wot-ui.cn/llms.txt) - 包含所有组件及其文档链接的结构化概览
- [llms-full.txt](https://wot-ui.cn/llms-full.txt) - 提供包含实现细节和示例的完整文档

### 在 AI 工具中使用
#### Cursor
在 Cursor 中找到 `Indexing & Docs` 设置，并将 `llms.txt` 添加到 `Docs` 中，使用 `@Docs` 功能将 llms.txt 文件包含到您的项目中。

[详细了解 Cursor 中的 @Docs 功能](https://cursor.com/docs/agent/tools/search)

#### TRAE
在 TRAE 中找到 `上下文/文档集` 设置，并将 `llms.txt` 添加到 `文档集` 中，使用 `#Docs` 功能将 llms.txt 文件包含到您的项目中。

[详细了解 TRAE 中的 #Docs 功能](https://docs.trae.ai/ide/number-sign)

#### 其他工具
任何支持 `llms.txt` 标准或可以从 URL 摄取文档的工具都可以使用我们提供的 `llms.txt` 文件。你可以将 `llms.txt` 文件添加到你使用的工具的 `文档集`、`rules` 中，以帮助 AI 工具更好地理解 Wot UI 组件库。

#### context7
在不使用 `llms.txt` 的情况下，也可以使用 [context7](https://github.com/upstash/context7) 直接读取组件库文档。

[详细了解 context7](https://github.com/upstash/context7)


## Skills

Skills 是 AI 的"超能力模板"，是一套完整的、可复用的、能解决特定问题的方案，Wot UI 也提供了一些预定义的 [Skills](https://skills.sh/?q=wot-ui)，你可以直接在 AI 中使用。

### 可用资源
- [skills.sh](https://skills.sh/?q=wot-ui) - 开放 Agent Skills 生态系统，收录了无数 skills，包含 Wot UI 相关的技能。
- [wot-starter](https://starter.wot-ui.cn/guide/skills.html) - Wot UI 提供的快速上手模板，包含 Wot UI 相关的技能。

### 在 AI 工具中使用
推荐使用脚本安装 Skills，可以根据实际需求选择 Skills 的安装选项：
```sh
npx skills add https://github.com/wot-ui/wot-starter --skill wot-ui
```

## 参考文章
- [llms.txt：让 AI 更好地理解你的文档](https://juejin.cn/post/7500981295105015847)
- [Agent Skills、Rules、Prompt、MCP，一文把它们理清楚了](https://juejin.cn/post/7599268297201958950)