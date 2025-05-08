---
url: 'https://wot-design-uni.cn/component/circle.md'
---
# Circle 环形进度条 0.1.19

圆环形的进度条组件，支持进度渐变动画。

## 基础用法

通过`v-model`表示进度条的当前进度，`text`属性控制进度条中间文字内容。

```html
<wd-circle v-model="current" :text="`进度：${current}%`"></wd-circle>
```

```ts
const current = ref<number>(10)
```

## 宽度控制

通过`strokeWidth`属性来控制进度条宽度，默认`10px`。

```html
<wd-circle v-model="current" :strokeWidth="15"></wd-circle>
```

## 颜色定制

通过`color`属性控制进度条颜色，默认`#1C64FD`，通过`layerColor`属性控制进度条轨道颜色，默认`#EBEEF5`。

```html
<wd-circle v-model="current" color="#1C64FD" layer-color="#EBEEF5"></wd-circle>
```

## 渐变色

`color`属性支持传入对象格式来定义渐变色。

```html
<wd-circle v-model="current" :color="gradientColor"></wd-circle>
```

```ts
const gradientColor = {
  '0%': '#ffd01e',
  '100%': '#ee0a24'
}
```

## 进度条展开方向

通过`clockwise`属性控制进度条展开方向，`clockwise`为`false`时，进度会从逆时针方向开始。

```html
<wd-circle v-model="current" :clockwise="false"></wd-circle>
```

## 大小定制

通过`size`属性控制进度条圆环直径，默认`100px`。

```html
<wd-circle v-model="current" :size="300"></wd-circle>
```

## Attributes

| 参数              | 说明                         | 类型                        | 可选值                                     | 默认值          | 最低版本 |
| ----------------- | ---------------------------- | --------------------------- | ------------------------------------------ | --------------- | -------- |
| `v-model` / `modelValue`     | 当前进度                     | number                      | -                                          | `0`             | 0.1.19   |
| `customClass`     | 自定义class                  | string                      | -                                          | -            | 0.1.19   |
| `customStyle`     | 自定义style                  | string                      | -                                          | -            | 0.1.19   |
| `size`            | 圆环直径，默认单位为 px     | number                      | -                                          | `100`           | 0.1.19   |
| `color`           | 进度条颜色                   | string / Record\<string, string> | -                                      | `#4d80f0`     | 0.1.19   |
| `layerColor`      | 轨道颜色                     | string                      | -                                          | `#EBEEF5`     | 0.1.19   |
| `fill`            | 填充颜色                     | string                      | -                                          | `#ffffff`     | 0.1.19   |
| `speed`           | 动画速度（单位为 rate/s）    | number                      | -                                          | `50`            | 0.1.19   |
| `text`            | 文字                         | string                      | -                                          | -               | 0.1.19   |
| `strokeWidth`     | 进度条宽度，单位px           | number                      | -                                          | `10`            | 0.1.19   |
| `strokeLinecap`   | 进度条端点的形状             | string                      | `butt` / `round` / `square`             | `round`       | 0.1.19   |
| `clockwise`       | 是否顺时针增加               | boolean                     | -                                          | `true`          | 0.1.19   |

## Circle 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
