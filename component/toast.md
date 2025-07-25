---
url: 'https://wot-design-uni.cn/component/toast.md'
---
# Toast 轻提示

轻提示组件，用于消息通知、加载提示、操作结果提示等场景，支持函数式调用。

:::tip 提示
`Toast` 自 1.7.0 版本起支持通过 `props` 属性控制组件样式，字段见[props](#props)，需要注意的是函数式调用api的`options`优先级高于`props`。
:::

## 基本用法

需要在页面中引入该组件，作为挂载点。

```html
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```typescript
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
```

## 成功、异常、警告、常规

```typescript
toast.show('提示信息')
toast.success('操作成功')
toast.error('手机验证码输入错误，请重新输入')
toast.warning('提示信息')
toast.info('常规提示信息')
```

## 使用图标

可以使用`iconClass`指定图标，结合`classPrefix`可以使用自定义图标，参见 [Icon 自定义图标](/component/icon#自定义图标)。

```ts
// 使用组件库内部图标
toast.show({
  iconClass: 'star',
  msg: '使用组件库内部图标'
})
```

```ts
// 使用自定义图标
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: '使用自定义图标'
})
```

## 提示位置

通过设置 `position` 属性，可以设置提示信息的位置，默认为 `middle-top`。

```typescript
// 顶部提示
toast.show({
  position: 'top',
  msg: '提示信息'
})

// 局中提示
toast.show({
  position: 'middle',
  msg: '提示信息'
})

// 底部提示
toast.show({
  position: 'bottom',
  msg: '提示信息'
})
```

## 排版方向

`direction` 可设置排版方向，默认为横向排版。

```typescript
// 纵向排版
toast.success({
  msg: '纵向排版',
  direction: 'vertical'
})
```

## 关闭提示

```typescript
toast.close()
```

## loading 提示

`loading` 开启后需要用户手动关闭，关闭可以调用 `close`，或者再调用一次 toast 提示，因为 toast 只会存在一个，新的 toast 会自动顶掉旧的 toast。

```typescript
toast.loading('加载中...')
```

修改 loading 指示器类型：

```typescript
toast.loading({
  loadingType: 'ring',
  msg: '加载中...'
})
```

手动关闭 loading：

```typescript
toast.close()
```

## Attributes

| 参数         | 说明                                     | 类型     | 可选值                                     | 默认值     | 最低版本         |
|--------------|------------------------------------------|----------|--------------------------------------------|------------|------------------|
| selector     | 选择器                                   | string   | -                                          | ''         | -                |
| msg          | 提示信息                                 | string   | -                                          | ''         | 1.7.0 |
| direction    | 排列方向                                 | string   | vertical / horizontal                      | horizontal | 1.7.0 |
| iconName     | 图标类型                                 | string   | success / error / warning / loading / info | ''         | 1.7.0 |
| iconSize     | 图标大小                                 | number   | -                                          | -          | 1.7.0 |
| loadingType  | 加载类型                                 | string   | outline / ring                             | outline    | 1.7.0 |
| loadingColor | 加载颜色                                 | string   | -                                          | #4D80F0    | 1.7.0 |
| loadingSize  | 加载大小                                 | number   | -                                          | -          | 1.7.0 |
| iconColor    | 图标颜色                                 | string   | -                                          | -          | 1.7.0 |
| position     | 提示信息框的位置                         | string   | top / middle-top / middle / bottom         | middle-top | 1.7.0 |
| zIndex       | 层级                                     | number   | -                                          | 100        | 1.7.0 |
| cover        | 是否存在遮罩层                           | boolean  | -                                          | false      | 1.7.0 |
| iconClass    | 图标类名                                 | string   | -                                          | ''         | 1.7.0 |
| classPrefix  | 类名前缀，用于使用自定义图标             | string   | -                                          | wd-icon    | 1.7.0 |
| opened       | 完全展示后的回调函数                     | Function | -                                          | -          | 1.7.0 |
| closed       | 完全关闭时的回调函数                     | Function | -                                          | -          | 1.7.0 |

## Options

| 参数         | 说明                                                                        | 类型     | 可选值                    | 默认值     | 最低版本 |
|--------------|-----------------------------------------------------------------------------|----------|---------------------------|------------|----------|
| msg          | 消息内容                                                                    | string   | -                         | ''         | -        |
| duration     | 持续时间，单位 ms，为 0 时表示不自动关闭                                    | number   | -                         | 2000       | -        |
| direction    | 排版方向                                                                    | string   | vertical / horizontal     | horizontal | 1.7.0        |
| iconName     | 图标类型                                                                    | string   | success / error / warning | ''         | -        |
| iconSize     | 左侧图标尺寸                                                                | number   | -                         | -          | -        |
| iconClass    | 图标类目，自定义图标，可以使用 Icon 章节的那些图标类名，iconName 优先级更高 | string   | -                         | ''         | -        |
| classPrefix  | 类名前缀，用于使用自定义图标                                                | string   | -                         | 'wd-icon'  | -        |
| position     | 提示信息框的位置                                                            | string   | top / middle / bottom     | middle-top | -        |
| zIndex       | toast 层级                                                                  | number   | -                         | 100        | -        |
| loadingType  | [加载中图标类型](/component/loading)                                        | string   | ring                      | outline    | -        |
| loadingColor | [加载中图标颜色](/component/loading)                                        | string   | -                         | #4D80F0    | -        |
| selector     | 指定唯一标识                                                                | string   | -                         | ''         | -        |
| cover        | 是否存在一个透明遮罩                                                        | boolean  | -                         | false      | -        |
| opened       | 完全展示后的回调函数                                                        | Function | -                         | -          | -        |
| closed       | 完全关闭后的回调函数                                                        | Function | -                         | -          | -        |

## Methods

| 方法名称 | 说明                                      | 参数    | 最低版本 |
| -------- | ----------------------------------------- | ------- | -------- |
| success  | 成功提示                                  | options | -        |
| error    | 错误提示                                  | options | -        |
| info     | 常规提示                                  | options | -        |
| warning  | 警告提示                                  | options | -        |
| loading  | 加载提示                                  | options | -        |
| close    | 手动关闭消息提示框，是 Toast 实例上的方法 | -       | -        |

## 外部样式类

| 类名              | 说明           | 最低版本 |
| ----------------- | -------------- | -------- |
| custom-class      | 根节点样式     | -        |
