<frame/>

# Backtop 回到顶部 `1.2.21`

## 基本用法

由于返回顶部需要实时监听滚动条位置，但是在uniapp的组件中不能获取页面的滚动信息，
所以只能在页面的`onPageScroll`生命周期中获取滚动条位置，再通过`Props`传递给组件。

```html
  <wd-backtop :scrollTop="scrollTop"></wd-backtop>
```

```typescript
const scrollTop = ref<number>(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
```

## 自定义图标

```html
  <wd-backtop :scrollTop="scrollTop">
    <text>TOP<text>
  </wd-backtop>
```

## 自定义样式

```html
  <wd-backtop :scrollTop="scrollTop" customStyle="background: #007aff;color:white;"></wd-backtop>
```

## Attributes

| 参数      | 说明                             | 类型   | 可选值 | 默认值 | 最低版本 |
| --------- | -------------------------------- | ------ | ------ | ------ | -------- |
| scrollTop | 页面滚动距离                     | number | -      | -      | -        |
| top       | 距离顶部多少距离时显示，单位`px` | number | -      | 300    | -        |
| duration  | 返回顶部滚动时间，单位`ms`       | number | -      | 100    | -        |
| zIndex    | 组件z-index属性                  | number | -      | 10     | -        |
| iconStyle | 自定义`icon`样式                 | string | -      | -      | -        |
| shape     | 按钮形状                         | string | square | circle | -        |
| bottom    | 距离屏幕顶部的距离，单位`px`     | number | -      | 100    | -        |
| right     | 距离屏幕右边距离，单位`px`       | number | -      | 20     | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
| custom-style | 根节点样式 | -        |
