---
version: New
---
# AI

Wot UI is an AI-friendly component library. This guide aims to introduce how to help AI tools like VSCode, Cursor, TRAE, and Antigravity better understand the Wot UI component library.

## llms.txt

[llms.txt](https://llmstxt.org/) is a text file designed for Large Language Models (LLMs), similar to robots.txt but with a different purpose. While robots.txt tells search engine crawlers which pages can be crawled, llms.txt provides structured information about website content for AI tools, helping them better understand and index the site. The "llms" in the name stands for "Large Language Models". It contains key documentation links, code examples, and best practices for the project, enabling AI tools like VSCode, Cursor, TRAE, and Antigravity to better comprehend the Wot UI component library.

### Available Resources

We provide 2 llms.txt routes to help AI tools access documentation:

- [llms.txt](https://wot-ui.cn/llms.txt) - A structured overview containing all components and their documentation links
- [llms-full.txt](https://wot-ui.cn/llms-full.txt) - Full documentation including implementation details and examples

### Usage in AI Tools

#### Cursor
Find the `Indexing & Docs` setting in Cursor, and add `llms.txt` to `Docs`. Use the `@Docs` feature to include the llms.txt file in your project.

[Learn more about @Docs in Cursor](https://cursor.com/docs/agent/tools/search)

#### TRAE
Find the `Context/Documentation` setting in TRAE, and add `llms.txt` to `Documentation`. Use the `#Docs` feature to include the llms.txt file in your project.

[Learn more about #Docs in TRAE](https://docs.trae.ai/ide/number-sign)

#### Other Tools
Any tool that supports the `llms.txt` standard or can ingest documentation from a URL can use the `llms.txt` file we provide. You can add the `llms.txt` file to your tool's `Documentation` or `rules` to help the AI tool better understand the Wot UI component library.

#### context7
Even without using `llms.txt`, you can use [context7](https://github.com/upstash/context7) to directly read the component library documentation.

[Learn more about context7](https://github.com/upstash/context7)

## Skills

Skills are "superpower templates" for AI, a complete, reusable set of solutions for specific problems. Wot UI also provides some predefined [Skills](https://skills.sh/?q=wot-ui) that you can use directly in AI.

### Available Resources
- [skills.sh](https://skills.sh/?q=wot-ui) - An open Agent Skills ecosystem collecting countless skills, including those related to Wot UI.
- [wot-starter](https://starter.wot-ui.cn/guide/skills.html) - A quick start template provided by Wot UI, containing Wot UI related skills.

### Usage in AI Tools
We recommend installing Skills using a script. You can choose installation options based on your needs:
```sh
npx skills add https://github.com/wot-ui/wot-starter --skill wot-ui
```

## References
- [llms.txt: Let AI better understand your documentation](https://juejin.cn/post/7500981295105015847)
- [Agent Skills, Rules, Prompt, MCP: Clearing them all up in one article](https://juejin.cn/post/7599268297201958950)
