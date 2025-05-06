# wot-design-uni 测试指南

本文档提供了 wot-design-uni 组件库的测试策略、工作流程和最佳实践指南。

## 目录

- [测试策略](#测试策略)
- [测试工作流](#测试工作流)
- [如何运行测试](#如何运行测试)
- [编写测试](#编写测试)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [参考资料](#参考资料)

## 测试策略

wot-design-uni 采用以下测试策略：

### 分层测试

- **单元测试**：测试组件的独立功能和属性
- **集成测试**：测试组件之间的交互和组合使用
- **快照测试**：确保 UI 不会意外变化

### 测试覆盖率目标

- **整体代码覆盖率**：85%+
- **关键组件**（如 ConfigProvider、Button、Input 等）：90%+
- **工具函数**：95%+

### 测试粒度

- 每个组件至少有一个测试文件
- 每个组件的主要功能都应有对应的测试用例
- 边缘情况和错误处理也应有测试用例

### 测试平台

- **H5 平台**：所有组件都在 H5 平台上测试
- **条件编译**：虽然我们只在 H5 平台上测试，但测试环境会正确处理条件编译代码

## 测试工作流

wot-design-uni 使用 GitHub Actions 自动化测试流程，主要工作流文件是 `.github/workflows/component-testing.yml`。

### 触发条件

测试工作流在以下情况下会自动触发：

1. **推送到主分支**：当代码推送到 main、master 或 dev 分支，且修改了组件相关文件时
2. **创建 Pull Request**：当创建针对 main、master 或 dev 分支的 PR，且修改了组件相关文件时
3. **定时运行**：每周一凌晨 3 点自动运行所有测试
4. **手动触发**：可以在 GitHub Actions 页面手动触发，并指定要测试的组件

### 工作流步骤

1. **确定测试矩阵**：
   - 根据变更的文件确定需要测试的组件

2. **ESLint 检查**：
   - 运行 ESLint 检查，确保代码质量

3. **组件测试**：
   - 针对确定的组件运行 H5 平台测试
   - 生成测试覆盖率报告
   - 上传测试结果到 Codecov

4. **测试摘要**：
   - 生成测试摘要报告
   - 在 PR 中添加测试结果评论

## 如何运行测试

### 本地运行测试

#### 运行所有测试

```bash
# 运行所有测试
pnpm test

# 运行所有测试并生成覆盖率报告
pnpm coverage

# 在 H5 平台上运行所有测试
pnpm test:h5
```

### GitHub Actions 中运行测试

1. 导航到仓库的 Actions 标签页
2. 从左侧列表中选择 "Component Testing" 工作流
3. 点击 "Run workflow" 按钮
4. 可以选择性地指定要测试的组件名称（例如：wd-button）
5. 点击 "Run workflow" 开始测试

### 查看测试结果

测试完成后，你可以：

1. 在工作流运行详情页面查看测试结果
2. 下载测试报告和覆盖率报告
3. 在 Codecov 上查看详细的覆盖率信息
4. 如果是 PR，可以在 PR 评论中看到测试摘要

## 编写测试

### 测试文件结构

测试文件应放在 `tests/components` 目录下，命名为 `{组件名}.test.ts`。

每个测试文件的基本结构如下：

```typescript
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import WdComponent from '../../src/uni_modules/wot-design-uni/components/wd-component/wd-component.vue'

describe('WdComponent', () => {
  // 测试基本渲染
  test('基本渲染', () => {
    const wrapper = mount(WdComponent)
    expect(wrapper.classes()).toContain('wd-component')
  })

  // 更多测试...
})
```

### 测试用例编写指南

#### 1. 测试组件渲染

```typescript
test('基本渲染', () => {
  const wrapper = mount(WdButton)
  expect(wrapper.classes()).toContain('wd-button')
})
```

#### 2. 测试组件属性

```typescript
test('按钮类型', () => {
  const wrapper = mount(WdButton, {
    props: { type: 'primary' }
  })
  expect(wrapper.classes()).toContain('wd-button--primary')
})
```

#### 3. 测试组件事件

```typescript
test('点击事件', async () => {
  const wrapper = mount(WdButton)
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeTruthy()
})
```

#### 4. 测试组件插槽

```typescript
test('默认插槽', () => {
  const wrapper = mount(WdButton, {
    slots: { default: '按钮文本' }
  })
  expect(wrapper.text()).toContain('按钮文本')
})
```

#### 5. 测试异步行为

```typescript
test('异步加载', async () => {
  const wrapper = mount(WdComponent, {
    props: { loading: true }
  })

  expect(wrapper.classes()).toContain('is-loading')

  await wrapper.setProps({ loading: false })
  expect(wrapper.classes()).not.toContain('is-loading')
})
```

### 条件编译测试

虽然我们只在 H5 平台上测试，但可以使用条件编译来测试平台特定代码：

```typescript
test('平台特定功能', () => {
  // 我们在 H5 平台上测试
  // process.env.UNI_PLATFORM 会被设置为 'h5'
  if (process.env.UNI_PLATFORM === 'h5') {
    // H5 特定测试
    // ...
  }
})
```

## 最佳实践

### 1. 使用真实组件

- 测试真实组件，而不是模拟组件
- 只在必要时模拟依赖

```typescript
// 推荐
const wrapper = mount(WdButton)

// 不推荐（除非必要）
const MockButton = {
  template: '<button class="wd-button"></button>'
}
const wrapper = mount(MockButton)
```

### 2. 测试边缘情况

- 测试组件在各种边缘情况下的行为
- 包括错误处理、极限值等

```typescript
test('处理无效输入', () => {
  const wrapper = mount(WdInput, {
    props: { maxlength: 5 }
  })

  wrapper.setValue('123456')
  expect(wrapper.vm.value).toBe('12345')
})
```

### 3. 保持测试简单

- 每个测试只测试一个功能点
- 避免复杂的测试逻辑

```typescript
// 推荐
test('按钮禁用状态', () => {
  const wrapper = mount(WdButton, {
    props: { disabled: true }
  })
  expect(wrapper.classes()).toContain('is-disabled')
})

test('按钮禁用时不触发点击事件', async () => {
  const wrapper = mount(WdButton, {
    props: { disabled: true }
  })
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeFalsy()
})

// 不推荐
test('按钮禁用状态和事件', async () => {
  const wrapper = mount(WdButton, {
    props: { disabled: true }
  })
  expect(wrapper.classes()).toContain('is-disabled')
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeFalsy()
})
```

### 4. 使用中文测试描述

- 使用中文编写测试用例的标题，保持一致性

```typescript
// 推荐
test('基本渲染', () => {
  // ...
})

// 不推荐
test('renders with default props', () => {
  // ...
})
```

### 5. 定期更新测试

- 随着组件的更新，及时更新测试用例
- 保持测试覆盖率不下降

## 常见问题

### 1. 测试中的异步问题

如果测试中的异步行为不按预期工作，可以尝试：

```typescript
// 使用 await nextTick()
import { nextTick } from 'vue'

test('异步行为', async () => {
  const wrapper = mount(WdComponent)
  wrapper.vm.doSomethingAsync()
  await nextTick()
  // 断言...
})

// 或使用 setTimeout
test('延迟行为', async () => {
  const wrapper = mount(WdComponent)
  wrapper.vm.doSomethingWithDelay()
  await new Promise(resolve => setTimeout(resolve, 100))
  // 断言...
})
```

### 2. 模拟 uni-app API

在测试中模拟 uni-app API：

```typescript
// 在 setup.ts 中
vi.mock('uni-app', () => ({
  uni: {
    showToast: vi.fn(),
    navigateTo: vi.fn(),
    // 其他需要模拟的 API...
  }
}))

// 在测试中
import { uni } from 'uni-app'

test('调用 uni API', async () => {
  const wrapper = mount(WdComponent)
  await wrapper.find('.trigger').trigger('click')
  expect(uni.showToast).toHaveBeenCalled()
})
```

## 参考资料

- [Vue Test Utils 文档](https://test-utils.vuejs.org/)
- [Vitest 文档](https://vitest.dev/)
- [uni-app 条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html)
- [Jest 文档](https://jestjs.io/docs/getting-started)
- [Codecov 文档](https://docs.codecov.io/docs)
