---
url: 'https://wot-design-uni.cn/component/use-toast.md'
---
# useToast

用于便捷地调用 Toast 轻提示组件。

## 基本用法

需要在页面中引入 wd-toast 组件作为挂载点。

```html
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts
import { useToast } from '@/uni_modules/wot-design-uni'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}
```

## 成功、异常、警告、常规

```ts
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

## loading 提示

`loading` 开启后需要用户手动关闭，关闭可以调用 `close`，或者再调用一次 toast 提示，因为 toast 只会存在一个，新的 toast 会自动顶掉旧的 toast。

```ts
toast.loading('加载中...')
```

修改 loading 指示器类型：

```ts
toast.loading({
  loadingType: 'ring',
  msg: '加载中...'
})
```

手动关闭 loading:

```ts
toast.close()
```

## API

### Methods

| 方法名称 | 说明                   | 参数    |
| -------- | --------------------- | ------- |
| show     | 展示提示              | options |
| success  | 成功提示              | options |
| error    | 错误提示              | options |
| info     | 常规提示              | options |
| warning  | 警告提示              | options |
| loading  | 加载提示              | options |
| close    | 手动关闭消息提示框     | -       |

### Options

| 参数         | 说明                                    | 类型     | 可选值                    | 默认值     |
|--------------|----------------------------------------|----------|---------------------------|------------|
| msg          | 消息内容                                | string   | -                         | ''         |
| duration     | 持续时间，单位 ms，为 0 时表示不自动关闭  | number   | -                         | 2000       |
| direction    | 排版方向                                | string   | vertical / horizontal     | horizontal |
| iconName     | 图标类型                                | string   | success / error / warning | ''         |
| iconSize     | 左侧图标尺寸                            | number   | -                         | -          |
| iconClass    | 自定义图标类名                          | string   | -                         | ''         |
| classPrefix  | 类名前缀                                | string   | -                         | 'wd-icon'  |
| position     | 提示信息框的位置                        | string   | top / middle / bottom     | middle-top |
| zIndex       | toast 层级                              | number   | -                         | 100        |
| loadingType  | 加载中图标类型                          | string   | ring                      | outline    |
| loadingColor | 加载中图标颜色                          | string   | -                         | #4D80F0    |
| selector     | 指定唯一标识                            | string   | -                         | ''         |
| cover        | 是否存在一个透明遮罩                     | boolean  | -                         | false      |
| opened       | 完全展示后的回调函数                     | Function | -                         | -          |
| closed       | 完全关闭后的回调函数                     | Function | -                         | -          |
