---
url: 'https://wot-design-uni.cn/component/badge.md'
---
# Badge 徽标

出现在按钮、图标旁的数字或状态标记。

## 基础用法

展示新消息数量。

定义`modelValue`属性，它接受`Number`或者`String`。

```html
<wd-badge modelValue="12">
  <wd-button size="small">评论</wd-button>
</wd-badge>

<wd-badge modelValue="12px">
  <wd-button size="small">评论</wd-button>
</wd-badge>
```

## 修改背景色

设置 `type` 属性，也可以自定义背景色 `bg-color`，也可以通过`custom-class`定义组件样式。

```html
<wd-badge custom-class="badge" modelValue="3" bg-color="pink">
  <wd-button size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" modelValue="1" type="primary">
  <wd-button size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" modelValue="2" type="warning">
  <wd-button size="small">回复</wd-button>
</wd-badge>
<wd-badge custom-class="badge" modelValue="1" type="success">
  <wd-button size="small">评论</wd-button>
</wd-badge>
<wd-badge custom-class="badge" modelValue="2" type="info">
  <wd-button size="small">回复</wd-button>
</wd-badge>
```

```scss
:deep(.badge) {
    margin: 0 30px 20px 0;
    display: inline-block;
}
```

## 最大值

可自定义最大值。

由`max`属性定义，它接受一个`Number`，需要注意的是，只有当`modelValue`为`Number`时，它才会生效。

```html
<wd-badge modelValue="200" max="99">
  <wd-button size="small">评论</wd-button>
</wd-badge>
<wd-badge modelValue="100" max="10">
  <wd-button size="small">回复</wd-button>
</wd-badge>
```

## 展示 0 值

可使用`show-zero`属性，自定义是否展示 `0` 值。需要注意的是，`is-dot` 属性优先级高于 `show-zero` 属性，`is-dot`为`true`时将始终显示红点。

```html
<wd-badge modelValue="0" max="99" show-zero>
  <wd-button size="small">评论</wd-button>
</wd-badge>
<wd-badge modelValue="0" max="10">
  <wd-button size="small">回复</wd-button>
</wd-badge>
```

## 自定义内容

可以显示数字以外的文本内容。

定义`modelValue`为`String`类型是时可以用于显示自定义文本。

```html
<wd-badge modelValue="new">
  <wd-button size="small">评论</wd-button>
</wd-badge>
<wd-badge modelValue="hot">
  <wd-button size="small">回复</wd-button>
</wd-badge>
```

## 点状标注

以红点的形式标注需要关注的内容。

除了数字外，设置`is-dot`属性，它接受一个`Boolean`。

```html
<wd-badge is-dot>数据查询</wd-badge>
<wd-badge is-dot>
  <wd-button class="share-button" ></wd-button>
</wd-badge>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| v-model | 显示值 | string / number | - | - | - | - |
| max | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | - | - | - |
| top | 为正时，角标向下偏移对应的像素 | number | - | - | - |
| right | 为正时，角标向左偏移对应的像素 | number | - | - | - |
| is-dot | 红色点状标注 | boolean | - | false | - |
| hidden | 隐藏 badge | boolean | - | false | - |
| type | 类型 | string | primary / success / warning / danger / info | - | - |
| bg-color | 背景色 | string | 各种颜色的css写法 | - | - |
| show-zero | 是否显示0 | boolean | - | false | 0.1.62 |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
