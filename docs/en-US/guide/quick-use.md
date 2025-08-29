# Quick Start

This section introduces how to install, configure, and use `Wot UI` in your `uni-app` project.

## Before Using

Before using, please make sure you have learned Vue's official [Quick Start](https://vuejs.org/guide/quick-start.html) and uni-app's [Learning Path](https://uniapp.dcloud.net.cn/resource.html).

## Installation

:::warning About Installation

`Wot UI` provides two installation methods: `uni_modules` and `npm`. Choose according to your needs.

- Using `uni_modules` installation requires no additional configuration, it's plug-and-play, but updating the component library requires handling code differences (generally just overwriting is fine).
- Using `npm` installation requires additional configuration, but updating the component library doesn't require handling code differences.

:::

### npm Installation

::: code-group

```bash [npm]
npm i wot-design-uni
```

```bash [yarn]
yarn add wot-design-uni
```

```bash [pnpm]
pnpm add wot-design-uni
```

:::

### uni_modules Installation

`Wot UI` supports the [uni_modules](https://uniapp.dcloud.net.cn/plugin/uni_modules.html#uni-modules) specification and is available in the uni-app plugin market.

In the `uni-app plugin market`, choose to import using `HBuildX`, or manually create a uni_modules folder in the src directory and extract `Wot UI` into uni_modules, with the following structure:

```bash
- uni_modules
- - - wot-design-uni 
```

Download link: <a href="https://ext.dcloud.net.cn/plugin?id=13889"><span>wot-design-uni</span></a>

## Sass

`Wot UI` depends on `sass`, so before using it, you need to confirm whether `sass` is already installed in your project. If not, you can install it using the following command:

::: code-group

```bash [npm]
npm i sass -D
```

```bash [yarn]
yarn add sass -D
```

```bash [pnpm]
pnpm add sass -D
```

:::

::: warning Reminder
`Dart Sass 3.0.0` has deprecated a batch of APIs, and the component library hasn't been compatible yet, so please ensure your `sass` version is 1.78.0 or earlier. See [Common Problems](/en-US/guide/common-problems.html#sass-throws-lots-of-errors-and-warnings).
:::

## Configuration

### Import Components

::: tip Reminder
When using `uni_modules` installation, `Wot UI` components naturally support the `easycom` specification, requiring no additional configuration for automatic component import. When using `npm installation`, you need to follow this step. Choose one of the following two solutions.
:::

#### Configure easycom for Automatic Component Import<el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >Solution 1</el-tag>

Traditional Vue components require three steps: installation, import, and registration before they can be used. `easycom` simplifies this to one step.
As long as the component path follows the specification (see [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)), you can use it directly in the page without importing and registering.

:::tip Reminder

- For compilation speed, uni-app won't trigger recompilation when directly modifying `easycom` in `pages.json`. You need to modify page content to trigger it.
- Please ensure you only have one `easycom` field in your `pages.json`, otherwise please merge multiple import rules yourself.

:::

```JSON
// pages.json
{
 "easycom": {
  "autoscan": true,
  "custom": {
    "^wd-(.*)": "wot-design-uni/components/wd-$1/wd-$1.vue"
  }
 },
 
 // This is the existing content
 "pages": [
  // ......
 ]
}
```

#### Configure Automatic Component Import Based on vite<el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >Solution 2</el-tag>

If you're not familiar with `easycom`, you can also achieve automatic component import through [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components).

:::tip Reminder

- Recommended to use `@uni-helper/vite-plugin-uni-components@0.0.9` and above, as it includes the built-in `resolver` for `wot-design-uni` starting from version 0.0.9.
- If you see many `Sourcemap for points to missing source files​` in the console when using this solution, try upgrading `Vite` to version 4.5.x or above.

:::

::: code-group

```bash [npm]
npm i @uni-helper/vite-plugin-uni-components -D
```

```bash [yarn]
yarn add @uni-helper/vite-plugin-uni-components -D
```

```bash [pnpm]
pnpm add @uni-helper/vite-plugin-uni-components -D
```

:::

```ts
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'


export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components({
    resolvers: [WotResolver()]
  }), uni()],
});
```

If you use `pnpm`, please create a `.npmrc` file in the root directory, see [Issue](https://github.com/antfu/unplugin-vue-components/issues/389).

```text
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

## Volar Support

If you use `Volar`, please specify global component types through `compilerOptions.type` in `tsconfig.json`.

:::tip
For cli projects using `uni_modules` installation, no configuration is needed as Volar support is automatically enabled. `HbuildX` projects don't support this configuration, so this step is only needed when using `npm` installation in `cli` projects.
:::

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["wot-design-uni/global"]
  }
}
```

## Usage

After installing and configuring `Wot UI`, it supports automatic component import, so you can use it directly in SFC without importing in the page or declaring in components. It's worth noting that the `uni-app` platform doesn't support global component mounting, so components like `Message`, `Toast`, etc., still need to be explicitly used in SFC, for example:

``` html
<wd-toast></wd-toast>
```

## Scaffolding

We provide a quick start project [wot-starter](https://github.com/wot-ui/wot-starter), which integrates `Wot UI` and many excellent plugins, you can clone this project directly.

You can also use [create-uni](https://github.com/uni-helper/create-uni) to quickly create a starter project through the following command:  

```bash
pnpm create uni@latest -t wot-starter <your project name>
```
For more scaffolding and templates, see [CLI & Templates](./cli-templates.html).