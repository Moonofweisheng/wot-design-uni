# 脚手架与模板

通过本章节你可以了解如何使用 [create-uni](https://github.com/uni-helper/create-uni) 脚手架快速创建集成了 `Wot UI` 的 `uni-app` 项目，以及很多已经集成了 `Wot UI` 的 `uni-app` 快速起手项目。

## 脚手架

我们推荐使用 [create-uni](https://github.com/uni-helper/create-uni) 创建项目，它支持一键创建集成 Wot UI 的基础项目。使用以下命令：

```bash
pnpm create uni <你的项目名称> --ts -m pinia -u wot -e
```

将会完成以下工作：

- 创建一个 TypeScript 项目
- 集成 Pinia 状态管理
- 自动配置 WotUI 组件库
- 添加 ESLint 支持

更多信息请参见 [create-uni](https://github.com/uni-helper/create-uni)。

## 模板

有非常多的优秀模板选择了 Wot UI 作为基础组件库，我们选取其中的3个模板模板来介绍一番，大家可以自行对比、选择。

### wot-starter

🍀  [wot-starter](https://github.com/wot-ui/wot-starter) 是一个基于 [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 深度整合 `Wot UI` 组件库的 `uni-app` 快速起手项目。它由 `Wot UI` 团队维护，告别 `HBuilderX` ，拥抱现代前端开发工具链。如果你是 `Wot UI` 的忠实用户，那么这个模板非常适合你。

也可以结合脚手架章节 [create-uni](https://github.com/uni-helper/create-uni) 来创建项目，打开终端，然后使用以下命令：

```bash
pnpm create uni <project-name> -t wot-starter
```

在 VS Code 中打开项目文件夹：

```bash
code <project-name>
```

安装依赖：

```bash
pnpm install
```

运行项目：

```bash
pnpm dev
```

### vitesse-uni-app

[vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) 由 `Vite & uni-app` 驱动的跨端快速启动模板，背靠 `Uni Helper` 团队，告别 `HBuilderX` ，拥抱现代前端开发。虽然没有深度整合 Wot UI 组件库，但是它是一个非常优秀的纯净模板，值得推荐。


### unibest

[unibest](https://github.com/unibest-tech/unibest) 使用了最新的前端技术栈，无需依靠 `HBuilderX`，通过命令行方式运行，编辑器推荐 `VSCode`，可选 `webstorm`）。内置大量基础功能，提供大量辅助功能，让你编写 `uniapp` 拥有 `best` 体验，可选择使用`Wot UI`。


### 更多模板

当然，还有更多的模板供你选择，你可以从以下列表中比较并选择一个你喜欢的模板来使用。

如果你正在开发整合 `Wot UI` 的 `uni-app` 模板，那么可以发送邮件到 `1780903673@qq.com` 联系我，我会在第一时间将你的模板添加到这个列表中。

| 模板 | Stars | 描述 |
|------|-------|-------------|
| [wot-starter](https://github.com/wot-ui/wot-starter) | ![stars](https://img.shields.io/github/stars/wot-ui/wot-starter) | 🍀 基于 vitesse-uni-app 深度整合 Wot UI 组件库的 uni-app 快速起手项目，它由 `Wot UI` 团队维护，告别 `HBuilderX` ，拥抱现代前端开发工具链。 |
| [vitesse-uni-app](https://github.com/uni-helper/vitesse-uni-app) | ![stars](https://img.shields.io/github/stars/uni-helper/vitesse-uni-app) | 由 Vite & uni-app 驱动的跨端快速启动模板，背靠 Uni Helper 团队，告别 HBuilderX ，拥抱现代前端开发。 |
| [unibest](https://github.com/unibest-tech/unibest) | ![stars](https://img.shields.io/github/stars/unibest-tech/unibest) | 使用了最新的前端技术栈，无需依靠 `HBuilderX`，通过命令行方式运行，内置大量基础功能，提供大量辅助功能，让你编写 `uniapp` 拥有 `best` 体验。 |
| [vite-uniapp-template](https://github.com/viarotel-org/vite-uniapp-template) | ![stars](https://img.shields.io/github/stars/viarotel-org/vite-uniapp-template) | 以实用为先的 uni-app 起手模板。 |
| [uni-plus](https://github.com/DaMaiCoding/uni-plus) | ![stars](https://img.shields.io/github/stars/DaMaiCoding/uni-plus) | 一个 “超超超” 好用的 uniapp 开发模板。 |
| [uniez-template](https://github.com/zhe-qi/uniez-template) | ![stars](https://img.shields.io/github/stars/zhe-qi/uniez-template) | 一个“功能”和“开发体验”优先的 uniapp 模板。 |
| [snail-uni](https://github.com/hu-snail/snail-uni) | ![stars](https://img.shields.io/github/stars/hu-snail/snail-uni) | 专为开发者打造的 UniApp 框架模板。 |