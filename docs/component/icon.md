<frame/>

#  Icon 图标 <el-tag text style="vertical-align: middle;margin-left:8px;" type="warning">0.1.27 更新</el-tag>


## 基本用法

通过 `name` 属性设置使用哪个图标。

```html
<wd-icon name="add-circle" />
```

## 图标颜色

设置 `color` 属性。

```html
<wd-icon name="add-circle" color="#0083ff" />
```

## 图标大小

设置 `size` 属性。

```html
<wd-icon name="add-circle" size="20px" />
```

## 自定义图标
如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。


``` css
/* 路径 src/iconfont/index.css */

@font-face {
  font-family: "fish";
  src: url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff2?t=1721314121733') format('woff2'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.woff?t=1721314121733') format('woff'),
       url('//at.alicdn.com/t/c/font_4626013_vwpx4thmin.ttf?t=1721314121733') format('truetype');
}

.fish {
  font-family: "fish" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fish-kehuishouwu:before {
  content: "\e627";
}

```
```html
<!-- app.vue -->
 <style>
@import '@/iconfont/index.css';
</style>
```

```html
<!-- 通过 class-prefix 指定类名为 fish -->
<wd-icon class-prefix="fish" name="kehuishouwu" />
```

## Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| name | 使用的图标名字，可以使用链接图片 |	string | - | - | - |
| color	| 图标的颜色 | string |	- |	inherit | - |
| size | 图标的字体大小 | string | - | inherit | - |
| classPrefix | 类名前缀，用于使用自定义图标 | string | - | 'wd-icon' | 0.1.27 |
| custom-style | 根节点样式 | string | - | - | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
