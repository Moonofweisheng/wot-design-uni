# 技术栈

## 核心技术
- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite 5.x
- **平台**: uni-app (多端统一开发框架)
- **包管理器**: pnpm (必需，通过 preinstall 钩子强制使用)
- **Node 版本**: 在 .nvmrc 中指定

## 主要依赖
- Vue 3.4.x 使用 Composition API
- TypeScript 5.x
- uni-app 3.x 生态系统 (@dcloudio 包)
- Vue i18n 9.x 用于国际化
- Element Plus 2.x (用于文档站点)
- VitePress 1.x (文档生成器)

## 开发工具
- **代码检查**: ESLint + Prettier + Vue ESLint Parser
- **测试**: Vitest 配合 jsdom, Vue Test Utils
- **Git 钩子**: Husky + lint-staged + commitlint
- **提交规范**: 使用 git-cz 的约定式提交
- **发布**: standard-version 进行语义化版本控制

## 常用命令

### 开发调试
```bash
# H5 开发
pnpm dev:h5

# 小程序开发
pnpm dev:mp-weixin    # 微信小程序
pnpm dev:mp-alipay    # 支付宝小程序
pnpm dev:mp-baidu     # 百度小程序
pnpm dev:mp-qq        # QQ小程序

# App 开发
pnpm dev:app          # 通用 App
pnpm dev:app-android  # Android
pnpm dev:app-ios      # iOS
```

### 构建打包
```bash
# H5 构建
pnpm build:h5

# 小程序构建
pnpm build:mp-weixin
pnpm build:mp-alipay

# App 构建
pnpm build:app
```

### 文档相关
```bash
# 本地启动文档服务
pnpm dev:docs

# 构建文档
pnpm build:docs
```

### 测试和质量检查
```bash
# 运行测试
pnpm test
pnpm test:h5          # H5 专用测试
pnpm test:mp-weixin   # 微信小程序测试
pnpm coverage         # 生成覆盖率报告

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

### 发布和部署
```bash
# 版本升级
pnpm release-patch    # 补丁版本
pnpm release-minor    # 次要版本
pnpm release-major    # 主要版本

# 上传到小程序平台
pnpm upload:mp-weixin
pnpm upload:mp-alipay
```

## 构建配置
- **目标**: ES2015 以确保广泛兼容性
- **Source Maps**: 生产环境禁用以减小包体积
- **压缩**: H5 构建启用压缩
- **浏览器支持**: Android >= 4.4, iOS >= 9