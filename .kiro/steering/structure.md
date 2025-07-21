# 项目结构

## 根目录组织
```
├── src/                    # 主要源代码
├── docs/                   # VitePress 文档
├── tests/                  # 测试文件
├── scripts/                # 构建和工具脚本
├── vite-plugins/           # 自定义 Vite 插件
└── .kiro/                  # Kiro AI 助手配置
```

## 源代码结构 (`src/`)
```
src/
├── components/             # 演示和工具组件
├── uni_modules/           # uni-app 模块 (主要组件库)
│   └── wot-design-uni/    # 核心组件库
├── pages/                 # 应用页面
├── subPages/              # 子页面
├── hooks/                 # Vue 组合式函数
├── locale/                # 国际化文件
├── store/                 # 状态管理
├── static/                # 静态资源
├── iconfont/              # 图标字体
├── App.vue                # 根组件
├── main.ts                # 应用入口
├── pages.json             # uni-app 页面配置
└── manifest.json          # uni-app 清单文件
```

## 组件库结构 (`src/uni_modules/wot-design-uni/`)
- **components/**: 所有 UI 组件 (70+ 个组件)
- **locale/**: 国际化语言包
- **dayjs/**: 日期工具函数
- **index.ts**: 主导出文件
- **global.d.ts**: TypeScript 类型声明

## 文档结构 (`docs/`)
```
docs/
├── .vitepress/            # VitePress 配置
├── component/             # 组件文档
├── guide/                 # 用户指南
├── en-US/                 # 英文文档
├── public/                # 静态资源
└── index.md               # 首页
```

## 测试结构 (`tests/`)
```
tests/
├── components/            # 组件测试
├── composables/           # Hook/组合式函数测试
├── mocks/                 # 测试模拟
├── vite-plugins/          # 插件测试
├── setup.ts               # 测试设置
└── suppress-warnings.ts   # 测试配置
```

## 脚本目录 (`scripts/`)
- **build-web-types.ts**: 生成 IDE 支持的 web-types
- **buildThemeVars.ts**: 构建主题变量
- **compiler.ts**: 组件编译
- **component-helper.ts**: 组件助手生成
- **demoCopy.ts**: 复制演示文件
- **release.ts**: 发布自动化
- **test-component.ts**: 组件测试工具

## 配置文件
- **vite.config.ts**: Vite 构建配置
- **vitest.config.ts**: 测试配置
- **tsconfig.json**: TypeScript 配置
- **uni.scss**: 全局 SCSS 变量
- **theme.json**: 主题配置

## 命名规范
- **组件**: PascalCase (例如: `DatetimePicker`)
- **文件**: Vue 文件使用 kebab-case (例如: `datetime-picker.vue`)
- **目录**: kebab-case 或 camelCase
- **CSS 类名**: BEM 方法论，使用 `wd-` 前缀
- **属性/事件**: 代码中使用 camelCase，模板中使用 kebab-case

## 导入模式
- 使用 `@/` 别名导入 src 目录文件
- 组件库从 `src/uni_modules/wot-design-uni/index.ts` 导出
- 本地文件使用相对导入
- 外部依赖使用绝对导入